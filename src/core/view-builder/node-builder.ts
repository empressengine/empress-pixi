import { 
    IBitmapTextOptions, 
    IInteractivityOptions, 
    IMaskOptions, 
    INineSliceOptions, 
    ISpineOptions, 
    ISpriteOptions, 
    ITextOptions, 
    PixiEventMode,
    PixiEventType,
    TreeNode 
} from "@shared/view-builder";

import { 
    BitmapText, 
    IBitmapTextStyle, 
    ITextStyle, 
    NineSlicePlane, 
    Polygon, 
    Sprite, 
    Text 
} from "pixi.js";

import { NodeType } from "./models";
import { Spine } from "pixi-spine";
import { View } from "./view";
import { Component, ComponentType } from "empress-core";

/**
 * @description
 * Билдер для создания конфигураций Pixi-объектов.
 * Позволяет в fluent-стиле создавать такие Pixi-объекты как:
 * - Container
 * - Sprite
 * - Text
 * - NineSlicePlane
 * - Spine
 * - BitmapText
 * 
 * Также позволяет гибко переопределять и перенастраивать уже созданные конфигурации.
 * 
 * @example
 * 
 * ```typescript
 * const builder = new NodeBuilder();
 * 
 * builder
 *     .node(Container, 'test__node')
 *     .addChild((child) => {
 *         child
 *             .node(Container, 'test__node_child')
 *             .position(0, 0)
 *             .addChild((child) => {
 *                 child
 *                     .node(Container, 'test__node_child_child')
 *                     .scale(2, 2)
 *             })
 *     })
 *     .create();
 * ```
 */
export class NodeBuilder {

    private _config!: TreeNode;

    constructor(config?: TreeNode) {
        if (config) {
            this._config = config;
        }
    }

    // ============================= //
    //         CONTAINER             //
    // ============================= //

    /**
     * @description
     * Создает корневую ноду указанного типа.
     * 
     * @param type - тип Pixi-объекта.
     * @param name - имя ноды.
     */
    public node(type: NodeType, name: string = 'node'): this {
        if(!this._config) {
            this._config = {
                type,
                name,
            }
        } else {
            this._config.type = type;
        }

        return this;
    }

    /**
     * @description
     * Создает корневую ноду из View.
     * 
     * @param view - View, из которого создается конфигурация.
     */
    public view(view: View): this {
        this._config = view.create();
        return this;
    }

    /**
     * @description
     * Создает корневую ноду из конфигурации.
     * 
     * @param config - конфигурация ноды.
     */
    public config(config: TreeNode): this {
        this._config = config;
        return this;
    }

    /**
     * @description
     * Устанавливает имя ноды.
     * 
     * @param name - имя ноды.
     */
    public name(name: string): this {
        this.checkConfig();
        this._config.name = name;
        return this;
    }

    /**
     * @description
     * Устанавливает позицию ноды.
     * 
     * @param x - x-координата.
     * @param y - y-координата.
     */
    public position(x: number, y: number): this {
        this.checkConfig();
        this._config.position = { x, y };
        return this;
    }

    /**
     * @description
     * Устанавливает x-координату ноды.
     * 
     * @param x - x-координата.
     */
    public x(x: number): this {
        this.checkConfig();
        this._config.position = { x };
        return this;
    }

    /**
     * @description
     * Устанавливает y-координату ноды.
     * 
     * @param y - y-координата.
     */
    public y(y: number): this {
        this.checkConfig();
        this._config.position = { y };
        return this;
    }

    /**
     * @description
     * Устанавливает скейл ноды.
     * 
     * @param x - x-координата.
     * @param y - y-координата.
     */
    public scale(x: number, y: number): this {
        this.checkConfig();
        this._config.scale = { x, y };
        return this;
    }

    /**
     * @description
     * Устанавливает скейл ноды по x.
     * 
     * @param x - x-координата.
     */
    public scaleX(x: number): this {
        this.checkConfig();
        this._config.scale = { x };
        return this;
    }

