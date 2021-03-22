const { Bakery, Cookie, User } = require("../db/models");

// Fetch Bakery
exports.fetchBakery = async (bakeryId, next) => {
  try {
    const bakery = await Bakery.findByPk(bakeryId);
    return bakery;
  } catch (error) {
    next(error);
  }
};

// Cookie Create
exports.cookieCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.bakery.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.bakeryId = req.bakery.id; //suspect
      const newCookie = await Cookie.create(req.body);
      res.status(201).json(newCookie);
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

// Bakery Create
exports.bakeryCreate = async (req, res, next) => {
  try {
    const foundBakery = Bakery.findOne({
      where: { userId: req.user.id },
    });
    if (foundBakery) {
      const err = new Error("You already have a Bakery dude");
      err.status = 404;
      next(err);
    }
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id;
    const newBakery = await Bakery.create(req.body);
    res.status(201).json(newBakery);
  } catch (error) {
    next(error);
  }
};

// Bakery List
exports.bakeryList = async (req, res, next) => {
  try {
    const bakeries = await Bakery.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Cookie,
          as: "cookies",
          attributes: ["id", "name", "slug", "image", "description", "price"],
        },
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      ],
    });
    res.json(bakeries);
  } catch (error) {
    next(error);
  }
};
