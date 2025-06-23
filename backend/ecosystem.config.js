const { parsed: env } = require('dotenv').config({ path: '.env' });

module.exports = {
  apps: [
    {
      name: 'abiturient-api',
      cwd: __dirname,
      script: 'dist/src/main.js',
      instances: 1,
      max_memory_restart: '256M',
      env,
    },
  ],
};
