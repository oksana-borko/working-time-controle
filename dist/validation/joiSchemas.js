import Joi from 'joi';
import { Role } from "../utils/types.js";
export const EmployeeDtoSchema = Joi.object({
    id: Joi.string().min(1).required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    password: Joi.string().alphanum().min(8).required()
});
export const UpdateEmployeeSchema = Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required()
});
export const ChangePasswordSchema = Joi.object({
    newPassword: Joi.string().alphanum().min(8).required()
});
export const SetRoleSchema = Joi.object({
    newRole: Joi.string().valid(...Object.values(Role)).required()
});
export const LoginSchema = Joi.object({
    userId: Joi.string().min(1).required(),
    password: Joi.string().alphanum().min(8).required()
});
//# sourceMappingURL=joiSchemas.js.map