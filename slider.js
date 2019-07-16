// https://github.com/johnwalley/d3-simple-slider v1.5.2 Copyright 2019 John Walley
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("d3-array"), require("d3-axis"), require("d3-dispatch"), require("d3-drag"), require("d3-ease"), require("d3-scale"), require("d3-selection"), require("d3-transition")) : "function" == typeof define && define.amd ? define(["exports", "d3-array", "d3-axis", "d3-dispatch", "d3-drag", "d3-ease", "d3-scale", "d3-selection", "d3-transition"], e) : e((t = t || self).d3 = t.d3 || {}, t.d3, t.d3, t.d3, t.d3, t.d3, t.d3, t.d3)
}(this, function(t, e, a, r, n, l, i, u) {
    "use strict";
    var s = 200,
        c = 8,
        o = 100,
        d = 1,
        f = 2,
        m = 3,
        p = 4;

    function v(t) {
        return "translate(" + t + ",0)"
    }

    function g(t) {
        return "translate(0," + t + ")"
    }

    function h(t, h) {
        h = void 0 !== h ? h : null;
        var k = [0],
            x = [0],
            y = [0, 10],
            w = 100,
            A = 100,
            b = !0,
            D = "M-5.5,-5.5v10l6,5.5l6,-5.5v-10z",
            M = null,
            q = null,
            z = null,
            L = null,
            F = null,
            V = null,
            O = null,
            P = r.dispatch("onchange", "start", "end", "drag"),
            R = null,
            T = null,
            j = null,
            B = t === d || t === p ? -1 : 1,
            H = t === p || t === f ? "y" : "x",
            Q = t === p || t === f ? "x" : "y",
            U = t === d || t === m ? v : g,
            _ = t === d || t === m ? g : v,
            E = null;
        switch (t) {
            case d:
                E = a.axisTop;
                break;
            case f:
                E = a.axisRight;
                break;
            case m:
                E = a.axisBottom;
                break;
            case p:
                E = a.axisLeft
        }
        var C = null,
            G = null;

        function I(a) {
            R = a.selection ? a.selection() : a, h = h ? h.range([e.min(h.range()), e.min(h.range()) + (t === d || t === m ? w : A)]) : (h = y[0] instanceof Date ? i.scaleTime() : i.scaleLinear()).domain(y).range(t === d || t === m ? [0, w] : [A, 0]).clamp(!0), T = i.scaleLinear().range(h.range()).domain(h.range()).clamp(!0), k = k.map(function(t) {
                return i.scaleLinear().range(y).domain(y).clamp(!0)(t)
            }), L = L || h.tickFormat(), V = V || L || h.tickFormat(), R.selectAll(".axis").data([null]).enter().append("g").attr("transform", _(7 * B)).attr("class", "axis");
            var r = R.selectAll(".slider").data([null]),
                l = r.enter().append("g").attr("class", "slider").attr("cursor", t === d || t === m ? "ew-resize" : "ns-resize").call(n.drag().on("start", function() {
                    u.select(this).classed("active", !0);
                    var a = T(t === m || t === d ? u.event.x : u.event.y);
                    j = e.scan(k.map(function(t) {
                        return Math.abs(t - K(h.invert(a)))
                    }));
                    var n = k.map(function(t, e) {
                        return e === j ? K(h.invert(a)) : t
                    });
                    S(n), P.call("start", r, 1 === n.length ? n[0] : n), N(n, !0)
                }).on("drag", function() {
                    var e = v(T(t === m || t === d ? u.event.x : u.event.y));
                    S(e), P.call("drag", r, 1 === e.length ? e[0] : e), N(e, !0)
                }).on("end", function() {
                    u.select(this).classed("active", !1);
                    var e = v(T(t === m || t === d ? u.event.x : u.event.y));
                    S(e), P.call("end", r, 1 === e.length ? e[0] : e), N(e, !0), j = null
                }));
            l.append("line").attr("class", "track").attr(H + "1", h.range()[0] - B * c).attr("stroke", "#bbb").attr("stroke-width", 6).attr("stroke-linecap", "round"), l.append("line").attr("class", "track-inset").attr(H + "1", h.range()[0] - B * c).attr("stroke", "#FFE066").attr("stroke-width", 4).attr("stroke-linecap", "round"), O && l.append("line").attr("class", "track-fill").attr(H + "1", 1 === k.length ? h.range()[0] - B * c : h(k[0])).attr("stroke", O).attr("stroke-width", 4).attr("stroke-linecap", "round"), l.append("line").attr("class", "track-overlay").attr(H + "1", h.range()[0] - B * c).attr("stroke", "transparent").attr("stroke-width", 40).attr("stroke-linecap", "round").merge(r.select(".track-overlay"));
            var s = l.selectAll(".parameter-value").data(k).enter().append("g").attr("class", "parameter-value").attr("transform", function(t) {
                return U(h(t))
            }).attr("font-family", "sans-serif").attr("text-anchor", t === f ? "start" : t === p ? "end" : "middle");

            function v(t) {
                var e = K(h.invert(t));
                return k.map(function(t, a) {
                    return 2 === k.length ? a === j ? 0 === j ? Math.min(e, K(k[1])) : Math.max(e, K(k[0])) : t : a === j ? e : t
                })
            }
            s.append("path").attr("transform", "rotate(" + 90 * (t + 1) + ")").attr("d", D).attr("class", "handle").attr("aria-label", "handle").attr("aria-valuemax", y[1]).attr("aria-valuemin", y[0]).attr("aria-valuenow", k).attr("aria-orientation", t === p || t === f ? "vertical" : "horizontal").attr("focusable", "true").attr("tabindex", 0).attr("fill", "#17C9B7").attr("stroke", "#fff").on("keydown", function(t, e) {
                var a = M || (y[1] - y[0]) / o;

                function r(t) {
                    return k.map(function(a, r) {
                        return 2 === k.length ? r === e ? 0 === e ? Math.min(t, K(k[1])) : Math.max(t, K(k[0])) : a : r === e ? t : a
                    })
                }
                switch (u.event.key) {
                    case "ArrowLeft":
                    case "ArrowDown":
                        I.value(r(+k[e] - a)), u.event.preventDefault();
                        break;
                    case "PageDown":
                        I.value(r(+k[e] - 2 * a)), u.event.preventDefault();
                        break;
                    case "ArrowRight":
                    case "ArrowUp":
                        I.value(r(+k[e] + a)), u.event.preventDefault();
                        break;
                    case "PageUp":
                        I.value(r(+k[e] + 2 * a)), u.event.preventDefault();
                        break;
                    case "Home":
                        I.value(r(y[0])), u.event.preventDefault();
                        break;
                    case "End":
                        I.value(r(y[1])), u.event.preventDefault()
                }
            }), b && 1 === k.length && s.append("text").style("fill","#fff").attr("font-weight","bold").attr("font-size", 14).attr(Q, 27 * B).attr("dy", t === d ? "0em" : t === m ? ".71em" : ".32em").text(L(k[0])), a.select(".track").attr(H + "2", h.range()[1] + B * c), a.select(".track-inset").attr(H + "2", h.range()[1] + B * c), O && a.select(".track-fill").attr(H + "2", 1 === k.length ? h(k[0]) : h(k[1])), a.select(".track-overlay").attr(H + "2", h.range()[1] + B * c), a.select(".axis").call(E(h).tickFormat(L).ticks(F).tickValues(q)), R.select(".axis").select(".domain").remove(), a.select(".axis").attr("transform", _(7 * B)), a.selectAll(".axis text").attr("fill", "#fff").attr(Q, 20 * B).attr("dy", t === d ? "0em" : t === m ? ".71em" : ".32em").style("fill","#fff").attr("text-anchor", t === f ? "start" : t === p ? "end" : "middle"), a.selectAll(".axis line").attr("stroke", "#fff"), a.selectAll(".parameter-value").attr("transform", function(t) {
                return U(h(t))
            }), J(), G = R.select(".parameter-value text"), C = R.select(".track-fill")
        }

        function J() {
            if (R && b && 1 === k.length) {
                var t = [];
                R.selectAll(".axis .tick").each(function(e) {
                    t.push(Math.abs(e - k[0]))
                });
                var a = e.scan(t);
                R.selectAll(".axis .tick text").attr("opacity", function(t, e) {
                    return e === a ? 0 : 1
                })
            }
        }

        function K(t) {
            if (M) {
                var a = (t - y[0]) % M,
                    r = t - a;
                return 2 * a > M && (r += M), t instanceof Date ? new Date(r) : r
            }
            if (z) {
                var n = e.scan(z.map(function(e) {
                    return Math.abs(t - e)
                }));
                return z[n]
            }
            return t
        }

        function N(t, e) {
            (k[0] !== t[0] || k.length > 1 && k[1] !== t[1]) && (k = t, e && P.call("onchange", I, 1 === t.length ? t[0] : t), J())
        }

        function S(t, e) {
            R && ((e = void 0 !== e && e) ? (R.selectAll(".parameter-value").data(t).transition().ease(l.easeQuadOut).duration(s).attr("transform", function(t) {
                return U(h(t))
            }).select(".handle").attr("aria-valuenow", function(t) {
                return t
            }), O && C.transition().ease(l.easeQuadOut).duration(s).attr(H + "1", 1 === k.length ? h.range()[0] - B * c : h(t[0])).attr(H + "2", 1 === k.length ? h(t[0]) : h(t[1]))) : (R.selectAll(".parameter-value").data(t).attr("transform", function(t) {
                return U(h(t))
            }).select(".handle").attr("aria-valuenow", function(t) {
                return t
            }), O && C.attr(H + "1", 1 === k.length ? h.range()[0] - B * c : h(t[0])).attr(H + "2", 1 === k.length ? h(t[0]) : h(t[1]))), b && G.text(V(t[0])))
        }
        return h && (y = [e.min(h.domain()), e.max(h.domain())], t === d || t === m ? w = e.max(h.range()) - e.min(h.range()) : A = e.max(h.range()) - e.min(h.range()), h = h.clamp(!0)), I.min = function(t) {
            return arguments.length ? (y[0] = t, I) : y[0]
        }, I.max = function(t) {
            return arguments.length ? (y[1] = t, I) : y[1]
        }, I.domain = function(t) {
            return arguments.length ? (y = t, I) : y
        }, I.width = function(t) {
            return arguments.length ? (w = t, I) : w
        }, I.height = function(t) {
            return arguments.length ? (A = t, I) : A
        }, I.tickFormat = function(t) {
            return arguments.length ? (L = t, I) : L
        }, I.displayFormat = function(t) {
            return arguments.length ? (V = t, I) : V
        }, I.ticks = function(t) {
            return arguments.length ? (F = t, I) : F
        }, I.value = function(t) {
            if (!arguments.length) return 1 === k.length ? k[0] : k;
            var e = Array.isArray(t) ? t : [t];
            e.sort(function(t, e) {
                return t - e
            });
            var a = e.map(h).map(T).map(h.invert).map(K);
            return S(a, !0), N(a, !0), I
        }, I.silentValue = function(t) {
            if (!arguments.length) return 1 === k.length ? k[0] : k;
            var e = Array.isArray(t) ? t : [t];
            e.sort(function(t, e) {
                return t - e
            });
            var a = e.map(h).map(T).map(h.invert).map(K);
            return S(a, !1), N(a, !1), I
        }, I.default = function(t) {
            if (!arguments.length) return 1 === x.length ? x[0] : x;
            var e = Array.isArray(t) ? t : [t];
            return e.sort(function(t, e) {
                return t - e
            }), x = e, k = e, I
        }, I.step = function(t) {
            return arguments.length ? (M = t, I) : M
        }, I.tickValues = function(t) {
            return arguments.length ? (q = t, I) : q
        }, I.marks = function(t) {
            return arguments.length ? (z = t, I) : z
        }, I.handle = function(t) {
            return arguments.length ? (D = t, I) : D
        }, I.displayValue = function(t) {
            return arguments.length ? (b = t, I) : b
        }, I.fill = function(t) {
            return arguments.length ? (O = t, I) : O
        }, I.on = function() {
            var t = P.on.apply(P, arguments);
            return t === P ? I : t
        }, I
    }
    t.sliderHorizontal = function(t) {
        return h(m, t)
    }, t.sliderVertical = function(t) {
        return h(p, t)
    }, t.sliderTop = function(t) {
        return h(d, t)
    }, t.sliderRight = function(t) {
        return h(f, t)
    }, t.sliderBottom = function(t) {
        return h(m, t)
    }, t.sliderLeft = function(t) {
        return h(p, t)
    }, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});