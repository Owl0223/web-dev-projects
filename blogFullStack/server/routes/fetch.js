const { express, router, expVal } = require("./baseImport");
const BlogPost = require("../modals/blogSchema");

router.post("/fetch", async (req, res) => {
  try {
    const allBlogs = await BlogPost.find();
    res.status(200).json({ success: true, allBlogs });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error });
  }
});

module.exports = router;
