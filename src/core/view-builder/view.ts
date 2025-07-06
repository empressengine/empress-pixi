import { TreeNode } from "@shared/view-builder";
import { NodeBuilder } from "./node-builder";

/**
 * @description
 * Базовый класс для создания конфигураций нод объектов PIXI.
 * 
 * @example
 * 
 * ```typescript
 * class SimpleView extends View {
 *     public setup(root: NodeBuilder): void {
 *         root
 *             .node(Container, 'simple__view')
 *             .addChild((child) => {
 *                 child
 *                     .node(Container, 'simple__view_child')
 *                     .position(0, 0)
 *                     .addChild((child) => {
 *                         child
 *                             .node(Container, 'simple__view_child_child')
 *                             .scale(2, 2)
 *                     });
 *     }
 * }
 * ```
 */
export abstract class View {
    protected _builder!: NodeBuilder;

    constructor(config?: TreeNode) {
        this._builder = new NodeBuilder(config);
    }

    /**
     * @description
     * Метод для настройки конфигурации ноды.
     * 
     * @param root билдер для настройки конфигурации ноды.
     */
    public abstract setup(root: NodeBuilder): void;

    /**
     * @description
     * Создает конфигурацию ноды.
     * 
     * @returns конфигурация ноды.
     */
    public create(): TreeNode {
        this.setup(this._builder);
        return this._builder.create();

    }
}