    /**
     * @description
     * Устанавливает скейл ноды по y.
     * 
     * @param y - y-координата.
     */
    public scaleY(y: number): this {
        this.checkConfig();
        this._config.scale = { y };
        return this;
    }

    /**
     * @description
     * Устанавливает ширину ноды.
     * 
     * @param width - ширина ноды.
     */
    public width(width: number): this {
        this.checkConfig();
        this._config.width = width;
        return this;
    }

    /**
     * @description
     * Устанавливает высоту ноды.
     * 
     * @param height - высота ноды.
     */
    public height(height: number): this {
        this.checkConfig();
        this._config.height = height;
        return this;
    }

    /**
     * @description
     * Устанавливает ширину и высоту ноды.
     * 
     * @param width - ширина ноды.
     * @param height - высота ноды.
     */
    public size(width: number, height: number): this {
        this.checkConfig();
        this._config.width = width;
        this._config.height = height;
        return this;
    }

    /**
     * @description
     * Устанавливает центр ноды.
     * 
     * @param x - x-координата.
     * @param y - y-координата.
     */
    public pivot(x: number, y: number): this {
        this.checkConfig();
        this._config.pivot = { x, y };
        return this;
    }

    /**
     * @description
     * Устанавливает видимость ноды.
     * 
     * @param visible - видимость ноды.
     */
    public visible(visible: boolean): this {
        this.checkConfig();
        this._config.visible = visible;
        return this;
    }

    /**
     * @description
     * Устанавливает прозрачность ноды.
     * 
     * @param alpha - прозрачность ноды.
     */
    public alpha(alpha: number): this {
        this.checkConfig();
        this._config.alpha = alpha;
        return this;
    }

    /**
     * @description
     * Устанавливает поворот ноды через свойство rotation.
     * 
     * @param rotation - угол ноды.
     */
    public rotation(rotation: number): this {
        this.checkConfig();
        this._config.rotation = rotation;
        return this;
    }

    /**
     * @description
     * Устанавливает поворот ноды через свойство angle.
     * 
     * @param angle - угол ноды.
     */
    public angle(angle: number): this {
        this.checkConfig();
        this._config.angle = angle;
        return this;
    }

    /**
     * @description
     * Устанавливает родительскую группу ноды для сортировки по слоям.
     * 
     * @param group - группа ноды.
     */
    public parentGroup(group: string): this {
        this.checkConfig();
        this._config.parentGroup = group;
        return this;
    }

    /**
     * @description
     * Устанавливает порядок ноды для сортировки по слоям.
     * 
     * @param order - порядок ноды.
     */
    public order(order: number): this {
        this.checkConfig();
        this._config.zOrder = order;
        return this;
    }

    /**
     * @description
     * Устанавливает индекс ноды для сортировки в рамках родителя.
     * 
     * @param zIndex - индекс ноды.
     */
    public zIndex(zIndex: number): this {
        this.checkConfig();
        this._config.zIndex = zIndex;
        return this;
    }

    /**
     * @description
     * Устанавливает возможность сортировки дочерних нод.
     * 
     * @param sortable - возможность сортировки дочерних нод.
     */
    public sortable(sortable: boolean): this {
        this.checkConfig();
        this._config.sortableChildren = sortable;
        return this;
    }

    /**
     * @description
     * Определяет будут ли дочерние ноды интерактивными.
     * 
     * @param interactive - интерактивность дочерних нод.
     */
    public interactiveChildren(interactive: boolean): this {
        this.checkConfig();
        this._config.interactiveChildren = interactive;
        return this;
    }

    /**
     * @description
     * Устанавливает режим обработки событий.
     * 
     * @param eventMode - режим обработки событий.
     */
    public eventMode(eventMode: PixiEventMode): this {
        this.checkConfig();
        if(this._config.interactive) {
            this._config.interactive.eventMode = eventMode;
        } else {
            this._config.interactive = { eventMode, emit: [] };
        }
        return this;
    }

