import "./service_worker/install.js";
import "./service_worker/activate.js";
import "./service_worker/fetch.js";

const cacheName = "galerie-v1";

import { precacheAndRoute } from 'workbox-precaching';
precacheAndRoute(self.__WB_MANIFEST || []);


