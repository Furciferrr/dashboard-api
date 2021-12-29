import 'reflect-metadata';
import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { RouteController } from './../common/route.interface';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/logger.interface';
import { IUsers } from './users.interface';

@injectable()
export class UserController extends BaseController implements IUsers {
	//public routes: RouteController[];
	constructor(@inject(TYPES.ILogger) private loggerService: ILoggerService) {
		super(loggerService);
		this.bindRouters([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'login');
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}
}
