import Keycloak from "keycloak-js";
import ServerRoutes from "../../keys";


let routes:ServerRoutes = new ServerRoutes();

export const keycloak = new Keycloak({
  url: "hhtp://127.0.0.1:8080/auth/login",
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