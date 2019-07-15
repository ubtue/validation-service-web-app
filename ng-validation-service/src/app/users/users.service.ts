import { AppConfigService } from '../shared/services/app-config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../shared/model/user.model';
import { UsersPage } from '../shared/model/users.model';
import { Util } from '../shared/util';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {

  usersResourceUrl: string = this.configService.getConfig()['apiBaseUrl'] + '/users';

  constructor(private configService: AppConfigService, private httpClient: HttpClient) {}

  getUserById(id: number) {
    return this.httpClient.get<User>(this.usersResourceUrl + '/' + id);
  }

  createUser(user: User) {
    return this.httpClient.post<User>(this.usersResourceUrl, user);
  }

  getUsersStartPage() {
    return this.httpClient.get<UsersPage>(this.usersResourceUrl);
  }

  getUsersPage(url: string, userNameFilter = '') {
    let params: HttpParams = new HttpParams();

    if(userNameFilter.length > 0) {
        params = params.append('nameFilter', userNameFilter );
    }
    return this.httpClient.get<UsersPage>(url, {params: params}) ;
  }

  refetchUsersPage(page: UsersPage) {
    return this.httpClient.get<UsersPage>(Util.getHrefForRel(page, 'self'));
  }

  deleteUser(user: User) {
    return this.httpClient.delete(Util.getHrefForRel(user, 'self'));
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(Util.getHrefForRel(user, 'self'), user);
  }

}
