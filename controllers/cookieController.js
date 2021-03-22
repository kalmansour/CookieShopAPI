const { Bakery, Cookie } = require("../db/models");

exports.fetchCookie = async (cookieId, next) => {
  try {
    const cookie = await Cookie.findByPk(cookieId);
    return cookie;
  } catch (error) {
    next(error);
  }
};

exports.cookieList = async (req, res, next) => {
  try {
    const cookies = await Cookie.findAll({
      attributes: { exclude: ["bakeryId", "createdAt", "updatedAt"] },

      include: {
        model: Bakery,
        as: "bakery",
        attributes: ["name"],
      },
    });
    res.json(cookies);
  } catch (error) {
    next(error);
  }
};

// need to end err
exports.cookieUpdate = async (req, res, next) => {
  const { cookieId } = req.params;
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.cookie.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.cookieDelete = async (req, res, next) => {
  const { cookieId } = req.params;
  try {
    await req.cookie.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
