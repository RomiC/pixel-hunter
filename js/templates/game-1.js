import getElementFromTemplate from '../create-DOM.js';
import {userStat} from './user-stat.js';
import nextLevel from '../data/next-level.js';
import {resize} from '../data/game-utility.js';

const game1Template = (data) => {
  return `
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${data.options.map((option, i) => `<div class="game__option">
        <img src="${option.question}" alt="Option ${i + 1}" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`).join(``)}
    </form>
  </div>`;
};

const checkQuestion = (options, a1, a2) => {
  return options[0].answer === a1 && options[1].answer === a2;
};

const element = (level, userDataGame) => {
  let el = getElementFromTemplate(game1Template(level));
  el.querySelector(`.game`).appendChild(userStat(userDataGame.stats));

  const images = Array.prototype.slice.call(el.querySelectorAll(`img`));
  images.forEach((img) => {
    const imgSize = {
      width: img.naturalWidth,
      height: img.naturalHeight
    };
    const frame = img.parentElement;
    const frameSize = {
      width: frame.offsetWidth,
      height: frame.offsetHeight
    };
    const resizePicture = resize(frameSize, imgSize);
    img.width = resizePicture.width;
    img.height = resizePicture.height;
  });

  const radioBtns = Array.prototype.slice.call(el.querySelectorAll(`input[type=radio]`));

  let q1 = false;
  let q2 = false;
  radioBtns.forEach((radioBtn) => {
    radioBtn.addEventListener(`change`, (ev) => {
      if (ev.target.name === `question1`) {
        q1 = ev.target.value;
      } else {
        q2 = ev.target.value;
      }

      if (q1 && q2) {
        const isCorrectAnswer = checkQuestion(level.options, q1, q2);
        nextLevel(userDataGame, isCorrectAnswer);
      }
    });
  });

  return el;
};

export default element;
