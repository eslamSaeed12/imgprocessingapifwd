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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/modules/@img-transformer/index");
const _file_helper_1 = require("../src/modules/@file-helper");
const path_1 = require("path");
const imgHelper = new _file_helper_1.FileHelper((0, path_1.join)(process.cwd(), 'images'));
const imgTransformer = new index_1.ImgTransformer();
describe('Testing Image Transformer Module', () => {
    it('should return a buffer', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Buffer.isBuffer(yield imgTransformer.transform({
            img: imgHelper.getImg('fjord.jpg'),
            height: 200,
            width: 200,
        }))).toBeTruthy();
    }));
    it('should throws if image not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield imgTransformer.transform({
                img: imgHelper.getImg('notexist.jpg'),
                height: 200,
                width: 200,
            });
        }
        catch (err) {
            expect(err).toBeTruthy();
        }
    }));
});
