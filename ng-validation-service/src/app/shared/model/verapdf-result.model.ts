import { Link } from './common-interfaces.model';


export interface VeraPdfResult {
	_links: Link[];
	_embedded: {};
	id: number;
	executionError: boolean;
	validationProfile: string;
	compliant: boolean;
	encrypted: boolean;
	passedRules: number;
	failedRules: number;
	passedChecks: number;
	failedChecks: number;
  failedPolicyChecks: number;
  errorMessage?: string;
}
