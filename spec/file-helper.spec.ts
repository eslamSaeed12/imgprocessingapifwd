import { FileHelper } from '../src/modules/@file-helper/index';
import { join } from 'path';

const fileHelper = new FileHelper(join(process.cwd(), 'images'));

describe('Testing File Helper Suites', () => {
  it('should return a boolean', () => {
    expect(typeof fileHelper.isImgExist('fjord.jpg')).toBe('boolean');
  });

  it('should return a buffer for the image', () => {
    expect(Buffer.isBuffer(fileHelper.getImg('fjord.jpg'))).toBeTruthy();
  });

  it('should throws if image not exist', () => {
    expect(() => fileHelper.getImg('notexist.jpg')).toThrow();
  });
});
