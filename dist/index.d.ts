import { Application } from 'pixi.js';
import { BitmapText } from 'pixi.js';
import { Component } from 'empress-core';
import { ComponentFilter } from 'empress-core';
import { ComponentType } from 'empress-core';
import { Container } from 'pixi.js';
import { DeferredPromise } from 'empress-core';
import { DisplayObject } from 'pixi.js';
import { EmpressCore } from 'empress-core';
import { Entity } from 'empress-core';
import { ExecutionController } from 'empress-core';
import { Group } from '@pixi/layers';
import { IBitmapTextStyle } from 'pixi.js';
import { IEntity } from 'empress-core';
import { IEvent } from 'pixi-spine';
import { ITextStyle } from 'pixi.js';
import { ITrackEntry } from 'pixi-spine';
import { LifeCycle } from 'empress-core';
import { NineSlicePlane } from 'pixi.js';
import { ObservablePoint } from 'pixi.js';
import * as particles from '@pixi/particle-emitter';
import { Polygon } from 'pixi.js';
import { Signal } from 'empress-core';
import { Spine } from 'pixi-spine';
import { Sprite } from 'pixi.js';
import { Stage } from '@pixi/layers';
import { Text as Text_2 } from 'pixi.js';

declare class Action {
    tag: number;
    protected originalTarget: Object | null;
    protected target: Object | null;
    clone(): Action;
    isDone(): boolean;
    startWithTarget(target: any): void;
    stop(): void;
    step(dt: number): void;
    update(dt: number): void;
    getTarget(): Object | null;
    setTarget(target: Object): void;
    getOriginalTarget(): Object | null;
    setOriginalTarget(originalTarget: any): void;
    reverse(): Action | null;
    retain(): void;
    release(): void;
}

declare class ActionInterval extends FiniteTimeAction {
    protected MAX_VALUE: number;
    protected _elapsed: number;
    protected _firstTick: boolean;
    protected _easeList: Function[];
    protected _speed: number;
    protected _repeatForever: boolean;
    _repeatMethod: boolean;
    protected _speedMethod: boolean;
    constructor(d?: number);
    getElapsed(): number;
    initWithDuration(d: number): boolean;
    isDone(): boolean;
    clone(): ActionInterval;
    easing(easeObj: any): ActionInterval;
    step(dt: number): void;
    startWithTarget(target: any): void;
    reverse(): ActionInterval;
    setAmplitudeRate(amp: any): void;
    getAmplitudeRate(): number;
    speed(speed: number): Action;
    getSpeed(): number;
    setSpeed(speed: number): ActionInterval;
    repeat(times: number): ActionInterval;
    repeatForever(): ActionInterval;
    cloneDecoration(action: ActionInterval): void;
    reverseEaseList(action: ActionInterval): void;
    computeEaseTime(dt: any): any;
}

declare class ActionManager {
    private _hashTargets;
    private _arrayTargets;
    private _currentTarget;
    private _elementPool;
    addAction(action: Action, target: Object, paused: boolean): void;
    removeAllActions(): void;
    removeAllActionsFromTarget(target: Object): void;
    removeAction(action: Action): void;
    _removeActionByTag(tag: number, element: any, target?: Object): void;
    _removeAllActionsByTag(tag: number, element: any, target?: Object): void;
    removeActionByTag(tag: number, target?: Object): void;
    removeAllActionsByTag(tag: number, target?: Object): void;
    getActionByTag(tag: number, target: Object): Action | null;
    getNumberOfRunningActionsInTarget(target: Object): number;
    pauseTarget(target: Object): void;
    resumeTarget(target: Object): void;
    pauseAllRunningActions(): Array<any>;
    resumeTargets(targetsToResume: Array<any>): void;
    pauseTargets(targetsToPause: Array<any>): void;
    private _removeActionAtIndex;
    update(dt: number): void;
    private _getElement;
    private _putElement;
    private _deleteHashElement;
    private _isActionInternal;
}

declare type AllowedNames<Base, Type> = FlagExcludedType<Base, Type>[keyof Base];

export declare class Asset implements IExternalResolvableAsset {
    private _name;
    data: IAssetData<any>[];
    status: AssetStatus;
    get name(): string;
    get loaded(): Promise<IAsset>;
    get resolve(): (value: IAsset) => void;
    private _resolve;
    private _loaded;
    constructor(_name: string);
    getAssetByName<T>(asset: string | IAssetConfig): IAssetData<T> | undefined;
}

export declare class AssetsManager implements IAssetsManager {
    list: Map<string, IExternalResolvableAsset>;
    add(name: string): void;
    updateOnLoad(name: string, assets: IAssetData<any>[]): void;
    getBundle(assetConfig: string | IAssetConfig): IAsset | undefined;
    getAsset<T>(assetConfig: string | IAssetConfig): IAssetData<T> | undefined;
    hasAsset<T>(assetConfig: string | IAssetConfig): boolean;
    private findParentBundle;
}

