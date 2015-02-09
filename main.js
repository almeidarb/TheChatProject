$(document).ready(function () {
  chat.init();
  // chat.deleteMessage("54d5021eb1cce4030000003e");

  setInterval(function (){
    chat.renderMessages();
  }, 1000);

});

var chat = {

  init: function () {
    chat.initStyling();
    chat.initEvents();
  },

  initStyling: function () {
    chat.renderMessages();
  },

  initEvents: function () {

    $('#createMessage').on('submit', function (event) {
      event.preventDefault();
      console.log("submit working");

      var newMessage = {
        user: $(this).find('input[name="userName"]').val(),
        message: $(this).find('input[name="newMessage"]').val()
      };
<<<<<<< HEAD

      console.log(newMessage);

      chat.createMessage(newMessage);

=======

      chat.createMessage(newMessage);

      function populatestorage(newMessage) {
        localStorage.setItem(newMessage);
        console.log("my local storage")
      }
>>>>>>> f27e8f4a1a7ea158eaa462c3e3d10ffac75eb93a
    });

    $('section').on('click', '.delete-message', function (event) {
      event.preventDefault();
      var taskId = $(this).closest('article').data('taskid');
      console.log(taskId);
      chat.deleteMessage(taskId);
    });
  },

  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/snoopy',
  },

  render: function (data, tmpl, $el) {
    var template = _.template(data, tmpl);

    $el.appendChild(template);
  },

  renderMessages: function () {
    $.ajax({
      url: chat.config.url,
      type: 'GET',
      success: function (chat) {
        console.log(chat);
        var template = _.template($('#mssgTmpl').html());
        var markup = "";
        chat.forEach(function (message, idx, arr) {
          markup += template(message);
        });
        $('section').html(markup);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  createMessage: function (message) {
    console.log(message);

    $.ajax({
      url: chat.config.url,
      data: message,
      type: 'POST',
      success: function (data) {
        console.log(data);
        chat.renderMessages();

<<<<<<< HEAD
//TESTING//

      var uid = ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
       console.log(uid);

       localStorage.setItem(uid, JSON.stringify(data));
       var restoredSession = JSON.parse(localStorage.getItem(uid));
       console.log(restoredSession);


=======
        var uid = ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
        console.log(uid);

        localStorage.setItem(uid, JSON.stringify(data));
        var restoredSession = JSON.parse(localStorage.getItem(uid));
>>>>>>> f27e8f4a1a7ea158eaa462c3e3d10ffac75eb93a

        // Clears the message field on submit
        $('input.message-input').val('');
      },
      error: function (err) {
        console.log(err);
      },
    });

  },

  deleteMessage: function (id) {

    $.ajax({
      url: chat.config.url + '/' + id,
      type: 'DELETE',
      success: function (data) {
      console.log(data);
      chat.renderMessages();
    },
      error: function (err) {
      console.log(err);
    }
  });

 }

};
