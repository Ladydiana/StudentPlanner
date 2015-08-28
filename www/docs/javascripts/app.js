var TaskCollection;

var UsersCollection = Backbone.Firebase.Collection.extend({
    url: "https://flickering-fire-9493.firebaseio.com/users"
});

var userId;
var userCollection = new UsersCollection();

 var ref = new Firebase("https://flickering-fire-9493.firebaseio.com");



/*
 * ----------------------------------------------------------
 *  TEMPLATES
 * ----------------------------------------------------------
 */
var HomeTemplate = [
  // Put in a div with class content.  Ratchet will style this appropriately.
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',

  '<button id="btnAddTask" class="btn pull-right">Add Task</button>',
  '<button id="btnLogout" class="btn btn-link btn-nav pull-left">Logout</button>',
  '<h1 class="title">Student Planner</h1>',
  '</header>',
  '</nav>',

  '<div class="bar bar-standard bar-header-secondary">',
  ' <ul id="lst" class="table-view">',
  ' </ul>',
  '</div>'
  // Join the array with a new-line for a quick and easy html template.
].join('\n');


var LoginTemplate = [
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',

  '<div class="bar bar-standard bar-header-secondary">',
  '<form>',
  '<input type="text" id="emailAddr" placeholder="Email">',
  '<input type="password" id="pass" placeholder="Password">',
  '<button id="btnLogin" class="btn btn-positive btn-block">Login</button>',
  '</form>',
  '<br/>',
  '<a href="#register" style="margin:auto; text-align:center; display:block;">Don\'t have an account? Click here to REGISTER.</a>',
  '</div>'


].join('\n');


var RegisterTemplate = [
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',

  '<div class="bar bar-standard bar-header-secondary">',
  '<form>',
  '<input type="text" id="emailAddr" placeholder="Email" required>',
  '<input type="password" id="pass" placeholder="Password" required>',
  '<input type="password" id="confirm_pass" placeholder="Confirm Password" required>',
  '<button id="btnRegister" class="btn btn-positive btn-block">Register</button>',
  '<br />',
  '<a href="#login" style="margin:auto; text-align:center; display:block;">Already have an account? Click here to LOGIN.</a>',
  '</form>',
  '</div>'


].join('\n');


var AddTaskTemplate = [

  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',

  '<button id="btnBack" class="btn btn-link btn-nav pull-left">Back</button>',
  '<h1 class="title">Add Task</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<form class="input-group" method="post" action="">',
  '<select name="event_type" id="event_type">',
  '<option value="Homework">Homework </option>',
  '<option value="Project">Project </option>',
  '<option value="Course">Course </option>',
  '<option value="Lab">Lab </option>',
  '<option value="Exam">Exam </option>',
  '<option value="Meeting">Meeting </option>',
  '<option value="Other">Other </option>',
  '</select>',
  '<input id="txtTitle" type="text" placeholder="Title">',
  '<input type="date" name="date" id="date" >',
  '<input type="time" name="time" id="time" ">',
  '<br />',
  '<br />',
  '<ul class="table-view">',
  '<li class="table-view-cell">',
  'Memento',
  '<input type="checkbox" id="memento" name="memento" class="cmn-toggle cmn-toggle-round">',
  '<label for="memento"></label>',
  '</li>',
  '</ul>',
  '<br/>',
  '<br/>',
  '<textarea id="txtDesc" placeholder="Description" rows="3"></textarea>',
  '<button id="btnAdd" class="btn btn-positive btn-block">Save Task</button>',
  '</form>',
  '</div>'

].join('\n');

var SettingsTemplate =[
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',

  '<button id="btnBack" class="btn btn-link btn-nav pull-left">Back</button>',
  '<h1 class="title">Settings</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<ul class="table-view">',
  '<li>',
  '<a href="#changeEmail">Change Email</a>',
  '</li>',
  '<li>',
  '<a href="#changePassword">Change Password</a>',
  '</li>',
  '<li>',
  '<a href="#deleteAccount">Delete Account</a>',
  '</li>',
  '</ul>',
  '</div>'
].join('\n');

var ChangeEmailTemplate =[
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',

  '<button id="btnBack" class="btn btn-link btn-nav pull-left">Back</button>',
  '<h1 class="title">Change Username</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<form class="input-group" method="post" action="">',
  '<input id="txtOldEmail" type="text" placeholder="Old email address">',
  '<input id="txtNewEmail" type="text" placeholder="New email address">',
  '<input id="pass" type="password" placeholder="Password">',
  '<button id="btnChange" class="btn btn-positive btn-block">Change</button>',
  '</form>',
  '</div>'
].join('\n');

