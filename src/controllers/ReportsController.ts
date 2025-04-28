// Importar a biblioteca Express
import express, { Request, Response } from "express";
// Importar a conexão com banco de dados
import { AppDataSource } from "../data-source";
// Importar a entidade
import { User } from "../entity/User";
// Importar a biblioteca para subtrair meses
import { subMonths, format } from 'date-fns';
// Importar o locale em português
import { ptBR } from 'date-fns/locale';
// Criar a aplicação Express
const router = express.Router();

// Criar a rota para obter o relatório de usuários cadastrados mensalmente
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/users-report
router.get("/users-report", async (req: Request, res: Response) => {
    try {
        // Criar uma instância do repositório de User
        const userRepository = AppDataSource.getRepository(User);

        // Criar um array com os últimos 12 meses no formato 'YYYY-MM'
        const months = Array.from({ length: 12 }, (_, i) => {
            const date = subMonths(new Date(), 11 - i);
            return {
                key: format(date, "yyyy-MM"), // Chave no formato YYYY-MM
                label: format(date, "MMM", { locale: ptBR }).replace(".", ""), // Nome do mês abreviado
            };
        });

        // Buscar a quantidade de usuários cadastrados agrupados por mês e ano
        const result = await userRepository
            // Criar uma nova query de consulta na tabela "user"
            .createQueryBuilder("user")

            // Define quais colunas serão selecionadas na consulta
            .select([
                `DATE_FORMAT(user.createdAt, '%Y-%m') AS month`,
                `COUNT(user.id) AS users`
            ])

            // Filtra os registros para considerar apenas usuários criados a partir da data inicial
            .where("user.createdAt >= :startDate", { startDate: months[0].key + "-01" }) // Primeiro dia do primeiro mês
            .groupBy("month") // Agrupa os registros pelo mês formatado (YYYY-MM).
            .orderBy("month", "ASC") // Ordena os resultados de forma crescente (ASC) pelo mês.
            .getRawMany(); // Executa a consulta e retorna os resultados como um array de objetos JavaScript.

        // Criar um mapa para os resultados 
        const resultMap = new Map(result.map((r) => [r.month, parseInt(r.users, 10)]));

        // Preencher os meses ausentes com 0 usuários e substituir pelo nome abreviado
        const finalResult = months.map(({ key, label }) => ({
            month: label, // Nome do mês abreviado
            users: resultMap.get(key) || 0,
        }));

        // Retornar a resposta com os dados
        res.status(200).json(finalResult);
        return;

    } catch (error) {
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro gerar dados para o gráfico!"
        });
        return;
    }
});

// Exportar a instrução que está dentro da constante router 
export default router;