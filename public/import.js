(function(){
  var newNode = document.createElement('iframe');

  newNode.setAttribute('src', '/sender');
  newNode.setAttribute('style', 'border:none;position:absolute;right:0;bottom:0;overflow:auto;');

  document.body.appendChild(newNode);
})();