export declare enum AssetStatus {
    Pending = "Pending",
    Loaded = "Loaded"
}

declare type ConstructorType<T> = OmitType<T, Function>;

export declare class EmpressPixiCore extends EmpressCore {
    connectRender(pixi: Application, parent: HTMLDivElement): void;
    init(): void;
    private update;
    private appendToDOM;
    private connectDebugger;
    private initializeDependencies;
    private createStage;
    private createRootView;
}

export declare type EntityFactory = (view: Container) => IEntity;

export declare class EventGuard {
    static pointerCancel(data: IInteraction, name: string): () => boolean;
    static pointerDown(data: IInteraction, name: string): () => boolean;
    static pointerEnter(data: IInteraction, name: string): () => boolean;
    static pointerLeave(data: IInteraction, name: string): () => boolean;
    static pointerMove(data: IInteraction, name: string): () => boolean;
    static globalPointerMove(data: IInteraction, name: string): () => boolean;
    static pointerOut(data: IInteraction, name: string): () => boolean;
    static pointerOver(data: IInteraction, name: string): () => boolean;
    static pointerTap(data: IInteraction, name: string): () => boolean;
    static pointerUp(data: IInteraction, name: string): () => boolean;
    static pointerUpOutside(data: IInteraction, name: string): () => boolean;
    static mouseDown(data: IInteraction, name: string): () => boolean;
    static mouseEnter(data: IInteraction, name: string): () => boolean;
    static mouseLeave(data: IInteraction, name: string): () => boolean;
    static mouseMove(data: IInteraction, name: string): () => boolean;
    static globalMouseMove(data: IInteraction, name: string): () => boolean;
    static mouseOut(data: IInteraction, name: string): () => boolean;
    static mouseOver(data: IInteraction, name: string): () => boolean;
    static mouseUp(data: IInteraction, name: string): () => boolean;
    static mouseUpOutside(data: IInteraction, name: string): () => boolean;
    static click(data: IInteraction, name: string): () => boolean;
    static touchCancel(data: IInteraction, name: string): () => boolean;
    static touchEnd(data: IInteraction, name: string): () => boolean;
    static touchEndOutside(data: IInteraction, name: string): () => boolean;
    static touchMove(data: IInteraction, name: string): () => boolean;
    static globalTouchMove(data: IInteraction, name: string): () => boolean;
    static touchStart(data: IInteraction, name: string): () => boolean;
    static tap(data: IInteraction, name: string): () => boolean;
    static wheel(data: IInteraction, name: string): () => boolean;
    static rightClick(data: IInteraction, name: string): () => boolean;
    static rightDown(data: IInteraction, name: string): () => boolean;
    static rightUp(data: IInteraction, name: string): () => boolean;
    static rightUpOutside(data: IInteraction, name: string): () => boolean;
}

declare class FiniteTimeAction extends Action {
    _duration: number;
    _timesForRepeat: number;
    getDuration(): number;
    setDuration(duration: number): void;
    clone(): FiniteTimeAction;
}

declare type FlagExcludedType<Base, Type> = {
    [Key in keyof Base]: Base[Key] extends Type ? never : Key;
};

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
export declare class FlowController {
    private _lifecycle;
    private _executionController;
    private _spineController;
    private _paused;
    private _gameSpeed;
    /**
     * @description is game paused
     */
    get paused(): boolean;
    /**
     * @description game speed multiplier
     */
    get gameSpeed(): number;
    constructor(_lifecycle: LifeCycle, _executionController: ExecutionController, _spineController: SpineController);
    /**
     * @description pause all game logic - Systems, UpdateLoop and Spine.
     */
    pause(): void;
    /**
     * @description resume all game logic - Systems, UpdateLoop and Spine.
     */
    resume(): void;
    /**
     * @description set game speed - UpdateLoop and Spine.
     */
    setGameSpeed(speed: number): void;
}

export declare interface IAliasedResolution {
    width: number;
    height: number;
    alias: string;
}

export declare interface IAnchorable {
    anchor?: IVec2;
}

export declare interface IAsset {
    status: AssetStatus;
    data: IAssetData<any>[];
    name: string;
    loaded: Promise<IAsset>;
    getAssetByName<T>(asset: string | IAssetConfig): IAssetData<T> | undefined;
}

export declare interface IAssetable {
    asset: string | IAssetConfig;
}

export declare interface IAssetConfig {
    bundle: string;
    name: string;
}

export declare interface IAssetData<T> {
    name: string;
    bundle: string;
    asset: T;
}

export declare interface IAssetsManager {
    list: Map<string, IExternalResolvableAsset>;
    add(name: string): void;
    updateOnLoad(name: string, assets: IAssetData<any>[]): void;
    getBundle(assetConfig: string | IAssetConfig): IAsset | undefined;
    getAsset<T>(assetConfig: string | IAssetConfig): IAssetData<T> | undefined;
    hasAsset<T>(assetConfig: string | IAssetConfig): boolean;
}

