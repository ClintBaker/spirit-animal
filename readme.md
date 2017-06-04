Spirit Animal React App

*Cloudinary for image handling

*React Redux front end

*Firebase database and authentication (Facebook)

*Use environment variables when deploying (Heroku video in React Developer course)

*Karma used for testing alongside Mocha

*Config file was saved in previous commit, you're going to need to create a new Firebase database before production so no one has that info

Figure out how to remove images from Cloudinary when user changes profile pic for efficiency sake.

*Start Login is inefficient (action).  You save the user's displayName to firebase every time they login.  Work on that when you have time.

*Still need to optimize startUserVote action (and when it gets called);

*Actions startMyStats address async inefficiencies with firebase call, and then dispatch twice (inside of forEach loop);
