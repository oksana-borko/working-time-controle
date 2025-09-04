import { accountingServiceMongo } from "../services/AccountingServiceImplMongo.js";
import { convertEmployeeDtoToEmployee } from "../utils/tools.js";
export const hireEmployee = async (req, res) => {
    const dto = req.body;
    const employee = convertEmployeeDtoToEmployee(dto);
    const result = await accountingServiceMongo.hireEmployee(employee);
    res.status(201).json(result);
};
export const fireEmployee = async (req, res) => {
    const { id } = req.params;
    const result = await accountingServiceMongo.fireEmployee(id);
    res.json(result);
};
export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const dto = req.body;
    const result = await accountingServiceMongo.updateEmployee(id, dto);
    res.json(result);
};
export const changePassword = async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;
    await accountingServiceMongo.changePassword(id, newPassword);
    res.send("Password changed successfully");
};
export const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    const result = await accountingServiceMongo.getEmployeeById(id);
    res.json(result);
};
export const getAllEmployees = async (req, res) => {
    const result = await accountingServiceMongo.getAllEmployees();
    res.json(result);
};
export const setRole = async (req, res) => {
    const { id } = req.params;
    const { newRole } = req.body;
    const result = await accountingServiceMongo.setRole(id, newRole);
    res.json(result);
};
export const login = async (req, res) => {
    const credentials = req.body;
    const token = await accountingServiceMongo.login(credentials);
    res.json({ token });
};
//# sourceMappingURL=accountingController.js.map