export declare interface IBitmapTextOptions extends IDisplayObjectOptions, IAnchorable {
    type: ViewType<BitmapText>;
    text: string;
    bitmapTextStyle: IBitmapTextStyle;
    tint?: number;
}

export declare interface IBuilderBehaviour<T extends IDisplayObjectOptions> {
    create(options: T): Container;
}

export declare interface IBundle {
    name: string;
    assets: IBundleAsset[];
}

export declare interface IBundleAsset {
    name: string;
    srcs: string | string[];
}

export declare interface IContainerOptions extends IDisplayObjectOptions {
    type: ViewType<Container>;
    enableSort?: boolean;
}

export declare interface IDisplayObjectOptions {
    type: ViewType;
    name: string;
    entity?: IEntityOptions;
    interactiveChildren?: boolean;
    interactive?: IInteractivityOptions;
    hitArea?: Polygon;
    parentGroup?: string;
    zIndex?: number;
    zOrder?: number;
    visible?: boolean;
    position?: IVec2;
    relativePosition?: IVec2;
    pivot?: IVec2;
    scale?: IVec2;
    alpha?: number;
    rotation?: number;
    angle?: number;
    width?: number;
    height?: number;
    children?: TreeNode[];
    mask?: IMaskOptions;
    interactiveChild?: boolean;
    debugBorder?: boolean;
    debugBorderColor?: number;
    debugBorderWidth?: number;
    sortableChildren?: boolean;
}

export declare interface IEntityOptions {
    storage?: string[];
    instance?: EntityFactory;
    components?: Component[];
}

export declare interface IExternalResolvableAsset extends IAsset {
    resolve: (value: IAsset) => void;
}

export declare interface IInteraction {
    type: PixiEventType;
    view: Container;
    entity: IEntity | null;
}

export declare interface IInteractivityOptions {
    eventMode?: PixiEventMode;
    cursor?: string;
    emit: PixiEventType[];
}

export declare interface ILayerOptions {
    name: string;
    order?: number;
    sortable?: boolean;
}

export declare interface ILayers {
    setStage(stage: Stage): void;
    createGroups(name: string, order: number, sortable: boolean): void;
    getGroup(name: string): Group | undefined;
    setLayer(name: string, node: Container): void;
    setOrder(node: Container, zOrder: number): void;
    sort(name: string): void;
    sortAll(): void;
}

export declare interface ILoader {
    dimension: string;
    init(config: ILoaderConfig): Promise<void>;
    loadBundle(name: string): Promise<void>;
}

export declare interface ILoaderConfig {
    manifest: IManifest;
    resolutions: IAliasedResolution[];
    ignoreFormats?: string[];
}

export declare interface IManifest {
    bundles: IBundle[];
}

export declare interface IMaskOptions {
    type: 'rect' | 'circle';
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
    color?: number;
    isDebug?: boolean;
}

export declare interface INineSliceOptions extends IDisplayObjectOptions, IAssetable {
    type: ViewType<NineSlicePlane>;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    tint?: number;
}

export declare interface IParticleEmitter {
    createParticleEmitter(name: string, parent: Container, config: any): particles.Emitter;
    update(dt: number): void;
    emit(name: string): void;
    emitAll(): void;
}

export declare interface IPoolItemFactory<T> {
    create(): T;
    reset(item: T): void;
}

export declare interface IPoolsController {
    create<T>(name: string, factory: new () => IPoolItemFactory<T>, size: number, dynamic?: boolean): ObjectPool<T>;
    get<T>(name: string): ObjectPool<T>;
}

export declare interface IScene {
    init(parent: Container): Container;
    destroy(): void;
}

export declare interface ISpineChain {
    current: ISpineChainItem | null;
    promises: DeferredPromise<any>[];
    add(spine: Spine, name: string, options: ISpineChainOptions): ISpineChain;
    play(): Promise<any>;
    stop(isForceStop: boolean): void;
    multiplyTimeScale(timeScaleMultiplier: number): void;
    increaseTimeScale(timescaleModifier: number): void;
    decreaseTimeScale(timescaleModifier: number): void;
    pause(): void;
    resume(): void;
}

export declare interface ISpineChainItem {
    spine: Spine;
    name: string;
    options: ISpineChainOptions;
    deferredPromise: DeferredPromise<any>;
}

export declare interface ISpineChainOptions {
    loopCount?: number;
    timeScale?: number;
    start?(entry: ITrackEntry): void;
    interrupt?(entry: ITrackEntry): void;
    end?(entry: ITrackEntry): void;
    dispose?(entry: ITrackEntry): void;
    complete?(entry: ITrackEntry): void;
    event?(entry: ITrackEntry, event: IEvent): void;
}

