// Get references to page elements
const $assignmentList = $('#assignment-list');
const $assignmentTitle = $('#assignement-title');
const $assignmentDescrip = $('#assignment-descrip');
const $assignmentDue = $('#due-date');
const $assingmentBtn = $('#submit-assignment');

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
  submitAssignment: function (assignment) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/assigments',
      data: JSON.stringify(assignment)
    });
  }
};

// define what happens and data gathered when the API is called

const refreshAssignments = function () {
  API.getAssignments().then(function (data) {
    const $assignments = data.map(function (assignment) {
      const $a = $('<a>')
        .text(assignment.title)
        .attr('href', '/assignment/' + assignment.id);

      const $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': assignment.id
        })
        .append($a);

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

// Add event listeners to the buttons
$assingmentBtn.on('click', addAssignment);

refreshAssignments();
