import { Module } from "@nestjs/common"
import { OrganizationController } from "./controller/organization.controller"
import { OrganizationService } from "./service/organization.service"
import { ConfigService } from "@nestjs/config"
import { CloudwatchModule } from "../metrics/cloudwatch.module"
import { OrganizationInstrumentation } from "./observability/organization.instrumentation"
import { CloudwatchPublisher } from "../metrics/cloudwatch.publisher"
import { LoggerModule } from "../logging/logger.module"

@Module({
	imports: [CloudwatchModule, LoggerModule],
	controllers: [OrganizationController],
	providers: [
		OrganizationService,
		ConfigService,
		OrganizationInstrumentation,
		{
			provide: "OrganizationInstrumentation",
			useFactory: async (publisher: CloudwatchPublisher) => {
				return new OrganizationInstrumentation(publisher)
			},
			inject: [CloudwatchPublisher],
		},
	],
})
export class OrganizationModule {}
