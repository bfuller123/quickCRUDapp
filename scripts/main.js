var testUsers = {
  "Wendy-Ginger-Thu Feb 11 2010 12:05:09 GMT-0500 (Central Daylight Time)": {
    first: "Wendy",
    last: "Ginger",
    dob: "1972-11-18",
    phone: "5551011982",
    zip: "75214",
    userSince: "Thu Feb 11 2010 12:05:09 GMT-0500 (Central Daylight Time)"
  },
  "Robert-Miller-Wed Jan 06 2016 14:05:09 GMT-0500 (Central Daylight Time)": {
    first: "Robert",
    last: "Miller",
    dob: "1987-06-15",
    phone: "3127187637",
    zip: "75202",
    userSince: "Wed Jan 06 2016 14:05:09 GMT-0500 (Central Daylight Time)"
  },
  "Robert-Wayne-Sat Jan 11 2016 14:05:09 GMT-0500 (Central Daylight Time)": {
    first: "Robert",
    last: "Wayne",
    dob: "1982-04-22",
    phone: "2147754687",
    zip: "75202",
    userSince: "Sat Jan 11 2016 14:05:09 GMT-0500 (Central Daylight Time)"
  }
};

var storage = {
  usersDatabase: {},
  load: function() {
    storage.usersDatabase = JSON.parse(localStorage.getItem('usersDatabase'));
  },
  update: function(obj) {
    localStorage.setItem('usersDatabase', JSON.stringify(obj));
  }
}

var userFunctions = {
  currentUserInView: null,
  loadUsers: function() {
    $('.table-body').empty();
    if(localStorage.getItem('usersDatabase') === null){
      storage.update(testUsers);
    }
    storage.load();
    console.log(storage.usersDatabase)
    var allUsers = Object.keys(storage.usersDatabase);
    for (var i = 0; i < allUsers.length; i++) {
      var userItem = $('<tr>');
      userItem.attr('class', 'user-row');
      userItem.attr('data-user', allUsers[i]);
      userItem.append('<td>'+storage.usersDatabase[allUsers[i]].first+'</td>');
      userItem.append('<td>'+storage.usersDatabase[allUsers[i]].last+'</td>');
      userItem.append('<td>'+storage.usersDatabase[allUsers[i]].dob+'</td>');
      userItem.append('<td>'+storage.usersDatabase[allUsers[i]].phone+'</td>');
      userItem.append('<td>'+storage.usersDatabase[allUsers[i]].zip+'</td>');
      userItem.append('<td class="user-buttons"><button type="button" class="btn btn-sm btn-warning view-button" data-toggle="modal" data-target=".myModal" data-user="'+allUsers[i]+'">View</button><button class="btn btn-sm btn-danger delete-button" data-user="'+allUsers[i]+'">Delete</button></td>');
      $('.table-body').append(userItem);
    }
  },
  deleteUser: function() {
    var user = $(this).attr('data-user');
    delete storage.usersDatabase[user];
    storage.update(storage.usersDatabase);
    userFunctions.loadUsers();
  },
  viewUser: function() {
    var user = $(this).attr('data-user');
    userFunctions.currentUserInView = user;
    var userBase = storage.usersDatabase[user];
    $('#modalLabel').text(userBase.first + " " + userBase.last);
    $('#memberSince').text(userBase.userSince);
  },
  addUser: function(uid, firstName, lastName, dateOfBirth, phoneNumber, zipCode, date) {
    storage.usersDatabase[uid] = {
      first: firstName,
      last: lastName,
      dob: dateOfBirth,
      phone: phoneNumber,
      zip: zipCode,
      userSince: date
    }
    storage.update(storage.usersDatabase);
    userFunctions.loadUsers();
  },
  updateUser: function(uid, firstName, lastName, dateOfBirth, phoneNumber, zipCode) {
    if (firstName != undefined && firstName != "") {
      storage.usersDatabase[uid].first = firstName;
    }
    if (lastName != undefined && lastName != "") {
      storage.usersDatabase[uid].last = lastName;
    }
    if (dateOfBirth != undefined && dateOfBirth != "") {
      storage.usersDatabase[uid].dob = dateOfBirth;
    }
    if (phoneNumber != undefined && phoneNumber != "") {
      storage.usersDatabase[uid].phone = phoneNumber;
    }
    if (zipCode != undefined && zipCode != "") {
      storage.usersDatabase[uid].zip = zipCode;
    }
    storage.update(storage.usersDatabase);
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
  getUserInfo: function(check) {
    if (check === "update") {
      var uid = userFunctions.currentUserInView;
      var firstName = $('#modal-first-name').val().trim();
      var lastName = $('#modal-last-name').val().trim();
      var dob = $('#modal-dob').val().trim();
      var zipCode = $('#modal-zip-code').val().trim();
      var phoneNumber = $('#modal-phone-number').val().trim();
      var listOfUsers = Object.keys(storage.usersDatabase);
      if(listOfUsers.includes(uid)){
        userFunctions.updateUser(uid, firstName, lastName, dob, phoneNumber, zipCode);
        formFunctions.clearForm();
      }
    }
    else if (check === "add") {
      var firstName = $('#first-name').val().trim();
      var lastName = $('#last-name').val().trim();
      var dob = $('#dob').val().trim();
      var zipCode = $('#zip-code').val().trim();
      var phoneNumber = $('#phone-number').val().trim();
      var date = window.Date();
      var uid = firstName + '-' + lastName + '-' + date;
      userFunctions.addUser(uid, firstName, lastName, dob, phoneNumber, zipCode);
      formFunctions.clearForm();
    }
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
    if($('#add-user-form').valid()) {
      formFunctions.getUserInfo("add");
    }
  },
  validateModalForm: function() {
    jQuery.validator.setDefaults({
      debug: true,
      success: 'valid'
    })
   $('#update-user-form').validate({
      rules: {
        modalfirstname: {
          minlength: 1
        },
        modallastname: {
          minlength: 1
        },
        modalphonenumber: {
          digits: true,
          rangelength: [10, 10]
        },
        modalzipcode: {
          digits: true,
          rangelength: [5,5]
        }
      }
    });
    if($('#update-user-form').valid()) {
      formFunctions.getUserInfo("update");
    }
  },
  updateUserClicked: function() {
    formFunctions.validateModalForm();
  },
  addUserClicked: function() {
    formFunctions.validateForm();
  }
}

$(document).ready(function() {
  userFunctions.loadUsers();
  $('body').on('click', '.delete-button', userFunctions.deleteUser);
  $('body').on('click', '.view-button', userFunctions.viewUser);
  $('body').on('click', '#add-button', formFunctions.addUserClicked);
  $('body').on('click', '#update-button', formFunctions.updateUserClicked);
})
