var socket = io();

socket.on('connect', function(){
  console.log('Connect to server');
});

socket.on('disconnect', function(){
  console.log('Disconnected from server')
});

socket.on('newMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(message.from+' '+ formatedTime +': '+message.text);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
    li.text(message.from+' '+ formatedTime + ': ');
  a.attr('href', message.url )
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').submit(function(e){
  e.preventDefault();
  var messageTextBox = $('[name=message]');
  socket.emit('createMessage',{
    from: 'user',
    text: messageTextBox.val()
  },function(data){
    messageTextBox.val('');
  });

});

var locationButton = $('#send-location');
locationButton.click(function(e){
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser.')
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled');
    locationButton.text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  },function(){
      locationButton.removeAttr('disabled');
      locationButton.text('Send location');
    alert('Unable to fetch location.');
  })
});
