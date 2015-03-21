// mvc_app.js
(function(){
  

window.Chats = {};

  
  
  Chats.controller = {

    // fetch
    fetch: function(e){
      e.preventDefault()
      ChatList.fetch()
    },

    // signup
    signup: function(uname,pwd){
      //e.preventDefault()
      ChatList.signup(uname,pwd)
    },

    // signin
    signin: function(uname, pwd){
      //e.preventDefault()
      ChatList.signin(uname, pwd)
    },

    // postMessage
    postMessage: function(msg){
      //e.preventDefault()
      ChatList.postMessage(msg)
    }

  }

  function chatsForm(){
    //debugger;
    return $('<div class="heading">').append($('<h3>').text("Chatitude"))
      .append($('<form name="chatForm">').on('sumbit', function(e){
        e.preventDefault()
      }).append(
        $('<label>').text('User Name: '),
        $('<input type="text" id="username" name="username" >'),
        $('<label>').text('Password: '),
        $('<input type="text" id="password" name="password" >'),
        $('<label>').text('Message: '),
        $('<input type="text" id="message" name="message" >'),
        $('<br><button id="btnSignup">').text('SIGN-UP')
          .on('click', function(){
            Chats.controller.signup($('#username').val(),$('#password').val())
          }),
        $('<button id="btnSignin">').text('SIGN-IN')
          .on('click', function(){
            Chats.controller.signin($('#username').val(),$('#password').val())
          }),
        $('<button id="btnPost">').text('POST')
            .on('click', function(){
              Chats.controller.postMessage($('#message').val())
            })    
        )         
      )
    }

  function chatsView(chat){
    //user
    //message
    return $('<div class="chat">').append(
      $('<div>').append('User : ', chat.user),
      //$('<div>').append('Message : ', chat.message)
      $('<div>').append('Message : ', Chats.cleanChat(chat.message)) 
    )    

  }

  Chats.cleanChat = function(string){
      if(typeof string !== 'string'){
        return '';
      }
      var re = new RegExp("<|>addEventListener","g")
      return string.replace(re,"")
    }

  Chats.render = function (element){
    var chatsDOM = chatsForm()
      var myChats = ChatList.getData();
      $(element).empty().append(chatsDOM);
      for(var i = myChats.length - 1; i >= 0; i--){
          $(element).append(chatsView(myChats[i]))
      }      
    }
  

  Chats.mount = function(element){
    //var controller = new Chats.controller(element);
    Chats.render(element)
    App.pubsub.on('fetch_success', function(){
      Chats.render(element)
    });
  }

})()