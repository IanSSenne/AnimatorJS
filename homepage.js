        function demo() {
            if (AnimatorJS.polyfill() && !document.createElement("div").animate) {
                console.log("using a polyfill, waiting for that to load");
                // return setTimeout(demo, 100);
            }
            let last_scrollY = -1000;
            let last_scrollTime = 0;
            n = 0;

            function dist(a, b) {
                return Math.abs(a - b);
            }
            let scrollYFix = false;

            function scrollLock() {
                if (!window.scrollY) scrollYFix = true;
                if (scrollYFix) {

                    window.scrollY = window.pageYOffset > 0 ? window.pageYOffset : document.documentElement
                        .scrollTop; //ie fix
                    // document.dispatchEvent(new Event("scroll"));
                }
                window.requestAnimationFrame(scrollLock);
                // setTimeout(scrollLock, 1000);
                let targets = [0, 1684, 2527, 3368, 4211, 5051];
                let nearest = targets[0];
                for (let i = 0; i < targets.length; i++) {
                    // debugger;
                    if (dist(nearest, scrollY) >= dist(scrollY, targets[i])) {
                        nearest = targets[i];
                    }
                }
                if (last_scrollTime + 200 < performance.now()) {
                    let scrollTarget =
                        nearest //Math.round(scrollY / 1000) * 1000 + Math.floor(5.994068801897983 * Math.round(scrollY / 1000)) * 843;
                    let scrollDif = Math.max(Math.min(20, scrollTarget - scrollY), -20);
                    // window.scrollBy(0, scrollDif);
                }
                // console.log(Math.abs(Math.max(Math.min(last_scrollY - scrollY, 20), -20)) != 20 && Math.abs(Math.max(
                // Math.min(last_scrollY - scrollY, 20), -20)) != 0);
            }
            scrollLock();
            document.addEventListener("mousewheel", function () {
                last_scrollTime = performance.now();
            })
            animation = document.querySelector("#top_bar_fixed").AnimatorJS()
                .position("fixed")
                .top("0px")
                .left("0px")
                .width("0px")
                .height("10px")
                .backgroundColor("red")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0px")
                .left("0px")
                .width("50%")
                .height("10px")
                .backgroundColor("blue")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0px")
                .left("0px")
                .width("100%")
                .height("10px")
                .backgroundColor("red")
                .bind("scroll", function (evt) {
                    let value = (scrollY / (document.body.scrollHeight - innerHeight)) * 1000;
                    if (last_scrollY < scrollY && document.body.scrollHeight - innerHeight - scrollY < 0) {
                        window.scrollTo(0, -1 * (document.body.scrollHeight - innerHeight - scrollY));
                        last_scrollY = -1000;
                    }
                    if (last_scrollY > scrollY && scrollY <= 1) {
                        window.scrollTo(0, document.body.scrollHeight - innerHeight - 2);
                    }
                    if (Math.abs(Math.max(Math.min(last_scrollY - scrollY, 20), -20)) != 20 && Math.abs(Math.max(
                            Math.min(last_scrollY - scrollY, 20), -20)) != 0) {
                        last_scrollTime = performance.now();
                    }
                    last_scrollY = scrollY;
                    return Math.min(Math.max(value, 0), 999.99999);
                });
            document.querySelector("#page0").AnimatorJS()
                .position("fixed")
                .top("0px")
                .left("0px")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0px")
                .left("50vw")
                .width("0px")
                .height("100vh")
                .backgroundColor("black")
                .color("transparent")
                .easing("linear")
                .next()
                .position("fixed")
                .top("-100vh")
                .left("50vw")
                .width("0px")
                .height("100vh")
                .backgroundColor("black")
                .color("transparent")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0px")
                .left("50vw")
                .width("0vw")
                .height("100vh")
                .backgroundColor("black")
                .color("transparent")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0px")
                .left("50vw")
                .width("0vw")
                .height("100vh")
                .backgroundColor("black")
                .color("transparent")
                .easing("linear").next()
                .position("fixed")
                .top("0px")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear").next()
                .position("fixed")
                .top("0px")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .bind("scroll", function () {
                    let value = (scrollY / (document.body.scrollHeight - innerHeight)) * 1000;
                    return Math.min(Math.max(value, 0), 999.99999);
                });
            document.querySelector("#page1").AnimatorJS()
                .position("fixed")
                .top("100vh")
                .left("0px")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("100vh")
                .left("0vh")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0px")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0px")
                .left("-100vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0px")
                .left("-100vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0px")
                .left("-100vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0px")
                .left("-100vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .easing("linear")
                .bind("scroll", function () {
                    let value = (scrollY / (document.body.scrollHeight - innerHeight)) * 1000;
                    return Math.min(Math.max(value, 0), 999.99999);
                });
            document.querySelector("#page2").AnimatorJS()
                .position("fixed")
                .top("100vh")
                .left("0px")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("100vh")
                .left("0vh")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("100vh")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0px")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("-100vh")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("-100vh")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("-100vh")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .bind("scroll", function () {
                    let value = (scrollY / (document.body.scrollHeight - innerHeight)) * 1000;
                    return Math.min(Math.max(value, 0), 999.99999);
                });
            document.querySelector("#page3").AnimatorJS()
                .position("fixed")
                .top("100vh")
                .left("0px")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("100vh")
                .left("0vh")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("100vh")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("100vh")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0vh")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0vh")
                .left("-100vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0vh")
                .left("-100vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("black")
                .color("white")
                .easing("linear")
                .bind("scroll", function () {
                    let value = (scrollY / (document.body.scrollHeight - innerHeight)) * 1000;
                    return Math.min(Math.max(value, 0), 999.99999);
                });
            document.querySelector("#page4").AnimatorJS()
                .position("fixed")
                .top("0vh")
                .left("100vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .color("black")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0vh")
                .left("100vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .color("black")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0vh")
                .left("100vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .color("black")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0vh")
                .left("100vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .color("black")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0vh")
                .left("100vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .color("black")
                .easing("linear")
                .next()
                .position("fixed")
                .top("0vh")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .color("black")
                .easing("linear")
                .next()
                .position("fixed")
                .top("-100vh")
                .left("0vw")
                .width("100vw")
                .height("100vh")
                .backgroundColor("white")
                .color("black")
                .easing("linear")
                .bind("scroll", function () {
                    let value = (scrollY / (document.body.scrollHeight - innerHeight)) * 1000;
                    return Math.min(Math.max(value, 0), 999.99999);
                });
        }