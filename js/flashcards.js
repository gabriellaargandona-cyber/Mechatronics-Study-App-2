let index = 0;
fetch("data/flashcards.json")
  .then(res => res.json())
  .then(cards => {
    const container = document.getElementById("flashcard-container");
    const showCard = () => {
      container.innerHTML = `<div class="card"><strong>${cards[index].front}</strong></div>`;
      container.onclick = () => {
        container.innerHTML = `<div class="card">${cards[index].back}</div>`;
      };
    };
    document.getElementById("next-card").onclick = () => {
      index = (index + 1) % cards.length;
      showCard();
    };
    showCard();
  });
