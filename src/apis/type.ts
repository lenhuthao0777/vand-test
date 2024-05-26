import BaseApi from './base';

class TypeApi extends BaseApi {
  endpoint = 'types';

  constructor() {
    super();
  }
  async getType<T>() {
    return await this.get<T>(this.endpoint).then((res) => res.payload);
  }
}

export default new TypeApi();
