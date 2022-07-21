import fs from 'fs'

export class FileHelper {
  constructor(private assetsPath: string) {}

  isImgExist(filename: string): boolean {
    return fs.existsSync(`${this.assetsPath}/${filename}`)
  }

  getImg(filename: string): Buffer {
    return fs.readFileSync(`${this.assetsPath}/${filename}`)
  }
}
