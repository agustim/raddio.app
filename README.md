# raddio.app (kntc version)



## Build

1. Creem el Next.js
```
npx create-next-app raddio.app-kntc
✔ Would you like to use TypeScript? … No
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … No
✔ Would you like to customize the default import alias? … No
...
```

2. Preparem el Next.js

Afegir les caracteristiques estàtique a ```next.config.js```:
```
  output: 'export',
  swcMinify: true,
  images: {
    unoptimized: true
  }
```
Amb output: 'export', ens generarà el directori out amb una versió estàtica.

3. Instal·lem konsta

```
npm install konsta
```
4. Preparem konsta

Modifiquem el fitxer ```tailwind.config.js``` perquè agafi konsta:
```
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,javascript,tsx}',
    './components/**/*.{js,ts,javascript,tsx}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
```

Preparem Next perquè agafi konsta, editem ```pages/app.js```

```
import { App } from 'konsta/react';
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
};

```

5. Compilem una versió estàtica:
Afegir export a ```next.config.js```

```
  output: 'export'
```
Quan fem build, genera un directori ```out```

```
npm run build
```

6. Instal·lar capacitor

```
npm install -D @capacitor/cli
npx cap init --web-dir out lofi.moai app.raddio
```

7. Instal·lar dispositus
Android:
```
npm install @capacitor/android
npx cap add android
```
Ios:
```
npm install @capacitor/ios
npx cap add ios
```

8. Compliar per dispositius
```
export CAPACITOR_ANDROID_STUDIO_PATH=/opt/android-studio/bin/studio.sh
npm run static && npx cap sync && npx cap copy && npx cap open android

```