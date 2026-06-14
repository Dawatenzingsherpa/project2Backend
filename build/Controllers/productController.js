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
const productModel_1 = __importDefault(require("../Database/models/productModel"));
class ProductController {
    static addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filename;
            const { productName, productPrice, description, productTotalStockQty } = req.body;
            if (req.file) {
                filename = req.file.filename;
            }
            else {
                res.status(400).json({
                    message: "file is missing"
                });
            }
            if (!description || !productName || !productPrice || !productTotalStockQty) {
                res.status(400).json({
                    message: "please provide productName,productPrice,productDescription,productTotalStockQty "
                });
                return;
            }
            yield productModel_1.default.create({
                productName,
                productPrice,
                description,
                productTotalStockQty,
                imageUrl: filename
            });
            res.status(201).json({
                message: "Product created successfully"
            });
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=productController.js.map