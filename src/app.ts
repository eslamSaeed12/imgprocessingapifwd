import type { Request, Response, NextFunction } from 'express'
import express from 'express'
import { FileHelper } from './modules/@file-helper'
import { ImgTransformer } from './modules/@img-transformer'
import { join } from 'path'

const imgHelper = new FileHelper(join(process.cwd(), 'images'))

const imgTransformer = new ImgTransformer()

const app = express()

// just to check application is running
app.get('/', (req, res) => {
  res.send('Img Processing Api FWD Udacity Project 1')
})

// getting an image with required dimensions
app.get(
  '/api/images',
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { filename, width, height } = req.query

      if (!filename) {
        return res.status(400).send('Filename is required')
      }

      if (!width || !height) {
        return res.status(400).send('Width and Height is A required !')
      }

      if (!imgHelper.isImgExist(<string>filename)) {
        return res.status(404).send('Image is Not Found !')
      }

      const img = imgHelper.getImg(<string>filename)

      const output = await imgTransformer.transform({
        img,
        width: parseInt(<string>width),
        height: parseInt(<string>height),
      })


      // cahing the image for 24 hours
      res.setHeader('Cache-Control', 'public, max-age=86400000');
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(output)
    } catch (err) {
      next(err)
    }
  }
)

// error handler middleware for showing error message
app.use((err: Error, req: Request, res: Response) => {
  res.status(500).send(err.message)
})

export { app }
