import { Link } from './common-interfaces.model';

export interface ApplicationSettings {
	_links: Link[];
	id: number;
	parallelTasks: number;
	threadsPerTask: number;
	pageSize: number;
}
