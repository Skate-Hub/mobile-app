import 'dotenv/config';

const gerarVersionCode = () => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');

  const ano = now.getFullYear();
  const mes = pad(now.getMonth() + 1);
  const dia = pad(now.getDate());
  const hora = pad(now.getHours());
  const minuto = pad(now.getMinutes());

  
  return parseInt(`${ano}${mes}${dia}${hora}${minuto}`);
};

export default {
  expo: {
    name: "Meu App",
    slug: "meu-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    android: {
      versionCode: gerarVersionCode(),
      package: "com.marc3code.skatenotes"
    },
    extra: {
      apiUrl: process.env.API_URL
    }
  }
};
