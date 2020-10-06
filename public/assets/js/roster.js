// Get references to page elements
const $submitBtn = $('#submit');
const $roster = $('#roster');

// The API object contains methods for each kind of request we'll make

const API = {
  getStudents: function () {
    return $.ajax({
      url: 'api/roster',
      type: 'GET'
    });
  }
};

// refreshRoster gets new students from the db and repopulates the list

const refreshRoster = function () {
  API.getStudents().then(function (data) {
    console.log(data);
    const $students = data.map(function (student) {
      const $a = $('<a>')
        .text(student.firstName);

      const $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': student.id
        })
        .append($a);

      const $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('Refresh');

      $li.append($button);

      return $li;
    });

    $roster.empty();
    $roster.append($students);
  });
};

// Add event listeners to the refresh buttons
$submitBtn.on('click', refreshRoster);
