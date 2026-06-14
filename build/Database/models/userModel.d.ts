import { Model } from 'sequelize-typescript';
declare class User extends Model {
    id: string;
    role: string;
    username: string;
    email: string;
    password: string;
}
export default User;
//# sourceMappingURL=userModel.d.ts.map