export declare interface ISpineController {
    create(name: string): ISpineChain;
    get(name: string): ISpineChain | undefined;
    remove(name: string): void;
    removeAll(): void;
    multyplyTimeScaleAll(timeScaleMultiplier: number): void;
    multyplyTimeScale(name: string, timeScaleMultiplier: number): void;
    increaseTimeScaleAll(timescaleModifier: number): void;
    increaseTimeScale(name: string, timescaleModifier: number): void;
    decreaseTimeScaleAll(timescaleModifier: number): void;
    decreaseTimeScale(name: string, timescaleModifier: number): void;
    pauseAll(): void;
    pause(name: string): void;
    resumeAll(): void;
    resume(name: string): void;
    stopAll(isForceStop: boolean): void;
    stop(name: string, isForceStop: boolean): void;
}

export declare interface ISpineOptions extends IDisplayObjectOptions, IAssetable {
    type: ViewType<Spine>;
    key?: string;
    initialAnimation?: string;
    timeScale?: number;
    skin?: string;
    loop?: number;
}

export declare interface ISpineUtils {
    getDuration(spine: Spine, name: string): number;
    findSlotIndex(spine: Spine, name: string): number;
    findSlotByName(spine: Spine, name: string): Container;
    setSlotAlpha(spine: Spine, nameSlot: string, alpha: number): void;
    addToSlot(spine: Spine, slotName: string, child: Container): void;
    setSkin(spine: Spine, skinName: string): void;
}

export declare interface ISpriteOptions extends IDisplayObjectOptions, IAnchorable, IAssetable {
    type: ViewType<Sprite>;
    tint?: number;
}

export declare interface ITextOptions extends IDisplayObjectOptions, IAnchorable {
    type: ViewType<Text_2>;
    text: string;
    textStyle?: Partial<ITextStyle>;
}

export declare interface ITweenOption {
    easing?: TweenEasing | ((k: number) => number);
    progress?: (start: number, end: number, current: number, ratio: number) => number;
    onStart?: (target?: object) => void;
    onUpdate?: (target?: object, ratio?: number) => void;
    onComplete?: (target?: object) => void;
}

export declare interface IVec2 {
    x?: number;
    y?: number;
}

export declare interface IViewBuilder {
    create(options: TreeNode, parent?: Container): Container | undefined;
}

export declare interface IViewEntity {
    add(view: Container, entity: IEntity): void;
    get(view: Container): IEntity | null;
    getInChildren(view: Container): IEntity[];
    getInChildrenByFilter(view: Container, filter: ComponentFilter): IEntity[];
    getComponent<T extends Component>(view: Container, type: ComponentType<T>): T;
}

declare type KeyPartial<T, K extends keyof T> = {
    [P in K]?: T[P];
};

export declare class Layers implements ILayers {
    private _groups;
    private _layers;
    private _stage;
    setStage(stage: Stage): void;
    createGroups(name: string, order: number, sortable: boolean): void;
    getGroup(name: string): Group | undefined;
    setLayer(name: string, node: Container): void;
    setOrder(node: Container, zOrder: number): void;
    sort(name: string): void;
    sortAll(): void;
}

