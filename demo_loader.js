let src_0, src_1, src_2;
if (window.location.search.length <= 1) {
    src_0 = "/build/AnimatorJS.min.js"
    src_1 = "/build/AnimatorJS.dom.min.js"
    src_2 = "/build/AnimatorJS.ref.min.js"
} else {
    src_0 = "/src/AnimatorJS.js"
    src_1 = "/src/AnimatorJS.dom.js"
    src_2 = "/src/AnimatorJS.ref.js"
}

function s(u, f) {
    g = document.createElement("script");
    g.setAttribute("src", u);
    g.onload = f;
    return g;
}

function demo() {}
(function a() {
    if (document.head) {
        document.head.appendChild(s(src_0, _ => document.head.appendChild(s(src_1, _ => document.head.appendChild(s(src_2, function () {
            demo();
        }))))));

    } else {
        setImmediate(a);
    }
})();