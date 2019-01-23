import { Link } from './common-interfaces.model';
import { Batch } from './batch.model';
import { Configuration } from './configuration.model';



export interface Embedded {
	configuration: Configuration;
	batch: Batch;
}

export interface Order {
	_links: Link[];
	_embedded: Embedded;
	id: number;
  status: string;
  progress: number;
  createdDate: number;
}

export interface EmbeddedOrders {
	orders: Order[];
}

export interface QueuePage {
	_links: Link[];
	_embedded: EmbeddedOrders;
	count: number;
	totalCount: number;
}
