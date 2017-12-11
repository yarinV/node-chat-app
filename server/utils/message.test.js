const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = "yarin";
    var text = "where u at";
    var message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('Should generate correct location object', function(){
    var from = "yarin";
    var latitude = 1;
    var longitude = 1;
    var message = generateLocationMessage(from, latitude, longitude);
    expect(message.from).toBe(from);
    expect(message.url).toBe('https://www.google.co.il/maps?q=1,1')
    expect(message.createdAt).toBeA('number');
  });

});
