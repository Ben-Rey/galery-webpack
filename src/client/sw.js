import "./service_worker/install.js";
import "./service_worker/activate.js";
import "./service_worker/fetch.js";
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST || []);

