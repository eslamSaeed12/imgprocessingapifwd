import { ImgTransformer } from '../src/modules/@img-transformer/index';
import { FileHelper } from '../src/modules/@file-helper';
import { join } from 'path';

const imgHelper = new FileHelper(join(process.cwd(), 'images'));
const imgTransformer = new ImgTransformer(join(process.cwd(), 'images'));

describe('Testing Image Transformer Module', () => {
  it('should return a file', async () => {
    expect(
      'width' in
        (await imgTransformer.transform({
          img: imgHelper.getImg('fjord.jpg'),
          height: 200,
          width: 200,
          name: 'fjord',
        })),
    ).toBeTruthy();
  });

  it('should throws if image not exist', async () => {
    try {
      await imgTransformer.transform({
        img: imgHelper.getImg('notexist.jpg'),
        height: 200,
        width: 200,
        name: 'notexist',
      });
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});
