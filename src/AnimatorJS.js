window["AnimatorJS"] = (function () {
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
    var _Animator = function (continuum = false) {
        if (this.AnimatorJsInstance)
            return this.AnimatorJsInstance;
        this.AnimatorJsInstance = new AnimatorJS(this, continuum);
        return this.AnimatorJsInstance;
    };
    /*-----------------------------------------------------------------------------*\
    class AnimatorJS(element)
    takes in an optional element and contains interface for building out an animation
    using chainable function calls.
    ended by AnimationJS.render or AnimationJS.start
    \*-----------------------------------------------------------------------------*/
    function AnimatorJS(element, continuum) {
        this.Element = element;
        this.Animation = [];
        this.current = {};
        this.resetNext = !continuum;
    }
    //used later on as to not clutter middle of file.
    var defaults = {
        easing: "linear"
    };

    function make(name, webkit = false, def = "auto") {
        defaults[name] = def;
        AnimatorJS_proto(name, function (...args) {
            this.set(name, args.join(" "));
            return this;
        });
        if (webkit) {
            name = name[1].toUpperCase() + name.substr(1);
            make("webkit" + name, false, def);
        }
    }
    defer_make();

    function AnimatorJS_proto(name, func) {
        AnimatorJS.prototype[name] = func;
    }
    AnimatorJS_proto("next", function () {
        this.Animation.push(this.current);
        if (this.resetNext) this.current = {};
        return this;
    });
    AnimatorJS_proto("set", function (name, value) {
        if (value === undefined) return;
        this.current[name] = value;
        for (var i = 0; i < this.Animation.length; i++) {
            if (!this.Animation[i][name]) {
                this.Animation[i][name] = "auto";
            }
        }
    });
    AnimatorJS_proto("get", function (name) {
        return this.current[name] || "";
    });
    AnimatorJS_proto("reset", function () {
        this.Animation = [];
        this.current = {};
        return this;
    });
    AnimatorJS_proto("valid", function (thing) {
        return thing != undefined;
    });
    AnimatorJS_proto("transform", function (x, y, z) {
        var str = [];
        if (this.valid(x))
            str.push("translateX(" + x + "px)");
        if (this.valid(y))
            str.push("translateY(" + y + "px)");
        if (this.valid(z))
            str.push("translateZ(" + z + "px)");
        this.set("transform", ((this.get("transform") || "") + " " + str.join(" ")).trim());
        return this;
    });
    AnimatorJS_proto("rotate", function (x, y, z) {
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
    });
    AnimatorJS_proto("duration", function (t) {
        this.requireDuration = true;
        this.set("duration", t);
        return this;
    });
    AnimatorJS_proto("build", function (duration) {
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
            if (this.resetNext) this.current = {};
        }
        this.backfillKeyframes();
        return this.updateDurationsForPlaying(duration);
    });
    AnimatorJS_proto("backfillKeyframes", function () {
        //this function ensures that all keyframes in the set will have all values or assume a default value.
        let required = [];
        for (let i = 0; i < this.Animation.length; i++) {
            let keys = Object.keys(this.Animation[i]);
            for (let _index = 0; _index < keys.length; _index++) {
                if (!required.includes(keys[_index])) {
                    required.push(keys[_index]);
                }
            }
        }
        for (let i = 0; i < this.Animation.length; i++) {
            for (let _index = 0; _index < required.length; _index++) {
                if (this.Animation[i][required[_index]] == undefined) {
                    this.Animation[i][required[_index]] = defaults[required[_index]] || "auto";
                }
            }
        }
    });
    AnimatorJS_proto("start", function (duration, options) {
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
    });
    AnimatorJS_proto("render", function (duration, options) {
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
    });
    AnimatorJS_proto("updateDurationsForPlaying", function (duration) {
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
    });
    AnimatorJS_proto("easing", function (easingmode) {
        this.set("easing", easingmode);
        this.set("animationTimingFunction", easingmode);
        return this;
    });
    AnimatorJS_proto("repeat", function (count) {
        this.itterationCount = count;
        return this;
    });
    AnimatorJS_proto("bind", function (type, func) {
        var animationInstance = this.render();
        animationInstance.bind(type, func);
        return animationInstance;
    });
    AnimatorJS_proto("css", function (string) {
        var parts = string.split(";");
        for (var i = 0, parts = parts; i < parts.length; i++) {
            var part = parts[i];
            var name = part.split(":", 2)[0];
            var value = part.split(":", 2)[1];
            if (name != "")
                this.set(name, value.trim());
        }
        return this;
    });
    AnimatorJS_proto("raw", function (object) {
        var keys = Object.keys(object);
        for (var i = 0; i < keys.length; i++) {
            this.set(keys[i], object[keys[i]]);
        }
        return this;
    });
    AnimatorJS_proto("append", function (Animator) {
        for (var i = 0; i < Animator.Animation.length; i++) {
            this.Animation.push(Animator.Animation[i]);
        }
        return this;
    });
    AnimatorJS_proto("scale", function (size_percent) {
        if (this.valid(size_percent)) {
            var str = "translateX(" + size_percent + "px)";
            this.set("transform", (this.get("transform") || "") + " " + str.trim());
        } else {
            conso.wa("invalid size for scale");
        }
        return this;
    });
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
        make("alignContent", true);
        make("alignItems", true);
        make("alignSelf", true);
        make("alignmentBaseline", false);
        make("all", false);
        make("animation", true);
        make("animationDelay", true);
        make("animationDirection", true);
        make("animationDuration", true);
        make("animationFillMode", true);
        make("animationIterationCount", true);
        make("animationName", true);
        make("animationPlayState", true);
        make("animationTimingFunction", true);
        make("backfaceVisibility", true);
        make("background", false);
        make("backgroundAttachment", false);
        make("backgroundBlendMode", false);
        make("backgroundClip", true);
        make("backgroundColor", false);
        make("backgroundImage", false);
        make("backgroundOrigin", true);
        make("backgroundPosition", false);
        make("backgroundPositionX", false);
        make("backgroundPositionY", false);
        make("backgroundRepeat", false);
        make("backgroundRepeatX", false);
        make("backgroundRepeatY", false);
        make("backgroundSize", true);
        make("baselineShift", false);
        make("blockSize", false);
        make("border", false);
        make("borderBlockEnd", false);
        make("borderBlockEndColor", false);
        make("borderBlockEndStyle", false);
        make("borderBlockEndWidth", false);
        make("borderBlockStart", false);
        make("borderBlockStartColor", false);
        make("borderBlockStartStyle", false);
        make("borderBlockStartWidth", false);
        make("borderBottom", false);
        make("borderBottomColor", false);
        make("borderBottomLeftRadius", true);
        make("borderBottomRightRadius", true);
        make("borderBottomStyle", false);
        make("borderBottomWidth", false);
        make("borderCollapse", false);
        make("borderColor", false);
        make("borderImage", true);
        make("borderImageOutset", false);
        make("borderImageRepeat", false);
        make("borderImageSlice", false);
        make("borderImageSource", false);
        make("borderImageWidth", false);
        make("borderInlineEnd", false);
        make("borderInlineEndColor", false);
        make("borderInlineEndStyle", false);
        make("borderInlineEndWidth", false);
        make("borderInlineStart", false);
        make("borderInlineStartColor", false);
        make("borderInlineStartStyle", false);
        make("borderInlineStartWidth", false);
        make("borderLeft", false);
        make("borderLeftColor", false);
        make("borderLeftStyle", false);
        make("borderLeftWidth", false);
        make("borderRadius", true);
        make("borderRight", false);
        make("borderRightColor", false);
        make("borderRightStyle", false);
        make("borderRightWidth", false);
        make("borderSpacing", false);
        make("borderStyle", false);
        make("borderTop", false);
        make("borderTopColor", false);
        make("borderTopLeftRadius", true);
        make("borderTopRightRadius", true);
        make("borderTopStyle", false);
        make("borderTopWidth", false);
        make("borderWidth", false);
        make("bottom", false);
        make("boxShadow", true);
        make("boxSizing", true);
        make("breakAfter", false);
        make("breakBefore", false);
        make("breakInside", false);
        make("bufferedRendering", false);
        make("captionSide", false);
        make("caretColor", false);
        make("clear", false);
        make("clip", false);
        make("clipPath", true);
        make("clipRule", false);
        make("color", false);
        make("colorInterpolation", false);
        make("colorInterpolationFilters", false);
        make("colorRendering", false);
        make("columnCount", true);
        make("columnFill", false);
        make("columnGap", true);
        make("columnRule", true);
        make("columnRuleColor", true);
        make("columnRuleStyle", true);
        make("columnRuleWidth", true);
        make("columnSpan", true);
        make("columnWidth", true);
        make("columns", true);
        make("contain", false);
        make("content", false);
        make("counterIncrement", false);
        make("counterReset", false);
        make("cursor", false);
        make("cx", false);
        make("cy", false);
        make("d", false);
        make("direction", false);
        make("display", false);
        make("dominantBaseline", false);
        make("emptyCells", false);
        make("fill", false);
        make("fillOpacity", false);
        make("fillRule", false);
        make("filter", true);
        make("flex", true);
        make("flexBasis", true);
        make("flexDirection", true);
        make("flexFlow", true);
        make("flexGrow", true);
        make("flexShrink", true);
        make("flexWrap", true);
        make("float", false);
        make("floodColor", false);
        make("floodOpacity", false);
        make("font", false);
        make("fontDisplay", false);
        make("fontFamily", false);
        make("fontFeatureSettings", true);
        make("fontKerning", false);
        make("fontSize", false);
        make("fontStretch", false);
        make("fontStyle", false);
        make("fontVariant", false);
        make("fontVariantCaps", false);
        make("fontVariantEastAsian", false);
        make("fontVariantLigatures", false);
        make("fontVariantNumeric", false);
        make("fontVariationSettings", false);
        make("fontWeight", false);
        make("gap", false);
        make("grid", false);
        make("gridArea", false);
        make("gridAutoColumns", false);
        make("gridAutoFlow", false);
        make("gridAutoRows", false);
        make("gridColumn", false);
        make("gridColumnEnd", false);
        make("gridColumnGap", false);
        make("gridColumnStart", false);
        make("gridGap", false);
        make("gridRow", false);
        make("gridRowEnd", false);
        make("gridRowGap", false);
        make("gridRowStart", false);
        make("gridTemplate", false);
        make("gridTemplateAreas", false);
        make("gridTemplateColumns", false);
        make("gridTemplateRows", false);
        make("height", false);
        make("hyphens", false);
        make("imageRendering", false);
        make("inlineSize", false);
        make("isolation", false);
        make("justifyContent", true);
        make("justifyItems", false);
        make("justifySelf", false);
        make("left", false);
        make("letterSpacing", false);
        make("lightingColor", false);
        make("lineBreak", true);
        make("lineHeight", false);
        make("listStyle", false);
        make("listStyleImage", false);
        make("listStylePosition", false);
        make("listStyleType", false);
        make("margin", false);
        make("marginBlockEnd", false);
        make("marginBlockStart", false);
        make("marginBottom", false);
        make("marginInlineEnd", false);
        make("marginInlineStart", false);
        make("marginLeft", false);
        make("marginRight", false);
        make("marginTop", false);
        make("marker", false);
        make("markerEnd", false);
        make("markerMid", false);
        make("markerStart", false);
        make("mask", true);
        make("maskType", false);
        make("maxBlockSize", false);
        make("maxHeight", false);
        make("maxInlineSize", false);
        make("maxWidth", false);
        make("maxZoom", false);
        make("minBlockSize", false);
        make("minHeight", false);
        make("minInlineSize", false);
        make("minWidth", false);
        make("minZoom", false);
        make("mixBlendMode", false);
        make("objectFit", false);
        make("objectPosition", false);
        make("offset", false);
        make("offsetDistance", false);
        make("offsetPath", false);
        make("offsetRotate", false);
        make("opacity", true);
        make("order", true);
        make("orientation", false);
        make("orphans", false);
        make("outline", false);
        make("outlineColor", false);
        make("outlineOffset", false);
        make("outlineStyle", false);
        make("outlineWidth", false);
        make("overflow", false);
        make("overflowAnchor", false);
        make("overflowWrap", false);
        make("overflowX", false);
        make("overflowY", false);
        make("overscrollBehavior", false);
        make("overscrollBehaviorX", false);
        make("overscrollBehaviorY", false);
        make("padding", false);
        make("paddingBlockEnd", false);
        make("paddingBlockStart", false);
        make("paddingBottom", false);
        make("paddingInlineEnd", false);
        make("paddingInlineStart", false);
        make("paddingLeft", false);
        make("paddingRight", false);
        make("paddingTop", false);
        make("page", false);
        make("pageBreakAfter", false);
        make("pageBreakBefore", false);
        make("pageBreakInside", false);
        make("paintOrder", false);
        make("perspective", true);
        make("perspectiveOrigin", true);
        make("placeContent", false);
        make("placeItems", false);
        make("placeSelf", false);
        make("pointerEvents", false);
        make("position", false);
        make("quotes", false);
        make("r", false);
        make("resize", false);
        make("right", false);
        make("rowGap", false);
        make("rx", false);
        make("ry", false);
        make("scrollBehavior", false);
        make("scrollMargin", false);
        make("scrollMarginBlock", false);
        make("scrollMarginBlockEnd", false);
        make("scrollMarginBlockStart", false);
        make("scrollMarginBottom", false);
        make("scrollMarginInline", false);
        make("scrollMarginInlineEnd", false);
        make("scrollMarginInlineStart", false);
        make("scrollMarginLeft", false);
        make("scrollMarginRight", false);
        make("scrollMarginTop", false);
        make("scrollPadding", false);
        make("scrollPaddingBlock", false);
        make("scrollPaddingBlockEnd", false);
        make("scrollPaddingBlockStart", false);
        make("scrollPaddingBottom", false);
        make("scrollPaddingInline", false);
        make("scrollPaddingInlineEnd", false);
        make("scrollPaddingInlineStart", false);
        make("scrollPaddingLeft", false);
        make("scrollPaddingRight", false);
        make("scrollPaddingTop", false);
        make("scrollSnapAlign", false);
        make("scrollSnapStop", false);
        make("scrollSnapType", false);
        make("shapeImageThreshold", true);
        make("shapeMargin", true);
        make("shapeOutside", true);
        make("shapeRendering", false);
        make("size", false);
        make("speak", false);
        make("src", false);
        make("stopColor", false);
        make("stopOpacity", false);
        make("stroke", false);
        make("strokeDasharray", false);
        make("strokeDashoffset", false);
        make("strokeLinecap", false);
        make("strokeLinejoin", false);
        make("strokeMiterlimit", false);
        make("strokeOpacity", false);
        make("strokeWidth", false);
        make("tabSize", false);
        make("tableLayout", false);
        make("textAlign", false);
        make("textAlignLast", false);
        make("textAnchor", false);
        make("textCombineUpright", false);
        make("textDecoration", false);
        make("textDecorationColor", false);
        make("textDecorationLine", false);
        make("textDecorationSkipInk", false);
        make("textDecorationStyle", false);
        make("textIndent", false);
        make("textOrientation", true);
        make("textOverflow", false);
        make("textRendering", false);
        make("textShadow", false);
        make("textSizeAdjust", true);
        make("textTransform", false);
        make("textUnderlinePosition", false);
        make("top", false);
        make("touchAction", false);
        make("transform", true);
        make("transformBox", false);
        make("transformOrigin", true);
        make("transformStyle", true);
        make("transition", true);
        make("transitionDelay", true);
        make("transitionDuration", true);
        make("transitionProperty", true);
        make("transitionTimingFunction", true);
        make("unicodeBidi", false);
        make("unicodeRange", false);
        make("userSelect", true);
        make("userZoom", false);
        make("vectorEffect", false);
        make("verticalAlign", false);
        make("visibility", false);
        make("appRegion", true);
        make("appearance", true);
        make("borderAfter", true);
        make("borderAfterColor", true);
        make("borderAfterStyle", true);
        make("borderAfterWidth", true);
        make("borderBefore", true);
        make("borderBeforeColor", true);
        make("borderBeforeStyle", true);
        make("borderBeforeWidth", true);
        make("borderEnd", true);
        make("borderEndColor", true);
        make("borderEndStyle", true);
        make("borderEndWidth", true);
        make("borderHorizontalSpacing", true);
        make("borderStart", true);
        make("borderStartColor", true);
        make("borderStartStyle", true);
        make("borderStartWidth", true);
        make("borderVerticalSpacing", true);
        make("boxAlign", true);
        make("boxDecorationBreak", true);
        make("boxDirection", true);
        make("boxFlex", true);
        make("boxOrdinalGroup", true);
        make("boxOrient", true);
        make("boxPack", true);
        make("boxReflect", true);
        make("columnBreakAfter", true);
        make("columnBreakBefore", true);
        make("columnBreakInside", true);
        make("fontSizeDelta", true);
        make("fontSmoothing", true);
        make("highlight", true);
        make("hyphenateCharacter", true);
        make("lineClamp", true);
        make("locale", true);
        make("logicalHeight", true);
        make("logicalWidth", true);
        make("marginAfter", true);
        make("marginAfterCollapse", true);
        make("marginBefore", true);
        make("marginBeforeCollapse", true);
        make("marginBottomCollapse", true);
        make("marginCollapse", true);
        make("marginEnd", true);
        make("marginStart", true);
        make("marginTopCollapse", true);
        make("maskBoxImage", true);
        make("maskBoxImageOutset", true);
        make("maskBoxImageRepeat", true);
        make("maskBoxImageSlice", true);
        make("maskBoxImageSource", true);
        make("maskBoxImageWidth", true);
        make("maskClip", true);
        make("maskComposite", true);
        make("maskImage", true);
        make("maskOrigin", true);
        make("maskPosition", true);
        make("maskPositionX", true);
        make("maskPositionY", true);
        make("maskRepeat", true);
        make("maskRepeatX", true);
        make("maskRepeatY", true);
        make("maskSize", true);
        make("maxLogicalHeight", true);
        make("maxLogicalWidth", true);
        make("minLogicalHeight", true);
        make("minLogicalWidth", true);
        make("paddingAfter", true);
        make("paddingBefore", true);
        make("paddingEnd", true);
        make("paddingStart", true);
        make("perspectiveOriginX", true);
        make("perspectiveOriginY", true);
        make("printColorAdjust", true);
        make("rtlOrdering", true);
        make("rubyPosition", true);
        make("tapHighlightColor", true);
        make("textCombine", true);
        make("textDecorationsInEffect", true);
        make("textEmphasis", true);
        make("textEmphasisColor", true);
        make("textEmphasisPosition", true);
        make("textEmphasisStyle", true);
        make("textFillColor", true);
        make("textSecurity", true);
        make("textStroke", true);
        make("textStrokeColor", true);
        make("textStrokeWidth", true);
        make("transformOriginX", true);
        make("transformOriginY", true);
        make("transformOriginZ", true);
        make("userDrag", true);
        make("userModify", true);
        make("writingMode", true);
        make("whiteSpace", false);
        make("widows", false);
        make("width", false);
        make("willChange", false);
        make("wordBreak", false);
        make("wordSpacing", false);
        make("wordWrap", false);
        make("x", false);
        make("y", false);
        make("zIndex", false);
        make("zoom", false);
    }

})();