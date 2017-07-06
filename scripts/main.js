// TODO: Make it so won't add user unless phone number is correct format, and zipcode is 5 digits

var users = {
  "Brett-Fuller": {
    first: "Brett",
    last: "Fuller",
    dob: "1988-06-28",
    phone: "312-714-6011",
    zip: "75214"
  },
  "Ashley-Fuller": {
    first: "Ashley",
    last: "Fuller",
    dob: "1987-06-15",
    phone: "312-714-7637",
    zip: "75214"
  },
  "Calvin-Fuller": {
    first: "Calvin",
    last: "Fuller",
    dob: "2016-04-02",
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
      userItem.append('<td class="user-buttons"><button class="btn btn-sm btn-warning view-button" data-user="'+allUsers[i]+'">View</button><button class="btn btn-sm btn-danger delete-button" data-user="'+allUsers[i]+'">Delete</button></td>');
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
  },
  addUser: function(fullName, firstName, lastName, dateOfBirth, phoneNumber, zipCode) {
    users[fullName] = {
      first: firstName,
      last: lastName,
      dob: dateOfBirth,
      phone: phoneNumber,
      zip: zipCode
    }
    userFunctions.loadUsers();
  }
}

var formFunctions = {
  clearForm: function() {
    $('#first-name').val("");
    $('#last-name').val("");
    $('#dob').val("");
    $('#zip-code').val("");
    $('#phone-number').val("");
  },
  validateNumbers: function(arr) {
    for (var i in arr) {
      if (isNaN(arr[i])){
        return console.log('That is not valid!');
      }
      console.log('Works!');
    }
  },
  splitValue: function(val, split) {
    var arrayOfVal = val.split(split);
    return arrayOfVal;
  },
  getUserInfo: function(event) {
    event.preventDefault();
    var firstName = $('#first-name').val().trim();
    var lastName = $('#last-name').val().trim();
    var dob = $('#dob').val().trim();
    var zipCode = $('#zip-code').val().trim();
    var phoneNumber = $('#phone-number').val().trim();
    var fullName = firstName + '-' + lastName;
    userFunctions.addUser(fullName, firstName, lastName, dob, phoneNumber, zipCode);
    formFunctions.clearForm();
  }
}

$(document).ready(function() {
  userFunctions.loadUsers();
  $('body').on('click', '.delete-button', userFunctions.deleteUser);
  $('body').on('click', '.view-button', userFunctions.viewUser);
  $('body').on('click', '#add-button', formFunctions.getUserInfo);
})
