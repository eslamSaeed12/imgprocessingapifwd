import sharp, { OutputInfo } from 'sharp';

interface ITransformArgs {
  width: number;
  height: number;
  img: Buffer;
  name: string;
}

export class ImgTransformer {
  constructor(private savePath: string) {}
  transform(input: ITransformArgs): Promise<OutputInfo> {
    return sharp(input.img)
      .resize({ width: input.width, height: input.height })
      .jpeg()
      .toFile(`${this.savePath}/${input.name}-${input.width}-${input.height}.jpg`);
  }
}
