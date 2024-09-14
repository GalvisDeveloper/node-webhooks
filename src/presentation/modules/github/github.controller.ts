import { Request, Response } from "express";




export class GithubController {

    constructor(

    ) { }

    webhookHandler = (req: Request, res: Response) => {
        const payload = req.body;
        const githubEvent = req.headers['x-github-event'] ?? 'unknown';
        // const signature = req.headers['x-hub-signature-256'] ?? 'unknown';



        res.status(202).send('Ok');
    }

}