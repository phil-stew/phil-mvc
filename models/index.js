const User = require('./User');
const Blog = require('./Blog');
const comment = require('./Comment');


Blog.hasMany(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User,{
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

module.exports = { User, Blog, comment };
