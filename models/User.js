
const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: 'https://deep-walrus-53361.upstash.io',
  token: 'AdBxAAIncDFmZmU4M2ZiYTcyZTY0ODA4ODYwNDg5OWExMzBmMGI3MHAxNTMzNjE',
});

const User = {
  create: async (username, password) => {
    if(!username || !password) return false;
    
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    const exists = await redis.get(`user:${cleanUser}`);
    if (exists) return false;

    await redis.set(`user:${cleanUser}`, cleanPass);
    return true;
  },
  
  login: async (username, password) => {
    if(!username || !password) return false;

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    const savedPass = await redis.get(`user:${cleanUser}`);
    
    return String(savedPass) === String(cleanPass);
  }
};

module.exports = User;
