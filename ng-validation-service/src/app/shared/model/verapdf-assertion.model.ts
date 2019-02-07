import { Link } from './common-interfaces.model';


export interface Assertion {
	_links: Link[];
	_embedded: {};
	id: number;
	status: string;
	description: string;
	contexts: string[];
	specification: string;
	clause: string;
	testNumber: number;
	object: string;
	test: string;
	occurences: number;
	passedChecks: number;
	failedChecks: number;
}

export interface Embedded {
	assertions: Assertion[];
}

export interface AssertionsPage {
	_links: Link[];
	_embedded: Embedded;
	count: number;
	totalCount: number;
}
