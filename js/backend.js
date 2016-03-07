var youtubeAPIKey = 'AIzaSyDGniKVhajeewXlD6pQR8yrfcR-jhIOVKQ'
var clientID = '346168684656-lfrkicok8l3h7mjj8jd95l03firni00r.apps.googleusercontent.com'
var searchVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=dog&maxResults=10&key="+youtubeAPIKey
var gapi

function checkAuth() {
  gapi.auth.authorize({  
    client_id: clientID,
    scope:[
    "https://www.googleapis.com/auth/youtube"    
    ],    
    //  Set to false on first run to get pop-up interactivity
    immediate: true}, function (authResult) {
      //console.log("Auth Result:", authResult);    
      if(authResult && !authResult.error){        
        // createPlaylist(gapi);
        console.log("Successful");   
        }     
      else{
        var temp = localStorage.playlistId;
        console.log(temp);
        if(temp)
        {
          console.log(temp);
          deletePlaylist(temp);
        }        
        localStorage.clear();    
        console.log('Problem fetching data');
        gapi.auth.authorize({  
          client_id: clientID,
          scope: 'https://www.googleapis.com/auth/youtube',
          //  Set to false on first run to get pop-up interactivity
          immediate: false}, function (authResult) {            
          });        
      }  
  });  
}

function authPlusFunc(functionCall) {
  gapi.auth.authorize({  
    client_id: clientID,
    scope:[
    "https://www.googleapis.com/auth/youtube"
    ],
    //  Set to false on first run to get pop-up interactivity
    immediate: true}, function (authResult) {
      //console.log("Auth Result:", authResult);    
      if(authResult && !authResult.error){        
        functionCall();
        console.log("Successful");        
      }
      else{           
        console.log('Problem fetching data');
        gapi.auth.authorize({  
          client_id: clientID,
          scope: 'https://www.googleapis.com/auth/youtube',
          //  Set to false on first run to get pop-up interactivity
          immediate: false}, function (authResult) {            
          });        
      }  
  });  
}

function getQueryResultsCallback(query){      
    return getQueryResults(query);
}

function getQueryResults(query,_callback){      
    var results = [];
    gapi.client.load('youtube', 'v3', function () {
        var request = gapi.client.youtube.search.list({
          q: query,
          part: 'snippet',
          maxResults: 10
        });            
        request.execute(function(response) {
            console.log(response.items);
            results = response.items;     

            console.log(results);
            _callback(results);
            return results;      
        });    
    });

}

function createPlaylist(videoId, _callback){
    var playlistId = null;
    gapi.client.load('youtube', 'v3', function () {
      var request = gapi.client.youtube.playlists.insert({
        part: 'snippet,status',
        resource: {
          snippet: {
            title: 'On-the-Go Playlist',
            description: 'A public playlist created with the YouTube API'
          },
          status: {
            privacyStatus: 'public'
          }
        }
      });        
      request.execute(function(response) {
        var result = response.result;
        if (result) {
            playlistId = result.id;
            console.log('Playlist created with playlistId!' +playlistId);

            gapi.client.load('youtube', 'v3', function () {
              var details = {
                videoId: videoId,
                kind: 'youtube#video'
              }
              var request = gapi.client.youtube.playlistItems.insert({
                part: 'snippet',
                resource: {
                    snippet: {
                        playlistId: playlistId,
                        resourceId: details
                      }
                  }
              });
              request.execute(function(response) {
                response = "Song added!" ;                
              });
            });
            _callback(playlistId);
          }
        });  
    });
return playlistId;
}

function deleteFromPlaylist(playlistItemId){
    gapi.client.load('youtube', 'v3', function () {
        var request = gapi.client.youtube.playlistItems.delete({
            id: playlistItemId
        });
        request.execute(function(response) {
            console.log(response);
        });
    });
}

function addToPlaylist(playlistId, videoId){
    console.log(playlistId);
    console.log(videoId);
    gapi.client.load('youtube', 'v3', function () {
        var details = {
            videoId: videoId,
            kind: 'youtube#video'
        }
        var request = gapi.client.youtube.playlistItems.insert({
            part: 'snippet',
            resource: {
                snippet: {
                    playlistId: playlistId,
                    resourceId: details
                }
            }
        });
        request.execute(function(response) {
            response = "Song added!" ;                
        });
    });
}

function getEntirePlaylist(playlistId, _callback){
    gapi.client.load('youtube', 'v3', function () {
        var request = gapi.client.youtube.playlistItems.list({
            part:'snippet',
            playlistId: playlistId,
            maxResults: 50            
        });
        request.execute(function(response) {
            console.log("playlist get");
            console.log(response.items);
            _callback(response.items);          
        });
    }); 
}

function deletePlaylist(playlistId){
    gapi.client.load('youtube', 'v3', function () {
        var request = gapi.client.youtube.playlists.delete({            
            id: playlistId
        });
        request.execute(function(response) {
            response = "Deleted playlist"
        });
    });
    return response;
}

function createNewWindow(youtubeURL){
  chrome.tabs.create({url:youtubeURL});
  // chrome.windows.create({url:youtubeURL}, function(win){
  //   chrome.windows.update(tab.windowId, {focused:true});
  // }),
}