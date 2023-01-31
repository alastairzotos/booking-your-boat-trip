import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'src/environment/environment.module';
import { UsersController } from 'src/features/users/users.controller';
import { UsersRepository } from 'src/features/users/users.repository';
import { UsersService } from 'src/features/users/users.service';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    EnvModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
