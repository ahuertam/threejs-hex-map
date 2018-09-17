import { initView } from "view"
import { initInput } from "input"
import { paramInt, paramFloat } from './util';
import { qrRange, range } from '../../src/util';
import MapView from "../../src/MapView";
import Grid from '../../src/Grid';

const mapSize = paramInt("size", 20)
const zoom = paramFloat("zoom", 20)
var map

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
					map = JSON.parse(JSON.stringify(e.target.result))

          //mapView.load(map, window.options);
          replaceMap(map)
        } catch (ex) {
					alert('ex when trying to parse json = ' + ex);
				}
			}
		})(f);
		reader.readAsText(f);
	}
}
document.getElementById('loadFile').addEventListener('change', handleFileSelect, false);

function replaceMap(mapToChange) {
  const mapView = new MapView()
  mapView.zoom = 20
  mapToChange = JSON.parse(mapToChange)
  // console.log(JSON.parse(JSON.stringify(mapToChange)))
  let mapGrid = new Grid(mapToChange.map._width,mapToChange.map._height)

  let mapGridGenerated = mapGrid.init(mapToChange.map.data)
  mapView.load(mapGridGenerated, window.options)

  // mapView.load(mapToChange, window.options);
}

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
