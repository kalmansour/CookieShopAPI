let cookies = require("../cookies");
const { Cookie } = require("../db/models");
const slugify = require("slugify");
const { response } = require("express");

exports.fetchCookie = async (cookieId, next) => {
  try {
    const cookie = await Cookie.findByPk(cookieId);
    return cookie;
  } catch (error) {
    next(error);
  }
};

exports.cookieCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCookie = await Cookie.create(req.body);
    res.status(201).json(newCookie);
  } catch (error) {
    next(error);
  }
};

exports.cookieList = async (req, res, next) => {
  try {
    const cookies = await Cookie.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
