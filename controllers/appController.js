module.exports = function (db) {
  return {
    // ROSTER METHOD
    getStudents: function (req, res) {
      db.User.findAll({ where: { role: 'student' } }).then(function (dbStudents) {
        res.json(dbStudents);
      });
    },
    // ASSIGNMENT METHODS
    getAssignments: function (req, res) {
      db.Assignment.findAll().then(function (dbAssignments) {
        res.json(dbAssignments);
      });
    },
    getAssignmentById: function (req, res) {
      db.Assignment.findOne({ where: { id: req.params.id } }).then(function (dbAssignment) {
        res.json(dbAssignment);
      });
    },
    createAssignment: function (req, res) {
      console.log(req.body);
      db.Assignment.create(req.body).then(function (dbAssignment) {
        res.json(dbAssignment);
      });
    },
    updateAssignment: function (req, res) {
      db.Assignment.update({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
      }, {
        where: { id: req.params.id }
      }).then(result => {
        res.json(result);
      });
    },
    deleteAssignment: function (req, res) {
      db.Assignment.destroy({ where: { id: req.params.id } }).then(function (dbAssignment) {
        res.json(dbAssignment);
      });
    },
    // RESOURCE METHODS
    getResources: function (req, res) {
      db.Resource.findAll().then(function (dbResources) {
        res.json(dbResources);
      });
    },
    getResourceById: function (req, res) {
      db.Assignment.findOne({ where: { id: req.params.id } }).then(function (dbResources) {
        res.json(dbResources);
      });
    },
    createResource: function (req, res) {
      console.log(req.body);
      db.Assignment.create(req.body).then(function (dbResources) {
        res.json(dbResources);
      });
    },
    updateResource: function (req, res) {
      db.Assignment.update({
        topic: req.body.topic,
        url: req.body.url,
        category: req.body.category
      }, {
        where: { id: req.params.id }
      }).then(result => {
        res.json(result);
      });
    },
    deleteResource: function (req, res) {
      db.Assignment.destroy({ where: { id: req.params.id } }).then(function (dbResources) {
        res.json(dbResources);
      });
    },
  };
};
