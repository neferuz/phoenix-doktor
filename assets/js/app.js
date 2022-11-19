$slickElement.on(
  "init reInit afterChange",
  function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + "/" + slick.slideCount);
  }
);
if (window.matchMedia("(max-width: 991.98px)").matches) {
  $slickElement.slick({
    infinite: false,
    prevArrow: $(".yd-slick-prev"),
    nextArrow: $(".yd-slick-next"),
  });

  let element1 = document.getElementsByClassName(".yd-tabs .nav-link.active");
  element1.classList.remove("active");
  let element2 = document.getElementsByClassName(".yd-tabs .tab-pane.active");
  element2.classList.remove("active");
  let element3 = document.getElementsByClassName(".yd-tabs .tab-pane.show");
  element3.classList.remove("show");
}
