import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from 'src/model/admin.model';
import { User } from 'src/model/user.model';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin,User]),
    JwtModule.register({
      secret: 'JWTSecretKey',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
