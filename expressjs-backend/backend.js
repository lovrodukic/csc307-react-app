const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const users = { 
  users_list :
  [
     { 
        id : 'xyz789',
        name : 'Charlie',
        job: 'Janitor',
     },
     {
        id : 'abc123', 
        name: 'Mac',
        job: 'Bouncer',
     },
     {
        id : 'ppp222', 
        name: 'Mac',
        job: 'Professor',
     }, 
     {
        id: 'yat999', 
        name: 'Dee',
        job: 'Aspring actress',
     },
     {
        id: 'zap555', 
        name: 'Dennis',
        job: 'Bartender',
     }
  ]
}

app.use(cors());

app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/users', (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
      let result = findUserByName(name);
      result = {users_list: result};
      res.send(result);
  }
  else {
      res.send(users);
  }
});

const findUserByName = (name) => { 
  return users['users_list'].filter( (user) => user['name'] === name); 
}

app.get('/users/:id', (req, res) => {
  const id = req.params['id']; //or req.params.id
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
    res.status(404).send('Resource not found.');
  else {
    result = {users_list: result};
    res.send(result);
  }
});

function findUserById(id) {
  return users['users_list'].find( (user) => user['id'] === id);
}

function generateID(user) {
  user.id = Math.floor(100000 + Math.random() * 900000).toString();
}

function addUser(user) {
  users['users_list'].push(user);
}

function removeUser(user) {
  const index = users['users_list'].indexOf(user);
  users['users_list'].splice(index, 1);
}

app.post('/users', (req, res) => {
  const userToAdd = req.body;
  generateID(userToAdd);
  addUser(userToAdd);
  res.status(201).send(userToAdd).end();
});

app.delete('/users/:id', (req, res) => {
  const id = req.params['id'];
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
    res.status(404).send('Resource not found.');
  else {
    removeUser(result);
    res.status(204).end()
  }
});
