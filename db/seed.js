module.exports = (db) => {
  db.User.create({
    firstName: 'Adam',
    lastName: 'Gates',
    email: 'adam@gates.com',
    password: process.env.ADMIN_USER_PWD,
    isAdmin: true,
    role: 'teacher',
    honorific: 'Mr.'
  }).then(() => {
    db.User.create({
      firstName: 'Uma',
      lastName: 'Pearson',
      email: 'uma@pearson.com',
      password: process.env.USER_PWD,
      isAdmin: false,
      role: 'student',
      honorific: 'Miss'
    }).then(() => {
      db.Discussion.create({
        topic: 'First Message',
        text: 'Excited about class!',
        UserId: 2
      });
    });
  });
};
