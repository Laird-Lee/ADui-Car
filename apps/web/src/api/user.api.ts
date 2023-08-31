import { HttpMethod } from '@/enums';

export const userApis = {
  register: {
    url: '',
    method: HttpMethod.POST
  },
  login: {
    url: '',
    method: HttpMethod.POST
  },
  getUserInfoById: {
    url: '/user/:id',
    method: HttpMethod.GET
  },
  getUserPermission: {
    url: '',
    method: HttpMethod.GET
  },
  modifyUserInfo: {
    url: '',
    method: HttpMethod.PATCH
  },
  deleteUser: {
    url: '',
    method: HttpMethod.DELETE
  }
};
