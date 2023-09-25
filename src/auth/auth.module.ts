import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtCustomStrategy } from './jwt-custom.strategy';


@Module({
  imports : [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'MaximImpressions.com',
      signOptions: { 
        algorithm: 'HS512',
        expiresIn: '1d',
       },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService,JwtCustomStrategy],
  controllers: [AuthController],
  exports:[PassportModule,JwtCustomStrategy]

})
export class AuthModule {}
