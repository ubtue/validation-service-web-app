import { Link } from './common-interfaces.model';
import { BatchReport } from './batch-report.model';

export interface BatchReportsPage {
	_links: Link[];
	_embedded: Embedded;
	count: number;
	totalCount: number;
}

export interface Embedded {
	 ['batch-reports']: BatchReport[];
}
