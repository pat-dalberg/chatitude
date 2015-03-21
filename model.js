//model.js
(function(){

  var data = [];

  window.ChatList = {
  
    // get chats
    fetch: function(){
      $.ajax({
      type: 'GET',
      url: 'http://chat.api.mks.io/chats'
      }).success(function (chats) {
        data = chats;
        App.pubsub.emit('fetch_success')
      })
    },

    // sign-up
    // takes username and password
    signup: function(uname, pwd){
      console.log('ChatList.signup called with ' ,uname , pwd)
      $.ajax({
        type: 'POST',
        url: 'http://chat.api.mks.io/signup',
        data: {
          username: uname,
          password: pwd
        } 
      }).success(function (response) {
        console.log('signup success ', response);
        //App.pubsub.emit('signup_success')
        ChatList.signin(uname,pwd);
      }).error(function(response){
        console.log('error ',response)
      })
    },

    // sign-in
    // takes username and password
    // returns api token
    signin: function(uname, pwd){
      console.log('ChatList.signup called with ' ,uname , pwd)
      $.ajax({
        type: 'POST',
        url: 'http://chat.api.mks.io/signin',
        data: {
          username: uname,
          password: pwd
        } 
      }).success(function (response) {
        console.log('signin success ', response.apiToken);
        // store token in local storage
        localStorage.setItem('API_token', response.apiToken)
        App.pubsub.emit('signin_success')
      }).error(function(response){
        console.log('error ',response)
      })
    },

    // post-message
    // takes token and message
    postMessage: function(msg){
      console.log('ChatList.postMessage called with ' ,msg)
      $.ajax({
        type: 'POST',
        url: 'http://chat.api.mks.io/chats',
        data: {
          apiToken: localStorage.getItem('API_token'),
          message: msg
        } 
      }).success(function (response) {
        console.log('chat post success ', response);
        // store token in local storage
        //localStorage.setItem('API_token', response)
        App.pubsub.emit('chat_post_success')
      }).error(function(response){
        console.log('error ',response)
      })
    },


    getData: function(){
      return data;
    }


  };

  


})()