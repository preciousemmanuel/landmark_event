
require('module-alias/register')
const dotenv = require("dotenv");
dotenv.config();
const app = require('./src/app');
const db = require('./src/models/index');

// Sync database and start the server
db.sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((err) => {
  console.error('Failed to sync the database:', err);
});
