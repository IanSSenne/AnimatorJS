AnimatorJS.reference = function () {
    return void 0; //nonfunctional
    let defineProperty = Object.defineProperty;

    function ReferenceContainer(animation) {
        let _DOMParser = new DOMParser();
        this.document = _DOMParser.parseFromString("<div></div>", "text/html");
        this.element = this.document.querySelector("div");
        this._input_animation = animation;
        this._instance = animation.assign(this.element);
        ELEM = this.element;
    }

    function ReferenceContainer_DefineProperty(a, b) {
        defineProperty(ReferenceContainer.prototype, a, b);
    }
    ReferenceContainer_DefineProperty('currentTime', {
        set: function (value) {
            return this.set('currentTime', value);
        },
        get: function () {
            return this.get('currentTime');
        }
    });
    ReferenceContainer_DefineProperty('effect', {
        set: function (value) {
            return this.set('effect', value);
        },
        get: function () {
            return this.get('effect');
        }
    });
    ReferenceContainer_DefineProperty('finished', {
        get: function () {
            return this.get('finished');
        }
    });
    ReferenceContainer_DefineProperty('id', {
        set: function (value) {
            return this.set('id', value);
        },
        get: function () {
            return this.get('id');
        }
    });
    ReferenceContainer_DefineProperty('pending', {
        get: function () {
            return this.get('pending');
        }
    });
    ReferenceContainer_DefineProperty('playState', {
        get: function () {
            return this.get('playState');
        }
    });
    ReferenceContainer_DefineProperty('playbackRate', {
        set: function (value) {
            return this.set('playbackRate', value);
        },
        get: function () {
            return this.get('playbackRate');
        }
    });
    ReferenceContainer_DefineProperty('ready', {
        get: function () {
            return this.get('ready');
        }
    });
    ReferenceContainer_DefineProperty('startTime', {
        set: function (value) {
            return this.set('startTime', value);
        },
        get: function () {
            return this.get('startTime');
        }
    });
    ReferenceContainer_DefineProperty('timeline', {
        set: function (value) {
            return this.set('timeline', value);
        },
        get: function () {
            return this.get('timeline');
        }
    });
    ReferenceContainer_DefineProperty('oncancel', {
        set: function (value) {
            return this.set('oncancel', value);
        },
        get: function () {
            return this.get('oncancel');
        }
    });
    ReferenceContainer_DefineProperty('onfinish', {
        set: function (value) {
            return this.set('onfinish', value);
        },
        get: function () {
            return this.get('onfinish');
        }
    });

    function ReferenceContainer_proto(a, b) {
        ReferenceContainer.prototype[a] = b;
    }
    ReferenceContainer_proto('get', function (name) {
        this._instance.get(name);
    });
    ReferenceContainer_proto('set', function (name, value) {
        this._instance.set(name.value);
    });
    ReferenceContainer_proto('cancel', function () {
        this._instance.cancel();
    });
    ReferenceContainer_proto('finish', function () {
        this._instance.finish();
    });
    ReferenceContainer_proto('pause', function () {
        this._instance.pause();
    });
    ReferenceContainer_proto('play', function () {
        this._instance.play();
        this._instance._Animation.addEventListener("progress", console.log);
    });
    ReferenceContainer_proto('reverse', function () {
        this._instance.reverse();
    });
    ReferenceContainer_proto('updatePlaybackRate', function (speed) {
        this._instance.updatePlaybackRate(speed);
    });
    ReferenceContainer_proto("pos", function () {
        return this.element.position;
    })
    return function AnimatorJSreferenceGlobal(animation) {
        return new ReferenceContainer(animation);
    }
}();