import { Component, Type } from "@wonderlandengine/api";
import { vec3 } from "gl-matrix";

export class Set_boundary extends Component {
  static TypeName = "set_boundary";
  static Properties = {
    left_bound: { type: Type.Float, default: 7.0 },
    right_bound: { type: Type.Float, default: 7.0 },
    back_bound: { type: Type.Float, default: 7.0 },
    front_bound: { type: Type.Float, default: 7.0 },
    restrictY: { type: Type.Bool, default: true },
    height: { type: Type.Float, default: 1 },
  };

  update() {
    let position = vec3.create();
    this.object.getPositionWorld(position);

    //resetting the position of the player whenever it crosses the threshold

    if (position[2] > this.back_bound) position[2] = this.back_bound;
    this.object.setTranslationWorld(position);
    if (position[2] < -1 * this.front_bound)
      position[2] = -1 * this.front_bound;
    this.object.setTranslationWorld(position);
    if (position[0] > this.right_bound) position[0] = this.right_bound;
    this.object.setTranslationWorld(position);
    if (position[0] < -1 * this.left_bound) position[0] = -1 * this.left_bound;
    this.object.setTranslationWorld(position);

    //optional y restict option to clamp player in y axis ( ie no upward or downward movement)

    if (this.restrictY == true) {
      if (position[1] > this.height || position[1] < this.height)
        position[1] = this.height;
      this.object.setTranslationWorld(position);
    }
  }
}
