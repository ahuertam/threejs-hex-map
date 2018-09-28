import {TileData} from "./interfaces";
import {Object3D, Texture, Points, PointsMaterial, BoxGeometry, Vector3, Color,
    MeshPhongMaterial, Mesh} from "three"
import Grid from "./Grid";
import {range, flatten, flatMap} from "./util";
import {qrToWorld} from "./coords";
import {randomPointOnCoastTile, waterAdjacency} from "./map-generator";

export default class Building extends Object3D {
    private _texture: Texture

    constructor(texture: Texture) {
        super()

        this._texture = texture
    }

    public getMesh(){
      return new Mesh(this.createGeometry(), this.createMaterial())
    }

    private createGeometry(): BoxGeometry {
        const geometry = new BoxGeometry(1,1,1)

        return geometry
    }

    private createMaterial(){
      return new MeshPhongMaterial({color:Math.random()*0xffffff, map:this._texture})
    }

}
