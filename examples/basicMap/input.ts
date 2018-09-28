import { KeyActions, KEY_CODES } from './util';
import MapView from '../../src/MapView';

const MAX_ZOOM_IN: number = 11.0;
const MAX_ZOOM_OUT: number = 33.0;

export function initInput(mapView: MapView) {
    const keyActions: KeyActions = {
        [KEY_CODES.LEFT_ARROW]: {
            down: () => mapView.scrollDir.x = -1,
            up: () => mapView.scrollDir.x = 0
        },
        [KEY_CODES.RIGHT_ARROW]: {
            down: () => mapView.scrollDir.x = 1,
            up: () => mapView.scrollDir.x = 0
        },
        [KEY_CODES.UP_ARROW]: {
            down: () => mapView.scrollDir.y = 1,
            up: () => mapView.scrollDir.y = 0
        },
        [KEY_CODES.DOWN_ARROW]: {
            down: () => mapView.scrollDir.y = -1,
            up: () => mapView.scrollDir.y = 0
        },
        [KEY_CODES.E]: {
            down: () => setBoundedZoom(mapView, mapView.getZoom() * 0.9)
        },
        [KEY_CODES.Q]: {
            down: () => setBoundedZoom(mapView, mapView.getZoom() * 1.1)
        },
        [KEY_CODES.W]: {
            down: () => mapView.rotateVector(((new THREE.Vector3(1, 0, 0)).normalize()),( 1 * Math.PI / 180))
        },
        [KEY_CODES.S]: {
            down: () => mapView.rotateVector(((new THREE.Vector3(1, 0, 0)).normalize()), (-1 * Math.PI / 180))
        },
        // [KEY_CODES.A]: {
        //       down: () => mapView.rotateVector(((new THREE.Vector3(0, 1, 0)).normalize()),( 1 * Math.PI / 180))
        // },
        // [KEY_CODES.D]: {
        //       down: () => mapView.rotateVector(((new THREE.Vector3(0, 1, 0)).normalize()), (-1 * Math.PI / 180))
        // },
        [KEY_CODES.O]: {
            down: () =>  mapView.createBuilding()
        },
        [KEY_CODES.G]: {
            down: () => mapView.mapMesh.showGrid = !mapView.mapMesh.showGrid
        }
    }

    window.addEventListener("keydown", (event: KeyboardEvent) => {
        const actions = keyActions[event.keyCode]

        if (actions && "down" in actions) {
            actions["down"]()
        }
    }, false)

    window.addEventListener("keyup", (event: KeyboardEvent) => {
        const actions = keyActions[event.keyCode]

        if (actions && "up" in actions) {
            actions["up"]()
        }
    }, false)

    window.addEventListener("mousewheel", onMouseWheelHandler(mapView), false)
    window.addEventListener("DOMMouseScroll", onMouseWheelHandler(mapView), false)
    window.addEventListener("DOMContentLoaded", loadData(mapView), false)
}
function loadData(mapView:MapView){
  return() => {
    (<any>window).mapView = mapView
    var modify = document.getElementById("modifyData");
    var load = document.getElementById("loadFile");
    var save = document.getElementById("saveFile");
    modify.addEventListener("click", modifyData, false);
    load.addEventListener("click", loadFile, false);
    save.addEventListener("click", saveFile, false);
  }
}
function loadFile(){

}
function saveFile(){
  let mapInfo = (<any>window).mapInfo
  mapInfo.data = mapInfo.toArray()
  saveDataToFile(mapInfo)
}
function saveDataToFile(mapData:any){
  var hiddenElement = document.createElement('a');
  var json = JSON.stringify(mapData, null, "\t"),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
  hiddenElement.href = url;
  hiddenElement.download = 'mapData.json';
  hiddenElement.click();
  window.URL.revokeObjectURL(url);
}
function modifyData() {
    let mapView = (<any>window).mapView;
    (<any>window).mapInfo = {
      _height: 8,
      _width: 8,
      halfHeight: 4,
      halfWidth: 4
    };
    (<any>window).options.treeSpritesheetSubdivisions = 1;
    mapView.load((<any>window).mapInfo, (<any>window).options);
}
function onMouseWheelHandler(mapView: MapView) {
    return (e: MouseWheelEvent) => {
        var delta = Math.max(-1, Math.min(1, (e.wheelDeltaY || e.detail)))
        if (delta == 0) return;
        const zoom = mapView.getZoom() * (1.0 - delta * 0.025)
        setBoundedZoom(mapView,zoom);
    }
}

function setBoundedZoom(mapView: MapView, zoom: number){
  let boundedZoom = Math.max(MAX_ZOOM_IN, Math.min(MAX_ZOOM_OUT,zoom))
  mapView.setZoom(boundedZoom);
}
