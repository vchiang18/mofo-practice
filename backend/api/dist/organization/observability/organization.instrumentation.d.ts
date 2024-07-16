import { CloudwatchPublisher } from "../../metrics/cloudwatch.publisher";
export declare class OrganizationInstrumentation {
    private readonly cloudwatchPublisher;
    constructor(cloudwatchPublisher: CloudwatchPublisher);
    organizationCreateSucceeded(): Promise<void>;
    organizationCreateFailed(): Promise<void>;
}
