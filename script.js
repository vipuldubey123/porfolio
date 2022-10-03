function show(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
      
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

show();


gsap.from("#page1>h4",{
    opacity: 0,
    y:-100,
    stagger : .01,
})

gsap.from("#nav>h6",{
    opacity:0,
    y :-100,
    stagger : .2,
})

gsap.from("#page1>h1",{
    opacity: 0,
    x : 100,
    stagger : .5,
})
gsap.from("#page1>h2",{
    opacity: 0,
    y : 100,
    stagger : .5,
})

gsap.from("#page1>h5",{
    opacity :0,
    y : -100,
    stagger : .5,
})

gsap.from("#page1>h3",{
    opacity : 0,
    x : -50

})

gsap.from("#line1",{
  // width : "20vw",
  ScrollTrigger : {
    scroller : "#main",
    trigger : "#line1",
    scrub : true,
    end : "right 50%",
    markers : true,
  },
})

function boxAnimation(){
  gsap.to("#box1>img",{
    scrollTrigger : {
      trigger : "#box1>img",
      scroller : "#main",
      toggleactions : "play pause pause reverse"
    },
    scale : 1,
    top: 0,
    borderTopRightRadius: '0',
    borderTopLeftRadius: '0',
    // width: '100vw',
    // height: '100vh',
    ease: ' Power2.easeOut',
    backgroundImage: "none",
    backgroundColor: "blue",
    boxShadow: 'none',
  })
}

boxAnimation();
    

