# **ProjectFlow**
CRUD básico com autenticação JWT para gestão de projetos por usuário.

## **Backend**
- API construída em ASP.NET Core 8.0 que permite:
- Cadastro e login de usuários com autenticação JWT
- Criação, leitura, atualização e exclusão de projetos vinculados a cada usuário
- Integração com Entity Framework Core e banco de dados SQL Server
- Documentação e testes via Swagger/OpenAPI

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
 ```
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

### **Link para design no figma:**
https://www.figma.com/proto/lRKe665NWtx5YYAAs4KaMf/ProjectFlow?node-id=1-5&t=8kZrPbDsdbRpLfHC-1
