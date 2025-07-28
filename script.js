const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var timeout;

function firstPageAnim() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo,
  })
    .to(".boundingelem", {
      y: "0",
      duration: 1.5,
      ease: Expo,
      delay: -1,
      stagger: 0.3,
    })
    .from("#herofooter", {
      y: "-10",
      duration: 1.5,
      opacity: 0,
      delay: -1,
      ease: Expo,
    });
}

function circleskew() {
  var xScale = 1;
  var yScale = 1;

  var xprevious = 0;
  var yprevious = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    xScale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprevious);
    yScale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprevious);

    xprevious = dets.clientX;
    yprevious = dets.clientY;

    circleMouseFollower(xScale, yScale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px)  scale(1,1)`;
    }, 100);
  });
}

function circleMouseFollower(xScale, yScale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px)  scale(${xScale},${yScale})`;
  });
}

circleskew();

firstPageAnim();



document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;

    diffrot = dets.clientX - rotate;
    rotate = dets.clientx;

    
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,

      top: diff,
      left: dets.clientX,
      rotate:  gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});
