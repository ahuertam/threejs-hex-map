import MapView from '../../src/MapView';
import { loadJSON } from '../../src/util';
import { TextureAtlas, isMountain, isWater, TileData } from '../../src/interfaces';
import {generateRandomMap} from "../../src/map-generator"
import { varying } from './util';
import { TextureLoader } from 'three'
import { MapMeshOptions } from '../../src/MapMesh';

function asset(relativePath: string): string {
    return "../../assets/" + relativePath
}

async function loadTextureAtlas() {
    return loadJSON<TextureAtlas>(asset("land-atlas.json"))
}

async function generateMap(mapSize: number) {
    return generateRandomMap(mapSize, (q, r, height) => {
        const terrain = (height > 0.75 && "mountain") || varying("text1", "text2", "text3", "text4", "text5", "text6", "text7")
        const trees = !isMountain(height) && !isWater(height) && varying(true, false) ?
            Math.floor(Math.random()*2) : undefined
        return {q, r, height, terrain, treeIndex: trees,fog: false, clouds: false }
    })
}

export async function initView(mapSize: number, initialZoom: number): Promise<MapView> {
    const textureLoader = new TextureLoader()
    const loadTexture = (name: string) => textureLoader.load(asset(name))
    const options: MapMeshOptions = {
        terrainAtlas: null,
        terrainAtlasTexture: loadTexture("terrain.png"),
        hillsNormalTexture: loadTexture("hills-normal.png"),
        riverAtlasTexture: null,
        coastAtlasTexture: null,
        undiscoveredTexture: loadTexture("paper.jpg"),
        transitionTexture: loadTexture("transitions.png"),
        treeSpritesheet: loadTexture("rock111.png"),
        treeSpritesheetSubdivisions: 4
    }
    let [map, atlas] = await Promise.all([generateMap(mapSize), loadTextureAtlas()])
    options.terrainAtlas = atlas

    if ((<any>window).map == null || (<any>window).map == undefined) {
      (<any>window).map = map;
      localStorage.setItem('mapData', JSON.parse(JSON.stringify(map)));
      (<any>window).options = options
      //localStorage.setItem('options', JSON.stringify(options))
    }else {
      map = (<any>window).map;
    }
    let mapView = new MapView()
    mapView.zoom = initialZoom
    mapView.load(map, options)
    let controller:any = mapView.controller;
    controller.debugOutput = document.getElementById("coordinates") as HTMLElement
    mapView.onTileSelected = () => {
      // uncover tiles around initial selection
    }
    return mapView
}
