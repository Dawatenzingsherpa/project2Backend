type Database = {
  host : string,
  user : string, 
  password : string,
  db : string , 
  dialect : 'mysql' | 'postgres' | 'sqlite',
  pool : {
    max : number,
    min : number , 
    idle : number , 
    acquire : number
  }
}

const dbConfig: Database = {
  host : "localhost",
  user : 'root',
  password : '',
  db : 'project2Database',
  dialect : 'mysql',
  pool : {
    max : 5,
    min : 0,
    acquire : 10000,
    idle : 1000
  }
}

export default dbConfig;
