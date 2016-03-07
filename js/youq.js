var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://apis.google.com/js/client.js?onload=checkAuth";
head.appendChild(script);
document.addEventListener('DOMContentLoaded', function()	
{
});