import { Link } from "../model/common-interfaces.model";


export interface Embedded {}

export class Configuration {
	_links: Link[];
	_embedded: Embedded;
	id: number;
	decompressArchives: boolean;
	fitsEnabled: boolean;
	invalidateOnToolError: boolean;
	description: string;
}
