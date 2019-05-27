import { Link } from "../model/common-interfaces.model";
import { Configuration } from "../model/configuration.model";
import { FileNameRule } from "../model/file-name-rule.model";

export interface _embedded {
	'file-name-rules': FileNameRule[];
}

export interface FileNameRulesPage {
	_links: Link[];
	_embedded: _embedded;
	count: number;
	totalCount: number;
}
