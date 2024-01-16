import amqp from "amqplib";

export async function processQueue() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue("thread_rmq");

    await channel.consume("thread_rmq", (msg) => {
      if (msg !== null) {
        const payload = JSON.parse(msg.content.toString());

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("error prosecss queue", error);
  }
}
