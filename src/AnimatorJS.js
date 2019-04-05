window.AnimatorJS = (function () {
    /*-----------------------------------------------------------------------------*\
    POLYFILL :)
    \*-----------------------------------------------------------------------------*/
    let isUsingPolyfill = false;
    if (!this.document.createElement("div").animate) {
        var s = document.createElement("script");
        s.src = "https://rawgit.com/web-animations/web-animations-js/master/web-animations.min.js";
        isUsingPolyfill = true;
        if (document.head) {
            document.head.appendChild(s);
        } else {
            document.addEventListener("load", function () {
                document.head.appendChild(s);
            });
        }
    }
    GlobalAnimatorJS.polyfill = function (state) {
        if (state) isUsingPolyfill = true;
        return isUsingPolyfill;
    }
    /*-----------------------------------------------------------------------------*\
    class DelayedAnimationHolder(keyframes)
    allows storing of keyframes and functions to enable playback at a later time;
    and allows asignment to an element;
    \*-----------------------------------------------------------------------------*/
    const defineProperty = Object.defineProperty;

    function DelayedAnimationHolder(keyframes, options) {
        this._options = options;
        this._keyframes = keyframes;
    }
    DelayedAnimationHolder.prototype.assign = function (element) {
        return new DelayedAnimation(this._keyframes, this._options, element);
    };
    /*-----------------------------------------------------------------------------*\
    class DelayedAnimation(keyframes,options,element)
    allows storing of keyframes and functions to enable playback at a later time;
    \*-----------------------------------------------------------------------------*/
    function DelayedAnimation(keyframes, options, element) {
        this._keyframes = keyframes;
        this._options = options;
        this._element = element;
        this._Animation = null;
        this._currentTime = null; //get-set currentTime
        this._effect = null; //get-set effect
        this._finished = null; //get     finished
        this._id = ""; //get-set id
        this._playState = null; //get     playState
        this._playbackRate = 1; //get-set playbackRate
        this._ready = false; //get     ready
        this._startTime = performance.now(); //get-set startTime
        this._timeline = null; //get-set timeline
        this._oncancel = null; //get-set oncancel (callback)
        this._onfinish = null; //get-set onfinish (callback)
        this._bind_isglobal = false;
        //get     pending
    }

    function DelayedAnimation_DefineProperty(a, b) {
        defineProperty(DelayedAnimation.prototype, a, b);
    }
    DelayedAnimation_DefineProperty('currentTime', {
        set: function (value) {
            return this.set('currentTime', value);
        },
        get: function () {
            return this.get('currentTime');
        }
    });
    DelayedAnimation_DefineProperty('effect', {
        set: function (value) {
            return this.set('effect', value);
        },
        get: function () {
            return this.get('effect');
        }
    });
    DelayedAnimation_DefineProperty('finished', {
        get: function () {
            return this.get('finished');
        }
    });
    DelayedAnimation_DefineProperty('id', {
        set: function (value) {
            return this.set('id', value);
        },
        get: function () {
            return this.get('id');
        }
    });
    DelayedAnimation_DefineProperty('pending', {
        get: function () {
            return this.get('pending');
        }
    });
    DelayedAnimation_DefineProperty('playState', {
        get: function () {
            return this.get('playState');
        }
    });
    DelayedAnimation_DefineProperty('playbackRate', {
        set: function (value) {
            return this.set('playbackRate', value);
        },
        get: function () {
            return this.get('playbackRate');
        }
    });
    DelayedAnimation_DefineProperty('ready', {
        get: function () {
            return this.get('ready');
        }
    });
    DelayedAnimation_DefineProperty('startTime', {
        set: function (value) {
            return this.set('startTime', value);
        },
        get: function () {
            return this.get('startTime');
        }
    });
    DelayedAnimation_DefineProperty('timeline', {
        set: function (value) {
            return this.set('timeline', value);
        },
        get: function () {
            return this.get('timeline');
        }
    });
    DelayedAnimation_DefineProperty('oncancel', {
        set: function (value) {
            return this.set('oncancel', value);
        },
        get: function () {
            return this.get('oncancel');
        }
    });
    DelayedAnimation_DefineProperty('onfinish', {
        set: function (value) {
            return this.set('onfinish', value);
        },
        get: function () {
            return this.get('onfinish');
        }
    });

    function DelayedAnimation_proto(a, b) {
        DelayedAnimation.prototype[a] = b;
    }
    DelayedAnimation_proto('get', function (name) {
        if (this.exists()) {
            return this._Animation[name];
        } else {
            return this["_" + name];
        }
    });
    DelayedAnimation_proto('set', function (name, value) {
        if (this.exists()) {
            return this._Animation[name] = value;
        } else {
            return this["_" + name] = value;
        }
    });
    DelayedAnimation_proto('exists', function () {
        return !!this._Animation;
    });
    DelayedAnimation_proto('cancel', function () {
        if (this.exists()) {
            this._Animation.cancel();
        }
    });
    DelayedAnimation_proto('finish', function () {
        if (this.exists()) {
            this._Animation.finish();
        }
    });
    DelayedAnimation_proto('pause', function () {
        if (this.exists()) {
            this._Animation.pause();
        }
    });
    DelayedAnimation_proto('play', function () {
        if (this.exists()) {
            this._Animation.play();
        } else {
            this._Animation = this._element.animate(this._keyframes, this._options);
            this._startTime = performance.now();
            this._Animation.id = this._id;
            this._Animation.play();
            this._Animation.playbackRate = this._playbackRate;
            this._Animation.startTime = this._startTime;
            this._Animation.timeline = this._timeline;
            this._Animation.oncancel = this._oncancel;
            this._Animation.onfinish = this._onfinish;
            if (this._is_bound)
                this.bind(this._bind_type, this._bind);
        }
    });
    DelayedAnimation_proto('reverse', function () {
        if (this.exists()) {
            this._Animation.reverse();
        }
    });
    DelayedAnimation_proto('updatePlaybackRate', function (speed) {
        if (this.exists()) {
            this._Animation.updatePlaybackRate(speed);
        }
    });
    DelayedAnimation_proto('bind', function (type, func, isGlobal) {
        this._bind_isglobal = isGlobal;
        this.playbackRate = 0;
        this._is_bound = true;
        this._bind_type = type;
        this._bind = func;
        this._bound_call = function (event) {
            this._is_bound = true;
            if (this.exists()) {
                this.currentTime = this._bind(event, this);
            }
        }.bind(this);
        if (this._element && this._bind_type && this._bind_type && !this._bound) {
            if (this._bind_isglobal) {
                this._element.addEventListener(type, this._bound_call);
            } else {
                document.addEventListener(type, this._bound_call);
            }
            this.play();
        }
    });
    /*-----------------------------------------------------------------------------*\
    function _Animator():AnimatorJS
    a wrapper for creating the animator js instance if one is not found
    if one is found returns that instance.
    \*-----------------------------------------------------------------------------*/
    var _Animator = function () {
        if (this.AnimatorJsInstance)
            return this.AnimatorJsInstance;
        this.AnimatorJsInstance = new AnimatorJS(this);
        return this.AnimatorJsInstance;
    };
    /*-----------------------------------------------------------------------------*\
    class AnimatorJS(element)
    takes in an optional element and contains interface for building out an animation
    using chainable function calls.
    ended by AnimationJS.render or AnimationJS.start
    \*-----------------------------------------------------------------------------*/
    function AnimatorJS(element) {
        this.Element = element;
        this.Animation = [];
        this.resetCurrent();
    }
    //used later on as to not clutter middle of file.
    function make(name) {
        AnimatorJS.prototype[name] = function (...args) {
            this.set(name, args.join(" "));
            return this;
        };
    }
    defer_make();
    AnimatorJS.prototype.resetCurrent = function () {
        this.current = {
            // duration: undefined,
            // iterations: undefined
        };
        //I am not sure why I still keep this around. it will be useful if down the road this.current
        //needs to have data when starting.
    };
    AnimatorJS.prototype.next = function () {
        this.Animation.push(this.current);
        this.resetCurrent();
        return this;
    };
    AnimatorJS.prototype.set = function (name, value) {
        if (value === undefined) return;
        this.current[name] = value;
        for (var i = 0; i < this.Animation.length; i++) {
            if (!this.Animation[i][name]) {
                this.Animation[i][name] = "auto";
            }
        }
    };
    AnimatorJS.prototype.get = function (name) {
        return this.current[name] || "";
    };
    AnimatorJS.prototype.reset = function () {
        this.Animation = [];
        this.resetCurrent();
        return this;
    };
    AnimatorJS.prototype.valid = function (thing) {
        return thing != undefined;
    };
    AnimatorJS.prototype.transform = function (x, y, z) {
        var str = [];
        if (this.valid(x))
            str.push("translateX(" + x + "px)");
        if (this.valid(y))
            str.push("translateY(" + y + "px)");
        if (this.valid(z))
            str.push("translateZ(" + z + "px)");
        this.set("transform", ((this.get("transform") || "") + " " + str.join(" ")).trim());
        return this;
    };
    AnimatorJS.prototype.rotate = function (x, y, z) {
        var str = [];
        if (this.valid(x)) {
            if (this.valid(y) || this.valid(z)) {
                str.push("rotateX(" + x + "deg)");
            } else {
                str.push("rotate(" + x + "deg)");
            }
        }
        if (this.valid(y))
            str.push("rotateY(" + y + "deg)");
        if (this.valid(z))
            str.push("rotateZ(" + z + "deg)");
        this.set("transform", ((this.get("transform") || "") + " " + str.join(" ")).trim());
        return this;
    };
    AnimatorJS.prototype.duration = function (t) {
        this.requireDuration = true;
        this.set("duration", t);
        return this;
    };
    AnimatorJS.prototype.build = function (duration) {
        if (duration === undefined) {
            duration = 1000;
        }
        if (Object.keys(this.current).length > 0) {
            let keys = Object.keys(this.current);
            for (let i = 0; i < keys.length; i++) {
                if (this.current[keys[i]] === undefined) {
                    delete this.current[keys[i]];
                }
            }
            this.Animation.push(this.current);
            this.resetCurrent();
        }
        return this.updateDurationsForPlaying(duration);
    };
    AnimatorJS.prototype.start = function (duration, options) {
        if (options === undefined) {
            options = {};
        }
        var animation = this.build(duration);
        options.duration = duration;
        if (this.itterationCount)
            options.iterations = this.itterationCount;
        if (this.Element) {
            this.AnimationInstance = this.Element.animate(animation, options);
        } else {
            this.AnimationInstance = new DelayedAnimationHolder(animation, options);
        }
        return this.AnimationInstance;
    };
    AnimatorJS.prototype.render = function (duration, options) {
        if (duration === undefined) {
            duration = 1000;
        }
        if (options === undefined) {
            options = {};
        }
        var animation = this.build(duration);
        options.duration = duration;
        if (this.itterationCount)
            options.iterations = this.itterationCount;
        if (this.Element) {
            this.AnimationInstance = new DelayedAnimation(animation, options, this.Element);
        } else {
            this.AnimationInstance = new DelayedAnimationHolder(animation, options);
        }
        return this.AnimationInstance;
    };
    AnimatorJS.prototype.updateDurationsForPlaying = function (duration) {
        var last = 0;
        var _keyframes = Object.assign([], this.Animation);
        this.durationsCalculated = true;
        for (var i = 0; i < _keyframes.length; i++) {
            var partDuration = (duration / _keyframes.length - 1);
            if (this.requireDuration) {
                partDuration = _keyframes[i].duration;
                if (!partDuration)
                    throw new Error("missing segment duration, if duration is used all segments need to have a duration");
            }
            if (i === 0 && _keyframes.length > 1) {
                duration -= _keyframes[1].duration || 0;
                _keyframes[0].duration = 0;
            } else if (i === _keyframes.length - 1) {
                _keyframes[i].duration = (duration - last);
            } else {
                _keyframes[i].duration = (last += partDuration) / duration;
            }
        }
        return _keyframes;
    };
    AnimatorJS.prototype.easing = function (easingmode) {
        this.set("easing", easingmode);
        this.set("animationTimingFunction", easingmode);
        return this;
    };
    AnimatorJS.prototype.repeat = function (count) {
        this.itterationCount = count;
        return this;
    };
    AnimatorJS.prototype.bind = function (type, func) {
        var animationInstance = this.render();
        animationInstance.bind(type, func);
        return animationInstance;
    };
    AnimatorJS.prototype.css = function (string) {
        var parts = string.split(";");
        for (var i = 0, parts = parts; i < parts.length; i++) {
            var part = parts[i];
            var name = part.split(":", 2)[0];
            var value = part.split(":", 2)[1];
            if (name != "")
                this.set(name, value.trim());
        }
        return this;
    };
    AnimatorJS.prototype.raw = function (object) {
        var keys = Object.keys(object);
        for (var i = 0; i < keys.length; i++) {
            this.set(keys[i], object[keys[i]]);
        }
        return this;
    };
    AnimatorJS.prototype.append = function (Animator) {
        for (var i = 0; i < Animator.Animation.length; i++) {
            this.Animation.push(Animator.Animation[i]);
        }
        return this;
    };
    AnimatorJS.prototype.scale = function (size_percent) {
        if (this.valid(size_percent)) {
            var str = "translateX(" + size_percent + "px)";
            this.set("transform", (this.get("transform") || "") + " " + str.trim());
        } else {
            conso.wa("invalid size for scale");
        }
        return this;
    };
    /*-----------------------------------------------------------------------------*\
    Extend the Element prototype so that you can do Element.AnimatorJS to animate that element.
    \*-----------------------------------------------------------------------------*/
    defineProperty(Element.prototype, "AnimatorJS", {
        value: _Animator
    });
    //this is safe as Element is not a primitive

    /*-----------------------------------------------------------------------------*\
    function GlobalAnimatorJS(element?);
    this function is exposed to the global scope to allow creation of non-Element bound AnimatorJS'
    \*-----------------------------------------------------------------------------*/
    function GlobalAnimatorJS(element) {
        return new AnimatorJS(element);
    };

    return GlobalAnimatorJS;

    function defer_make() {
        make("alignContent");
        make("alignItems");
        make("alignSelf");
        make("alignmentBaseline");
        make("all");
        make("animation");
        make("animationDelay");
        make("animationDirection");
        make("animationDuration");
        make("animationFillMode");
        make("animationIterationCount");
        make("animationName");
        make("animationPlayState");
        make("animationTimingFunction");
        make("backfaceVisibility");
        make("background");
        make("backgroundAttachment");
        make("backgroundBlendMode");
        make("backgroundClip");
        make("backgroundColor");
        make("backgroundImage");
        make("backgroundOrigin");
        make("backgroundPosition");
        make("backgroundPositionX");
        make("backgroundPositionY");
        make("backgroundRepeat");
        make("backgroundRepeatX");
        make("backgroundRepeatY");
        make("backgroundSize");
        make("baselineShift");
        make("blockSize");
        make("border");
        make("borderBlockEnd");
        make("borderBlockEndColor");
        make("borderBlockEndStyle");
        make("borderBlockEndWidth");
        make("borderBlockStart");
        make("borderBlockStartColor");
        make("borderBlockStartStyle");
        make("borderBlockStartWidth");
        make("borderBottom");
        make("borderBottomColor");
        make("borderBottomLeftRadius");
        make("borderBottomRightRadius");
        make("borderBottomStyle");
        make("borderBottomWidth");
        make("borderCollapse");
        make("borderColor");
        make("borderImage");
        make("borderImageOutset");
        make("borderImageRepeat");
        make("borderImageSlice");
        make("borderImageSource");
        make("borderImageWidth");
        make("borderInlineEnd");
        make("borderInlineEndColor");
        make("borderInlineEndStyle");
        make("borderInlineEndWidth");
        make("borderInlineStart");
        make("borderInlineStartColor");
        make("borderInlineStartStyle");
        make("borderInlineStartWidth");
        make("borderLeft");
        make("borderLeftColor");
        make("borderLeftStyle");
        make("borderLeftWidth");
        make("borderRadius");
        make("borderRight");
        make("borderRightColor");
        make("borderRightStyle");
        make("borderRightWidth");
        make("borderSpacing");
        make("borderStyle");
        make("borderTop");
        make("borderTopColor");
        make("borderTopLeftRadius");
        make("borderTopRightRadius");
        make("borderTopStyle");
        make("borderTopWidth");
        make("borderWidth");
        make("bottom");
        make("boxShadow");
        make("boxSizing");
        make("breakAfter");
        make("breakBefore");
        make("breakInside");
        make("bufferedRendering");
        make("captionSide");
        make("caretColor");
        make("clear");
        make("clip");
        make("clipPath");
        make("clipRule");
        make("color");
        make("colorInterpolation");
        make("colorInterpolationFilters");
        make("colorRendering");
        make("columnCount");
        make("columnFill");
        make("columnGap");
        make("columnRule");
        make("columnRuleColor");
        make("columnRuleStyle");
        make("columnRuleWidth");
        make("columnSpan");
        make("columnWidth");
        make("columns");
        make("contain");
        make("content");
        make("counterIncrement");
        make("counterReset");
        make("cursor");
        make("cx");
        make("cy");
        make("d");
        make("direction");
        make("display");
        make("dominantBaseline");
        make("emptyCells");
        make("fill");
        make("fillOpacity");
        make("fillRule");
        make("filter");
        make("flex");
        make("flexBasis");
        make("flexDirection");
        make("flexFlow");
        make("flexGrow");
        make("flexShrink");
        make("flexWrap");
        make("float");
        make("floodColor");
        make("floodOpacity");
        make("font");
        make("fontDisplay");
        make("fontFamily");
        make("fontFeatureSettings");
        make("fontKerning");
        make("fontSize");
        make("fontStretch");
        make("fontStyle");
        make("fontVariant");
        make("fontVariantCaps");
        make("fontVariantEastAsian");
        make("fontVariantLigatures");
        make("fontVariantNumeric");
        make("fontVariationSettings");
        make("fontWeight");
        make("gap");
        make("grid");
        make("gridArea");
        make("gridAutoColumns");
        make("gridAutoFlow");
        make("gridAutoRows");
        make("gridColumn");
        make("gridColumnEnd");
        make("gridColumnGap");
        make("gridColumnStart");
        make("gridGap");
        make("gridRow");
        make("gridRowEnd");
        make("gridRowGap");
        make("gridRowStart");
        make("gridTemplate");
        make("gridTemplateAreas");
        make("gridTemplateColumns");
        make("gridTemplateRows");
        make("height");
        make("hyphens");
        make("imageRendering");
        make("inlineSize");
        make("isolation");
        make("justifyContent");
        make("justifyItems");
        make("justifySelf");
        make("left");
        make("letterSpacing");
        make("lightingColor");
        make("lineBreak");
        make("lineHeight");
        make("listStyle");
        make("listStyleImage");
        make("listStylePosition");
        make("listStyleType");
        make("margin");
        make("marginBlockEnd");
        make("marginBlockStart");
        make("marginBottom");
        make("marginInlineEnd");
        make("marginInlineStart");
        make("marginLeft");
        make("marginRight");
        make("marginTop");
        make("marker");
        make("markerEnd");
        make("markerMid");
        make("markerStart");
        make("mask");
        make("maskType");
        make("maxBlockSize");
        make("maxHeight");
        make("maxInlineSize");
        make("maxWidth");
        make("maxZoom");
        make("minBlockSize");
        make("minHeight");
        make("minInlineSize");
        make("minWidth");
        make("minZoom");
        make("mixBlendMode");
        make("objectFit");
        make("objectPosition");
        make("offset");
        make("offsetDistance");
        make("offsetPath");
        make("offsetRotate");
        make("opacity");
        make("order");
        make("orientation");
        make("orphans");
        make("outline");
        make("outlineColor");
        make("outlineOffset");
        make("outlineStyle");
        make("outlineWidth");
        make("overflow");
        make("overflowAnchor");
        make("overflowWrap");
        make("overflowX");
        make("overflowY");
        make("overscrollBehavior");
        make("overscrollBehaviorX");
        make("overscrollBehaviorY");
        make("padding");
        make("paddingBlockEnd");
        make("paddingBlockStart");
        make("paddingBottom");
        make("paddingInlineEnd");
        make("paddingInlineStart");
        make("paddingLeft");
        make("paddingRight");
        make("paddingTop");
        make("page");
        make("pageBreakAfter");
        make("pageBreakBefore");
        make("pageBreakInside");
        make("paintOrder");
        make("perspective");
        make("perspectiveOrigin");
        make("placeContent");
        make("placeItems");
        make("placeSelf");
        make("pointerEvents");
        make("position");
        make("quotes");
        make("r");
        make("resize");
        make("right");
        make("rowGap");
        make("rx");
        make("ry");
        make("scrollBehavior");
        make("scrollMargin");
        make("scrollMarginBlock");
        make("scrollMarginBlockEnd");
        make("scrollMarginBlockStart");
        make("scrollMarginBottom");
        make("scrollMarginInline");
        make("scrollMarginInlineEnd");
        make("scrollMarginInlineStart");
        make("scrollMarginLeft");
        make("scrollMarginRight");
        make("scrollMarginTop");
        make("scrollPadding");
        make("scrollPaddingBlock");
        make("scrollPaddingBlockEnd");
        make("scrollPaddingBlockStart");
        make("scrollPaddingBottom");
        make("scrollPaddingInline");
        make("scrollPaddingInlineEnd");
        make("scrollPaddingInlineStart");
        make("scrollPaddingLeft");
        make("scrollPaddingRight");
        make("scrollPaddingTop");
        make("scrollSnapAlign");
        make("scrollSnapStop");
        make("scrollSnapType");
        make("shapeImageThreshold");
        make("shapeMargin");
        make("shapeOutside");
        make("shapeRendering");
        make("size");
        make("speak");
        make("src");
        make("stopColor");
        make("stopOpacity");
        make("stroke");
        make("strokeDasharray");
        make("strokeDashoffset");
        make("strokeLinecap");
        make("strokeLinejoin");
        make("strokeMiterlimit");
        make("strokeOpacity");
        make("strokeWidth");
        make("tabSize");
        make("tableLayout");
        make("textAlign");
        make("textAlignLast");
        make("textAnchor");
        make("textCombineUpright");
        make("textDecoration");
        make("textDecorationColor");
        make("textDecorationLine");
        make("textDecorationSkipInk");
        make("textDecorationStyle");
        make("textIndent");
        make("textOrientation");
        make("textOverflow");
        make("textRendering");
        make("textShadow");
        make("textSizeAdjust");
        make("textTransform");
        make("textUnderlinePosition");
        make("top");
        make("touchAction");
        make("transform");
        make("transformBox");
        make("transformOrigin");
        make("transformStyle");
        make("transition");
        make("transitionDelay");
        make("transitionDuration");
        make("transitionProperty");
        make("transitionTimingFunction");
        make("unicodeBidi");
        make("unicodeRange");
        make("userSelect");
        make("userZoom");
        make("vectorEffect");
        make("verticalAlign");
        make("visibility");
        make("webkitAlignContent");
        make("webkitAlignItems");
        make("webkitAlignSelf");
        make("webkitAnimation");
        make("webkitAnimationDelay");
        make("webkitAnimationDirection");
        make("webkitAnimationDuration");
        make("webkitAnimationFillMode");
        make("webkitAnimationIterationCount");
        make("webkitAnimationName");
        make("webkitAnimationPlayState");
        make("webkitAnimationTimingFunction");
        make("webkitAppRegion");
        make("webkitAppearance");
        make("webkitBackfaceVisibility");
        make("webkitBackgroundClip");
        make("webkitBackgroundOrigin");
        make("webkitBackgroundSize");
        make("webkitBorderAfter");
        make("webkitBorderAfterColor");
        make("webkitBorderAfterStyle");
        make("webkitBorderAfterWidth");
        make("webkitBorderBefore");
        make("webkitBorderBeforeColor");
        make("webkitBorderBeforeStyle");
        make("webkitBorderBeforeWidth");
        make("webkitBorderBottomLeftRadius");
        make("webkitBorderBottomRightRadius");
        make("webkitBorderEnd");
        make("webkitBorderEndColor");
        make("webkitBorderEndStyle");
        make("webkitBorderEndWidth");
        make("webkitBorderHorizontalSpacing");
        make("webkitBorderImage");
        make("webkitBorderRadius");
        make("webkitBorderStart");
        make("webkitBorderStartColor");
        make("webkitBorderStartStyle");
        make("webkitBorderStartWidth");
        make("webkitBorderTopLeftRadius");
        make("webkitBorderTopRightRadius");
        make("webkitBorderVerticalSpacing");
        make("webkitBoxAlign");
        make("webkitBoxDecorationBreak");
        make("webkitBoxDirection");
        make("webkitBoxFlex");
        make("webkitBoxOrdinalGroup");
        make("webkitBoxOrient");
        make("webkitBoxPack");
        make("webkitBoxReflect");
        make("webkitBoxShadow");
        make("webkitBoxSizing");
        make("webkitClipPath");
        make("webkitColumnBreakAfter");
        make("webkitColumnBreakBefore");
        make("webkitColumnBreakInside");
        make("webkitColumnCount");
        make("webkitColumnGap");
        make("webkitColumnRule");
        make("webkitColumnRuleColor");
        make("webkitColumnRuleStyle");
        make("webkitColumnRuleWidth");
        make("webkitColumnSpan");
        make("webkitColumnWidth");
        make("webkitColumns");
        make("webkitFilter");
        make("webkitFlex");
        make("webkitFlexBasis");
        make("webkitFlexDirection");
        make("webkitFlexFlow");
        make("webkitFlexGrow");
        make("webkitFlexShrink");
        make("webkitFlexWrap");
        make("webkitFontFeatureSettings");
        make("webkitFontSizeDelta");
        make("webkitFontSmoothing");
        make("webkitHighlight");
        make("webkitHyphenateCharacter");
        make("webkitJustifyContent");
        make("webkitLineBreak");
        make("webkitLineClamp");
        make("webkitLocale");
        make("webkitLogicalHeight");
        make("webkitLogicalWidth");
        make("webkitMarginAfter");
        make("webkitMarginAfterCollapse");
        make("webkitMarginBefore");
        make("webkitMarginBeforeCollapse");
        make("webkitMarginBottomCollapse");
        make("webkitMarginCollapse");
        make("webkitMarginEnd");
        make("webkitMarginStart");
        make("webkitMarginTopCollapse");
        make("webkitMask");
        make("webkitMaskBoxImage");
        make("webkitMaskBoxImageOutset");
        make("webkitMaskBoxImageRepeat");
        make("webkitMaskBoxImageSlice");
        make("webkitMaskBoxImageSource");
        make("webkitMaskBoxImageWidth");
        make("webkitMaskClip");
        make("webkitMaskComposite");
        make("webkitMaskImage");
        make("webkitMaskOrigin");
        make("webkitMaskPosition");
        make("webkitMaskPositionX");
        make("webkitMaskPositionY");
        make("webkitMaskRepeat");
        make("webkitMaskRepeatX");
        make("webkitMaskRepeatY");
        make("webkitMaskSize");
        make("webkitMaxLogicalHeight");
        make("webkitMaxLogicalWidth");
        make("webkitMinLogicalHeight");
        make("webkitMinLogicalWidth");
        make("webkitOpacity");
        make("webkitOrder");
        make("webkitPaddingAfter");
        make("webkitPaddingBefore");
        make("webkitPaddingEnd");
        make("webkitPaddingStart");
        make("webkitPerspective");
        make("webkitPerspectiveOrigin");
        make("webkitPerspectiveOriginX");
        make("webkitPerspectiveOriginY");
        make("webkitPrintColorAdjust");
        make("webkitRtlOrdering");
        make("webkitRubyPosition");
        make("webkitShapeImageThreshold");
        make("webkitShapeMargin");
        make("webkitShapeOutside");
        make("webkitTapHighlightColor");
        make("webkitTextCombine");
        make("webkitTextDecorationsInEffect");
        make("webkitTextEmphasis");
        make("webkitTextEmphasisColor");
        make("webkitTextEmphasisPosition");
        make("webkitTextEmphasisStyle");
        make("webkitTextFillColor");
        make("webkitTextOrientation");
        make("webkitTextSecurity");
        make("webkitTextSizeAdjust");
        make("webkitTextStroke");
        make("webkitTextStrokeColor");
        make("webkitTextStrokeWidth");
        make("webkitTransform");
        make("webkitTransformOrigin");
        make("webkitTransformOriginX");
        make("webkitTransformOriginY");
        make("webkitTransformOriginZ");
        make("webkitTransformStyle");
        make("webkitTransition");
        make("webkitTransitionDelay");
        make("webkitTransitionDuration");
        make("webkitTransitionProperty");
        make("webkitTransitionTimingFunction");
        make("webkitUserDrag");
        make("webkitUserModify");
        make("webkitUserSelect");
        make("webkitWritingMode");
        make("whiteSpace");
        make("widows");
        make("width");
        make("willChange");
        make("wordBreak");
        make("wordSpacing");
        make("wordWrap");
        make("writingMode");
        make("x");
        make("y");
        make("zIndex");
        make("zoom");
    }

})();