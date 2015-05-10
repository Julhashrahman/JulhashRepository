$(document).ready(function () {
    
    //$("body").click(function () {
    //    alert("body clicked");
    //});


    /*Page transition---------------- */
    $("body").animate({
        top: '0'
    }, 400, function () {
        // Animation complete.
        /* Pagetitle animations ----------------------*/
        $('#pageTitle').animate({
            right: '0'
        }, 400, function () {
            // Animation complete.
        })
        /* Body section animations ----------------------*/
        $('#bodySection').animate({
            left: '100'
        }, 400, function () {
            $('#bodySection').animate({
                left: '0'
            }, 500, function () {
                // Animation complete.		
            });
        });
        /* Menu Bar animations ----------------------*/
        //if (!is_touch_device()) {
        //    $('.navbar-right').animate({
        //        top: '-40'
        //    }, 400, function() {
        //        // Animation complete.
        //        $('.navbar-right').animate({
        //            //top: '68'
        //            top: '0'
        //        }, 500, function() {
        //            // Animation complete.
        //        });

        //    });
        //}


        $('#footerSection').animate({
            top: '-800'
        }, 0, function () {
            // Animation complete.
            $('#footerSection').animate({
                top: '0'
            }, 1500, function () {
                // Animation complete.
            });
        });



        /* Middle section animations ----------------------*/
        $('#middleSection').animate({
            top: '-180'
        }, 400, function () {
            // Animation complete.
            $('#middleSection').animate({
                top: '0'
            }, 500, function () {
                // Animation complete.
            });
        });







    });


    /* Middle section animations ----------------------*/
    //	$('#footerSection').animate({
    //	    top:'-180'
    //	},400, function() {
    //	    // Animation complete.
    //	    $('#footerSection').animate({
    //	        top:'0'
    //	    },500, function() {
    //	        // Animation complete.
    //	    });
    //	});
    //});



    /* Carousel animation */
    $(".carousel-caption").animate({
        top: '40'
    }, 1800, function () {
        // Animation complete.
    });

    /* Home page main carousel---------------- */
    //$('#myCarousel').carousel({
    //  interval: 5000
    //})
    /* Blog carousel---------------- */
    //$('.blogCarousel').carousel({
    //  interval: 3000
    //})
    // tooltip demo
    //$('.tooltip-demo.well').tooltip({
    //  selector: "a[rel=tooltip]"
    //})
    /* pop over ---------------- */
    //$('.tooltip-test').tooltip()
    //$('.popover-test').popover()

    // popover demo
    //$(".popOver")
    //  .popover()
    //  .click(function(e) {
    //    e.preventDefault()
    //  })

    //$(".toolTipgroup a").tooltip()

    /* Go to top */
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        });

        $('#toTop').click(function () {
            $('body,html').animate({ scrollTop: 0 }, 800);
        });
    });

});



// Portfolio projects rollover --------------------------------------------- //





//$(document).on("mouseover", "#projects-list .project", function () {

//    console.log(11111);

//     // on rollover
//    $(this).children('.project-shadow').children('.project-thumbnail').children(".cover").stop().animate({
//        top: "133"
//    }, "fast");
//},

//function () {
//    // on out
//    $(this).children('.project-shadow').children('.project-thumbnail').children(".cover").stop().animate({
//        top: "0"
//    }, "fast");
//}

//);

//var animateImage = function (obj) {
//    console.log(11111);


//    $(obj).find(".cover").css("background-color","red");

//    console.log($(obj).find(".cover"));

//    // on rollover
//    $(obj).children('.project-shadow').children('.project-thumbnail').children(".cover").stop().animate({
//        top: "133"
//    }, "fast");
//}




//$('#projects-list .project').hover(function () {
//    // on rollover
//    $(this).children('.project-shadow').children('.project-thumbnail').children(".cover").stop().animate({
//        top: "133"
//    }, "fast");
//}, function () {
//    // on out
//    $(this).children('.project-shadow').children('.project-thumbnail').children(".cover").stop().animate({
//        top: "0"
//    }, "fast");
//});


// Fancy box
//$("a.fancybox").fancybox({
//    'overlayColor': '#000'
//});



function is_touch_device() {
    return !!('ontouchstart' in window) // works on most browsers 
        || !!('onmsgesturechange' in window); // works on ie10
};
