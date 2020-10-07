module.exports = function (db) {
  return {
    // Get all students
    getStudents: function (req, res) {
      db.User.findAll({ where: { role: 'student' } }).then(function (dbStudents) {
        res.json(dbStudents);
      });
    },
    // Get all examples
    getAssignments: function (req, res) {
      db.Assignment.findAll().then(function (dbAssignments) {
        res.json(dbAssignments);
      });
    },
    // Create a new example
    createAssignment: function (req, res) {
      console.log(req.body);
      db.Assignment.create(req.body).then(function (dbAssignment) {
        res.json(dbAssignment);
      });
    },
    // Delete an example by id
    deleteAssignment: function (req, res) {
      db.Assignment.destroy({ where: { id: req.params.id } }).then(function (dbAssignment) {
        res.json(dbAssignment);
      });
    },
    getResources: function (req, res) {
      db.Resource.findAll().then(function (dbResources) {
        res.json(dbResources);
      });
    }
  };
};
