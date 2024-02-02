"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tutorial_controller_1 = __importDefault(require("../controllers/tutorial.controller"));
class TutorialRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new tutorial_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // create
        this.router.post('/', this.controller.create);
        // read
        this.router.get('/', this.controller.findAll);
        this.router.get('/:id', this.controller.findOne);
        // update
        this.router.get('/:id', this.controller.update);
        // delete
        this.router.delete('/:id', this.controller.delete);
    }
}
exports.default = new TutorialRoutes().router;
