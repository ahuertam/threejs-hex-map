module.exports = {
    entry: "./lib/src/index.js",
    output: {
        path: __dirname + "/dist/",
        filename: "gl-threejs-hex-map.js",
        library: "gl-threejs-hex-map",
        libraryTarget: "amd"
    },
    externals: {
        "three": "three"
    }
}
