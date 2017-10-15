module.exports = function(req, res, next) {
  if (req.body.verifyKey === "bcbk8")
    return next();
  res.status(401).send("Unauthorized");
}
  