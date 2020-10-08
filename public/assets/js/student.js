
// Get references to page elements
const $assignmentList = $('#assignment-list');
const $resourceList = $('#resource-list');

const $assignDetail = $('#assignment-detail-id');

const $exampleText = $('#example-text');
const $exampleDescription = $('#example-description');
const $submitBtn = $('#submit');
const $exampleList = $('#example-list');

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
  submitAssignment: function (assignment) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/homeworks',
      data: JSON.stringify(assignment)
    });
  },
  getResources: function () {
    return $.ajax({
      url: 'api/resources',
      type: 'GET'
    });
  },
  saveDiscussion: function (example) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/discussions',
      data: JSON.stringify(example)
    });
  },
  getDiscussion: function () {
    return $.ajax({
      url: 'api/discussions',
      type: 'GET'
    });
  },
  deleteDiscussion: function (id) {
    return $.ajax({
      url: 'api/discussions/' + id,
      type: 'DELETE'
    });
  }
};

// define what happens and data gathered when the API is called

const refreshAssignments = function () {
  API.getAssignments().then(function (data) {
    const $assignments = data.map(function (assignment) {
      const $tr = $('<tr>');
      const $tdTitle = $('<td>').text(assignment.title);
      const $tdCat = $('<td>').text(assignment.description);
      const $tdDue = $('<td>').text(moment(assignment.dueDate, 'YYYY-MM-DD').format('MM-DD-YYYY'));
      const $tdSubmit = $('<td>');
      const $isSubmitted = $('<p>').addClass('float-left').text('✅');
      const $submitBtn = $('<button>')
        .attr('data-id', assignment.id)
        .addClass('btn btn-primary submit')
        .text('Submit');

      if (assignment.submission !== null) {
        $tdSubmit.append($isSubmitted, $submitBtn);
      } else {
        $tdSubmit.append($submitBtn);
      }

      $tr.append($tdTitle, $tdCat, $tdDue, $tdSubmit);

      return $tr;
    });

    const $tr = $('<tr>');
    const $thTitle = $('<th>').text('Title');
    const $thCat = $('<th>').text('Category');
    const $thDue = $('<th>').text('Due Date');
    const $thSubmit = $('<th>');

    $tr.append($thTitle, $thCat, $thDue, $thSubmit);

    $assignmentList.empty();
    $assignmentList.append($tr);
    $assignmentList.append($assignments);
  });
};

const submitAssignment = function (event) {
  event.preventDefault();

  $('#detail-assignment-modal').modal('show');

  const idToGet = $(this).attr('data-id');

  API.getAssignmentById(idToGet).then(function (data) {
    console.log(data.title);

    $assignDetail.text(data.title);
    $('#submit-assignment').attr('data-id', idToGet);
  });
};

const refreshResources = function () {
  API.getResources().then(function (data) {
    const $assignments = data.map(function (resource) {
      const $tr = $('<tr>');
      const $a = $('<a>').text(resource.topic).attr('href', resource.url);
      const $tdTitle = $('<td>');
      const $tdCat = $('<td>').text(resource.category);

      $tdTitle.append($a);

      $tr.append($tdTitle, $tdCat);

      return $tr;
    });

    const $tr = $('<tr>');
    const $thTitle = $('<th>').text('Link');
    const $thCat = $('<th>').text('Category');

    $tr.append($thTitle, $thCat);

    $resourceList.empty();
    $resourceList.append($tr);
    $resourceList.append($assignments);
  });
};

// Add event listeners to the buttons
$assignmentList.on('click', '.submit', submitAssignment);
$('#submit-assignment').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  const update = {
    submission: $('#assignment-link').val().trim()
  };
  $('#err-msg').empty('');
  console.log(update);

  $.ajax({
    type: 'PUT',
    url: '/api/assignments/' + id,
    data: update
  }).then((result) => {
    console.log('Updated resource:', result);
    refreshAssignments();
    $('#detail-assignment-modal').modal('hide');
  });
});

refreshAssignments();
refreshResources();
