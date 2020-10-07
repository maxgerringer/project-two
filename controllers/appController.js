module.exports = function (db) {
  return {
    // Get all students
    getStudents: function (req, res) {
      db.User.findAll({ where: { role: 'student' } }).then(function (dbStudents) {
        res.json(dbStudents);
      });
    },
    // Get all assignments
    getAssignments: function (req, res) {
      db.Assignment.findAll().then(function (dbAssignments) {
        res.json(dbAssignments);
      });
    },
    // Get one assignment by id
    getAssignmentById: function (req, res) {
      db.Assignment.findOne({ where: { id: req.params.id } }).then(function (dbAssignment) {
        res.json(dbAssignment);
      });
    },
    // Create a new assignment
    createAssignment: function (req, res) {
      console.log(req.body);
      db.Assignment.create(req.body).then(function (dbAssignment) {
        res.json(dbAssignment);
      });
    },
    // Delete an assignment by id
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
