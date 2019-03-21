AnimatorJS = function() {
    /*-----------------------------------------------------------------------------*\
    POLYFILL :)
    \*-----------------------------------------------------------------------------*/
    if (!this.document.createElement("div").animate) {
        let s = document.createElement("script");
        s.src = "https://rawgit.com/web-animations/web-animations-js/master/web-animations.min.js", 
        document.head ? document.head.appendChild(s) : document.addEventListener("load", () => {
            document.head.appendChild(s);
        });
    }
    /*-----------------------------------------------------------------------------*\
    class DelayedAnimationHolder(keyframes)
    allows storing of keyframes and functions to enable playback at a later time;
    and allows asignment to an element;
    \*-----------------------------------------------------------------------------*/    function DelayedAnimationHolder(keyframes, options) {
        this._options = options, this._keyframes = keyframes;
    }
    /*-----------------------------------------------------------------------------*\
    class DelayedAnimation(keyframes,options,element)
    allows storing of keyframes and functions to enable playback at a later time;
    \*-----------------------------------------------------------------------------*/
    function DelayedAnimation(keyframes, options, element) {
        this._keyframes = keyframes, this._options = options, this._element = element, this._Animation = null, 
        this._currentTime = null, //get-set currentTime
        this._effect = null, //get-set effect
        this._finished = null, //get     finished
        this._id = "", //get-set id
        this._playState = null, //get     playState
        this._playbackRate = 1, //get-set playbackRate
        this._ready = !1, //get     ready
        this._startTime = performance.now(), //get-set startTime
        this._timeline = null, //get-set timeline
        this._oncancel = null, //get-set oncancel (callback)
        this._onfinish = null, //get-set onfinish (callback)
        this._bind_isglobal = !1;
    }
    DelayedAnimationHolder.prototype.assign = function(element) {
        return new DelayedAnimation(this._keyframes, this._options, element);
    }, Object.defineProperty(DelayedAnimation.prototype, "currentTime", {
        set(value) {
            return this.set("currentTime", value);
        },
        get() {
            return this.get("currentTime");
        }
    }), Object.defineProperty(DelayedAnimation.prototype, "effect", {
        set(value) {
            return this.set("effect", value);
        },
        get() {
            return this.get("effect");
        }
    }), Object.defineProperty(DelayedAnimation.prototype, "finished", {
        get() {
            return this.get("finished");
        }
    }), Object.defineProperty(DelayedAnimation.prototype, "id", {
        set(value) {
            return this.set("id", value);
        },
        get() {
            return this.get("id");
        }
    }), Object.defineProperty(DelayedAnimation.prototype, "pending", {
        get() {
            return this.get("pending");
        }
    }), Object.defineProperty(DelayedAnimation.prototype, "playState", {
        get() {
            return this.get("playState");
        }
    }), Object.defineProperty(DelayedAnimation.prototype, "playbackRate", {
        set(value) {
            return this.set("playbackRate", value);
        },
        get() {
            return this.get("playbackRate");
        }
    }), Object.defineProperty(DelayedAnimation.prototype, "ready", {
        get() {
            return this.get("ready");
        }
    }), Object.defineProperty(DelayedAnimation.prototype, "startTime", {
        set(value) {
            return this.set("startTime", value);
        },
        get() {
            return this.get("startTime");
        }
    }), Object.defineProperty(DelayedAnimation.prototype, "timeline", {
        set(value) {
            return this.set("timeline", value);
        },
        get() {
            return this.get("timeline");
        }
    }), Object.defineProperty(DelayedAnimation.prototype, "oncancel", {
        set(value) {
            return this.set("oncancel", value);
        },
        get() {
            return this.get("oncancel");
        }
    }), Object.defineProperty(DelayedAnimation.prototype, "onfinish", {
        set(value) {
            return this.set("onfinish", value);
        },
        get() {
            return this.get("onfinish");
        }
    }), DelayedAnimation.prototype.get = function(name) {
        return this.exists() ? this._Animation[name] : this["_" + name];
    }, DelayedAnimation.prototype.set = function(name, value) {
        return this.exists() ? this._Animation[name] = value : this["_" + name] = value;
    }, DelayedAnimation.prototype.exists = function() {
        return !!this._Animation;
    }, DelayedAnimation.prototype.cancel = function() {
        this.exists() && this._Animation.cancel();
    }, DelayedAnimation.prototype.finish = function() {
        this.exists() && this._Animation.finish();
    }, DelayedAnimation.prototype.pause = function() {
        this.exists() && this._Animation.pause();
    }, DelayedAnimation.prototype.play = function() {
        this.exists() ? this._Animation.play() : (this._Animation = this._element.animate(this._keyframes, this._options), 
        this._startTime = performance.now(), this._Animation.id = this._id, this._Animation.play(), 
        this._Animation.playbackRate = this._playbackRate, this._Animation.startTime = this._startTime, 
        this._Animation.timeline = this._timeline, this._Animation.oncancel = this._oncancel, 
        this._Animation.onfinish = this._onfinish, this._is_bound && this.bind(this._bind_type, this._bind));
    }, DelayedAnimation.prototype.reverse = function() {
        this.exists() && this._Animation.reverse();
    }, DelayedAnimation.prototype.updatePlaybackRate = function(speed) {
        this.exists() && this._Animation.updatePlaybackRate(speed);
    }, DelayedAnimation.prototype.bind = function(type, func, isGlobal) {
        this._bind_isglobal = isGlobal, this.playbackRate = 0, this._is_bound = !0, this._bind_type = type, 
        this._bind = func, this._bound_call = (event => {
            this._is_bound = !0, this.exists() && (this.currentTime = this._bind(event, this));
        }), this._element && this._bind_type && this._bind_type && !this._bound && (this._bind_isglobal ? this._element.addEventListener(type, this._bound_call) : document.addEventListener(type, this._bound_call), 
        this.play());
    }
    /*-----------------------------------------------------------------------------*\
    function _Animator():AnimatorJS
    a wrapper for creating the animator js instance if one is not found
    if one is found returns that instance.
    \*-----------------------------------------------------------------------------*/;
    /*-----------------------------------------------------------------------------*\
    class AnimatorJS(element)
    takes in an optional element and contains interface for building out an animation
    using chainable function calls.
    ended by AnimationJS.render or AnimationJS.start
    \*-----------------------------------------------------------------------------*/
    function AnimatorJS(element) {
        this.Element = element, this.Animation = [], this.resetCurrent();
    }
    //the below snippet creates an element and reads the keys from the style value
    //in order to generate functions on the AnimatorJS prototype.
        let needed = Object.keys(document.createElement("div").style);
    //Firefox fix below can not get keys of of .style because that is a CSS2Properties object without any keys. have to use __proto__ as prototype is not readable.
        0 == needed.length && (needed = Object.keys(document.createElement("div").style.__proto__));
    for (let _i = 0; _i < needed.length; _i++) {
        let i = needed[_i];
        AnimatorJS.prototype[i] = function(...args) {
            return this.set(i, args.join(" ")), this;
        };
    }
    /*-----------------------------------------------------------------------------*\
    function GlobalAnimatorJS(element?);
    this function is exposed to the global scope to allow creation of non-Element bound AnimatorJS'
    \*-----------------------------------------------------------------------------*/
    //expose GlobalAnimatorJS as AnimatorJS to global scope as it can be used to make DelayedAnimationHolder Instances.
    return AnimatorJS.prototype.resetCurrent = function() {
        this.current = {};
        //I am not sure why I still keep this around. it will be useful if down the road this.current
        //needs to have data when starting.
        }, AnimatorJS.prototype.next = function() {
        return this.Animation.push(this.current), this.resetCurrent(), this;
    }, AnimatorJS.prototype.set = function(name, value) {
        this.current[name] = value;
        for (let i = 0; i < this.Animation.length; i++) this.Animation[i][name] || (this.Animation[i][name] = "auto");
    }, AnimatorJS.prototype.get = function(name) {
        return this.current[name];
    }, AnimatorJS.prototype.reset = function() {
        return this.Animation = [], this.resetCurrent(), this;
    }, AnimatorJS.prototype.valid = function(thing) {
        return void 0 != thing;
    }, AnimatorJS.prototype.transform = function(x, y, z) {
        let str = [];
        return this.valid(x) && str.push(`translateX(${x}px)`), this.valid(y) && str.push(`translateY(${y}px)`), 
        this.valid(z) && str.push(`translateZ(${z}px)`), this.set("transform", ((this.get("transform") || "") + " " + str.join(" ")).trim()), 
        this;
    }, AnimatorJS.prototype.rotate = function(x, y, z) {
        let str = [];
        return this.valid(x) && (this.valid(y) || this.valid(z) ? str.push(`rotateX(${x}deg)`) : str.push(`rotate(${x}deg)`)), 
        this.valid(y) && str.push(`rotateY(${y}deg)`), this.valid(z) && str.push(`rotateZ(${z}deg)`), 
        this.set("transform", ((this.get("transform") || "") + " " + str.join(" ")).trim()), 
        this;
    }, AnimatorJS.prototype.duration = function(t) {
        return this.requireDuration = !0, this.set("duration", t), this;
    }, AnimatorJS.prototype.build = function(duration = 1e3) {
        return Object.keys(this.current).length > 0 && (this.Animation.push(this.current), 
        this.resetCurrent()), this.updateDurationsForPlaying(duration);
    }, AnimatorJS.prototype.start = function(duration, options = {}) {
        let animation = this.build(duration);
        return options.duration = duration, this.itterationCount && (options.iterations = this.itterationCount), 
        this.Element ? this.AnimationInstance = this.Element.animate(animation, options) : this.AnimationInstance = new DelayedAnimationHolder(animation, options), 
        this.AnimationInstance;
    }, AnimatorJS.prototype.render = function(duration = 1e3, options = {}) {
        let animation = this.build(duration);
        return options.duration = duration, this.itterationCount && (options.iterations = this.itterationCount), 
        this.Element ? this.AnimationInstance = new DelayedAnimation(animation, options, this.Element) : this.AnimationInstance = new DelayedAnimationHolder(animation, options), 
        this.AnimationInstance;
    }, AnimatorJS.prototype.updateDurationsForPlaying = function(duration) {
        let last = 0, _keyframes = Object.assign([], this.Animation);
        //if (this.durationsCalculated) return 0;
                this.durationsCalculated = !0;
        for (let i = 0; i < _keyframes.length; i++) {
            let partDuration = duration / _keyframes.length - 1;
            if (this.requireDuration && !(partDuration = _keyframes[i].duration)) throw new Error("missing segment duration, if duration is used all segments need to have a duration");
            0 === i && _keyframes.length > 1 ? (duration -= _keyframes[1].duration || 0, _keyframes[0].duration = 0) : _keyframes[i].duration = (last += partDuration) / duration;
        }
        return _keyframes;
    }, AnimatorJS.prototype.easing = function(easingmode) {
        return this.set("easing", easingmode), this.set("animationTimingFunction", easingmode), 
        this;
    }, AnimatorJS.prototype.repeat = function(count) {
        return this.itterationCount = count, this;
    }, AnimatorJS.prototype.bind = function(type, func) {
        let animationInstance = this.render();
        return animationInstance.bind(type, func), animationInstance;
    }
    /*-----------------------------------------------------------------------------*\
    Extend the Element prototype so that you can do Element.AnimatorJS to animate that element.
    \*-----------------------------------------------------------------------------*/ , 
    Element.prototype.AnimatorJS = function() {
        return this.AnimatorJsInstance ? this.AnimatorJsInstance : (this.AnimatorJsInstance = new AnimatorJS(this), 
        this.AnimatorJsInstance);
    }, Element.prototype.getAnimatorInstance = function() {
        if (this.AnimatorJsInstance) return this.AnimatorJsInstance;
        throw new Error("unable to get AnimatorJS Instance");
    }, function(element) {
        return new AnimatorJS(element);
    };
}();