define(["require", "exports", "./util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function initInput(mapView) {
        var _a;
        var keyActions = (_a = {},
            _a[util_1.KEY_CODES.LEFT_ARROW] = {
                down: function () { return mapView.scrollDir.x = -1; },
                up: function () { return mapView.scrollDir.x = 0; }
            },
            _a[util_1.KEY_CODES.RIGHT_ARROW] = {
                down: function () { return mapView.scrollDir.x = 1; },
                up: function () { return mapView.scrollDir.x = 0; }
            },
            _a[util_1.KEY_CODES.UP_ARROW] = {
                down: function () { return mapView.scrollDir.y = 1; },
                up: function () { return mapView.scrollDir.y = 0; }
            },
            _a[util_1.KEY_CODES.DOWN_ARROW] = {
                down: function () { return mapView.scrollDir.y = -1; },
                up: function () { return mapView.scrollDir.y = 0; }
            },
            _a[util_1.KEY_CODES.E] = {
                down: function () { return mapView.setZoom(mapView.getZoom() * 0.9); }
            },
            _a[util_1.KEY_CODES.A] = {
                down: function () { return mapView.rotateVector(((new THREE.Vector3(0, 1, 0)).normalize()), (1 * Math.PI / 180)); }
            },
            _a[util_1.KEY_CODES.W] = {
                down: function () { return mapView.rotateVector(((new THREE.Vector3(1, 0, 0)).normalize()), (1 * Math.PI / 180)); }
            },
            _a[util_1.KEY_CODES.S] = {
                down: function () { return mapView.rotateVector(((new THREE.Vector3(1, 0, 0)).normalize()), (-1 * Math.PI / 180)); }
            },
            _a[util_1.KEY_CODES.D] = {
                down: function () { return mapView.rotateVector(((new THREE.Vector3(0, 1, 0)).normalize()), (-1 * Math.PI / 180)); }
            },
            _a[util_1.KEY_CODES.Q] = {
                down: function () { return mapView.setZoom(mapView.getZoom() * 1.1); }
            },
            _a[util_1.KEY_CODES.O] = {
                down: function () { return mapView.addObject(); }
            },
            _a[util_1.KEY_CODES.G] = {
                down: function () { return mapView.mapMesh.showGrid = !mapView.mapMesh.showGrid; }
            },
            _a);
        window.addEventListener("keydown", function (event) {
            var actions = keyActions[event.keyCode];
            if (actions && "down" in actions) {
                actions["down"]();
            }
        }, false);
        window.addEventListener("keyup", function (event) {
            var actions = keyActions[event.keyCode];
            if (actions && "up" in actions) {
                actions["up"]();
            }
        }, false);
        window.addEventListener("mousewheel", onMouseWheelHandler(mapView), false);
        window.addEventListener("DOMMouseScroll", onMouseWheelHandler(mapView), false);
        window.addEventListener("DOMContentLoaded", loadData(mapView), false);
    }
    exports.initInput = initInput;
    function loadData(mapView) {
        window.mapView = mapView;
        var modify = document.getElementById("modifyData");
        var load = document.getElementById("loadFile");
        var save = document.getElementById("saveFile");
        modify.addEventListener("click", modifyData, false);
        load.addEventListener("click", loadFile, false);
        save.addEventListener("click", saveFile, false);
    }
    function loadFile() {
    }
    function saveFile() {
        var map = window.map;
        map.data = map.toArray();
        saveDataToFile(map);
    }
    function saveDataToFile(mapData) {
        var hiddenElement = document.createElement('a');
        var json = JSON.stringify(mapData, null, "\t"), blob = new Blob([json], { type: "octet/stream" }), url = window.URL.createObjectURL(blob);
        hiddenElement.href = url;
        hiddenElement.download = 'mapData.json';
        hiddenElement.click();
        window.URL.revokeObjectURL(url);
    }
    function modifyData() {
        // console.log(window.map)
        // console.log(window.options)
        // console.log(window.mapView)
        var mapView = window.mapView;
        window.map._height = 8;
        window.map._width = 8;
        window.map.halfHeight = 4;
        window.map.halfWidth = 4;
        window.options.treeSpritesheetSubdivisions = 1;
        mapView.load(window.map, window.options);
    }
    function onMouseWheelHandler(mapView) {
        return function (e) {
            var delta = Math.max(-1, Math.min(1, (e.wheelDeltaY || e.detail)));
            if (delta == 0)
                return;
            var zoom = Math.max(8.0, Math.min(500.0, mapView.getZoom() * (1.0 - delta * 0.025)));
            mapView.setZoom(zoom);
        };
    }
});
//# sourceMappingURL=input.js.map