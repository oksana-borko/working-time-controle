import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { configuration } from "../config/appConfig.js";
import { Employee, EmployeeDto } from "../models/Employee.js";
import { Role } from "./types.js";
import { HttpError } from "../errorHandler/HttpError.js";

export const convertEmployeeDtoToEmployee = (dto: EmployeeDto): Employee => {
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

export const getJWT = (userId: string, roles: Role[]) => {
    const payload = { roles: JSON.stringify(roles) };
    const secret = configuration.jwt.secret;
    const options = {
        expiresIn: configuration.jwt.exp as any,
        subject: userId.toString()
    };
    return jwt.sign(payload, secret, options);
};