import { _link } from "../model/common-interfaces.model";
import { BatchReport } from "../model/batch-report.model";


export interface Embedded {
	['batch-reports']: BatchReport[];
}

export interface Batch {
	_links: _link[];
	_embedded: Embedded;
	id: number;
	description: string;
	creationDate: number;
}