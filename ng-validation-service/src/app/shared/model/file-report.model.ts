import { Link } from "../model/common-interfaces.model";
import { FitsResult } from './fits-result.model';
import { Check } from './check.model';
import { VeraPdfResult } from './verapdf-result.model';
import { File } from './file.model';

export interface Embedded {
	['fits-results']: FitsResult[];
	file: File;
	checks: Check[];
	['verapdf-result']?: VeraPdfResult;
}

export interface FileReport {
	_links: Link[];
	_embedded: Embedded;
	id: number;
	validationOutcome: string;
	fitsExecutionOutcome: string;
	veraPdfExecutionOutcome: string;
	failedNameChecks: number;
	failedFitsChecks: number;
}
