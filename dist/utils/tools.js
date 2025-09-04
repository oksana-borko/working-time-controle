import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { configuration } from "../config/appConfig.js";
import { Role } from "./types.js";
export const convertEmployeeDtoToEmployee = (dto) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(dto.password, salt);
    return {
        _id: dto.id,
        firstName: dto.firstName,
        lastName: dto.lastName,
        passHash: hash,
        roles: [Role.CREW],
        hireDate: new Date().toISOString().split('T')[0]
    };
};
export const getJWT = (userId, roles) => {
    const payload = { roles: JSON.stringify(roles) };
    const secret = configuration.jwt.secret;
    const options = {
        expiresIn: configuration.jwt.exp,
        subject: userId.toString()
    };
    return jwt.sign(payload, secret, options);
};
//# sourceMappingURL=tools.js.map