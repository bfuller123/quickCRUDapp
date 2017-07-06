var testUsers = {
  "Wendy-Ginger": {
    first: "Wendy",
    last: "Ginger",
    dob: "1972-11-18",
    phone: "5551011982",
    zip: "75214",
    userSince: "Thu Feb 11 2010 12:05:09 GMT-0500 (Central Daylight Time)"
  },
  "Robert-Miller": {
    first: "Robert",
    last: "Miller",
    dob: "1987-06-15",
    phone: "3127187637",
    zip: "75202",
    userSince: "Wed Jan 06 2016 14:05:09 GMT-0500 (Central Daylight Time)"
  }
};

var storage = {
  users: {},
  load: function() {
    storage.users = JSON.parse(localStorage.getItem('users'));
  },
  update: function(obj) {
    localStorage.setItem('users', JSON.stringify(obj));
  }
}

var userFunctions = {
  loadUsers: function() {
    $('.table-body').empty();
    if(localStorage.getItem('users') === null){
      storage.update(testUsers);
    }
    storage.load();
    console.log(storage.users)
    var allUsers = Object.keys(storage.users);
    for (var i = 0; i < allUsers.length; i++) {
      var userItem = $('<tr>');
      userItem.attr('class', 'user-row');
      userItem.attr('data-user', allUsers[i]);
      userItem.append('<td>'+storage.users[allUsers[i]].first+'</td>');
      userItem.append('<td>'+storage.users[allUsers[i]].last+'</td>');
      userItem.append('<td>'+storage.users[allUsers[i]].dob+'</td>');
      userItem.append('<td>'+storage.users[allUsers[i]].phone+'</td>');
      userItem.append('<td>'+storage.users[allUsers[i]].zip+'</td>');
      userItem.append('<td class="user-buttons"><button type="button" class="btn btn-sm btn-warning view-button" data-toggle="modal" data-target=".myModal" data-user="'+allUsers[i]+'">View</button><button class="btn btn-sm btn-danger delete-button" data-user="'+allUsers[i]+'">Delete</button></td>');
      $('.table-body').append(userItem);
    }
  },
  deleteUser: function() {
    var user = $(this).attr('data-user');
    delete storage.users[user];
    storage.update(storage.users);
    userFunctions.loadUsers();
  },
  viewUser: function() {
    var user = $(this).attr('data-user');
    var userBase = storage.users[user];
    $('#modalLabel').text(userBase.first + " " + userBase.last);
    $('.modal-body').html("<p>Member Since: " + userBase.userSince + "</p>");
  },
  addUser: function(fullName, firstName, lastName, dateOfBirth, phoneNumber, zipCode) {
    storage.users[fullName] = {
      first: firstName,
      last: lastName,
      dob: dateOfBirth,
      phone: phoneNumber,
      zip: zipCode,
      userSince: window.Date()
    }
    storage.update(storage.users);
    userFunctions.loadUsers();
  }
}

var formFunctions = {
  clearForm: function() {
    // $('#first-name').val("");
    // $('#last-name').val("");
    // $('#dob').val("");
    // $('#zip-code').val("");
    // $('#phone-number').val("");
    location.reload(); //typically would not use a manual reload and would instead use the above code to clear form. Used this so form validation errors are removed after user added
  },
  getUserInfo: function() {
    var firstName = $('#first-name').val().trim();
    var lastName = $('#last-name').val().trim();
    var dob = $('#dob').val().trim();
    var zipCode = $('#zip-code').val().trim();
    var phoneNumber = $('#phone-number').val().trim();
    var fullName = firstName + '-' + lastName;
    userFunctions.addUser(fullName, firstName, lastName, dob, phoneNumber, zipCode);
    formFunctions.clearForm();
  },
  validateForm: function() {
    jQuery.validator.setDefaults({
      debug: true,
      success: 'valid'
    })
   $('#add-user-form').validate({
      rules: {
        firstname: {
          required: true,
          minlength: 1
        },
        lastname: {
          required: true,
          minlength: 1
        },
        phonenumber: {
          required: true,
          digits: true,
          rangelength: [10, 10]
        },
        zipcode: {
          required: true,
          digits: true,
          rangelength: [5,5]
        },
        dob: {
          required: true
        }
      }
    });
    console.log($('#add-user-form').valid());
    if($('#add-user-form').valid()) {
      formFunctions.getUserInfo();
    }
  }
}

$(document).ready(function() {
  userFunctions.loadUsers();
  $('body').on('click', '.delete-button', userFunctions.deleteUser);
  $('body').on('click', '.view-button', userFunctions.viewUser);
  $('body').on('click', '#add-button', formFunctions.validateForm);
})