export declare class Loader implements ILoader {
    private _assetsManager;
    get dimension(): string;
    private _dimension;
    private _behaviours;
    constructor(_assetsManager: IAssetsManager);
    init(config: ILoaderConfig): Promise<void>;
    loadBundle(name: string): Promise<void>;
    private processBundle;
    private setupBehaviours;
    private closestDimension;
    private checkWebPSupport;
    private selectResolution;
    private selectWebp;
    private ignoreFormats;
}

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
export declare class NodeBuilder {
    private _config;
    constructor(config?: TreeNode);
    /**
     * @description
     * Создает корневую ноду указанного типа.
     *
     * @param type - тип Pixi-объекта.
     * @param name - имя ноды.
     */
    node(type: NodeType, name?: string): this;
    /**
     * @description
     * Создает корневую ноду из View.
     *
     * @param view - View, из которого создается конфигурация.
     */
    view(view: View): this;
    /**
     * @description
     * Создает корневую ноду из конфигурации.
     *
     * @param config - конфигурация ноды.
     */
    config(config: TreeNode): this;
    /**
     * @description
     * Устанавливает имя ноды.
     *
     * @param name - имя ноды.
     */
    name(name: string): this;
    /**
     * @description
     * Устанавливает позицию ноды.
     *
     * @param x - x-координата.
     * @param y - y-координата.
     */
    position(x: number, y: number): this;
    /**
     * @description
     * Устанавливает x-координату ноды.
     *
     * @param x - x-координата.
     */
    x(x: number): this;
    /**
     * @description
     * Устанавливает y-координату ноды.
     *
     * @param y - y-координата.
     */
    y(y: number): this;
    /**
     * @description
     * Устанавливает скейл ноды.
     *
     * @param x - x-координата.
     * @param y - y-координата.
     */
    scale(x: number, y: number): this;
    /**
     * @description
     * Устанавливает скейл ноды по x.
     *
     * @param x - x-координата.
     */
    scaleX(x: number): this;
    /**
     * @description
     * Устанавливает скейл ноды по y.
     *
     * @param y - y-координата.
     */
    scaleY(y: number): this;
    /**
     * @description
     * Устанавливает ширину ноды.
     *
     * @param width - ширина ноды.
     */
    width(width: number): this;
    /**
     * @description
     * Устанавливает высоту ноды.
     *
     * @param height - высота ноды.
     */
    height(height: number): this;
    /**
     * @description
     * Устанавливает ширину и высоту ноды.
     *
     * @param width - ширина ноды.
     * @param height - высота ноды.
     */
    size(width: number, height: number): this;
    /**
     * @description
     * Устанавливает центр ноды.
     *
     * @param x - x-координата.
     * @param y - y-координата.
     */
    pivot(x: number, y: number): this;
    /**
     * @description
     * Устанавливает видимость ноды.
     *
     * @param visible - видимость ноды.
     */
    visible(visible: boolean): this;
    /**
     * @description
     * Устанавливает прозрачность ноды.
     *
     * @param alpha - прозрачность ноды.
     */
    alpha(alpha: number): this;
    /**
     * @description
     * Устанавливает поворот ноды через свойство rotation.
     *
     * @param rotation - угол ноды.
     */
    rotation(rotation: number): this;
    /**
     * @description
     * Устанавливает поворот ноды через свойство angle.
     *
     * @param angle - угол ноды.
     */
    angle(angle: number): this;
    /**
     * @description
     * Устанавливает родительскую группу ноды для сортировки по слоям.
     *
     * @param group - группа ноды.
     */
    parentGroup(group: string): this;
    /**
     * @description
     * Устанавливает порядок ноды для сортировки по слоям.
     *
     * @param order - порядок ноды.
     */
    order(order: number): this;
    /**
     * @description
     * Устанавливает индекс ноды для сортировки в рамках родителя.
     *
     * @param zIndex - индекс ноды.
     */
    zIndex(zIndex: number): this;
    /**
     * @description
     * Устанавливает возможность сортировки дочерних нод.
     *
     * @param sortable - возможность сортировки дочерних нод.
     */
    sortable(sortable: boolean): this;
    /**
     * @description
     * Определяет будут ли дочерние ноды интерактивными.
     *
     * @param interactive - интерактивность дочерних нод.
     */
    interactiveChildren(interactive: boolean): this;
    /**
     * @description
     * Устанавливает режим обработки событий.
     *
     * @param eventMode - режим обработки событий.
     */
    eventMode(eventMode: PixiEventMode): this;
    /**
     * @description
     * Устанавливает типы событий, которые будут обрабатываться.
     *
     * @param eventType - типы событий.
     */
    eventType(eventType: PixiEventType): this;
    /**
     * @description
     * Устанавливает курсор при наведении на ноду.
     *
     * @param cursor - тип курсора.
     */
    cursor(cursor: string): this;
    /**
     * @description
     * Устанавливает опции интерактивности.
     *
     * @param interactive - опции интерактивности.
     */
    interactive(interactive: IInteractivityOptions): this;
    /**
     * @description
     * Устанавливает область, в которой будет обрабатываться событие.
     *
     * @param hitArea - опции области, в которой будет обрабатываться событие.
     */
    hitArea(hitArea: Polygon): this;
    /**
     * @description
     * Устанавливает маску для ноды.
     *
     * @param mask - опции маски для ноды.
     */
    mask(mask: IMaskOptions): this;
    /**
     * @description
     * Добавляет дочернюю ноду.
     *
     * @param callback - функция, которая настраивает дочернюю ноду.
     */
    addChild(callback: (child: NodeBuilder) => void): this;
    /**
     * @description
     * Находит дочернюю ноду по имени для переопределения её конфигурации.
     * Поиск происходит по первому уровню вложенности.
     *
     * @param name - имя дочерней ноды.
     * @param callback - функция, которая настраивает дочернюю ноду.
     */
    getChild(name: string, callback: (child: NodeBuilder) => void): this;
    /**
     * @description
     * Находит дочернюю ноду по имени для переопределения её конфигурации.
     * Поиск происходит по всему дереву вложенности.
     *
     * @param name - имя дочерней ноды.
     * @param callback - функция, которая настраивает дочернюю ноду.
     */
    getDeepChild(name: string, callback: (child: NodeBuilder) => void): this;
    /**
     * @description
     * Удаляет дочернюю ноду по имени из первого уровня вложенности.
     *
     * @param name - имя дочерней ноды.
     */
    removeChild(name: string): this;
    /**
     * @description
     * Удаляет дочернюю ноду по имени из любого уровня вложенности.
     *
     * @param name - имя дочерней ноды.
     */
    removeDeepChild(name: string): this;
    /**
     * @description
     * Устанавливает якорь для ноды.
     *
     * @param x - x-координата якоря.
     * @param y - y-координата якоря.
     */
    anchor(x: number, y: number): this;
    /**
     * @description
     * Устанавливает текстуру для ноды.
     *
     * @param texture - текстура.
     */
    texture(texture: string): this;
    /**
     * @description
     * Устанавливает цвет для ноды.
     *
     * @param tint - цвет.
     */
    tint(tint: number): this;
    /**
     * @description
     * Устанавливает текст для ноды.
     *
     * @param text - текст.
     */
    text(text: string): this;
    /**
     * @description
     * Устанавливает стиль текста для ноды.
     *
     * @param style - стиль текста.
     */
    textStyle(style: Partial<ITextStyle>): this;
    /**
     * @description
     * Устанавливает стиль текста для ноды.
     *
     * @param style - стиль текста.
     */
    bitmapTextStyle(style: IBitmapTextStyle): this;
    /**
     * @description
     * Устанавливает ассет для ноды.
     *
     * @param asset - ассет.
     */
    spine(asset: string): this;
    /**
     * @description
     * Устанавливает начальную анимацию для ноды.
     *
     * @param animation - начальная анимация.
     */
    initialAnimation(animation: string): this;
    /**
     * @description
     * Устанавливает скин для ноды.
     *
     * @param skin - скин.
     */
    skin(skin: string): this;
    /**
     * @description
     * Устанавливает количество повторений для ноды.
     *
     * @param loop - количество повторений.
     */
    loop(loop: number): this;
    /**
     * @description
     * Устанавливает скорость воспроизведения для ноды.
     *
     * @param timeScale - скорость воспроизведения.
     */
    timeScale(timeScale: number): this;
    /**
     * @description
     * Устанавливает параметры nine-slice для ноды.
     *
     * @param leftWidth - левая граница.
     * @param rightWidth - правая граница.
     * @param topHeight - верхняя граница.
     * @param bottomHeight - нижняя граница.
     */
    nineSlice(leftWidth: number, rightWidth: number, topHeight: number, bottomHeight: number): this;
    /**
     * @description
     * Добавляет компонент к ноде создавая Entity.
     *
     * @param component - компонент.
     */
    addComponent(component: Component): this;
    /**
     * @description
     * Удаляет компонент из ноды.
     *
     * @param type - тип компонента.
     */
    removeComponent<T extends Component>(type: ComponentType<T>): this;
    /**
     * @description
     * Создает конфигурацию ноды.
     *
     * @returns конфигурация ноды.
     */
    create(): TreeNode;
    private checkConfig;
    private checkChildren;
    private deepSearchChild;
    private deepRemoveChild;
    private isSprite;
    private isText;
    private isBitmapText;
    private isSpine;
    private isNineSlicePlane;
}

