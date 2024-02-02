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
class TutorialController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(201).json({
                    message: 'create OK',
                    reqBody: req.body,
                });
            }
            catch (err) {
                res.status(500).json({
                    message: 'Internal Server Error!'
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    message: 'findAll OK',
                });
            }
            catch (err) {
                res.status(500).json({
                    message: 'Internal Server Error!'
                });
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    message: 'findOne OK',
                    reqParamId: req.params.id
                });
            }
            catch (err) {
                res.status(500).json({
                    message: 'Internal Server Error!'
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    message: 'update OK',
                    reqParamId: req.params.id,
                    reqBody: req.body
                });
            }
            catch (err) {
                res.status(500).json({
                    message: 'Internal Server Error!'
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    message: 'delete OK',
                    reqParamId: req.params.id
                });
            }
            catch (err) {
                res.status(500).json({
                    message: 'Internal Server Error!'
                });
            }
        });
    }
}
exports.default = TutorialController;
