"use strict";

$(function() {

	// ---------------------------------------
	// Structural
	// ---------------------------------------
	// Set block height to fit to screen
  $('.block__inner').css({ height: $(window).innerHeight() });
  $(window).resize(function(){
    $('.block__inner').css({ height: $(window).innerHeight() });
  });
	// -------------------End of Structural-------------------

	// ---------------------------------------
	// Record Player
	// ---------------------------------------
	playDisc();
	// Play Me! record-player animation
	function playDisc() {
	  var music = document.createElement("audio");
    music.src = "../music/WalkWithMeGirl.m4a";
	  music.autoPlay = false;
	  music.preload = true;
		$('.record-player').click(function(){
			if ( $(this).hasClass('play') ){
	      music.pause();
	      $(this).removeAttr('style');
	      $(this).removeClass('play');
	    }
	    else {
	      $(this).addClass('play');
	      $(this).css( {'animation-play-state': 'running'} );
	      music.play();
	    }
		});
	};
	// -------------------End of Record Player-------------------

	// ---------------------------------------
	// Navigation
	// ---------------------------------------
	// Add/Remove class "active" to nav anchors on click
	$('div.nav a').not(":eq(0)").click(function() {
		$('div.nav a').removeClass('active');
		$(this).addClass('active');
    // Nice trick to monipulate browser history,
    // but this results nav animation going madness.
    // Disabled unless found a solution.
    // var location = $(this).text().trim();
    // window.history.replaceState(null, null, "/"+location);
	});
	// Open Resume Tab
	$('div.nav a#resume').bind('click', function(event) {
    $('.resume').addClass('open');
		$('.resume').animate({
			left:0
		}, 1000, 'easeOutExpo');
    event.stopPropagation();
	});
	// Stop click event from parent class except for the first child, close button.
  $('section.resume:not(:first-child)').click(function(event) {
    event.stopPropagation();
  });
	// Dismiss Resume Tab by clicking on close button
	$('.btn-close').bind('click', function(event) {
		$('.resume').animate({
			left:-999
		}, 800, 'easeInQuart')
	});
	// Dismiss Resume Tab by clicking on anywhere on screen
	$(window).click(function() {
	  if ( $('.resume').hasClass('open') ) {
	    $('.resume').removeClass('open');
	    $('.resume').animate({
				left:-999
			}, 800, 'easeInQuart')
	  }
	});
	// -------------------End of Navigation-------------------

	// ---------------------------------------
	// Utilities
	// ---------------------------------------
	function redirect_desktop() {
		$('.goto_Desktop').click(function () {
			Cookies.set('ignoreMobile', true, { expires: 7 });
		});
	}

	// ---------------------------------------
	// Animations
	// ---------------------------------------
	$(function() {
		// Tear Apart Animation on Home Page
		$('.tear-apart').bind('click', function(event) {
			$('.me__top').css({ position: 'relative' });
			$('.me__bottom').css({ position: 'relative' });
			$('.tear-apart').css({ display: 'none' });
			$('.nav').delay(600).slideDown(1000);
			$('.me__top').animate({
				top: -500
			}, 1200, 'easeInExpo')
			$('.me__bottom').animate({
				bottom: -500
			}, 1200, 'easeInExpo')
			setTimeout(function() { $('.me').css({ display: 'none' }) }, 1300);
			setTimeout(function() {
				animateHome();
			}, 800);
		});
	});
	// Animate Home Page
	function animateHome() {
		$($('.profile__header *').get().reverse()).each( function(i) {
			var that = $(this);
			setTimeout(function() {
				that.addClass('slide-down');
			}, i*200);
		});
		$('.profile__content__pic img').addClass('slide-right');
		$('.profile__content__about p').each( function(i) {
			var that = $(this);
			setTimeout(function() {
				that.addClass('slide-up');
			}, i*500);
		});
	}
	// return Home page element to pre-animation state
	function resetHome() {
		$(".profile__header").removeClass('slide-down');
		$('.profile__content__pic img').removeClass('slide-right');
		$('.profile__content__about p').removeClass('slide-up');
	}
  // Animate Skill Page
  function animateSkills() {
    var circles = $('.circle-big');
    var borders = $('.big-circle-border');
    var lines = $('.skills-canvas line');
    var elements = [];
    var times = [ 0,  245, 245,
                  125, 370, 370,
                  400, 645, 645,
                  525, 770, 770 ]
    var index = 0;
    while (index < 4) {
      elements.push(lines[index]);
      elements.push(borders[index]);
      elements.push(circles[index]);
      index++;
    };
    index = 0;
    $(elements).each( function(i) {
      var that = $(this);
      setTimeout(function() {
        that.addClass('animate');
      }, times[i]);
    });
  }
  // Return Skill Page element to pre-animation state
  function resetSkills() {
  	$('.sub').removeClass('animate');
  	$('.circle-big').removeClass('animate');
  	$('.skills-canvas .big-circle-border').removeClass('animate');
  	$('.skills-canvas line').removeClass('animate');
  }
  // Animate Contact Page
  function animateContact() {
    $('.get-in-touch h1').each( function(i) {
      var that = $(this);
      setTimeout(function() {
        that.addClass('fade');
      }, 2*i*300);
    });
    $('.social-media *').each( function(i) {
      var that = $(this);
      setTimeout(function() {
        that.addClass('zoom-in-right');
      }, 800+i*100);
    });
  };
  // return Contact page element to pre-animation state
  function resetContact() {
    $('.get-in-touch h1').removeClass('fade');
    $('.social-media *').removeClass('zoom-in-right');
  }

	// return the moving-from animation page back to original state
	function resetPage(current) {
		if (current === home) {
			resetHome();
		} else if (current === skills) {
      resetSkills();
    } else if (current == contact) {
      resetContact();
    }
	}

	//
	// Page to Page Transition
	//
	var	home = $(".home"),
		experiences = $(".experiences"),
		skills = $(".skills"),
		interests = $('.interests'),
		contact = $('.contact'),
    current = home;
	var nav = [home, experiences, skills, interests, contact];

	// Determine transition from left or right
	function getLeftRight(click, curr) {
		if ( nav.indexOf(click) > nav.indexOf(curr) ) {
			return 1;
		} else if ( nav.indexOf(click) < nav.indexOf(curr) ) {
			return -1;
		} else {
			return 0;
		}
	}

	// Page Transition on click
  $(".nav__home").click(function () {
		if ( getLeftRight(home, current) === 0 ) {
			return ;
		}
		else {
			leftToHome();
		}
  });

	$(".nav__exp").click(function() {
		if ( getLeftRight(experiences, current) === 0 ) {
			return ;
		}
		else if ( getLeftRight(experiences, current) === -1 ){
			leftToExp();
		}
		else {
			rightToExp();
		}
	});

  $(".nav__skills").click(function () {
		if ( getLeftRight(skills, current) === 0 ) {
			return ;
		}
		else if ( getLeftRight(skills, current) === -1 ){
			leftToSkills();
			setTimeout(animateSkills, 1600);
		}
		else {
			rightToSkills();
			setTimeout(animateSkills, 1600);
		}
  });

  $(".nav__interests").click(function () {
		if ( getLeftRight(interests, current) === 0 ) {
			return ;
		}
		else if ( getLeftRight(interests, current) === -1 ){
			leftToInterests();
		}
		else {
			rightToInterests();
		}
  });

  $(".nav__contact").click(function () {
		if ( getLeftRight(contact, current) === 0 ) {
			return ;
		}
		else {
			rightToContact();
		}
  });

	// TODO: Refactor or write new unique transition for each page
	function leftToHome() {
		var width = $(window).width();
		$("#to_home").attr("class", "here");
		var transToHome = Snap("#to_home");
		var transRect1 = transToHome.rect(width, 0, "100%", "100%").attr({
	    fill: "#E2E3D5"
	  });
	  var transRect2 = transToHome.rect(width, 0, "100%", "100%").attr({
	    fill: "#ECEDE1"
	  });
	  var transRect3 = transToHome.rect(width, 0, "100%", "100%").attr({
	    fill: "#F5F6E8"
		});

		transRect1.animate( {
	    x: 0
	  }, 1500, mina.easeOutExpo);

		window.setTimeout(function() {
	    transRect2.animate({
	      x: 0
	    }, 1100, mina.easeOutExpo)
	  }, 400);

		window.setTimeout(function() {
	    transRect3.animate({
	      x: 0
	    }, 800, mina.easeOutExpo, function() {
	      transToHome.clear();
	    })
	  }, 700);
		window.setTimeout(function() {
			current.fadeOut(300, function() {
				home.css( {"display": "block"} );
				animateHome();
	    });
	  }, 1200);
		window.setTimeout(function() {
	    $("#to_home").removeAttr("class");
      resetPage(current);
      current = home;
	  }, 1600);
	}

	function rightToExp() {
		var width = $(window).width();
		$("#to_exp").attr("class", "here");
		var transToExp = Snap("#to_exp");
		var transRect1 = transToExp.rect(0, 0, 0, "100%").attr({
	    fill: "#93C0C9"
	  });
	  var transRect2 = transToExp.rect(0, 0, 0, "100%").attr({
	    fill: "#A0D1DB"
	  });
	  var transRect3 = transToExp.rect(0, 0, 0, "100%").attr({
	    fill: "#AADBE6"
		});

		transRect1.animate( {
	    width: width
	  }, 1500, mina.easeOutExpo);

		window.setTimeout(function() {
	    transRect2.animate({
	      width: width
	    }, 1100, mina.easeOutExpo)
	  }, 400);

		window.setTimeout(function() {
	    transRect3.animate({
	      width: width
	    }, 800, mina.easeOutExpo, function() {
	      transToExp.clear();
	    })
	  }, 700);
		window.setTimeout(function() {
			current.fadeOut(300, function() {
				experiences.css( {"display": "block"} );
	    });
	  }, 1200);
		window.setTimeout(function() {
	    $("#to_exp").removeAttr("class");
      resetPage(current);
      current = experiences;
	  }, 1600);
	}

	function leftToExp() {
		var width = $(window).width();
		$("#to_exp").attr("class", "here");
		var transToExp = Snap("#to_exp");
		var transRect1 = transToExp.rect(width, 0, "100%", "100%").attr({
	    fill: "#93C0C9"
	  });
	  var transRect2 = transToExp.rect(width, 0, "100%", "100%").attr({
	    fill: "#A0D1DB"
	  });
	  var transRect3 = transToExp.rect(width, 0, "100%", "100%").attr({
	    fill: "#AADBE6"
		});

		transRect1.animate( {
	    x: 0
	  }, 1500, mina.easeOutExpo);

		window.setTimeout(function() {
	    transRect2.animate({
	      x: 0
	    }, 1100, mina.easeOutExpo)
	  }, 400);

		window.setTimeout(function() {
	    transRect3.animate({
	      x: 0
	    }, 800, mina.easeOutExpo, function() {
	      transToExp.clear();
	    })
	  }, 700);
		window.setTimeout(function() {
			current.fadeOut(300, function() {
				experiences.css( {"display": "block"} );
	    });
	  }, 1200);
		window.setTimeout(function() {
	    $("#to_exp").removeAttr("class");
      resetPage(current);
      current = experiences;
	  }, 1600);
	}

	function rightToSkills() {
		var width = $(window).width();
		$("#to_skills").attr("class", "here");
		var transToSkills = Snap("#to_skills");
		var transRect1 = transToSkills.rect(0, 0, 0, "100%").attr({
			fill: "#E0D2B1"
		});
		var transRect2 = transToSkills.rect(0, 0, 0, "100%").attr({
			fill: "#E0DBB1"
		});
		var transRect3 = transToSkills.rect(0, 0, 0, "100%").attr({
			fill: "#F7EFD0"
		});

		transRect1.animate( {
			width: width
		}, 1500, mina.easeOutExpo);

		window.setTimeout(function() {
			transRect2.animate({
				width: width
			}, 1100, mina.easeOutExpo)
		}, 400);

		window.setTimeout(function() {
			transRect3.animate({
				width: width
			}, 800, mina.easeOutExpo, function() {
				transToSkills.clear();
			})
		}, 700);
		window.setTimeout(function() {
			current.fadeOut(300, function() {
				skills.css( {"display": "block"} );
			});
		}, 1200);
		window.setTimeout(function() {
			$("#to_skills").removeAttr("class");
			resetPage(current);
			current = skills;
		}, 1600);
	}

	function leftToSkills() {
		var width = $(window).width();
		$("#to_skills").attr("class", "here");
		var transToSkills = Snap("#to_skills");
		var transRect1 = transToSkills.rect(width, 0, "100%", "100%").attr({
	    fill: "#E0D2B1"
	  });
	  var transRect2 = transToSkills.rect(width, 0, "100%", "100%").attr({
	    fill: "#E0DBB1"
	  });
	  var transRect3 = transToSkills.rect(width, 0, "100%", "100%").attr({
	    fill: "#F7EFD0"
		});

		transRect1.animate( {
	    x: 0
	  }, 1500, mina.easeOutExpo);

		window.setTimeout(function() {
	    transRect2.animate({
	      x: 0
	    }, 1100, mina.easeOutExpo)
	  }, 400);

		window.setTimeout(function() {
	    transRect3.animate({
	      x: 0
	    }, 800, mina.easeOutExpo, function() {
	      transToSkills.clear();
	    })
	  }, 700);
		window.setTimeout(function() {
			current.fadeOut(300, function() {
				skills.css( {"display": "block"} );
	    });
	  }, 1200);
		window.setTimeout(function() {
	    $("#to_skills").removeAttr("class");
      resetPage(current);
      current = skills;
	  }, 1600);
	}

	function rightToInterests() {
		var width = $(window).width();
		$("#to_interests").attr("class", "here");
		var transToInterests = Snap("#to_interests");
		var transRect1 = transToInterests.rect(0, 0, 0, "100%").attr({
			fill: "#B0ABC2"
		});
		var transRect2 = transToInterests.rect(0, 0, 0, "100%").attr({
			fill: "#BBB4D6"
		});
		var transRect3 = transToInterests.rect(0, 0, 0, "100%").attr({
			fill: "#D0CAE8"
		});

		transRect1.animate( {
			width: width
		}, 1500, mina.easeOutExpo);

		window.setTimeout(function() {
			transRect2.animate({
				width: width
			}, 1100, mina.easeOutExpo)
		}, 400);

		window.setTimeout(function() {
			transRect3.animate({
				width: width
			}, 800, mina.easeOutExpo, function() {
				transToInterests.clear();
			})
		}, 700);
		window.setTimeout(function() {
			current.fadeOut(300, function() {
				interests.css( {"display": "block"} );
			});
		}, 1200);
		window.setTimeout(function() {
			$("#to_interests").removeAttr("class");
			resetPage(current);
			current = interests;
		}, 1600);
	}

	function leftToInterests() {
		var width = $(window).width();
		$("#to_interests").attr("class", "here");
		var transToInterests = Snap("#to_interests");
		var transRect1 = transToInterests.rect(width, 0, "100%", "100%").attr({
	    fill: "#B0ABC2"
	  });
	  var transRect2 = transToInterests.rect(width, 0, "100%", "100%").attr({
	    fill: "#BBB4D6"
	  });
	  var transRect3 = transToInterests.rect(width, 0, "100%", "100%").attr({
	    fill: "#D0CAE8"
		});

		transRect1.animate( {
	    x: 0
	  }, 1500, mina.easeOutExpo);

		window.setTimeout(function() {
	    transRect2.animate({
	      x: 0
	    }, 1100, mina.easeOutExpo)
	  }, 400);

		window.setTimeout(function() {
	    transRect3.animate({
	      x: 0
	    }, 800, mina.easeOutExpo, function() {
	      transToInterests.clear();
	    })
	  }, 700);
		window.setTimeout(function() {
			current.fadeOut(300, function() {
				interests.css( {"display": "block"} );
	    });
	  }, 1200);
		window.setTimeout(function() {
	    $("#to_interests").removeAttr("class");
      resetPage(current);
      current = interests;
	  }, 1600);
	}

	function rightToContact() {
		var width = $(window).width();
		$("#to_contact").attr("class", "here");
		var transToContact = Snap("#to_contact");
		var transRect1 = transToContact.rect(0, 0, 0, "100%").attr({
			fill: "#E0DED7"
		});
		var transRect2 = transToContact.rect(0, 0, 0, "100%").attr({
			fill: "#EBE8E1"
		});
		var transRect3 = transToContact.rect(0, 0, 0, "100%").attr({
			fill: "#F2EFE8"
		});

		transRect1.animate( {
			width: width
		}, 1500, mina.easeOutExpo);

		window.setTimeout(function() {
			transRect2.animate({
				width: width
			}, 1100, mina.easeOutExpo)
		}, 400);

		window.setTimeout(function() {
			transRect3.animate({
				width: width
			}, 800, mina.easeOutExpo, function() {
				transToContact.clear();
			})
		}, 700);
		window.setTimeout(function() {
			current.fadeOut(300, function() {
				contact.css( {"display": "block"} );
        animateContact();
			});
		}, 1200);
		window.setTimeout(function() {
			$("#to_contact").removeAttr("class");
			resetPage(current);
			current = contact;
		}, 1600);
	}

	// ---------------------------------------
	// Skills Section: Animate Circles and Path
	// ---------------------------------------
	// Setup Variables
	var topLeft = '.circle-top-left',
			topRight = '.circle-top-right',
			botLeft = '.circle-bot-left',
			botRight = '.circle-bot-right';
	var frontEnd = '.skills-frontend',
			backEnd = '.skills-backend',
			devOps = '.skills-devops',
			dB = '.skills-database';
	expandSubSkills(topLeft+'-text', frontEnd, 25);
	hoverToLight(topLeft+'-text', topLeft, "#589899");
	expandSubSkills(topRight+'-text', backEnd, 50);
	hoverToLight(topRight+'-text', topRight, "#589899");
	expandSubSkills(botLeft+'-text', devOps, 25);
	hoverToLight(botLeft+'-text', botLeft, "#589899");
	expandSubSkills(botRight+'-text', dB, 25);
	hoverToLight(botRight+'-text', botRight, "#589899");
  // Click to expand sub skills
	function expandSubSkills(text, skill, time) {
		$(text).click(function() {
	    var elements = $(skill+' *').not(":eq(0)");
	    elements.each( function(i) {
	      var that = $(this);
	      setTimeout(function() {
	        that.addClass('animate');
	      }, i*time);
	    })
	  });
	}
	// Hover to lighten color
	function hoverToLight(text, circle, light) {
		$(text).hover(
			function() {
				$(circle).css( {"fill": light} );
			}, function() {
				$(circle).removeAttr("style");
			} );
	}

  // ---------------------------------------
	// Experiences Section: Animate iMac & iPhone, & Description
	// ---------------------------------------
  initExperience();

  function showNextDemo(project) {
    removeCurrentDemo();
    if ( project === 'hillotask-mobile') {
      setTimeout(function(){
        $('.preview .'+project).addClass('active').animate({
          top: "50%",
          opacity: 1
        }, 2000, 'easeOutExpo');
        $('.desc .'+project).addClass('active').animate({
          top: 0,
          opacity: 1
        }, 2000, 'easeOutExpo');
      }, 400);
    }
    else {
      setTimeout(function(){
        $('.preview .'+project).addClass('active').animate({
          top: 0,
          opacity: 1
        }, 2000, 'easeOutExpo');
        $('.desc .'+project).addClass('active').animate({
          top: 0,
          opacity: 1
        }, 2000, 'easeOutExpo');
      }, 400);
    }
  }

  function cleanUpDemo() {
    $('.desc > *');
    $('.preview > *');
  }

  function removeCurrentDemo() {
    $('.preview .active').removeClass('active').animate({
      top: "200%",
      opacity: 0
    }, 2000, 'easeOutExpo' );
    $('.desc .active').removeClass('active').animate( {
      top: "-200%",
      opacity: 0
    }, 2000, 'easeOutExpo' );
  }

  function resetExperinces() {
    cleanUpDemo();
  }

  function setImgProperty() {
    $(".left img").css( {
      width: $(".screen")[0]. getBoundingClientRect().width,
      height: $(".screen")[0]. getBoundingClientRect().height } );
  }

  function initExperience() {
    // Set Left & Right
    // $(".right").css( {width: $(window).width() - 710.5 } );

    // Initialize Timeline
    var timeline = $('.experiences__timeline__controller');
    var buttons = timeline.find('button');
    buttons.each(function(i){
      $(this).click(timelineOnClick);
    })

    // Initialize iMac SVG
    var s = Snap('#demo');
    var frame = s.path("M164.821907,281.140772 C164.821907,295.721883 152.868648,307.650994 138.257352,307.650994 L26.6899636,307.650994 C12.0791134,307.650994 0.125186235,295.721883 0.125186235,281.140772 L0.125186235,26.6927722 C0.125186235,12.1118833 12.0791134,0.182327778 26.6899636,0.182327778 L138.257352,0.182327778 C152.868648,0.182327778 164.821907,12.1118833 164.821907,26.6927722 L164.821907,281.140772 L164.821907,281.140772 L164.821907,281.140772 L164.821907,281.140772 Z").addClass('frame');
    var screen = s.path("M153.617338,261.472083 L11.1072166,261.472083 L11.1072166,48.13875 L153.617338,48.13875 L153.617338,48.13875 L153.617338,261.472083 L153.617338,261.472083 Z").addClass('screen');
    var button = s.path("M97.4912186,283.457617 C97.4912186,291.735394 90.767413,298.44495 82.4735466,298.44495 C74.1799028,298.44495 67.4558745,291.735394 67.4558745,283.457617 C67.4558745,275.181394 74.1799028,268.471172 82.4735466,268.471172 C90.767413,268.471172 97.4912186,275.181394 97.4912186,283.457617 C97.4912186,283.457617 97.4912186,275.181394 97.4912186,283.457617 L97.4912186,283.457617 L97.4912186,283.457617 Z").addClass('button');
    var buttonMark = s.path("M77.4515368,286.9924 L77.4515368,279.922584 C77.4515368,279.10042 78.1171524,278.434831 78.9393499,278.434831 L86.0077432,278.434831 C86.8282326,278.434831 87.4955563,279.10042 87.4955563,279.922584 L87.4955563,286.9924 C87.4955563,287.814564 86.8282326,288.481291 86.0077432,288.481291 L78.9393499,288.481291 C78.1171524,288.481291 77.4515368,287.814564 77.4515368,286.9924").addClass('button-mark');
    var device = s.group(frame, screen, button, buttonMark);
    device.attr({
      transform: "translate(418.000000, 146.000000)"
    });

    function iPhone() {
      frame.animate({ d: "M164.821907,281.140772 C164.821907,295.721883 152.868648,307.650994 138.257352,307.650994 L26.6899636,307.650994 C12.0791134,307.650994 0.125186235,295.721883 0.125186235,281.140772 L0.125186235,26.6927722 C0.125186235,12.1118833 12.0791134,0.182327778 26.6899636,0.182327778 L138.257352,0.182327778 C152.868648,0.182327778 164.821907,12.1118833 164.821907,26.6927722 L164.821907,281.140772 L164.821907,281.140772 L164.821907,281.140772 L164.821907,281.140772 Z"}, 1000, mina.easeOutExpo);
      screen.animate({ d: "M153.617338,261.472083 L11.1072166,261.472083 L11.1072166,48.13875 L153.617338,48.13875 L153.617338,48.13875 L153.617338,261.472083 L153.617338,261.472083 Z"}, 1000, mina.easeOutExpo);
      button.animate({ d: "M97.4912186,283.457617 C97.4912186,291.735394 90.767413,298.44495 82.4735466,298.44495 C74.1799028,298.44495 67.4558745,291.735394 67.4558745,283.457617 C67.4558745,275.181394 74.1799028,268.471172 82.4735466,268.471172 C90.767413,268.471172 97.4912186,275.181394 97.4912186,283.457617 C97.4912186,283.457617 97.4912186,275.181394 97.4912186,283.457617 L97.4912186,283.457617 L97.4912186,283.457617 Z"}, 500, mina.easeOutExpo);
      buttonMark.animate({ d: "M77.4515368,286.9924 L77.4515368,279.922584 C77.4515368,279.10042 78.1171524,278.434831 78.9393499,278.434831 L86.0077432,278.434831 C86.8282326,278.434831 87.4955563,279.10042 87.4955563,279.922584 L87.4955563,286.9924 C87.4955563,287.814564 86.8282326,288.481291 86.0077432,288.481291 L78.9393499,288.481291 C78.1171524,288.481291 77.4515368,287.814564 77.4515368,286.9924"}, 1000, mina.easeOutExpo);
      device.animate({transform: "translate(418.000000, 146.000000)"}, 400).removeClass('iMac');
    };

    var iPad = function() {
      frame.animate({ d: "M408.807844,502.315866 C408.807844,516.896977 396.854585,528.826088 382.243289,528.826088 L26.2024263,528.82608 C11.5915761,528.82608 -0.362351057,516.896969 -0.362351057,502.315857 L-0.362351057,27.043563 C-0.362351057,12.4626741 11.5915761,0.533118529 26.2024263,0.533118529 L382.243289,0.533126748 C396.854585,0.533126748 408.807844,12.4626823 408.807844,27.0435712 L408.807844,502.315866 L408.807844,502.315866 L408.807844,502.315866 L408.807844,502.315866 Z" }, 1000, mina.easeOutExpo);
      screen.animate({ d: "M367.503075,481.838872 L41.444018,481.838872 L41.444018,47.5070916 L367.503075,47.5070916 L367.503075,47.5070916 L367.503075,481.838872 L367.503075,481.838872 Z" }, 1000, mina.easeOutExpo);
      button.animate({ d: "M219.491219,506.457617 C219.491219,514.735394 212.767413,521.44495 204.473547,521.44495 C196.179903,521.44495 189.455874,514.735394 189.455874,506.457617 C189.455874,498.181394 196.179903,491.471172 204.473547,491.471172 C212.767413,491.471172 219.491219,498.181394 219.491219,506.457617 C219.491219,506.457617 219.491219,498.181394 219.491219,506.457617 L219.491219,506.457617 L219.491219,506.457617 Z" }, 500, mina.easeOutExpo);
      buttonMark.animate({ d: "M199.451537,509.9924 L199.451537,502.922584 C199.451537,502.10042 200.117152,501.434831 200.93935,501.434831 L208.007743,501.434831 C208.828233,501.434831 209.495556,502.10042 209.495556,502.922584 L209.495556,509.9924 C209.495556,510.814564 208.828233,511.481291 208.007743,511.481291 L200.93935,511.481291 C200.117152,511.481291 199.451537,510.814564 199.451537,509.9924" }, 1000, mina.easeOutExpo);
      device.animate({transform: "translate(296.000000, 36.000000)"}, 400).removeClass('iMac');
    };

    var iMac = function() {
      frame.animate({ d: "M640.224014,434.852619 L26.7370332,434.852612 C12.126183,434.852612 0.172255877,423.811707 0.172255877,410.316262 L0.172255877,25.0383573 C0.172255877,11.5431178 12.126183,0.501801303 26.7370332,0.501801303 L640.224014,0.501808364 C654.835309,0.501808364 666.788568,11.5431249 666.788568,25.0383644 L666.788568,410.316269 C666.788568,423.811714 654.835309,434.852619 640.224014,434.852619 Z"}, 1000, mina.easeOutExpo);
      screen.animate({ d: "M646,410.023915 L20,410.023915 L20,22.0722711 L646,22.0722711 L646,22.0722711 L646,410.023915 L646,410.023915 Z"}, 1000, mina.easeOutExpo);
      button.animate({ d: "M468.412707,513.296284 L468.412707,518.303753 L333.473547,518.303753 L198.884063,518.30375 L198.884063,513.29628 C198.884063,513.29628 256.383845,495.33949 259.881126,489.737355 C263.378406,484.13522 261.881126,435.044633 261.881126,435.044633 L405.384185,435.044633 C405.384185,435.044633 403.34735,484.773326 407.384185,489.737356 C411.42102,494.701386 468.412707,513.296284 468.412707,513.296284 Z"}, 500, mina.easeOutExpo);
      buttonMark.animate({ d: "M198.565009,513.637806 L468.848578,513.637806 L468.848578,518.896328 L198.565009,518.896328 L198.565009,513.637806 Z"}, 1000, mina.easeOutExpo);
      device.animate({transform: "translate(167.000000, 41.000000)"}, 200, mina.easeOutExpo).addClass('iMac');
    };

    function timelineOnClick(event) {
      var activeEle = timeline.find('.active');
      var activePos = activeEle.index();
      var clickPos = $(this).index();
      var clickEle = timeline.find('.timeline__item').eq(clickPos);

      $(this).siblings().toggleClass('active', false);

      if (clickPos > activePos) {
        buttons.slice(0, clickPos).removeClass('active').addClass('pre-active');
      }
      else if (clickPos < activePos) {
        buttons.slice(clickPos+1, activePos).removeClass('pre-active');
      }
      else {
        return;
      }
      $(this).toggleClass('active', true);

      if ( clickPos === 0 ) {
        iPhone();
        showNextDemo('hillotask-mobile');
      } else if (clickPos === 1) {
        iMac();
        showNextDemo('iquit');
      } else if (clickPos === 2) {
        iMac();
        showNextDemo('banban');
      } else if (clickPos === 3) {
        iMac();
        showNextDemo('ano');
      } else if (clickPos === 4) {
        iMac();
        showNextDemo('hillotask-web');
      } else if (clickPos === 5) {
        iMac();
        showNextDemo('dbs');
      }
    }
  }

  function checkOutProject() {
    $('.hillotask-mobile .btn').click(function() {
      $('section.experiences').css('z-index', 6);
      $('.hillotask-mobile-detail').fadeIn();
    });
  }

  function closeProject() {
    $('.project__toolbar i').click(function() {
      $('section.experiences').css('z-index', 1);
      $('.hillotask-mobile-detail').fadeOut();
    })
  }
  checkOutProject();
  closeProject();
});