export declare type NodeType = ViewType<Container> | ViewType<Sprite> | ViewType<Text_2> | ViewType<BitmapText> | ViewType<Spine> | ViewType<NineSlicePlane>;

export declare class ObjectPool<T> {
    private _factory;
    private _size;
    private _dynamic?;
    get size(): number;
    get currentSize(): number;
    private _pool;
    constructor(_factory: IPoolItemFactory<T>, _size: number, _dynamic?: boolean | undefined);
    private intitialize;
    get(): T | undefined;
    release(item: T): void;
}

declare type OmitType<Base, Type> = KeyPartial<Base, AllowedNames<Base, Type>>;

export declare const OnElementInteractSignal: Signal<IInteraction>;

export declare const OnViewCreatedSignal: Signal<Container<DisplayObject>>;

export declare class ParticleEmitter implements IParticleEmitter {
    private _emitters;
    createParticleEmitter(name: string, parent: Container, config: any): particles.Emitter;
    update(dt: number): void;
    emit(name: string): void;
    emitAll(): void;
}

export declare class PixiEntity extends Entity {
    get active(): boolean;
    set active(value: boolean);
}

export declare type PixiEventMode = 'none' | 'passive' | 'auto' | 'static' | 'dynamic';

export declare type PixiEventType = 'pointercancel' | 'pointerdown' | 'pointerenter' | 'pointerleave' | 'pointermove' | 'globalpointermove' | 'pointerout' | 'pointerover' | 'pointertap' | 'pointerup' | 'pointerupoutside' | 'mousedown' | 'mouseenter' | 'mouseleave' | 'mousemove' | 'globalmousemove' | 'mouseout' | 'mouseover' | 'mouseup' | 'mouseupoutside' | 'click' | 'touchcancel' | 'touchend' | 'touchendoutside' | 'touchmove' | 'globaltouchmove' | 'touchstart' | 'tap' | 'wheel' | 'rightclick' | 'rightdown' | 'rightup' | 'rightupoutside';

