// Importar a biblioteca Express
import express, {Request, Response} from "express";
// Importar a conexão com banco de dados
import { AppDataSource } from "../data-source";
// Importar a entidade
import { User } from "../entity/User";
// Criar a aplicação Express
const router = express.Router();

// Criar a rota para listar os usuários
// Endereço para acessar a API através da aplicação externa com o verbo GET: http://localhost:8080/users
router.get("/users", async (req: Request, res: Response) => {
    try{
        // Criar uma instância do repositório de User
        const userRepository = AppDataSource.getRepository(User);

        // Recupera todos os usuários do banco de dados
        const users = await userRepository.find();

        // Retorna os usuários como resposta
        res.status(200).json(users);
        return;

    }catch(error){
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao listar os usuários!"
        });
        return;
    }
});

// Criar a rota para cadastrar usuário
// Endereço para acessar a api através da aplicação externa com o verbo POST: http://localhost:8080/users
// A aplicação externa deve indicar que está enviado os dados em formato de objeto: Content-Type: application/json
// Dados em formato de objeto
/*
{
    "name": "Cesar",
    "email": "cesar@celke.com.br"
}
*/
router.post("/users", async (req: Request, res: Response) => {
    try{
        // Receber os dados enviados no corpo da requisição
        var data = req.body;
        
        // Criar uma instância do repositório de User
        const userRepository = AppDataSource.getRepository(User);

        // Recuperar o registro do banco de dados com o valor da coluna email
        const existingUser = await userRepository.findOne({ where: {email: data.email}});

        // Verificar se já existe usuário cadastrado com esse e-mail
        if(existingUser){
            res.status(400).json({
                message: "Já existe usuário cadastrado com esse e-mail!",
            });
            return;
        }

        // Criar um novo registro
        const newUser = userRepository.create(data);

        // Salvar o registro no banco de dados
        await userRepository.save(newUser);

        // Retornar resposta de sucesso
        res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            user: newUser,
        });
    }catch(error){

        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao cadastrar usuário!"
        });
    }
});

// Exportar a instrução que está dentro da constante router 
export default router;