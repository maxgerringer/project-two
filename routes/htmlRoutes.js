const router = require('express').Router();

module.exports = (db) => {
  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('/');
    }
  });

  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  router.get('/', (req, res) => {
    if (req.isAuthenticated() && req.session.passport.user.role === 'teacher') {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('teacher-dashboard', user);
    } else if (req.isAuthenticated() && req.session.passport.user.role === 'student') {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else if (req.isAuthenticated() && req.session.passport.user.role === 'parent') {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('parent-dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load dashboard page
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated() && req.session.passport.user.role === 'teacher') {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('teacher-dashboard', user);
    } else if (req.isAuthenticated() && req.session.passport.user.role === 'student') {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else if (req.isAuthenticated() && req.session.passport.user.role === 'parent') {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('parent-dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // // Load example index page
  // router.get('/roster', function (req, res) {
  //   if (req.isAuthenticated()) {
  //     db.User.findAll({ where: { role: 'student' }, raw: true }).then(function (dbStudents) {
  //       res.render('teacher-dashboard', {
  //         userInfo: req.session.passport.user,
  //         isloggedin: req.isAuthenticated(),
  //         msg: 'Welcome!',
  //         roster: dbStudents
  //       });
  //     });
  //   } else {
  //     res.redirect('/');
  //   }
  // });

  // Load example page and pass in an example by id
  router.get('/example/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbExample) {
        res.render('example-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          example: dbExample
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};
