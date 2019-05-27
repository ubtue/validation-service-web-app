import { Link } from "../model/common-interfaces.model";
import { VerapdfSetup } from "../model/verapdf-setup.model";

export interface Embedded {
	'verapdf-setup': VerapdfSetup;
}

export class Configuration {
	_links: Link[];
	_embedded: Embedded;
  id: number;
  publicIdentifier: string;
	fitsEnabled: boolean;
  description: string;
  creationDate: number;
  fitsTimeOut: number;
  veraPdfTimeOut: number;
  veraPdfMaxHeapSize: number;

}







