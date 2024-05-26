class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

type Options = RequestInit & {
  baseUrl?: string;
};

type TResponse = {
  data?: any;
};

class BaseApi {
  constructor() {
    this.request = this.request.bind(this);
  }

  async request<Response>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    options?: Options | undefined | any
  ) {
    const body = options?.body ? JSON.stringify(options.body) : undefined;
    const baseHeader = {
      'Content-Type': 'application/json',
    };

    const baseUrl =
      options?.baseUrl === undefined
        ? 'https://api.vandvietnam.com/api/pokemon-api'
        : options?.baseUrl;

    const fullUrl = url.startsWith('/')
      ? `${baseUrl}${url}`
      : `${baseUrl}/${url}`;

    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...baseHeader,
        ...options?.headers,
      },
      body,
      method,
    });

    const payload: Response & TResponse = await res.json();

    const data = {
      status: res.status,
      payload,
    };

    if (!res.ok) {
      throw new HttpError(data);
    }

    return data;
  }

  async get<Response>(
    url: string,
    options?: Omit<Options, 'body'> | undefined | any
  ) {
    return await this.request<Response>('GET', url, { ...options });
  }

  async post<Response>(
    url: string,
    body: any,
    options?: Omit<Options, 'body'> | undefined
  ) {
    return await this.request<Response>('POST', url, { ...options, body });
  }

  async put<Response>(
    url: string,
    body: any,
    options?: Omit<Options, 'body'> | undefined
  ) {
    return await this.request<Response>('PUT', url, { ...options, body });
  }

  async delete(
    url: string,
    body: any,
    options?: Omit<Options, 'body'> | undefined
  ) {
    return await this.request('DELETE', url, { ...options, body });
  }
}

export default BaseApi;