export declare abstract class PixiItemPoolFactory<T extends Container> implements IPoolItemFactory<T> {
    protected config: TreeNode | null;
    protected createFromConfig(config: TreeNode): T;
    abstract create(): T;
    abstract reset(item: T): void;
}

export declare type PixiType<T extends DisplayObject> = new (...args: any[]) => T;

export declare class PoolsController implements IPoolsController {
    private _pools;
    create<T>(name: string, factory: new () => IPoolItemFactory<T>, size: number, dynamic?: boolean): ObjectPool<T>;
    get<T>(name: string): ObjectPool<T>;
}

/**
 * Сервис для управления префабами вьюх. Любая вьюха является префабом.
 * Поэтому не обязательно все префабы регистрировать и инстанциировать через
 * этот сервис. Можно использовать ViewBuilder напрямую. Однако, если View является
 * частью нашей библиотеки, которая будет ипспользоваться в других проектах
 * и мы понимаем, что нужно дать возможность подмены префаба внутри библиотеки,
 * то мы можем зарегистрировать свой префаб в этом сервисе для того, чтобы
 * пользователь мог подменить префаб внутри библиотеки.
 *
 * @class
 * @property {Map<PrefabTemplate<any>, PrefabTemplate<any>>} _prefabs - Карта префабов.
 * @property {ViewBuilder} _viewBuilder - Билдер для создания вьюх.
 */
export declare class PrefabService {
    private _viewBuilder;
    private _prefabs;
    constructor(_viewBuilder: ViewBuilder);
    /**
     * Регистрирует префаб в сервисе.
     *
     * @param {PrefabTemplate<any>} template - Префаб для регистрации.
     */
    register(template: PrefabTemplate<any>): void;
    /**
     * Заменяет зарегистрированный префаб на новый.
     *
     * @param {PrefabTemplate<any>} template - Префаб для замены.
     * @param {PrefabTemplate<any>} instance - Новый префаб.
     */
    replace(template: PrefabTemplate<any>, instance: PrefabTemplate<any>): void;
    /**
     * Получает зарегистрированный префаб.
     *
     * @param {PrefabTemplate<any>} template - Префаб для получения.
     * @returns {PrefabTemplate<any>} Зарегистрированный префаб.
     */
    get<T extends View>(template: PrefabTemplate<T>): PrefabTemplate<T>;
    /**
     * Создает вьюху на основе зарегистрированного префаба.
     *
     * @param {View} instance - Префаб для создания.
     * @param {Container} parent - Родительский контейнер для вьюхи.
     * @returns {Container} Созданная вьюха.
     */
    create<T extends Container>(instance: View, parent?: Container): T;
}

export declare type PrefabTemplate<T extends View> = new (...args: any[]) => T;

export declare abstract class Scene implements IScene {
    private _viewBuilder;
    private _view;
    constructor(_viewBuilder: ViewBuilder);
    init(parent: Container): Container;
    destroy(): void;
    protected abstract setup(): TreeNode;
}

export declare class SceneController {
    private _pixi;
    private _viewBuilder;
    private _layers;
    private _currentScene;
    constructor(_pixi: Application, _viewBuilder: ViewBuilder, _layers: Layers);
    setScene<T extends IScene>(scene: SceneType<T>): void;
    addLayer(layer: ILayerOptions): void;
    setShared(config: TreeNode): void;
    removeFromShared(name: string): void;
}

export declare type SceneType<T extends IScene> = new (...args: any[]) => T;

declare class SpineChain implements ISpineChain {
    private _name;
    private _spineController;
    get current(): ISpineChainItem | null;
    get promises(): DeferredPromise<any>[];
    private _timescaleModifier;
    private _timeScaleMiltiplier;
    private _chain;
    private _curent;
    private _listener;
    private _originalTimeScale;
    constructor(_name: string, _spineController: SpineController);
    add(spine: Spine, name: string, options?: ISpineChainOptions): ISpineChain;
    play(): Promise<any>;
    stop(isForceStop?: boolean): void;
    multiplyTimeScale(timeScaleMultiplier: number): void;
    increaseTimeScale(timescaleModifier: number): void;
    decreaseTimeScale(timescaleModifier: number): void;
    pause(): void;
    resume(): void;
    private setListener;
    private clear;
}

export declare class SpineController implements ISpineController {
    private _chains;
    private get _spineChains();
    create(name: string): SpineChain;
    get(name: string): ISpineChain | undefined;
    remove(name: string): void;
    removeAll(): void;
    multyplyTimeScaleAll(timeScaleMultiplier: number): void;
    multyplyTimeScale(name: string, timeScaleMultiplier: number): void;
    increaseTimeScaleAll(timescaleModifier: number): void;
    increaseTimeScale(name: string, timescaleModifier: number): void;
    decreaseTimeScaleAll(timescaleModifier: number): void;
    decreaseTimeScale(name: string, timescaleModifier: number): void;
    pauseAll(): void;
    pause(name: string): void;
    resumeAll(): void;
    resume(name: string): void;
    stopAll(isForceStop?: boolean): void;
    stop(name: string, isForceStop?: boolean): void;
}

