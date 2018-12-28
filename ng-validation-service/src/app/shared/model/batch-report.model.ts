import { Link } from "../model/common-interfaces.model";

export interface BatchReport {
	_links: Link[];
	_embedded: any[];
	id: number;
	status: string;
	summary: Summary;
}

export interface Summary {
	problematicFiles: number;
}
