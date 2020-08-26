    var navMain = document.querySelector(".page-nav");
    var navToggle = document.querySelector(".page-nav__toggle");
    var navList = document.querySelector(".page-nav__list");

    navMain.classList.remove('page-nav--js');

    navToggle.addEventListener("click", function() {
      if (navMain.classList.contains("page-nav--js")) {
        navMain.classList.remove("page-nav--close");
        navMain.classList.add("page-nav--active");
        navList.classList.add("page-nav__list--active");
      } else {
        navMain.classList.remove("page-nav--active");
        navList.classList.remove("page-nav__list--active");
        navMain.classList.add("page-nav--close");
      }
    });
