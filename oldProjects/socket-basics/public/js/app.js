var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'general';
var socket = io();

console.log(name + ' wants to join ' + room);

$('.room-title').text(room);
function updateScroll () {
    var element = document.querySelector(".chat--messages");
    element.scrollTop = element.scrollHeight;
}

socket.on('connect', function () {
  console.log('Connected to socket.io server!');
  socket.emit('joinRoom', {
    name: name,
    room: room
  });
});

socket.on('message', function (message) {
  var momentTimestamp = moment.utc(message.timestamp).local();
  var $messages = $('.messages');
  var $message = $('<li class="list-group-item"></li>');

  console.log('New message: ');
  console.log(message.text);

  $message.append('<p><strong>' + message.name + ' ' +
   momentTimestamp.format('h:mm a: ') + '</strong></p>')
  $message.append('<p>' + message.text + '</p>')
  $messages.append($message);
  updateScroll();
});

var $form = $('#message-form');

$form.on('submit', function (event) {
  event.preventDefault();
  var $message = $form.find('input[name=message]');

  socket.emit('message', {
    name: name,
    text: $message.val()
  });

  $message.val('');

});


//prevent default is used on forms when you don't
 // want to submit old fashioned way
//by refreshing the entire page. Good for sockets or
//ajax requests to handle the form submission on your own
