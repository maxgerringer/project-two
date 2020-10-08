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
  },
  getResourceById: function (id) {
    return $.ajax({
      url: 'api/resources/' + id,
      type: 'GET'
    });
  },
  addResource: function (resource) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/resources',
      data: JSON.stringify(resource)
    });
  },
  deleteResource: function (id) {
    return $.ajax({
      url: 'api/resources/' + id,
      type: 'DELETE'
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
      const $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': resource.id
        });

      const $delBtn = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('X');
      const $updateBtn = $('<button>')
        .addClass('btn btn-secondary float left update')
        .text('Update');

      $li.append($updateBtn, $delBtn);

      return $li;
    });

    $resourceList.empty();
    $resourceList.append($resources);
  });
};

const addResource = function (event) {
  event.preventDefault();

  const resource = {
    topic: $('#resourceName').val().trim(),
    url: $('#resourceLink').val().trim(),
    category: $('#resourceCategory').val(),
    UserId: userId
  };

  if (!(resource.topic && resource.url)) {
    alert('Enter a Topic and URL');
    return;
  }

  API.addResource(resource).then(function () {
    refreshResources();
  });

  $('#resourceName').val('');
  $('#resourceLink').val('');
};

const updateResource = function (event) {
  event.preventDefault();
  $('#update-resource-status').empty();

  $('#update-resource-modal').modal('show');

  const idToGet = $(this).parent().attr('data-id');

  API.getResourceById(idToGet).then(function (data) {
    console.log(data.topic);

    $('#update-resource-title').val(data.topic);
    $('#update-resource-descrip').val(data.category);
    $('#update-resourceLink').val(data.url);
    $('#update-resource').attr('data-id', idToGet);
  });
};

// Add event listeners to the buttons
$refreshBtn.on('click', refreshRoster);
$assingmentBtn.on('click', addAssignment);
$assignmentList.on('click', '.update', updateAssignment);
$resourceList.on('click', '.update', updateResource);
$assignmentList.on('click', '.delete', deleteAssignment);
$('#addResourceBtn').on('click', addResource);

$('#update-assignment').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  const update = {
    title: $('#update-assignment-title').val().trim(),
    description: $('#update-assignment-descrip').val().trim(),
    dueDate: $('#update-due-date').val().trim()
  };
  $('#err-msg').empty('');
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
$('#update-resource').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  const update = {
    topic: $('#update-resource-title').val().trim(),
    url: $('#update-resourceLink').val().trim(),
    category: $('#update-resource-descrip').val().trim()
  };
  $('#err-msg').empty('');
  console.log(update);

  $.ajax({
    type: 'PUT',
    url: '/api/resources/' + id,
    data: update
  }).then((result) => {
    console.log('Updated resource:', result);
    refreshResources();
    $('#update-resource-status').text('Updated!');
  });
});

refreshRoster();
refreshAssignments();
refreshResources();
