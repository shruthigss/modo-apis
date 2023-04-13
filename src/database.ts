import {Pool} from "pg"

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Shruthi@25',
    database: 'mydatabase',
    port: 5432
});

pool.connect((e)=>{
    if(e){
        console.log(e);
    }
    else{
        console.log("connected");
    }
})