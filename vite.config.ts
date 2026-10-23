import { defineConfig, type Plugin } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

import { githubRepositories } from './server/github-repositories-plugin';

/**
 * The first screen is a static lock screen styled inline in index.html, so it
 * can paint from the HTML alone. This plugin moves the entry script and the
 * main stylesheet out of the head into a tiny loader that requests them — with
 * the wallpaper and the Inter preload — once that screen has painted, leaving
 * the HTML as the only dependency of the first (and largest) paint.
 * `src/main.tsx` waits for the stylesheet before React replaces the static
 * screen, so unstyled markup never paints.
 */
function deferAppAssetsUntilFirstPaint(): Plugin {
  return {
    name: 'defer-app-assets-until-first-paint',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const scripts: string[] = [];
        const stylesheets: string[] = [];
        const stripped = html
          .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>\s*/g, (_, src) => {
            scripts.push(src);
            return '';
          })
          .replace(/<link rel="stylesheet" crossorigin href="([^"]+)">\s*/g, (_, href) => {
            stylesheets.push(href);
            return '';
          });
        // Assets start once the static lock screen has painted. A timer backs
        // up the paint observer (unsupported browsers, background tabs).
        const loader =
          '<script>(function(){var started=false;function start(){if(started)return;started=true;' +
          "var lock=document.querySelector('.static-lock');if(lock)lock.classList.add('has-wallpaper');" +
          "if(!/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent)){var font=document.createElement('link');font.rel='preload';font.as='font';font.type='font/woff2';font.crossOrigin='';font.href='/fonts/inter-latin-variable.woff2';document.head.appendChild(font);}" +
          `${JSON.stringify(stylesheets)}.forEach(function(href){var link=document.createElement('link');link.rel='stylesheet';link.crossOrigin='';link.href=href;link.setAttribute('data-app-stylesheet','');document.head.appendChild(link);});` +
          `${JSON.stringify(scripts)}.forEach(function(src){var script=document.createElement('script');script.type='module';script.crossOrigin='';script.src=src;document.head.appendChild(script);});` +
          "}try{new PerformanceObserver(function(list){if(list.getEntriesByName('first-contentful-paint').length)setTimeout(start,0);}).observe({type:'paint',buffered:true});}catch(error){}" +
          'setTimeout(start,400);})();</script>';
        return stripped.replace('</body>', `${loader}\n  </body>`);
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    deferAppAssetsUntilFirstPaint(),
    githubRepositories(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
