import { Link } from "../model/common-interfaces.model";

export interface Embedded {}

export interface File {
	_links: Link[];
	_embedded: Embedded[];
	id: number;
	fileName: string;
    size: number;
    creationDate: number;
}