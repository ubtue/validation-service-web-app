import { Link } from './common-interfaces.model';

export interface Check {
	_links: Link[];
	_embedded: {};
	id: number;
	checkType: string;
	test: string;
	outcome: string;
	resultMessage: string;
}
