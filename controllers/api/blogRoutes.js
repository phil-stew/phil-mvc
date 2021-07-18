const router = require("express").Router();
// const Sequelize = require('sequelize');
const { User, Post, Comment } = require("../../models");


router.get('/', async (req, res) => {
  

    try {
        // Gets all Posts and serializes
        const dbPostData = await Post.findAll();
        const PostPlain = dbPostData.map((post) => post.get({ plain: true }))

        // Extracts the username associated to the post
        for (let i = 0; i < PostPlain.length ; i++) {
            const dbUserData = await User.findOne({where: {
                id: PostPlain[i].userId
            }})
            PostPlain[i].username = dbUserData.username
        }

        console.log(PostPlain)

        // console.log(PostPlain)
        res.render('blogposts', {
        blogArr: PostPlain,
        });

    } catch {
        console.log(error)
        res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
  
    try {
        const postData = await Post.destroy({
          where: {
            id: req.params.id,
          },
        });
    
        if (!postData) {
          res.status(404).json({ message: 'No category found with that id!' });
          return;
        }
    
        res.status(200).json(postData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/', async (req, res) => { 
   
      const commentData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id   
      });
    
  });

module.exports = router;
