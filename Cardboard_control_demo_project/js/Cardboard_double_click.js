import { Component, Type } from "@wonderlandengine/api";

export class Double_click extends Component {
  static TypeName = "Double_click";
  static Properties = {
    secondTapDelay: { type: Type.Float, default: 1.0 },
  };

  init() {
    this.starttimer = false;
    this.timer = 0;
    /** to listen to 'select start' event and exicute the funtion 'press' only after we enter vr session  */
    this.engine.onXRSessionStart.push((s) =>
      s.addEventListener("selectstart", this.press.bind(this))
    );
  }

  start() {
    this.rotateflag = false;
  }

  update(dt) {
    if ((this.starttimer = true)) {
      this.timer += dt;
    }
    this.rotate();
  }

  press() {
    starttimer = true;
    if (this.timer < this.secondTapDelay) {
      /** Replace with your funtion **/
      this.setRotateFlag();
    } else {
      this.timer = 0;
    }
  }

  setRotateFlag() {
    this.rotateflag = !this.rotateflag;
  }

  rotate() {
    if (this.rotateflag == true) {
      this.object.rotateAxisAngleDeg([0, 1, 0], dt * 90);
    }
  }
}
