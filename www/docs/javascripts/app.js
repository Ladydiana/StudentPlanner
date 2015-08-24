var HomeTemplate = [
  // Put in a div with class content.  Ratchet will style this appropriately.
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',

  '<button id="btnAddTask" class="btn pull-right">Add Task</button>',
  '<button id="btnLogout" class="btn btn-link btn-nav pull-left">Logout</button>',
  '<h1 class="title">ToDo List Junior App</h1>',
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
  '<input type="text" id="emailAddr" placeholder="Email">',
  '<input type="password" id="pass" placeholder="Password">',
  '<input type="password" id="pass" placeholder="Confirm Password">',
  '<button id="btnRegister" class="btn btn-positive btn-block">Register</button>',
  '</form>',
  '</div>'


].join('\n');


var CarouselTemplate = [
  '<nav class="bar bar-standard">',
  '<header class="bar bar-nav">',

  '<div class="bar bar-standard bar-header-secondary">',

  ' <div class="carousel-container">',
  '   <ul class="carousel-list">',
  '     <li class="carousel-item native-look-and-feel">',
  '       <summary>Transitions with a native look and feel.</summary>',
  '       <div class="feature-icon"></div>',
  '     </li>',
  '     <li class="carousel-item carousel-content">',
  '       <summary>Carousels using flickable.js</summary>',
  '       <i class="icon-picture"></i>',
  '     </li>',
  '     <li class="carousel-item backbone-content">',
  '       <summary>Integrated with Backbone.js</summary>',
  '       <div class="feature-icon"></div>',
  '     </li>',
  '   </ul>',
  ' <div class="carousel-navigation-container">',
  '   <ul class="carousel-navigation"><li class="active" data-index="0"></li><li data-index="1"></li><li data-index="2"></li></ul>',
  ' </div>',
  ' </div>',

  '<button id="btnLogin" class="btn btn-positive btn-block">Login</button>',
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
  '<form>',
  '<input id="txtName" type="text" placeholder="Full name">',
  '<input id="txtTitle" type="text" placeholder="Title">',
  '<textarea id="txtDesc" placeholder="Description" rows="3"></textarea>',
  '<button id="btnAdd" class="btn btn-positive btn-block">Save Task</button>',
  '</form>',
  '</div>'

].join('\n');

var TaskCollection = Backbone.Firebase.Collection.extend({
    url: "https://flickering-fire-9493.firebaseio.com/ToDo"
});


var HomeView = Jr.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addOne);
  },

  render: function(){
    this.$el.html(HomeTemplate);
    return this;
  },

  addOne: function(todoList) {
   console.log(todoList);
   var name = todoList.attributes.name;
   var title = todoList.attributes.title;
   var desc = todoList.attributes.description;
   $('#lst').append('<li class="table-view-cell">' + title + ': ' + desc + ' by ' + name + '</li>');
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

    Jr.Navigator.navigate('home',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
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

    Jr.Navigator.navigate('home',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
  }
});


var CarouselView = Jr.View.extend({
  render: function(){
    this.$el.html(CarouselTemplate);
    this.afterRender();
    return this;
  },
  afterRender: function() {
    this.setUpCarousel();
  },

  setUpCarousel: function() {
    var after = function() {
        this.$('.carousel-list').flickable({segments:3});
    };
    setTimeout(after,1);
  },
  events: {
    'click #btnLogin': 'onClickLogin',
    'onScroll .carousel-list': 'onScrollCarousel',
    'click .carousel-navigation li': 'onClickCarouselNavigationItem'
  },

  onClickLogin: function() {

    Jr.Navigator.navigate('login',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
  },

  onScrollCarousel: function() {
      var index = this.$('.carousel-list').flickable('segment');
    this.$('.carousel-navigation li').removeClass('active');
    this.$('.carousel-navigation li[data-index="'+index+'"]').addClass('active');
  },

  onClickCarouselNavigationItem: function(e) {
    var index = $(e.currentTarget).attr('data-index');
    this.$('.carousel-list').flickable('segment',index);
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
      }
    });
  },
  onClickAdd: function() {
    var name = $('#txtName').val();
    var title = $('#txtTitle').val();
    var desc = $('#txtDesc').val();
    this.collection.create({
        name: name,
        title: title,
        description: desc
    });
    //AppRouter.navigate("/home", true);
    Backbone.history.navigate("/home", true);
    return false;
  },

});


var AppRouter = Jr.Router.extend({
  routes: {
    'home': 'home',
    'addTask': 'addTask',
    'login': 'login',
    'register': 'register',
    'carousel': 'carousel',
  },

  home: function(){
    var collection = new TaskCollection();
    var homeView = new HomeView({
        collection: collection
    });
    this.renderView(homeView);
  },
  addTask: function(){
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
  carousel: function(){
    var carouselView = new CarouselView();
    this.renderView(carouselView);
  }

});

var appRouter = new AppRouter();
Backbone.history.start();
Jr.Navigator.navigate('home',{
  trigger: true
});