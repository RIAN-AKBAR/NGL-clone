
const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: 'https://deep-walrus-53361.upstash.io',
  token: 'AdBxAAIncDFmZmU4M2ZiYTcyZTY0ODA4ODYwNDg5OWExMzBmMGI3MHAxNTMzNjE',
});

const Message = {
  send: async (to, text) => {
    const cleanTo = to.trim().toLowerCase();
    const msgData = { 
      text: text, 
      time: new Date().toISOString() 
    };
    await redis.lpush(`msgs:${cleanTo}`, msgData);
  },
  get: async (username) => {
    const cleanUser = username.trim().toLowerCase();
    const data = await redis.lrange(`msgs:${cleanUser}`, 0, -1);
    return data || [];
  },

  delete: async (username, msgObjectString) => {
    const cleanUser = username.trim().toLowerCase();
    await redis.lrem(`msgs:${cleanUser}`, 0, msgObjectString);
  }
};

module.exports = Message;