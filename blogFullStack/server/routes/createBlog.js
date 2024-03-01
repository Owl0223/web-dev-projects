const BlogPost = require("../modals/blogSchema");
const { express, router, expVal } = require("./baseImport");

router.post("/new", async (req, res) => {
  const { title, blog, author } = req.body;

  try {

    const blogPost = await BlogPost.create({
      title: title,
      blog: blog,
      author: author,
      date: new Date(),
    });
    res.status(200).send("Created..." + blogPost.title);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
