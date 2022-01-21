const RedisClient = require("../model/RedisClient");

class StoreUser {
  constructor() {
    this.redisClient = new RedisClient().getClient();
  }
  async storeToRedis(user) {
    //fungsi ini digunakan pada sign up
    return this.redisClient.hSet(
      user.username,
      "username",
      user.username,
      "password",
      user.password,
      "id",
      user.id //ini akan di random disini
    );
  }
}

module.exports = StoreUser;
