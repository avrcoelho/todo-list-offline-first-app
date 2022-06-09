import axios from 'axios';

import { HttpRequest, HttpResponse } from './models/httpClient';

export abstract class HttpClient {
  private readonly axiosInstance = axios.create({});

  protected getRequest<Response>({
    url,
    params,
    headers,
  }: HttpRequest): Promise<HttpResponse<Response>> {
    return this.axiosInstance({
      method: 'GET',
      url,
      params,
      headers,
    });
  }

  protected postRequest<Response>({
    url,
    params,
    headers = {},
    body,
  }: HttpRequest): Promise<HttpResponse<Response>> {
    return this.axiosInstance({
      method: 'POST',
      data: body,
      url,
      params,
      headers,
    });
  }

  protected putRequest<Response>({
    url,
    params,
    headers,
    body,
  }: HttpRequest): Promise<HttpResponse<Response>> {
    return this.axiosInstance({
      method: 'PUT',
      data: body,
      url,
      params,
      headers,
    });
  }

  protected deleteRequest<Response>({
    url,
    headers,
  }: HttpRequest): Promise<HttpResponse<Response>> {
    return this.axiosInstance({
      method: 'DELETE',
      url,
      headers,
    });
  }
}
