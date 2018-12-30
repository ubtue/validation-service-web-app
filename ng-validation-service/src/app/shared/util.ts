
import { Link } from '../shared/model/common-interfaces.model';

export  class Util {

    static getHrefForRel(representation: { _links: Link[] }, rel: string): string {
        for (let link of representation._links) {
            if (link.rel === rel)
                return link.href
        }
        return null;
    }

}