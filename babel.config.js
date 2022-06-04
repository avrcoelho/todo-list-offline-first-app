module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
          development: process.env.NODE_ENV === "development",
          importSource: "@welldone-software/why-did-you-render",
        },
      ],
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