var ChangePasswordTemplate =[
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',
  '<button id="btnBack" class="btn btn-link btn-nav pull-left">Back</button>',
  '<h1 class="title">Change Password</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<form class="input-group" method="post" action="">',
  '<input id="email" type="text" placeholder="Email address">',
  '<input id="oldPass" type="password" placeholder="Password">',
  '<input id="newPass" type="password" placeholder="New password">',
  '<button id="btnChange" class="btn btn-positive btn-block">Change</button>',
  '</form>',
  '</div>'
].join('\n');

var DeleteAccountTemplate =[
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',
  '<button id="btnBack" class="btn btn-link btn-nav pull-left">Back</button>',
  '<h1 class="title">Delete Account</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<form class="input-group" method="post" action="">',
  '<input id="email" type="text" placeholder="Email address">',
  '<input id="pass" type="password" placeholder="Password">',
  '<button id="btnDelete" class="btn btn-positive btn-block">Delete</button>',
  '</form>',
  '</div>'
].join('\n');

/*
 * ----------------------------------------------------------
 *  VIEWS
 * ----------------------------------------------------------
 */


var HomeView = Jr.View.extend({

  initialize: function() {
    var authData = ref.getAuth();
    var TaskCollection = Backbone.Firebase.Collection.extend({
            url: "https://flickering-fire-9493.firebaseio.com/users/"+authData.uid+"/events/"
    });

    var col = new TaskCollection();
    //this.collection = col;
    this.listenTo(col, 'add', this.addOne);
  },

  render: function(){
    this.$el.html(HomeTemplate);
    return this;
  },

  addOne: function(todoList) {
   console.log("This", todoList);
   var title = todoList.attributes.title;
   var desc = todoList.attributes.description;
   var event_type = todoList.attributes.event_type;
   var date = todoList.attributes.date;
   var time = todoList.attributes.time;
   var memento = todoList.attributes.memento;
   console.log(title+" "+desc+" "+ date);
   $('#lst').append('<li class="table-view-cell">' + event_type +"- "+ title + ": "+ date+ " " + time  + " " + desc + " " + memento +  '</li>');
  },

  events: {
    'click #btnAddTask': 'onClickAddTask',
    'click #btnLogout': 'onClickLogout'
  },

  onClickAddTask: function() {

    Jr.Navigator.navigate('addTask',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
  },
  onClickLogout: function() {

    ref.unauth();

    Jr.Navigator.navigate('login',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });


  }
});


var LoginView = Jr.View.extend({
  render: function(){
    this.$el.html(LoginTemplate);
    return this;
  },
  events: {
    'click #btnLogin': 'onClickLogin'
  },

  onClickLogin: function() {
    var email= $('#emailAddr').val();
    var pass = $('#pass').val();

    ref.authWithPassword({
      "email": email,
      "password": pass
    },
    function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        alert("Login Failed!", error);
        $('#pass').val('');
      }
      else {
        //console.log("Authenticated successfully with payload:", authData);
        Jr.Navigator.navigate('home',{
          trigger: true,
          animation: {
            // This time slide to the right because we are going back
            type: Jr.Navigator.animations.SLIDE_STACK,
            direction: Jr.Navigator.directions.LEFT
          }
        });
        window.location.reload();
      }
    });
  }
});

var RegisterView = Jr.View.extend({
  render: function(){
    this.$el.html(RegisterTemplate);
    return this;
  },
  events: {
    'click #btnRegister': 'onClickRegister'
  },

  onClickRegister: function() {
    var emailAddr = $('#emailAddr').val();
    var pass = $('#pass').val();
    var confirmPass = $('#confirm_pass').val();
    var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if(pass!=confirmPass) {
      console.log("Passwords do not match.");
      $('#pass').val('');
      $('#confirm_pass').val('');
      alert("Passwords do not match.");
    }

    /*else if(pass.match(passw)){
      console.log("Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter.");
      $('#pass').val('');
      $('#confirm_pass').val('');
      alert("Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter.");
    }*/

    else {
      ref.createUser({
        email: emailAddr,
        password: pass
      }, function(error, userData) {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              console.log("The new user account cannot be created because the email is already in use.");
              alert("The new user account cannot be created because the email is already in use.");
              break;
            case "INVALID_EMAIL":
              console.log("The specified email is not a valid email.");
              alert("The specified email is not a valid email.");
              break;
            default:
              console.log("Error creating user:", error);
              alert("Error creating user:", error);
              break;
          }
          $('#pass').val('');
          $('#confirm_pass').val('');
        }
        else {
          this.userId = userData.uid;
          userCollection.add({id: this.userId, events: ""});
          this.TaskCollection = Backbone.Firebase.Collection.extend({
            url: "https://flickering-fire-9493.firebaseio.com/users/"+this.userId
          });

          console.log("Successfully created user account with uid:", userData.uid);
          alert("User successfully created.");

          //now we need to log the user in

          ref.authWithPassword({
            "email": emailAddr,
            "password": pass
          },
          function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
              alert("Login Failed!", error);
              $('#pass').val('');
            }
            else {
              //console.log("Authenticated successfully with payload:", authData);
              Jr.Navigator.navigate('home',{
                trigger: true,
                animation: {
                  // This time slide to the right because we are going back
                  type: Jr.Navigator.animations.SLIDE_STACK,
                  direction: Jr.Navigator.directions.LEFT
                }
              });
              window.location.reload();
            }
          });
        }
      });
    }
  }
});


