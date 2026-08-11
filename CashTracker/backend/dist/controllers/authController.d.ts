import type { Request, Response } from "express";
export declare class AuthController {
    static creatAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
