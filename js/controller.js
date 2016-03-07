var myApp = angular.module('myApp', []);
var firstVideo;

// myApp.config(function($sceProvider) {
//   $sceProvider.enabled(false);
// });
// var searchData = {};

// getData(query){
//  searchData = getQueryData(query);
// };

var playlistid = "";
var vidList = [];
myApp.controller('MyController', ['$scope', '$http', '$timeout', '$sce', function($scope, $http, $timeout, $sce) {
  //$scope.playListId = playlistid;
  
  $scope.results = [];
  $scope.loggedin = true;  
  
  console.log($scope.query);
  var newFunc = function(){
    return getQueryResults($scope.query,function(results){
      $timeout(function () {
        $scope.results = results;
      });
    })
  };  
  $scope.getData = function(){
    authPlusFunc(newFunc);
  }
  console.log($scope.results);
  
  $scope.jumpToYoutube = function(){
    console.log("https://www.youtube.com/watch?v="+firstVideo+"&list="+localStorage.playlistId);
    createNewWindow("https://www.youtube.com/watch?v="+firstVideo+"&list="+localStorage.playlistId);
  };

  // $http.get('js/sampledata2.json').success(function(data) {
  //   $scope.results = data;
  // });

  // $http.get('js/playlist.json').success(function(data) {
  //   $scope.playlist = data;
  // });  // change this to the tab playlist function

  this.tab = 1;

  entireFunc = function(){
    return getEntirePlaylist(localStorage.playlistId, function(items){
        $timeout(function () {
          $scope.playlist = items;
          firstVideo = $scope.playlist[0].snippet.resourceId.videoId;
          console.log($scope.playlist);
          console.log(items);
        });
      });
  }
  this.setTab = function (tabId) {
    this.tab = tabId;

    if(tabId == 2){
      authPlusFunc(entireFunc);      
    }
  };

  this.isSet = function (tabId) {
    return this.tab === tabId;
  };

  var createFunc = function(vidid){
    return createPlaylist(vidid,function(listID){
        $timeout(function () {
          localStorage.setItem("playlistId",listID);
          console.log(localStorage.getItem("playlistId"));
          playlistid = listID;
        });
      });
  }
  var addFunc = function(playlistid, vidid){
    return addToPlaylist(playlistid,vidid);
  }
  $scope.addVid = function(vidid){
    firstVideo = vidid;
    console.log("adding vid");          
    if(!localStorage.playlistId){
      var tempFunc = function(){
        return createFunc(vidid);
      }
      authPlusFunc(tempFunc);      
    }
    else{
      var tempFunc = function(){
        return addFunc(localStorage.playlistId, vidid);
      }    
      //createNewWindow("https://www.youtube.com/watch?v="+vidid+"&list="+localStorage.playlistId);      
      authPlusFunc(tempFunc);
    }
  };   

   $scope.removeVid = function(vidid){
   	  console.log("removing vid");
      if(localStorage.playlistId === "")
         return;      
       var delFunc = function(){
        return deleteFromPlaylist(vidid);
      }
      authPlusFunc(delFunc);
      authPlusFunc(entireFunc);
      // getEntirePlaylist(localStorage.playlistId,function(items){
      //       $timeout(function () {
      //       $scope.playlist = items;          
      //     });
      // });

   };

   // $scope.login = function(){
   //     // $scope.loginVal = true;
   //     $scope.loggedin = false;
   //     console.log("loggin in");
   //     var loginVal = loginFunc();
   // }

}]);