import { _link } from "../model/common-interfaces.model";
import { Batch } from "../model/batch.model";

export interface Embedded {
	batches: Batch[];
}

export interface BatchPage {
	_links: _link[];
	_embedded: Embedded;
}