import { Request, Response } from "express";
import { GithubService } from "./github.service";
import { DiscordService } from "../discord/discord.service";




export class GithubController {

    constructor(
        private readonly githubService: GithubService,
        private readonly discordService: DiscordService,
    ) { }

    webhookHandler = (req: Request, res: Response) => {
        const payload = req.body;
        const githubEvent = req.headers['x-github-event'] ?? 'unknown';

        let message: string = '';

        // console.log(JSON.stringify(payload));
        // const signature = req.headers['x-hub-signature-256'] ?? 'unknown';

        switch (githubEvent) {
            case 'star':
                message = this.githubService.onStar(payload);
                break;
            case 'issues':
                message = this.githubService.onIssue(payload);
                break;
            default:
                console.log('Unknown event: ', githubEvent);
        }

        console.log(message)

        if (this.discordService) {
            return this.discordService.notify(message)
                .then(() => res.status(202).send('Ok'))
                .catch(() => res.status(500).json({ message: 'Internal Server Error' }));
        }

        return res.json({ message: 'Ok' });

    }

}