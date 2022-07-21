import sharp from 'sharp'

interface ITransformArgs {
  width: number
  height: number
  img: Buffer
}

export class ImgTransformer {
  transform(input: ITransformArgs): Promise<Buffer> {
    return sharp(input.img)
      .resize({ width: input.width, height: input.height })
      .jpeg()
      .toBuffer()
  }
}
