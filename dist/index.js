import { Signal as gt, Entity as Wt, ServiceContainer as l, Utils as Lt, EntityStorage as Ft, DeferredPromise as z, EmpressCore as Rt, LifeCycle as it, ExecutionController as zt } from "empress-core";
import { BitmapFontData as qt, BitmapFont as st, Assets as q, Texture as $t, Spritesheet as Nt, Container as x, Application as G, Graphics as nt, Sprite as X, BitmapText as Y, TextStyle as Gt, Text as J, NineSlicePlane as Q } from "pixi.js";
import * as Ut from "@pixi/layers";
import { Group as jt, Layer as Ht } from "@pixi/layers";
import * as Vt from "@pixi/particle-emitter";
import { Spine as Z } from "pixi-spine";
class B {
  constructor() {
    this._groups = /* @__PURE__ */ new Map(), this._layers = /* @__PURE__ */ new Map();
  }
  setStage(t) {
    this._stage = t;
  }
  createGroups(t, e, i) {
    var o;
    const s = new jt(e, i), r = new Ht(s);
    r.name = t, this._groups.set(t, s), this._layers.set(t, r), (o = this._stage) == null || o.addChild(r);
  }
  getGroup(t) {
    return this._groups.get(t);
  }
  setLayer(t, e) {
    const i = this._groups.get(t);
    i && (e.parentGroup = i, this.sort(t));
  }
  setOrder(t, e) {
    t.zOrder = e;
  }
  sort(t) {
    var i, s;
    (i = this._stage) == null || i.sortChildren(), (s = this._stage) == null || s.updateStage();
    const e = this._layers.get(t);
    e && e.sortChildren();
  }
  sortAll() {
    var t, e;
    (t = this._stage) == null || t.sortChildren(), (e = this._stage) == null || e.updateStage(), Array.from(this._layers.values()).forEach((i) => {
      i.sortChildren();
    });
  }
}
class Xt {
  constructor(t) {
    this._assetsManager = t;
  }
  build(t, e, i) {
    const s = i[t], r = s.textures;
    for (let o in s.animations) {
      this._assetsManager.add(t);
      const c = s.animations[o];
      this._assetsManager.updateOnLoad(t, [{ name: o, asset: c, bundle: e }]);
    }
    for (let o in r)
      this._assetsManager.updateOnLoad(e, [{ name: o, asset: r[o], bundle: e }]);
  }
}
class Yt {
  constructor(t) {
    this._assetsManager = t;
  }
  build(t, e, i) {
    this._assetsManager.updateOnLoad(e, [{ name: t, asset: i[t], bundle: e }]);
  }
}
class Jt {
  constructor(t) {
    this._assetsManager = t;
  }
  build(t, e, i) {
    const s = new qt(), r = i[t], o = {
      dot: ".",
      comma: ",",
      usd: "$",
      eur: "€",
      space: " ",
      dash: "-",
      plus: "+"
    }, c = r.data.frames, a = Object.keys(c).map((u, d) => {
      s.page.push({
        id: d,
        file: ""
      });
      const w = (u.length > 1 ? o[u] : u).charCodeAt(0), v = r.textures[u];
      return s.char.push({
        id: w,
        page: d,
        x: 0,
        y: 0,
        width: v.width,
        height: v.height,
        xoffset: 0,
        yoffset: 0,
        xadvance: v.width
      }), v;
    });
    s.common[0] = {
      lineHeight: a[0].height
    }, s.info[0] = {
      face: t,
      size: a[0].height
    };
    const g = new st(s, a, !0);
    st.available[t] = g;
  }
}
class Qt {
  constructor(t) {
    this._assetsManager = t;
  }
  build(t, e, i) {
    this._assetsManager.updateOnLoad(e, [{ name: t, asset: i[t].spineData, bundle: e }]);
  }
}
class rt {
  constructor(t) {
    this._assetsManager = t, this._dimension = "", this._behaviours = /* @__PURE__ */ new Map(), this.closestDimension = (e) => {
      const i = window.screen.height * window.devicePixelRatio, s = window.screen.width * window.devicePixelRatio, r = i > s ? i : s, o = e.map((u) => Math.abs(r - u.width));
      let c = o[0], a = 0;
      return o.map((u, d) => {
        u < c && (c = u, a = d);
      }), e[a].alias;
    };
  }
  get dimension() {
    return this._dimension;
  }
  async init(t) {
    const { bundles: e } = t.manifest, i = await this.checkWebPSupport();
    this._dimension = this.closestDimension(t.resolutions), t.ignoreFormats && this.ignoreFormats(e, t.ignoreFormats), this.selectResolution(e, this._dimension), this.selectWebp(e, i), this.setupBehaviours(), q.setPreferences({
      preferCreateImageBitmap: !1,
      preferWorkers: !1
    }), await q.init({ manifest: { bundles: e } });
  }
  async loadBundle(t) {
    return this._assetsManager.add(t), q.loadBundle(t).then((e) => {
      this.processBundle(t, e);
    });
  }
  processBundle(t, e) {
    for (let i in e) {
      let s;
      e[i].hasOwnProperty("spineData") ? s = this._behaviours.get("spine") : e[i] instanceof $t ? s = this._behaviours.get("texture") : e[i] instanceof Nt ? s = this._behaviours.get("spritesheet") : t === "fonts" && (s = this._behaviours.get("bitmap")), s && s.build(i, t, e);
    }
  }
  setupBehaviours() {
    this._behaviours.set("spritesheet", new Xt(this._assetsManager)), this._behaviours.set("texture", new Yt(this._assetsManager)), this._behaviours.set("bitmap", new Jt(this._assetsManager)), this._behaviours.set("spine", new Qt(this._assetsManager));
  }
  checkWebPSupport() {
    return new Promise((t) => {
      const e = new Image();
      e.onload = e.onerror = () => {
        t(e.height === 2);
      }, e.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    });
  }
  selectResolution(t, e) {
    for (let i of t)
      for (let s of i.assets)
        if (Array.isArray(s.srcs)) {
          const r = s.srcs.filter((o) => o.includes(e));
          r && r.length && (s.srcs = r);
        }
  }
  selectWebp(t, e) {
    for (let i of t)
      for (let s of i.assets)
        if (Array.isArray(s.srcs)) {
          const r = e ? s.srcs.find((o) => o.includes("_webp")) : s.srcs.find((o) => !o.includes("_webp"));
          r && (s.srcs = r);
        }
  }
  ignoreFormats(t, e) {
    for (let i of t) {
      for (let s of i.assets) {
        if (!Array.isArray(s.srcs)) continue;
        const r = s.srcs.some(
          (o) => e.some((c) => o.includes(`.${c}`))
        );
        i.assets = i.assets.filter(() => !r);
      }
      if (i.assets.length == 0) {
        const s = t.indexOf(i);
        t.splice(s, 1);
      }
    }
  }
}
class $ {
  constructor() {
    this._emitters = /* @__PURE__ */ new Map();
  }
  createParticleEmitter(t, e, i) {
    const s = new Vt.Emitter(e, i);
    return this._emitters.set(t, s), s;
  }
  update(t) {
    Array.from(this._emitters.values()).forEach((i) => {
      i.update(t);
    });
  }
  emit(t) {
    const e = this._emitters.get(t);
    e && (e.emit = !0);
  }
  emitAll() {
    Array.from(this._emitters.values()).forEach((e) => {
      e.emit = !0;
    });
  }
}
const Zt = new gt();
var L = /* @__PURE__ */ ((n) => (n.Pending = "Pending", n.Loaded = "Loaded", n))(L || {});
class kt extends Wt {
  get active() {
    return this.getComponent(x).visible;
  }
  set active(t) {
    const e = this.getComponent(x);
    e.visible = t;
  }
}
class U {
  constructor() {
    this._list = /* @__PURE__ */ new Map();
  }
  add(t, e) {
    this._list.set(t, e);
  }
  get(t) {
    return this._list.get(t) || null;
  }
  getInChildren(t) {
    const e = [];
    for (let i = 0; i < t.children.length; i++) {
      const s = t.children[i], r = this.get(s);
      r && e.push(r);
      const o = this.getInChildren(s);
      e.push(...o);
    }
    return e;
  }
  getInChildrenByFilter(t, e) {
    const i = [];
    return this.getInChildren(t).forEach((r) => {
      r.isSatisfiedFilter(e) && i.push(r);
    }), i;
  }
  getComponent(t, e) {
    const i = this.get(t);
    if (!i) throw new Error(`Entity not found for view: ${t.name}`);
    return i.getComponent(e);
  }
}
const Kt = new gt();
class S {
  setCommonData(t, e) {
    if (e.name = t.name, e.alpha = t.alpha === void 0 ? 1 : t.alpha, e.angle = t.angle || 0, e.rotation = t.rotation || 0, e.zIndex = t.zIndex || 0, e.zOrder = t.zOrder || 0, e.visible = t.visible !== void 0 ? t.visible : !0, e.sortableChildren = !!t.sortableChildren, t.position && (e.position = { x: t.position.x || 0, y: t.position.y || 0 }), t.relativePosition && this.setRelativePosition(t.relativePosition, e), t.scale && (e.scale = { x: t.scale.x || 1, y: t.scale.y || 1 }), t.pivot && (e.pivot = { x: t.pivot.x || 0, y: t.pivot.y || 0 }), t.width && (e.width = t.width), t.height && (e.height = t.height), t.hitArea && (e.hitArea = t.hitArea), t.parentGroup) {
      const s = l.instance.get(B);
      e.parentGroup = s.getGroup(t.parentGroup);
    }
    let i = null;
    if (t.entity && (i = this.setEntity(t.entity, e)), t.mask && this.setMask(t.mask, e), t.interactive && (e.eventMode = t.interactive.eventMode || "static", e.cursor = t.interactive.cursor || "pointer", t.interactive.emit.forEach((s) => e.on(s, () => {
      Kt.dispatch({
        type: s,
        view: e,
        entity: i
      });
    }))), t.interactiveChildren !== void 0 && (e.interactiveChildren = t.interactiveChildren), t.debugBorder) {
      const s = t.debugBorderColor || 16711680, r = t.debugBorderWidth || 1;
      this.setDebugBorder(e, r, s);
    }
  }
  setAnchor(t, e) {
    const s = t || { x: 0.5, y: 0.5 }, r = s.x === void 0 ? 0.5 : s.x, o = s.y === void 0 ? 0.5 : s.y;
    e.anchor.set(r, o);
  }
  setRelativePosition(t, e) {
    const i = l.instance.get(G), { width: s, height: r } = i.renderer.screen, o = t.x || 0, c = t.y || 0, a = s / 2 * o, g = r / 2 * c;
    e.position.set(a, g);
  }
  setMask(t, e) {
    const { x: i, y: s, type: r } = t, o = new nt();
    if (o.beginFill(t.color || 16777215), r === "rect") {
      let { width: c, height: a } = t;
      c || (c = i), a || (a = s), o.drawRect(i, s, i + c, s + a), o.pivot.x = c / 2, o.pivot.y = a / 2;
    } else r === "circle" && (o.drawCircle(i, s, t.radius || 1), o.x = e.width / 2, o.y = e.height / 2);
    o.endFill(), t.isDebug || (e.mask = o), e.addChild(o);
  }
  setEntity(t, e) {
    const i = t.instance ? t.instance(e) : new kt(Lt.uuid(), `Entity-${e.name}`), s = t.components || [];
    this.setComponents(i, [e, ...s]);
    const r = l.instance.get(Ft), o = l.instance.get(U);
    return r.addEntity(i), o.add(e, i), e.on("destroyed", () => {
      r.removeEntity(i.uuid);
    }), i;
  }
  setComponents(t, e) {
    e.forEach((i) => t.addComponent(i));
  }
  setDebugBorder(t, e, i) {
    const s = new nt();
    s.lineStyle(e, i, e).drawRect(-e, -e, t.width + e, t.height + e), s.pivot.x = t.width / 2, s.pivot.y = t.height / 2, t.addChild(s);
  }
}
class te extends S {
  create(t) {
    const e = new x();
    return this.setCommonData(t, e), e;
  }
}
class ee {
  constructor(t) {
    this._name = t, this.data = [], this.status = L.Pending, this._loaded = new Promise((e) => this._resolve = e);
  }
  get name() {
    return this._name;
  }
  get loaded() {
    return this._loaded;
  }
  get resolve() {
    return this._resolve;
  }
  getAssetByName(t) {
    const e = typeof t == "string" ? t : t.name;
    return this.data.find((i) => i.name === e);
  }
}
class M {
  constructor() {
    this.list = /* @__PURE__ */ new Map();
  }
  add(t) {
    const e = new ee(t);
    this.list.set(t, e);
  }
  updateOnLoad(t, e) {
    const i = this.list.get(t);
    i && (i.data.push(...e), i.status = L.Loaded, i.resolve(i));
  }
  getBundle(t) {
    let e;
    return typeof t == "string" ? e = this.findParentBundle(t) : e = this.list.get(t.bundle), e;
  }
  getAsset(t) {
    const e = this.getBundle(t);
    if (e)
      return e == null ? void 0 : e.getAssetByName(t);
  }
  hasAsset(t) {
    const e = this.getBundle(t);
    return !!(e != null && e.getAssetByName(t));
  }
  findParentBundle(t) {
    const s = Array.from(this.list.values()).flatMap((r) => r.data).find((r) => r.name === t);
    if (s)
      return this.list.get(s.bundle);
  }
}
class ie extends S {
  create(t) {
    const i = l.instance.get(M).getAsset(t.asset);
    if (!i) throw new Error(`Asset ${t.asset.toString()} not found!`);
    const s = i.asset, r = new X();
    return r.texture = s, r.tint = t.tint ? t.tint : 16777215, this.setCommonData(t, r), this.setAnchor(t.anchor, r), r;
  }
}
class se extends S {
  create(t) {
    const e = new Y(t.text, t.bitmapTextStyle);
    return this.setCommonData(t, e), this.setAnchor(t.anchor, e), e.tint = t.tint ? t.tint : 16777215, e;
  }
}
class ne extends S {
  create(t) {
    const e = new Gt(t.textStyle || {}), i = new J(t.text, e);
    return this.setCommonData(t, i), this.setAnchor(t.anchor, i), i;
  }
}
class re {
  constructor(t, e) {
    this._name = t, this._spineController = e, this._timescaleModifier = 0, this._timeScaleMiltiplier = 1, this._chain = [], this._curent = null, this._listener = null, this._originalTimeScale = 0;
  }
  get current() {
    return this._curent;
  }
  get promises() {
    return this._chain.map(({ deferredPromise: t }) => t);
  }
  add(t, e, i = { loopCount: 1, timeScale: 1 }) {
    const s = [];
    if (i.loopCount === void 0 && (i.loopCount = 1), i.timeScale === void 0 && (i.timeScale = 1), i.loopCount !== -1)
      for (let r = 0; r < i.loopCount; r++) {
        const o = new z();
        s.push({ spine: t, name: e, options: i, deferredPromise: o });
      }
    else {
      const r = new z();
      s.push({ spine: t, name: e, options: i, deferredPromise: r }), console.warn("[SpineChainsUtil]: loopCount -1 looped your animation forever!");
    }
    return this._chain.push(...s), this;
  }
  async play() {
    for (; this._chain.length > 0; ) {
      const t = this._curent = this._chain[0], { spine: e, name: i, deferredPromise: s, options: r } = t, { loopCount: o, timeScale: c } = r;
      o === -1 && this.add(e, i, r), e.state.timeScale = c || 0, this._originalTimeScale = e.state.timeScale, c && (e.state.timeScale = (c + this._timescaleModifier) * this._timeScaleMiltiplier), this._listener && e.state.removeListener(this._listener), this.clear(e), this._listener = this.setListener(r, s), e.state.addListener(this._listener), e.state.setAnimation(0, i, !1), await s.promise, this._chain.shift();
    }
    this._spineController.remove(this._name);
  }
  stop(t = !1) {
    t && this._chain.forEach((i) => this.clear(i.spine));
    const e = this.promises;
    z.resolveAll(e, void 0), this._chain.length = 0, this._spineController.remove(this._name);
  }
  multiplyTimeScale(t) {
    this._curent && (t <= 0 && (t = 1), this._timeScaleMiltiplier = t, this._curent.spine.state.timeScale = (this._originalTimeScale + this._timescaleModifier) * t);
  }
  increaseTimeScale(t) {
    this._curent && (this._timescaleModifier = t, this._curent.spine.state.timeScale += t);
  }
  decreaseTimeScale(t) {
    this._curent && (this._timescaleModifier = 0, this._curent.spine.state.timeScale -= t);
  }
  pause() {
    this._curent && (this._originalTimeScale = this._curent.spine.state.timeScale, this._curent.spine.state.timeScale = 0);
  }
  resume() {
    this._curent && (this._curent.spine.state.timeScale = this._originalTimeScale + this._timescaleModifier);
  }
  setListener(t, e) {
    return {
      start: (i) => {
        t.start && t.start(i);
      },
      interrupt: (i) => {
        t.interrupt && t.interrupt(i);
      },
      end: (i) => {
        t.end && t.end(i);
      },
      dispose: (i) => {
        t.dispose && t.dispose(i);
      },
      complete: (i) => {
        t.complete && t.complete(i), e.resolve(!0);
      },
      event: (i, s) => {
        t.event && t.event(i, s);
      }
    };
  }
  clear(t) {
    t.state.clearTracks(), t.state.tracks = [], t.skeleton.setToSetupPose(), this._listener && t.state.removeListener(this._listener), t.lastTime = null;
  }
}
class j {
  constructor() {
    this._chains = /* @__PURE__ */ new Map();
  }
  get _spineChains() {
    return Array.from(this._chains.values());
  }
  create(t) {
    const e = new re(t, this);
    return this._chains.set(t, e), e;
  }
  get(t) {
    return this._chains.get(t);
  }
  remove(t) {
    this._chains.has(t) && this._chains.delete(t);
  }
  removeAll() {
    for (const [t] of this._chains.entries())
      this.remove(t);
  }
  multyplyTimeScaleAll(t) {
    this._spineChains.forEach((e) => e.multiplyTimeScale(t));
  }
  multyplyTimeScale(t, e) {
    const i = this.get(t);
    i == null || i.multiplyTimeScale(e);
  }
  increaseTimeScaleAll(t) {
    this._spineChains.forEach((e) => e.increaseTimeScale(t));
  }
  increaseTimeScale(t, e) {
    const i = this.get(t);
    i == null || i.increaseTimeScale(e);
  }
  decreaseTimeScaleAll(t) {
    this._spineChains.forEach((e) => e.decreaseTimeScale(t));
  }
  decreaseTimeScale(t, e) {
    const i = this.get(t);
    i == null || i.decreaseTimeScale(e);
  }
  pauseAll() {
    this._spineChains.forEach((t) => t.pause());
  }
  pause(t) {
    const e = this.get(t);
    e == null || e.pause();
  }
  resumeAll() {
    this._spineChains.forEach((t) => t.resume());
  }
  resume(t) {
    const e = this.get(t);
    e == null || e.resume();
  }
  stopAll(t = !1) {
    this._spineChains.forEach((e) => e.stop(t));
  }
  stop(t, e = !1) {
    const i = this.get(t);
    i == null || i.stop(e);
  }
}
class ot {
  getDuration(t, e) {
    const i = t.spineData.findAnimation(e);
    if (i === null) throw Error(`[SpineChainsUtil]: Animation ${e} not found`);
    return i.duration;
  }
  findSlotIndex(t, e) {
    return t.skeleton.findSlotIndex(e);
  }
  findSlotByName(t, e) {
    const i = this.findSlotIndex(t, e);
    return t.slotContainers[i].children[0];
  }
  setSlotAlpha(t, e, i) {
    const s = t.skeleton.findSlot(e);
    s.currentSprite.alpha = i;
  }
  addToSlot(t, e, i) {
    this.findSlotByName(t, e).addChild(i);
  }
  setSkin(t, e) {
    const i = t.skeleton.data.findSkin(e);
    if (!i) throw Error(`[SpineChainsUtil]: Skin ${e} not found`);
    t.skeleton.skin = i, t.skeleton.setSlotsToSetupPose(), t.state.apply(t.skeleton);
  }
}
class oe extends S {
  create(t) {
    const e = l.instance.get(M), i = l.instance.get(j), s = e.getAsset(t.asset);
    if (!s) throw new Error(`Asset ${t.asset.toString()} not found!`);
    const r = s.asset, o = new Z(r);
    if (t.initialAnimation && o.state.hasAnimation(t.initialAnimation)) {
      const c = `${t.key || ""}:${t.name}`;
      i.create(c).add(o, t.initialAnimation, {
        timeScale: t.timeScale,
        loopCount: t.loop
      }).play(), o.autoUpdate = !0;
    }
    return t.skin && o.skeleton.data.findSkin(t.skin) && (o.skeleton.setSkinByName(t.skin), o.skeleton.setSlotsToSetupPose()), this.setCommonData(t, o), o;
  }
}
class ae extends S {
  create(t) {
    const i = l.instance.get(M).getAsset(t.asset);
    if (!i) throw new Error(`Asset ${t.asset.toString()} not found!`);
    const s = i.asset, r = new Q(
      s,
      t.leftWidth,
      t.topHeight,
      t.rightWidth,
      t.bottomHeight
    );
    return r.tint = t.tint ? t.tint : 16777215, this.setCommonData(t, r), r;
  }
}
class H {
  constructor(t) {
    this._assetsManager = t, this._behaviours = /* @__PURE__ */ new Map(), this.setupBehaviours();
  }
  create(t, e) {
    const i = this._behaviours.get(t.type);
    if (!i) throw new Error(`Unsupported type: ${t.type}`);
    if (e ? this.loadLazyAsset(t, e) : !1) return;
    const r = i.create(t);
    return e == null || e.addChild(r), Zt.dispatch(r), t.children && this.createChildren(t.children, r), r;
  }
  setupBehaviours() {
    this._behaviours.set(x, new te()), this._behaviours.set(X, new ie()), this._behaviours.set(Y, new se()), this._behaviours.set(J, new ne()), this._behaviours.set(Z, new oe()), this._behaviours.set(Q, new ae());
  }
  createChildren(t, e) {
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      this.create(s, e);
    }
  }
  loadLazyAsset(t, e) {
    let i = !1;
    if ("asset" in t) {
      const s = this._assetsManager.getBundle(t.asset);
      if (!s) throw new Error("No such asset" + t.asset.toString());
      s.status === L.Pending && (s.loaded.then(() => {
        this.create(t, e);
      }), i = !0);
    }
    return i;
  }
}
class b {
  constructor(t) {
    t && (this._config = t);
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
  node(t, e = "node") {
    return this._config ? this._config.type = t : this._config = {
      type: t,
      name: e
    }, this;
  }
  /**
   * @description
   * Создает корневую ноду из View.
   * 
   * @param view - View, из которого создается конфигурация.
   */
  view(t) {
    return this._config = t.create(), this;
  }
  /**
   * @description
   * Создает корневую ноду из конфигурации.
   * 
   * @param config - конфигурация ноды.
   */
  config(t) {
    return this._config = t, this;
  }
  /**
   * @description
   * Устанавливает имя ноды.
   * 
   * @param name - имя ноды.
   */
  name(t) {
    return this.checkConfig(), this._config.name = t, this;
  }
  /**
   * @description
   * Устанавливает позицию ноды.
   * 
   * @param x - x-координата.
   * @param y - y-координата.
   */
  position(t, e) {
    return this.checkConfig(), this._config.position = { x: t, y: e }, this;
  }
  /**
   * @description
   * Устанавливает x-координату ноды.
   * 
   * @param x - x-координата.
   */
  x(t) {
    return this.checkConfig(), this._config.position = { x: t }, this;
  }
  /**
   * @description
   * Устанавливает y-координату ноды.
   * 
   * @param y - y-координата.
   */
  y(t) {
    return this.checkConfig(), this._config.position = { y: t }, this;
  }
  /**
   * @description
   * Устанавливает скейл ноды.
   * 
   * @param x - x-координата.
   * @param y - y-координата.
   */
  scale(t, e) {
    return this.checkConfig(), this._config.scale = { x: t, y: e }, this;
  }
  /**
   * @description
   * Устанавливает скейл ноды по x.
   * 
   * @param x - x-координата.
   */
  scaleX(t) {
    return this.checkConfig(), this._config.scale = { x: t }, this;
  }
  /**
   * @description
   * Устанавливает скейл ноды по y.
   * 
   * @param y - y-координата.
   */
  scaleY(t) {
    return this.checkConfig(), this._config.scale = { y: t }, this;
  }
  /**
   * @description
   * Устанавливает ширину ноды.
   * 
   * @param width - ширина ноды.
   */
  width(t) {
    return this.checkConfig(), this._config.width = t, this;
  }
  /**
   * @description
   * Устанавливает высоту ноды.
   * 
   * @param height - высота ноды.
   */
  height(t) {
    return this.checkConfig(), this._config.height = t, this;
  }
  /**
   * @description
   * Устанавливает ширину и высоту ноды.
   * 
   * @param width - ширина ноды.
   * @param height - высота ноды.
   */
  size(t, e) {
    return this.checkConfig(), this._config.width = t, this._config.height = e, this;
  }
  /**
   * @description
   * Устанавливает центр ноды.
   * 
   * @param x - x-координата.
   * @param y - y-координата.
   */
  pivot(t, e) {
    return this.checkConfig(), this._config.pivot = { x: t, y: e }, this;
  }
  /**
   * @description
   * Устанавливает видимость ноды.
   * 
   * @param visible - видимость ноды.
   */
  visible(t) {
    return this.checkConfig(), this._config.visible = t, this;
  }
  /**
   * @description
   * Устанавливает прозрачность ноды.
   * 
   * @param alpha - прозрачность ноды.
   */
  alpha(t) {
    return this.checkConfig(), this._config.alpha = t, this;
  }
  /**
   * @description
   * Устанавливает поворот ноды через свойство rotation.
   * 
   * @param rotation - угол ноды.
   */
  rotation(t) {
    return this.checkConfig(), this._config.rotation = t, this;
  }
  /**
   * @description
   * Устанавливает поворот ноды через свойство angle.
   * 
   * @param angle - угол ноды.
   */
  angle(t) {
    return this.checkConfig(), this._config.angle = t, this;
  }
  /**
   * @description
   * Устанавливает родительскую группу ноды для сортировки по слоям.
   * 
   * @param group - группа ноды.
   */
  parentGroup(t) {
    return this.checkConfig(), this._config.parentGroup = t, this;
  }
  /**
   * @description
   * Устанавливает порядок ноды для сортировки по слоям.
   * 
   * @param order - порядок ноды.
   */
  order(t) {
    return this.checkConfig(), this._config.zOrder = t, this;
  }
  /**
   * @description
   * Устанавливает индекс ноды для сортировки в рамках родителя.
   * 
   * @param zIndex - индекс ноды.
   */
  zIndex(t) {
    return this.checkConfig(), this._config.zIndex = t, this;
  }
  /**
   * @description
   * Устанавливает возможность сортировки дочерних нод.
   * 
   * @param sortable - возможность сортировки дочерних нод.
   */
  sortable(t) {
    return this.checkConfig(), this._config.sortableChildren = t, this;
  }
  /**
   * @description
   * Определяет будут ли дочерние ноды интерактивными.
   * 
   * @param interactive - интерактивность дочерних нод.
   */
  interactiveChildren(t) {
    return this.checkConfig(), this._config.interactiveChildren = t, this;
  }
  /**
   * @description
   * Устанавливает режим обработки событий.
   * 
   * @param eventMode - режим обработки событий.
   */
  eventMode(t) {
    return this.checkConfig(), this._config.interactive ? this._config.interactive.eventMode = t : this._config.interactive = { eventMode: t, emit: [] }, this;
  }
  /**
   * @description
   * Устанавливает типы событий, которые будут обрабатываться.
   * 
   * @param eventType - типы событий.
   */
  eventType(t) {
    return this.checkConfig(), this._config.interactive ? this._config.interactive.emit.push(t) : this._config.interactive = { eventMode: "none", emit: [t] }, this;
  }
  /**
   * @description
   * Устанавливает курсор при наведении на ноду.
   * 
   * @param cursor - тип курсора.
   */
  cursor(t) {
    return this.checkConfig(), this._config.interactive ? this._config.interactive.cursor = t : this._config.interactive = { cursor: t, emit: [], eventMode: "none" }, this;
  }
  /**
   * @description
   * Устанавливает опции интерактивности.
   * 
   * @param interactive - опции интерактивности.
   */
  interactive(t) {
    return this.checkConfig(), this._config.interactive = t, this;
  }
  /**
   * @description
   * Устанавливает область, в которой будет обрабатываться событие.
   * 
   * @param hitArea - опции области, в которой будет обрабатываться событие.
   */
  hitArea(t) {
    return this.checkConfig(), this._config.hitArea = t, this;
  }
  /**
   * @description
   * Устанавливает маску для ноды.
   * 
   * @param mask - опции маски для ноды.
   */
  mask(t) {
    return this.checkConfig(), this._config.mask = t, this;
  }
  /**
   * @description
   * Добавляет дочернюю ноду.
   * 
   * @param callback - функция, которая настраивает дочернюю ноду.
   */
  addChild(t) {
    var i;
    this.checkConfig(), this.checkChildren();
    const e = new b();
    return t(e), (i = this._config.children) == null || i.push(e.create()), this;
  }
  /**
   * @description
   * Находит дочернюю ноду по имени для переопределения её конфигурации.
   * Поиск происходит по первому уровню вложенности.
   * 
   * @param name - имя дочерней ноды.
   * @param callback - функция, которая настраивает дочернюю ноду.
   */
  getChild(t, e) {
    var r;
    this.checkConfig(), this.checkChildren();
    const i = (r = this._config.children) == null ? void 0 : r.find((o) => o.name === t);
    if (!i)
      throw new Error(`Child with name ${t} not found`);
    const s = new b(i);
    return e(s), this;
  }
  /**
   * @description
   * Находит дочернюю ноду по имени для переопределения её конфигурации.
   * Поиск происходит по всему дереву вложенности.
   * 
   * @param name - имя дочерней ноды.
   * @param callback - функция, которая настраивает дочернюю ноду.
   */
  getDeepChild(t, e) {
    this.checkConfig(), this.checkChildren();
    const i = this.deepSearchChild(t);
    if (!i)
      throw new Error(`Child with name ${t} not found`);
    const s = new b(i);
    return e(s), this;
  }
  /**
   * @description
   * Удаляет дочернюю ноду по имени из первого уровня вложенности.
   * 
   * @param name - имя дочерней ноды.
   */
  removeChild(t) {
    var e;
    return this.checkConfig(), this.checkChildren(), this._config.children = (e = this._config.children) == null ? void 0 : e.filter((i) => i.name !== t), this;
  }
  /**
   * @description
   * Удаляет дочернюю ноду по имени из любого уровня вложенности.
   * 
   * @param name - имя дочерней ноды.
   */
  removeDeepChild(t) {
    if (this.checkConfig(), this.checkChildren(), !this.deepRemoveChild(t, this._config.children || []))
      throw new Error(`Child with name ${t} not found`);
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
  anchor(t, e) {
    if (this.checkConfig(), this.isSprite(this._config) || this.isText(this._config))
      this._config.anchor = { x: t, y: e };
    else
      throw new Error("Anchor can only be set on Sprite or Text nodes");
    return this;
  }
  /**
   * @description
   * Устанавливает текстуру для ноды.
   * 
   * @param texture - текстура.
   */
  texture(t) {
    if (this.checkConfig(), this.isSprite(this._config) || this.isNineSlicePlane(this._config))
      this._config.asset = t;
    else
      throw new Error("Texture can only be set on Sprite or NineSlicePlane nodes");
    return this;
  }
  /**
   * @description
   * Устанавливает цвет для ноды.
   * 
   * @param tint - цвет.
   */
  tint(t) {
    if (this.checkConfig(), this.isSprite(this._config) || this.isBitmapText(this._config) || this.isNineSlicePlane(this._config))
      this._config.tint = t;
    else
      throw new Error("Tint can only be set on Sprite, BitmapText or NineSlicePlane nodes");
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
  text(t) {
    if (this.checkConfig(), this.isText(this._config))
      this._config.text = t;
    else
      throw new Error("Text can only be set on Text nodes");
    return this;
  }
  /**
   * @description
   * Устанавливает стиль текста для ноды.
   * 
   * @param style - стиль текста.
   */
  textStyle(t) {
    if (this.checkConfig(), this.isText(this._config))
      this._config.textStyle = t;
    else
      throw new Error("Text style can only be set on Text nodes");
    return this;
  }
  /**
   * @description
   * Устанавливает стиль текста для ноды.
   * 
   * @param style - стиль текста.
   */
  bitmapTextStyle(t) {
    if (this.checkConfig(), this.isBitmapText(this._config))
      this._config.bitmapTextStyle = t;
    else
      throw new Error("Bitmap text style can only be set on BitmapText nodes");
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
  spine(t) {
    if (this.checkConfig(), this.isSpine(this._config))
      this._config.asset = t;
    else
      throw new Error("Spine can only be set on Spine nodes");
    return this;
  }
  /**
   * @description
   * Устанавливает начальную анимацию для ноды.
   * 
   * @param animation - начальная анимация.
   */
  initialAnimation(t) {
    if (this.checkConfig(), this.isSpine(this._config))
      this._config.initialAnimation = t;
    else
      throw new Error("Initial animation can only be set on Spine nodes");
    return this;
  }
  /**
   * @description
   * Устанавливает скин для ноды.
   * 
   * @param skin - скин.
   */
  skin(t) {
    if (this.checkConfig(), this.isSpine(this._config))
      this._config.skin = t;
    else
      throw new Error("Skin can only be set on Spine nodes");
    return this;
  }
  /**
   * @description
   * Устанавливает количество повторений для ноды.
   * 
   * @param loop - количество повторений.
   */
  loop(t) {
    if (this.checkConfig(), this.isSpine(this._config))
      this._config.loop = t;
    else
      throw new Error("Loop can only be set on Spine nodes");
    return this;
  }
  /**
   * @description
   * Устанавливает скорость воспроизведения для ноды.
   * 
   * @param timeScale - скорость воспроизведения.
   */
  timeScale(t) {
    if (this.checkConfig(), this.isSpine(this._config))
      this._config.timeScale = t;
    else
      throw new Error("Time scale can only be set on Spine nodes");
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
  nineSlice(t, e, i, s) {
    if (this.checkConfig(), this.isNineSlicePlane(this._config))
      this._config.leftWidth = t, this._config.rightWidth = e, this._config.topHeight = i, this._config.bottomHeight = s;
    else
      throw new Error("Nine slice can only be set on NineSlicePlane nodes");
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
  addComponent(t) {
    return this.checkConfig(), this._config.entity || (this._config.entity = {
      components: []
    }), this._config.entity.components || (this._config.entity.components = []), this._config.entity.components.push(t), this;
  }
  /**
   * @description
   * Удаляет компонент из ноды.
   * 
   * @param type - тип компонента.
   */
  removeComponent(t) {
    return this.checkConfig(), this._config.entity || (this._config.entity = {
      components: []
    }), this._config.entity.components || (this._config.entity.components = []), this._config.entity.components.findIndex((i) => i instanceof t) && (this._config.entity.components = this._config.entity.components.filter((i) => i.constructor !== t)), this;
  }
  /**
   * @description
   * Создает конфигурацию ноды.
   * 
   * @returns конфигурация ноды.
   */
  create() {
    return this._config;
  }
  checkConfig() {
    if (!this._config)
      throw new Error("Config is not initialized");
  }
  checkChildren() {
    this._config.children || (this._config.children = []);
  }
  deepSearchChild(t) {
    const e = [...this._config.children || []];
    let i;
    for (; e.length > 0; ) {
      const s = e.shift();
      if (s) {
        if (s.name === t) {
          i = s, e.length = 0;
          break;
        }
        s.children && e.push(...s.children);
      }
    }
    return i;
  }
  deepRemoveChild(t, e) {
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      if (s.name === t)
        return e.splice(i, 1), !0;
      if (s.children)
        return this.deepRemoveChild(t, s.children);
    }
    return !1;
  }
  isSprite(t) {
    return t.type === X;
  }
  isText(t) {
    return t.type === J;
  }
  isBitmapText(t) {
    return t.type === Y;
  }
  isSpine(t) {
    return t.type === Z;
  }
  isNineSlicePlane(t) {
    return t.type === Q;
  }
}
class Ne {
  constructor(t) {
    this._builder = new b(t);
  }
  /**
   * @description
   * Создает конфигурацию ноды.
   * 
   * @returns конфигурация ноды.
   */
  create() {
    return this.setup(this._builder), this._builder.create();
  }
}
class ce {
  constructor(t, e, i) {
    this._factory = t, this._size = e, this._dynamic = i, this._pool = [], this.intitialize();
  }
  get size() {
    return this._size;
  }
  get currentSize() {
    return this._pool.length;
  }
  intitialize() {
    for (let t = 0; t < this._size; ++t) {
      const e = this._factory.create();
      this._pool.push(e);
    }
  }
  get() {
    if (!this._pool.length && !this._dynamic)
      throw new Error("No more items in pool");
    let t;
    return this._pool.length && (t = this._pool.pop()), !t && this._dynamic && (t = this._factory.create()), t;
  }
  release(t) {
    this._factory.reset(t), this._pool.push(t);
  }
}
class Ge {
  createFromConfig(t) {
    return this.config = t, l.instance.get(H).create(t);
  }
}
class at {
  constructor() {
    this._pools = /* @__PURE__ */ new Map();
  }
  create(t, e, i, s) {
    const r = new e(), o = new ce(r, i, s);
    return this._pools.set(t, o), o;
  }
  get(t) {
    let e = this._pools.get(t);
    if (!e) throw Error(`No pool with name ${t} found`);
    return e;
  }
}
class m {
  constructor() {
    this.tag = -1, this.originalTarget = null, this.target = null;
  }
  clone() {
    const t = new m();
    return t.originalTarget = null, t.target = null, t;
  }
  isDone() {
    return !0;
  }
  startWithTarget(t) {
    this.originalTarget = t, this.target = t;
  }
  stop() {
    this.target = null;
  }
  step(t) {
  }
  update(t) {
  }
  getTarget() {
    return this.target;
  }
  setTarget(t) {
    this.target = t;
  }
  getOriginalTarget() {
    return this.originalTarget;
  }
  setOriginalTarget(t) {
    this.originalTarget = t;
  }
  reverse() {
    return null;
  }
  retain() {
  }
  release() {
  }
}
class F extends m {
  constructor() {
    super(...arguments), this._duration = 0, this._timesForRepeat = 1;
  }
  getDuration() {
    return this._duration * (this._timesForRepeat || 1);
  }
  setDuration(t) {
    this._duration = t;
  }
  clone() {
    return new F();
  }
}
class E extends F {
  isDone() {
    return !0;
  }
  step(t) {
    this.update(1);
  }
  update(t) {
  }
  reverse() {
    return this.clone();
  }
  clone() {
    return new E();
  }
}
const he = 1192092896e-16;
class h extends F {
  constructor(t) {
    super(), this.MAX_VALUE = 2, this._elapsed = 0, this._firstTick = !1, this._easeList = [], this._speed = 1, this._repeatForever = !1, this._repeatMethod = !1, this._speedMethod = !1, t !== void 0 && !Number.isNaN(t) && this.initWithDuration(t);
  }
  getElapsed() {
    return this._elapsed;
  }
  initWithDuration(t) {
    return this._duration = t === 0 ? he : t, this._elapsed = 0, this._firstTick = !0, !0;
  }
  isDone() {
    return this._elapsed >= this._duration;
  }
  clone() {
    const t = new h(this._duration);
    return this.cloneDecoration(t), t;
  }
  easing(t) {
    this._easeList ? this._easeList.length = 0 : this._easeList = [];
    for (let e = 0; e < arguments.length; e++) this._easeList.push(arguments[e]);
    return this;
  }
  step(t) {
    this._firstTick ? (this._firstTick = !1, this._elapsed = 0) : this._elapsed += t;
    let e = this._elapsed / (this._duration > 1192092896e-16 ? this._duration : 1192092896e-16);
    e = e < 1 ? e : 1, this.update(e > 0 ? e : 0), this._repeatMethod && this._timesForRepeat > 1 && this.isDone() && (this._repeatForever || this._timesForRepeat--, this.startWithTarget(this.target), this.step(this._elapsed - this._duration));
  }
  startWithTarget(t) {
    m.prototype.startWithTarget.call(this, t), this._elapsed = 0, this._firstTick = !0;
  }
  reverse() {
    return this;
  }
  setAmplitudeRate(t) {
  }
  getAmplitudeRate() {
    return 0;
  }
  speed(t) {
    return t <= 0 ? this : (this._speedMethod = !0, this._speed *= t, this);
  }
  getSpeed() {
    return this._speed;
  }
  setSpeed(t) {
    return this._speed = t, this;
  }
  repeat(t) {
    return t = Math.round(t), Number.isNaN(t) || t < 1 ? this : (this._repeatMethod = !0, this._timesForRepeat *= t, this);
  }
  repeatForever() {
    return this._repeatMethod = !0, this._timesForRepeat = this.MAX_VALUE, this._repeatForever = !0, this;
  }
  cloneDecoration(t) {
    t._repeatForever = this._repeatForever, t._speed = this._speed, t._timesForRepeat = this._timesForRepeat, t._easeList = this._easeList, t._speedMethod = this._speedMethod, t._repeatMethod = this._repeatMethod;
  }
  reverseEaseList(t) {
    if (this._easeList) {
      t._easeList = [];
      for (let e = 0; e < this._easeList.length; e++)
        t._easeList.push(this._easeList[e]);
    }
  }
  computeEaseTime(t) {
    return t;
  }
}
class k extends E {
  constructor(t, e, i) {
    super(), this._selectorTarget = null, this._function = null, this._data = null, this.initWithFunction(t, e, i);
  }
  initWithFunction(t, e, i) {
    return t && (this._function = t), e && (this._selectorTarget = e), i !== void 0 && (this._data = i), !0;
  }
  execute() {
    this._function && this._function.call(this._selectorTarget, this.target, this._data);
  }
  update(t) {
    this.execute();
  }
  getTargetCallback() {
    return this._selectorTarget;
  }
  setTargetCallback(t) {
    t !== this._selectorTarget && (this._selectorTarget && (this._selectorTarget = null), this._selectorTarget = t);
  }
  clone() {
    const t = new k();
    return t.initWithFunction(this._function, this._selectorTarget, this._data), t;
  }
}
const A = class A extends h {
  constructor(t) {
    super(), this._actions = [], this._split = 0, this._last = 0, this._reversed = !1;
    const e = t instanceof Array ? t : arguments;
    if (e.length === 1)
      return;
    const i = e.length - 1;
    if (i >= 0) {
      let s = e[0], r;
      for (let o = 1; o < i; o++)
        e[o] && (r = s, s = A._actionOneTwo(r, e[o]));
      this.initWithTwoActions(s, e[i]);
    }
  }
  initWithTwoActions(t, e) {
    if (!t || !e)
      return !1;
    let i = t._duration, s = e._duration;
    i *= t._repeatMethod ? t._timesForRepeat : 1, s *= e._repeatMethod ? e._timesForRepeat : 1;
    const r = i + s;
    return this.initWithDuration(r), this._actions[0] = t, this._actions[1] = e, !0;
  }
  clone() {
    const t = new A();
    return this.cloneDecoration(t), t.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone()), t;
  }
  startWithTarget(t) {
    h.prototype.startWithTarget.call(this, t), this._split = this._actions[0]._duration / this._duration, this._split *= this._actions[0]._repeatMethod ? this._actions[0]._timesForRepeat : 1, this._last = -1;
  }
  stop() {
    this._last !== -1 && this._actions[this._last].stop(), m.prototype.stop.call(this);
  }
  update(t) {
    let e, i = 0;
    const s = this._split, r = this._actions, o = this._last;
    let c;
    t = this.computeEaseTime(t), t < s ? (e = s !== 0 ? t / s : 1, i === 0 && o === 1 && this._reversed && (r[1].update(0), r[1].stop())) : (i = 1, e = s === 1 ? 1 : (t - s) / (1 - s), o === -1 && (r[0].startWithTarget(this.target), r[0].update(1), r[0].stop()), o === 0 && (r[0].update(1), r[0].stop())), c = r[i], !(o === i && c.isDone()) && (o !== i && c.startWithTarget(this.target), e *= c._timesForRepeat, c.update(e > 1 ? e % 1 : e), this._last = i);
  }
  reverse() {
    const t = A._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse());
    return this.cloneDecoration(t), this.reverseEaseList(t), t._reversed = !0, t;
  }
};
A._actionOneTwo = function(t, e) {
  const i = new A();
  return i.initWithTwoActions(t, e), i;
};
let I = A;
function N(n) {
  const t = n instanceof Array ? n : arguments;
  if (t.length === 1)
    return t[0];
  const e = t.length - 1;
  let i = null;
  if (e >= 0) {
    i = t[0];
    for (let s = 1; s <= e; s++)
      t[s] && (i = I._actionOneTwo(i, t[s]));
  }
  return i;
}
class P extends h {
  constructor(t, e) {
    super(), this._times = 0, this._total = 0, this._nextDt = 0, this._actionInstant = !1, this._innerAction = null, e !== void 0 && this.initWithAction(t, e);
  }
  initWithAction(t, e) {
    const i = t._duration * e;
    return this.initWithDuration(i) ? (this._times = e, this._innerAction = t, t instanceof E && (this._actionInstant = !0, this._times -= 1), this._total = 0, !0) : !1;
  }
  clone() {
    const t = new P();
    return this.cloneDecoration(t), t.initWithAction(this._innerAction.clone(), this._times), t;
  }
  startWithTarget(t) {
    this._total = 0, this._nextDt = this._innerAction._duration / this._duration, h.prototype.startWithTarget.call(this, t), this._innerAction.startWithTarget(t);
  }
  stop() {
    this._innerAction.stop(), m.prototype.stop.call(this);
  }
  update(t) {
    t = this.computeEaseTime(t);
    const e = this._innerAction, i = this._duration, s = this._times;
    let r = this._nextDt;
    if (t >= r) {
      for (; t > r && this._total < s; )
        e.update(1), this._total++, e.stop(), e.startWithTarget(this.target), r += e._duration / i, this._nextDt = r > 1 ? 1 : r;
      t >= 1 && this._total < s && (e.update(1), this._total++), this._actionInstant || (this._total === s ? e.stop() : e.update(t - (r - e._duration / i)));
    } else
      e.update(t * s % 1);
  }
  isDone() {
    return this._total === this._times;
  }
  reverse() {
    const t = new P(this._innerAction.reverse(), this._times);
    return this.cloneDecoration(t), this.reverseEaseList(t), t;
  }
  setInnerAction(t) {
    this._innerAction !== t && (this._innerAction = t);
  }
  getInnerAction() {
    return this._innerAction;
  }
}
class O extends h {
  constructor(t) {
    super(), this._innerAction = null, t && this.initWithAction(t);
  }
  initWithAction(t) {
    return t ? (this._innerAction = t, !0) : !1;
  }
  clone() {
    const t = new O();
    return this.cloneDecoration(t), t.initWithAction(this._innerAction.clone()), t;
  }
  startWithTarget(t) {
    h.prototype.startWithTarget.call(this, t), this._innerAction.startWithTarget(t);
  }
  step(t) {
    const e = this._innerAction;
    e.step(t), e.isDone() && (e.startWithTarget(this.target), e.step(e.getElapsed() - e._duration));
  }
  isDone() {
    return !1;
  }
  reverse() {
    const t = new O(this._innerAction.reverse());
    return this.cloneDecoration(t), this.reverseEaseList(t), t;
  }
  setInnerAction(t) {
    this._innerAction !== t && (this._innerAction = t);
  }
  getInnerAction() {
    return this._innerAction;
  }
}
class C extends h {
  update(t) {
  }
  reverse() {
    const t = new C(this._duration);
    return this.cloneDecoration(t), this.reverseEaseList(t), t;
  }
  clone() {
    const t = new C();
    return this.cloneDecoration(t), t.initWithDuration(this._duration), t;
  }
}
const y = class y extends h {
  constructor(t) {
    super(), this._one = null, this._two = null;
    const e = t instanceof Array ? t : arguments;
    if (e.length === 1)
      return;
    const i = e.length - 1;
    if (i >= 0) {
      let s = e[0], r;
      for (let o = 1; o < i; o++)
        e[o] && (r = s, s = y._actionOneTwo(r, e[o]));
      this.initWithTwoActions(s, e[i]);
    }
  }
  initWithTwoActions(t, e) {
    if (!t || !e)
      return !1;
    let i = !1;
    const s = t._duration, r = e._duration;
    return this.initWithDuration(Math.max(s, r)) && (this._one = t, this._two = e, s > r ? this._two = I._actionOneTwo(e, new C(s - r)) : s < r && (this._one = I._actionOneTwo(t, new C(r - s))), i = !0), i;
  }
  clone() {
    const t = new y();
    return this.cloneDecoration(t), t.initWithTwoActions(this._one.clone(), this._two.clone()), t;
  }
  startWithTarget(t) {
    h.prototype.startWithTarget.call(this, t), this._one.startWithTarget(t), this._two.startWithTarget(t);
  }
  stop() {
    this._one.stop(), this._two.stop(), m.prototype.stop.call(this);
  }
  update(t) {
    t = this.computeEaseTime(t), this._one && this._one.update(t), this._two && this._two.update(t);
  }
  reverse() {
    const t = y._actionOneTwo(this._one.reverse(), this._two.reverse());
    return this.cloneDecoration(t), this.reverseEaseList(t), t;
  }
};
y._actionOneTwo = function(t, e) {
  const i = new y();
  return i.initWithTwoActions(t, e), i;
};
let V = y;
function ct(n) {
  const t = n instanceof Array ? n : arguments;
  if (t.length === 1)
    return null;
  let e = t[0];
  for (let i = 1; i < t.length; i++)
    t[i] != null && (e = V._actionOneTwo(e, t[i]));
  return e;
}
class K extends h {
  constructor(t) {
    super(), this._other = null, t && this.initWithAction(t);
  }
  initWithAction(t) {
    return !t || t === this._other ? !1 : h.prototype.initWithDuration.call(this, t._duration) ? (this._other = t, !0) : !1;
  }
  clone() {
    const t = new K();
    return this.cloneDecoration(t), t.initWithAction(this._other.clone()), t;
  }
  startWithTarget(t) {
    h.prototype.startWithTarget.call(this, t), this._other.startWithTarget(t);
  }
  update(t) {
    t = this.computeEaseTime(t), this._other && this._other.update(1 - t);
  }
  reverse() {
    return this._other.clone();
  }
  stop() {
    this._other.stop(), m.prototype.stop.call(this);
  }
}
class le {
  constructor() {
    this.actions = [], this.target = null, this.actionIndex = 0, this.currentAction = null, this.paused = !1, this.lock = !1;
  }
}
class ue {
  constructor() {
    this._hashTargets = /* @__PURE__ */ new Map(), this._arrayTargets = [], this._elementPool = [];
  }
  addAction(t, e, i) {
    if (!t || !e)
      return;
    let s = this._hashTargets.get(e);
    s ? s.actions || (s.actions = []) : (s = this._getElement(e, i), this._hashTargets.set(e, s), this._arrayTargets.push(s)), s.target = e, s.actions.push(t), t.startWithTarget(e);
  }
  removeAllActions() {
    const t = this._arrayTargets;
    for (let e = 0; e < t.length; e++) {
      const i = t[e];
      i && this._putElement(i);
    }
    this._arrayTargets.length = 0, this._hashTargets = /* @__PURE__ */ new Map();
  }
  removeAllActionsFromTarget(t) {
    if (t == null) return;
    const e = this._hashTargets.get(t);
    e && (e.actions.length = 0, this._deleteHashElement(e));
  }
  removeAction(t) {
    if (t == null) return;
    const e = t.getOriginalTarget(), i = this._hashTargets.get(e);
    if (i) {
      for (let s = 0; s < i.actions.length; s++)
        if (i.actions[s] === t) {
          i.actions.splice(s, 1), i.actionIndex >= s && i.actionIndex--;
          break;
        }
    }
  }
  _removeActionByTag(t, e, i) {
    for (let s = 0, r = e.actions.length; s < r; ++s) {
      const o = e.actions[s];
      if (o && o.tag === t) {
        if (i && o.getOriginalTarget() !== i)
          continue;
        this._removeActionAtIndex(s, e);
        break;
      }
    }
  }
  _removeAllActionsByTag(t, e, i) {
    for (let s = e.actions.length - 1; s >= 0; --s) {
      const r = e.actions[s];
      if (r && r.tag === t) {
        if (i && r.getOriginalTarget() !== i)
          continue;
        this._removeActionAtIndex(s, e);
      }
    }
  }
  removeActionByTag(t, e) {
    const i = this._hashTargets;
    if (e) {
      const s = i.get(e);
      s && this._removeActionByTag(t, s, e);
    } else
      i.forEach((s) => {
        this._removeActionByTag(t, s);
      });
  }
  removeAllActionsByTag(t, e) {
    const i = this._hashTargets;
    if (e) {
      const s = i.get(e);
      s && this._removeAllActionsByTag(t, s, e);
    } else
      i.forEach((s) => {
        this._removeAllActionsByTag(t, s);
      });
  }
  getActionByTag(t, e) {
    const i = this._hashTargets.get(e);
    if (i && i.actions != null)
      for (let s = 0; s < i.actions.length; ++s) {
        const r = i.actions[s];
        if (r && r.tag === t)
          return r;
      }
    return null;
  }
  getNumberOfRunningActionsInTarget(t) {
    const e = this._hashTargets.get(t);
    return e && e.actions ? e.actions.length : 0;
  }
  pauseTarget(t) {
    const e = this._hashTargets.get(t);
    e && (e.paused = !0);
  }
  resumeTarget(t) {
    const e = this._hashTargets.get(t);
    e && (e.paused = !1);
  }
  pauseAllRunningActions() {
    const t = [], e = this._arrayTargets;
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      s && !s.paused && (s.paused = !0, t.push(s.target));
    }
    return t;
  }
  resumeTargets(t) {
    if (t)
      for (let e = 0; e < t.length; e++)
        t[e] && this.resumeTarget(t[e]);
  }
  pauseTargets(t) {
    if (t)
      for (let e = 0; e < t.length; e++)
        t[e] && this.pauseTarget(t[e]);
  }
  _removeActionAtIndex(t, e) {
    e.actions[t], e.actions.splice(t, 1), e.actionIndex >= t && e.actionIndex--, e.actions.length === 0 && this._deleteHashElement(e);
  }
  update(t) {
    const e = this._arrayTargets;
    let i;
    for (let s = 0; s < e.length; s++) {
      if (this._currentTarget = e[s], i = this._currentTarget, !i.paused && i.actions) {
        for (i.lock = !0, i.actionIndex = 0; i.actionIndex < i.actions.length; i.actionIndex++)
          if (i.currentAction = i.actions[i.actionIndex], !!i.currentAction) {
            if (i.currentAction.step(
              t * (this._isActionInternal(i.currentAction) ? i.currentAction.getSpeed() : 1)
            ), i.currentAction && i.currentAction.isDone()) {
              i.currentAction.stop();
              const r = i.currentAction;
              i.currentAction = null, this.removeAction(r);
            }
            i.currentAction = null;
          }
        i.lock = !1;
      }
      i.actions.length === 0 && this._deleteHashElement(i) && s--;
    }
  }
  _getElement(t, e) {
    let i = this._elementPool.pop();
    return i || (i = new le()), i.target = t, i.paused = !!e, i;
  }
  _putElement(t) {
    t.actions.length = 0, t.actionIndex = 0, t.currentAction = null, t.paused = !1, t.target = null, t.lock = !1, this._elementPool.push(t);
  }
  _deleteHashElement(t) {
    let e = !1;
    if (t && !t.lock && this._hashTargets.get(t.target)) {
      this._hashTargets.delete(t.target);
      const i = this._arrayTargets;
      for (let s = 0, r = i.length; s < r; s++)
        if (i[s] === t) {
          i.splice(s, 1);
          break;
        }
      this._putElement(t), e = !0;
    }
    return e;
  }
  _isActionInternal(t) {
    return typeof t._speedMethod < "u";
  }
}
const W = class W {
  constructor() {
    this.actionMgr = new ue();
  }
  static get instance() {
    return this._instance || (this._instance = new W()), this._instance;
  }
  get ActionManager() {
    return this.actionMgr;
  }
  update(t) {
    this.actionMgr.update(t);
  }
};
W._instance = null;
let p = W;
const fe = () => 0, de = (n) => n, _t = (n) => n * n, pt = (n) => n * (2 - n), ge = (n) => (n *= 2, n < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1)), mt = (n) => n * n * n, wt = (n) => --n * n * n + 1, _e = (n) => (n *= 2, n < 1 ? 0.5 * n * n * n : 0.5 * ((n -= 2) * n * n + 2)), At = (n) => n * n * n * n, yt = (n) => 1 - --n * n * n * n, pe = (n) => (n *= 2, n < 1 ? 0.5 * n * n * n * n : -0.5 * ((n -= 2) * n * n * n - 2)), vt = (n) => n * n * n * n * n, Ct = (n) => --n * n * n * n * n + 1, me = (n) => (n *= 2, n < 1 ? 0.5 * n * n * n * n * n : 0.5 * ((n -= 2) * n * n * n * n + 2)), St = (n) => n === 1 ? 1 : 1 - Math.cos(n * Math.PI / 2), Tt = (n) => Math.sin(n * Math.PI / 2), we = (n) => 0.5 * (1 - Math.cos(Math.PI * n)), bt = (n) => n === 0 ? 0 : Math.pow(1024, n - 1), xt = (n) => n === 1 ? 1 : 1 - Math.pow(2, -10 * n), Ae = (n) => n === 0 ? 0 : n === 1 ? 1 : (n *= 2, n < 1 ? 0.5 * Math.pow(1024, n - 1) : 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2)), Mt = (n) => 1 - Math.sqrt(1 - n * n), It = (n) => Math.sqrt(1 - --n * n), ye = (n) => (n *= 2, n < 1 ? -0.5 * (Math.sqrt(1 - n * n) - 1) : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1)), Et = (n) => {
  let t, e = 0.1;
  const i = 0.4;
  return n === 0 ? 0 : n === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), -(e * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / i)));
}, Bt = (n) => {
  let t, e = 0.1;
  const i = 0.4;
  return n === 0 ? 0 : n === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), e * Math.pow(2, -10 * n) * Math.sin((n - t) * (2 * Math.PI) / i) + 1);
}, ve = (n) => {
  let t, e = 0.1;
  const i = 0.4;
  return n === 0 ? 0 : n === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), n *= 2, n < 1 ? -0.5 * (e * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / i)) : e * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / i) * 0.5 + 1);
}, Pt = (n) => n === 1 ? 1 : n * n * ((1.70158 + 1) * n - 1.70158), Ot = (n) => n === 0 ? 0 : --n * n * ((1.70158 + 1) * n + 1.70158) + 1, Ce = (n) => {
  const t = 2.5949095;
  return n *= 2, n < 1 ? 0.5 * (n * n * ((t + 1) * n - t)) : 0.5 * ((n -= 2) * n * ((t + 1) * n + t) + 2);
}, tt = (n) => 1 - R(1 - n), R = (n) => n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375, Se = (n) => n < 0.5 ? tt(n * 2) * 0.5 : R(n * 2 - 1) * 0.5 + 0.5, Te = (n) => n <= 0 ? 0 : n * n * (3 - 2 * n), be = (n) => n <= 0 ? 0 : n * n * n * (n * (n * 6 - 15) + 10), _ = (n, t) => (e) => e < 0.5 ? t(e * 2) / 2 : n(2 * e - 1) / 2 + 0.5, xe = _(_t, pt), Me = _(mt, wt), Ie = _(At, yt), Ee = _(vt, Ct), Be = _(St, Tt), Pe = _(bt, xt), Oe = _(Mt, It), De = _(Et, Bt), We = _(Pt, Ot), Le = _(tt, R), ht = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  backIn: Pt,
  backInOut: Ce,
  backOut: Ot,
  backOutIn: We,
  bounceIn: tt,
  bounceInOut: Se,
  bounceOut: R,
  bounceOutIn: Le,
  circIn: Mt,
  circInOut: ye,
  circOut: It,
  circOutIn: Oe,
  constant: fe,
  cubicIn: mt,
  cubicInOut: _e,
  cubicOut: wt,
  cubicOutIn: Me,
  elasticIn: Et,
  elasticInOut: ve,
  elasticOut: Bt,
  elasticOutIn: De,
  expoIn: bt,
  expoInOut: Ae,
  expoOut: xt,
  expoOutIn: Pe,
  fade: be,
  linear: de,
  quadIn: _t,
  quadInOut: ge,
  quadOut: pt,
  quadOutIn: xe,
  quartIn: At,
  quartInOut: pe,
  quartOut: yt,
  quartOutIn: Ie,
  quintIn: vt,
  quintInOut: me,
  quintOut: Ct,
  quintOutIn: Ee,
  sineIn: St,
  sineInOut: we,
  sineOut: Tt,
  sineOutIn: Be,
  smooth: Te
}, Symbol.toStringTag, { value: "Module" })), Fe = (n) => {
  const t = n.charAt(0);
  if (/[A-Z]/.test(t)) {
    n = n.replace(t, t.toLowerCase());
    const e = n.split("-");
    if (e.length === 2) {
      const i = e[0];
      if (i === "linear")
        n = "linear";
      else {
        const s = e[1];
        switch (i) {
          case "quadratic":
            n = `quad${s}`;
            break;
          case "quartic":
            n = `quart${s}`;
            break;
          case "quintic":
            n = `quint${s}`;
            break;
          case "sinusoidal":
            n = `sine${s}`;
            break;
          case "exponential":
            n = `expo${s}`;
            break;
          case "circular":
            n = `circ${s}`;
            break;
          default:
            n = i + s;
            break;
        }
      }
    }
  }
  return n;
};
class D extends h {
  constructor(t, e, i) {
    if (super(), i == null)
      i = /* @__PURE__ */ Object.create(null);
    else if (i.easing && typeof i.easing == "string" && (i.easing = Fe(i.easing)), i.progress || (i.progress = this.progress), i.easing && typeof i.easing == "string") {
      const s = i.easing;
      i.easing = ht[s];
    }
    this._opts = i, this._props = /* @__PURE__ */ Object.create(null);
    for (const s in e) {
      if (!e.hasOwnProperty(s)) continue;
      let r = e[s];
      if (typeof r == "function" && (r = r()), r == null || typeof r == "string") continue;
      let o, c;
      r.value !== void 0 && (r.easing || r.progress) && (typeof r.easing == "string" ? o = ht[r.easing] : o = r.easing, c = r.progress, r = r.value);
      const a = /* @__PURE__ */ Object.create(null);
      a.value = r, a.easing = o, a.progress = c, this._props[s] = a;
    }
    this._originProps = e, this.initWithDuration(t);
  }
  clone() {
    const t = new D(this._duration, this._originProps, this._opts);
    return this.cloneDecoration(t), t;
  }
  startWithTarget(t) {
    h.prototype.startWithTarget.call(this, t);
    const e = !!this._opts.relative, i = this._props;
    for (const s in i) {
      const r = t[s];
      if (r === void 0)
        continue;
      const o = i[s], c = o.value;
      if (typeof r == "number")
        o.start = r, o.current = r, o.end = e ? r + c : c;
      else if (typeof r == "object") {
        o.start == null && (o.start = {}, o.current = {}, o.end = {});
        for (const a in c)
          isNaN(r[a]) || (o.start[a] = r[a], o.current[a] = r[a], o.end[a] = e ? r[a] + c[a] : c[a]);
      }
    }
    this._opts.onStart && this._opts.onStart(this.target);
  }
  update(t) {
    const e = this.target;
    if (!e) return;
    const i = this._props, s = this._opts;
    let r = t;
    s.easing && (r = s.easing(t));
    const o = s.progress;
    for (const c in i) {
      const a = i[c], g = a.easing ? a.easing(t) : r, u = a.progress ? a.progress : o, d = a.start, T = a.end;
      if (typeof d == "number")
        a.current = u(d, T, a.current, g);
      else if (typeof d == "object")
        for (const w in d)
          a.current[w] = u(d[w], T[w], a.current[w], g);
      e[c] = a.current;
    }
    s.onUpdate && s.onUpdate(this.target, t), t === 1 && s.onComplete && s.onComplete(this.target);
  }
  progress(t, e, i, s) {
    return t + (e - t) * s;
  }
}
class et extends E {
  constructor(t) {
    super(), this._props = {}, t !== void 0 && this.init(t);
  }
  init(t) {
    for (const e in t)
      this._props[e] = t[e];
    return !0;
  }
  update() {
    const t = this._props, e = this.target;
    for (const i in t)
      e[i] = t[i];
  }
  clone() {
    const t = new et();
    return t.init(this._props), t;
  }
}
const f = class f {
  constructor(t) {
    this._actions = [], this._finalAction = null, this._target = null, this._tag = -1, this._target = t === void 0 ? null : t;
  }
  set tag(t) {
    this._tag = t;
  }
  then(t) {
    return t instanceof m ? this._actions.push(t.clone()) : this._actions.push(t._union()), this;
  }
  target(t) {
    return this._target = t, this;
  }
  start() {
    return this._target ? (this._finalAction && p.instance.ActionManager.removeAction(this._finalAction), this._finalAction = this._union(), this._finalAction.tag = this._tag, p.instance.ActionManager.addAction(this._finalAction, this._target, !1), this) : (console.warn("Please set target to tween first"), this);
  }
  stop() {
    return this._finalAction && p.instance.ActionManager.removeAction(this._finalAction), this;
  }
  clone(t) {
    const e = this._union();
    return new f(t).then(e.clone());
  }
  union() {
    const t = this._union();
    return this._actions.length = 0, this._actions.push(t), this;
  }
  to(t, e, i) {
    i = i || /* @__PURE__ */ Object.create(null), i.relative = !1;
    const s = new D(t, e, i);
    return this._actions.push(s), this;
  }
  from(t, e, i) {
    i = i || /* @__PURE__ */ Object.create(null), i.relative = !0;
    const s = new D(t, e, i);
    return this._actions.push(s), this;
  }
  set(t) {
    const e = new et(t);
    return this._actions.push(e), this;
  }
  delay(t) {
    const e = new C(t);
    return this._actions.push(e), this;
  }
  call(t) {
    const e = new k(t);
    return this._actions.push(e), this;
  }
  sequence(...t) {
    const e = f._wrappedSequence(...t);
    return this._actions.push(e), this;
  }
  parallel(...t) {
    const e = f._wrappedParallel(...t);
    return this._actions.push(e), this;
  }
  repeat(t, e) {
    if (t === 1 / 0)
      return this.repeatForever(e);
    const i = this._actions;
    let s;
    e instanceof f ? s = e._union() : s = i.pop();
    const r = new P(s, t);
    return i.push(r), this;
  }
  repeatForever(t) {
    const e = this._actions;
    let i;
    t instanceof f ? i = t._union() : i = e.pop();
    const s = new O(i);
    return e.push(s), this;
  }
  reverseTime(t) {
    const e = this._actions;
    let i;
    t instanceof f ? i = t._union() : i = e.pop();
    const s = new K(i);
    return e.push(s), this;
  }
  static stopAll() {
    p.instance.ActionManager.removeAllActions();
  }
  static stopAllByTag(t, e) {
    p.instance.ActionManager.removeAllActionsByTag(t, e);
  }
  static stopAllByTarget(t) {
    p.instance.ActionManager.removeAllActionsFromTarget(t);
  }
  _union() {
    const t = this._actions;
    let e;
    return t.length === 1 ? e = t[0] : e = N(t), e;
  }
  static _wrappedSequence(...t) {
    const e = f._tmp_args;
    e.length = 0;
    for (let i = t.length, s = 0; s < i; s++) {
      const r = e[s] = t[s];
      r instanceof f && (e[s] = r._union());
    }
    return N.apply(N, e);
  }
  static _wrappedParallel(...t) {
    const e = f._tmp_args;
    e.length = 0;
    for (let i = t.length, s = 0; s < i; s++) {
      const r = e[s] = t[s];
      r instanceof f && (e[s] = r._union());
    }
    return ct.apply(ct, e);
  }
};
f._tmp_args = [];
let lt = f;
class Ue {
  constructor(t) {
    this._viewBuilder = t;
  }
  init(t) {
    return this._view = this._viewBuilder.create(this.setup(), t), this._view;
  }
  destroy() {
    this._view.destroy({ children: !0 });
  }
}
class ut {
  constructor(t, e, i) {
    this._pixi = t, this._viewBuilder = e, this._layers = i;
  }
  setScene(t) {
    var s;
    const e = this._pixi.stage.getChildByName("Scene");
    if (!e) return;
    (s = this._currentScene) == null || s.destroy();
    const i = new t(this._viewBuilder);
    i.init(e), this._currentScene = i, this._layers.sortAll();
  }
  addLayer(t) {
    this._layers.createGroups(t.name, t.order || 0, t.sortable || !1);
  }
  setShared(t) {
    const e = this._pixi.stage.getChildByName("Shared");
    e.removeChildren(), this._viewBuilder.create(t, e);
  }
  removeFromShared(t) {
    const i = this._pixi.stage.getChildByName("Shared").getChildByName(t, !0);
    i && i.destroy({ children: !0 });
  }
}
class ft {
  constructor(t, e, i) {
    this._lifecycle = t, this._executionController = e, this._spineController = i, this._paused = !1, this._gameSpeed = 1;
  }
  /**
   * @description is game paused
   */
  get paused() {
    return this._paused;
  }
  /**
   * @description game speed multiplier
   */
  get gameSpeed() {
    return this._gameSpeed;
  }
  /**
   * @description pause all game logic - Systems, UpdateLoop and Spine.
   */
  pause() {
    this._paused = !0, this._lifecycle.pause(this._paused), this._executionController.pauseAll(), this._spineController.pauseAll();
  }
  /**
   * @description resume all game logic - Systems, UpdateLoop and Spine.
   */
  resume() {
    this._paused = !1, this._lifecycle.pause(this._paused), this._executionController.resumeAll(), this._spineController.resumeAll();
  }
  /**
   * @description set game speed - UpdateLoop and Spine.
   */
  setGameSpeed(t) {
    this._gameSpeed = t, this._lifecycle.setSpeedMultiplier(this._gameSpeed), this._spineController.multyplyTimeScaleAll(this._gameSpeed);
  }
}
class dt {
  constructor(t) {
    this._viewBuilder = t, this._prefabs = /* @__PURE__ */ new Map();
  }
  /**
   * Регистрирует префаб в сервисе.
   * 
   * @param {PrefabTemplate<any>} template - Префаб для регистрации.
   */
  register(t) {
    this._prefabs.set(t, t);
  }
  /**
   * Заменяет зарегистрированный префаб на новый.
   * 
   * @param {PrefabTemplate<any>} template - Префаб для замены.
   * @param {PrefabTemplate<any>} instance - Новый префаб.
   */
  replace(t, e) {
    this._prefabs.set(t, e);
  }
  /**
   * Получает зарегистрированный префаб.
   * 
   * @param {PrefabTemplate<any>} template - Префаб для получения.
   * @returns {PrefabTemplate<any>} Зарегистрированный префаб.
   */
  get(t) {
    const e = this._prefabs.get(t);
    if (!e)
      throw new Error(`Prefab ${t.name} not found`);
    return e;
  }
  /**
   * Создает вьюху на основе зарегистрированного префаба.
   * 
   * @param {View} instance - Префаб для создания.
   * @param {Container} parent - Родительский контейнер для вьюхи.
   * @returns {Container} Созданная вьюха.
   */
  create(t, e) {
    const i = t.create();
    return this._viewBuilder.create(i, e);
  }
}
class je extends Rt {
  connectRender(t, e) {
    this.registerGlobalServices([{ provide: G, useFactory: () => t }]), this.appendToDOM(t, e), this.connectDebugger(t);
  }
  init() {
    super.init();
    const t = l.instance.get(G);
    this.initializeDependencies(t);
    const e = l.instance.get(it), i = l.instance.get($);
    this.createStage(t), this.createRootView("Scene", t), this.createRootView("Shared", t), e.addUpdateCallback((s) => this.update(s, i));
  }
  update(t, e) {
    e.update(t), p.instance.update(t);
  }
  appendToDOM(t, e) {
    e.appendChild(t.view);
  }
  connectDebugger(t) {
    globalThis.__PIXI_APP__ = t;
  }
  initializeDependencies(t) {
    const e = new M(), i = new H(e), s = new dt(i), r = new U(), o = new rt(e), c = new B(), a = new $(), g = new j(), u = new ot(), d = new at(), T = new ut(t, i, c), w = l.instance.get(it), v = l.instance.get(zt), Dt = new ft(w, v, g);
    this.registerGlobalServices([
      { provide: M, useFactory: () => e },
      { provide: H, useFactory: () => i },
      { provide: dt, useFactory: () => s },
      { provide: U, useFactory: () => r },
      { provide: rt, useFactory: () => o },
      { provide: B, useFactory: () => c },
      { provide: $, useFactory: () => a },
      { provide: j, useFactory: () => g },
      { provide: ot, useFactory: () => u },
      { provide: at, useFactory: () => d },
      { provide: ut, useFactory: () => T },
      { provide: ft, useFactory: () => Dt }
    ]);
  }
  createStage(t) {
    const e = l.instance.get(B), i = new Ut.Stage();
    i.sortableChildren = !0, t.stage = i, t.stage.x = t.view.width / 2, t.stage.y = t.view.height / 2, e.setStage(i), e.sortAll();
  }
  createRootView(t, e) {
    const i = new x();
    i.name = t, e.stage.addChild(i);
  }
}
export {
  ee as Asset,
  L as AssetStatus,
  M as AssetsManager,
  je as EmpressPixiCore,
  ft as FlowController,
  B as Layers,
  rt as Loader,
  b as NodeBuilder,
  ce as ObjectPool,
  Kt as OnElementInteractSignal,
  Zt as OnViewCreatedSignal,
  $ as ParticleEmitter,
  kt as PixiEntity,
  Ge as PixiItemPoolFactory,
  at as PoolsController,
  dt as PrefabService,
  Ue as Scene,
  ut as SceneController,
  j as SpineController,
  ot as SpineUtils,
  lt as Tween,
  D as TweenAction,
  p as TweenSystem,
  Ne as View,
  H as ViewBuilder,
  U as ViewEntity
};
