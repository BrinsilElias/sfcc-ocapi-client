import apiCall from '@utils/helpers/callApi';

class Site {
  constructor(httpClient) {
    this._type = 'Site';
    this._httpClient = httpClient;
  }

  /**
   * Retrieves details of the site.
   *
   * @returns {Promise<Object>} - The site data.
   */
  getSiteData = async () => {
    const url = '/site';
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method);
    return res.data;
  };
}

export default Site;
