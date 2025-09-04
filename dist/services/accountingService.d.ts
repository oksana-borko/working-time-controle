import { Employee, EmployeeDto, SavedFiredEmployee } from "../models/Employee.js";
export interface AccountingService {
    hireEmployee: (employee: Employee) => Promise<Employee>;
    fireEmployee: (empId: string) => Promise<SavedFiredEmployee>;
    updateEmployee: (empId: string, employee: EmployeeDto) => Promise<Employee>;
    changePassword: (empId: string, newPassword: string) => Promise<void>;
    getEmployeeById: (id: string) => Promise<Employee>;
    getAllEmployees: () => Promise<SavedFiredEmployee[]>;
    setRole: (id: string, newRole: string) => Promise<Employee>;
    login: (credentials: {
        userId: string;
        password: string;
    }) => Promise<string>;
}
