import { Link } from "../model/common-interfaces.model";

export class FitsResultRule {
	_links: Link[];
	_embedded: {};
  id: number;
  ruleName: string;
	type: string;
	mime: string;
	puid?: any;
	extension?: any;
	toolName?: any;
	outcome: string;
	outcomeOnMissingFitsRecord: string;
	translations: Translations;
}

export class Translations {
	de: string;
	en: string;
}
