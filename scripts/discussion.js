"use strict"
const siteKey = document.currentScript.getAttribute('siteKey');

const discussion =  {
  userSession: null,
  siteUuid: null,
  enableStyleScript: true,
  api:'https://api.kuenenwebsites.com',
  cdn:'https://cdn.kuenenwebsites.com',
  loginPage:'https://login.kuenenwebsites.com',

  config: async function (siteUuid) {

    this.siteUuid = siteUuid;

    if(this.siteUuid == null || this.siteUuid.length == 0){
      this.log('noSiteUuid.error',`No site key set ${window.location.href}`);
      this.error('No site key set: https://about.lennardkuenen.dev/discussion/activate/');
      return;
    }

    // Check for session
    if(this.getCookie('discussionSession') == null && this.userSession == null){
      this.setCookie('discussionSession',this.createUuid(),356);
    }

    this.userSession = this.getCookie('discussionSession');

    // Check for style script
    if(this.enableStyleScript == true){
      let link = document.createElement( "link" );
      link.href = `${this.cdn}/style/css/discussion.css`;
      link.type = "text/css";
      link.rel = "stylesheet";
      link.media = "screen,print";
  
      document.getElementsByTagName( "head" )[0].appendChild( link );
    }

    // Check if session is valid
    await this.createAnswerField();
    await this.init();
  },

  init: function () {
    // Init submit forms 
    for (let index = 0; index < document.querySelectorAll('[data-discussion-for]').length; index++) {
      document.querySelectorAll('[data-discussion-for]')[index].addEventListener('submit', function () {
         discussion.send(this.getAttribute('data-discussion-for'));
      });
    }
  },

  createAnswerField: function () { 
      
    for (let index = 0; index < document.querySelectorAll('[data-discussion-answer-field]').length; index++) {

      if(this.checkSession() !== (false || null || undefined)){

        let answerField = document.createElement('div'),
        answerForm = document.createElement('form'),
        answerInput = document.createElement('textarea'),
        answerSend = document.createElement('button'),
        answerName = document.createElement('input');

        // Styling 
        answerField.classList.add('discussion-answer-wrapper');
        answerForm.classList.add('discussion-answer-form');
        answerSend.classList.add('discussion-answer-submit');

        // Attr
        answerSend.setAttribute('type', 'submit');
        answerInput.setAttribute('name', 'message');
        answerName.setAttribute('uuid', this.createUuid());
        answerName.setAttribute('hidden', true);

        answerForm.appendChild(answerName);
        answerForm.appendChild(answerInput);
        answerForm.appendChild(answerSend);
        answerField.appendChild(answerForm);

        document.querySelectorAll('[data-discussion-answer-field]')[index].appendChild( answerField );
      }else{

        // Login message 
        let registerMessage = document.createElement('div'),
        registerText = document.createElement('span'),
        registerButton = document.createElement('button');

        // Style
        registerText.classList.add('discussion-not-registered');
        registerButton.classList.add('discussion-not-registered-btn');

        // Login attr
        registerButton.setAttribute('data-discussion-login','register');
  
        registerText.innerHTML = 'You are not logged in.';
        registerButton.innerHTML = 'Login';

        registerMessage.appendChild(registerText);
        registerMessage.appendChild(registerButton);

        registerButton.addEventListener('click',function(){
          discussion.login();
        });

        document.querySelectorAll('[data-discussion-answer-field]')[index].appendChild( registerMessage );

      }

    }
  },

  loading: function () {
    return false; // LOADING
  },

  login: function () {
    let loginWindow = window.open(`${this.loginPage}/auth/${this.userSession}/`, "Login", "location=1,status=1,scrollbars=1,resizable=no,width=400,height=600,menubar=no,toolbar=no");
    loginWindow.onbeforeunload = function (e) {
      // let e = e || loginWindow.event;
    
      //IE & Firefox
      if (e) {
        discussion.createAnswerField();
        discussion.init();
        return;
      }
    
      // For Safari
      discussion.createAnswerField();
      discussion.init();
    };
  },

  createUuid: function () {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  },

  setCookie: function (name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name} = ${(value || "")} ${expires}; path=/`;
  },

  getCookie: function (name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  },

  deleteCookie: function (name) {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  },
  
  send: function (uuid) {
    let http = new XMLHttpRequest();
    let url = `${this.api}/discussion/post/`;
    let params = `session=${this.userSession}&uuid=${uuid}`;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() { //Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {

            // alert(http.responseText);
        }
    }
    http.send(params);    
  },

  checkSession: function () {
    let http = new XMLHttpRequest();
    let url = `${this.api}/discussion/session/`;
    let params = `session=${this.userSession}`;
    http.open('GET', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() { //Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          if(http.responseText.error == undefined){
            return false;
          }

          if(http.responseText.success !== undefined){
            return http.responseText.success;
          }
          return false;
        }
    }
    http.send(params);  
  },
  
  delete: function (type,uuid) {  

    let http = new XMLHttpRequest();
    let url = `${this.api}/discussion/delete/`;
    let params = `session=${this.userSession}&type=${type}&uuid=${uuid}`;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() { //Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            if(http.responseText.error !== undefined){
              discussion.log('delete.error',http.responseText.error);
              return false;
            }

            if(http.responseText.success !== undefined){
              discussion.log('delete.success',http.responseText.success);
              return false;
            }

        }
    }
    http.send(params);  
  },

  getPosts: function (type,uuid,limit,offset) {
    limit = limit || 20;
    offset = offset || 0;
    let http = new XMLHttpRequest();
    let url = `${this.api}/discussion/get/`;
    let params = `session=${this.userSession}&uuid=${uuid}&type=${type}&limit=${limit}&offset=${offset}`;
    http.open('GET', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() { //Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          
          if(http.responseText.error !== undefined){
            discussion.log('getPosts.error',http.responseText.error);
            return false;
          }

        }
    }
    http.send(params);  
  },


  getSingle: function (type,uuid,state) {
    let http = new XMLHttpRequest();
    let url = `${this.api}/discussion/getSingle/`;
    let params = `session=${this.userSession}&uuid=${uuid}&type=${type}`;
    http.open('GET', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() { //Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {

          if(http.responseText.error !== undefined){
            discussion.log('getSingle.error',http.responseText.error);
            return false;
          }

          if(state == 'return'){
            return http.responseText;
          }
          
        }
    }
    http.send(params);  
  },
  
  error: function (error) {
    throw new Error(error);
  },
  
  log: function (type,log) {
    let http = new XMLHttpRequest();
    let url = `${this.api}/discussion/log/`;
    let params = `message=${log}&type=${type}&session=${this.userSession}`;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() { //Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            if(http.responseText.error !== undefined){
              discussion.error(http.responseText.error);
            }
        }
    }
    http.send(params);  
  },
  
};

// Create Example
window.addEventListener('load', function(){
  discussion.config(siteKey); // Config
});
