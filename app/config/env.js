const env={
    host: 'dpg-cqc6bn56l47c73cumkc0-a',
    port: 5432,
    username: 'rodrigoumg2024_user',
    password: '7A2iXXF4tjxzAPzNOx9lrcBzPCquG6J1',
    database: process.env.database| 'rodrigoumg2024',
  dialect: 'postgres',
  
  pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    
  }
  }
  module.exports =env;