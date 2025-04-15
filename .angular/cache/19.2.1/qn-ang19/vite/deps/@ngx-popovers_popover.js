import {
  Arrow,
  FloatingComponent,
  NgxFloatingConfig
} from "./chunk-2SGA3JZF.js";
import {
  CommonModule,
  DOCUMENT,
  NgTemplateOutlet
} from "./chunk-Y3WWDFZU.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Output,
  RendererFactory2,
  RuntimeError,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵviewQuery
} from "./chunk-BCYMBXXO.js";

// node_modules/@angular/animations/fesm2022/animations.mjs
var AnimationMetadataType;
(function(AnimationMetadataType2) {
  AnimationMetadataType2[AnimationMetadataType2["State"] = 0] = "State";
  AnimationMetadataType2[AnimationMetadataType2["Transition"] = 1] = "Transition";
  AnimationMetadataType2[AnimationMetadataType2["Sequence"] = 2] = "Sequence";
  AnimationMetadataType2[AnimationMetadataType2["Group"] = 3] = "Group";
  AnimationMetadataType2[AnimationMetadataType2["Animate"] = 4] = "Animate";
  AnimationMetadataType2[AnimationMetadataType2["Keyframes"] = 5] = "Keyframes";
  AnimationMetadataType2[AnimationMetadataType2["Style"] = 6] = "Style";
  AnimationMetadataType2[AnimationMetadataType2["Trigger"] = 7] = "Trigger";
  AnimationMetadataType2[AnimationMetadataType2["Reference"] = 8] = "Reference";
  AnimationMetadataType2[AnimationMetadataType2["AnimateChild"] = 9] = "AnimateChild";
  AnimationMetadataType2[AnimationMetadataType2["AnimateRef"] = 10] = "AnimateRef";
  AnimationMetadataType2[AnimationMetadataType2["Query"] = 11] = "Query";
  AnimationMetadataType2[AnimationMetadataType2["Stagger"] = 12] = "Stagger";
})(AnimationMetadataType || (AnimationMetadataType = {}));
function trigger(name, definitions) {
  return {
    type: AnimationMetadataType.Trigger,
    name,
    definitions,
    options: {}
  };
}
function animate(timings, styles = null) {
  return {
    type: AnimationMetadataType.Animate,
    styles,
    timings
  };
}
function sequence(steps, options = null) {
  return {
    type: AnimationMetadataType.Sequence,
    steps,
    options
  };
}
function style(tokens) {
  return {
    type: AnimationMetadataType.Style,
    styles: tokens,
    offset: null
  };
}
function transition(stateChangeExpr, steps, options = null) {
  return {
    type: AnimationMetadataType.Transition,
    expr: stateChangeExpr,
    animation: steps,
    options
  };
}
var AnimationBuilder = class _AnimationBuilder {
  static ɵfac = function AnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnimationBuilder)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AnimationBuilder,
    factory: () => (() => inject(BrowserAnimationBuilder))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(BrowserAnimationBuilder)
    }]
  }], null, null);
})();
var AnimationFactory = class {
};
var BrowserAnimationBuilder = class _BrowserAnimationBuilder extends AnimationBuilder {
  animationModuleType = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  });
  _nextAnimationId = 0;
  _renderer;
  constructor(rootRenderer, doc) {
    super();
    const typeData = {
      id: "0",
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {
        animation: []
      }
    };
    this._renderer = rootRenderer.createRenderer(doc.body, typeData);
    if (this.animationModuleType === null && !isAnimationRenderer(this._renderer)) {
      throw new RuntimeError(3600, (typeof ngDevMode === "undefined" || ngDevMode) && "Angular detected that the `AnimationBuilder` was injected, but animation support was not enabled. Please make sure that you enable animations in your application by calling `provideAnimations()` or `provideAnimationsAsync()` function.");
    }
  }
  build(animation) {
    const id = this._nextAnimationId;
    this._nextAnimationId++;
    const entry = Array.isArray(animation) ? sequence(animation) : animation;
    issueAnimationCommand(this._renderer, null, id, "register", [entry]);
    return new BrowserAnimationFactory(id, this._renderer);
  }
  static ɵfac = function BrowserAnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrowserAnimationBuilder)(ɵɵinject(RendererFactory2), ɵɵinject(DOCUMENT));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _BrowserAnimationBuilder,
    factory: _BrowserAnimationBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserAnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: RendererFactory2
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var BrowserAnimationFactory = class extends AnimationFactory {
  _id;
  _renderer;
  constructor(_id, _renderer) {
    super();
    this._id = _id;
    this._renderer = _renderer;
  }
  create(element, options) {
    return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
  }
};
var RendererAnimationPlayer = class {
  id;
  element;
  _renderer;
  parentPlayer = null;
  _started = false;
  constructor(id, element, options, _renderer) {
    this.id = id;
    this.element = element;
    this._renderer = _renderer;
    this._command("create", options);
  }
  _listen(eventName, callback) {
    return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
  }
  _command(command, ...args) {
    issueAnimationCommand(this._renderer, this.element, this.id, command, args);
  }
  onDone(fn) {
    this._listen("done", fn);
  }
  onStart(fn) {
    this._listen("start", fn);
  }
  onDestroy(fn) {
    this._listen("destroy", fn);
  }
  init() {
    this._command("init");
  }
  hasStarted() {
    return this._started;
  }
  play() {
    this._command("play");
    this._started = true;
  }
  pause() {
    this._command("pause");
  }
  restart() {
    this._command("restart");
  }
  finish() {
    this._command("finish");
  }
  destroy() {
    this._command("destroy");
  }
  reset() {
    this._command("reset");
    this._started = false;
  }
  setPosition(p) {
    this._command("setPosition", p);
  }
  getPosition() {
    return unwrapAnimationRenderer(this._renderer)?.engine?.players[this.id]?.getPosition() ?? 0;
  }
  totalTime = 0;
};
function issueAnimationCommand(renderer, element, id, command, args) {
  renderer.setProperty(element, `@@${id}:${command}`, args);
}
function unwrapAnimationRenderer(renderer) {
  const type = renderer.ɵtype;
  if (type === 0) {
    return renderer;
  } else if (type === 1) {
    return renderer.animationRenderer;
  }
  return null;
}
function isAnimationRenderer(renderer) {
  const type = renderer.ɵtype;
  return type === 0 || type === 1;
}

