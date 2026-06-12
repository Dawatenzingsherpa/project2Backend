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
const postModel_1 = __importDefault(require("../Database/models/postModel"));
class PostController {
    static createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.file);
            let filename;
            const { title, description } = req.body;
            if (req.file) {
                filename = req.file.filename;
            }
            else {
                res.status(400).json({
                    message: "file is missing"
                });
            }
            if (!title || !description) {
                res.status(400).json({
                    message: "please provide title and description"
                });
                return;
            }
            yield postModel_1.default.create({
                title,
                description,
                imageUrl: filename
            });
            res.status(201).json({
                message: "Post created successfully"
            });
        });
    }
}
exports.default = PostController;
//# sourceMappingURL=postController.js.map