const RIGHT_ANSWER = 1;
const FAST_ANSWER = 2;
const SLOW_ANSWER = 3;
const WRONG_ANSWER = 0;

const RIGHT_ANSWER_SCORE = 100;
const FAST_ANSWER_SCORE = 50;
const SLOW_ANSWER_SCORE = -50;
const LIVE_SCORE = 50;

const amountAnswers = 10;

const countFinalScores = (answers, lives) => {
  if (answers.length < amountAnswers) {
    return -1;
  } else {
    let finallyScores = answers.reduce((sum, answer) => {
      switch (answer) {
        case RIGHT_ANSWER:
          return sum + RIGHT_ANSWER_SCORE;
        case FAST_ANSWER:
          return sum + RIGHT_ANSWER_SCORE + FAST_ANSWER_SCORE;
        case SLOW_ANSWER:
          return sum + RIGHT_ANSWER_SCORE + SLOW_ANSWER_SCORE;
      }

      return sum;
    }, 0);
    return finallyScores + lives * LIVE_SCORE;
  }
};

const createTimer = (timeInSecond, msg = ``) => {
  const timer = {
    time: timeInSecond > 0 ? timeInSecond : 0,
    tick() {
      const value = timer.time - 1;
      const msgTick = (value === 0) ? `Timer stopped` : ``;
      return createTimer(value > 0 ? value : 0, msgTick);
    },
    msg
  };
  return timer;
};

const copyOnWrite = (object) => {
  let newObj = Object.assign({}, object);
  for (const key in newObj) {
    if (newObj[key] instanceof Array) {
      newObj[key] = newObj[key].slice();
    }
  }
  return newObj;
};

export {countFinalScores, createTimer, copyOnWrite,
  RIGHT_ANSWER, FAST_ANSWER, SLOW_ANSWER, WRONG_ANSWER,
  RIGHT_ANSWER_SCORE, FAST_ANSWER_SCORE, SLOW_ANSWER_SCORE,
  LIVE_SCORE};
