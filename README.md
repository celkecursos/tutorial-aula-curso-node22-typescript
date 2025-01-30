## Requisitos

* Node.js 22 ou superior - Conferir a versão: node -v
* MySQL 8 ou superior - Conferir a versão: mysql --version
* GIT - Conferir a instalação: git -v

## Como rodar o projeto baixado

Instalar todas as dependencias indicada pelo package.json.
```
npm install
```

Compilar o arquivo TypeScript.
```
npx tsc
```

Executar o arquivo gerado com Node.js.
```
node dist/index.js
```

## Sequencia para criar o projeto

Criar o arquivo package.
```
npm init
```

Instalar o Express para gerenciar as requisições, rotas, URLs e entre outra funcionalidades.
```
npm i express
```

Instalar os pacotes para suporte ao TypeScript.
```
npm i --save-dev @types/express
npm i --save-dev @types/node
```

Instalar o compilador projeto com TypeScript e reiniciar o projeto quando o arquivo é modificado.
```
npm i --save-dev ts-node
```

Gerar o arquivo de configuração para o TypeScript.
```
npx tsc --init
```

Compilar o arquivo TypeScript.
```
npx tsc
```

Executar o arquivo gerado com Node.js.
```
node dist/index.js
```

Instalar a dependência para conectar o Node.js (TypeScript) com banco de dados.
```
npm install typeorm --save
```

Biblioteca utilizada no TypeScript para adicionar metadados (informações adicionais) a classes.
```
npm install reflect-metadata --save
```

Instalar o drive do banco de dados MySQL.
```
npm install mysql2 --save
```

Comando SQL para criar a base de dados.
```
CREATE DATABASE celke CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

