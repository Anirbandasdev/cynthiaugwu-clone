function locoscholl() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function circleflat(){
    // ! define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (dets) {
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev)
        yscale = gsap.utils.clamp(.8, 1.2, dets.clienty - yprev)

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale)
    });
}


function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector(".mincircle").style.transform = `translate(${dets.clientX -7}px, ${dets.clientY - 8}px)`;
    })
}


function heroanimation() {
    tl = gsap.timeline();

    tl.from(".nav", {
        y: '-10',
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut,
    })
        .to(".animationyup h1", {
            y: "0",
            duration: 1,
            ease: Expo.easeInOut,
            stagger: .2
        })
        .to(".animationydown h5", {
            y: "0",
            duration: 1,
            ease: Expo.easeInOut,
            delay: -1,
            stagger: .2
        })
        .from(".herofooter", {
            y: '-10',
            opacity: 0,
            duration: .5,
            // delay: ,
            ease: Expo.easeInOut,
        })
        .form(".mincircle", {
            opacity: 0,
            duration: .5,
            ease: Expo.easeInOut,
        })
}



locoscholl();
circleflat();
circleMouseFollower();
heroanimation();