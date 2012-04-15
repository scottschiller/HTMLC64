/** @license
 *
 * HTMLC64 (Commodore 64 Boot / Loading Screen)
 * Originally written for an HTML-based C64 game remake
 * -------------------------------------------------------
 * http://schillmania.com/survivor/
 * http://www.flickr.com/photos/schill/sets/72157628885315581/
 * http://github.com/scottschiller/
 *
 * Also includes C64 TrueType, "C64 User Mono" webfont.
 * http://style64.org/c64-truetype/license
 */

/*global window, document, console, navigator, setTimeout, soundManager */
/*jslint regexp: true, sloppy: true, white: true, nomen: true, plusplus: true */


(function() {

function programStart() {

	// callback for LOADING -> READY -> RUN
	console.log('this is programStart() - your code goes here');

}

function start() {

  var _1541,
    c = document.getElementById('cursor'),
    l0 = document.getElementById('loading0'),
    l1 = document.getElementById('loading1'),
    l2 = document.getElementById('loading2'),
    go_go_go = document.getElementById('go_go_go'),
    startDelay = 2500,
    phase1 = 800,
    phase2 = 2000,
    phase3 = 5000,
    phase4 = 6000,
    IS_MUTED = window.location.href.toString().match(/mute/i);

  function mutedCase() {

    l0.style.display = 'block';
    l1.style.display = 'block';
    l2.style.display = 'block';

    go_go_go.style.display = 'block';

    c.style.display = 'none';

    window.setTimeout(programStart, startDelay);

  }

  if (soundManager.ok() && !navigator.userAgent.match(/mobile/i) && !IS_MUTED) {

    /**
     * Audio sample credit / thank-you: YouTube user "daddlertl2", last active 2 years ago (as of February 2012)
     * http://youtu.be/_K7MUkxjeaM
     * video "C64-Diskette wird formatiert (mit Basic Befehl) " uploaded May 1, 2009
     * (gappy audio track from video fixed for use in this project)
     */

    _1541 = soundManager.createSound({
      id: 'c64-1541-format',
      url: 'audio/1541-formatting-sound-short.mp3'
    });

    // register "phases" of loading sequence

    _1541.onPosition(phase1, function() {
      /**
       * SEARCHING FOR PROGRAM
       * at this point, the Commodore 1541-II floppy drive's head knocking sound is playing.
       * and yes, technically this alignment process is usually heard only when formatting disks.
       * if you heard that and were frowning in disappointment at the mis-use, yes, you are technically correct.
       * if you are both technically correct and reading this comment, then you win approximately one internets.
       */
      l1.style.display = 'block';
    });

    _1541.onPosition(phase2, function() {
      /**
       * LOADING
       */
      l2.style.display = 'block';
    });

    _1541.onPosition(phase3, function() {
      /**
       * READY.
       * RUN
       */
      go_go_go.style.display = 'block';
    });

    _1541.onPosition(phase4, programStart);

    _1541.play({
      onload: function(ok) {
        // sound 404, etc.
        if (!ok || !this.duration) {
          mutedCase();
        }
      }
    });

    l0.style.display = 'block';

  } else {

    mutedCase();

  }

}

// use HTML5 if available
soundManager.preferFlash = false;

soundManager.url = './swf/';

soundManager.onready(start);
soundManager.ontimeout(start);

}());