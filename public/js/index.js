var socket = io();

socket.on('connect', function(){
  console.log('Connect to server');
});

socket.on('disconnect', function(){
  console.log('Disconnected from server')
});

socket.on('newMessage', function(message) {
  console.log('New Message', message);
  var li = jQuery('<li></li>');
  li.text(message.from +': '+message.text);
  $('#messages').append(li);
});

$(window).ready(function(){
  $('#message-form').submit(function(e){
    e.preventDefault();
    socket.emit('createMessage',{
      from: 'user',
      text: $('[name=message]').val()
    },function(data){
      console.log(data);
    });

  });
});
