import { createClient } from "redis";
import config from "../common/configs/config";

// Khởi tạo client Redis (một lần duy nhất)
const client = createClient({
  url: config.redis.url,
});

// Xử lý kết nối Redis
client.on("connect", () => {
  console.log("Đã kết nối Redis");
});

client.on("error", (err) => {
  console.error("Redis error: ", err);
});

client.connect();


class RedisService {
  // Hàm kiểm tra và kết nối Redis nếu chưa kết nối
  private async checkConnection() {
    if (!client.isOpen) {
      await client.connect();
    }
  }

  // Hàm set dữ liệu vào Redis với TTL
  async setValue(key: string, value: string, expire: number) {
    try {
      await this.checkConnection(); // Đảm bảo client kết nối trước khi set
      await client.setEx(key, expire, value);
      console.log(`Đã lưu key: ${key} với thời gian tồn tại: ${expire}s`);
    } catch (err) {
      console.error(`Lỗi khi set giá trị cho key ${key}:`, err);
    }
  }

  // Hàm lấy dữ liệu từ Redis
  async getValue(key: string) {
    try {
      await this.checkConnection(); // Đảm bảo client kết nối trước khi get
      const value = await client.get(key);
      if (value) {
        console.log(`Giá trị cho key ${key}: ${value}`);
      } else {
        console.log(`Key ${key} không tồn tại hoặc đã hết hạn`);
      }
      return value;
    } catch (err) {
      console.error("Lỗi khi get giá trị:", err);
      return null;
    }
  }
}

export default new RedisService();
