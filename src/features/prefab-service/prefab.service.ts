import { Container } from "pixi.js";
import { View, ViewBuilder } from "@core/view-builder";
import { PrefabTemplate } from "./models";

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
export class PrefabService {
    private _prefabs: Map<PrefabTemplate<any>, PrefabTemplate<any>> = new Map();

    constructor(
        private _viewBuilder: ViewBuilder
    ) {}

    /**
     * Регистрирует префаб в сервисе.
     * 
     * @param {PrefabTemplate<any>} template - Префаб для регистрации.
     */
    public register(template: PrefabTemplate<any>): void {
        this._prefabs.set(template, template);
    }

    /**
     * Заменяет зарегистрированный префаб на новый.
     * 
     * @param {PrefabTemplate<any>} template - Префаб для замены.
     * @param {PrefabTemplate<any>} instance - Новый префаб.
     */
    public replace(template: PrefabTemplate<any>, instance: PrefabTemplate<any>): void {
        this._prefabs.set(template, instance);
    }

    /**
     * Получает зарегистрированный префаб.
     * 
     * @param {PrefabTemplate<any>} template - Префаб для получения.
     * @returns {PrefabTemplate<any>} Зарегистрированный префаб.
     */
    public get<T extends View>(template: PrefabTemplate<T>): PrefabTemplate<T> {
        const prefab = this._prefabs.get(template);

        if (!prefab) {
            throw new Error(`Prefab ${template.name} not found`);
        }
        return prefab;
    }

    /**
     * Создает вьюху на основе зарегистрированного префаба.
     * 
     * @param {View} instance - Префаб для создания.
     * @param {Container} parent - Родительский контейнер для вьюхи.
     * @returns {Container} Созданная вьюха.
     */
    public create<T extends Container>(instance: View, parent?: Container): T {
        const viewConfig = instance.create();
        const view = this._viewBuilder.create(viewConfig, parent);

        return view as T;
    }
}