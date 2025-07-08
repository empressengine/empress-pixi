import { IInteraction } from "../models";

export class EventGuard {

    public static pointerCancel(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'pointercancel' && data.view.name === name;
    }

    public static pointerDown(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'pointerdown' && data.view.name === name;
    }

    public static pointerEnter(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'pointerenter' && data.view.name === name;
    }

    public static pointerLeave(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'pointerleave' && data.view.name === name;
    }

    public static pointerMove(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'pointermove' && data.view.name === name;
    }

    public static globalPointerMove(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'globalpointermove' && data.view.name === name;
    }

    public static pointerOut(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'pointerout' && data.view.name === name;
    }

    public static pointerOver(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'pointerover' && data.view.name === name;
    }

    public static pointerTap(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'pointertap' && data.view.name === name;
    }

    public static pointerUp(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'pointerup' && data.view.name === name;
    }

    public static pointerUpOutside(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'pointerupoutside' && data.view.name === name;
    }

    public static mouseDown(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'mousedown' && data.view.name === name;
    }

    public static mouseEnter(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'mouseenter' && data.view.name === name;
    }

    public static mouseLeave(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'mouseleave' && data.view.name === name;
    }

    public static mouseMove(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'mousemove' && data.view.name === name;
    }

    public static globalMouseMove(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'globalmousemove' && data.view.name === name;
    }

    public static mouseOut(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'mouseout' && data.view.name === name;
    }

    public static mouseOver(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'mouseover' && data.view.name === name;
    }

    public static mouseUp(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'mouseup' && data.view.name === name;
    }

    public static mouseUpOutside(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'mouseupoutside' && data.view.name === name;
    }

    public static click(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'click' && data.view.name === name;
    }

    public static touchCancel(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'touchcancel' && data.view.name === name;
    }

    public static touchEnd(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'touchend' && data.view.name === name;
    }

    public static touchEndOutside(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'touchendoutside' && data.view.name === name;
    }

    public static touchMove(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'touchmove' && data.view.name === name;
    }

    public static globalTouchMove(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'globaltouchmove' && data.view.name === name;
    }

    public static touchStart(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'touchstart' && data.view.name === name;
    }

    public static tap(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'tap' && data.view.name === name;
    }

    public static wheel(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'wheel' && data.view.name === name;
    }

    public static rightClick(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'rightclick' && data.view.name === name;
    }

    public static rightDown(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'rightdown' && data.view.name === name;
    }

    public static rightUp(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'rightup' && data.view.name === name;
    }

    public static rightUpOutside(data: IInteraction, name: string): () => boolean {
        return () => data.type === 'rightupoutside' && data.view.name === name;
    }
}