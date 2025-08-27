const board = document.querySelector('.game-board');

// Эмодзи для пар
const emojis = ["🍎","🍌","🍒","🍇","🍉","🍍","🥝","🍓"];
let cards = [...emojis, ...emojis]; // Дублируем пары

// Перемешиваем массив
cards.sort(() => 0.5 - Math.random());

// Рендерим карточки
cards.forEach((emoji) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerText = "?"; // изначально скрыта
  card.dataset.emoji = emoji;
  board.appendChild(card);
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Обработка кликов
board.addEventListener('click', (e) => {
  const clicked = e.target;
  if (!clicked.classList.contains('card') || lockBoard) return;

  if (clicked === firstCard) return;

  clicked.classList.add('flipped');
  clicked.innerText = clicked.dataset.emoji;

  if (!firstCard) {
    firstCard = clicked;
  } else {
    secondCard = clicked;
    lockBoard = true;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerText = "?";
        secondCard.innerText = "?";
        firstCard = null;
        secondCard = null;
        lockBoard = false;
      }, 1000);
    }
  }
});
