(function () {
  'use strict';
  var fbd = angular.module('flash-block-detect', []);
  fbd.provider('FlashBlockDetect', function () {

    function isSafari() {
      return /^((?!chrome).)*safari/i.test(navigator.userAgent);
    }

    function safariOutdated() {
      if (!isSafari()){
        return false;
      }

      var e = document.createElement('embed');
      e.type = 'application/x-shockwave-flash';
      document.body.appendChild(e);
      var percentagePresent = ('PercentLoaded' in e);
      document.body.removeChild(e);
      return !percentagePresent;
    }

    /**
     * checks and returns flash plugin status
     * @returns {*}
     */
    function flashStatus() {

      if (!navigator.plugins['Shockwave Flash']) {
        return 'NotInstalled';
      }

      var embedLength = $('embed').length;
      var objectLength = $('object').length;

      if ((embedLength > 0) || (objectLength > 0)) {
        /* Mac / Chrome using FlashBlock + Mac / Safari using AdBlock */
        var objs = $('object, embed');
        for (var i =0; i< objs.length; i++){
          if ($(objs[i]).css('display') === 'none') {
            return 'FlashBlock';
          }
        }
      }

      /* Mac / Firefox using FlashBlock */
      if ($('div[bginactive]').length > 0) {
        return 'FlashBlock';
      }

      if (navigator.userAgent.indexOf('MSIE') > -1) {
        try {
          new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        } catch (e) {
          return 'FlashBlock';
        }
      }

      if (safariOutdated()){
        return 'SafariOutdated';
      }

      // everything looks good
      return null;

    }

    this.$get = ['$log', function ($log) {
      return {
        status: flashStatus,

        handleStatus: function (callback) {
          $log.debug('checking flash status');
          var status = flashStatus();
          if (callback) {
            callback(status);
            return;
          }

          //default handling if no callback is specified
          switch(status){
            case 'FlashBlock':
              window.alert('Oops, flash problem: ' + status);
              break;
            case 'SafariOutdated':{
              window.alert('Oops, flash problem: ' + status);
              break;
            }
            case null:
              $log.info('all good, flash is installed');
              break;
            default:
              window.alert('Oops, flash problem: '+status);
          }
        }
      }
    }]
  });
})();

