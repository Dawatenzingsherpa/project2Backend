import { NextFunction, Request, Response } from "express";
interface AuthRequest extends Request {
    user?: {
        username: string;
        email: string;
        role: string;
        password: string;
        id: string;
    };
}
export declare enum Role {
    Admin = "admin",
    Customer = "customer"
}
declare class AuthMiddleware {
    isAuthenticated(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    restrictTo(...roles: Role[]): (req: AuthRequest, res: Response, next: NextFunction) => void;
}
declare const _default: AuthMiddleware;
export default _default;
//# sourceMappingURL=authMiddleware.d.ts.map