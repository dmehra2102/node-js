import { EmployeeModel } from "../model";

class EmployeeController {
  static findAll = async (req, res, next) => {
    try {
      const employees = await EmployeeModel.find().lean().exec();
      return res.status(200).json(employees);
    } catch (error) {
      next(error);
    }
  };
  static findById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const employee = await EmployeeModel.findById(id).lean().exec();
      return res.status(200).json(employee);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      const { email, firstName, lastName, phone, dob } = req.body;
      const newEmployee = await EmployeeModel.create({
        email,
        phone,
        firstName,
        lastName,
        dob,
      });
      return res
        .status(201)
        .send({ message: "Employee Created", data: newEmployee });
    } catch (error) {
      next(error);
    }
  };

  static deleteById = async (req, res, next) => {
    try {
      const { id } = req.params;
      await EmployeeModel.findByIdAndDelete(id);
      return res
        .status(201)
        .send({ message: "Employee deleted successfully." });
    } catch (error) {
      next(error);
    }
  };

  static updateById = async (req, res, next) => {
    try {
      const { firstName, lastName, phone, dob } = req.body;
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
        id,
        {
          $set: { firstName, lastName, phone, dob },
        },
        { new: true }
      );

      return res
        .status(201)
        .json({ message: "Employee Updated", data: updatedEmployee });
    } catch (error) {
      next(error);
    }
  };
}

export default EmployeeController;
