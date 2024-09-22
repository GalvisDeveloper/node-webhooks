import { NextFunction, Request, Response } from "express";
import { envs } from "../../config/envs";
import crypto from 'crypto';

export class GithubSha256Middleware {
    private static secret = envs.SECRET_TOKEN;

    private static sign(req: Request): boolean {
        try {
            const signature = `sha256=${crypto
                .createHmac('sha256', this.secret)
                .update(JSON.stringify(req.body))
                .digest('hex')}`;

            const computedSignature = req.headers["x-hub-signature-256"];

            if (typeof computedSignature !== 'string') {
                return false;
            }

            return crypto.timingSafeEqual(
                Buffer.from(signature),
                Buffer.from(computedSignature)
            );
        } catch (err) {
            return false;
        }
    }

    static verifySignature = (req: Request, res: Response, next: NextFunction) => {
        if (this.sign(req)) {
            next();
        } else {
            res.status(401).send("Unauthorized: Signature verification failed");
        }
    }
}