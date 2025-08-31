document.addEventListener("scroll", function () {
  const cards = document.querySelectorAll(".blog-card");
  const triggerBottom = window.innerHeight * 0.85;

  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.classList.add("show");
    }
  });
});
