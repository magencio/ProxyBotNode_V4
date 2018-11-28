This sample demonstrates a bot that acts as a proxy to other bots. It gets all the activities from user and just forwards them to another bot.
It has been developed with [TypeScript](https://www.typescriptlang.org/) & [Azure Bot Service v4](https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0). 
It's based on [BotToBot-Handoff Sample Bot](https://github.com/cmayomsft/BotToBot-Handoff/tree/master/Node).
Note: The proxy bot and the bots receiving the forwarded activities share the same AppID and AppPassword. This will allow all the bots involved in the conversation to share the same conversation ID, Dialog Stack, and Bot State Data.

## Documentation, SDKs and Tools
- [TypeScript](https://www.typescriptlang.org/)
- [Azure Bot Service v4](https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0)
- [JavaScript version of the Bot Builder SDK v4](https://github.com/Microsoft/botbuilder-js)
- [Node.js samples of the Bot Builder SDK v4](https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs)
- [TypeScript samples of the Bot Builder SDK v4](https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/javascript_typescript)
- [Bot Builder tools](https://github.com/Microsoft/botbuilder-tools)
- [Bot configuration with .bot file](https://aka.ms/about-bot-file)
- [Microsoft Bot Framework Emulator](https://github.com/microsoft/botframework-emulator)