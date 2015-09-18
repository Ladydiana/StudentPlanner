var TaskCollection;

var UsersCollection = Backbone.Firebase.Collection.extend({
    url: "https://flickering-fire-9493.firebaseio.com/users"
});

var userId;
var userCollection = new UsersCollection();

var ref = new Firebase("https://flickering-fire-9493.firebaseio.com");
var lastCheckedDate = new Date();
var month= lastCheckedDate.getMonth()+1;
var day= lastCheckedDate.getDate();
if (month<10)
  month="0"+month;
if(day<10)
  day="0"+day;
var dateToString= lastCheckedDate.getFullYear()+"-"+month+"-"+day;


/*
 * ----------------------------------------------------------
 *  TEMPLATES
 * ----------------------------------------------------------
 */

var FooterTabTemplate = [
  '<nav class="bar bar-tab">',
    '<a class="tab-item active" href="#home" onclick="window.location.reload();">',
    '  <span class="icon icon-home"></span>',
    '  <span class="tab-label">Home</span>',
    '</a>',
    '<a class="tab-item" href="#addTask">',
    '  <span class="icon icon-edit"></span>',
    '  <span class="tab-label">Add Task</span>',
    '</a>',
    '<a class="tab-item" href="#settings">',
    '  <span class="icon icon-gear"></span>',
    '  <span class="tab-label">Settings</span>',
    '</a>',
    '<a class="tab-item" href="#logout">',
    '  <span class="icon icon-close"></span>',
    '  <span class="tab-label">Logout</span>',
    '</a>',
  '</nav>'
].join('\n');


var HomeTemplate = [
  // Put in a div with class content.  Ratchet will style this appropriately.
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',
  //'<button id="btnAddTask" class="btn pull-right">Add Task</button>',
  //'<button id="btnLogout" class="btn btn-link btn-nav pull-left">Logout</button>',
  '<h1 class="title">Student Planner</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<br />',
  '<br />',
  //'<ul id="lst" class="table-view">',
  '<ul class="table-view table-view-divider" id="today">Today</ul>',
  '<ul class="table-view table-view-divider" id="tomorrow">Tomorrow</ul>',
  '<ul class="table-view table-view-divider" id="this_month">This Month</ul>',
  '<ul class="table-view table-view-divider" id="this_year">Later This Year</ul>',
  //'</ul>',
  '<br/>',
  '<br/>',
  '</div>'
  // Join the array with a new-line for a quick and easy html template.
].join('\n').concat(FooterTabTemplate);


var ViewTaskTemplate = [
'<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',
  '<button id="btnBack" class="btn btn-link btn-nav pull-left">',
  '<span class="icon icon-left-nav"></span>', //for the left icon
  'Back</button>',
  '<h1 class="title">Edit Task</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<br />',
  '<ul id="lst2" class="table-view">',
].join('\n');


var LoginTemplate = [
  '<nav class="bar bar-standard" >',
  '<header class="bar bar-nav" >',
  '<br/>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<br />',
  '<img src="img/logo2.png" alt="Student Planner" style="margin:0px auto;display:block";">',
  '<br/>',
  '<br/>',
  '<form style="background-color: white;">',
  '<input type="text" id="emailAddr" placeholder="Email">',
  '<input type="password" id="pass" placeholder="Password">',
  '<button id="btnLogin" class="btn btn-primary btn-block">Sign in</button>',
  '</form>',
  '<br/>',
  '<a href="#register" style="margin:auto; text-align:center; display:block;">Don\'t have an account? Click here to REGISTER.</a>',
  '</div>'
].join('\n');


var RegisterTemplate = [
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<img src="img/logo2.png" alt="Student Planner" style="margin:0px auto;display:block">',
  '<br/>',
  '<br/>',
  '<form>',
  '<input type="text" id="emailAddr" placeholder="Email" required>',
  '<input type="password" id="pass" placeholder="Password" required>',
  '<input type="password" id="confirm_pass" placeholder="Confirm Password" required>',
  '<button id="btnRegister" class="btn btn-primary btn-block">Register</button>',
  '<br />',
  '<a href="#login" style="margin:auto; text-align:center; display:block;">Already have an account? Click here to LOGIN.</a>',
  '</form>',
  '</div>'
].join('\n');


var AddTaskTemplate = [
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',
  '<button id="btnBack" class="btn btn-link btn-nav pull-left">',
  '<span class="icon icon-left"></span>', //for the left icon
  'Back</button>',
  '<h1 class="title">Add Task</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary" >',
  '<br />',
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
  '<input type="date" name="date" id="date" value='+dateToString+'>',
  '<input type="time" name="time" id="time" value="00:00">',
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
  '<button id="btnAdd" class="btn btn-primary btn-block">Save Task</button>',
  '</form>',
  '<br />',
  '<br />',
  '<br />',
  '<br />',
  '</div>'
].join('\n').concat(FooterTabTemplate);


