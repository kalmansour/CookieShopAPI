let cookies = require("../cookies");
const { Cookie } = require("../db/models");
const slugify = require("slugify");
const { response } = require("express");

exports.cookieCreate = async (req, res) => {
  try {
    const newCookie = await Cookie.create(req.body);
    res.status(201).json(newCookie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cookieList = async (req, res) => {
  try {
    const cookies = await Cookie.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(cookies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cookieUpdate = async (req, res) => {
  const { cookieId } = req.params;
  try {
    const foundCookie = await Cookie.findByPk(cookieId);
    if (foundCookie) {
      await foundCookie.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Cookie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cookieDelete = async (req, res) => {
  const { cookieId } = req.params;
  try {
    const foundCookie = await Cookie.findByPk(cookieId);
    if (foundCookie) {
      await foundCookie.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Cookie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
