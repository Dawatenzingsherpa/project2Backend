"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const allowedFiles = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!allowedFiles.includes(file.mimetype)) {
            cb(new Error("this file is not allowed"), "");
            return;
        }
        cb(null, node_path_1.default.join(process.cwd(), "src/storage"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: exports.storage });
exports.default = upload;
//# sourceMappingURL=multerConfig.js.map