var SettingsTemplate =[
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',
  '<button id="btnBack" class="btn btn-link btn-nav pull-left">',
  '<span class="icon icon-left-nav"> </span>', //for the left icon
  'Back</button>',
  '<h1 class="title">Settings</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<br />',
  '<br />',
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
].join('\n').concat(FooterTabTemplate);


var ChangeEmailTemplate =[
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',
  '<button id="btnBack" class="btn btn-link btn-nav pull-left">',
  '<span class="icon icon-left-nav"></span>', //for the left icon
  'Back</button>',
  '<h1 class="title">Change Username</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<br />',
  '<br />',
  '<form class="input-group" method="post" action="">',
  '<input id="txtOldEmail" type="text" placeholder="Old email address">',
  '<input id="txtNewEmail" type="text" placeholder="New email address">',
  '<input id="pass" type="password" placeholder="Password">',
  '<button id="btnChange" class="btn btn-primary btn-block">Change</button>',
  '</form>',
  '</div>'
].join('\n').concat(FooterTabTemplate);


var ChangePasswordTemplate =[
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',
  '<button id="btnBack" class="btn btn-link btn-nav pull-left">',
  '<span class="icon icon-left-nav"></span>', //for the left icon
  'Back</button>',
  '<h1 class="title">Change Password</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<br />',
  '<br />',
  '<form class="input-group" method="post" action="">',
  '<input id="email" type="text" placeholder="Email address">',
  '<input id="oldPass" type="password" placeholder="Password">',
  '<input id="newPass" type="password" placeholder="New password">',
  '<button id="btnChange" class="btn btn-primary btn-block">Change</button>',
  '</form>',
  '</div>'
].join('\n').concat(FooterTabTemplate);


var DeleteAccountTemplate =[
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',
  '<button id="btnBack" class="btn btn-link btn-nav pull-left">',
  '<span class="icon icon-left-nav"></span>', //for the left icon
  'Back</button>',
  '<h1 class="title">Delete Account</h1>',
  '</header>',
  '</nav>',
  '<div class="bar bar-standard bar-header-secondary">',
  '<br />',
  '<br />',
  '<form class="input-group" method="post" action="">',
  '<input id="email" type="text" placeholder="Email address">',
  '<input id="pass" type="password" placeholder="Password">',
  '<button id="btnDelete" class="btn btn-primary btn-block">Delete</button>',
  '</form>',
  '</div>'
].join('\n').concat(FooterTabTemplate);


var LogoutTemplate =[];

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
   //console.log("This", todoList);
   var title = todoList.attributes.title;
   var desc = todoList.attributes.description;
   var event_type = todoList.attributes.event_type;
   var date = todoList.attributes.date;
   var time = todoList.attributes.time;
   var memento = todoList.attributes.memento;
   var id = todoList.attributes.id;
   var ic= "";

   if(event_type=="Homework")
    ic="icon-compose";
   if(event_type=="Project")
    ic="icon-list";
   if(event_type=="Course")
    ic="icon-pages";
   if(event_type=="Lab")
    ic="icon-code";
   if(event_type=="Exam")
    ic="icon-star-filled";
   if(event_type=="Meeting")
    ic="icon-person";
   if(event_type=="Other")
    ic="icon-more";

   var year=lastCheckedDate.getFullYear();
   var month=lastCheckedDate.getMonth()+1;
   var day = lastCheckedDate.getDate();
   var split = date.split('-');

   //console.log(year+"-"+month+"-"+day+ "/" + split[0]+"-"+split[1]+"-"+split[2]);

   if(split[0]<year)
    return;
   else if(split[1]<month)
    return;
   else if(split[2]<day && split[1]<=month)
    return;
   else {
    if(day==split[2])
      $('#today').append('<li class="table-view-cell media home"><a href="#editItem/'+id+'" id="'+id+'" class="navigate-right">' + '<span class="media-object icon ' + ic + ' "></span>' +'  '+ date+ " " + time + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ title + '</a></li>');
    else if(month==split[1] && split[2] == day+1 )
      $('#tomorrow').append('<li class="table-view-cell media home"><a href="#editItem/'+id+'" id="'+id+'" class="navigate-right">' + '<span class="media-object icon ' + ic + ' "></span>' +'  '+ date+ " " + time + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ title + '</a></li>');
    else if(month==split[1] && split[2] > day)
      $('#this_month').append('<li class="table-view-cell media home"><a href="#editItem/'+id+'" id="'+id+'" class="navigate-right">' + '<span class="media-object icon ' + ic + ' "></span>' +'  '+ date+ " " + time + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ title + '</a></li>');
    else if(year==split[0] && split[1] > month)
      $('#this_year').append('<li class="table-view-cell media home"><a href="#editItem/'+id+'" id="'+id+'" class="navigate-right">' + '<span class="media-object icon ' + ic + ' "></span>' +'  '+ date+ " " + time + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ title + '</a></li>');

    //console.log(year+"-"+month+"-"+day+ "/" + split[0]+"-"+split[1]+"-"+split[2]);
   }
  },

  events: {
    'click #btnAddTask': 'onClickAddTask',
    'click #btnLogout': 'onClickLogout',
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
  },
});

