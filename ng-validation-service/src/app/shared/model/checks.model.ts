import { Check } from './check.model';
import { Link } from './common-interfaces.model';

export interface _embedded {
	checks: Check[];
}

export interface ChecksPage {
	_links: Link[];
	_embedded: _embedded;
	count: number;
	totalCount: number;
}