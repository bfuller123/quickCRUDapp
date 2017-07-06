var users = {
  "Brett-Fuller": {
    first: "Brett",
    last: "Fuller",
    dob: "06/28/1988",
    phone: "312-714-6011",
    zip: "75214"
  },
  "Ashley-Fuller": {
    first: "Ashley",
    last: "Fuller",
    dob: "06/15/1987",
    phone: "312-714-7637",
    zip: "75214"
  },
  "Calvin-Fuller": {
    first: "Calvin",
    last: "Fuller",
    dob: "04/22/2016",
    phone: "312-714-7637",
    zip: "75214"
  }
};

var userFunctions = {
  loadUsers: function() {
    $('.table-body').empty();
    var allUsers = Object.keys(users);
    for (var i = 0; i < allUsers.length; i++) {
      var userItem = $('<tr>');
      userItem.attr('class', 'user-row');
      userItem.attr('data-user', allUsers[i]);
      userItem.append('<td>'+users[allUsers[i]].first+'</td>');
      userItem.append('<td>'+users[allUsers[i]].last+'</td>');
      userItem.append('<td>'+users[allUsers[i]].dob+'</td>');
      userItem.append('<td>'+users[allUsers[i]].phone+'</td>');
      userItem.append('<td>'+users[allUsers[i]].zip+'</td>');
      userItem.append('<td class="user-buttons"><button class="btn btn-warning view-button" data-user="'+allUsers[i]+'">View</button><button class="btn btn-danger delete-button" data-user="'+allUsers[i]+'">Delete</button></td>');
      $('.table-body').append(userItem);
    }
  },
  deleteUser: function() {
    var user = $(this).attr('data-user');
    delete users[user];
    userFunctions.loadUsers();
  },
  viewUser: function() {
    var user = $(this).attr('data-user');

  }
}

$(document).ready(function() {
  userFunctions.loadUsers();
  $('body').on('click', '.delete-button', userFunctions.deleteUser);
  $('body').on('click', '.view-button', userFunctions.viewUser);
})
