const testableCode = {
  original: (input) => {
    if (!!input) {
      return true;
    } else {
      return false;
    }
  },
  fixed: (input) => {
    if (input === true) {
      return true;
    } else {
      return false;
    }
  }
};

describe('code eating', function() {  
  describe('against original code', function() {
    it('no parameters', () => {
      expect(testableCode.original()).toEqual(false);
    });
    it('true', () => {
      expect(testableCode.original(true)).toEqual(true);
    });
    it('false', () => {
      expect(testableCode.original(false)).toEqual(false);
    });

    // This test should fail with the code in its original form.
    it('bug: "ERROR STRING"', () => {
      expect(testableCode.original("ERROR STRING")).toEqual(false);
    });
  });

  describe('against fixed code', function() {
    it('no parameters', () => {
      expect(testableCode.fixed()).toEqual(false);
    });
    it('true', () => {
      expect(testableCode.fixed(true)).toEqual(true);
    });
    it('false', () => {
      expect(testableCode.fixed(false)).toEqual(false);
    });

    it('bug: "ERROR STRING"', () => {
      expect(testableCode.fixed("ERROR STRING")).toEqual(false);
    });
  });
});