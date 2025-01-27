# About project
Cash register that allows you to count purchases that were made, store data about them, and use all the data provided to create some sort of dailies showing how much cash was earned that day.

## Features Added

- New pages added to amplify functionality.
- Added the ability to:
  - Add new products.
  - Add new stores.
  - Create associations between stores and products to indicate which products are available in each store.
- A collection of simple yet effective features to enhance the project.


![image](https://github.com/user-attachments/assets/db8e2102-e755-4502-bbae-7aa2b43d1186)


## Required 
  1. **Backend**
      - Built with **C# .NET**.
  2. **Front**
      - Built with **Angular**.
  3. **DataBase**
      - Connect to the database that you have.
        - Create 5 tables, and realize M:N relation.
         <p align="center"> <img src="https://github.com/user-attachments/assets/00268885-b203-428c-a161-3aa907a89eb0" alt="Table" /> </p>

     

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

