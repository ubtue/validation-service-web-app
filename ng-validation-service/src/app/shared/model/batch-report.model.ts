import { Link } from "../model/common-interfaces.model";
import { Batch } from './batch.model';
import { Configuration } from './configuration.model';

export interface BatchReport {
	_links: Link[];
	_embedded: Embedded[];
	id: number;
  status: string;
  creationDate: number;
  finishedDate: number;
	summary: Summary;
}

export interface Embedded {
	configuration: Configuration;
	batch: Batch;
}

export interface Summary {
  problematicFiles: number;
	totalFiles: number;
	validationOutcome: string;
}














