# About project
Cash register that allows you to count purchases that were made, store data about them, and use all the data provided to create some sort of dailies showing how much cash was earned that day.

## Required 
  1. **Backend**
      - Built with **C# .NET**.
  2. **Front**
      - Built with **Angular**.
  3. **DataBase**
      - Connect to the database that you have.
    
---

### Configuration 

   - **Database**:  
    Add the following JSON configuration:  
 ```json
    {
      "DefaultConnection": "Server=ip.ip.ip.ip;Database=DataBaseName;Uid=root;Pwd=your_password;"
    }
 ```

 In `Program.cs`, configure the database connection:  

```csharp
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    {
        string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    });

 ```

---

> [!IMPORTANT]
> <h2>Packages needed</h2>

- **Microsoft.EntityFrameworkCore**  ```V:8.0.7```
- **Microsoft.EntityFrameworkCore.Tools** ```V:8.0.7```
- **Pomelo.EntityFrameworkCore.MySql** ```V:8.0.2```

> <h5>Packages version dont matter, just make sure to have the simillar in all packages</h4>

---


> [!NOTE]
> If you see this, it means the project is still in development, so it will receive updates in the future.Or I just forgot to delete it.
