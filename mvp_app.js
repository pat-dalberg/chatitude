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
          .append($('<button>').text('SIGN-UP'))
          .append($('<button>').text('SIGN-IN'))
          .append($('<button>').text('POST'))
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