document.addEventListener("DOMContentLoaded", () => {
  // Выбираем все ссылки и кнопки навигации
  const navLinks = Array.from(document.querySelectorAll(".navbar-nav .nav-link, .nav-button"));
  let currentIndex = 0;

  // Ставим фокус на первый элемент
  navLinks[currentIndex].classList.add("active");
  navLinks[currentIndex].focus();

  document.addEventListener("keydown", (e) => {
    const key = e.key;

    // Вперед (Right / Down)
    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      navLinks[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % navLinks.length;
      navLinks[currentIndex].classList.add("active");
      navLinks[currentIndex].focus();
    }

    // Назад (Left / Up)
    else if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      navLinks[currentIndex].classList.remove("active");
      currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
      navLinks[currentIndex].classList.add("active");
      navLinks[currentIndex].focus();
    }

    // Enter — открываем ссылку или кликаем по кнопке
    else if (key === "Enter") {
      e.preventDefault();
      const element = navLinks[currentIndex];
      if (element.tagName === "A") {
        const href = element.getAttribute("href");
        if (href) window.location.href = href;
      } else if (element.tagName === "BUTTON") {
        element.click();
      }
    }
  });
});
