import { Link } from '../model/common-interfaces.model';
import { User } from './user.model';


export interface Embedded {
	users: User[];
}

export interface UsersPage {
	_links: Link[];
	_embedded: Embedded;
	count: number;
	totalCount: number;
}
