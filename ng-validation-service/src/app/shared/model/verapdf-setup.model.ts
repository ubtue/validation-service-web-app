import { Link } from "../model/common-interfaces.model";

export interface Embedded {}

export class VerapdfSetup {
	_links: Link[];
	_embedded: Embedded;
	id: number;
	executionMode: string;
	validationProfile: string;
	reportPassedRules: boolean;
	failedChecksThreshold: number;
	failedChecksPerRuleDisplayed: number;
}