function editItem(id) {
    //alert("clicked"+ id);
    //Backbone.history.navigate("#editItem/"+id, true);
    //window.location.reload();
    Backbone.history.navigate("#editItem/"+id, {
                trigger: true,
                forceReload: true
            });
  }

function schedule (id, title) {
  cordova.plugins.notification.local.schedule({
  id: id,
  text: title,
  icon: null,
  sound: null,
  data: { test: id }
  });
};


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
            //
            type: Jr.Navigator.animations.SLIDE_STACK,
            direction: Jr.Navigator.directions.LEFT
          }
        });
        window.location.reload();
      }
      //window.location.reload();
    });
    //window.location.reload();
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
    var now = new Date().getTime();
    var  _5_sec_from_now = new Date(now + 5 * 1000);

    var authData = ref.getAuth();

    var TaskCollection = Backbone.Firebase.Collection.extend({
      url: "https://flickering-fire-9493.firebaseio.com/users/"+authData.uid+"/events/"
    });

    if (typeof time === 'undefined')
      time="00:00";
    if(typeof date == 'undefined')
      date=lastCheckedDate.getFullYear()+"-"+(lastCheckedDate.getMonth()+1)+"-"+lastCheckedDate.getDate();

    this.collection = new TaskCollection();

    var dateSplit= date.split("-");
    var timeSplit= time.split(":");
    id= dateSplit[0]+""+dateSplit[1]+""+dateSplit[2]+""+timeSplit[0]+timeSplit[1];


    if(typeof cordova !== 'undefined' && memento) {
      cordova.plugins.notification.local.schedule({
        id: 1,
        title: event_type,
        text: title,
        at: _5_sec_from_now
      });

      cordova.plugins.notification.local.schedule({
        id: id,
        title: event_type,
        text: title,
        at: new Date(dateSplit[0], dateSplit[1], dateSplit[2], timeSplit[0], timeSplit[1])
      });

      cordova.plugins.notification.local.schedule({
        id: id,
        title: event_type,
        text: title,
        at: new Date(dateSplit[0], dateSplit[1], dateSplit[2], timeSplit[0]-1, timeSplit[1])
      });
    }

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
    this.collection;
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

function hashcode(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}


