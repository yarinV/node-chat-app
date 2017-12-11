const expect = require('expect');

const {Users} = require('./Users');

describe('Users', () => {

  var users;
  beforeEach(function(){
    users = new Users();
    users.users = [
      {id:1,name:'mike',room:'node course'},
      {id:2,name:'jen',room:'react course'},
      {id:3,name:'julie',room:'node course'}
    ];

  });

  it('should add new user', function(){
    var users = new Users();
    var user = {id:123, name: 'yarin', room: 'The office fans'};
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return name for node course', function(){
    var userList = users.getUserList('node course');
    expect(userList).toEqual(['mike','julie']);
  });

  it('should return name for react course', function(){
    var userList = users.getUserList('react course');
    expect(userList).toEqual(['jen']);
  });

  it('should remove a user', function(){
    var id = users.users[1].id;
    var removedUser = users.removeUser(id);
    expect(removedUser.id).toBe(id);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', function(){
    var id = 100;
    var removedUser = users.removeUser(id);
    expect(removedUser).toNotExist();
    expect(users.users.length).toBe(3);

  });

  it('should find user', function(){
    var id = users.users[1].id;
    var user = users.getUser(id);
    expect(user).toEqual(users.users[1]);
    expect(user.id).toBe(2);
  });

  it('should not find user', function(){
    var id = 100;
    var user = users.getUser(id);
    expect(user).toNotExist();
  });




});
