"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    host: "localhost",
    user: 'root',
    password: '',
    db: 'project2Database',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 1000
    }
};
exports.default = dbConfig;
//# sourceMappingURL=dbConfig.js.map