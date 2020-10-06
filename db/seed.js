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
    }).then(() => {
      db.Assignment.create({
        title: 'Welcome to Class',
        description: 'Your first assignment',
        dueDate: 'Monday October 12 2020',
        UserId: 1
      });
    }).then(() => {
      db.Resource.create({
        topic: 'Search Engine',
        url: 'http://www.google.com',
        UserId: 1
      });
    });
  });
};
