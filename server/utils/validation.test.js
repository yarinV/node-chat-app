const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {

  it('should reject non-string values', function(){
    expect(isRealString(1)).toBe(false)
  });

  it('should reject string with only spaces', function(){
    expect(isRealString('     ')).toBe(false)
  });

  it('should allow string with non-space charcters', function(){
    var text = "sup";
    expect(isRealString(text)).toBe(true);
  });

});
