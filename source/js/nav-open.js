    var navMain = document.querySelector(".page-header__nav");
    var navToggle = document.querySelector(".page-header__nav-toggles");
    var navList = document.querySelector(".page-header__nav-list");

    navMain.classList.add('page__header-nav--close');

    navToggle.addEventListener("click", function(evt) {
      evt.preventDefault();
      if (navMain.classList.contains("page__header-nav--close")) {
        navMain.classList.remove("page__header-nav--close");
        navToggle.classList.remove("page-header__nav-toggle");
        navMain.classList.add("page-header__nav--active");
        /*navList.classList.add("page-header__nav--active");*/
        navToggle.classList.add("page-header__nav-toggle--close");
      } else {
        navMain.classList.remove("page-header__nav--active");
        /*navList.classList.remove("page-header__nav--active");*/
        navToggle.classList.remove("page-header__nav-toggle--close");
        navToggle.classList.add("page-header__nav-toggle");
        navMain.classList.add("page__header-nav--close");
      }
    });
