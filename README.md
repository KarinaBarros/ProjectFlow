# **ProjectFlow**
CRUD básico com autenticação JWT para gestão de projetos por usuário.

## **Backend**
- API construída em (C#).NET.
- JSON Web Tokens para o uso de tokens como camada de proteção.
- Cadastro e login de usuários.
- Integração com Entity Framework Core e banco de dados SQL Server.
- Criação, leitura, atualização e exclusão de projetos vinculados a cada usuário.
- Documentação e testes via Swagger/OpenAPI.

### **Requisitos**
.NET SDK 8.0   
SQL Server

### **1. Configure o arquivo appsettings.Development.json com sua string de conexão e chave JWT:**
```json
"ConnectionStrings": {
    "DefaultConnection": "sua_string_de_conexao"
  },
  "AppSettings": {
  "Token": "chave_secreta_com_64_caracteres"
  }
```

### **2. Instalar os pacotes:**
`dotnet restore`

### **3. compile o projeto:**
`dotnet build`

### **4. Crie a migration inicial:**
`dotnet ef migrations add InitialCreate`

### **5. Atualize o banco de dados:**
`dotnet ef database update`

 O Entity Framework criará automaticamente o banco SerCasting com as seguintes tabelas:  
 ```sql
CREATE TABLE Users (  
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,  
    Username NVARCHAR(450) NOT NULL,  
    Email NVARCHAR(MAX) NOT NULL,  
    PasswordHash VARBINARY(MAX) NOT NULL,  
    PasswordSalt VARBINARY(MAX) NOT NULL  
);  

CREATE TABLE Projects (  
    ProjectId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,  
    Title NVARCHAR(450) NOT NULL,  
    Description NVARCHAR(MAX) NOT NULL,  
    Budget DECIMAL(18,2) NOT NULL,  
    SkillsRequired NVARCHAR(MAX) NOT NULL,  
    Deadline DATETIME2 NOT NULL,  
    Status NVARCHAR(MAX) NOT NULL,  
    CreatedDate DATETIME2 NOT NULL,  
    UserId INT NOT NULL,  
    CONSTRAINT FK_Projects_Users_UserId   
        FOREIGN KEY (UserId) REFERENCES Users(Id)   
        ON DELETE CASCADE  
);
```

### **6. Execute a API:**
`dotnet run`

### **Documentação e testes da api:**
http://localhost:****/swagger/index.html
(Substitua **** pela porta informada no terminal.)

## **Frontend**

- Interface construída com (TypeScript)Angular CLI.
- Integração com a API.
- Services para chamadas a API.
- Interceptor para adicionar o cabeçalho com o token nas requisições.
- Guard para controle de acesso.
- Rxjs para requisições HTTP.
- Material para ícones.
- Validação de formulários.
- Estilização com tailwindcss.
- Tela de login.
- Tela de cadastro de usuários.
- Tela de listagem dos projetos com expansão para detalhes.
- Botões interativos para exclusão, atualização e exclusão de projetos.
- Modal para atualizar e criar novo projeto.

### **Link para design no figma:**
https://www.figma.com/proto/lRKe665NWtx5YYAAs4KaMf/ProjectFlow?node-id=1-5&t=8kZrPbDsdbRpLfHC-1

### **Requisitos**

Node.js LTS   
Angular CLI 19.2.6

### **1. Em src crie o arquivo environment.ts**
```ts
export const environment = {
    production: false,
    apiUrl: 'http://localhost:****/api/'
  };
```
 (Substitua **** pela porta que está rodando a API.)

 ### **2. Instalar os pacotes:**
`npm install`

### **3. Inicie o servidor:**
`ng serve`

## **Melhorias a serem feitas**

- [ ] Implementação de middleware com rate limiting na API.
- [ ] Implementação para envio de emails com MailKit para validar usuários na API. 
- [ ] Melhoria nas validações dos formulários no Frontend.
- [ ] Uso de classes responsivas do tailwind para aplicar responsividade ao app no Frontend.
