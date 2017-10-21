import assert from 'assert';
import {countFinalScores, createTimer, resize} from './game-utility.js';
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


const createTestForFrame = (frame) => {
  const assertRatio = (given, expected) => {
    const actual = resize(frame, given);
    assert.deepEqual(actual, expected);
  };

  const createTest = (expected, multiplier) => {
    const given = {
      width: Math.floor(expected.width * multiplier),
      height: Math.floor(expected.height * multiplier)
    };
    it(`shrink ${multiplier}x: ${given.width}x${given.height} => ${expected.width}x${expected.height}`, () => {
      assertRatio(given, expected);
    });
  };

  const sequence = (expected) => {
    createTest(expected, 8);
    createTest(expected, 7);
    createTest(expected, 5);
    createTest(expected, 4);
    createTest(expected, 3);
    createTest(expected, 2);
    createTest(expected, 1);
  };

  describe(`Resize into frame: ${frame.width}x${frame.height}`, () => {

    describe(`when "width === height"`, () => {
      sequence({width: frame.width, height: frame.height});
    });

    describe(`when "width > height"`, () => {
      sequence({width: frame.width, height: Math.floor(frame.height / 2)});
    });

    describe(`when "width < height"`, () => {
      sequence({width: Math.floor(frame.width / 2), height: frame.height});
    });

  });
};

createTestForFrame({width: 256, height: 256});
createTestForFrame({width: 256, height: 128});

createTestForFrame({width: 468, height: 458});
createTestForFrame({width: 705, height: 455});
createTestForFrame({width: 304, height: 455});
