import {vec3} from "gl-matrix";
import {Component, Type} from "@wonderlandengine/api";

const _direction = new Float32Array(3);

/**
 * Basic movement with touch events on the left half of the screen.
 */
export class Joystick extends Component {
	static TypeName = "joystick";
	static Properties = {
		/** Movement speed in m/s. */
		speed: {type: Type.Float, default: 0.1},
		/** Flag for only moving the object on the global x & z planes */
		lockY: {type: Type.Bool, default: false},
		/** Object of which the orientation is used to determine forward direction */
		headObject: {type: Type.Object},
	};

	init() {
		this.touchStartX = 0;
		this.touchStartY = 0;
		this.isTouching = false;
		this.movementX = 0;
		this.movementY = 0;

		const canvas = this.engine.canvas;
		canvas.addEventListener("touchstart", this.handleTouchStart.bind(this));
		canvas.addEventListener("touchmove", this.handleTouchMove.bind(this));
		canvas.addEventListener("touchend", this.handleTouchEnd.bind(this));
	}

	start() {
		this.headObject = this.headObject || this.object;
	}

	update() {
		if (this.isTouching) {
			const sensitivity = 0.01; // Adjust the sensitivity based on your preference
			this.movementX *= sensitivity;
			this.movementY *= sensitivity;

			vec3.set(_direction, this.movementX, 0, this.movementY); // Adjusted for right and left movements

			vec3.scale(_direction, _direction, this.speed);
			vec3.transformQuat(
				_direction,
				_direction,
				this.headObject.transformWorld,
			);

			if (this.lockY) {
				_direction[1] = 0;
				vec3.normalize(_direction, _direction);
				vec3.scale(_direction, _direction, this.speed);
			}

			this.object.translateLocal(_direction);
		}
	}

	handleTouchStart(event) {
		const touch = event.touches[0];
		if (touch.clientX <= window.innerWidth / 2) {
			this.touchStartX = touch.clientX;
			this.touchStartY = touch.clientY;
			this.isTouching = true;
		}
	}

	handleTouchMove(event) {
		const touch = event.touches[0];
		if (this.isTouching) {
			const movementX = touch.clientX - this.touchStartX;
			const movementY = touch.clientY - this.touchStartY;
			this.movementX = movementX;
			this.movementY = movementY;
		}
	}

	handleTouchEnd() {
		this.isTouching = false;
		this.movementX = 0;
		this.movementY = 0;
	}
}
