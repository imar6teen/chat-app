const RedisClient = require("../model/RedisClient");

class GetUser {
  constructor() {
    this.redisClient = new RedisClient().getClient();
  }
  getUserRedisByName(name) {
    return this.redisClient.hGetAll(name);
  }
  getAllUserRedis() {
    //pass
  }
}

module.exports = GetUser;
