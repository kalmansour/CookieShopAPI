const { Bakery, Cookie, User } = require("../db/models");

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

exports.cookieCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.bakeryId = req.params.bakeryId; //suspect
    const newCookie = await Cookie.create(req.body);
    res.status(201).json(newCookie);
  } catch (error) {
    next(error);
  }
};
