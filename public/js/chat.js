var socket = io();

function scrollToBottom() {
  // selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  // heights
  var clientheight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageheight = newMessage.prev().innerHeight();

  if(clientheight + scrollTop + newMessageHeight + lastMessageheight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  var params = $.deparam(window.location.search);
  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('No error');
    }
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from server')
});

socket.on('updateUserList',function(users){
  var ol = $('<ol></ol>');
  users.forEach(function(user){
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
});

socket.on('newMessage', function(message) {
  var template = $('#message-template').html();
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template,{
    from: message.from,
    text: message.text,
    createdAt: formatedTime
  });
  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template,{
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  })
  $('#messages').append(html);
  scrollToBottom();
});

$('#message-form').submit(function(e){
  e.preventDefault();
  var messageTextBox = $('[name=message]');
  if(messageTextBox.val() == ''){
    return false;
  }
  socket.emit('createMessage',{
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
