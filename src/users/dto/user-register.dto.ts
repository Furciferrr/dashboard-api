import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'email not valid' })
	email: string;
	@IsString({ message: 'password not valid' })
	password: string;
	@IsString({ message: 'name not valid' })
	name: string;
}
