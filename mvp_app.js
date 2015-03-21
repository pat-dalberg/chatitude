// mvp_app.js
// $.ajax({
//   type: 'GET',
//   url: 'http://chat.api.mks.io/chats'
// }).success(function (chats) {
//   console.log("Got chats:", chats)
// })

// Presenter

(function(){

  window.Chats = {};

  
  
  Chats.Presenter = function(element){

    var $view = $(element)

    $view.on('click','#btnSignup', function(e){
      //console.log('clicked signup button')
      e.preventDefault();
      var user = $('#username').val();
      var pwd = $('#password').val();
      ChatList.signup(user,pwd);
    });

    this.render = function (){
      var myChats = ChatList.getData();
      $view.append(Chats.view);
      for(var i =0; i < myChats.length; i++){

          $view.append(chatsView(myChats[i]))
      }      
    }

    App.pubsub.on('fetch_success', this.render)

  }

  Chats.view = function(){
    return $('<div class="heading">').append($('<h3>').text("Chatitude"))
      .append($('<form name="chatForm">')
          .append($('<label>').text('User Name: ')
            .append($('<input type="text" id="username" name="username" >'))
          )
          .append($('<label>').text('Password: ')
            .append($('<input type="text" id="password" name="password" >'))
          )
          .append($('<label>').text('Message: ')
            .append($('<input type="text" id="message" name="message" >'))
          )
          .append($('<br><button id="btnSignup">').text('SIGN-UP'))
          .append($('<button id="btnSignin">').text('SIGN-IN'))
          .append($('<button id="btnPost">').text('POST'))
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

  Chats.mount = function(element){
    var presenter = new Chats.Presenter(element);
    //presenter.render();
  }

})()