const BlogPost = require("../modals/blogSchema");
const { express, router, expVal } = require("./baseImport");

router.delete("/delete", async (req, res) => {
  try {
    const id = req.body._id;
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res.status(400).send("Error... not find...");
    }
    await BlogPost.deleteOne(blog);
    res.status(200).send("Deleted...");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
