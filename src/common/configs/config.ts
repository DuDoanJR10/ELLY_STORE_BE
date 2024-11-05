import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || "8000",
    dbConfig: {
        db: process.env.DB || '<DB_NAME>',
        user: process.env.DB_USER || '<DB_USER>',
        password: process.env.DB_PASSWORD || '<DB_PASSWORD>',
        host: process.env.DB_HOST || '<DB_HOST>',
        port: Number(process.env.DB_PORT) || 1433
    },
    key_scrert: process.env.KEY_SECRET || '<KEY_SECRET>',
    mail: {
        user: process.env.MAIL_USER || '<MAIL_USER>',
        pass: process.env.MAIL_PASS || '<MAIL_PASS>'
    },
    redis: {
        url: process.env.REDIS_URL || '<REDIS_URL>',
        prefix: process.env.REDIS_PREFIX || '<REDIS_PREFIX>'
    }
}