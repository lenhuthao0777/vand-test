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


// const sprite = async (id?: string, name?: string) => {
//   const res = await fetch(
//     `https://api.vandvietnam.com/api/pokemon-api/pokemons/${id}/sprite`,
//     { method: 'GET' }
//   );

//   // const blob = new Blob([res as any]);

//   const blob = await res.blob();

//   const blobUrl = URL.createObjectURL(blob);

//   console.log(blobUrl);

//   const link = document.createElement('a');

//   link.href = blobUrl;

//   // link.setAttribute('target', '_blank');

//   name && (link.download = name);

//   document.body.appendChild(link);

//   link.dispatchEvent(
//     new MouseEvent('click', {
//       bubbles: true,
//       cancelable: true,
//       view: window,
//     })
//   );

//   URL.revokeObjectURL(link as any);

//   document.body.removeChild(link);
// };