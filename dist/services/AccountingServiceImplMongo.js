import { EmployeeModel, FiredEmployeeModel } from "../models/EmployeeMongooseModel.js";
import { HttpError } from "../errorHandler/HttpError.js";
import bcrypt from "bcryptjs";
import { Role } from "../utils/types.js";
import { getJWT } from "../utils/tools.js";
export class AccountingServiceImplMongo {
    async hireEmployee(employee) {
        const existingEmployee = await EmployeeModel.findById(employee._id);
        if (existingEmployee) {
            throw new HttpError(409, "Employee already exists");
        }
        // Check if employee was previously hired
        const firedEmployee = await FiredEmployeeModel.findById(employee._id);
        if (firedEmployee) {
            console.log(`Rehiring previously fired employee: ${employee._id}`);
        }
        const employeeDoc = new EmployeeModel(employee);
        await employeeDoc.save();
        return employee;
    }
    async fireEmployee(empId) {
        const employee = await EmployeeModel.findById(empId);
        if (!employee) {
            throw new HttpError(404, "Employee not found");
        }
        const savedFiredEmployee = {
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            roles: employee.roles, // Приведение типа
            hireDate: employee.hireDate,
            fireDate: new Date().toISOString().split('T')[0]
        };
        const firedDoc = new FiredEmployeeModel(savedFiredEmployee);
        await firedDoc.save();
        await EmployeeModel.findByIdAndDelete(empId);
        return savedFiredEmployee;
    }
    async updateEmployee(empId, employeeDto) {
        const employee = await EmployeeModel.findById(empId);
        if (!employee) {
            throw new HttpError(404, "Employee not found");
        }
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(empId, {
            firstName: employeeDto.firstName,
            lastName: employeeDto.lastName
        }, { new: true });
        if (!updatedEmployee) {
            throw new HttpError(404, "Employee not found");
        }
        return {
            _id: updatedEmployee._id,
            firstName: updatedEmployee.firstName,
            lastName: updatedEmployee.lastName,
            passHash: updatedEmployee.passHash,
            roles: updatedEmployee.roles,
            hireDate: updatedEmployee.hireDate
        };
    }
    async changePassword(empId, newPassword) {
        const employee = await EmployeeModel.findById(empId);
        if (!employee) {
            throw new HttpError(404, "Employee not found");
        }
        const newHash = bcrypt.hashSync(newPassword, 10);
        await EmployeeModel.findByIdAndUpdate(empId, { passHash: newHash });
    }
    async getEmployeeById(id) {
        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            throw new HttpError(404, "Employee not found");
        }
        return {
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            passHash: employee.passHash,
            roles: employee.roles,
            hireDate: employee.hireDate
        };
    }
    async getAllEmployees() {
        const employees = await EmployeeModel.find({});
        return employees.map(emp => ({
            _id: emp._id,
            firstName: emp.firstName,
            lastName: emp.lastName,
            roles: emp.roles,
            hireDate: emp.hireDate,
            fireDate: "" // Current employees don't have fire date
        }));
    }
    async setRole(id, newRole) {
        if (!Object.values(Role).includes(newRole)) {
            throw new HttpError(400, "Invalid role");
        }
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, { roles: [newRole] }, { new: true });
        if (!updatedEmployee) {
            throw new HttpError(404, "Employee not found");
        }
        return {
            _id: updatedEmployee._id,
            firstName: updatedEmployee.firstName,
            lastName: updatedEmployee.lastName,
            passHash: updatedEmployee.passHash,
            roles: updatedEmployee.roles,
            hireDate: updatedEmployee.hireDate
        };
    }
    async login(credentials) {
        const employee = await EmployeeModel.findById(credentials.userId);
        if (!employee || !bcrypt.compareSync(credentials.password, employee.passHash)) {
            throw new HttpError(401, "Incorrect login or password");
        }
        const token = getJWT(credentials.userId, employee.roles);
        return token;
    }
}
export const accountingServiceMongo = new AccountingServiceImplMongo();
//# sourceMappingURL=AccountingServiceImplMongo.js.map