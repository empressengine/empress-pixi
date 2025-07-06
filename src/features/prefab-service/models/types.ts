import { View } from "@core/view-builder";

export type PrefabTemplate<T extends View> = new (...args: any[]) => T;