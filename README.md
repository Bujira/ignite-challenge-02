# ignite-challenge-02
A NodeJS course challenge to create a REST API for managing tasks (to-do list) using JavaScript, emphasizing on using middlewares.

Middleware names were assigned by Rocketseat learning institution.

### Middlewares:

#### 1. checksExistsUserAccount
#### Should be able to find user by username in header and pass it to request.user
#### Should not be able to find a non existing user by username in header
This middleware will check if an account exists by username before proceeding with the route.<br><br>

#### 2. checksCreateTodosUserAvailability
#### Should be able to let user with a free account create a new to-do as long as the number of to-do's in the account is less than or equal to ten
#### Should not be able to let user with a free account create a new to-do when the account already has ten to-do's
#### Should be able to let user with PRO account create infinite new to-do's
In this API the user must have a PRO account in order to create infite tasks, otherwise the user can only create 10 tasks.<br>
This middleware will check if the user can still create to-do's before proceeding with the route.<br><br>

#### 3. checksTodoExists
#### Should be able to put user and todo in request when both exits
#### Should not be able to put user and todo in request when user does not exists
#### Should not be able to put user and todo in request when todo id is not uuid
#### Should not be able to put user and todo in request when todo does not exists
This middleware will check if the to-do referred to exists before proceeding with the route.<br><br>

#### 4. findUserById
#### Should be able to find user by id route param and pass it to request.user
#### Should not be able to pass user to request.user when it does not exists
This middleware will check if an account exists by user ID before proceeding with the route.<br><br>

### Routes:

#### Should be able to create a new user

#### Should not be able to create a new user when username already exists

#### Should be able to list user info using user's id

#### Should be able to update user to PRO by using user's id

#### Should be able to list all user's to-do's

#### Should be able to create a new to-do

#### Should be able to update a to-do

#### Should not be able to update a non existing to-do

#### Should be able to mark a to-do as done

#### Should not be able to mark a non existing todo as done

#### Should be able to delete a todo

#### Should not be able to delete a non existing to-do
