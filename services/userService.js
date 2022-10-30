const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwt_secret = 'qwer234asdfg34w2r';

async function register(email, username, password) {
  const existing = await User.findOne({ username }).collation({
    locale: 'en',
    strength: 2,
  });

  const existingEmail = await User.findOne({ email }).collation({
    locale: 'en',
    strength: 2,
  });

  if (existingEmail) {
    throw new Error('Email is taken!');
  }

  if (existing) {
    throw new Error('Username is taken!');
  }

  if (password.length < 4) {
    throw new Error('Passowrd must be at least 4 charakters long! ');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    hashedPassword,
  });

  return createSession(user);
}

async function login(email, password) {
  const user = await User.findOne({ email }).collation({
    locale: 'en',
    strength: 2,
  });

  if (!user) {
    throw new Error('Incorrect username or password!');
  }
  const hasMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!hasMatch) {
    throw new Error('Incorrect username or password!');
  }
  return createSession(user);
}

function verifyToken(token) {
  return jwt.verify(token, jwt_secret);
}

function createSession({ _id, username }) {
  const payload = {
    _id,
    username,
  };

  return jwt.sign(payload, jwt_secret);
}

module.exports = {
  register,
  login,
  verifyToken,
};
