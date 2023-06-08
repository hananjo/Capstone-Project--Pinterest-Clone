# Capstone-Project--Pinterest-Clone

# MVP List

PinterestClone, a Pinterest clone, is a website for users to post images to be pinned on boards.

## 1. New account creation, log in, log out, and guest/demo login

- Users can sign up, log in, and log out.
- Users can use a demo log in to try the site.
- Users can't use certain features without logging in (like products and reviews posts).
- Logged in users are directed to their profile page which displays their products.
- Logged out users are directed to a page displaying several recent products.

## 2. Pins

- Logged in users can create a pin.
- Logged in users can edit and delete their own pin.
- All users can view a sampling of the most recent pins.

## 3. Boards

- Logged in users can add pins to the boards.
- Logged in users can edit and delete their boards.
- Only logged in users can view their pins in their board.

## 4. Comments

- Logged in users can post comments on a given pin.
- Logged in users can edit and delete their own comment.
- All users can view comments on any given pin.

## 5. Images

- Logged in users can add an image to a given pin.
- Logged in users can update an image for a pin.
- All users that are browsing can view the images on a pin.

## 6. Search

- Logged in users can post a search to query for a specific pin

# Component List:

- AddCommentModal
- AddToBoardOptionsModal
- ProtectedRoute
- BoardDetails
- Boards
- CreateBoardLandingPage
- CreateBoardModal
- CreatePinModal
- DeleteBoardModal
- DeleteCommentmodal
- DeletePinModal
- LandingPage
- LoginFormModal
- index --Navigation
- ProfileButton
- OpenModalButton
- PinDetails
- SearchBar
- SearchResults
- SignupFormModal
- UpdateBoardForm
- UpdateCommentModal
- UpdatePin
- UploadPicture
- YourPins

# User-facing routes

## `/login`

### Log in page

This page displays a log in form

- `GET /login`
- `POST /login`

## `/signup`

This page displays a signup form.

### Sign up page

- `GET /signup`
- `POST /signup`

### Log out page

This page displays a redirect to the homepage

- `POST /logout`
- `GET /`

### Home page

## `/`

This page displays the most recent Pins and their name and short description, as well as a navigation bar with login/signup or logout buttons.

- `GET /`

### Pins Page

## `/pins/:id`

This page displays the Pins details with its features, name, description, and comments, as well as a navigation bar with login/signup or logout buttons. Each Pin has an update and delete button _if it belongs to the currently logged in user_. Logged in users can add pins to a board and also leave a comment on this page.

- `GET /pins/:id`
- `POST /pins/:id/boards/:id`
- `POST /pins/:id/comments`
- `POST /pins/new`
- `PUT /pins/:id`
- `DELETE /pins/:id/comment`
- `DELETE /pins/:id`

### Boards

## `/boards`

## This page displays the boards that a user adds pins to as well as the navigation bar with a login/signup or logout button. Each pin has the capability to be added to the board, as well as being able to be deleted and update.

- `GET /boards`
- `GET /boards/:id`
- `POST /boards`
- `PUT /boards/:id`
- `DELETE /bards/:id`

### Comments

## `/pins`

## This page displays the pins with the corresponding comments as well as a navigation bar with with a login/signup or logout button. Each logged in user can get all comments, post a review and delete a review that they created.

- `GET /pins/:id/comments`
- `POST /pins/:id/comments`
- `PUT /pins/:id/comments/:id`
- `DELETE /comments/:id`

### Images

## `/pins/:id`

## This page displays an image of the pin as well as a navigation bar with a login/signup or logout button. Each logged in user can load, post and delete an image to a pin listing.

- `GET /pins/:id/`
- `POST /pins/new`
- `DELETE /pins/images/:id`

### Search

## `/pins/search`

## This feature allows you to search a keyword which will pull up all pins that is associated with that word

- `POST /search`

# API-Routes

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## Users

- Users can sign up for a new account as well as login and log out

- `POST /api/login`
- `POST /api/signup`
- `POST /api/logout`

## Landing Page

- Users can load all pins on the landing page where they can view lots of various images

  - `GET /api/landing`

## Pins

- A logged in user can load, add, delete, and update pins listed in their boards.
  - `GET /api/pins`
  - `GET /api/pins/:id`
  - `POST /api/pins`
  - `PUT /api/pins/:id`
  - `DELETE /api/pins/:id`

[ \* `GET /api/users/:id/boards/:name/pins`

- `GET /api/users/:id/boards/:name/pins/:id`
- `POST /api/users/:id/boards/:id/pins`
- `PUT /api/users/:id/boards/:id/pins/:id`
- `DELETE /api/users/:id/boards/pins/:id`]

## Boards

- A logged in user can load, add, delete, and update a list of boards on their Pinterest account.
  - `GET /api/users/:id/boards`
  - `GET /api/users/:id/boards/:id`
  - `POST /api/users/:id/boards`
  - `PUT /api/users/:id/boards/:id`
  - `DELETE /api/users/:id/boards/:id`

## Comments

- A logged in user can leave a comment for a product as well as load, delete and update.
  - `GET /api/pins/:id/comments`
  - `POST /api/pins/:id/comments`
  - `PUT /api/pins/:id/comments/:id`
  - `DELETE /api/pins/comments/:id`

## Images

- A logged in user can load, add and delete an image for a pin

  - `GET /api/pins/:id/images`
  - `POST /api/pins/:id/images`
  - `DELETE /api/images/:id`

## Search

- A user can do a search for pins using keywords correlating to the name of the pin

  - `POST /api/pins/search`
