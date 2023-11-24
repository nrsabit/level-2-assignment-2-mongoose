import { app } from "./app"
import mongoose from "mongoose"
import config from "./app/config"

const runServer = async() => {
    try{
        await mongoose.connect(config.database_url as string)
        app.listen(config.port, () => {
            console.log(`Users app is running on port ${config.port}`)
          })
    }catch(err){
        console.log(err);
    }
}

runServer()