    /**
     * @description
     * Устанавливает типы событий, которые будут обрабатываться.
     * 
     * @param eventType - типы событий.
     */
    public eventType(eventType: PixiEventType): this {
        this.checkConfig();
        if(this._config.interactive) {
            this._config.interactive.emit.push(eventType);
        } else {
            this._config.interactive = { eventMode: 'none', emit: [eventType] };
        }
        return this;
    }

    /**
     * @description
     * Устанавливает курсор при наведении на ноду.
     * 
     * @param cursor - тип курсора.
     */
    public cursor(cursor: string): this {
        this.checkConfig();
        if(this._config.interactive) {
            this._config.interactive.cursor = cursor;
        } else {
            this._config.interactive = { cursor, emit: [], eventMode: 'none' };
        }
        return this;
    }

    /**
     * @description
     * Устанавливает опции интерактивности.
     * 
     * @param interactive - опции интерактивности.
     */
    public interactive(interactive: IInteractivityOptions): this {
        this.checkConfig();
        this._config.interactive = interactive;
        return this;
    }

    /**
     * @description
     * Устанавливает область, в которой будет обрабатываться событие.
     * 
     * @param hitArea - опции области, в которой будет обрабатываться событие.
     */
    public hitArea(hitArea: Polygon): this {
        this.checkConfig();
        this._config.hitArea = hitArea;
        return this;
    }

    /**
     * @description
     * Устанавливает маску для ноды.
     * 
     * @param mask - опции маски для ноды.
     */
    public mask(mask: IMaskOptions): this {
        this.checkConfig();
        this._config.mask = mask;
        return this;
    }

    /**
     * @description
     * Добавляет дочернюю ноду.
     * 
     * @param callback - функция, которая настраивает дочернюю ноду.
     */
    public addChild(callback: (child: NodeBuilder) => void) {
        this.checkConfig();
        this.checkChildren();
        const builder = new NodeBuilder();
        callback(builder);

        this._config.children?.push(builder.create());
        return this;
    }

    /**
     * @description
     * Находит дочернюю ноду по имени для переопределения её конфигурации.
     * Поиск происходит по первому уровню вложенности.
     * 
     * @param name - имя дочерней ноды.
     * @param callback - функция, которая настраивает дочернюю ноду.
     */
    public getChild(name: string, callback: (child: NodeBuilder) => void): this {
        this.checkConfig();
        this.checkChildren();

        const childConfig = this._config.children?.find((child) => child.name === name);
        if (!childConfig) {
            throw new Error(`Child with name ${name} not found`);
        }

        const builder = new NodeBuilder(childConfig);
        callback(builder);

        return this;
    }

    /**
     * @description
     * Находит дочернюю ноду по имени для переопределения её конфигурации.
     * Поиск происходит по всему дереву вложенности.
     * 
     * @param name - имя дочерней ноды.
     * @param callback - функция, которая настраивает дочернюю ноду.
     */
    public getDeepChild(name: string, callback: (child: NodeBuilder) => void): this {
        this.checkConfig();
        this.checkChildren();

        const childConfig = this.deepSearchChild(name);

        if (!childConfig) {
            throw new Error(`Child with name ${name} not found`);
        }

        const builder = new NodeBuilder(childConfig);
        callback(builder);

        return this;
    }

    /**
     * @description
     * Удаляет дочернюю ноду по имени из первого уровня вложенности.
     * 
     * @param name - имя дочерней ноды.
     */
    public removeChild(name: string): this {
        this.checkConfig();
        this.checkChildren();

        this._config.children = this._config.children?.filter((child) => child.name !== name);
        return this;
    }

    /**
     * @description
     * Удаляет дочернюю ноду по имени из любого уровня вложенности.
     * 
     * @param name - имя дочерней ноды.
     */
    public removeDeepChild(name: string): this {
        this.checkConfig();
        this.checkChildren();

        const isRemoved = this.deepRemoveChild(name, this._config.children || []);

        if (!isRemoved) {
            throw new Error(`Child with name ${name} not found`);
        }

        return this;
    }

