import { PixiEventType } from "@shared/view-builder";
import { IEntity } from "empress-core";
import { Container } from "pixi.js";

export interface IInteraction {
    type: PixiEventType;
    view: Container;
    entity: IEntity | null;
}