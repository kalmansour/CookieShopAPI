const { User } = require("../db/models");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username: username } });

    const userAuthenticated =
      user && (await bcrypt.compare(password, user.password));

    if (userAuthenticated) return done(null, user);
    else return done(null, false);
  } catch (error) {
    done(error);
  }
});
