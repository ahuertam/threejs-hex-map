import { initView } from "view"
import { initInput } from "input"
import { paramInt, paramFloat } from './util';
import MapView from "../../src/MapView";
import Grid from '../../src/Grid';

const mapSize = paramInt("size", 20)
const zoom = paramFloat("zoom", 20)
var map

async function init() {
    const mapView = await initView(mapSize, zoom)
    initInput(mapView)
    // map loading
    function handleFileSelect(evt:any) {
    	var files = evt.target.files; // FileList object
      console.log(files);
    	// files is a FileList of File objects. List some properties.
      }

    document.getElementById('loadFile').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(evt:any) {
	var files = evt.target.files; // FileList object

	// files is a FileList of File objects. List some properties.
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e:any) {
				try {
					map = JSON.parse((e.target).result)
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

function replaceMap(mapToChange:any) {
  let mapGrid = new Grid(mapToChange._width, mapToChange._height);
  let mapGridGenerated = mapGrid.init(mapToChange.data);
  (<any>window).mapView.load(mapGridGenerated, (<any>window).options);
}

init()
