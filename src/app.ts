import 'reflect-metadata';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ExceptionFilter } from './errors/exception.filter';
import { UserController } from './users/users.controller';
import { ILoggerService } from './logger/logger.interface';
import { TYPES } from './types';

@injectable()
export class App {
	app: Express;
	server: Server = new Server();
	port: number;
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILoggerService,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
		this.exceptionFilter = exceptionFilter;
	}

	useRouters(): void {
		this.app.use('/users', this.userController.router);
	}
	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}
	public async init(): Promise<void> {
		this.useRouters();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.loggerService.log('server ready');
	}
}
