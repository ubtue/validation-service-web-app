import { Link } from './common-interfaces.model';

export interface FitsResult {
	_links: Link[];
	_embedded: {};
	id: number;
	tool: string;
	toolVersion: string;
	formatName: string;
	puid?: string;
	mime: string;
	wellFormed: boolean;
	valid: boolean;
}
