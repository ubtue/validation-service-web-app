import { Link } from "../model/common-interfaces.model";
import { BatchReport } from "../model/batch-report.model";


export interface Embedded {
	'batch-reports': BatchReport[];
}

export class Batch {
	_links: Link[];
	_embedded: Embedded;
	id: number;
	description: string;
	creationDate: number;
}
