import { Link } from "../model/common-interfaces.model";





export interface Embedded {}

export interface User {
	_links: Link[];
	_embedded: Embedded;
	id: number;
	username: string;
	role: string;
}


