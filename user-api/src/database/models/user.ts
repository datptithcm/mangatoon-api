import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { account, accountCreationAttributes, accountId } from './account';

export interface userAttributes {
  id: number;
  name: string;
  gender: number;
  dob?: string;
  avatarUrl?: string;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "gender" | "dob" | "avatarUrl";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  name!: string;
  gender!: number;
  dob?: string;
  avatarUrl?: string;

  // user hasOne account via userId
  account!: account;
  getAccount!: Sequelize.HasOneGetAssociationMixin<account>;
  setAccount!: Sequelize.HasOneSetAssociationMixin<account, accountId>;
  createAccount!: Sequelize.HasOneCreateAssociationMixin<account>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "name_UNIQUE"
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    avatarUrl: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
