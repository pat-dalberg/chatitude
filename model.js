//model.js
(function(){

  var data = [];

  window.ChatList = {
  

    fetch: function(){
      $.ajax({
      type: 'GET',
      url: 'http://chat.api.mks.io/chats'
      }).success(function (chats) {
        //console.log(chats);
        data = chats;
        console.log(data);
        App.pubsub.emit('fetch_success')
      })
    },

    sendChat: function(){
      $.ajax({
      type: 'POST',
      url: 'http://chat.api.mks.io/chats'
      }).success(function (chats) {
        console.log("Got chats:", chats)
      })
    },

    getData: function(){
      return data;
    }


  };

  


})()