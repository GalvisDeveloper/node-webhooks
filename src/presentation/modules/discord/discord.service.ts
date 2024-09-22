import { envs } from "../../../config/envs";


export class DiscordService {

    private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL

    constructor() { }

    async notify(message: string, image?: string) {

        const body = {
            content: message,
            ...(image && { embeds: [{ image: { url: image } }] })
        }

        const response = await fetch(this.discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.log('Error sending message to Discord');
            return false;
        }

        return true;

    }
}