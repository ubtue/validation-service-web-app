import { Link } from "../model/common-interfaces.model";
import { Configuration } from "../model/configuration.model";


export interface Embedded {
	configurations: Configuration[];
}

export interface ConfigurationsPage {
	_links: Link[];
	_embedded: Embedded;
}
