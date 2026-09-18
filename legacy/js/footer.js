// Dev Env Only

'use strict';
var dev = false;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  dev = true;
}

$(function() {
  if (dev === true) {
    console.log('Dev Env');
    $('.me').hide();
    $('.nav').show();
  }
});
