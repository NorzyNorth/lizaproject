import { RedisClientType, createClient } from "redis";

export default class SessionsClient {
  private redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient();

    this.redisClient.on("error", (err) => {
      console.error("Ошибка подключения к Redis:", err);
    });
  }

  async createSession(
    userId: number,
    accessToken: string,
    refreshToken: string,
    accessTokenExpiration: Date,
    refreshTokenExpiration: Date
  ): Promise<boolean> {
    const setAsync = this.redisClient.set.bind(this.redisClient);

    const sessionKey = `user:${userId}:session`;
    const sessionData = JSON.stringify({
      userId,
      accessToken,
      refreshToken,
      accessTokenExpiration,
      refreshTokenExpiration,
    });

    // Устанавливаем срок жизни сессии в Redis
    const expiresIn = Math.floor(
      (accessTokenExpiration.getTime() - Date.now()) / 1000 // Конвертируем миллисекунды в секунды
    );
    setAsync(sessionKey, sessionData, "EX", expiresIn);

    return true;
  }

  async getSessionById(userId: number): Promise<any | null> {
    const getAsync = this.redisClient.get.bind(this.redisClient);

    const sessionKey = `user:${userId}:session`;
    const sessionData = await getAsync(sessionKey);

    return sessionData ? JSON.parse(sessionData) : null;
  }
}
