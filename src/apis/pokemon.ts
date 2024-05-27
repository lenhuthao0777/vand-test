import BaseApi from './base';

class PokemonApi extends BaseApi {
  endpoint = 'pokemons';
  constructor() {
    super();
  }

  async index<T>(queries?: any) {
    return this.get<T>(`${this.endpoint}?${queries}`).then((res) => res);
  }

  async show<T>(number: string) {
    return await this.get<T>('', {
      baseUrl: `https://pokeapi.co/api/v2/pokemon/${number}`,
    }).then((res) => res.payload);
  }

  async sprite(id: string) {
    return await this.get(`${this.endpoint}/${id}/sprite`, {
      encoding: 'utf-8',
    }).then((res) => res.payload);
  }
}

export default new PokemonApi();
