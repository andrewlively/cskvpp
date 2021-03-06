import { GOOD_COMMA_TAG_LIST, GOOD_PIPE_TAG_LIST, PARSED_GOOD_TAG_LIST, BAD_TAG_LIST_KEY_PAIR1, BAD_TAG_LIST_KEY_PAIR2 } from './constants.js'
import cskvpp from '../cskvpp.js'

describe('base tests', function() {
  it('should parse comma separated key value pair to an object', function () {
    const parsed = cskvpp.parse(GOOD_COMMA_TAG_LIST);

    expect(parsed).toMatchObject(PARSED_GOOD_TAG_LIST);
  });

  it('should parse pipe separated key value pair to an object with options override', function () {
    const parsed = cskvpp.parse(GOOD_PIPE_TAG_LIST, { separator: '|' });

    expect(parsed).toMatchObject(PARSED_GOOD_TAG_LIST);
  });
  
  it('should not allow broken key value pairs', function () {
    expect(function() {
      cskvpp.parse(BAD_TAG_LIST_KEY_PAIR1);
    }).toThrowError('Invalid tag list provided');
  });
  
  it('should not allow empty key value pairs in string', function () {
    expect(function() {
      cskvpp.parse(BAD_TAG_LIST_KEY_PAIR2);
    }).toThrowError('Invalid tag list provided');
  });

  it('should return empty object when provided empty string', function() {
    const parsed = cskvpp.parse('');

    expect(parsed).toMatchObject({});
  });
});

describe('allowed data types', function() {
  it('should not allow number input', function() {
    expect(function() {
      cskvpp.parse(123);
    }).toThrowError('Input should only be a string');
  });

  it('should not allow array input', function() {
    expect(function() {
      cskvpp.parse([]);
    }).toThrowError('Input should only be a string');
  });

  it('should not allow function input', function() {
    expect(function() {
      cskvpp.parse(function() {});
    }).toThrowError('Input should only be a string');
  });

  it('should not allow object input', function() {
    expect(function() {
      cskvpp.parse({});
    }).toThrowError('Input should only be a string');
  });
});
