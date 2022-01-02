import 'reflect-metadata';
import { Router, Response } from 'express';
import { injectable } from 'inversify';
import { RouteController } from './route.interface';
import { ILoggerService } from '../logger/logger.interface';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	constructor(private logger: ILoggerService) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): Response<any, Record<string, any>> {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): Response<any, Record<string, any>> {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): Response<any, Record<string, any>> {
		return res.sendStatus(201);
	}

	protected bindRouters(routes: RouteController[]): void {
		for (const route of routes) {
			this.logger.log(`${route.method} ${route.path}`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
