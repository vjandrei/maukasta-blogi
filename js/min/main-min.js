$(function(){
	
	/*
	var animData = {
        container: document.getElementById('maukastalogoanimate'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData
    };
    var anim = bodymovin.loadAnimation(animData);
	*/
	
	// Find all YouTube videos
var $allVideos = $("iframe[src^='//www.youtube.com']"),

    // The element that is fluid width
    $fluidEl = $("body");

// Figure out and save aspect ratio for each video
$allVideos.each(function() {

  $(this)
    .data('aspectRatio', this.height / this.width)

    // and remove the hard coded width/height
    .removeAttr('height')
    .removeAttr('width');

});

// When the window is resized
$(window).resize(function() {

  var newWidth = $fluidEl.width();

  // Resize all videos according to their own aspect ratio
  $allVideos.each(function() {

    var $el = $(this);
    $el
      .width(newWidth)
      .height(newWidth * $el.data('aspectRatio'));

  });

// Kick off one resize to fix all videos on page load
}).resize();

	$("#welcomeHeaderContainer h1 b").typed({
        strings: ["oppimaan! ^500", "nauttimaan! ^500", "herkuttelemaan! ^500"],
        typeSpeed: 50
    });

	var handler = 'mousemove';
	
	$("body").on(handler,'.scroller-content',function(e){
		e.preventDefault();
		//var offset = ($(this).hasClass('full')) ? '' : 230;
		var offset = $(this).parent().offset().left;
		var mouseRatioX = (e.pageX-offset)/$(this).parent().width();
		if($(this).width() > $(this).parent().width())
		$(this).css({"margin-left": -mouseRatioX*( $(this).width()-$(this).parent().width() )});
	});
	    
	
	
	$('.bxslider').bxSlider({
	  pagerCustom: '#bx-pager',
	  mode: 'horizontal',
	  controls: false,
	  auto: false,
	  touchEnabled: true,
	  preloadImages: 'all'
	});	
	
	// -------------------------------------------------------------
    // Social feed
    // -------------------------------------------------------------

	$('.socialContainer').socialfeed({
		twitter: {
		    accounts: ['@maukasta'],
		    limit: 10,
		    consumer_key: 'VMdKJmqnvBUD4TmRsaNwmg', // make sure to have your app read-only
		    consumer_secret: 'pk8Ovp0EToBOwYttNm5XT8bgUFX3YdieNZmrCamr4M', // make sure to have your app read-only
		},
		// INSTAGRAM
		instagram: {
		    accounts: ['@maukastafi','#maukastafi'], 
		    limit: 5,
		    client_id: 'f140a820684b42e987e89e2ed90f8115',
		    access_token: ''
		},
		
		// GENERAL SETTINGS
		length: 200,
		show_media: true,
		date_format: "",  
		// Moderation function - if returns false, template will have class hidden
		moderation: function(content) {
		    return (content.text) ? content.text.indexOf('fuck') == -1 : true;
		},
		//update_period: 5000,
		// When all the posts are collected and displayed - this function is evoked
		callback: function() {
		    console.log('all posts are collected');
		}
	});

	// -------------------------------------------------------------
    // Isotope
    // ----
    

	// -------------------------------------------------------------
    // Getsimple form
    // -------------------------------------------------------------

	$('#ajax-form').submit(function(){
		$.ajax({
		  dataType: 'json',
		  url: "http://getsimpleform.com/messages/ajax?form_api_token=d632a9ee664e13d7d16430627387fab1",
		  data: $('#ajax-form').serialize() 
		}).done(function() {
		  //callback which can be used to show a thank you message
		  //and reset the form
		  	
		  	$.notify({
				// options
				title: 'Lähetys onnistui.',
				message: 'Kiitos, viestisi on lähetetty onnistuneesti!',
				url: '',
				target: '_blank'
			},{
				// settings
				element: 'body',
				position: null,
				type: "info",
				allow_dismiss: true,
				newest_on_top: false,
				showProgressbar: false,
				placement: {
					from: "top",
					align: "right"
				},
				offset: 20,
				spacing: 10,
				z_index: 1031,
				delay: 5000,
				timer: 1000,
				url_target: '_blank',
				mouse_over: null,
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
				onShow: null,
				onShown: null,
				onClose: null,
				onClosed: null,
				icon_type: 'class',
				template: '<div data-notify="container" class="notifyBox"  role="alert">' +
					'<span data-notify="title"><h4>{1}</h4></span> ' +
					'<span data-notify="message"><p>{2}</p></span>' +
					'<div class="progress" data-notify="progressbar">' +
						'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					'</div>' +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
				'</div>' 
			});
		  	
		});
		return false; //to stop the form from submitting
	});
	
	// -------------------------------------------------------------
    // Search
    // -------------------------------------------------------------	
    
	$('#searchContent').scotchPanel({
	    containerSelector: 'body', // As a jQuery Selector
	    direction: 'right', // Make it toggle in from the left
	    duration: 300, // Speed in ms how fast you want it to be
	    transition: 'ease', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
	    clickSelector: '.toggle-panel', // Enables toggling when clicking elements of this class
	    distanceX: '100%', // Size fo the toggle
	    enableEscapeKey: true // Clicking Esc will close the panel
	});
	
	
	$('#search-query').lunrSearch({
      indexUrl: '/js/index.json',   // Url for the .json file containing search index data
      results : '#search-results',  // selector for containing search results element
      entries : '.entries',         // selector for search entries containing element (contained within results above)
      template: '#search-results-template'  // selector for Mustache.js template
    });
    
	
	// -------------------------------------------------------------
    // Show ingredients
    // -------------------------------------------------------------
	
	$(".ingredients").offcanvas({
	    mainCanvas: '.postBlogContent', // Selector or jQuery object
	    css: {
		    width:    '30%'
		},
		injectPosition: 'after'
	});

	$(".showIngredients").click(function() {
	    $(".ingredients").offcanvas("toggle"); // Toggle after click a button
	});
	
	// -------------------------------------------------------------
    // Animated scrolling / Scroll Up
    // -------------------------------------------------------------

    (function () {
        $('a[href*=#]').bind("click", function(e){
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });
    }()); 
})

