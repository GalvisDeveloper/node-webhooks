import express from 'express';
import { envs } from './config/envs';
import { GithubController } from './presentation';
import { GithubService } from './presentation/modules/github/github.service';
import { DiscordService } from './presentation/modules/discord/discord.service';


(async () => {
    await main()
})()


function main() {
    const app = express()

    const ghService = new GithubService();
    const discordService = new DiscordService();
    const controller = new GithubController(ghService, discordService);

    app.use(express.json());

    app.post('/api/github', controller.webhookHandler);

    app.listen(envs.PORT, () => {
        console.log(`Server running on port ${envs.PORT}`)
    });
}