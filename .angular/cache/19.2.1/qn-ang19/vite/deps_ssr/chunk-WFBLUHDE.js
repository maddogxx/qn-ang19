import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  CommonModule,
  DOCUMENT,
  NgComponentOutlet,
  isPlatformBrowser,
  isPlatformServer
} from "./chunk-LCBAU2VD.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  INJECTOR$1,
  Inject,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
  Renderer2,
  RuntimeError,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  assertInInjectionContext,
  assertNotInReactiveContext,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  numberAttribute,
  output,
  require_cjs,
  require_operators,
  setClassMetadata,
  signal,
  viewChild,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵviewQuerySignal
} from "./chunk-62672OIL.js";
import {
  __async,
  __objRest,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-YHCV7DAQ.js";

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return __spreadValues({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, padding);
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = (reference, floating, config) => __async(void 0, null, function* () {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(floating);
  let rects = yield platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = yield fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = __spreadProps(__spreadValues({}, middlewareData), {
      [name]: __spreadValues(__spreadValues({}, middlewareData[name]), data)
    });
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? yield platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
});
function detectOverflow(state, options) {
  return __async(this, null, function* () {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform: platform2,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = "clippingAncestors",
      rootBoundary = "viewport",
      elementContext = "floating",
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(yield platform2.getClippingRect({
      element: ((_await$platform$isEle = yield platform2.isElement == null ? void 0 : platform2.isElement(element)) != null ? _await$platform$isEle : true) ? element : element.contextElement || (yield platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === "floating" ? {
      x,
      y,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = yield platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating);
    const offsetScale = (yield platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? (yield platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? yield platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  });
}
var arrow = (options) => ({
  name: "arrow",
  options,
  fn(state) {
    return __async(this, null, function* () {
      const {
        x,
        y,
        placement,
        rects,
        platform: platform2,
        elements,
        middlewareData
      } = state;
      const {
        element,
        padding = 0
      } = evaluate(options, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getPaddingObject(padding);
      const coords = {
        x,
        y
      };
      const axis = getAlignmentAxis(placement);
      const length = getAxisLength(axis);
      const arrowDimensions = yield platform2.getDimensions(element);
      const isYAxis = axis === "y";
      const minProp = isYAxis ? "top" : "left";
      const maxProp = isYAxis ? "bottom" : "right";
      const clientProp = isYAxis ? "clientHeight" : "clientWidth";
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = yield platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element);
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
      if (!clientSize || !(yield platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
      const min$1 = minPadding;
      const max2 = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset3 = clamp(min$1, center, max2);
      const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
      return {
        [axis]: coords[axis] + alignmentOffset,
        data: __spreadValues({
          [axis]: offset3,
          centerOffset: center - offset3 - alignmentOffset
        }, shouldAddOffset && {
          alignmentOffset
        }),
        reset: shouldAddOffset
      };
    });
  }
});
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter((placement) => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
var autoPlacement = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "autoPlacement",
    options,
    fn(state) {
      return __async(this, null, function* () {
        var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
        const {
          rects,
          middlewareData,
          placement,
          platform: platform2,
          elements
        } = state;
        const _a2 = evaluate(options, state), {
          crossAxis = false,
          alignment,
          allowedPlacements = placements,
          autoAlignment = true
        } = _a2, detectOverflowOptions = __objRest(_a2, [
          "crossAxis",
          "alignment",
          "allowedPlacements",
          "autoAlignment"
        ]);
        const placements$1 = alignment !== void 0 || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
        const overflow = yield detectOverflow(state, detectOverflowOptions);
        const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
        const currentPlacement = placements$1[currentIndex];
        if (currentPlacement == null) {
          return {};
        }
        const alignmentSides = getAlignmentSides(currentPlacement, rects, yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
        if (placement !== currentPlacement) {
          return {
            reset: {
              placement: placements$1[0]
            }
          };
        }
        const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
        const allOverflows = [...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [], {
          placement: currentPlacement,
          overflows: currentOverflows
        }];
        const nextPlacement = placements$1[currentIndex + 1];
        if (nextPlacement) {
          return {
            data: {
              index: currentIndex + 1,
              overflows: allOverflows
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        const placementsSortedByMostSpace = allOverflows.map((d) => {
          const alignment2 = getAlignment(d.placement);
          return [d.placement, alignment2 && crossAxis ? (
            // Check along the mainAxis and main crossAxis side.
            d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0)
          ) : (
            // Check only the mainAxis.
            d.overflows[0]
          ), d.overflows];
        }).sort((a, b) => a[1] - b[1]);
        const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter((d) => d[2].slice(
          0,
          // Aligned placements should not check their opposite crossAxis
          // side.
          getAlignment(d[0]) ? 2 : 3
        ).every((v) => v <= 0));
        const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
        if (resetPlacement !== placement) {
          return {
            data: {
              index: currentIndex + 1,
              overflows: allOverflows
            },
            reset: {
              placement: resetPlacement
            }
          };
        }
        return {};
      });
    }
  };
};
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    fn(state) {
      return __async(this, null, function* () {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform: platform2,
          elements
        } = state;
        const _a2 = evaluate(options, state), {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = "bestFit",
          fallbackAxisSideDirection = "none",
          flipAlignment = true
        } = _a2, detectOverflowOptions = __objRest(_a2, [
          "mainAxis",
          "crossAxis",
          "fallbackPlacements",
          "fallbackStrategy",
          "fallbackAxisSideDirection",
          "flipAlignment"
        ]);
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating);
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements2 = [initialPlacement, ...fallbackPlacements];
        const overflow = yield detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides2 = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements2[nextIndex];
          if (nextPlacement) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
          let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case "bestFit": {
                var _overflowsData$filter2;
                const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === "y";
                  }
                  return true;
                }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement2) {
                  resetPlacement = placement2;
                }
                break;
              }
              case "initialPlacement":
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      });
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    fn(state) {
      return __async(this, null, function* () {
        const {
          rects
        } = state;
        const _a2 = evaluate(options, state), {
          strategy = "referenceHidden"
        } = _a2, detectOverflowOptions = __objRest(_a2, [
          "strategy"
        ]);
        switch (strategy) {
          case "referenceHidden": {
            const overflow = yield detectOverflow(state, __spreadProps(__spreadValues({}, detectOverflowOptions), {
              elementContext: "reference"
            }));
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
          case "escaped": {
            const overflow = yield detectOverflow(state, __spreadProps(__spreadValues({}, detectOverflowOptions), {
              altBoundary: true
            }));
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
          default: {
            return {};
          }
        }
      });
    }
  };
};
function getBoundingRect(rects) {
  const minX = min(...rects.map((rect) => rect.left));
  const minY = min(...rects.map((rect) => rect.top));
  const maxX = max(...rects.map((rect) => rect.right));
  const maxY = max(...rects.map((rect) => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map((rect) => rectToClientRect(getBoundingRect(rect)));
}
var inline = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "inline",
    options,
    fn(state) {
      return __async(this, null, function* () {
        const {
          placement,
          elements,
          rects,
          platform: platform2,
          strategy
        } = state;
        const {
          padding = 2,
          x,
          y
        } = evaluate(options, state);
        const nativeClientRects = Array.from((yield platform2.getClientRects == null ? void 0 : platform2.getClientRects(elements.reference)) || []);
        const clientRects = getRectsByLine(nativeClientRects);
        const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
        const paddingObject = getPaddingObject(padding);
        function getBoundingClientRect2() {
          if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
            return clientRects.find((rect) => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
          }
          if (clientRects.length >= 2) {
            if (getSideAxis(placement) === "y") {
              const firstRect = clientRects[0];
              const lastRect = clientRects[clientRects.length - 1];
              const isTop = getSide(placement) === "top";
              const top2 = firstRect.top;
              const bottom2 = lastRect.bottom;
              const left2 = isTop ? firstRect.left : lastRect.left;
              const right2 = isTop ? firstRect.right : lastRect.right;
              const width2 = right2 - left2;
              const height2 = bottom2 - top2;
              return {
                top: top2,
                bottom: bottom2,
                left: left2,
                right: right2,
                width: width2,
                height: height2,
                x: left2,
                y: top2
              };
            }
            const isLeftSide = getSide(placement) === "left";
            const maxRight = max(...clientRects.map((rect) => rect.right));
            const minLeft = min(...clientRects.map((rect) => rect.left));
            const measureRects = clientRects.filter((rect) => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
            const top = measureRects[0].top;
            const bottom = measureRects[measureRects.length - 1].bottom;
            const left = minLeft;
            const right = maxRight;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
          return fallback;
        }
        const resetRects = yield platform2.getElementRects({
          reference: {
            getBoundingClientRect: getBoundingClientRect2
          },
          floating: elements.floating,
          strategy
        });
        if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
          return {
            reset: {
              rects: resetRects
            }
          };
        }
        return {};
      });
    }
  };
};
function convertValueToCoords(state, options) {
  return __async(this, null, function* () {
    const {
      placement,
      platform: platform2,
      elements
    } = state;
    const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating);
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: rawValue.mainAxis || 0,
      crossAxis: rawValue.crossAxis || 0,
      alignmentAxis: rawValue.alignmentAxis
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  });
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    fn(state) {
      return __async(this, null, function* () {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x,
          y,
          placement,
          middlewareData
        } = state;
        const diffCoords = yield convertValueToCoords(state, options);
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: __spreadProps(__spreadValues({}, diffCoords), {
            placement
          })
        };
      });
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    fn(state) {
      return __async(this, null, function* () {
        const {
          x,
          y,
          placement
        } = state;
        const _a2 = evaluate(options, state), {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: (_ref) => {
              let {
                x: x2,
                y: y2
              } = _ref;
              return {
                x: x2,
                y: y2
              };
            }
          }
        } = _a2, detectOverflowOptions = __objRest(_a2, [
          "mainAxis",
          "crossAxis",
          "limiter"
        ]);
        const coords = {
          x,
          y
        };
        const overflow = yield detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === "y" ? "top" : "left";
          const maxSide = mainAxis === "y" ? "bottom" : "right";
          const min2 = mainAxisCoord + overflow[minSide];
          const max2 = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min2, mainAxisCoord, max2);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === "y" ? "top" : "left";
          const maxSide = crossAxis === "y" ? "bottom" : "right";
          const min2 = crossAxisCoord + overflow[minSide];
          const max2 = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min2, crossAxisCoord, max2);
        }
        const limitedCoords = limiter.fn(__spreadProps(__spreadValues({}, state), {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        }));
        return __spreadProps(__spreadValues({}, limitedCoords), {
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y,
            enabled: {
              [mainAxis]: checkMainAxis,
              [crossAxis]: checkCrossAxis
            }
          }
        });
      });
    }
  };
};
var limitShift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset3 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset3, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : __spreadValues({
        mainAxis: 0,
        crossAxis: 0
      }, rawOffset);
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = ["top", "left"].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    fn(state) {
      return __async(this, null, function* () {
        var _state$middlewareData, _state$middlewareData2;
        const {
          placement,
          rects,
          platform: platform2,
          elements
        } = state;
        const _a2 = evaluate(options, state), {
          apply = () => {
          }
        } = _a2, detectOverflowOptions = __objRest(_a2, [
          "apply"
        ]);
        const overflow = yield detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const isYAxis = getSideAxis(placement) === "y";
        const {
          width,
          height
        } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === "top" || side === "bottom") {
          heightSide = side;
          widthSide = alignment === ((yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
        } else {
          widthSide = side;
          heightSide = alignment === "end" ? "top" : "bottom";
        }
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        const maximumClippingWidth = width - overflow.left - overflow.right;
        const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
        const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
        const noShift = !state.middlewareData.shift;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
          availableWidth = maximumClippingWidth;
        }
        if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
          availableHeight = maximumClippingHeight;
        }
        if (noShift && !alignment) {
          const xMin = max(overflow.left, 0);
          const xMax = max(overflow.right, 0);
          const yMin = max(overflow.top, 0);
          const yMax = max(overflow.bottom, 0);
          if (isYAxis) {
            availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
          } else {
            availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
          }
        }
        yield apply(__spreadProps(__spreadValues({}, state), {
          availableWidth,
          availableHeight
        }));
        const nextDimensions = yield platform2.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      });
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = function(data) {
  return __async(this, null, function* () {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = yield getDimensionsFn(data.floating);
    return {
      reference: getRectRelativeToOffsetParent(data.reference, yield getOffsetParentFn(data.floating), data.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  });
};
function isRTL(element) {
  return getComputedStyle(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, __spreadProps(__spreadValues({}, options), {
        // Handle <iframe>s
        root: root.ownerDocument
      }));
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var detectOverflow2 = detectOverflow;
var offset2 = offset;
var autoPlacement2 = autoPlacement;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var hide2 = hide;
var arrow2 = arrow;
var inline2 = inline;
var limitShift2 = limitShift;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = __spreadValues({
    platform
  }, options);
  const platformWithCache = __spreadProps(__spreadValues({}, mergedOptions.platform), {
    _c: cache
  });
  return computePosition(reference, floating, __spreadProps(__spreadValues({}, mergedOptions), {
    platform: platformWithCache
  }));
};

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
function toSignal(source, options) {
  ngDevMode && assertNotInReactiveContext(toSignal, "Invoking `toSignal` causes new subscriptions every time. Consider moving `toSignal` outside of the reactive context and read the signal value where needed.");
  const requiresCleanup = !options?.manualCleanup;
  requiresCleanup && !options?.injector && assertInInjectionContext(toSignal);
  const cleanupRef = requiresCleanup ? options?.injector?.get(DestroyRef) ?? inject(DestroyRef) : null;
  const equal = makeToSignalEqual(options?.equal);
  let state;
  if (options?.requireSync) {
    state = signal({
      kind: 0
      /* StateKind.NoValue */
    }, {
      equal
    });
  } else {
    state = signal({
      kind: 1,
      value: options?.initialValue
    }, {
      equal
    });
  }
  const sub = source.subscribe({
    next: (value) => state.set({
      kind: 1,
      value
    }),
    error: (error) => {
      if (options?.rejectErrors) {
        throw error;
      }
      state.set({
        kind: 2,
        error
      });
    }
    // Completion of the Observable is meaningless to the signal. Signals don't have a concept of
    // "complete".
  });
  if (options?.requireSync && state().kind === 0) {
    throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
  }
  cleanupRef?.onDestroy(sub.unsubscribe.bind(sub));
  return computed(() => {
    const current = state();
    switch (current.kind) {
      case 1:
        return current.value;
      case 2:
        throw current.error;
      case 0:
        throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
    }
  }, {
    equal: options?.equal
  });
}
function makeToSignalEqual(userEquality = Object.is) {
  return (a, b) => a.kind === 1 && b.kind === 1 && userEquality(a.value, b.value);
}

// node_modules/@ngx-popovers/core/fesm2022/ngx-popovers-core.mjs
var import_rxjs2 = __toESM(require_cjs(), 1);
var _c0 = ["*"];
function PortalComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
var _c1 = ["floating"];
function FloatingComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-portal", 1)(1, "div", 2, 0);
    ɵɵlistener("ngxClickOutside", function FloatingComponent_Conditional_0_Template_div_ngxClickOutside_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onClick($event));
    });
    ɵɵprojection(3);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("bindTo", ctx_r1.bindTo());
    ɵɵadvance();
    ɵɵstyleProp("left", (tmp_3_0 = ctx_r1.coords()) == null ? null : tmp_3_0.x, "px")("top", (tmp_4_0 = ctx_r1.coords()) == null ? null : tmp_4_0.y, "px");
  }
}
var _c2 = ["arrow"];
function Arrow_Conditional_0_ng_template_2_Template(rf, ctx) {
}
function Arrow_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2, 0);
    ɵɵtemplate(2, Arrow_Conditional_0_ng_template_2_Template, 0, 0, "ng-template", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const arrow_r1 = ɵɵreference(1);
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleMap(ctx_r1.styles);
    ɵɵclassProp("hidden", !arrow_r1);
    ɵɵadvance(2);
    ɵɵproperty("ngComponentOutlet", ctx_r1.arrowComponent);
  }
}
var Keys = (obj) => {
  return Object.keys(obj);
};
var isContainElement = (current, target) => {
  if (current instanceof Node && target instanceof Node) {
    return current.contains(target);
  } else {
    return false;
  }
};
var awaitTime = (time = 0) => {
  return new Promise((r) => setTimeout(r, time));
};
var isHTML = (input2) => {
  return input2 instanceof HTMLElement;
};
var isString = (input2) => {
  return typeof input2 === "string";
};
var FloatingService = class _FloatingService {
  constructor() {
    this.computePosition = computePosition2;
    this.autoUpdate = autoUpdate;
  }
  static {
    this.ɵfac = function FloatingService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FloatingService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _FloatingService,
      factory: _FloatingService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FloatingService, [{
    type: Injectable
  }], null, null);
})();
var PlatformService = class _PlatformService {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.isServer = () => isPlatformServer(this.platformId);
    this.isBrowser = () => isPlatformBrowser(this.platformId);
  }
  static {
    this.ɵfac = function PlatformService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PlatformService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _PlatformService,
      factory: _PlatformService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformService, [{
    type: Injectable
  }], null, null);
})();
function isServer(injector = inject(INJECTOR$1)) {
  const platform2 = injector.get(PlatformService);
  return platform2.isServer();
}
function isBrowser(injector = inject(INJECTOR$1)) {
  return !isServer(injector);
}
var PortalComponent = class _PortalComponent {
  parentBySelector(selector) {
    const element = this.document.querySelector(selector);
    if (!element) {
      console.error(`cannot find HTMLElement with query selector: ${selector}`);
    }
    return element;
  }
  constructor(document, viewContainerRef, renderer) {
    this.document = document;
    this.viewContainerRef = viewContainerRef;
    this.renderer = renderer;
    this.isServer = isServer();
    this.portalContent = viewChild(TemplateRef);
    this.bindTo = input();
    this.parent = computed(() => {
      const bindTo = this.bindTo();
      if (isHTML(bindTo)) {
        return bindTo;
      }
      if (isString(bindTo)) {
        return this.parentBySelector(bindTo);
      }
      return this.document.body;
    });
  }
  ngOnInit() {
    this.bind();
  }
  ngOnChanges() {
    this.bind();
  }
  ngOnDestroy() {
    this.panelRef?.remove();
    this.view?.destroy();
  }
  bind() {
    if (this.isServer) {
      return;
    }
    const portalContent = this.portalContent();
    if (portalContent && this.parent()) {
      this.view = this.viewContainerRef.createEmbeddedView(portalContent);
      this.panelRef = this.view.rootNodes[0];
      if (this.panelRef) {
        this.renderer.appendChild(this.parent(), this.panelRef);
      } else {
        console.error(`cannot render component into ${this.parent}`);
      }
    }
  }
  static {
    this.ɵfac = function PortalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PortalComponent)(ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Renderer2));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _PortalComponent,
      selectors: [["ngx-portal"]],
      viewQuery: function PortalComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuerySignal(ctx.portalContent, TemplateRef, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      inputs: {
        bindTo: [1, "bindTo"]
      },
      features: [ɵɵProvidersFeature([PlatformService]), ɵɵNgOnChangesFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function PortalComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, PortalComponent_ng_template_0_Template, 1, 0, "ng-template");
        }
      },
      dependencies: [CommonModule],
      styles: ["[_nghost-%COMP%]{width:0;height:0;display:contents}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortalComponent, [{
    type: Component,
    args: [{
      selector: "ngx-portal",
      imports: [CommonModule],
      providers: [PlatformService],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-template>\n  <ng-content />\n</ng-template>\n",
      styles: [":host{width:0;height:0;display:contents}\n"]
    }]
  }], () => [{
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: ViewContainerRef
  }, {
    type: Renderer2
  }], null);
})();
var NgxFloatingConfig = class {
  constructor(config = {}) {
    this.placement = "bottom";
    this.autoUpdate = true;
    this.middleware = [offset2(4), flip2()];
    Object.assign(this, config);
  }
};
var NGX_FLOATING_CONFIG = new InjectionToken("NGX_FLOATING_CONFIG", {
  providedIn: "root",
  factory: () => new NgxFloatingConfig()
});
var ClickOutsideDirective = class _ClickOutsideDirective {
  constructor(el) {
    this.el = el;
    this.ngxClickOutside = output();
    this.inside = output();
    this.outside = output();
  }
  onClick(event) {
    const target = event.target;
    if (target) {
      if (isContainElement(this.el.nativeElement, target)) {
        this.inside.emit(target);
        this.ngxClickOutside.emit({
          inside: true,
          outside: false,
          target
        });
      } else {
        this.outside.emit(target);
        this.ngxClickOutside.emit({
          inside: false,
          outside: true,
          target
        });
      }
    }
  }
  static {
    this.ɵfac = function ClickOutsideDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ClickOutsideDirective)(ɵɵdirectiveInject(ElementRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ClickOutsideDirective,
      selectors: [["", "ngxClickOutside", ""]],
      hostBindings: function ClickOutsideDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function ClickOutsideDirective_click_HostBindingHandler($event) {
            return ctx.onClick($event);
          }, false, ɵɵresolveDocument);
        }
      },
      outputs: {
        ngxClickOutside: "ngxClickOutside",
        inside: "inside",
        outside: "outside"
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClickOutsideDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxClickOutside]",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }], {
    onClick: [{
      type: HostListener,
      args: ["document:click", ["$event"]]
    }]
  });
})();
var FloatingComponent = class _FloatingComponent {
  ngAfterViewInit() {
    return this.bindToReference();
  }
  ngOnChanges() {
    return this.bindToReference();
  }
  ngDoCheck() {
    this.referenceConnected.set(this._reference()?.isConnected);
  }
  ngOnDestroy() {
    this.cleanup?.();
  }
  constructor() {
    this.config = inject(NGX_FLOATING_CONFIG);
    this.floatingService = inject(FloatingService);
    this.isServer = isServer();
    this.floatingRef = viewChild("floating");
    this.trigger = input();
    this.reference = input();
    this._reference = computed(() => this.reference() || this.trigger());
    this.placement = input(this.config.placement);
    this.strategy = input(this.config.strategy);
    this.autoUpdate = input(this.config.autoUpdate, {
      transform: booleanAttribute
    });
    this.arrow = model();
    this.middleware = input(this.config.middleware);
    this.bindTo = input(this.config.bindTo);
    this.clickedOutside = output();
    this.clickedInside = output();
    this.computePositionReturn = output();
    this.referenceConnected = signal(false);
    this.arrowMiddleware = computed(() => this.getArrowMiddleware(this.arrow()));
    this._computePosition$ = new import_rxjs2.BehaviorSubject(void 0);
    this.computePosition$ = this._computePosition$.asObservable().pipe((0, import_rxjs2.shareReplay)());
    this.coords = toSignal(this.computePosition$.pipe((0, import_rxjs2.filter)(Boolean), (0, import_rxjs2.map)(({
      x,
      y
    }) => ({
      x,
      y
    }))));
    effect(() => {
      if (this.referenceConnected()) {
        this.bindToReference();
      }
    });
  }
  bindToReference() {
    return __async(this, null, function* () {
      if (this.isServer) {
        return;
      }
      this.cleanup?.();
      const reference = this._reference();
      const floating = this.floatingRef()?.nativeElement;
      if (reference && floating) {
        if (this.autoUpdate()) {
          this.cleanup = this.floatingService.autoUpdate(reference, floating, () => __async(this, null, function* () {
            yield this.computePosition(reference, floating);
          }));
        } else {
          this.cleanup = void 0;
          yield this.computePosition(reference, floating);
        }
      }
      return;
    });
  }
  computePosition(reference, floating) {
    return __async(this, null, function* () {
      const computePositionReturn = yield this.floatingService.computePosition(reference, floating, {
        placement: this.placement(),
        strategy: this.strategy(),
        middleware: [...this.middleware(), this.arrowMiddleware()]
      });
      this._computePosition$.next(computePositionReturn);
      this.computePositionReturn.emit(computePositionReturn);
    });
  }
  onClick({
    target,
    inside,
    outside
  }) {
    if (inside) {
      this.onClickInside(target);
    }
    if (outside) {
      this.onClickOutside(target);
    }
  }
  /* Check if user clicked outside the floating element*/
  onClickOutside(target) {
    if (target instanceof Element) {
      if (target !== this._reference()) {
        this.clickedOutside.emit(target);
      }
    }
  }
  /* Check if user clicked inside the floating element*/
  onClickInside(target) {
    if (target instanceof Element) {
      if (target !== this._reference()) {
        this.clickedInside.emit(target);
      }
    }
  }
  /**
   * Arrow sets from <ngx-arrow/> component
   */
  setArrow(arrow3) {
    this.arrow.set(arrow3);
    return this.bindToReference();
  }
  getArrowMiddleware(arr) {
    const arrRef = arr?.arrowRef();
    if (arr && arrRef) {
      return arrow2({
        element: arrRef.nativeElement,
        padding: arr.padding()
      });
    }
    return null;
  }
  static {
    this.ɵfac = function FloatingComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FloatingComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _FloatingComponent,
      selectors: [["ngx-floating"]],
      viewQuery: function FloatingComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuerySignal(ctx.floatingRef, _c1, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      inputs: {
        trigger: [1, "trigger"],
        reference: [1, "reference"],
        placement: [1, "placement"],
        strategy: [1, "strategy"],
        autoUpdate: [1, "autoUpdate"],
        arrow: [1, "arrow"],
        middleware: [1, "middleware"],
        bindTo: [1, "bindTo"]
      },
      outputs: {
        arrow: "arrowChange",
        clickedOutside: "clickedOutside",
        clickedInside: "clickedInside",
        computePositionReturn: "computePositionReturn"
      },
      features: [ɵɵProvidersFeature([FloatingService, PlatformService]), ɵɵNgOnChangesFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 1,
      consts: [["floating", ""], [3, "bindTo"], [1, "floating", 3, "ngxClickOutside"]],
      template: function FloatingComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, FloatingComponent_Conditional_0_Template, 4, 5, "ngx-portal", 1);
        }
        if (rf & 2) {
          ɵɵconditional(!ctx.isServer && ctx.referenceConnected() ? 0 : -1);
        }
      },
      dependencies: [CommonModule, PortalComponent, ClickOutsideDirective],
      styles: ["[_nghost-%COMP%]{width:max-content;display:contents}.floating[_ngcontent-%COMP%]{width:max-content;position:absolute;top:0;left:0;z-index:999;will-change:left,top}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FloatingComponent, [{
    type: Component,
    args: [{
      selector: "ngx-floating",
      imports: [CommonModule, PortalComponent, ClickOutsideDirective],
      providers: [FloatingService, PlatformService],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '@if (!isServer && referenceConnected()) {\n  <ngx-portal [bindTo]="bindTo()">\n    <div\n      #floating\n      class="floating"\n      [style.left.px]="coords()?.x"\n      [style.top.px]="coords()?.y"\n      (ngxClickOutside)="onClick($event)"\n    >\n      <ng-content />\n    </div>\n  </ngx-portal>\n}\n',
      styles: [":host{width:max-content;display:contents}.floating{width:max-content;position:absolute;top:0;left:0;z-index:999;will-change:left,top}\n"]
    }]
  }], () => [], null);
})();
var ArrowBase = class _ArrowBase {
  static {
    this.ɵfac = function ArrowBase_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ArrowBase)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ArrowBase,
      selectors: [["ngx-arrow-base"]],
      decls: 1,
      vars: 0,
      consts: [[1, "arrow"]],
      template: function ArrowBase_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelement(0, "div", 0);
        }
      },
      styles: [".arrow[_ngcontent-%COMP%]{width:12px;height:12px;transform:rotate(45deg);background:#000}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArrowBase, [{
    type: Component,
    args: [{
      standalone: true,
      selector: "ngx-arrow-base",
      template: `
    <div class="arrow"></div>
  `,
      styles: [".arrow{width:12px;height:12px;transform:rotate(45deg);background:#000}\n"]
    }]
  }], null, null);
})();
var NGX_ARROW_COMPONENT = new InjectionToken("NGX_ARROW_COMPONENT", {
  providedIn: "root",
  factory: () => {
    return ArrowBase;
  }
});
var staticSides = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var Arrow = class _Arrow {
  constructor() {
    this.arrowComponent = inject(NGX_ARROW_COMPONENT);
    this.cdRef = inject(ChangeDetectorRef);
    this.arrowRef = viewChild("arrow");
    this.floating = model(inject(FloatingComponent, {
      optional: true
    }));
    this.padding = input(0, {
      transform: numberAttribute
    });
    this.styles = {};
  }
  ngOnChanges() {
    return __async(this, null, function* () {
      yield this.updateState();
    });
  }
  ngAfterViewInit() {
    return __async(this, null, function* () {
      yield this.updateState();
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  updateState() {
    return __async(this, null, function* () {
      const floating = this.floating();
      if (floating) {
        yield floating.setArrow(this);
      }
      this.observe();
    });
  }
  /*
  * Observe changes from computePosition of the floating.
  * Convert the ComputePosition data to the Arrow's styles
  */
  observe() {
    this.subscription?.unsubscribe();
    this.subscription = this.computeStyles$().subscribe((styles) => {
      this.styles = styles;
      this.cdRef.markForCheck();
    });
  }
  computeStyles$() {
    return this.floating()?.computePosition$.pipe((0, import_rxjs2.filter)(Boolean), (0, import_rxjs2.map)((data) => {
      return this.computePosition(data);
    })) ?? (0, import_rxjs2.of)({});
  }
  getSide(placement) {
    const side = placement.split("-")[0];
    return staticSides[side];
  }
  /**
   * Set the floating element programmatically.
   * Need for setting the Floating if DI is not allowed.
   */
  setFloating(floating) {
    this.floating.set(floating);
    this.cdRef.detectChanges();
    return this.updateState();
  }
  /**
   * computePosition converts data from ComputePositionReturn
   * to Arrow's styles object Record<string, string>
   */
  computePosition({
    middlewareData,
    placement
  }) {
    const arrowElement = this.arrowRef()?.nativeElement;
    if (middlewareData.arrow && arrowElement) {
      const {
        x,
        y
      } = middlewareData.arrow;
      const staticSide = this.getSide(placement);
      const styles = {};
      if (x != null) {
        styles["left"] = `${x}px`;
      }
      if (y != null) {
        styles["top"] = `${y}px`;
      }
      if (staticSide) {
        styles[staticSide] = `${-arrowElement.offsetWidth / 2}px`;
      }
      return styles;
    }
    return {};
  }
  static {
    this.ɵfac = function Arrow_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _Arrow)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _Arrow,
      selectors: [["ngx-arrow"]],
      viewQuery: function Arrow_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuerySignal(ctx.arrowRef, _c2, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      inputs: {
        floating: [1, "floating"],
        padding: [1, "padding"]
      },
      outputs: {
        floating: "floatingChange"
      },
      features: [ɵɵNgOnChangesFeature],
      decls: 1,
      vars: 1,
      consts: [["arrow", ""], [1, "ngx-arrow", 3, "hidden", "style"], [1, "ngx-arrow"], [3, "ngComponentOutlet"]],
      template: function Arrow_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, Arrow_Conditional_0_Template, 3, 5, "div", 1);
        }
        if (rf & 2) {
          ɵɵconditional(ctx.floating() ? 0 : -1);
        }
      },
      dependencies: [CommonModule, NgComponentOutlet],
      styles: [".ngx-arrow{position:absolute;z-index:-1}.ngx-arrow.hidden{opacity:0}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Arrow, [{
    type: Component,
    args: [{
      selector: "ngx-arrow",
      imports: [CommonModule],
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '@if (floating()) {\n  <div\n    #arrow\n    class="ngx-arrow"\n    [class.hidden]="!arrow"\n    [style]="styles"\n  >\n    <ng-template\n      [ngComponentOutlet]="arrowComponent"\n    />\n  </div>\n}\n',
      styles: [".ngx-arrow{position:absolute;z-index:-1}.ngx-arrow.hidden{opacity:0}\n"]
    }]
  }], null, null);
})();

export {
  getOverflowAncestors,
  platform,
  autoUpdate,
  detectOverflow2 as detectOverflow,
  offset2 as offset,
  autoPlacement2 as autoPlacement,
  shift2 as shift,
  flip2 as flip,
  size2 as size,
  hide2 as hide,
  arrow2 as arrow,
  inline2 as inline,
  limitShift2 as limitShift,
  computePosition2 as computePosition,
  Keys,
  isContainElement,
  awaitTime,
  isHTML,
  isString,
  FloatingService,
  PlatformService,
  isServer,
  isBrowser,
  PortalComponent,
  NgxFloatingConfig,
  NGX_FLOATING_CONFIG,
  ClickOutsideDirective,
  FloatingComponent,
  ArrowBase,
  NGX_ARROW_COMPONENT,
  Arrow
};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v19.2.1
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-WFBLUHDE.js.map
