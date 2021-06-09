const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const seeduserData = require('./userData.json');
const seedblogData = require('./blogData.json');


const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  const users = await User.bulkCreate(seeduserData, {
    individualHooks: true,
    returning: true,
  });
  // console.log('\n----- DATABASE SYNCED -----\n');


  const blogs = await Blog.bulkCreate(seedblogData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);

}


// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (const blog of blogData) {
//     await Blog.create({
//       ...blog,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

//   process.exit(0);
// };

seedAll();
