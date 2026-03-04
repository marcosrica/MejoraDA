import './Colors.css';

import { createApp } from 'vue';
import App from './App.vue';
import { keycloak, initKeycloak } from './auth/keycloak.ts';
import router from './router/index.ts';

// Initialize Keycloak first
initKeycloak()
  .then((authenticated) => {
    console.log("Keycloak Init Success. Authenticated:", authenticated);
    mountApp();
  })
  .catch((err) => {
    console.error("Keycloak failed to initialize", err);
    // Mount anyway so you can at least see your UI and debug
    mountApp(); 
  });

function mountApp() {
  createApp(App)
    .provide("keycloak", keycloak)
    .use(router)
    .mount("#app");
}