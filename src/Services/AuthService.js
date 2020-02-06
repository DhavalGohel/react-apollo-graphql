import { clientId, clientSecret } from "../Config";
export const getParamsFromUrl = key => {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
};
export default class AuthService {
  login(code) {
    const params = new FormData();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("code", code);
    return fetch(`https://github.com/login/oauth/access_token`, {
      method: "post",
      body: params,
      headers: {
        accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => data)
      .catch(e => e);
  }
}