var ViewTaskView = Jr.View.extend({
  initialize: function(){
  },

  render: function(){
    //console.log(this.model);

    //console.log("This", this.model.id);
    var authData = ref.getAuth();
   //var taskRef = new Firebase( "https://flickering-fire-9493.firebaseio.com/users/"+authData.uid+"/events/");
   //console.log(taskRef.toString());
    var UsersCollection = Backbone.Firebase.Collection.extend({
      url: "https://flickering-fire-9493.firebaseio.com/users/"+authData.uid+"/events/"
    });


    var userCollection = new UsersCollection();

    var todoItem = userCollection._byId[this.model.id];

    //console.log(todoItem);

    if(typeof todoItem != 'undefined') {
       var title = todoItem.attributes.title;
       var desc = todoItem.attributes.description;
       var event_type = todoItem.attributes.event_type;
       var event_date = todoItem.attributes.date;
       var event_time = todoItem.attributes.time;
       var memento = todoItem.attributes.memento;
       var id = todoItem.attributes.id;
       var sel = ["Homework", "Project", "Course", "Lab", "Exam", "Meeting", "Other"];
       var index = sel.indexOf(event_type);
       if (index > -1)
          sel.splice(index, 1);
      var checked;

      if(memento)
        checked="checked";
      else
        checked="";

      var dateSplit= event_date.split("-");
      var timeSplit= event_time.split(":");
      var month= dateSplit[1];
      var day= dateSplit[2];
      //if (month<10)
      //  month="0"+month;
      //if(day<10)
      //  day="0"+day;
      var dateToString= dateSplit[0]+"-"+month+"-"+day;
      var hour= timeSplit[0];
      var minute= timeSplit[1];
      //if(hour<10)
      //  hour="0"+hour;
      //if(minute<10)
      //  minute="0"+minute;
      var timeToString= hour+":"+minute;

      var hiddenForm= '<form><select name="event_type" id="event_type"><option value="'+event_type+'" selected>'+event_type+'</option><option value="'+sel[0]+'">'+sel[0]+'</option><option value="'+sel[1]+'">'+sel[1]+'</option><option value="'+sel[2]+'">'+sel[2]+'</option><option value="'+sel[3]+'">'+sel[3]+'</option><option value="'+sel[4]+'">'+sel[4]+'</option><option value="'+sel[5]+'">'+sel[5]+'</option></select><input type="text" id="title" value="'+title+'" ><input type="date" id="date" value="'+dateToString+'" onfocus="'+(type="date")+'" placeholder="Date YYYY-MM-DD"><input type="time" id="time" value="'+timeToString+'" placeholder="Time HH:MM" ><textarea id="desc" value="'+desc+'" placeholder="Description" ></textarea><input type="checkbox" id="memento" name="memento" class="cmn-toggle cmn-toggle-round"'+checked+'>Memento<label for="memento"></label><input type="hidden" id="idI" value="'+id+'" ><br /><button id="btnDelete" class="btn btn-primary" style="float: right;">Delete</button><button id="btnEdit" class="btn btn-primary" style="float: left;">Edit</button></form>';
      this.$el.html(ViewTaskTemplate+'<li class="table-view-cell list-item">'  + hiddenForm + '</li></ul><br/><br/><br/>'+FooterTabTemplate);
   }
    return this;
  },

  events: {
    'click #btnBack': 'onClickBack',
    'click #btnDelete': 'onClickDelete',
    'click #btnEdit' : 'onClickEdit'
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

  onClickDelete: function() {
    var authData = ref.getAuth();
    var r= confirm("Are you sure you want to delete this event?");

    if (r == false)
      return false;

    else {
      var itemToDelete = new Firebase("https://flickering-fire-9493.firebaseio.com/users/"+authData.uid+"/events/"+this.model.id);
      itemToDelete.remove();

      Jr.Navigator.navigate('home',{
        trigger: true,
        animation: {
          // This time slide to the right because we are going back
          type: Jr.Navigator.animations.SLIDE_STACK,
          direction: Jr.Navigator.directions.RIGHT
        },

      });
      window.location.reload(); 
    }
    return false;
  },

  onClickEdit: function() {
    var authData = ref.getAuth();
    var itemToEdit = new Firebase("https://flickering-fire-9493.firebaseio.com/users/"+authData.uid+"/events/"+this.model.id);
    var event_type = $('#event_type').val();
    var title = $('#title').val();
    var date = $('#date').val();
    var time = $('#time').val();
    var memento = $('#memento').is(':checked');
    var desc = $('#desc').val();

    // Prevents a Firebase error throwing. Submitting data as undefined triggers a Firebase error
    if(typeof event_type == 'undefined')
      event_type=null;
    if(typeof title == 'undefined')
      title=null;
    if(typeof date == 'undefined')
      date=null;
    if(typeof time == 'undefined')
      time=null;
    if(typeof memento == 'undefined')
      memento=null;
    if(typeof desc == 'undefined')
      desc=null;

    var onComplete = function(error) {
      if (error) {
        console.log('Synchronization failed');
        alert('Synchronization failed', error);
      }
      else {
        console.log('Synchronization succeeded');
        alert("Item edited.");
      }
    };

    itemToEdit.update({ title: title, event_type: event_type,  date: date, time: time, description : desc, memento : memento }, onComplete);

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
  }
});


var LogoutView = Jr.View.extend({

  render: function(){

    this.$el.html(LogoutTemplate);

    ref.unauth();

    Jr.Navigator.navigate('login',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
    return this;
  }
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
    'deleteAccount' : 'deleteAccount',
    'logout': 'logout',
    "editItem/:id": "handleRouteAll"
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

  logout: function (){
    var logoutView = new LogoutView();
    this.renderView(logoutView);
  },

  handleRouteAll: function(id){
    var authData = ref.getAuth();

    var Event = Backbone.Model.extend({
    urlRoot: '#editItem'
    });
    var ev = new Event({id: id});
    ev.fetch();
    //console.log(ev);
    var editTaskView = new ViewTaskView({ model: ev });
    this.renderView(editTaskView);
  }
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