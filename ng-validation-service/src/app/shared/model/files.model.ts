import { Link } from "../model/common-interfaces.model";

export interface Embedded {
	files: File[];
}

export interface FilesPage {
	_links: Link[];
	_embedded: Embedded;
	count: number;
	totalCount: number;
}










