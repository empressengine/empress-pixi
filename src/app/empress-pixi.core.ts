import { EmpressCore, ServiceContainer, LifeCycle, ExecutionController } from 'empress-core';
import { Application, Container } from 'pixi.js';
import * as PixiLayers from '@pixi/layers';

import { Layers } from '@core/layers';
import { Loader } from '@core/loader';
import { ParticleEmitter } from '@core/particle-emitter';
import { ViewBuilder } from '@core/view-builder';
import { AssetsManager } from '@data/assets-manager';
import { ViewEntity } from '@data/view-entity';
import { PoolsController } from '@features/object-pool';
import { SpineController, SpineUtils } from '@features/spine-controller';
import { TweenSystem } from '@features/tween';
import { SceneController } from '@core/scene';
import { FlowController } from '@features/flow-controller';
import { PrefabService } from '@features/prefab-service';

export class EmpressPixiCore extends EmpressCore  {

    public connectRender(pixi: Application, parent: HTMLDivElement): void {
        this.registerGlobalServices([{ provide: Application, useFactory: () => pixi }]);

        this.appendToDOM(pixi, parent);
        this.connectDebugger(pixi);
    }

    public init(): void {
        super.init();

        const pixi = ServiceContainer.instance.get(Application);

        this.initializeDependencies(pixi);

        const lifecycle = ServiceContainer.instance.get(LifeCycle);
        const particles = ServiceContainer.instance.get(ParticleEmitter);

        this.createStage(pixi);
        this.createRootView('Scene', pixi);
        this.createRootView('Shared', pixi);

        lifecycle.addUpdateCallback(dt => this.update(dt, particles));
    }

    private update(deltaTime: number, particles: ParticleEmitter): void {
        particles.update(deltaTime);
        TweenSystem.instance.update(deltaTime);
    }

    private appendToDOM(app: Application, parent: HTMLDivElement): void {
        parent.appendChild(app.view as any);
    }

    private connectDebugger(app: Application): void {
        //@ts-ignore
        globalThis.__PIXI_APP__ = app;
    }

    private initializeDependencies(app: Application): void {
        const assetsManager = new AssetsManager();
        const viewBuilder = new ViewBuilder(assetsManager);
        const prefabService = new PrefabService(viewBuilder);
        const viewEntity = new ViewEntity();
        const loader = new Loader(assetsManager);
        const layers = new Layers();
        const particles = new ParticleEmitter();
        const spineController = new SpineController();
        const spineUtils = new SpineUtils();
        const pools = new PoolsController();
        const sceneController = new SceneController(app, viewBuilder, layers);

        const updateLoop = ServiceContainer.instance.get(LifeCycle);
        const executionController = ServiceContainer.instance.get(ExecutionController);
        const flowController = new FlowController(updateLoop, executionController, spineController);

        this.registerGlobalServices([
            { provide: AssetsManager, useFactory: () => assetsManager }, 
            { provide: ViewBuilder, useFactory: () => viewBuilder },
            { provide: PrefabService, useFactory: () => prefabService },
            { provide: ViewEntity, useFactory: () => viewEntity },
            { provide: Loader, useFactory: () => loader },
            { provide: Layers, useFactory: () => layers },
            { provide: ParticleEmitter, useFactory: () => particles },
            { provide: SpineController, useFactory: () => spineController },
            { provide: SpineUtils, useFactory: () => spineUtils },
            { provide: PoolsController, useFactory: () => pools },
            { provide: SceneController, useFactory: () => sceneController },
            { provide: FlowController, useFactory: () => flowController }
        ]);
    }

    private createStage(pixi: Application): void {
        const layers = ServiceContainer.instance.get(Layers);
        
        const stage = new PixiLayers.Stage();
        stage.sortableChildren = true;

        pixi.stage = stage;
        pixi.stage.x = pixi.view.width / 2;
        pixi.stage.y = pixi.view.height / 2;

        layers.setStage(stage);
        layers.sortAll();
    }

    private createRootView(name: string, pixi: Application): void {
        const container = new Container();
        container.name = name;
        pixi.stage.addChild(container);
    }
}