export declare class SpineUtils implements ISpineUtils {
    getDuration(spine: Spine, name: string): number;
    findSlotIndex(spine: Spine, name: string): number;
    findSlotByName(spine: Spine, name: string): Container;
    setSlotAlpha(spine: Spine, nameSlot: string, alpha: number): void;
    addToSlot(spine: Spine, slotName: string, child: Container): void;
    setSkin(spine: Spine, skinName: string): void;
}

export declare type TreeNode = IContainerOptions | ISpriteOptions | ITextOptions | IBitmapTextOptions | ISpineOptions | INineSliceOptions;

export declare class Tween<T> {
    set tag(value: number);
    private _actions;
    private _finalAction;
    private _target;
    private _tag;
    constructor(target?: T | null);
    then(other: Tween<T>): Tween<T>;
    target(target: T): Tween<T | undefined>;
    start(): Tween<T>;
    stop(): Tween<T>;
    clone(target: T): Tween<T>;
    union(): Tween<T>;
    to(duration: number, props: ConstructorType<T>, opts?: ITweenOption): Tween<T>;
    from(duration: number, props: ConstructorType<T>, opts?: ITweenOption): Tween<T>;
    set(props: ConstructorType<T>): Tween<T>;
    delay(duration: number): Tween<T>;
    call(callback: Function): Tween<T>;
    sequence(...args: Tween<T>[]): Tween<T>;
    parallel(...args: Tween<T>[]): Tween<T>;
    repeat(repeatTimes: number, embedTween?: Tween<T>): Tween<T>;
    repeatForever(embedTween?: Tween<T>): Tween<T>;
    reverseTime(embedTween?: Tween<T>): Tween<T>;
    static stopAll(): void;
    static stopAllByTag(tag: number, target?: object): void;
    static stopAllByTarget(target?: object): void;
    private _union;
    private static readonly _tmp_args;
    private static _wrappedSequence;
    private static _wrappedParallel;
}

export declare class TweenAction extends ActionInterval {
    private _opts;
    private _props;
    private _originProps;
    constructor(duration: number, props: any, opts?: ITweenOption);
    clone(): TweenAction;
    startWithTarget(target: Record<string, unknown>): void;
    update(t: number): void;
    progress(start: number, end: number, current: number, t: number): number;
}

declare type TweenEasing = 'linear' | 'smooth' | 'fade' | 'constant' | 'quadIn' | 'quadOut' | 'quadInOut' | 'quadOutIn' | 'cubicIn' | 'cubicOut' | 'cubicInOut' | 'cubicOutIn' | 'quartIn' | 'quartOut' | 'quartInOut' | 'quartOutIn' | 'quintIn' | 'quintOut' | 'quintInOut' | 'quintOutIn' | 'sineIn' | 'sineOut' | 'sineInOut' | 'sineOutIn' | 'expoIn' | 'expoOut' | 'expoInOut' | 'expoOutIn' | 'circIn' | 'circOut' | 'circInOut' | 'circOutIn' | 'elasticIn' | 'elasticOut' | 'elasticInOut' | 'elasticOutIn' | 'backIn' | 'backOut' | 'backInOut' | 'backOutIn' | 'bounceIn' | 'bounceOut' | 'bounceInOut' | 'bounceOutIn';

export declare class TweenSystem {
    private static _instance;
    static get instance(): TweenSystem;
    get ActionManager(): ActionManager;
    private readonly actionMgr;
    update(dt: number): void;
}

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
export declare abstract class View {
    protected _builder: NodeBuilder;
    constructor(config?: TreeNode);
    /**
     * @description
     * Метод для настройки конфигурации ноды.
     *
     * @param root билдер для настройки конфигурации ноды.
     */
    abstract setup(root: NodeBuilder): void;
    /**
     * @description
     * Создает конфигурацию ноды.
     *
     * @returns конфигурация ноды.
     */
    create(): TreeNode;
}

export declare class ViewBuilder implements IViewBuilder {
    private _assetsManager;
    private _behaviours;
    constructor(_assetsManager: IAssetsManager);
    create(options: TreeNode, parent?: Container): Container | undefined;
    private setupBehaviours;
    private createChildren;
    private loadLazyAsset;
}

export declare class ViewEntity implements IViewEntity {
    private _list;
    add(view: Container, entity: IEntity): void;
    get(view: Container): IEntity | null;
    getInChildren(view: Container): IEntity[];
    getInChildrenByFilter(view: Container, filter: ComponentFilter): IEntity[];
    getComponent<T extends Component>(view: Container, type: ComponentType<T>): T;
}

export declare type ViewType<T extends DisplayObject = DisplayObject> = new (...args: any[]) => T;

export declare type WithAnchor<T extends Container> = T & {
    anchor: ObservablePoint;
};

export { }
