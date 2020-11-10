    var navMain = document.querySelector(".page-header__nav");
    var navToggle = document.querySelector(".page-header__nav-toggle");
    var navList = document.querySelector(".page-nav__list");

    navMain.classList.remove('page-header__nav--none');

    navToggle.addEventListener("click", function(evt) {
      evt.preventDefault();
      if (navMain.classList.contains("page-header__nav--close")) {
        navMain.classList.remove("page-header__nav--close");
        navMain.classList.add("page-nav--active");
        navList.classList.add("page-header__nav-list-item--active");
      } else {
        navMain.classList.remove("page-nav--active");
        navList.classList.remove("page-header__nav-list-item--active");
        navMain.classList.add("page-header__nav--close");
      }
    });
