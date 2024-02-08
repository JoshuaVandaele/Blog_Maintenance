module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.vue$": "@vue/vue3-jest",
        "^.+\\js$": "babel-jest",
        "^.+\\.ts$": "ts-jest", 
    },
    moduleFileExtensions: [
        'js',
        'json',
        'ts', // indique à Jest de gérer les fichiers `*.ts` (TypeScript)
        'vue', // indique à Jest de gérer les fichiers `*.vue`
      ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
    coverageReporters: ["text", "json-summary"],
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
}