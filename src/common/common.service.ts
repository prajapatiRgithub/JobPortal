import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/user.model';
import { HandleResponse } from 'src/services/handleResponse';
import { Messages } from 'src/utils/constants/message';
import { ResponseData } from 'src/utils/response';
import { RegistrationDto } from './dto/users.dto';
import bcrypt = require('bcrypt');
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/model/admin.model';

@Injectable()
export class CommonService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Admin) private adminModel: typeof Admin,
    private jwt: JwtService,
  ) {}

  async registration(dto: RegistrationDto) {
    let error = null;
    const saltRounds = 10;
    dto.password = await bcrypt.hash(dto.password, saltRounds);
    const registerUser = await this.userModel
      .create({ ...dto })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      let dbError: string;
      if (error.original.code === '23505') {
        dbError =
          'duplicate key value violates unique constraint Users_username_key';
      }
      return HandleResponse(
        HttpStatus.BAD_REQUEST,
        ResponseData.Error,
        `User ${Messages.ALREADY_EXIST}.`,
        undefined,
        dbError,
      );
    }

    if (registerUser && Object.keys(registerUser).length > 0) {
      return HandleResponse(
        HttpStatus.CREATED,
        ResponseData.Success,
        `Congratulation! You are ${Messages.REGISTERED_SUCCESS}!!!`,
        undefined,
        undefined,
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.Error,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async login(dto: LoginDto) {
    let error = null;
    const { email } = dto;

    const userLogin: any = await this.userModel
      .findOne({
        where: { email },
      })
      .catch((err: any) => {
        error = err;
      });

    const adminLogin: any = await this.adminModel
      .findOne({
        where: { email },
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseData.Error,
        `${Messages.FAILED_TO} login.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (!userLogin && !adminLogin) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.Error,
        Messages.USER_NOT_FOUND,
        undefined,
        undefined,
      );
    }

    const comparePassword = await bcrypt.compare(
      dto.password,
      userLogin ? userLogin.password : adminLogin.password,
    );

    if (comparePassword) {
      const token = await this.jwt.signAsync({
        id: userLogin ? userLogin.id : adminLogin.id,
        role: userLogin ? userLogin.role : adminLogin.role,
      });
      return HandleResponse(
        HttpStatus.OK,
        ResponseData.Success,
        Messages.LOGIN_SUCCESS,
        { id: userLogin ? userLogin.id : adminLogin.id, token },
        undefined,
      );
    } else {
      return HandleResponse(
        HttpStatus.BAD_REQUEST,
        ResponseData.Error,
        Messages.DOES_NOT_MATCH,
        undefined,
        undefined,
      );
    }
  }
}
