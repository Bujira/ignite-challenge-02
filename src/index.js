const express = require('express');
const cors = require('cors');

const { v4: uuidv4, validate } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

const users = [];


function checkUserAccountExists(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username)

  if (!user) {
    return response.status(400).json({ error: "Account not found!" })
  }

  request.user = user;

  return next();
}

function checkTodosAvailability(request, response, next) {
  const { user } = request;

  toDoCount = user.todos.length + 1;

  if (toDoCount > 10) {
    if (user.pro === false) {
      return response.status(400).json({ erro: "You can't create any more to-do's as a FREE member!" })
    }

    return next();
  }

  return next();
}

function checkTodoExists(request, response, next) {
  // Complete aqui
}

function findUserById(request, response, next) {
  // Complete aqui
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const usernameAlreadyExists = users.some((user) => user.username === username);

  if (usernameAlreadyExists) {
    return response.status(400).json({ error: 'Username already exists' });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    pro: true,
    todos: []
  };

  users.push(user);

  return response.status(201).json(user);
});

app.get('/users/:id', findUserById, (request, response) => {
  const { user } = request;

  return response.json(user);
});

app.patch('/users/:id/pro', findUserById, (request, response) => {
  const { user } = request;

  if (user.pro) {
    return response.status(400).json({ error: 'Pro plan is already activated.' });
  }

  user.pro = true;

  return response.json(user);
});

app.get('/todos', checkUserAccountExists, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post('/todos', checkUserAccountExists, checkTodosAvailability, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const newTodo = {
    id: uuidv4(),
    title,
    deadline: new Date(deadline),
    done: false,
    created_at: new Date()
  };

  user.todos.push(newTodo);


  return response.status(201).json(newTodo);
});

app.put('/todos/:id', checkTodoExists, (request, response) => {
  const { title, deadline } = request.body;
  const { todo } = request;

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.json(todo);
});

app.patch('/todos/:id/done', checkTodoExists, (request, response) => {
  const { todo } = request;

  todo.done = true;

  return response.json(todo);
});

app.delete('/todos/:id', checkUserAccountExists, checkTodoExists, (request, response) => {
  const { user, todo } = request;

  const todoIndex = user.todos.indexOf(todo);

  if (todoIndex === -1) {
    return response.status(404).json({ error: 'Todo not found' });
  }

  user.todos.splice(todoIndex, 1);

  return response.status(204).send();
});

module.exports = {
  app,
  users,
  checkUserAccountExists,
  checkTodosAvailability,
  checkTodoExists,
  findUserById
};