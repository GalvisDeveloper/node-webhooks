import { Router } from "express";
import { GithubController } from "./github.controller";

export class GithubRoutes {

    static get routes(): Router {
        const router = Router();


        const controller = new GithubController();

        router.get('/', controller.webhookHandler);
        return router;
    }
}