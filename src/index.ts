import * as restify from 'restify';
import * as path from 'path';
import { config } from 'dotenv';
import { BotFrameworkAdapter } from 'botbuilder';
import axios from 'axios';
import { parse } from 'url';
import { BotServices } from './botServices';
import { ConsoleLoggerMiddleware } from './consoleLoggerMiddleware';

// Read botFilePath and botFileSecret from .env file.
const envFile = path.join(__dirname, '..', '.env');
const env = config({ path: envFile });

// Load bot services from .bot file.
let botServices;
try {
    const botFile = path.join(__dirname, '..', (process.env.botFilePath || ''));
    botServices = new BotServices(botFile, process.env.botFileSecret, process.env.NODE_ENV);
} catch (err) {
    console.error(`\nError reading bot file. Please ensure you have valid botFilePath and botFileSecret set for your environment.`);
    console.error(`\n - The botFileSecret is available under appsettings for your Azure Bot Service bot.`);
    console.error(`\n - If you are running this bot locally, consider adding a .env file with botFilePath and botFileSecret.\n\n`);
    process.exit();
}

// Create adapter.
const adapter = new BotFrameworkAdapter({
    appId: botServices.endpoint.appId || process.env.microsoftAppID,
    appPassword: botServices.endpoint.appPassword || process.env.microsoftAppPassword
});

// Configure middleware.
adapter.use(new ConsoleLoggerMiddleware());

// Create HTTP server and listen for incoming requests.
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`\n${server.name} listening to ${server.url}`);
});

server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        try {
            // Route activities to bot.
            await routeToBot(process.env.botUrl, req.headers, req.body);
        } catch (error) {
            await context.sendActivity(`Sorry, I cannot connect to the bot. ${error}`);
        }
    });
});

async function routeToBot(url: string, headers: any, body: any) : Promise<any> {
    headers.host = parse(url).host;
    const result = await axios({
        method: 'post',
        url: url,
        headers: headers,
        data: body
    });
    return result;
}