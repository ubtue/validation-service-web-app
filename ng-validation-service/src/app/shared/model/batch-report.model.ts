import { _link } from "../model/common-interfaces.model";

export interface BatchReport {
	_links: _link[];
	_embedded: any[];
	id: number;
	status: string;
	summary: Summary;
}

export interface Summary {
	problematicFiles: number;
}
