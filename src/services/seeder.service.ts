import config from "../common/configs/config";
import { RoleTypes } from "../common/constants/role.constant";
import UserModel from "../models/user.model";
import argon2 from 'argon2';

class SeederService {
  async seed() {
    // Seed data
    this.dataAdmin();
  }

  async dataAdmin() {
    const findAdmin = await UserModel.findOne({
      where: {
        email: config.admin.email,
      },
    });

    if (!findAdmin) {
      const hassedPassword = await argon2.hash(config.admin.password)
      await UserModel.create({
        name: 'Admin',
        email: config.admin.email,
        password: hassedPassword,
        role: RoleTypes.ADMIN,
        active: true,
      });
      console.log('------------------------------------');
      console.log('Admin account created successfully');
      console.log('------------------------------------');
    }
  }
}

export default new SeederService();