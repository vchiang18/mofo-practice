import { ConfigService } from "@nestjs/config";
import { CloudwatchClient } from "./cloudwatch.client";
export declare class CloudwatchPublisher {
    private readonly configService;
    private readonly cloudwatchClient;
    constructor(configService: ConfigService, cloudwatchClient: CloudwatchClient);
    publishMetric(name: string, value: number): Promise<void>;
}
