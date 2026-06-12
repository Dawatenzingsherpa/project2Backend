"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = __importDefault(require("../Controllers/postController"));
const multerConfig_1 = __importDefault(require("../Middleware/multerConfig"));
const router = express_1.default.Router();
router.route("/post")
    .post(multerConfig_1.default.single('image'), postController_1.default.createPost);
exports.default = router;
//# sourceMappingURL=postRoute.js.map