const redisClient = require("redis");
class RedisClient {
  constructor() {
    if (!RedisClient.instance) {
      this.client = redisClient.createClient();
      this.client.connect().then(() => {
        console.log("redis connected");
      });
      this.client.on("error", (err) => {
        console.log(err);
      });
      RedisClient.instance = this;
    }
    return RedisClient.instance;
  }
  getClient() {
    return this.client;
  }
}

module.exports = RedisClient;
