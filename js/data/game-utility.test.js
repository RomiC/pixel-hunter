import assert from 'assert';
import {countFinalScores, createTimer} from './game-utility.js';
import {FAIL_GAME} from './constants.js';

describe(`game data test`, () => {
  describe(`test function count finally scores`, () => {
    it(`should return -1 when player didn't answer 10 question`, () => {
      assert.equal(countFinalScores([1, 1, 1, 1, 1], 0), FAIL_GAME);
    });

    it(`should return 1150 when player answer 10 question(not fast, not slow), didn't fail`, () => {
      assert.equal(countFinalScores([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 3), 1150);
    });

    it(`should return 1150 when player answer 10 question(2 fast, 2 slow), didn't fail`, () => {
      assert.equal(countFinalScores([1, 1, 1, 1, 2, 1, 2, 1, 3, 3], 3), 1150);
    });

    it(`should return 1100 when player answer 10 question(2 fast, 3 slow), didn't fail`, () => {
      assert.equal(countFinalScores([1, 1, 1, 1, 2, 1, 2, 3, 3, 3], 3), 1100);
    });

    it(`should return 1050 when player answer 10 question(2 fast, 2 slow), 2 fail`, () => {
      assert.equal(countFinalScores([1, 1, 1, 1, 2, 1, 2, 1, 3, 3], 1), 1050);
    });
  });


  describe(`test function create timer`, () => {


    it(`define time in timer`, () => {
      const newTimer = createTimer(3);
      assert.equal(newTimer.time, 3);
    });

    it(`don't create time less 0`, () => {
      const newTimer = createTimer(-5);
      assert.equal(newTimer.time, 0);
    });

    it(`timer can tick`, () => {
      const newTimer = createTimer(3);
      assert.equal(newTimer.tick().time, 2);
    });

    it(`timer message`, () => {
      let timer = createTimer(3);
      timer = timer.tick();
      timer = timer.tick();
      timer = timer.tick();
      assert.equal(timer.msg, `Timer stopped`);
    });

    it(`timer can't less 0`, () => {
      let timer = createTimer(3);
      timer = timer.tick();
      timer = timer.tick();
      timer = timer.tick();
      timer = timer.tick();
      timer = timer.tick();
      assert.equal(timer.time, 0);
    });


  });

});
