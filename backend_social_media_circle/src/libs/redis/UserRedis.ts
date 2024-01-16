import { createClient } from "redis";

export default new (class UserRedis {
  private redisClient = createClient();
  private client = this.redisClient.connect();

  constructor() {
    this.redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });
  }

  async sendToRedis(payload: any) {
    try {
      await (await this.client).set("users", JSON.stringify(payload));
    } catch (error) {
      console.error(error);
    }
  }

  async getDataRedis() {
    try {
      const redisData = await (await this.client).get("users");
      const jsonData = JSON.parse(redisData);
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  }
})();
