import mongoose from "mongoose";
import { Role } from "../utils/types.js";
const employeeSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passHash: { type: String, required: true },
    roles: { type: [String], enum: Object.values(Role), required: true },
    hireDate: { type: String, required: true }
});
const firedEmployeeSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roles: { type: [String], enum: Object.values(Role), required: true },
    hireDate: { type: String, required: true },
    fireDate: { type: String, required: true }
});
export const EmployeeModel = mongoose.model('Employee', employeeSchema, 'employees_collection');
export const FiredEmployeeModel = mongoose.model('FiredEmployee', firedEmployeeSchema, 'fired_employees_collection');
//# sourceMappingURL=EmployeeMongooseModel.js.map