import { Role } from "../utils/types.js";
export type EmployeeDto = {
    firstName: string;
    lastName: string;
    password: string;
    id: string;
};
export type Employee = {
    _id: string;
    firstName: string;
    lastName: string;
    passHash: string;
    roles: Role[];
    hireDate: string;
};
export type SavedFiredEmployee = {
    _id: string;
    firstName: string;
    lastName: string;
    roles: Role[];
    hireDate: string;
    fireDate: string;
};
