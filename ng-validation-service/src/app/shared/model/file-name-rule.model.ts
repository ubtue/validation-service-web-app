import { Link } from "../model/common-interfaces.model";
import { Configuration } from "../model/configuration.model";

export class FileNameRule {
	_links: Link[];
	_embedded: {};
    id: number;
    ruleName: string;
	type: string;
	value: string;
	outcome: string;
	errorMessage: string;
}