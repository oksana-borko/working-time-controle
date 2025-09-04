import { AccountingService } from "./accountingService.js";
import { Employee, EmployeeDto, SavedFiredEmployee } from "../models/Employee.js";
export declare class AccountingServiceImplMongo implements AccountingService {
    hireEmployee(employee: Employee): Promise<Employee>;
    fireEmployee(empId: string): Promise<SavedFiredEmployee>;
    updateEmployee(empId: string, employeeDto: EmployeeDto): Promise<Employee>;
    changePassword(empId: string, newPassword: string): Promise<void>;
    getEmployeeById(id: string): Promise<Employee>;
    getAllEmployees(): Promise<SavedFiredEmployee[]>;
    setRole(id: string, newRole: string): Promise<Employee>;
    login(credentials: {
        userId: string;
        password: string;
    }): Promise<string>;
}
export declare const accountingServiceMongo: AccountingServiceImplMongo;
