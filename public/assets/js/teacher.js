// Get references to page elements
const $refreshBtn = $('#refresh');
const $roster = $('#roster');
const $assignmentList = $('#assignment-list');
const $assignmentTitle = $('#assignement-title');
const $assignmentDescrip = $('#assignment-descrip');
const $assignmentDue = $('#due-date');
const $assingmentBtn = $('#add-assignment');
const $resourceList = $('#resource-list');

// The API object contains methods for each kind of request we'll make

const API = {
  getStudents: function () {
    return $.ajax({
      url: 'api/roster',
      type: 'GET'
    });
  },
  getAssignments: function () {
    return $.ajax({
      url: 'api/assignments',
      type: 'GET'
    });
  },
  addAssignment: function (assignment) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/assigments',
      data: JSON.stringify(assignment)
    });
  },
  deleteAssignment: function (id) {
    return $.ajax({
      url: 'api/assignments' + id,
      type: 'DELETE'
    });
  },
  getResources: function () {
    return $.ajax({
      url: 'api/resources',
      type: 'GET'
    });
  }
};

// define what happens and data gathered when the API is called

const refreshRoster = function () {
  API.getStudents().then(function (data) {
    console.log(data);
    const $students = data.map(function (student) {
      const $a = $('<a>')
        .text(student.firstName + ' ' + student.lastName);

      const $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': student.id
        })
        .append($a);

      return $li;
    });

    $roster.empty();
    $roster.append($students);
  });
};

const refreshAssignments = function () {
  API.getAssignments().then(function (data) {
    const $assignments = data.map(function (assignment) {
      const $a = $('<a>')
        .text(assignment.title)
        .attr('href', '/assignments/' + assignment.id);

      const $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': assignment.id
        })
        .append($a);

      const $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('X');

      $li.append($button);

      return $li;
    });

    $assignmentList.empty();
    $assignmentList.append($assignments);
  });
};

const addAssignment = function (event) {
  event.preventDefault();

  const assignment = {
    title: $assignmentTitle.val().trim(),
    description: $assignmentDescrip.val().trim(),
    dueDate: $assignmentDue.val()
  };

  if (!(assignment.title && assignment.description)) {
    alert('Enter a Title and Description');
    return;
  }

  API.addAssignment(assignment).then(function () {
    refreshAssignments();
  });

  $assignmentTitle.val('');
  $assignmentDescrip.val('');
};

const deleteAssignment = function () {
  const idToDelete = $(this).parent().attr('data-id');

  API.deleteAssignment(idToDelete).then(function () {
    refreshAssignments();
  });
};

const refreshResources = function () {
  API.getResources().then(function (data) {
    const $resources = data.map(resource => {
      const $a = $('<a>')
        .text(resource.title)
        .attr('href', resource.url);

      const $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': resource.id
        })
        .append($a);

      const $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('X');

      $li.append($button);

      return $li;
    });

    $resourceList.empty();
    $resourceList.append($resources);
  });
};

// const addResource = function (event) {
//   event.preventDefault();

//   const resource
// };

// Add event listeners to the buttons
$refreshBtn.on('click', refreshRoster);
$assingmentBtn.on('click', addAssignment);
$assignmentList.on('click', '.delete', deleteAssignment);

refreshRoster();
refreshAssignments();
refreshResources();
