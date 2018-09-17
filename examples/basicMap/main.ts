import { initView } from "view"
import { initInput } from "input"
import { paramInt, paramFloat } from './util';
import { qrRange, range } from '../../src/util';
import MapView from "../../src/MapView";

const mapSize = paramInt("size", 20)
const zoom = paramFloat("zoom", 20)
var json

async function init() {
    const mapView = await initView(mapSize, zoom)
    initInput(mapView)
    // map loading
    function handleFileSelect(evt) {
    	var files = evt.target.files; // FileList object
    	// files is a FileList of File objects. List some properties.
      }

    document.getElementById('loadFile').addEventListener('change', handleFileSelect, false);
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
          var map =  JSON.stringify(json));
          console.log(map);
          //mapView.load(map, window.options);
        } catch (ex) {
					alert('ex when trying to parse json = ' + ex);
				}
			}
		})(f);
		reader.readAsText(f);
	}
}
document.getElementById('loadFile').addEventListener('change', handleFileSelect, false);

function replaceTexture(mapView: MapView, name: string, image: File) {
    const img = document.createElement("img")
    img.onload = () => {
        console.log("Replacing texture " + name + "...")
        const texture = new THREE.Texture(img)
        mapView.mapMesh.replaceTextures({[name]: texture})
    }

    const reader = new FileReader()
    reader.onload = (e: any) => {
        img.src = e.target.result
    }

    reader.readAsDataURL(image)
}

init()
