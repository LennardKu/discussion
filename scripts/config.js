(function(){
  let discussionInit = document.createElement( "script" );
  discussionInit.src = `https://cdn.enervisie.com/scripts/js/discussion.js`;
  discussionInit.setAttribute('defer',true);
  discussionInit.setAttribute('siteKey','userpublicSiteKey');
  document.getElementsByTagName( "head" )[0].appendChild( discussionInit );
})();
