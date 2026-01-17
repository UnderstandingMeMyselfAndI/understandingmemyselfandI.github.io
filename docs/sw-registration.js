// This file is replaced by vite-plugin-pwa's auto-registration.
// For more control, you can use the 'virtual:pwa-register' module.
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content is available, do you want to reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App is ready to work offline.');
  },
});
