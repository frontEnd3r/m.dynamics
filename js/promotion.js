
$(document).ready(function () {

  // HEADER FIXED
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".header-top").addClass("fixed");
    } else {
      $(".header-top").removeClass("fixed");
    }
  });

  // TELMASK
  $("input[name=user-tel]").inputmask("+7(999)999-99-99");

  // MOBILE MENU TOGGLE
  let mobileButton = $('.header-top-wrap__mobile-btn');
  let mobileBackground = $('.header-top-mobile-container');
  let mobileNav = $('.header-top-wrap-pages');
  let headerTop = $('.header-top');

  mobileButton.on('click', function () {
    mobileNav.toggle();
    mobileBackground.toggle();
    headerTop.toggleClass('mobile-open');
    $(".header-top-wrap__mobile-btn--span").each(function () {
      $(this).toggleClass("active");
    })
  });

});

// SLIDER & CURSOR
window.addEventListener("DOMContentLoaded", function () {

  let pictureArr = [...document.querySelectorAll('.anim')];
  const container = document.querySelector(".sliders");
  const cursor = document.querySelector(".cursor");
  const arrow = document.querySelector(".cursor-arrow");



  posX = 0;
  posY = 0;

  // FUNCTIONS
  function toggleClass(arr) {
    arr.forEach(function (el) {
      el.classList.toggle('fadein');
    })
  }

  function checkSlides(slider) {
    if (slider.activeIndex === 0) {
      return 'noleft';
    } else if (slider.activeIndex === slider.slides.length - 1) {
      return 'noright';
    }
  }


  // SLIDER INIT
  const sliderExamples = new Swiper('.examples-swiper', {
    slidesPerView: 1,
    speed: 2000,
    spaceBetween: 100,
    loop: false,
    spaceBetween: 1000,
    grabCursor: false,
    allowTouchMove: false,
    on: {
      init: function () {
        toggleClass(pictureArr);
      },
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: false,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      }
    }
  });

  const sliderGratitude = new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    speed: 2000,
    spaceBetween: 100,
    loop: false,
    spaceBetween: 1000,
    grabCursor: false,
    allowTouchMove: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: false,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      }
    },
    breakpoints: {
      768: {
        allowTouchMove: true,
      },
    }
  });

  //CUSTOM CURSOR POINTER ON HOVER 
  // const buttons = [...document.querySelectorAll(".swiper-pagination-bullet")];

  // buttons.forEach(function (i) {
  //   i.addEventListener("mouseover", function () {
  //     cursor.classList.add("point");
  //   });
  //   i.addEventListener("mouseout", function () {
  //     cursor.classList.remove("point");
  //   });
  // });

  // CURSOR MOVE
  if (window.matchMedia("(min-width: 400px)").matches) {
    container.addEventListener("mousemove", function (e) {
      let clientRect = container.getBoundingClientRect()
      let posX = e.clientX - clientRect.left;
      let posY = e.clientY - clientRect.top;

      cursor.style.transform = `translate3d(${(posX - 45)}px, ${(posY - 40)}px, 0)`;

      if (posX <= container.clientWidth / 2) {
        arrow.classList.add("cursor-arrow-left");
      } else {
        arrow.classList.remove("cursor-arrow-left");
      }
    });

    // SLIDES CHANGING
    let examplesSlider = container.querySelector(".examples");
    let reviewsSlider = container.querySelector(".reviews");
    let examplesPrev = container.querySelector(".examples__button--prev");
    let examplesNext = container.querySelector(".examples__button--next");
    let reviewsPrev = container.querySelector(".reviews__button--prev");
    let reviewsNext = container.querySelector(".reviews__button--next");

    examplesPrev.addEventListener('click', () => {
      let checked = checkSlides(sliderExamples);
      if (checked === 'noleft') {
        return;
      }
      let pictureArr = [...examplesSlider.querySelectorAll('.anim')];
      toggleClass(pictureArr);
      setTimeout(() => {
        sliderExamples.slidePrev(0);
        toggleClass(pictureArr);
      }, 2000);
    });

    examplesNext.addEventListener('click', () => {
      let checked = checkSlides(sliderExamples);
      if (checked === 'noright') {
        return;
      }
      let pictureArr = [...examplesSlider.querySelectorAll('.anim')];
      toggleClass(pictureArr);
      setTimeout(() => {
        sliderExamples.slideNext(0);
        toggleClass(pictureArr);
      }, 2000);
    });

    reviewsPrev.addEventListener('click', () => {
      let checked = checkSlides(sliderGratitude);
      if (checked === 'noleft') {
        return;
      }
      let pictureArr = [...reviewsSlider.querySelectorAll('.anim')];
      toggleClass(pictureArr);
      setTimeout(() => {
        sliderGratitude.slidePrev(0);
        toggleClass(pictureArr);
      }, 2000);
    });

    reviewsNext.addEventListener('click', () => {
      let checked = checkSlides(sliderGratitude);
      if (checked === 'noright') {
        return;
      }
      let pictureArr = [...reviewsSlider.querySelectorAll('.anim')];
      toggleClass(pictureArr);
      setTimeout(() => {
        sliderGratitude.slideNext(0);
        toggleClass(pictureArr);
      }, 2000);
    });
  }

});

