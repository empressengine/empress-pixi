import { ViewType } from "@shared/view-builder";
import { Spine } from "pixi-spine";
import { BitmapText, Container, NineSlicePlane, Sprite, Text } from "pixi.js";

export type NodeType = 
    ViewType<Container> | 
    ViewType<Sprite> | 
    ViewType<Text> | 
    ViewType<BitmapText> | 
    ViewType<Spine> | 
    ViewType<NineSlicePlane>;