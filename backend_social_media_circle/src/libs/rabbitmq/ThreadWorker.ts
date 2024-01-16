import amqp from "amqplib";

export default class ThreadWorker {
  private connection: any;
  private channel: any;
  private readonly queName: string;
  constructor() {
    this.queName = "cirle_thread_queue";
  }

  async init() {
    this.connection = await amqp.connect("amqp://localhost");
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queName, { durable: true });
  }

  async closeConnection() {
    try {
      await this.channel.close();
      await this.connection.close();
      console.info("Connection and channel closed successfully.");
    } catch (error) {
      console.error("Error while closing connection and channel:", error);
    }
  }

  async sendMessageToQueue(payload: any) {
    try {
      await this.channel.sendToQueue(
        this.queName,
        Buffer.from(JSON.stringify(payload))
      );
      console.info("Data telah dikirim ke antrian pesan.");
    } catch (error) {
      console.error(error);
    }
  }

  async consumeMessageQueue() {
    try {
      const consumedMessage = await new Promise<string | null>((resolve) => {
        this.channel.consume(
          this.queName,
          (message) => {
            if (message) {
              resolve(message.content.toString());
              this.channel.ack(message); // Mengakui penerimaan pesan
            } else {
              resolve(null);
            }
          },
          { noAck: false } // Menggunakan Acknowledge mode
        );
      });
      return consumedMessage;
    } catch (error) {
      console.error(error);
    }
  }
}
