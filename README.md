
  

# Image Processing API

is a web service for image processing.

  

### Table of contents

  

- Install

- Lint

- Build

- Test

- Run

- Health Check

  

### Install

npm install

### Linting

  

-  `npm run format`

-  `npm run lint`

  

### Test

npm test

  

### Build

npm run build

### Run

- development mode

-  `npm run dev `

- production mode

-  `npm run start`

  

### Documention

  

- check api health
	- GET `http://localhost:4000/api/health`
- get place holder image
	- GET `http://localhost:4000/api/images`
	- Required Query Strings :
		- filename -> string
		- width -> number
		- height -> number

  

an example for getting an image with a 200 * 200

  

GET `http://localhost:4000/api/images?filename=fjord.jpg&width=200&height=200`