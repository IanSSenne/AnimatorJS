/// <reference types="./" />
AnimatorJS = (function () {
    /*-----------------------------------------------------------------------------*\
    POLYFILLS :)
    \*-----------------------------------------------------------------------------*/
    if (!this.document.createElement("div").animate) {
        let s = document.createElement("script");
        s.src = "https://rawgit.com/web-animations/web-animations-js/master/web-animations.min.js";
        if (document.head) {
            document.head.appendChild(s);
        } else {
            document.addEventListener("load", () => {
                document.head.appendChild(s);
            })
        }
    }
    /*-----------------------------------------------------------------------------*\
    class DelayedAnimationHolder(keyframes)
    allows storing of keyframes and functions to enable playback at a later time;
    and allows asignment to an element;
    \*-----------------------------------------------------------------------------*/
    function DelayedAnimationHolder(keyframes, options) {
        this._options = options;
        this._keyframes = keyframes;
    }
    DelayedAnimationHolder.prototype.assign = function (element) {
        return new DelayedAnimation(this._keyframes, this._options, element);
    }
    /*-----------------------------------------------------------------------------*\
    class DelayedAnimation(keyframes,options,element)
    allows storing of keyframes and functions to enable playback at a later time;
    \*-----------------------------------------------------------------------------*/

    function DelayedAnimation(keyframes, options, element) {
        this._keyframes = keyframes;
        this._options = options
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
        //get     pending
    }
    Object.defineProperty(DelayedAnimation.prototype, 'currentTime', {
        set(value) {
            return this.set('currentTime', value);
        },
        get() {
            return this.get('currentTime');
        }
    });
    Object.defineProperty(DelayedAnimation.prototype, 'effect', {
        set(value) {
            return this.set('effect', value);
        },
        get() {
            return this.get('effect');
        }
    });
    Object.defineProperty(DelayedAnimation.prototype, 'finished', {
        get() {
            return this.get('finished');
        }
    });
    Object.defineProperty(DelayedAnimation.prototype, 'id', {
        set(value) {
            return this.set('id', value);
        },
        get() {
            return this.get('id');
        }
    });
    Object.defineProperty(DelayedAnimation.prototype, 'pending', {
        get() {
            return this.get('pending');
        }
    });
    Object.defineProperty(DelayedAnimation.prototype, 'playState', {
        get() {
            return this.get('playState');
        }
    });
    Object.defineProperty(DelayedAnimation.prototype, 'playbackRate', {
        set(value) {
            return this.set('playbackRate', value);
        },
        get() {
            return this.get('playbackRate');
        }
    });
    Object.defineProperty(DelayedAnimation.prototype, 'ready', {
        get() {
            return this.get('ready');
        }
    });
    Object.defineProperty(DelayedAnimation.prototype, 'startTime', {
        set(value) {
            return this.set('startTime', value);
        },
        get() {
            return this.get('startTime');
        }
    });
    Object.defineProperty(DelayedAnimation.prototype, 'timeline', {
        set(value) {
            return this.set('timeline', value);
        },
        get() {
            return this.get('timeline');
        }
    });
    Object.defineProperty(DelayedAnimation.prototype, 'oncancel', {
        set(value) {
            return this.set('oncancel', value);
        },
        get() {
            return this.get('oncancel');
        }
    });
    Object.defineProperty(DelayedAnimation.prototype, 'onfinish', {
        set(value) {
            return this.set('onfinish', value);
        },
        get() {
            return this.get('onfinish');
        }
    });
    DelayedAnimation.prototype.get = function get(name) {
        if (this.exists()) {
            return this._Animation[name];
        } else {
            return this["_" + name];
        }
    }
    DelayedAnimation.prototype.set = function set(name, value) {
        if (this.exists()) {
            return this._Animation[name] = value;
        } else {
            return this["_" + name] = value;
        }
    }
    DelayedAnimation.prototype.exists = function exists() {
        return !!this._Animation;
    }
    DelayedAnimation.prototype.cancel = function cancel() {
        if (this.exists()) {
            this._Animation.cancel();
        }
    }
    DelayedAnimation.prototype.finish = function finish() {
        if (this.exists()) {
            this._Animation.finish();
        }
    }
    DelayedAnimation.prototype.pause = function pause() {
        if (this.exists()) {
            this._Animation.pause();
        }
    }
    DelayedAnimation.prototype.play = function play() {
        if (this.exists()) {
            this._Animation.play();
        } else {
            this._Animation = this._element.animate(this._keyframes, this._options);
            this._Animation.finish();
            this._startTime = performance.now();
            this._Animation.id = this._id;
            this._Animation.playbackRate = this._playbackRate;
            this._Animation.startTime = this._startTime;
            this._Animation.timeline = this._timeline;
            this._Animation.oncancel = this._oncancel;
            this._Animation.onfinish = this._onfinish;
        }
    }
    DelayedAnimation.prototype.reverse = function reverse() {
        if (this.exists()) {
            this._Animation.reverse();
        }
    }
    DelayedAnimation.prototype.updatePlaybackRate = function updatePlaybackRate(speed) {
        if (this.exists()) {
            this._Animation.updatePlaybackRate(speed);
        }
    }
    /*-----------------------------------------------------------------------------*\
    function _Animator():AnimatorJS
    a wrapper for creating the animator js instance if one is not found
    if one is found returns that instance.
    \*-----------------------------------------------------------------------------*/
    let _Animator = function () {
        if (this.AnimatorJsInstance) return this.AnimatorJsInstance;
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

    //the below snippet creates an element and reads the keys from the style value
    //in order to generate functions on the AnimatorJS prototype.
    let needed = Object.keys(document.createElement("div").style);
    for (let _i = 0; _i < needed.length; _i++) {
        let i = needed[_i];
        AnimatorJS.prototype[i] = function (...args) {
            this.set(i, args.join(" "));
            return this;
        }
    }

    AnimatorJS.prototype.resetCurrent = function () {
        this.current = {};
        //I am not sure why I still keep this around. it will be useful if down the road this.current
        //needs to have data when starting.
    }

    AnimatorJS.prototype.next = function () {
        this.Animation.push(this.current);
        this.resetCurrent();
        return this;
    }
    AnimatorJS.prototype.set = function (name, value) {
        this.current[name] = value;
        for (let i = 0; i < this.Animation.length; i++) {
            if (!this.Animation[i][name]) {
                this.Animation[i][name] = "auto";
            }
        }
    }

    AnimatorJS.prototype.reset = function () {
        this.Animation = [];
        this.resetCurrent();
        return this;
    }

    AnimatorJS.prototype.valid = function (thing) {
        return thing != undefined;
    }
    AnimatorJS.prototype.transform = function (x, y, z) {
        let str = [];
        if (this.valid(x)) str.push(`translateX(${x}px)`);
        if (this.valid(y)) str.push(`translateY(${y}px)`);
        if (this.valid(z)) str.push(`translateZ(${z}px)`);
        this.set("transform", str.join(" "));
        return this;
    }
    AnimatorJS.prototype.rotate = function (x, y, z) {
        let str = [];
        if (this.valid(y)) str.push(`rotateY(${y}deg)`);
        if (this.valid(x)) str.push(`rotateX(${x}deg)`);
        if (this.valid(z)) str.push(`rotateZ(${z}deg)`);
        this.set("transform", str.join(" "));
        return this;
    }

    AnimatorJS.prototype.duration = function (t) {
        this.requireDuration = true;
        this.set("duration", t);
        return this;
    }

    AnimatorJS.prototype.build = function (duration = 1000) {
        if (Object.keys(this.current).length > 0) {
            this.Animation.push(this.current);
            this.resetCurrent();
        }
        return this.updateDurationsForPlaying(duration);
    }
    AnimatorJS.prototype.start = function (duration, options = {}) {
        let animation = this.build(duration);
        options.duration = duration;
        if (this.itterationCount) options.iterations = this.itterationCount;
        if (this.Element) {
            this.AnimationInstance = this.Element.animate(animation, options);
        } else {
            this.AnimationInstance = new DelayedAnimationHolder(animation, options);
        }
        return this.AnimationInstance;
    }
    AnimatorJS.prototype.render = function (duration = 1000, options = {}) {
        let animation = this.build(duration);
        options.duration = duration;
        if (this.itterationCount) options.iterations = this.itterationCount;
        if (this.Element) {
            this.AnimationInstance = new DelayedAnimation(animation, options, this.Element);
        } else {
            this.AnimationInstance = new DelayedAnimationHolder(animation, options);
        }
        return this.AnimationInstance;
    }

    AnimatorJS.prototype.updateDurationsForPlaying = function (duration) {
        let last = 0;
        //if (this.durationsCalculated) return 0;
        let _keyframes = Object.assign([], this.Animation);
        this.durationsCalculated = true;
        for (let i = 0; i < _keyframes.length; i++) {
            let partDuration = (duration / _keyframes.length - 1);
            if (this.requireDuration) {
                partDuration = _keyframes[i].duration;
                if (!partDuration) throw new Error("missing segment duration, if duration is used all segments need to have a duration");
            }
            if (i === 0 && _keyframes.length > 1) {
                duration -= _keyframes[1].duration || 0;
                _keyframes[0].duration = 0;
            } else {
                _keyframes[i].duration = (last += partDuration) / duration;
            }
        }
        return _keyframes;
    }

    AnimatorJS.prototype.easing = function (easingmode) {
        this.set("easing", easingmode);
        this.set("animationTimingFunction", easingmode);
        return this;
    }

    AnimatorJS.prototype.repeat = function (count) {
        this.itterationCount = count;
        return this;
    }

    /*-----------------------------------------------------------------------------*\
    Extend the Element prototype so that you can do Element.AnimatorJS to animate that element.
    \*-----------------------------------------------------------------------------*/

    Element.prototype.AnimatorJS = _Animator;

    Element.prototype.getAnimatorInstance = function () {
        if (this.AnimatorJsInstance) {
            return this.AnimatorJsInstance;
        } else {
            throw new Error("unable to get AnimatorJS Instance");
        }
    }

    //expose AnimatorJS to global scope as it can be used to make DelayedAnimationHolder Instances.
    return function GlobalAnimatorJS(element) {
        return new AnimatorJS(element);
    }
})();