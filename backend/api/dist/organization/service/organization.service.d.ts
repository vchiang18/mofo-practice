import Organization from "../model/organization.model";
import { ConfigService } from "@nestjs/config";
import { OrganizationInstrumentation } from "../observability/organization.instrumentation";
import { LoggerProvider } from "../../logging/logger.provider";
export declare class OrganizationService {
    private configService;
    private readonly organizationInstrumentation;
    private readonly logger;
    constructor(configService: ConfigService, organizationInstrumentation: OrganizationInstrumentation, logger: LoggerProvider);
    updateOrganization(id: string, name: string): Organization;
    createOrganization(name: string): Organization;
    getOrganizations(): Organization[];
}
