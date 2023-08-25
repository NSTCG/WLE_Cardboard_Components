import {Component, Type} from "@wonderlandengine/api";
import {vec3} from "gl-matrix";

/**
 * Controls the camera through touch movements on mobile devices.
 *
 * Efficiently implemented to affect object orientation only
 * when the touch moves.
 */
export class TouchLook extends Component {
	static TypeName = "touch-look";
	static Properties = {
		/** Touch look sensitivity */
		sensitity: {type: Type.Float, default: 0.01},
		/** Enable or disable the mobile look feature */
		enabled: {type: Type.Bool, default: true},
		/** Define which half of the screen enables the mobile look ('left' or 'right') */
		enabledHalf: {type: Type.String, default: "right"},
	};

	init() {
		this.currentRotationY = 0;
		this.currentRotationX = 0;
		this.rotationX = 0;
		this.rotationY = 0;
		this.lastTouchX = 0;
		this.lastTouchY = 0;
		this.origin = vec3.create();
		this.parentOrigin = vec3.create();
	}

	start() {
		const canvas = this.engine.canvas;

		// Helper function to handle touch movement
		const handleTouchMove = (e) => {
			if (this.active && this.enabled) {
				const touch = e.touches[0];
				if (touch) {
					if (this.lastTouchX !== 0 && this.lastTouchY !== 0) {
						const halfScreenWidth = canvas.clientWidth / 2;
						const touchX = touch.clientX;

						// Only process touch events on the specified half of the screen
						if (
							(this.enabledHalf === "left" &&
								touchX < halfScreenWidth) ||
							(this.enabledHalf === "right" &&
								touchX >= halfScreenWidth)
						) {
							// Calculate touch movement since the last touch event
							this.rotationY =
								-(touch.clientX - this.lastTouchX) *
								this.sensitity;
							this.rotationX =
								-(touch.clientY - this.lastTouchY) *
								this.sensitity;

							this.currentRotationX += this.rotationX;
							this.currentRotationY += this.rotationY;

							/* 1.507 = PI/2 = 90° */
							this.currentRotationX = Math.min(
								1.507,
								this.currentRotationX,
							);
							this.currentRotationX = Math.max(
								-1.507,
								this.currentRotationX,
							);

							this.object.getTranslationWorld(this.origin);

							const parent = this.object.parent;
							if (parent !== null) {
								parent.getTranslationWorld(this.parentOrigin);
								vec3.subtract(
									this.origin,
									this.origin,
									this.parentOrigin,
								);
							}

							this.object.resetTranslationRotation();
							this.object.rotateAxisAngleRad(
								[1, 0, 0],
								this.currentRotationX,
							);
							this.object.rotateAxisAngleRad(
								[0, 1, 0],
								this.currentRotationY,
							);
							this.object.translate(this.origin);
						}
					}

					this.lastTouchX = touch.clientX;
					this.lastTouchY = touch.clientY;
				}
			}
		};

		const handleTouchEnd = () => {
			// Reset touch movement variables when touch ends
			this.lastTouchX = 0;
			this.lastTouchY = 0;
		};

		// Touch event listeners
		canvas.addEventListener("touchmove", handleTouchMove);
		canvas.addEventListener("touchend", handleTouchEnd);
	}
}
