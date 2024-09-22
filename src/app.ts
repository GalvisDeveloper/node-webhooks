import express from 'express';
import { envs } from './config/envs';
import { GithubController } from './presentation';
import { GithubService } from './presentation/modules/github/github.service';
import { DiscordService } from './presentation/modules/discord/discord.service';
import { GithubSha256Middleware } from './presentation/middlewares/githubsha256.middleware';

function main() {
    const app = express();

    const ghService = new GithubService();
    const discordService = new DiscordService();
    const controller = new GithubController(
        ghService,
        discordService
    );

    app.use(express.json());
    app.use(GithubSha256Middleware.verifySignature);

    app.post('/api/github', controller.webhookHandler);

    app.listen(envs.PORT, () => {
        console.log(`Server running on port ${envs.PORT}`);
    });
}

main();