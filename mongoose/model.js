import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    phone: String,
    dob: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const EmployeeModel = model("Employee", employeeSchema);
