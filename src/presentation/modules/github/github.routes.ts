import { Router } from "express";
import { GithubController } from "./github.controller";
import { GithubService } from "./github.service";

export class GithubRoutes {

    static get routes(): Router {
        const router = Router();

        const service = new GithubService();
        const controller = new GithubController(service);

        router.get('/', controller.webhookHandler);
        return router;
    }
}