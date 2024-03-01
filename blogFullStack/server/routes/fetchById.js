const { express, router, expVal } = require("./baseImport");
const BlogPost = require("../modals/blogSchema");

router.post("/fetch/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await BlogPost.findById(id);
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error });
  }
});

module.exports = router;
