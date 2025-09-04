import mongoose from "mongoose";
export declare const EmployeeModel: mongoose.Model<{
    _id: string;
    firstName: string;
    lastName: string;
    passHash: string;
    roles: string[];
    hireDate: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    _id: string;
    firstName: string;
    lastName: string;
    passHash: string;
    roles: string[];
    hireDate: string;
}> & {
    _id: string;
    firstName: string;
    lastName: string;
    passHash: string;
    roles: string[];
    hireDate: string;
} & Required<{
    _id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    _id: string;
    firstName: string;
    lastName: string;
    passHash: string;
    roles: string[];
    hireDate: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    _id: string;
    firstName: string;
    lastName: string;
    passHash: string;
    roles: string[];
    hireDate: string;
}>> & mongoose.FlatRecord<{
    _id: string;
    firstName: string;
    lastName: string;
    passHash: string;
    roles: string[];
    hireDate: string;
}> & Required<{
    _id: string;
}>>>;
export declare const FiredEmployeeModel: mongoose.Model<{
    _id: string;
    firstName: string;
    lastName: string;
    roles: string[];
    hireDate: string;
    fireDate: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    _id: string;
    firstName: string;
    lastName: string;
    roles: string[];
    hireDate: string;
    fireDate: string;
}> & {
    _id: string;
    firstName: string;
    lastName: string;
    roles: string[];
    hireDate: string;
    fireDate: string;
} & Required<{
    _id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    _id: string;
    firstName: string;
    lastName: string;
    roles: string[];
    hireDate: string;
    fireDate: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    _id: string;
    firstName: string;
    lastName: string;
    roles: string[];
    hireDate: string;
    fireDate: string;
}>> & mongoose.FlatRecord<{
    _id: string;
    firstName: string;
    lastName: string;
    roles: string[];
    hireDate: string;
    fireDate: string;
}> & Required<{
    _id: string;
}>>>;
