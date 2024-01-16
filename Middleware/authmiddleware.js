const Person = require("../Models/person");
const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  const secretKey =  'Iampassinguserpass';
  try {
    jwt.verify(token, secretKey, async (err, user) => {
      if (err || !user.email) {
        return res.sendStatus(403);
      }
      const result = await Person.findOne({
        email: user.email,
      })
        .populate("Admin")
        .populate("Coach")
        .populate("Customer");

      if (!result || result.email != user.email) {
        return res.sendStatus(403);
      }
      req.user = {
        _id: result._id.toString(),
        name: result.name,
        email: result.email,
        createdAt: result.createdAt,
        Coach: result.Coach || null,
        Customer: result.Customer || null,
        Admin: result.Admin || null,
        contactDetails:result.contactDetails,
        gender:result.gender,
        address:result.address
      };
      console.log(req.user);
      next();
      
    });
    
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { authenticateToken };
