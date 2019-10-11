const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);

global.jQuery = global.$ = require('jquery')(window);
global.window = window;
global.document = window.window;

const testableCode1 = {
  test: function() {
    return testableCode1.runTest();
  },
  runTest: function() {
    var elements = $('.elements');
    return elements.length;
  }
};

const testableCode2 = {
  test: function() {
    var elements = $('.elements');
    return testableCode2.runTest(elements);
  },
  runTest: function(items) {
    return items.length;
  }
};

describe('pre-refactor', function() {
  it('test before refactor', function() {
    var itemToReturn = $('<div></div>');
    spyOn(global, '$').and.callFake(function(item) {
      if (item === '.elements') {
        return itemToReturn;
      }
    });

    var result = testableCode1.test();

    expect(result).toEqual(1);
  });
});

describe('post-refactor', function() {
  it('test before refactor', function() {
    var itemToReturn = $('<div></div>');
    spyOn(global, '$').and.callFake(function(item) {
      if (item === '.elements') {
        return itemToReturn;
      }
    });

    var result = testableCode2.test();

    expect(result).toEqual(1);
  });
  it('test after refactor', function() {
    var itemToReturn = $('<div></div>');
    var result = testableCode2.runTest(itemToReturn);
    expect(result).toEqual(1);    
  });  
});