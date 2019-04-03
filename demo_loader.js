let src_0, src_1, src_2;
let base = window.location.hostname == "localhost" ? window.location.origin : "https://ianssenne.github.io/AnimatorJS";
if (window.location.search.length <= 1) {
    src_0 = base + "/build/AnimatorJS.min.js"
    src_1 = base + "/build/AnimatorJS.dom.min.js"
    src_2 = base + "/build/AnimatorJS.ref.min.js"
} else {
    src_0 = base + "/src/AnimatorJS.js"
    src_1 = base + "/src/AnimatorJS.dom.js"
    src_2 = base + "/src/AnimatorJS.ref.js"
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