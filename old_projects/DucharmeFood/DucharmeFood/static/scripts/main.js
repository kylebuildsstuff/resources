/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

 function validateForm() {
   var email1 = document.forms["orderform"]["sender"].value;
   var email2 = document.forms["orderform"]["senderConfirm"].value;
   if (email1 !== email2) {
     alert("Emails do not match");
     return false;
   } else {
     return true;
   }
 }

(function($) {

    $faqQuestion = $('.faq--question');

    //FAQ question/Answer Mouse effects
    $faqQuestion.on('mouseover', function () {
      $(this).toggleClass('faq--question--hover');
    }).on('mouseleave', function () {
      $(this).toggleClass('faq--question--hover');
    });
    $faqQuestion.on('click', function () {
      $(this).next('.faq--answer').slideToggle('fast', function () {
        $(this).toggleClass('faq--answer--active');
      });
    });

    //meal item toggle
    $('.meals--sampleimages--detail-toggler').on('click', function () {
      $(this).find('.meals--sampleimages--details').fadeToggle(400);
    })

    //Display order price & number of meals
    $('.price-input').change(function () {
      orders = parseFloat($('.orderform--order-number').find('input').val());
      mealsPerOrder = parseFloat($('.orderform--meals-per-order').find('input').val());
      tax = 0.13
      deliveryFee = 2.50
      mealPrice = 8.0

      preTotal = parseFloat(orders*(mealsPerOrder*mealPrice) + deliveryFee)
      total = ((preTotal*tax) + preTotal).toFixed(2);
      totalMeals = parseFloat(orders*mealsPerOrder);

      $('.orderform--price-display').html("$" + total);
      $('.orderform--meal-number-display').html(totalMeals);
    })

    // GOOGLE MAPS ADDRESSEs SEARCH
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(42.011970, -83.147363),
      new google.maps.LatLng(42.374842, -82.601634));

    var options = {
      bounds: defaultBounds
    }

    addressInput = document.querySelector('#id_address');
    googleSearch = new google.maps.places.SearchBox(addressInput, options);


    ////////////////////////////////////////////////////////////////////////
    // "use strict"; // Start of use strict/////////////////////////////////
    // jQuery for page scrolling feature - requires jQuery Easing plugin/////
    /////////////////////////////////////////////////////////////////////////
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })
    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict
