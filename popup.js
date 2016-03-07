var APIKey = 'AIzaSyDGniKVhajeewXlD6pQR8yrfcR-jhIOVKQ'
var urlYou = "https://www.googleapis.com/youtube/v3/search?part=snippet&&q=dog&&maxResults=10&&key="+APIKey
var clientID = '346168684656-lfrkicok8l3h7mjj8jd95l03firni00r.apps.googleusercontent.com'
var tokenStore;
// chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
//   console.log(token);
//   tokenStore = token;
//   // Use the token.
// });
// function auth() {
//   gapi.client.setApiKey(APIKey);
//   window.setTimeout(checkAuth,1);
// }
  
document.addEventListener('DOMContentLoaded', function()
{  
  chrome.runtime.sendMessage({popupOpen: true});  
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "https://apis.google.com/js/client.js?onload=checkAuth";
  head.appendChild(script);
  var searchButton = document.getElementById('searchButton');          
  searchButton.addEventListener('click', function(){
      //authPlusFunc(createPlaylist);
      query = 'mama';
      newFunc = function(){return getQueryResults(query)};
      authPlusFunc(newFunc);
  });
});
