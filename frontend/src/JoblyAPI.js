import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  /** Get all companies. */

  static async getCompanies(name) {
    const url = name ? `companies?name=${name}` : 'companies';
    let res = await this.request(url);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all jobs. */

  static async getJobs(title) {
    const url = title ? `jobs?title=${title}` : 'jobs';
    let res = await this.request(url);
    return res.jobs;
  }

  /** Add a new user. */

  static async addUser(user) {
    let res = await this.request('auth/register', user, 'post');
    return res.token;
  }

  /** Update an existing user. */

  static async updateUser(username, user) {
    let res = await this.request(`users/${username}`, user, 'patch');
    return res.user;
  }

  /** Login an exister user. */

  static async loginUser(user) {
    let res = await this.request('auth/token', user, 'post');
    return res.token;
  }

  /** Get user details. */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Apply a user for a job. */

  static async applyToJob(user, jobId) {
    let res = await this.request(
      `users/${user.username}/jobs/${jobId}`,
      user,
      'post'
    );
    return res;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' +
  'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' +
  'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

export default JoblyApi;
