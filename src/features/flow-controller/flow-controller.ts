import { SpineController } from "@features/spine-controller";
import { LifeCycle, ExecutionController } from "empress-core";

/**
 * @description FlowController controls game flow - pause, resume and set game speed.
 * @example
 * ```typescript
 * const flowController = new FlowController(updateLoop, signalController, spineController);
 * flowController.pause(); // pause all game logic
 * flowController.resume(); // resume all game logic
 * flowController.setGameSpeed(2); // set game speed to 2
 * ```
 */
export class FlowController {

    private _paused: boolean = false;
    private _gameSpeed: number = 1;

    /**
     * @description is game paused
     */
    public get paused(): boolean {
        return this._paused;
    }

    /**
     * @description game speed multiplier
     */
    public get gameSpeed(): number {
        return this._gameSpeed;
    }

    constructor(
        private _lifecycle: LifeCycle,
        private _executionController: ExecutionController,
        private _spineController: SpineController,
    ) {}

    /**
     * @description pause all game logic - Systems, UpdateLoop and Spine.
     */
    public pause(): void {
        this._paused = true;
        this._lifecycle.pause(this._paused);
        this._executionController.pauseAll();
        this._spineController.pauseAll();
    }

    /**
     * @description resume all game logic - Systems, UpdateLoop and Spine.
     */
    public resume(): void {
        this._paused = false;
        this._lifecycle.pause(this._paused);
        this._executionController.resumeAll();
        this._spineController.resumeAll();
    }

    /**
     * @description set game speed - UpdateLoop and Spine.
     */
    public setGameSpeed(speed: number): void {
        this._gameSpeed = speed;

        this._lifecycle.setSpeedMultiplier(this._gameSpeed);
        this._spineController.multyplyTimeScaleAll(this._gameSpeed);
    }
}