// node_modules/@ngx-popovers/popover/fesm2022/ngx-popovers-popover.mjs
var _c0 = ["*", [["ngx-arrow"]]];
var _c1 = ["*", "ngx-arrow"];
function PopoverComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div");
    ɵɵlistener("@fadeInOut.start", function PopoverComponent_Conditional_1_Conditional_1_Template_div_animation_fadeInOut_start_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onAnimationStart($event));
    })("@fadeInOut.done", function PopoverComponent_Conditional_1_Conditional_1_Template_div_animation_fadeInOut_done_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onAnimationDone($event));
    });
    ɵɵelementContainer(1, 3);
    ɵɵprojection(2, 1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    const empty_r4 = ɵɵreference(3);
    ɵɵproperty("@fadeInOut", void 0)("@.disabled", ctx_r1.animationDisabled);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", (ctx_r1.template == null ? null : ctx_r1.template.templateRef) || empty_r4);
  }
}
function PopoverComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-floating", 2);
    ɵɵlistener("clickedInside", function PopoverComponent_Conditional_1_Template_ngx_floating_clickedInside_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onClickedInside($event));
    })("clickedOutside", function PopoverComponent_Conditional_1_Template_ngx_floating_clickedOutside_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onClickedOutside($event));
    })("computePositionReturn", function PopoverComponent_Conditional_1_Template_ngx_floating_computePositionReturn_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onComputePosition($event));
    });
    ɵɵtemplate(1, PopoverComponent_Conditional_1_Conditional_1_Template, 3, 3, "div");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("reference", ctx_r1.anchor)("placement", ctx_r1.placement)("middleware", ctx_r1.middleware)("autoUpdate", ctx_r1.autoUpdate)("bindTo", ctx_r1.bindTo)("strategy", ctx_r1.strategy());
    ɵɵadvance();
    ɵɵconditional(ctx_r1.value ? 1 : -1);
  }
}
function PopoverComponent_ng_template_2_Template(rf, ctx) {
}
var NgxPopoverConfig = class extends NgxFloatingConfig {
  constructor(config = {}) {
    super();
    this.arrow = true;
    this.arrowPadding = 2;
    this.autoUpdate = true;
    this.closeOnClickedOutside = true;
    Object.assign(this, config);
  }
};
var NGX_POPOVER_CONFIG = new InjectionToken("NGX_POPOVER_CONFIG", {
  providedIn: "root",
  factory: () => new NgxPopoverConfig()
});
var PopoverTemplate = class _PopoverTemplate {
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static {
    this.ɵfac = function PopoverTemplate_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverTemplate)(ɵɵdirectiveInject(TemplateRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PopoverTemplate,
      selectors: [["", "ngx-popover-template", ""]]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverTemplate, [{
    type: Directive,
    args: [{
      selector: "[ngx-popover-template]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], null);
})();
var PopoverComponent = class _PopoverComponent {
  constructor() {
    this.config = inject(NGX_POPOVER_CONFIG);
    this.cdRef = inject(ChangeDetectorRef);
    this.el = inject(ElementRef);
    this.anchor = this.el.nativeElement;
    this.placement = this.config.placement;
    this.strategy = input(this.config.strategy);
    this.middleware = this.config.middleware;
    this.autoUpdate = this.config.autoUpdate;
    this.bindTo = this.config.bindTo;
    this.closeOnClickedOutside = this.config.closeOnClickedOutside;
    this.disabled = false;
    this.animationDisabled = false;
    this.value = false;
    this.valueChange = new EventEmitter();
    this.show = new EventEmitter();
    this.hide = new EventEmitter();
    this.clickedOutside = new EventEmitter();
    this.clickedInside = new EventEmitter();
    this.animationStart = new EventEmitter();
    this.animationDone = new EventEmitter();
    this.computePosition = new EventEmitter();
    this.isAnimating = signal(false);
  }
  /* Set the Floating to the arrow */
  set floatingComponent(component) {
    if (this.arrow) {
      this.arrow.setFloating(component);
    }
  }
  ngOnChanges(changes) {
    const currentValue = changes["value"]?.currentValue;
    if (currentValue === true) {
      this.open();
    }
    if (currentValue === false) {
      this.close();
    }
  }
  onClick(event) {
    if (isElement(event.target)) {
      if (this.anchor.contains(event.target)) {
        this.toggle();
      }
    }
  }
  toggle() {
    if (!this.disabled) {
      if (this.value) {
        this.close();
      } else {
        this.open();
      }
    }
  }
  open() {
    this.isAnimating.set(true);
    this.value = true;
    this.valueChange.emit(true);
    this.show.emit();
  }
  close() {
    if (this.isAnimating()) {
      return;
    }
    this.isAnimating.set(true);
    this.value = false;
    this.valueChange.emit(false);
    this.hide.emit();
  }
  onClickedInside(element) {
    this.clickedInside.emit(element);
  }
  onClickedOutside(element) {
    this.clickedOutside.emit(element);
    if (this.closeOnClickedOutside) {
      this.close();
      this.cdRef.detectChanges();
    }
  }
  onAnimationStart($event) {
    this.isAnimating.set(true);
    this.animationStart.emit($event);
  }
  onAnimationDone($event) {
    this.isAnimating.set(false);
    this.animationDone.emit($event);
  }
  onComputePosition($event) {
    this.computePosition.emit($event);
  }
  static {
    this.ɵfac = function PopoverComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _PopoverComponent,
      selectors: [["ngx-popover"]],
      contentQueries: function PopoverComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, PopoverTemplate, 5);
          ɵɵcontentQuery(dirIndex, Arrow, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.arrow = _t.first);
        }
      },
      viewQuery: function PopoverComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(FloatingComponent, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.floatingComponent = _t.first);
        }
      },
      hostBindings: function PopoverComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function PopoverComponent_click_HostBindingHandler($event) {
            return ctx.onClick($event);
          });
        }
      },
      inputs: {
        anchor: "anchor",
        placement: "placement",
        strategy: [1, "strategy"],
        middleware: "middleware",
        autoUpdate: [2, "autoUpdate", "autoUpdate", booleanAttribute],
        bindTo: "bindTo",
        closeOnClickedOutside: [2, "closeOnClickedOutside", "closeOnClickedOutside", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        animationDisabled: [2, "animationDisabled", "animationDisabled", booleanAttribute],
        value: [2, "value", "value", booleanAttribute]
      },
      outputs: {
        valueChange: "valueChange",
        show: "show",
        hide: "hide",
        clickedOutside: "clickedOutside",
        clickedInside: "clickedInside",
        animationStart: "animationStart",
        animationDone: "animationDone",
        computePosition: "computePosition"
      },
      features: [ɵɵNgOnChangesFeature],
      ngContentSelectors: _c1,
      decls: 4,
      vars: 1,
      consts: [["empty", ""], [3, "reference", "placement", "middleware", "autoUpdate", "bindTo", "strategy"], [3, "clickedInside", "clickedOutside", "computePositionReturn", "reference", "placement", "middleware", "autoUpdate", "bindTo", "strategy"], [3, "ngTemplateOutlet"]],
      template: function PopoverComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c0);
          ɵɵprojection(0);
          ɵɵtemplate(1, PopoverComponent_Conditional_1_Template, 2, 7, "ngx-floating", 1)(2, PopoverComponent_ng_template_2_Template, 0, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵconditional(ctx.value || ctx.isAnimating() ? 1 : -1);
        }
      },
      dependencies: [CommonModule, NgTemplateOutlet, FloatingComponent],
      encapsulation: 2,
      data: {
        animation: [trigger("fadeInOut", [transition(":enter", [style({
          opacity: 0,
          transform: "scale(0.9)"
        }), animate(140, style({
          opacity: 1,
          transform: "scale(1)"
        }))]), transition(":leave", [animate(110, style({
          opacity: 0
        }))])])]
      },
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverComponent, [{
    type: Component,
    args: [{
      selector: "ngx-popover",
      imports: [CommonModule, FloatingComponent],
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      animations: [trigger("fadeInOut", [transition(":enter", [style({
        opacity: 0,
        transform: "scale(0.9)"
      }), animate(140, style({
        opacity: 1,
        transform: "scale(1)"
      }))]), transition(":leave", [animate(110, style({
        opacity: 0
      }))])])],
      template: '<!--\n  By default, this content will be\n  the anchor and reference\n  of the Popover\n-->\n<ng-content />\n\n@if (value || isAnimating()) {\n  <ngx-floating\n    [reference]="anchor"\n    [placement]="placement"\n    [middleware]="middleware"\n    [autoUpdate]="autoUpdate"\n    [bindTo]="bindTo"\n    [strategy]="strategy()"\n\n    (clickedInside)="onClickedInside($event)"\n    (clickedOutside)="onClickedOutside($event)"\n    (computePositionReturn)="onComputePosition($event)"\n  >\n    @if (value) {\n      <div\n        @fadeInOut\n        (@fadeInOut.start)="onAnimationStart($event)"\n        (@fadeInOut.done)="onAnimationDone($event)"\n        [@.disabled]="animationDisabled"\n      >\n        <ng-container\n          [ngTemplateOutlet]="template?.templateRef || empty"\n        />\n\n        <ng-content select="ngx-arrow" />\n      </div>\n    }\n  </ngx-floating>\n}\n\n<ng-template #empty />\n'
    }]
  }], null, {
    template: [{
      type: ContentChild,
      args: [PopoverTemplate]
    }],
    arrow: [{
      type: ContentChild,
      args: [Arrow]
    }],
    floatingComponent: [{
      type: ViewChild,
      args: [FloatingComponent]
    }],
    anchor: [{
      type: Input
    }],
    placement: [{
      type: Input
    }],
    middleware: [{
      type: Input
    }],
    autoUpdate: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    bindTo: [{
      type: Input
    }],
    closeOnClickedOutside: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    animationDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    value: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    valueChange: [{
      type: Output
    }],
    show: [{
      type: Output
    }],
    hide: [{
      type: Output
    }],
    clickedOutside: [{
      type: Output
    }],
    clickedInside: [{
      type: Output
    }],
    animationStart: [{
      type: Output
    }],
    animationDone: [{
      type: Output
    }],
    computePosition: [{
      type: Output
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
function isElement(element) {
  return element instanceof Element;
}
var PopoverAnchor = class _PopoverAnchor {
  constructor(el) {
    this.el = el;
    this.popover = inject(PopoverComponent);
    this.popover.anchor = el.nativeElement;
  }
  static {
    this.ɵfac = function PopoverAnchor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverAnchor)(ɵɵdirectiveInject(ElementRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PopoverAnchor,
      selectors: [["", "ngx-popover-anchor", ""]]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverAnchor, [{
    type: Directive,
    args: [{
      selector: "[ngx-popover-anchor]",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }], null);
})();
var PopoverClose = class _PopoverClose {
  constructor() {
    this.popover = inject(PopoverComponent);
  }
  onClick() {
    this.popover.close();
  }
  static {
    this.ɵfac = function PopoverClose_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverClose)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PopoverClose,
      selectors: [["", "ngx-popover-close", ""]],
      hostBindings: function PopoverClose_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function PopoverClose_click_HostBindingHandler() {
            return ctx.onClick();
          });
        }
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverClose, [{
    type: Directive,
    args: [{
      selector: "[ngx-popover-close]",
      standalone: true
    }]
  }], null, {
    onClick: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var PopoverModule = class _PopoverModule {
  static {
    this.ɵfac = function PopoverModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _PopoverModule,
      imports: [PopoverComponent, PopoverTemplate, PopoverAnchor, PopoverClose],
      exports: [PopoverComponent, PopoverTemplate, PopoverAnchor, PopoverClose]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [PopoverComponent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverModule, [{
    type: NgModule,
    args: [{
      declarations: [],
      imports: [PopoverComponent, PopoverTemplate, PopoverAnchor, PopoverClose],
      exports: [PopoverComponent, PopoverTemplate, PopoverAnchor, PopoverClose]
    }]
  }], null, null);
})();
export {
  NGX_POPOVER_CONFIG,
  NgxPopoverConfig,
  PopoverAnchor,
  PopoverClose,
  PopoverComponent,
  PopoverModule,
  PopoverTemplate
};
/*! Bundled license information:

@angular/animations/fesm2022/animations.mjs:
  (**
   * @license Angular v19.2.1
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=@ngx-popovers_popover.js.map
