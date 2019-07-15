import { Link } from "../model/common-interfaces.model";





export interface Embedded {}

export class User {
	_links: Link[];
	_embedded: Embedded;
	id: number;
	username: string;
  role: string;
  password: string;
  created: number;
  lastModified: number;
}


