const User = require('../models/User');
const adminController = require('../controllers/adminController');
// Render Signup Page
exports.getSignup = (req, res) => {
  res.render('signup');
};

// Handle User Signup
exports.postSignup = async (req, res) => {
  const { username, password,isAdmin } = req.body;
  try {
    const user = new User({ username, password ,isAdmin});
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.render('signup', { error: err.message });
  }
};

// Render Login Page
exports.getLogin = (req, res) => {
  res.render('login',{ error: undefined });
};

// Handle User Login
exports.postLogin = async (req, res) => {
    const { username, password, isAdmin } = req.body;
    try {
      const user = await User.findOne({ username});
      if (user && (await user.matchPassword(password))) {
        if (isAdmin && user.isAdmin) {
          req.session.admin = user;
          return res.redirect('/admin/users');
        } else if (!isAdmin && !user.isAdmin) {
          req.session.user = user;
          return res.redirect('/home');
        } else {
          res.render('login', { error: 'Invalid login credentials' });
        }
      } else {
        res.render('login', { error: 'Invalid username or password' });
      }
    } catch (err) {
      res.render('login', { error: err.message });
    }
  };
  

// Render Home Page for Logged In User
exports.getHome = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('home', { user: req.session.user });
};

// Handle Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
};
