var mongoUri = builder.Configuration["Mongo:Uri"];
Console.WriteLine(mongoUri);

/* 
appsettings.json

  "Mongo": {
    "Uri": "mongodb://127.0.0.1:27017",
    "Database": "my_database"
  }

 */