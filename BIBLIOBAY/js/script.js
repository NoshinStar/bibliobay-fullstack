document.addEventListener("DOMContentLoaded", () => {
  // ===== SEARCH FORM TOGGLE =====
  const searchForm = document.querySelector(".search-form");
  const searchBtn = document.querySelector("#search-btn");
  if (searchBtn && searchForm) {
    searchBtn.onclick = () => searchForm.classList.toggle("active");
  }

  // ===== PASSWORD SHOW/HIDE =====
  window.displayPassword = () => {
    const password = document.getElementById("password");
    const displayPass = document.getElementById("display-pass");
    const hidenPass = document.getElementById("hiden-pass");

    if (!password) return;

    if (password.type === "password") {
      password.type = "text";
      if (displayPass) displayPass.style.display = "block";
      if (hidenPass) hidenPass.style.display = "none";
    } else {
      password.type = "password";
      if (displayPass) displayPass.style.display = "none";
      if (hidenPass) hidenPass.style.display = "block";
    }
  };

  window.displayPasswordConfirm = () => {
    const passConfirm = document.getElementById("passwordConfirm");
    const displayPassConfirm = document.getElementById("display-passConfirm");
    const hidenPassConfirm = document.getElementById("hiden-passConfirm");

    if (!passConfirm) return;

    if (passConfirm.type === "password") {
      passConfirm.type = "text";
      if (displayPassConfirm) displayPassConfirm.style.display = "block";
      if (hidenPassConfirm) hidenPassConfirm.style.display = "none";
    } else {
      passConfirm.type = "password";
      if (displayPassConfirm) displayPassConfirm.style.display = "none";
      if (hidenPassConfirm) hidenPassConfirm.style.display = "block";
    }
  };

  // ===== NAVIGATION SCROLL HIGHLIGHT =====
  const navLinks = document.querySelectorAll("header .navbar a");
  const sections = document.querySelectorAll("section");

  window.onscroll = () => {
    if (searchForm) searchForm.classList.remove("active");

    const scrollY = window.scrollY;

    sections.forEach((sec) => {
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollY >= offset && scrollY < offset + height) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(`header .navbar a[href*=${id}]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });

    const header2 = document.querySelector(".header .header-2");
    if (header2) {
      if (scrollY > 80) header2.classList.add("active");
      else header2.classList.remove("active");
    }
  };

  // ===== LOADER (FIXED) =====
  const loader = () => {
    const loaderContainer = document.querySelector(".loader-container");
    if (loaderContainer) {
        loaderContainer.classList.add("active"); // Adds class to hide it
    }
  };

  // IMMEDIATE HIDE (To stop the annoying loop during development)
  loader();
  
  // If you want the delay back later, uncomment these:
  // const fadeOut = () => setTimeout(loader, 4000);
  // fadeOut();

  // ===== NOTE: =====
  // "Load More" logic and "Swiper" logic have been removed from here.
  // They are now handled correctly in 'blogs-loader.js' and 'books-loader.js'
  // to wait for the API data before running.
});