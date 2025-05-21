import "dotenv/config";


export default {
  expo: {
    name: "skatenotes",
    slug: "meu-app",
    owner: "skatenotes",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/e7d9b7d6-9083-46a5-9ad0-9ee3003cba68", 
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    assetBundlePatterns: ["**/*"],
    android: {
      versionCode: 1,
      package: "com.marc3code.skatenotes",
    },
    extra: {
      eas: {
        projectId: "e7d9b7d6-9083-46a5-9ad0-9ee3003cba68",
      },
    },
  },
};
