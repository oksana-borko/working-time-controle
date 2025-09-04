import express from "express";
import * as controller from '../controllers/accountingController.js';
import { bodyValidation } from "../validation/bodyValidation.js";
import {
    EmployeeDtoSchema,
    UpdateEmployeeSchema,
    ChangePasswordSchema,
    SetRoleSchema,
    LoginSchema
} from "../validation/joiSchemas.js";

export const accountingRouter = express.Router();

accountingRouter.post('/hire', bodyValidation(EmployeeDtoSchema), controller.hireEmployee);
accountingRouter.delete('/:id', controller.fireEmployee);
accountingRouter.patch('/:id', bodyValidation(UpdateEmployeeSchema), controller.updateEmployee);
accountingRouter.patch('/:id/password', bodyValidation(ChangePasswordSchema), controller.changePassword);
accountingRouter.get('/:id', controller.getEmployeeById);
accountingRouter.get('/', controller.getAllEmployees);
accountingRouter.put('/:id/role', bodyValidation(SetRoleSchema), controller.setRole);
accountingRouter.post('/login', bodyValidation(LoginSchema), controller.login);