// Get references to page elements
const $assignmentList = $('#assignment-list');
const $assingmentBtn = $('#submit-assignment');
const $assignDetail = $('#assignment-detail-id');

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
  }
};

// define what happens and data gathered when the API is called

const refreshAssignments = function () {
  API.getAssignments().then(function (data) {
    const $assignments = data.map(function (assignment) {
      const $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': assignment.id
        });

      const $submitBtn = $('<button>')
        .addClass('btn btn-primary float-right submit')
        .text('Submit');

      $li.append($submitBtn);

      return $li;
    });

    $assignmentList.empty();
    $assignmentList.append($assignments);
  });
};

const submitAssignment = function (event) {
  event.preventDefault();

  $('#detail-assignment-modal').modal('show');

  const idToGet = $(this).parent().attr('data-id');

  API.getAssignmentById(idToGet).then(function (data) {
    console.log(data.title);

    $assignDetail.text(data.title);
  });
};

// Add event listeners to the buttons
$assingmentBtn.on('click', submitAssignment);

refreshAssignments();
