
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
      const $tr = $('<tr>');
      const $tdTitle = $('<td>').text(assignment.title);
      const $tdCat = $('<td>').text(assignment.description);
      const $tdDue = $('<td>').text(moment(assignment.dueDate, 'YYYY-MM-DD').format('MM-DD-YYYY'));
      const $tdSubmit = $('<td>');
      const $submitBtn = $('<button>')
        .addClass('btn btn-primary submit')
        .text('Submit');

      $tdSubmit.append($submitBtn);

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

  const idToGet = $(this).parent().attr('data-id');

  API.getAssignmentById(idToGet).then(function (data) {
    console.log(data.title);

    $assignDetail.text(data.title);
  });
};

// Add event listeners to the buttons
$assingmentBtn.on('click', submitAssignment);

refreshAssignments();
