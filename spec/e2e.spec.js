"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
const uri = 'http://localhost:4000';
// setting up supertest with a server url
const request = (0, supertest_1.default)(uri);
// defining an http server to run the app
let server = null;
beforeAll(() => {
    // assigning an http server and run it before all tests
    server = app_1.app.listen(4000);
});
describe('End Points Test Suites', () => {
    it('should return 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('should return 200 status code with an image', () => {
        return request
            .get('/api/images?filename=fjord.jpg&width=200&height=200')
            .expect(200)
            .expect('Content-Type', /image\/jpeg/);
    });
    it('should return 404 status code with an image', () => {
        return request
            .get('/api/images?filename=notexist.jpg&width=200&height=200')
            .expect(404);
    });
    it('should return 400 when no filename', () => {
        return request.get('/api/images').expect(400);
    });
    it('should return 400 when no width or height', () => {
        return request.get('/api/images?filename=fjord.jpg').expect(400);
    });
});
afterAll(() => {
    server === null || server === void 0 ? void 0 : server.close();
});
