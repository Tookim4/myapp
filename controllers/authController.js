const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle errors function
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered';
    return errors;
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'that password is incorrect';
    return errors;
  }

   // duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

    // error validation
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
}

// create a new token function
const maxAge = 3 * 24 * 60 * 60; //3 days in seconds
const createToken = (id) => {
  return jwt.sign({ id }, 'Ninja Kamui', {
    expiresIn: maxAge
  });
}

exports.signup = (req, res) => {
  res.render('signup', { title: 'Signup' });
};

exports.login = (req, res) => {
  res.render('login', { title: 'Login' });
};

// signup function
exports.sign_up = async (req, res) => {
    const {email, username, password} = req.body;
    
    try {
        const user = await User.create({email, username, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};


// login function
exports.login_pos = async (req, res) => {
    const {email, password} = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};