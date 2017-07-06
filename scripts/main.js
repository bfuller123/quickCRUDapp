// TODO: Make it so won't add user unless phone number is correct format, and zipcode is 5 digits

var testUsers = {
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
      userItem.append('<td class="user-buttons"><button class="btn btn-sm btn-warning view-button" data-user="'+allUsers[i]+'">View</button><button class="btn btn-sm btn-danger delete-button" data-user="'+allUsers[i]+'">Delete</button></td>');
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
  },
  addUser: function(fullName, firstName, lastName, dateOfBirth, phoneNumber, zipCode) {
    storage.users[fullName] = {
      first: firstName,
      last: lastName,
      dob: dateOfBirth,
      phone: phoneNumber,
      zip: zipCode
    }
    storage.update(storage.users);
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
