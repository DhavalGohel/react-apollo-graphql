import { clientId, clientSecret } from "../Config";
export const getParamsFromUrl = key => {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
};
export default class AuthService {
  login(code) {
    const params = {
      client_id: clientId,
      client_secret: clientSecret,
      code: code
    };
    console.log(params);
    fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: new Headers(),
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(e => {
        console.error(e);
      });
  }
}
