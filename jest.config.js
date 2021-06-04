module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest/presets/js-with-ts",
  transform: {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        preprocess: true,
      },
    ],
  },
  moduleFileExtensions: ["js", "ts", "svelte"],
  setupFilesAfterEnv: ["./node_modules/@testing-library/jest-dom"],
}
