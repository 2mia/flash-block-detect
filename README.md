### Flash block detector

Angular module for detecting miscellaneous flash issues.

Should detect:
- FlashBlock
- AdBlock (?)
- native blocking done by Safari for outdated versions of flash

Some tests were done on these browsers:
- Chrome (osx)
- Safari (osx)

#####Pull requests are welcomed

### Usage
Install:

- install via bower: `bower install flash-block-detect`.
- angular dependency: `angular.module('someApp', [...,flash-block-detect,...])`
- controller injection as `FlashBlockDetect`

Get and handle flash status:

- out of the box it warns the user using `window.alert`

		FlashBlockDetect.handleStatus()
		
- behaviour can be customized (like below):

		FlashBlockDetect.handleStatus(function(status){
                switch(status){
                  case 'FlashBlock':
				    ....
                  case 'SafariOutdated':{
                    var message = 'Safari needs Flash plugin to be updated';
                    var modalInstance = $modal.open({
                      templateUrl: 'views/dialog-flash.html',
                      controller: ...,
                      resolve: {
                      	message: message
                      }
                    });
                    break;
                  }
                  case null:
                    $log.warn('nothing, flash is installed');
                    break;
                  default:
                    window.alert('Oops, unknown flash problem: '+status);
	

### Others
Contains code inspired from:

- https://github.com/browserstack/flashblock-detector
