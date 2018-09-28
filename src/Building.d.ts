
import { Object3D, Texture, Mesh } from "three";
export default class Building extends Object3D {
    private _texture;
    constructor(texture: Texture);
    getMesh(): Mesh;
    private createGeometry;
    private createMaterial;
}
