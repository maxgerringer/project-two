// Get references to page elements
const $refreshBtn = $('#refresh');
const $roster = $('#roster');
const $assignmentList = $('#assignment-list');
const $assignmentTitle = $('#assignment-title');
const $assignmentDescrip = $('#assignment-descrip');
const $assignmentDue = $('#due-date');
const $assignUpdate = $('#update-assignment-title');
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
  getAssignmentById: function (id) {
    return $.ajax({
      url: 'api/assignments/' + id,
      type: 'GET'
    });
  },
  addAssignment: function (assignment) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/assignments',
      data: JSON.stringify(assignment)
    });
  },
  deleteAssignment: function (id) {
    return $.ajax({
      url: 'api/assignments/' + id,
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
      const $li = $('<li>')
        .text(assignment.title)
        .attr({
          class: 'list-group-item',
          'data-id': assignment.id
        });

      const $delBtn = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('X');
      const $updateBtn = $('<button>')
        .addClass('btn btn-secondary float-left update')
        .text('Update');

      $li.append($updateBtn, $delBtn);

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
    dueDate: $assignmentDue.val(),
    UserId: userId
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

const updateAssignment = function (event) {
  event.preventDefault();
  $('#update-status').empty();

  $('#update-assignment-modal').modal('show');

  const idToGet = $(this).parent().attr('data-id');

  API.getAssignmentById(idToGet).then(function (data) {
    console.log(data.description);

    $assignUpdate.val(data.title);
    $('#update-assignment-descrip').val(data.description);
    $('#update-due-date').val(data.dueDate);
    $('#update-assignment').attr('data-id', idToGet);
  });
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
$assignmentList.on('click', '.update', updateAssignment);
$assignmentList.on('click', '.delete', deleteAssignment);
$('#update-assignment').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  // capture All changes
  const update = {
    title: $('#update-assignment-title').val().trim(),
    description: $('#update-assignment-descrip').val().trim(),
    dueDate: $('#update-due-date').val().trim()
  };
  $('#err-msg').empty('');
  // $('#change-user-modal').modal('show');
  console.log(update);

  $.ajax({
    type: 'PUT',
    url: '/api/assignments/' + id,
    data: update
  }).then((result) => {
    console.log('Updated assignment:', result);
    refreshAssignments();
    $('#update-status').text('Updated!');
  });
});

refreshRoster();
refreshAssignments();
refreshResources();
