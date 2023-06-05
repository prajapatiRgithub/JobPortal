import { Body, Controller, Post } from '@nestjs/common';
import { CommonService } from './common.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/users.dto';

@Controller()
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Post('registration')
  registration(@Body() dto: RegistrationDto) {
    return this.commonService.registration(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.commonService.login(dto);
  }
}
