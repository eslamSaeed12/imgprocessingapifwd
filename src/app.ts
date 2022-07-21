import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import { FileHelper } from './modules/@file-helper';
import { ImgTransformer } from './modules/@img-transformer';
import { join } from 'path';

const assetsPath = join(process.cwd(), 'images');

const imgHelper = new FileHelper(assetsPath);

const imgTransformer = new ImgTransformer(assetsPath);

const app = express();

// end point to check api helath status
app.get('/api/health', (req: Request, res: Response) => {
  res.send('Img Processing Api FWD Udacity Project 1');
});

// getting an image with required dimensions
app.get('/api/images', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { filename, width, height } = req.query;

    if (!filename) {
      return res.status(400).send('Filename is required');
    }

    if (!width || !height) {
      return res.status(400).send('Width and Height is A required !');
    }

    if (!imgHelper.isImgExist(<string>filename)) {
      return res.status(404).send('Image is Not Found !');
    }

    // const file without extension
    const imgWithoutExt = (filename as string).split('.')[0];

    // check if image already exist with required dimensions

    if (imgHelper.isImgExist(`${imgWithoutExt}-${width}-${height}.jpg`)) {
      res.setHeader('Content-Type', 'image/jpeg');
      return res.sendFile(`${imgWithoutExt}-${width}-${height}.jpg`, { root: assetsPath });
    }

    const img = imgHelper.getImg(<string>filename);

    await imgTransformer.transform({
      img,
      width: parseInt(<string>width),
      height: parseInt(<string>height),
      name: imgWithoutExt,
    });

    // cahing the image for 24 hours
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(`${imgWithoutExt}-${width}-${height}.jpg`, { root: assetsPath });
  } catch (err) {
    next(err);
  }
});

// error handler middleware for showing error message
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response) => {
  res.status(500).send(err.message);
});

export { app };
