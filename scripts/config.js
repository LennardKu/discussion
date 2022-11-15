(function(){
  var versionUpdate = (new Date()).getTime(),
  discussionInit = document.createElement( "script" );
  discussionInit.src = `https://cdn.kuenenwebsites.com/scripts/js/discussion.js?v=${versionUpdate}`;
  discussionInit.setAttribute('defer',true);
  discussionInit.setAttribute('siteKey','siteKey');
  document.getElementsByTagName( "head" )[0].appendChild( discussionInit );
})();
