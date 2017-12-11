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

socket.on('newLocationMessage', function(message) {
  console.log('New Location Message', message);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(message.from + ': ');
  a.attr('href', message.url )
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').submit(function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'user',
    text: $('[name=message]').val()
  },function(data){
    console.log(data);
  });

});

var locationButon = $('#send-location');
locationButon.click(function(e){
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser.')
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  },function(){
    alert('Unable to fetch location.')
  })
});
