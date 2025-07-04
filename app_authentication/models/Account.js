import db from "../dbConfig.js";
import { Model, STRING, TEXT } from "sequelize";
import { Strategy as LocalStrategy } from "passport-local";

class Account extends Model {
  static async findByUsername(username) {
    const lowerCaseUsername = username.toLowerCase();
    return await this.findOne({ where: { username: lowerCaseUsername } });
  }
}

Account.init(
  {
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    hash: {
      type: TEXT,
      allowNull: false,
    },
    salt: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Account",
  }
);

Account.beforeCreate((account) => {
  account["username"] = account["username"].toLowerCase();
});

Account.sync();
module.exports = Account;
