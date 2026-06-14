"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (fn) => {
    return (req, res) => {
        fn(req, res).catch((error) => {
            return res.status(500).json({
                message: "Internal Error",
                errorMessage: error.message
            });
        });
    };
};
exports.default = errorHandler;
//# sourceMappingURL=catchAsyncError.js.map