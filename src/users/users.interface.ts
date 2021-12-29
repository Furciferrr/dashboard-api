import { NextFunction, Response, Request } from 'express';
import { RouteController } from '../common/route.interface';

export interface IUsers {
	//routes: RouteController[];
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
}
