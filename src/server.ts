import app from "./app"
import { config } from "./config/env.config";
import { initDB } from "./db/db.init";



const main = ()=>{
    initDB();
    app.listen(5000, ()=>{
        console.log(`Sever Running SuccessFully At Port:${config.port} `)
    })
};

main();