    // ============================= //
    //            SPRITE             //
    // ============================= //

    /**
     * @description
     * Устанавливает якорь для ноды.
     * 
     * @param x - x-координата якоря.
     * @param y - y-координата якоря.
     */
    public anchor(x: number, y: number): this {
        this.checkConfig();

        if (this.isSprite(this._config) || this.isText(this._config)) {
            this._config.anchor = { x, y };
        } else {
            throw new Error('Anchor can only be set on Sprite or Text nodes');
        }

        return this;
    }

    /**
     * @description
     * Устанавливает текстуру для ноды.
     * 
     * @param texture - текстура.
     */
    public texture(texture: string): this {
        this.checkConfig();

        if (this.isSprite(this._config) || this.isNineSlicePlane(this._config)) {
            this._config.asset = texture;
        } else {
            throw new Error('Texture can only be set on Sprite or NineSlicePlane nodes');
        }

        return this;
    }

    /**
     * @description
     * Устанавливает цвет для ноды.
     * 
     * @param tint - цвет.
     */
    public tint(tint: number): this {
        this.checkConfig();

        if (this.isSprite(this._config) || this.isBitmapText(this._config) || this.isNineSlicePlane(this._config)) {
            this._config.tint = tint;
        } else {
            throw new Error('Tint can only be set on Sprite, BitmapText or NineSlicePlane nodes');
        }

        return this;
    }

    // ============================= //
    //            TEXT               //
    // ============================= //

    /**
     * @description
     * Устанавливает текст для ноды.
     * 
     * @param text - текст.
     */
    public text(text: string): this {
        this.checkConfig();

        if (this.isText(this._config)) {
            this._config.text = text;
        } else {
            throw new Error('Text can only be set on Text nodes');
        }

        return this;
    }

    /**
     * @description
     * Устанавливает стиль текста для ноды.
     * 
     * @param style - стиль текста.
     */
    public textStyle(style: Partial<ITextStyle>): this {
        this.checkConfig();

        if (this.isText(this._config)) {
            this._config.textStyle = style;
        } else {
            throw new Error('Text style can only be set on Text nodes');
        }

        return this;
    }

    /**
     * @description
     * Устанавливает стиль текста для ноды.
     * 
     * @param style - стиль текста.
     */
    public bitmapTextStyle(style: IBitmapTextStyle): this {
        this.checkConfig();

        if (this.isBitmapText(this._config)) {
            this._config.bitmapTextStyle = style;
        } else {
            throw new Error('Bitmap text style can only be set on BitmapText nodes');
        }

        return this;
    }

    // ============================= //
    //            SPINE              //
    // ============================= //

    /**
     * @description
     * Устанавливает ассет для ноды.
     * 
     * @param asset - ассет.
     */
    public spine(asset: string): this {
        this.checkConfig();

        if (this.isSpine(this._config)) {
            this._config.asset = asset;
        } else {
            throw new Error('Spine can only be set on Spine nodes');
        }

        return this;
    }

    /**
     * @description
     * Устанавливает начальную анимацию для ноды.
     * 
     * @param animation - начальная анимация.
     */
    public initialAnimation(animation: string): this {
        this.checkConfig();

        if (this.isSpine(this._config)) {
            this._config.initialAnimation = animation;
        } else {
            throw new Error('Initial animation can only be set on Spine nodes');
        }

        return this;
    }

    /**
     * @description
     * Устанавливает скин для ноды.
     * 
     * @param skin - скин.
     */
    public skin(skin: string): this {
        this.checkConfig();

        if (this.isSpine(this._config)) {
            this._config.skin = skin;
        } else {
            throw new Error('Skin can only be set on Spine nodes');
        }

        return this;
    }

    /**
     * @description
     * Устанавливает количество повторений для ноды.
     * 
     * @param loop - количество повторений.
     */
    public loop(loop: number): this {
        this.checkConfig();

        if (this.isSpine(this._config)) {
            this._config.loop = loop;
        } else {
            throw new Error('Loop can only be set on Spine nodes');
        }

        return this;
    }

