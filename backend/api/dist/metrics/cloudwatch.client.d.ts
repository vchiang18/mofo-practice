import { CloudWatch } from "@aws-sdk/client-cloudwatch";
export declare class CloudwatchClient {
    private readonly client;
    constructor();
    clientInstance(): CloudWatch;
}
