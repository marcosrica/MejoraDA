import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "http://10.77.95.246:8080",
  realm: "master",
  clientId: "frontend",
});

export async function initKeycloak() {
  return keycloak.init({
    onLoad: 'check-sso',
    pkceMethod: "S256",
    checkLoginIframe: false,
  });
}