const { express, router, expVal } = require("./baseImport");

router.post("/newsletter", async (req, res) => {
  res.status(200).send("Newsletter...");
});

module.exports = router;
