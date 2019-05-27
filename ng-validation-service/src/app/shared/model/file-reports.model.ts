import { Link } from "../model/common-interfaces.model";
import { FileReport } from './file-report.model';








export interface Embedded {
	'file-reports': FileReport[];
}

export interface FileReportsPage {
	_links: Link[];
	_embedded: Embedded;
	count: number;
	totalCount: number;
}
