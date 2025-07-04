import db from "../dbConfig.js";
import crypto, { hash } from "node:crypto";
import { Model, STRING, TEXT } from "sequelize";
import { Strategy as LocalStrategy } from "passport-local";

class Account extends Model {
  static async findByUsername(username) {
    const lowerCaseUsername = username.toLowerCase();
    return await this.findOne({ where: { username: lowerCaseUsername } });
  }

  static async register(username, password) {
    const exisitingAccount = this.findByUsername(username);
    if (exisitingAccount) {
      throw new Error("Account already exists");
    }
    const account = this.build({ username });
    await account.setPassword(password);
    return await account.save();
  }

  setPassword(password) {
    if (!passsword) throw new Error("No password supplied.");

    return new Promise((resolce, reject) => {
      try {
        const bufferBytes = crypto.randomBytes(32);
        const salt = bufferBytes.toString("hex");
        const hashRaw = crypto.pbkdf2Sync(password, salt, 12000, 512, "sha1");
        this.set("hash", Buffer.from(hashRaw).toString("hex"));
        this.set("salt", salt);
      } catch (error) {
        reject(new Error("Unable to hash password"));
      }
    });
  }

  async authenticate(password, done) {
    const { hash, salt } = this;
    if (!salt) throw new Error("No salt found");

    const hashRaw = crypto.pbkdf2Sync(password, salt, 12000, 512, "sha1");
    const currentHash = Buffer.from(hashRaw).toString("hex");

    if (currentHash === hash) {
      return done(null, this);
    } else {
      done(null, false, { message: "Password Incorrect" });
    }
  }

  static passwordAuthenticate() {
    return async (username, password, done) => {
      const account = await this.findByUsername(username);
      if (account) {
        return await account.authenticate(password, done);
      } else {
        return done(new Error("Unable to authenticate"));
      }
    };
  }

  static serializeUser(account, done) {
    const { username } = account;
    done(null, username);
  }

  static async deserializeUser(username, done) {
    const foundAccount = await this.findByUsername(username);
    done(null, foundAccount);
  }

  static genStrategy() {
    return new LocalStrategy(this.passwordAuthenticate());
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
export default Account;
