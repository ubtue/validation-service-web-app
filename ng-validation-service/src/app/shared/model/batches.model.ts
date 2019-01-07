import { Link } from "../model/common-interfaces.model";
import { Batch } from "../model/batch.model";

export interface Embedded {
	batches: Batch[];
}

export interface BatchPage {
	_links: Link[];
	_embedded: Embedded;
	count: number;
	totalCount: number;
}
