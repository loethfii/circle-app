import amqp from "amqplib";

export default new (class ContohConsumer {
  async consume(): Promise<any> {
    try {
      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();
      const queName = "thread_rmq";

      await channel.assertQueue(queName, {
        durable: true,
      });

      return channel.consume(queName, async (msg) => {
        const data = JSON.parse(msg.content.toString());

        channel.ack(msg);
      });
    } catch (error) {
      console.error(error);
    }
  }
})();
