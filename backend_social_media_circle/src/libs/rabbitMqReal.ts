import amqp from "amqplib";
import { Request, Response } from "express";

export default class QueController {
  private payload: {};
  constructor(data: {}) {
    this.payload = data;
  }
  async enqueue(req: Request, res: Response) {
    try {
      //   const payload = {};
      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();

      const queueName = "thread_rmq";

      await channel.assertQueue(queueName);

      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(this.payload)));

      await channel.close();
      await connection.close();

      res.status(200).json({
        message: "thread is sended to queue",
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }
}
