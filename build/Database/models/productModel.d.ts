import { Model } from 'sequelize-typescript';
declare class Product extends Model {
    id: string;
    productName: string;
    description: string;
    productPrice: number;
    productTotalStockQty: number;
    imageUrl: string;
}
export default Product;
//# sourceMappingURL=productModel.d.ts.map