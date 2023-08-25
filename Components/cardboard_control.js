import { Component, Type } from "@wonderlandengine/api";

const vec3 = glMatrix.vec3;
starttimer = false;
timer = 0;

export class Cardboard_control extends Component {
  static TypeName = "cardboard_control";
  static Properties = {
    speed: { type: Type.Float, default: 0.02 } /** Movement speed in m/s. */,
    starting_delay: {
      type: Type.Float,
      default: 0.5,
    } /** how much time should we wait after the press to start movement */,
    cardboard_camera: {
      type: Type.Object,
    } /** select the eyeleft or eyeright (vr cameras) for this */,
  };

  init() {
    this.click_event = false;

    /** important part :input sensing  */

    this.engine.onXRSessionStart.push((s) =>
      s.addEventListener("selectstart", this.press.bind(this))
    ); /** to listen to 'select start' event and exicute the funtion 'press' only after we enter vr session  */
    this.engine.onXRSessionStart.push((s) =>
      s.addEventListener("selectend", this.release.bind(this))
    ); /** to listen to select end event and exicute the funtion 'release' in vr session */
  }

  start() {
    this.cardboard_camera = this.cardboard_camera || this.object;
  }

  update(dt) {
    //increment the timer over time(dt) while starttimer is true (ie while click start)

    if (starttimer) {
      timer += dt;
    }

    /**enable movement when the the timer exceeds the starting delay */

    if (timer > this.starting_delay) {
      let direction = [0, 0, 0];
      if (this.click_event) direction[2] -= 1.0;
      vec3.normalize(direction, direction);
      direction[2] *= this.speed;
      vec3.transformQuat(
        direction,
        direction,
        this.cardboard_camera.transformWorld
      );
      this.object.translate(direction);
    }
  }

  press(e) {
    navigator.vibrate(200); // vibration to detect press event (optional)
    starttimer = true; // timer starts

    /**switches the click_event flag (to true)*/
    this.click_event = true;
  }

  release(e) {
    starttimer = false; //timer stops
    timer = 0; //timer resets

    /**switches the click_event flag (to false) */
    this.click_event = false;
  }
}
