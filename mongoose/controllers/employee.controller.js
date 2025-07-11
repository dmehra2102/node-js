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
      const employee = await EmployeeModel.findById(id);
      return res.status(200).json(employee);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  static deleteById = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  static updateById = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}

export default EmployeeController;
