import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import postcssNesting from 'postcss-nesting';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            manifest: {
                "name": "todo",
                "short_name": "todo",
                "start_url": "/",
                "icons": [{
                        "src": "./assets/icons/android-chrome-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png",
                    },
                    {
                        "src": "./assets/icons/android-chrome-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                    }
                ],
                "theme_color": "#000000",
                "background_color": "#ffffff",
                "display": "standalone",
                "orientation": "portrait"
            },
            workbox: {
                // workbox options for generateSW
            },
        })
    ],
    //样式表插件
    css: {
        postcss: {
            plugins: [
                autoprefixer,
                postcssNesting
            ]
        }
    }
})