(function(){
  var versionUpdate = (new Date()).getTime(),
  discussion = document.createElement( "script" );
  discussion.src = `https://cdn.lennardkuenen.dev/scripts/js/discussion.js?v=${versionUpdate}`;
  discussion.setAttribute('defer',true);
  document.getElementsByTagName( "head" )[0].appendChild( discussion);
})();
