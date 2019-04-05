let src_0, src_1, src_2, base = window.location.hostname == "localhost" ? window.location.origin : "https://ianssenne.github.io/AnimatorJS",
    URI = window.location.search.substr(1).split("&").reduce(function (a, b) {
        a[b.split("=")[0]] = JSON.parse((c = b.split("=", 2)[1]) == void 0 ? "false" : c);
        return a;
    }, {
        src: false
    });
if (!URI.src) {
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
        document.head.appendChild(s(src_0, function () {
            document.head.appendChild(s(src_1, function (_) {
                document.head.appendChild(s(src_2, function () {
                    demo();
                }))
            }))
        }));

    } else {
        setImmediate(a);
    }
})();