    /**
     * @description
     * Устанавливает скорость воспроизведения для ноды.
     * 
     * @param timeScale - скорость воспроизведения.
     */
    public timeScale(timeScale: number): this {
        this.checkConfig();

        if (this.isSpine(this._config)) {
            this._config.timeScale = timeScale;
        } else {
            throw new Error('Time scale can only be set on Spine nodes');
        }

        return this;
    }

    // ============================= //
    //            NINE SLICE         //
    // ============================= //

    /**
     * @description
     * Устанавливает параметры nine-slice для ноды.
     * 
     * @param leftWidth - левая граница.
     * @param rightWidth - правая граница.
     * @param topHeight - верхняя граница.
     * @param bottomHeight - нижняя граница.
     */
    public nineSlice(leftWidth: number, rightWidth: number, topHeight: number, bottomHeight: number): this {
        this.checkConfig();

        if (this.isNineSlicePlane(this._config)) {
            this._config.leftWidth = leftWidth;
            this._config.rightWidth = rightWidth;
            this._config.topHeight = topHeight;
            this._config.bottomHeight = bottomHeight;
        } else {
            throw new Error('Nine slice can only be set on NineSlicePlane nodes');
        }

        return this;
    }

    // ============================= //
    //             ENTITY            //
    // ============================= //

    /**
     * @description
     * Добавляет компонент к ноде создавая Entity.
     * 
     * @param component - компонент.
     */
    public addComponent(component: Component): this {
        this.checkConfig();

        if(!this._config.entity) {
            this._config.entity = {
                components: []
            }
        }

        if(!this._config.entity.components) {
            this._config.entity.components = [];
        }

        this._config.entity.components.push(component);
        return this;
    }

    /**
     * @description
     * Удаляет компонент из ноды.
     * 
     * @param type - тип компонента.
     */
    public removeComponent<T extends Component>(type: ComponentType<T>): this {
        this.checkConfig();

        if(!this._config.entity) {
            this._config.entity = {
                components: []
            }
        }

        if(!this._config.entity.components) {
            this._config.entity.components = [];
        }

        const component = this._config.entity.components.findIndex((component) => component instanceof type);

        if (component) {
            this._config.entity.components = this._config.entity.components.filter((component) => component.constructor !== type);
        }

        return this;
    }

    /**
     * @description
     * Создает конфигурацию ноды.
     * 
     * @returns конфигурация ноды.
     */
    public create(): TreeNode {
        return this._config;
    }

    private checkConfig(): void {
        if (!this._config) {
            throw new Error('Config is not initialized');
        }
    }

    private checkChildren(): void {
        if (!this._config.children) {
            this._config.children = [];
        }
    }

    private deepSearchChild(name: string): TreeNode | undefined {
        const children = [...(this._config.children || [])];
        let childConfig: TreeNode | undefined;

        while(children.length > 0) {
            const item = children.shift();
            if(!item) continue;

            if(item.name === name) {
                childConfig = item;
                children.length = 0;
                break;
            }

            if(item.children) {
                children.push(...item.children);
            }
        }

        return childConfig;
    }

    private deepRemoveChild(name: string, children: TreeNode[]): boolean {
        for(let i = 0; i < children.length; i++) {
            const child = children[i];
            
            if(child.name === name) {
                children.splice(i, 1);
                return true;
            }

            if(child.children) {
                return this.deepRemoveChild(name, child.children);
            }
        }

        return false;
    }

    private isSprite(config: TreeNode): config is ISpriteOptions {
        return config.type === Sprite;
    }

    private isText(config: TreeNode): config is ITextOptions {
        return config.type === Text;
    }

    private isBitmapText(config: TreeNode): config is IBitmapTextOptions {
        return config.type === BitmapText;
    }

    private isSpine(config: TreeNode): config is ISpineOptions {
        return config.type === Spine;
    }

    private isNineSlicePlane(config: TreeNode): config is INineSliceOptions {
        return config.type === NineSlicePlane;
    }
}