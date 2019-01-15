import { Link } from "../model/common-interfaces.model";

export class FitsResultRule {
	_links: Link[];
	_embedded: {};
	id: number;
	type: string;
	mime: string;
	puid?: any;
	extension?: any;
	toolName?: any;
	outcome: string;
	outcomeOnMissingFitsRecord: string;
	errorMessage: string;
}