// QUIZ FORM
document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.getElementsByClassName("tab");
  const popupOpen = [...document.querySelectorAll(".popup-open")];
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const quizPopup = document.querySelector(".quiz-popup-container");
  const popupClose = document.querySelector(".quiz-popup__close");
  const quizRocket = document.querySelector(".quiz-popup-footer-progress__rocket");
  const quizProgressLine = document.querySelector(".quiz-popup-footer-progress-bar__line");

  const tabsEnd = tabs.length - 1;

  let currentTab = 0;

  showTab(currentTab);

  function showTab(currentTab) {
    tabs[currentTab].classList.add("show");
    if (currentTab === (tabsEnd)) {
      nextBtn.innerHTML = "Отлично!";
      document.getElementsByClassName("quiz-popup__title")[0].innerHTML = "Заявка отправлена <br /> <b>совсем скоро мы с вами свяжемся!</b>";
      nextBtn.style.marginBottom = "55px";
      prevBtn.style.display = "none";
    } else if (currentTab === (tabsEnd - 1)) {
      nextBtn.innerHTML = "Отправить";
    } else {
      nextBtn.innerHTML = "Далее";
    }
    rocketMove(currentTab);
  }

  nextBtn.addEventListener("click", () => {
    if (currentTab < tabsEnd) {
      tabs[currentTab].classList.remove("show");
      currentTab += 1;
      showTab(currentTab);
    } else if (currentTab === tabsEnd) {
      return;
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentTab > 0) {
      tabs[currentTab].classList.remove("show");
      currentTab -= 1;
      showTab(currentTab);
    } else if (currentTab === 0) {
      return;
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches('.popup-open')) {
      quizPopup.style.display = "flex";
    }
  });

  popupClose.addEventListener("click", () => {
    quizPopup.style.display = "none";
  });

  function rocketMove(currentTab) {
    switch (currentTab) {
      case 0:
        quizRocket.style.transform = "translateX(0px)";
        quizProgressLine.style.transform = "translateX(-100%)";
        break;
      case 1:
        quizRocket.style.transform = "translateX(112px)";
        quizProgressLine.style.transform = "translateX(-85%)";
        break;
      case 2:
        quizRocket.style.transform = "translateX(244px)";
        quizProgressLine.style.transform = "translateX(-67%)";
        break;
      case 3:
        quizRocket.style.transform = "translateX(370px)";
        quizProgressLine.style.transform = "translateX(-50%)";
        break;
      case 4:
        quizRocket.style.transform = "translateX(500px)";
        quizProgressLine.style.transform = "translateX(-32%)";
        break;
      case 5:
        quizRocket.style.transform = "translateX(627px)";
        quizProgressLine.style.transform = "translateX(-14%)";
        break;
      case 6:
        quizRocket.style.transform = "translateX(730px)";
        quizProgressLine.style.transform = "translateX(0%)";
        break;

      default:
        break;
    }
  }


});



// PRELOADER
document.addEventListener("DOMContentLoaded", () => {

  function preloaderInit() {
    const preloaderContainer = document.querySelector(".preloader-container");
    const preloaderRocket = document.querySelector(".preloader-wrap-progress__rocket");
    const preloaderProgressLine = document.querySelector(".preloader-wrap-progress__line");

    let width = 1;
    let interval = setInterval(progressStatus, 0);
    function progressStatus() {
      while (width < 100) {
        preloaderProgressLine.style.width = width + '%';
        preloaderRocket.style.left = (width - 15) + '%';
        preloaderProgressLine.style.width = width + '%';
        width += 1;
        if (width === 100 && document.readyState == 'complete') {
          clearInterval(interval);
          preloaderContainer.style.display = "none";
        }
        return;
      }
    }
  }
  preloaderInit();
});


jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
  }
};
jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
  }
};
jQuery.event.special.wheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("wheel", handle, { passive: true });
  }
};
jQuery.event.special.mousewheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("mousewheel", handle, { passive: true });
  }
};

