"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = void 0;
function welcome(req, res) {
    return res.json({ message: 'Welcome' });
}
exports.welcome = welcome;
