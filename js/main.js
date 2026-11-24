const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.style.display = match ? "flex" : "none";
    });
  });
});