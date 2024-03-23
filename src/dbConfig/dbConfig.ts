import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)

        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('database connected');
        });

        connection.on('error',(error)=>{
            console.log('Check the error - ' + error);
            process.exit();
        });
    }
    catch(error) {
        console.log("error while connecting database - " + error);
    }
} 