var AddTaskView = Jr.View.extend({

  render: function(){
    this.$el.html(AddTaskTemplate);
    return this;
  },

  events: {
    'click #btnBack': 'onClickBack',
    'click #btnAdd': 'onClickAdd'
  },

  onClickBack: function() {

    Jr.Navigator.navigate('home',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      },

    });
    window.location.reload();
    return false;
  },

  onClickAdd: function() {
    var event_type = $('#event_type').val();
    var title = $('#txtTitle').val();
    var date = $('#date').val();
    var time = $('#time').val();
    var memento = $('#memento').is(':checked');
    var desc = $('#txtDesc').val();

    var authData = ref.getAuth();

    var TaskCollection = Backbone.Firebase.Collection.extend({
            url: "https://flickering-fire-9493.firebaseio.com/users/"+authData.uid+"/events/"
    });

    this.collection = new TaskCollection();

    //alert(date);
    this.collection.create(
        {
        event_type: event_type,
        title: title,
        date: date,
        time: time,
        description: desc,
        memento: memento
        },
        {
        wait:true,

        success: function(resp){
          console.log("Data sent to server");
          alert("Event added.");

          Jr.Navigator.navigate('home',{
          trigger: true
          });
          window.location.reload();
        },
        error : function(err) {
          console.log('error callback');
          // this error message for dev only
          alert('There was an error. See console for details');
          console.log(err);
        }
      }
  );
    //AppRouter.navigate("/home", true);
    return true;
  }
  });


var SettingsView= Jr.View.extend({
   render: function(){
    this.$el.html(SettingsTemplate);
    return this;
  },
  events: {
    'click #btnBack': 'onClickBack',
  },
  onClickBack: function() {
    Jr.Navigator.navigate('home',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      },
    });
    window.location.reload();
    return false;
  },
});


var ChangeEmailView = Jr.View.extend({
   render: function(){
    this.$el.html(ChangeEmailTemplate);
    return this;
  },
  events: {
    'click #btnBack': 'onClickBack',
    'click #btnChange': 'onClickChange'
  },
  onClickBack: function() {
    Jr.Navigator.navigate('settings',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      },
    });
    return false;
  },
  onClickChange: function() {
    var oldEmail = $('#txtOldEmail').val();
    var newEmail = $('#txtNewEmail').val();
    var pass = $('#pass').val();
   ref.changeEmail({
      oldEmail: oldEmail,
      newEmail: newEmail,
      password: pass
    }, function(error) {
      if (error) {
        switch (error.code) {
          case "INVALID_PASSWORD":
            console.log("The specified user account password is incorrect.");
            alert("The specified user account password is incorrect.");
            break;
          case "INVALID_USER":
            console.log("The specified user account does not exist.");
            alert("The specified user account does not exist.");
            break;
          default:
            console.log("Error changing email: ", error);
            alert("Error changing email: ", error);
            break;
        }
      }
      else {
        console.log("User email changed successfully!");
        alert("User email changed successfully!");
        Jr.Navigator.navigate('settings',{
          trigger: true,
          animation: {
            // This time slide to the right because we are going back
            type: Jr.Navigator.animations.SLIDE_STACK,
            direction: Jr.Navigator.directions.RIGHT
          },
        });
      }
    });
  },
});


