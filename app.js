var s,
	theone = {

		// settings & vars
		settings: {
			theWindow:       $(window),
			modBgSize:       (Modernizr.backgroundsize),
			modHistory:      (Modernizr.history),
			header:          $("header"),
			body:            $("body"),
			homeWrap:        $(".home-wrapper"),
			contWrap:        $(".content-wrapper"),
			status:          $("#status"),
			progress:        $("progress"),
			preloader:       $(".preloader"),
			preloadBar:      $(".preloader-bar"),
			nav:             $(".nav"),
			locWrap:         $(".location-wrapper"),
			buildWrap:       $(".building-wrapper"),
			slideContBuild:  $(".slider-container-building"),
			slideContLoc:    $(".slider-container-location"),
			fancytrig:       $(".fancybox"),
			fancyThumb:      $(".fancybox-thumb"),
			fancyFrame:      $(".fancyframe"),
			fullHeight:      $(".fullheight"),
			homeLocSide:     $(".home-location-side"),
			homeBuildSide:   $(".home-building-side"),
			fadeEl:          $('.fadeEl'),
			logoRdvWrap:     $(".nav .logo-rdv-wrap"),
			navRdvLink:      $(".nav-rdv a"),
			rdvCont:         $(".rdv-content"),
			rdvWrap:         $(".rdv-wrapper"),
			buildMarg:       $("#buildings-margin"),
			locMarg:         $("#locations-margin"),
			slideUpBike:     $(".slide-up-bike"),
			slideUpRoad:     $(".slide-up-road"),
			fadeUpImg:       $(".fadeUp-img"),
			floormaps:       $(".floormaps"),
			singleFloor:     $(".floormaps > .floormap"),
			floormapContr:   $(".floormap-controller"),
			accordion:       $("#accordion"),
			scrollSpeed:     1000,
			fadeSpeed:       600,
			sSlideSpeed:     800,
			easeType:        'easeInOutExpo',
			screenXS:        480,
			isMobTab:        isMobile.any(),
			hasTouch:        Modernizr.touch
		},

		// init function
		init:function() {

			s = this.settings;

			this.preloader();
			this.generic();
			this.fullHeight();
			this.initNav();
			this.rdvLinkAction();
			this.hashChange();
			this.floormaps();
			this.accordionInit();

		},

		generic: function() {

			// add link & classes to activate fade
			if (!s.isMobTab && !s.hasTouch) {
				s.body.addClass('no-touch-desktop');

				s.fadeEl.each(function() {
					$(this).addClass('fade');
				});
			}


			// init fancybox
			s.fancytrig.fancybox({
				openEffect	: 'fade',
				prevEffect	: 'fade',
				nextEffect	: 'fade',
				padding: 0,
				helpers	: {
					title	: {
						type: 'outside'
					},
					overlay: {
						locked: false
					}
				}
			});

			// famcybox iframe
			s.fancyFrame.fancybox({
				padding: 0,
				width             : '96%',
				height            : '96%',
				autoScale         : false,
				transitionIn      : 'none',
				transitionOut     : 'none',
				type              : 'iframe',
				helpers	: {
					overlay: {
						locked: false
					}
				}
			});

			// window scroll
			if (!s.isMobTab && !s.hasTouch) {
				s.theWindow.scroll(function() {
					theone.fadeElements();
				});
			}
		},

		preloader: function() {

			var loadedImageCount, imageCount;

			s.preloader.removeClass('loaded');

			s.contWrap.imagesLoaded({background: true})
				.progress(onProgress)
				.always(onAlways);
			  // reset load percentage
			  imageCount = s.contWrap.find('img').length;
			  resetProgress();
			  updateProgress(0);

			function resetProgress() {
				s.preloader.removeClass('loaded');
				loadedImageCount = 0;
			}

			function updateProgress(value) {
				var percentLoad = ((value / imageCount) * 100);
				s.preloadBar.css({"width":percentLoad+"%"});
			}

			function onProgress(imgLoad, image) {
				// update progress
				loadedImageCount++;
				updateProgress(loadedImageCount);
			}

			// hide loader when done
			function onAlways() {

				s.preloader.addClass('loaded');
				setTimeout(function() {
					s.preloader.hide();
				}, 300);
			}
		},

		fullHeight: function() {
			var windowheight = s.theWindow.height();
			s.fullHeight.css({
				"height": windowheight
			});
		},

		initNav:function() {
			s.theWindow.scroll(function() {
				var scroll = s.theWindow.scrollTop();
				if (scroll > 200) {
					s.logoRdvWrap.addClass("smaller");
				} else {
					s.logoRdvWrap.removeClass("smaller");
				}
			});
		},

		rdvLinkAction: function() {
			s.navRdvLink.click(function() {
				if ($(this).hasClass("homerdv")) {
					if ($(this).hasClass('open')) {
						$(this).removeClass('open');
						s.body.removeClass('rdvform-in');
						s.rdvCont.fadeOut();
						s.rdvWrap.animate({"height": "0"});
						s.logoRdvWrap.removeClass("smaller");
						return false;
					} else {
						$(this).addClass('open');
						s.body.addClass('rdvform-in');
						s.rdvWrap.animate({"height": "100%"});
						s.logoRdvWrap.addClass("smaller");
						s.rdvCont.fadeIn();
						return false;
					}
				} else {
					$('html, body').animate({
						scrollTop: $(s.navRdvLink.attr(
							'href')).offset().top
					}, 500);
					return false;
				}
			});

			$("#closerdv").click(function() {
				s.navRdvLink.removeClass('open');
				s.body.removeClass('rdvform-in');
				s.rdvCont.fadeOut();
				s.rdvWrap.animate({"height": "0"});
				s.logoRdvWrap.removeClass("smaller");
			});
		},

		fadeElements: function() {
			if (!s.isMobTab && !s.hasTouch) {

				var $fadeElem = $('.fade');
				$fadeElem.each(function() {
					/* Check the location of each desired element */
					var objectBottom = $(this).offset().top + $(this).outerHeight();
					var windowBottom = s.theWindow.scrollTop() + s.theWindow.innerHeight();

					/* If the object is completely visible in the window, fade it in */
					if (objectBottom < windowBottom + 100) { //object comes into view (scrolling down)
						if ($(this).css('opacity') == 0) {
							$(this).css('opacity', '1');
						}
					} else if (objectBottom > windowBottom + 100) { //object goes out of view (scrolling up)
						if ($(this).css('opacity') == 1) {
							$(this).css('opacity', '0');
						}
					}
				});
			}
		},

		resize: function() {
			var winWidth  = s.theWindow.width();
			var winHeight = s.theWindow.height();

			// trigger element fade if screen > screenXS
			if (!s.isMobTab && !s.hasTouch) {
				if (winWidth > s.screenXS) {
					theone.fadeElements();
				} else {
					$('.fade').css({"opacity": 1});
				}
			}

			// add fullheight
			s.fullHeight.css({"height":winHeight+"px"});

		},

		hashChange: function() {
			$(window).hashchange([{
				hash: "#!/",
				onSet: function() {
					setTimeout(function() {
						theone.sectionShrink(s.buildMarg);
						theone.sectionShrink(s.locMarg);
					}, 200);
					s.homeWrap.show();
					$('.fade').css("opacity", 0);
					theone.homeNav();
					theone.gotoHome();
				},
				onRemove: function() {
					setTimeout(function() {
						s.homeWrap.hide();
					}, 600);
					s.navRdvLink.removeClass(
						"homerdv");
				}
			}, {
				hash: "#!/location/",
				onSet: function() {
					setTimeout(function() {
						theone.sectionShrink(s.buildMarg);
						theone.sectionGrow(s.locMarg);
						theone.slickInitLoc();
					}, 200);
					$('.fade').css("opacity", 0);
					s.locWrap.show(10,
						function() {
							theone.gotoPage("hiddenright", "revealright", "revealleft", s.buildWrap, s.locWrap);
						});
					theone.navSetup("home-page , build-page", "loc-page", "#footer");
					if (!s.isMobTab && !s.hasTouch) {
						theone.slideUpElement(s.slideUpBike, s.fadeUpImg, 'bike-fadeup');
					}
				},
				onRemove: function() {
					setTimeout(function() {
						s.locWrap.hide();
					}, 600);
					setTimeout(function() {
						theone.slickRemove(s.slideContLoc);
					}, 100);
				}
			}, {
				hash: "#!/building/",
				onSet: function() {
					setTimeout(function() {
						theone.sectionShrink(s.locMarg);
						theone.sectionGrow(s.buildMarg);
						theone.slickInitBuild();
					}, 200);
					$('.fade').css("opacity", 0);
					s.buildWrap.show(10,
						function() {
							theone.gotoPage("hiddenleft", "revealleft", "revealright", s.locWrap, s.buildWrap);
						});
					theone.navSetup("home-page , loc-page", "build-page", "#footer-build");

					if (!s.isMobTab && !s.hasTouch) {
						theone.slideUpElement(s.slideUpRoad, s.slideUpRoad, 'road-fadeup');
					}
				},
				onRemove: function() {
					setTimeout(function() {
						s.buildWrap.hide();
					}, 600);
					setTimeout(function() {
						theone.slickRemove(s.slideContBuild);
					}, 100);
				}
			}]);
		},

		sectionShrink: function(element) {
			element.find(".otherpage").fadeOut(200);
			element.animate({"width": 0});
		},

		sectionGrow: function(element) {
			element.animate({"width": "16.7%"});
			element.find(".otherpage").fadeIn(200);
		},

		homeNav: function() {
			s.navRdvLink.addClass("homerdv");
			s.logoRdvWrap.removeClass('build-page , loc-page');
			s.logoRdvWrap.addClass('home-page');
		},

		navSetup: function(logRemClass, logAddClass, rdvAttr) {
			s.navRdvLink.removeClass("homerdv");
			s.logoRdvWrap.removeClass(logRemClass);
			s.logoRdvWrap.addClass(logAddClass);
			s.navRdvLink.attr("href", rdvAttr);

		},

		gotoHome: function() {
			s.homeWrap.removeClass("hiddenright , hiddenleft");
			s.locWrap.removeClass("revealleft");
			s.buildWrap.removeClass("revealright");
		},

		gotoPage: function(hClass, bClass, lClass, mainEl, secondEl) {
			s.homeWrap.addClass(hClass);
			mainEl.removeClass(bClass);
			secondEl.addClass(lClass);
			setTimeout(function() {
				theone.scrollTop();
			}, 100);
		},

		scrollTop: function() {
			$('html, body').animate({
				scrollTop: 0
			}, 1);
			return false;
		},

		slickFancyTriggers: function(element) {

			element.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide, slickGoTo) {

				// get cur slide, and show relevant gallery trigger
				var self = $(this);
				var curSlide = (currentSlide ? currentSlide : 0);
				var $galLink = self.parent().find('.fancybox');

				$galLink.removeClass('active');
				var $curLink = self.parent().find('a[data-pos="'+curSlide+'"]');
				$curLink.addClass('active');

			});
		},

		slickFire: function(element, appendEl) {

			element.slick({
				appendArrows: appendEl,
				infinite: true,
				pauseOnHover: false,
				easing: s.easeType,
				speed: s.sSlideSpeed
			});
		},

		slickRemove: function(element) {
			element.slick('unslick');
		},

		slickInitBuild: function() {

			theone.slickFancyTriggers(s.slideContBuild);

			theone.slickFire(s.slideContBuild, "#slider-btns-build");

		},

		slickInitLoc: function() {

			theone.slickFancyTriggers(s.slideContLoc);

			theone.slickFire(s.slideContLoc, "#slider-btns-loc");
		},

		slideUpElement: function(slidEl, elToClass, classTo) {

			var slidUp = slidEl.offset().top;
			$(window).scroll(function() {
				if ($(this).scrollTop() > slidUp - 200) {
					elToClass.addClass(classTo);
				}
			});
		},

		floormaps: function() {

			var $floorLink = s.floormapContr.find('[data-link]');

			$floorLink.each(function() {

				$(this).click(function(event) {
					event.preventDefault();

					var self = $(this);
					var linkNum = self.data('link');
					var sizeNum = self.find('.size').text();
					var numFig  = self.find('.num').text();

					$floorLink.removeClass('active');
					self.addClass('active');

					s.floormaps.find('> .floormap').removeClass('active');
					s.floormaps.find('> .floormap[data-floor="'+linkNum+'"]').addClass('active');

					s.floormapContr.find('.floorsize em').text(sizeNum);
					s.floormapContr.find('.floornumbers em').text(numFig);

				});


			});

		},

		accordionInit: function() {
			s.accordion.find("> li > div").click(function() {
				s.accordion.find(".active").not(this).removeClass('active').next().hide(
					300);
				$(this).toggleClass('active');
				if (false == $(this).next().is(':visible')) {
					s.accordion.find("> ul").slideUp(300);
				}
				$(this).next().slideToggle(300);
			});
		}

};  // end theone

$(document).ready(function() {

	theone.init();

	// on resize
	$(window).resize( function(){
		theone.resize();
	}).trigger('resize');

}); // doc ready
