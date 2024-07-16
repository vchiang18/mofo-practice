import Organization from "../model/organization.model";
import { OrganizationService } from "../service/organization.service";
import { CreateOrganizationDTO } from "../model/organization.dto";
import { LoggerProvider } from "../../logging/logger.provider";
export declare class OrganizationController {
    private readonly orgService;
    private readonly logger;
    constructor(orgService: OrganizationService, logger: LoggerProvider);
    createOrganization(createRequest: CreateOrganizationDTO): Organization;
    updateOrganization(id: string, createRequest: CreateOrganizationDTO): Organization;
    getOrganizations(name: string): Organization[];
}
