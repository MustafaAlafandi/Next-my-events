import {connectDB,getElementById} from "../../../helper/db-util"
const dbName = "events";
const collectionName = "events";
export default async function handler(req,res){
    const method = req.method;
    const eventId = req.query.eventId;
    let client;
    try{
        client = await connectDB();
    }catch(error){
        res.status(500).json({message:"Connect with database failed"});
    }
    if(method === "GET"){
        let event;
    try{
        event = await getElementById(client,dbName,collectionName,eventId);
        res.status(200).json({message:"Success",event});
    }catch(error){
        res.status(500).json({message:"Get element from database failed"});
    }
    }
}