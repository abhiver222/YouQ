var youtubeAPIKey = 'AIzaSyDGniKVhajeewXlD6pQR8yrfcR-jhIOVKQ'
var searchVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=dog&maxResults=10&key="+youtubeAPIKey
var gapi

function checkAuth() {
  gapi.auth.authorize({  
    client_id: clientID,
    scope: 'https://www.googleapis.com/auth/youtube',
    //  Set to false on first run to get pop-up interactivity
    immediate: true}, function (authResult) {
      //console.log("Auth Result:", authResult);    
      if(authResult && !authResult.error){        
        // createPlaylist(gapi);
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

function authPlusFunc(functionCall) {
  gapi.auth.authorize({  
    client_id: clientID,
    scope: 'https://www.googleapis.com/auth/youtube',
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

function getQueryResults(query){		
	gapi.client.load('youtube', 'v3', function () {
		var request = gapi.client.youtube.search.list({
	      q: query,
	      part: 'snippet',
	      maxResults: 10
	    });	    	   
	    request.execute(function(response) {
	    	console.log(response.items);
	    	results = response.items;	    	
	    });			
	});	
}

function createPlaylist(_callback){
	playlistId = null;
	gapi.client.load('youtube', 'v3', function () {
	  var request = gapi.client.youtube.playlists.insert({
	    part: 'snippet,status',
	    resource: {
	      snippet: {
	        title: 'On-the-Go Playlist',
	        description: 'A private playlist created with the YouTube API'
	      },
	      status: {
	        privacyStatus: 'private'
	      }
	    }
	  });        
	  request.execute(function(response) {
	    var result = response.result;
	    if (result) {
	    	playlistId = result.id;
	    	console.log('Playlist created with playlistId!' +playlistId);
	    	_callback(playlistId);
	    }
	  });  
	});
	return playlistId;
}

function addToPlaylist(playlistId, videoId){
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
			response = "Song added!"
		});
	});
}

function getPlaylistItemID (playlistId, position) {
	gapi.client.load('youtube', 'v3', function () {
		var request = gapi.client.youtube.playlistItems.list({
			playlistId: playlistId,
			part: 'snippet'
		});
		request.execute(function(response){
			playlistItem = response.result.items[position]
		});
	});
	return playlistItem.snippet.playlistId;
}

function deleteFromPlaylist(playlistItemId){
	gapi.client.load('youtube', 'v3', function () {
		var request = gapi.client.youtube.playlistItems.delete({
			id: playlistItemId
		});
		request.execute(function(response) {
			$('#status').html('<pre>' + JSON.stringify(response.result) + '</pre>');
		});
	});
}

function getEntirePlaylist(playlistId, _callback){
	gapi.client.load('youtube', 'v3', function () {
		var request = gapi.client.youtube.playlistItems.list({
			part:'snippet',
			id: playlistId
		});
		request.execute(function(response) {
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