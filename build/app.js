"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
require("./Model/index.ts");
app.get("/", (req, res) => {
    res.send("hello world");
});
app.get("/about", (req, res) => {
    res.send("about page");
});
app.get("/contact", (req, res) => {
    res.send("contact page");
});
app.listen(PORT, () => {
    console.log("Server has started at port", PORT);
});
//# sourceMappingURL=app.js.map