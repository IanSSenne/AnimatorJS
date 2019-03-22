AnimatorJS.dom = (function () {
    /*-----------------------------------------------------------------------------*\
    AnimatorJSAnimation implements the AnimatorJS-Animation element
    this element acts as a wrapper for the AnimatorJS-Keyframe elements
    the animation can be gotten using <AnimatorJS-Animation>.animation
    \*-----------------------------------------------------------------------------*/
    class AnimatorJSAnimation extends HTMLElement {
        constructor() {
            super();
            this.animator = AnimatorJS();
            this.final = {};
            console.log("create element Animation");
        }
        connectedCallback() {
            this.style.display = "none";
            this.hidden = true;
        }
        disconnectedCallback() {
            console.log("disconnected", this);
        }

        adoptedCallback() {
            console.log("adopted", this);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            this.final.duration = +newValue;
        }
        static get observedAttributes() {
            return ['duration'];
        }
        get animation() {
            if (this._animation) return this._animation;
            let _children = Array.from(this.children);
            for (let i = 0; i < _children.length; i++) {
                debugger;
                console.log(i, _children[i]);
                this.animator.append(_children[i].get_animation());
            }
            return this._animation || (this._animation = this.animator.render());
        }
    }
    let _AnimatorJSAnimation = customElements.define("animatorjs-animation", AnimatorJSAnimation);
    /*-----------------------------------------------------------------------------*\
    AnimatorJSKeyframe implements the AnimatorJS-Keyframe element
    this element acts as a keyframe for the parent <AnimatorJS-Animation> element
    and will take in the atributes and any children element to the keyframes.
    expected children elements are <AnimatorJS-Option> elements
    \*-----------------------------------------------------------------------------*/
    class AnimatorJSKeyframe extends HTMLElement {
        constructor() {
            super();
            this._attributes = {};
            console.log("create element keyframe");
        }
        connectedCallback() {}
        disconnectedCallback() {
            console.log("disconnected", this);
        }

        adoptedCallback() {
            console.log("adopted", this);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            this._attributes[name] = newValue;
        }
        static get observedAttributes() {
            return ['style', 'easing', 'duration'];
        }
        get_animation() {
            this.animator = AnimatorJS();
            for (let key in this._attributes) {
                let newValue = this._attributes[key];
                switch (key) {
                    case "style":
                        this.animator.css(newValue);
                        break;
                    case "easing":
                        this.animator.easing(newValue);
                        break;
                    case "duration":
                        this.animator.duration(newValue);
                        break;
                    default:
                        this.animator.set(key, newValue);
                }
            }
            let children = Array.from(this.children);
            for (let i = 0; i < children.length; i++) {
                let name = children[i].getAttribute("name");
                let value = children[i].getAttribute("value");
                this.animator.set(name, value);
            }
            return this.animator.next();
        }
    }
    let _AnimatorJSKeyframe = customElements.define("animatorjs-keyframe", AnimatorJSKeyframe);
    /*-----------------------------------------------------------------------------*\
    AnimatorJSKeyframe implements the AnimatorJS-Option element
    the <AnimatorJS-Option> element is expected to have 2 attributes, name and value
    \*-----------------------------------------------------------------------------*/
    class AnimatorJSOption extends HTMLElement {
        constructor() {
            super();
            this._attributes = {};
            console.log("create element option");
        }
        attributeChangedCallback(name, oldValue, newValue) {
            this._attributes[name] = newValue;
            console.log("attribute", name, "set to", newValue, "on", this);
        }
        static get observedAttributes() {
            return ['*'];
        }
    }
    let _AnimatorJSOption = customElements.define("animatorjs-option", AnimatorJSOption);
    return {
        AnimatorJSAnimation,
        AnimatorJSKeyframe,
        AnimatorJSOption
    }
})();