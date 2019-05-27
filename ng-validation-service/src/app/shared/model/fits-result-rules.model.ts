import { Link } from "../model/common-interfaces.model";
import { FitsResultRule } from "../model/fits.result-rule.model";

export interface FitsResultRulesPage {
	_links: Link[];
	_embedded: Embedded;
	count: number;
	totalCount: number;
}

export interface Embedded {
	'fits-result-rules': FitsResultRule[];
}
