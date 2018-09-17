var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "view", "input", "./util"], function (require, exports, view_1, input_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mapSize = util_1.paramInt("size", 20);
    var zoom = util_1.paramFloat("zoom", 20);
    var json;
    function init() {
        return __awaiter(this, void 0, void 0, function () {
            // map loading
            function handleFileSelect(evt) {
                var files = evt.target.files; // FileList object
                // files is a FileList of File objects. List some properties.
            }
            var mapView;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, view_1.initView(mapSize, zoom)];
                    case 1:
                        mapView = _a.sent();
                        input_1.initInput(mapView);
                        document.getElementById('loadFile').addEventListener('change', handleFileSelect, false);
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    try {
                        json = JSON.parse(e.target.result);
                        // alert('json global var has been set to parsed json of this file here it is unevaled = \n' + JSON.stringify(json));
                        var map = JSON.stringify(json);
                        console.log(map);
                        //mapView.load(map, window.options);
                    }
                    catch (ex) {
                        alert('ex when trying to parse json = ' + ex);
                    }
                };
            })(f);
            reader.readAsText(f);
        }
    }
    document.getElementById('loadFile').addEventListener('change', handleFileSelect, false);
    function replaceTexture(mapView, name, image) {
        var img = document.createElement("img");
        img.onload = function () {
            var _a;
            console.log("Replacing texture " + name + "...");
            var texture = new THREE.Texture(img);
            mapView.mapMesh.replaceTextures((_a = {}, _a[name] = texture, _a));
        };
        var reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(image);
    }
    init();
});
//# sourceMappingURL=main.js.map