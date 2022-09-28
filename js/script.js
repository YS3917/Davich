window.onload = function () {
  AOS.init();

  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".go-top").fadeIn();
    } else {
      $(".go-top").fadeOut();
    }
  });

  $(".go-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      700
    );
  });

  let videosTime = [100, 110, 100, 230, 120];
  // 시간 비교용 변수
  let videosStart = 0;
  // 타이머 저장용
  let videosTimer = 0;
  // 시간 비교용 변수
  let videosPlayTime = 0;
  // 현재 보여지는 슬라이드 번호
  let videosSlide = 0;
  // 전체 슬라이드 개수
  let videosSlideTotal = videosTime.length;
  // 스크롤되는 박스
  let videoBox;
  // 전체 비디오
  let videos = $(".sw-visual .swiper-slide video");
  $.each(videos, function (index, item) {
    $(this)[0].pause();
    clearInterval(videosTimer);
  });
  // 현재 비디오
  let videoNow = videos[0];

  let swVisual = new Swiper(".sw-visual", {
    loop: true,
    pagination: {
      el: ".sw-visual-pg",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      activeIndexChange: function () {
        // console.log("swiper initialized" + this.realIndex);
        videoNow.pause();
        videosSlide = this.realIndex;
        videosPlayTime = videosTime[this.realIndex];
        videosStart = 0;
        videoNow = videos[videosSlide];
        videoShow();
      },
    },
  });

  // 타이머 만들어주는 함수
  function videoShow() {
    clearInterval(videosTimer);
    $(".sw-visual-bar").find(".box").width("0%");
    $(".sw-visual-bar").removeClass("sw-visual-bar-active ");
    $(".sw-visual-bar").eq(videosSlide).addClass("sw-visual-bar-active");
    // $(".sw-visual-bar").eq(videosSlide).find(".box").css("width", "100%");
    videoBox = $(".sw-visual-bar").eq(videosSlide).find(".box");

    videoNow.play();
    videosTimer = setInterval(() => {
      videosStart++;
      videoBox.width((videosStart / videosPlayTime) * 100 + "%");
      if (videosStart >= videosPlayTime) {
        clearInterval(videosTimer);
        videosSlide++;
        if (videosSlide >= videosSlideTotal) {
          videosSlide = 0;
        }
        swVisual.slideTo(videosSlide + 1);
      }
    }, 100);
  }

  let btnPlay = $(".btn-play");
  let btnStop = $(".btn-stop");
  btnPlay.click(function () {
    // 타이머 재 시작//
    videoNow.play();
    videoShow();
  });
  btnStop.click(function () {
    clearInterval(videosTimer);
    videoNow.pause();
  });

  let swNews = new Swiper(".sw-news", {
    loop: true,
  });

  let header = $("header");
  let firstMenu = $(".gnb > ul > li");

  headerHeight = header.outerHeight();

  firstMenu.mouseenter(function () {
    let subHeight = $(this).find("ul").outerHeight();
    header.stop().animate(
      {
        height: headerHeight + subHeight + "px",
      },
      300
    );
    $(this).find("ul").show();
  });
  firstMenu.mouseleave(function () {
    header.stop().animate(
      {
        height: headerHeight + "px",
      },
      300
    );
    $(this).find("ul").hide();
  });

  let borderBox = $("header > .border-box");
  borderBox.mouseover(function () {
    $(this).css("border-bottom", "1px solid #222222");
  });
  borderBox.mouseout(function () {
    $(this).css("border-bottom", "none");
  });

  firstMenu.mouseover(function () {
    $(this).css("border-bottom", "2px solid #0056aa");
    let mainTxt = $(this).find("> a");
    $(mainTxt).css("color", "#0056aa");
  });

  firstMenu.mouseout(function () {
    $(this).css("border-bottom", "none");
    let mainTxt = $(this).find("> a");
    $(mainTxt).css("color", "#000");
  });

  // firstMenu.mouseover(function () {
  //   let mainTxt = $(this).find("> a");
  //   $(mainTxt).css("color", "#0056aa");
  // });
  // firstMenu.mouseout(function () {
  //   let mainTxt = $(this).find("> a");
  //   $(mainTxt).css("color", "#000");
  // });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      header.addClass("sticky");
    } else {
      header.removeClass("sticky");
    }
  });

  // $('.count-num').each(function() {
  //     var $this = $(this),
  //         countTo = $this.attr('data-count');
  //     $({ countNum: $this.text()}).animate({
  //     countNum: countTo
  //     },
  //     {
  //     duration: 3000,
  //     easing:'linear',
  //     step: function() {
  //         $this.text(Math.floor(this.countNum));
  //     },
  //     complete: function() {
  //         $this.text(this.countNum);
  //     }
  //     });
  // });

  let numAnimation = document.querySelectorAll(".num-amimation");

  function changeNum(index) {
    let num = 0;
    let targetNum = numAnimation[index].getAttribute("data-rate");
    if (targetNum > 500) {
      num = 1000;
    }
    if (targetNum > 40000) {
      num = 41000;
    }
    let timer = setInterval(function () {
      ++num;
      numAnimation[index].innerHTML = num;
      if (num == targetNum) {
        clearInterval(timer);
      }
    }, 10);
  }
  for (let i = 0; i < numAnimation.length; i++) {
    changeNum(i);
  }

  let dropMenuOpen = $(".drop-menu-open");
  let dropMenuList = $(".drop-menu-list");
  dropMenuOpen.click(function () {
    dropMenuList.stop().slideToggle(300);
  });
  dropMenuOpen.click(function () {
    dropMenuOpen.css("border-top", "none");
  });

  // 스크롤바 없애기
  // $("html").css("overflow", "hidden");
  // section 을 지정
  let section = $(".wrap > section");
  // section 이동 속도
  sectionSpeed = 500;
  // section offset().top Y 좌표값(px);
  sectionPos = [];

  sectionIndex = 0;

  sectionTotal = section.length;
  scrollIng = false;

  function resetSection() {
    $.each(section, function (index) {
      let tempY = $(this).offset().top;
      sectionPos[index] = tempY - 80;
    });
  }

  resetSection();

  $(window).resize(function () {
    resetSection();
    $("html").scrollTop(sectionPos[sectionIndex]);
  });

  $(window).bind("mousewheel DOMMouseScroll", function (event) {
    let distance = event.originalEvent.wheelDelta;
    if (distance == null) {
      distance = event.originalEvent.detail * -1;
    }

    if (scrollIng == true) {
      return;
    }

    scrollIng = true;

    if (distance < 0) {
      sectionIndex++;
      if (sectionIndex >= sectionTotal) {
        sectionIndex = sectionTotal - 1;
      }
    } else {
      sectionIndex--;
      if (sectionIndex < 0) {
        sectionIndex = 0;
      }
    }

    $("html")
      .stop()
      .animate(
        {
          scrollTop: sectionPos[sectionIndex],
        },
        sectionSpeed,
        function () {
          scrollIng = false;
        }
      );
  });

  $("html")
    .stop()
    .animate(
      {
        scrollTop: 0,
      },
      sectionSpeed,
      function () {
        scrollIng = false;
      }
    );
};
