/* ===================================================================
 * Si Nguyen - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {
  "use strict";

  var cfg = {
      scrollDuration: 800, // smoothscroll duration
      mailChimpURL: "" // mailchimp url
    },
    $WIN = $(window);
    $WIN.scrollTop(0);
  // Add the User Agent to the <html>
  // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
  var doc = document.documentElement;
  doc.setAttribute("data-useragent", navigator.userAgent);
  const links = document.querySelectorAll("a");
  /* Preloader
   * -------------------------------------------------- */
  var ssPreloader = function() {
    $("html").addClass("ss-preload");

    $WIN.on("load", function() {
      // force page scroll position to top at page refresh
      // $('html, body').animate({ scrollTop: 0 }, 'normal');

      // will first fade out the loading animation
      $("#loader").fadeOut("slow", function() {
        // will fade out the whole DIV that covers the website.
        $("#preloader")
          .delay(300)
          .fadeOut("slow");
      });

      // for hero content animations
      $("html").removeClass("ss-preload");
      $("html").addClass("ss-loaded");
    });
  };

  /* pretty print
   * -------------------------------------------------- */
  var ssPrettyPrint = function() {
    $("pre").addClass("prettyprint");
    $(document).ready(function() {
      prettyPrint();
    });
  };

  /* Move header
   * -------------------------------------------------- */
  var ssMoveHeader = function() {
    var hero = $(".page-hero"),
      hdr = $("header"),
      triggerHeight = hero.outerHeight() - 170;

    $WIN.on("scroll", function() {
      var loc = $WIN.scrollTop();

      if (loc > triggerHeight) {
        hdr.addClass("sticky");
      } else {
        hdr.removeClass("sticky");
      }

      if (loc > triggerHeight + 20) {
        hdr.addClass("offset");
      } else {
        hdr.removeClass("offset");
      }

      if (loc > triggerHeight + 150) {
        hdr.addClass("scrolling");
      } else {
        hdr.removeClass("scrolling");
      }
    });

    // $WIN.on('resize', function() {
    //     if ($WIN.width() <= 768) {
    //             hdr.removeClass('sticky offset scrolling');
    //     }
    // });
  };

  /* Mobile Menu
   * ---------------------------------------------------- */
  var ssMobileMenu = function() {
    var toggleButton = $(".header-menu-toggle"),
      nav = $(".header-nav-wrap");

    toggleButton.on("click", function(event) {
      event.preventDefault();

      toggleButton.toggleClass("is-clicked");
      nav.slideToggle();
    });

    if (toggleButton.is(":visible")) nav.addClass("mobile");

    $WIN.on("resize", function() {
      if (toggleButton.is(":visible")) nav.addClass("mobile");
      else nav.removeClass("mobile");
    });

    nav.find("a").on("click", function() {
      if (nav.hasClass("mobile")) {
        toggleButton.toggleClass("is-clicked");
        nav.slideToggle();
      }
    });
  };

  /* Masonry
   * ---------------------------------------------------- */
  var ssMasonryFolio = function() {
    var containerBricks = $(".masonry");

    containerBricks.imagesLoaded(function() {
      containerBricks.masonry({
        itemSelector: ".masonry__brick",
        resize: true
      });
    });
  };

  /* photoswipe
   * ----------------------------------------------------- */
  var ssPhotoswipe = function() {
    var items = [],
      $pswp = $(".pswp")[0],
      $folioItems = $(".item-folio");

    // get items
    $folioItems.each(function(i) {
      var $folio = $(this),
        $thumbLink = $folio.find(".thumb-link"),
        $title = $folio.find(".item-folio__title"),
        $caption = $folio.find(".item-folio__caption"),
        $titleText = "<h4>" + $.trim($title.html()) + "</h4>",
        $captionText = $.trim($caption.html()),
        $href = $thumbLink.attr("href"),
        $size = $thumbLink.data("size").split("x"),
        $width = $size[0],
        $height = $size[1];

      var item = {
        src: $href,
        w: $width,
        h: $height
      };

      if ($caption.length > 0) {
        item.title = $.trim($titleText + $captionText);
      }

      items.push(item);
    });

    // bind click event
    $folioItems.each(function(i) {
      $(this).on("click", function(e) {
        e.preventDefault();
        var options = {
          index: i,
          showHideOpacity: true
        };

        // initialize PhotoSwipe
        var lightBox = new PhotoSwipe(
          $pswp,
          PhotoSwipeUI_Default,
          items,
          options
        );
        lightBox.init();
      });
    });
  };

  /* slick slider
   * ------------------------------------------------------ */
  var ssSlickSlider = function() {
    $(".testimonials__slider").slick({
      arrows: true,
      dots: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow:
        "<div class='slick-prev'><i class='im im-arrow-left' aria-hidden='true'></i></div>",
      nextArrow:
        "<div class='slick-next'><i class='im im-arrow-right' aria-hidden='true'></i></div>",
      pauseOnFocus: false,
      autoplaySpeed: 1500,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  };

  /* Highlight the current section in the navigation bar
   * ------------------------------------------------------ */
  var ssWaypoints = function() {
    var sections = $(".target-section"),
      navigation_links = $(".header-nav li a");

    sections.waypoint({
      handler: function(direction) {
        var active_section;

        active_section = $("section#" + this.element.id);

        if (direction === "up")
          active_section = active_section.prevAll(".target-section").first();

        var active_link = $(
          '.header-nav li a[href="#' + active_section.attr("id") + '"]'
        );

        navigation_links.parent().removeClass("current");
        active_link.parent().addClass("current");
      },

      offset: "25%"
    });
  };

  /* Stat Counter
   * ------------------------------------------------------ */
  var ssStatCount = function() {
    var statSection = $(".s-stats"),
      stats = $(".stats__count");

    statSection.waypoint({
      handler: function(direction) {
        if (direction === "down") {
          stats.each(function() {
            var $this = $(this);

            $({ Counter: 0 }).animate(
              { Counter: $this.text() },
              {
                duration: 4000,
                easing: "swing",
                step: function(curValue) {
                  $this.text(Math.ceil(curValue));
                }
              }
            );
          });
        }

        // trigger once only
        this.destroy();
      },

      offset: "90%"
    });
  };

  /* Smooth Scrolling
   * ------------------------------------------------------ */
  var ssSmoothScroll = function() {
    $(".smoothscroll").on("click", function(e) {
      var target = this.hash,
        $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top
          },
          cfg.scrollDuration,
          "swing",
          function() {
            window.location.hash = target;
          }
        );
    });
  };

  /* Placeholder Plugin Settings
   * ------------------------------------------------------ */
  var ssPlaceholder = function() {
    $("input, textarea, select").placeholder();
  };

  /* Alert Boxes
   * ------------------------------------------------------ */
  var ssAlertBoxes = function() {
    $(".alert-box").on("click", ".alert-box__close", function() {
      $(this)
        .parent()
        .fadeOut(500);
    });
  };

  /* Contact Form
   * ------------------------------------------------------ */
  var ssContactForm = function() {
    /* local validation */
    $("#contactForm").validate({
      /* submit via ajax */
      submitHandler: function(form) {
        var sLoader = $(".submit-loader");

        $.ajax({
          type: "POST",
          url: "inc/sendEmail.php",
          data: $(form).serialize(),
          beforeSend: function() {
            sLoader.slideDown("slow");
          },
          success: function(msg) {
            // Message was sent
            if (msg == "OK") {
              sLoader.slideUp("slow");
              $(".message-warning").fadeOut();
              $("#contactForm").fadeOut();
              $(".message-success").fadeIn();
            }
            // There was an error
            else {
              sLoader.slideUp("slow");
              $(".message-warning").html(msg);
              $(".message-warning").slideDown("slow");
            }
          },
          error: function() {
            sLoader.slideUp("slow");
            $(".message-warning").html(
              "Something went wrong. Please try again."
            );
            $(".message-warning").slideDown("slow");
          }
        });
      }
    });
  };

  /* Back to Top
   * ------------------------------------------------------ */
  var ssBackToTop = function() {
    var pxShow = 500, // height on which the button will show
      fadeInTime = 400, // how slow/fast you want the button to show
      fadeOutTime = 400, // how slow/fast you want the button to hide
      scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
      goTopButton = $(".go-top");

    // Show or hide the sticky footer button
    $(window).on("scroll", function() {
      if ($(window).scrollTop() >= pxShow) {
        goTopButton.fadeIn(fadeInTime);
      } else {
        goTopButton.fadeOut(fadeOutTime);
      }
    });
  };
  /* GetIP
   * ------------------------------------------------------ */
  var GetIP = function(){
  //   $.get("https://ipinfo.io", function(response) { 
  //     console.log(response); 
  // }, "json") 

  }
  
  /* Follow Mouse Cursor
   * ------------------------------------------------------ */
  var followMouse = function() {
    function onMouseMove(e) {
      // Find its child
      var cursor = this.querySelector("#cursor");
      var cursorDot = this.querySelector("#cursor__dot");
      $("a")
        .mouseenter(function() {
          cursor.css({
            transform: "scale(3.2)"
          });
        })
        .mouseleave(function() {
          cursor.css({
            transform: "scale(1)"
          });
        });
      gsap.to(cursor, 0.7, {
        x: e.clientX,
        y: e.clientY,
        ease: Elastic.easeOut
      });     
      gsap.to(cursorDot, 0, {
        x: e.clientX,
        y: e.clientY
      });
    }

    function init() {
      var t, o;      
      // Listen for mouse movement when over either one of the parents
      // window.addEventListener('mousemove', onMouseMove)
      window.addEventListener("mousedown", function(e) {
        gsap.to(cursor, .2, {
          x: t,
          y: o,
          ease: Cubic.easeOut,                        
          
          css: {scale:0.4,'background-color':'#fff'}
        });
      })
      window.addEventListener("mouseup", function(e) {
        gsap.to(cursor, .2, {
          x: t,
          y: o,
          ease: Cubic.easeIn,                                  
          css: {scale: 1,'background-color':'unset'}
        });
      })
      links.forEach(link => {
        link.addEventListener('mouseenter', e => {
         gsap.to(cursor, {
             duration: 0.5,
             ease: Cubic.easeOut,             
             
             css: {scale: 1.7,'background-color':'white'}
         })
        });
         link.addEventListener('mouseleave', e => {
             gsap.to(cursor, {
                 duration: 0.2,
                 ease: Cubic.easeIn, 
                 css: {scale: 1,'background-color':'unset'}
             })
         });
     });
      window.addEventListener("mousemove", function(e) {
        // document.body.style.setProperty('--x',(e.clientX)+'px');
        // document.body.style.setProperty('--y',(e.clientY)+'px');
        t = 0,
        o = 0;
        e || (e = window.event),
          e.pageX || e.pageY
            ? ((t = e.pageX), (o = e.pageY))
            : (e.clientX || e.clientY) &&
              ((t =
                e.clientX +
                body.scrollLeft +
                document.documentElement.scrollLeft),
              (o =
                e.clientY +
                body.scrollTop +
                document.documentElement.scrollTop)),
          {
            x: t,
            y: o
          };

        var cursor = document.getElementById("cursor");
        var cursorDot = document.getElementById("cursor__dot");
        
        gsap.to(cursor, .7, {
            x: t,
            y: o,
            ease: Power4.easeOut     
          });
        // gsap.to(cursor, 2, {
        //   x: t,
        //   y: o,
        //   ease: Power4.easeOut
        // });
        gsap.to(cursorDot, 0, {
          x: t,
          y: o
        });


        // $("a")
        //       .mouseenter(function() {
        //           gsap.to(cursor, {
                       
        //                 alpha: .1,
        //                 duration: .5,
        //                 ease: "easeOutCubic",
        //                 delay: .05 * t + .5,
        //                 scale: 1.2
        //             });
        //       })
        //       .mouseleave(function() {
        //         gsap.to(cursor, {                     
        //               alpha: .1,
        //               duration: .5,
        //               ease: "easeOutCubic",
        //               delay: .05 * t + .5,
        //               scale: 1
        //           });
        //       });
        // $(window)
        //         .mousedown(function() {
        //             gsap.to(cursor, 2, {
        //                 x: t,
        //                 y: o,
        //                 ease: Cubic.easeOut,                        
        //                 css:{scale:0.4}     
        //               });
        //         })
        //         .mouseup(function() {
        //             gsap.to(cursor, 0.5, {
        //                 x: t,
        //                 y: o,
        //                 css:{scale:1.0},
        //                 ease: Cubic.easeIn,
                                                     
        //               });
        //         }); 
        
      });
    }

    // wait until DOM is ready
    document.addEventListener("DOMContentLoaded", function(event) {
      // wait until window, stylesheets, images, links, and other media assets are loaded
      window.onload = function() {
        // Center the pivot point of the cursor
        gsap.set("#cursor", {
          xPercent: -50,
          yPercent: -50
        });
        gsap.set("#cursor__dot", {
          xPercent: -50,
          yPercent: -50
        });
        // All ready, start!
        init();
      };
    });
  };

  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssPrettyPrint();
    ssMoveHeader();
    ssMobileMenu();
    ssMasonryFolio();
    ssPhotoswipe();
    ssSlickSlider();
    ssWaypoints();
    ssStatCount();
    ssSmoothScroll();
    ssPlaceholder();
    ssAlertBoxes();
    ssContactForm();
    ssBackToTop();
    followMouse();
    GetIP();
    // scallingUp();
  })();
})(jQuery);
