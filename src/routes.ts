import { Router } from 'express';
import { GithubRoutes } from './presentation';

export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        // Definir las rutas
        router.use('/api/github', GithubRoutes.routes);

        return router;
    }


}

