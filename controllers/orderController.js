const { Order, OrderItem, Cookie } = require("../db/models");

exports.orderList = async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.user.id,
      },
      //   include: [
      //     {
      //       model: OrderItem,
      //       attributes: ["cookieId"],
      //     },
      //   ],
    });
    res.json(userOrders);
  } catch (error) {
    next(error);
  }
};

exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create({ userId: req.user.id });
    const cart = req.body.map((item) => ({
      ...item,
      orderId: newOrder.id,
    }));
    const newOrderItems = await OrderItem.bulkCreate(cart);
    res.status(201).json(newOrderItems);
  } catch (error) {
    next(error);
  }
};
