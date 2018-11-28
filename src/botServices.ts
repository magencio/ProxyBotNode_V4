import { IEndpointService, ServiceTypes, BotConfiguration } from "botframework-config";

/**
 * Represents references to external services.
 */
export class BotServices {
    protected readonly botConfig: BotConfiguration;

    /**
     * Creates a new BotServices instance.
     * @param botFilePath Path to the .bot configuration file.
     * @param botFileSecret Secret to decrypt the .bog configuration file.
     * @param environment Environment name to find the right bot endpoint.
     */
    constructor(botFilePath: string, botFileSecret: string, environment: string) {
        this.botConfig = BotConfiguration.loadSync(botFilePath, botFileSecret);

        const endpointName = (environment || 'development');

        this.botConfig.services.forEach(service => {
            switch (service.type) {
                case service.name === endpointName && ServiceTypes.Endpoint:
                    this.endpoint = <IEndpointService>service;
                    break;
            }
        });
    }

    /**
     * Endpoint configuration.
     */
    public endpoint: IEndpointService;
}