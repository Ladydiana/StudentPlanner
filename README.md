# StudentPlanner

StudentPlanner is a hybrid planner app developed using HTML5, CSS3, Javascript, NoSQL, Junior, Backbone, Firebase as server and Cordova.

![alt tag](https://farm5.staticflickr.com/4432/36084324053_46fa89a2de_z.jpg)

![alt tag](https://farm5.staticflickr.com/4389/36084323953_1aa7990d8f_z.jpg)

![alt tag](https://farm5.staticflickr.com/4429/36084324643_a4442ff7ba_z.jpg)

![alt tag](https://farm5.staticflickr.com/4359/36084324523_78db62933f_z.jpg)

![alt tag](https://farm5.staticflickr.com/4428/36084324343_69b7cb68e5_z.jpg)

-----------------------------------------------
## Database:
At the time of the development, the database server was found here: : https://flickering-fire-9493.firebaseio.com/
If the database would be relational, it could translate roughly to this schema:

![alt tag](https://farm5.staticflickr.com/4416/36721757192_2ac2417f8f_z.jpg)

How the database looks like in Firebase:

![alt tag](https://farm5.staticflickr.com/4346/36721757142_36cff8c97b_z.jpg)


-----------------------------------------------
## App structure:
The application is structured in pages (for the web interface, or views for the mobile interface).

The goal was to streamline traffic and ensure a good user experience.

With Backbone, I created a history view at the start of the application that retains all views through which the user has passed, in order to ensure a good functioning of the 'Back' button.

Because I wanted to make a valid and applicable framework for all pages, I structured each page as follows:

- At the top is the menu bar that contains the Back button and the title of the view.

- Then follows the body specific to each page.

- In the bottom bar there is an interactive menu with buttons to Home, Add Event, Settings and Logout.

There is a single html file, the index, which contains the inclusions of all css files and the javascript scripts of the library, as well as the app.js scripts that contain the implementation of the application. 

Of course, .js file inclusions are at the end of the body tag (so loading is done only after the DOM tree has already been rendered and there is no delay time because the javascript is loaded at the end). This avoids the situation where due to javascript and jquery extensive modules there is a dead time when the page is not displayed at loading / reloading for a few seconds. 

All files are loaded from application folders and there are no online file dependencies that make loading the application more difficult.

The index page is actually the first view the user sees when entering the mobile application.

Therefore, the index page here is a redirect to other views. If the user is logged in, Home View is served. Otherwise, the user is redirected to Login View.