var ChangePasswordView = Jr.View.extend({
   render: function(){
    this.$el.html(ChangePasswordTemplate);
    return this;
  },
  events: {
    'click #btnBack': 'onClickBack',
    'click #btnChange': 'onClickChange'
  },
  onClickBack: function() {
    Jr.Navigator.navigate('settings',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      },
    });
    return false;
  },
  onClickChange: function() {
    var email = $('#email').val();
    var oldPass = $('#oldPass').val();
    var newPass = $('#newPass').val();
    ref.changePassword({
      email: email,
      oldPassword: oldPass,
      newPassword: newPass
    }, function(error) {
      if (error) {
        switch (error.code) {
          case "INVALID_PASSWORD":
            console.log("The specified user account password is incorrect.");
            alert("The specified user account password is incorrect.");
            break;
          case "INVALID_USER":
            console.log("The specified user account does not exist.");
            alert("The specified user account does not exist.");
            break;
          default:
            console.log("Error changing password:", error);
            alert("Error changing password:", error);
            break;
        }
      } else {
        console.log("User password changed successfully!");
        alert("User password changed successfully!");
        Jr.Navigator.navigate('settings',{
          trigger: true,
          animation: {
            // This time slide to the right because we are going back
            type: Jr.Navigator.animations.SLIDE_STACK,
            direction: Jr.Navigator.directions.RIGHT
          },
        });
      }
    });
  },
});


var DeleteAccountView =Jr.View.extend({
   render: function(){
    this.$el.html(DeleteAccountTemplate);
    return this;
  },
  events: {
    'click #btnBack': 'onClickBack',
    'click #btnDelete': 'onClickDelete'
  },
  onClickBack: function() {
    Jr.Navigator.navigate('settings',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      },
    });
    return false;
  },
  onClickDelete: function() {
    var email = $('#email').val();
    var pass = $('#pass').val();
    var r = confirm("Are you sure you want to delete your account?");
    if (r == true) {
        ref.removeUser({
          email: email,
          password: pass
        }, function(error) {
          if (error) {
            switch (error.code) {
              case "INVALID_USER":
                console.log("The specified user account does not exist.");
                alert("The specified user account does not exist.");
                break;
              case "INVALID_PASSWORD":
                console.log("The specified user account password is incorrect.");
                alert("The specified user account password is incorrect.");
                break;
              default:
                console.log("Error removing user:", error);
                alert("Error removing user:", error);
                break;
            }
          }
          else {
            console.log("User account deleted successfully!");
            alert("User account deleted successfully!");
            Jr.Navigator.navigate('register',{
              trigger: true,
              animation: {
                // This time slide to the right because we are going back
                type: Jr.Navigator.animations.SLIDE_STACK,
                direction: Jr.Navigator.directions.RIGHT
              },
            });
            return false;
          }
        });
    }
    else {
      Jr.Navigator.navigate('settings',{
        trigger: true,
        animation: {
          // This time slide to the right because we are going back
          type: Jr.Navigator.animations.SLIDE_STACK,
          direction: Jr.Navigator.directions.RIGHT
        },
      });
      return false;
    }

  },
});

/*
 * ----------------------------------------------------------
 *  ROUTER
 * ----------------------------------------------------------
 */

var AppRouter = Jr.Router.extend({
  routes: {
    'home': 'home',
    'addTask': 'addTask',
    'login': 'login',
    'register': 'register',
    'settings' : 'settings',
    'changeEmail' : 'changeEmail',
    'changePassword' : 'changePassword',
    'deleteAccount' : 'deleteAccount'
  },

  home: function(){
    var authData = ref.getAuth();
    var homeView = new HomeView({
    });
    this.renderView(homeView);
  },
  addTask: function(){
    var authData = ref.getAuth();
    var TaskCollection = Backbone.Firebase.Collection.extend({
            url: "https://flickering-fire-9493.firebaseio.com/users/"+authData.uid+"/events/"
    });
    var collection = new TaskCollection();
    var addTaskView = new AddTaskView({ collection: collection });
    this.renderView(addTaskView);
  },
  login: function(){
    var loginView = new LoginView();
    this.renderView(loginView);
  },
  register: function (){
    var registerView = new RegisterView();
    this.renderView(registerView);
  },
  settings: function (){
    var settingsView = new SettingsView();
    this.renderView(settingsView);
  },
  changeEmail: function (){
    var changeEmailView = new ChangeEmailView();
    this.renderView(changeEmailView);
  },
  changePassword: function (){
    var changePasswordView = new ChangePasswordView();
    this.renderView(changePasswordView);
  },
  deleteAccount: function (){
    var deleteAccountView = new DeleteAccountView();
    this.renderView(deleteAccountView);
  },
});

var appRouter = new AppRouter();

Backbone.history.start();

if(ref.getAuth()==null) {
      Jr.Navigator.navigate('login',{
      trigger: true
    });
  }
else {
    Jr.Navigator.navigate('home',{
    trigger: true
  });
}

/*
Jr.Navigator.navigate('login',{
  trigger: true
});
*/