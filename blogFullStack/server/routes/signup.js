const { express, router, expVal } = require("./baseImport");
const newsletter = require("../modals/signUpSchema");

router.post("/signup", async (req, res) => {
  try {
    let user = await newsletter.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with email already exists!" });
    }

    user = await newsletter.create({
      name: req.body.name,
      email: req.body.email,
    });
    console.log("id " + user.id);
    success = true;
    res.status(200).json({ success });
  } catch (error) {
    console.error("Error in create user\n" + error);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports= router