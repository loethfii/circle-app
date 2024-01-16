// import { Request, Response } from "express";
// import sendMessageToQueue from "../libs/rabbitMq";

// export default class ThreadQueue {

//    async create(req : Request, res : Response){
//     try {
//         const loginSession =  res.locals.loginSession;
//         const data = {
//             content : req.body.content,
//             image : req.body.image,
//             userId : loginSession.userId
//         }

//         const errorQueue = await sendMessageToQueue('thread', data);

//         if(errorQueue){
//             return res.status(500).json({
//                 message : 'Internal Server Error'
//             })
//         }
//     } catch (error) {
//         console.error(error);
//     }
//    }
// }
