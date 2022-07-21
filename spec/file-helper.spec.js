"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/modules/@file-helper/index");
const path_1 = require("path");
const fileHelper = new index_1.FileHelper((0, path_1.join)(process.cwd(), 'images'));
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
