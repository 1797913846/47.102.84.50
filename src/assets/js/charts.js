! function (t) {
  function i(o) {
    if (n[o]) return n[o].exports;
    var e = n[o] = {
      exports: {},
      id: o,
      loaded: !1
    };
    return t[o].call(e.exports, e, e.exports, i), e.loaded = !0, e.exports
  }
  var n = {};
  return i.m = t, i.c = n, i.p = "", i(0)
}([function (t, i, n) {
  var o = n(4),
    e = n(23),
    s = (n(33), n(36)),
    r = n(181),
    a = n(42),
    p = n(54);
  n(174), window.EmchartsMobileTime = o, window.EmchartsMobileK = e, window.EmchartsMobiLine = p, window.ChartMobiBar = s, window.ChartMobiGroupBar = a, window.ChartMobiYCategoryStack = r
}, , , , function (t, i, n) {
  var o = n(5),
    e = n(7),
    s = n(10),
    r = n(15),
    a = n(17),
    p = n(18),
    h = n(19),
    l = n(6),
    c = n(20),
    d = n(22),
    u = function () {
      function t(t) {
        this.defaultoptions = e.chartTime, this.options = {}, l(!0, this.options, e.defaulttheme, this.defaultoptions, t), this.container = document.getElementById(t.container), this.container.className = this.container.className.replace(/emcharts-container/g, "").trim(), this.container.className = this.container.className + " emcharts-container", this.onChartLoaded = void 0 == t.onChartLoaded ? function () {} : t.onChartLoaded
      }

      function i(t) {
        this.options.data = null == t ? this.options.data : t;
        var i = this.options.interactive;
        try {
          this.options.pricedigit = t.pricedigit || 2;
          var n = h.get_rect.apply(this, [this.options.canvas, this.options.data.total]);
          this.options.rect_unit = n;
          var e = new o(this.options);
          t && t.data && t.data.length > 0 && (new r(this.options), new a(this.options)), e.drawYMark(), this.options.showV === !0 && new p(this.options), i.hideLoading(), this.onChartLoaded(this)
        } catch (s) {
          i.hideLoading()
        }
        var l = this.options.dpr;
        return d.apply(this, [this.options.context, 85 * l, 10 * l, 82 * l, 20 * l]), !0
      }

      function n(t) {
        var i, n = this,
          o = t.canvas,
          e = this.options.interactive,
          s = !1,
          r = this.options.delaytouch = !0;
        o.addEventListener("touchstart", function (t) {
          r ? (s = !1, i = setTimeout(function () {
            s = !0, e.show(), u.apply(n, [e, t.changedTouches[0]]), t.preventDefault()
          }, 200)) : (e.show(), u.apply(n, [e, t.changedTouches[0]])), n.options.preventdefault && t.preventDefault()
        }), o.addEventListener("touchmove", function (t) {
          r ? (clearTimeout(i), s && (u.apply(n, [e, t.changedTouches[0]]), t.preventDefault())) : u.apply(n, [e, t.changedTouches[0]]), n.options.preventdefault && t.preventDefault()
        }), o.addEventListener("touchend", function (t) {
          r && clearTimeout(i), e.hide(), n.options.preventdefault && t.preventDefault()
        }), o.addEventListener("touchcancel", function (t) {
          r && clearTimeout(i), e.hide(), n.options.preventdefault && t.preventDefault()
        }), o.addEventListener("mousemove", function (t) {
          u.apply(n, [e, t]), t.preventDefault()
        }), o.addEventListener("mouseleave", function (t) {
          e.hide(), t.preventDefault()
        }), o.addEventListener("mouseenter", function (t) {
          u.apply(n, [e, t]), e.show(), t.preventDefault()
        })
      }

      function u(t, i) {
        var n = this.options.canvas,
          o = this.options.data.data,
          e = this.options.rect_unit,
          s = e.rect_w,
          r = this.options.padding,
          a = i.offsetX || i.clientX - this.container.getBoundingClientRect().left,
          p = i.offsetY || i.clientY - this.container.getBoundingClientRect().top,
          l = h.windowToCanvas.apply(this, [n, a, p]),
          c = l.x.toFixed(0),
          d = Math.floor((c - r.left) / s);
        if (o && o[d]) {
          t.showTip(n, a, o[d]);
          var u = h.canvasToWindow.apply(this, [n, o[d].cross_x, o[d].cross_y]),
            f = u.x,
            g = u.y;
          t.cross(n, f, g)
        }
      }
      return t.prototype.init = function () {
        this.options.type || (this.options.type = "T1");
        var t = document.createElement("canvas");
        this.container.style.position = "relative";
        var i = t.getContext("2d");
        this.options.canvas = t, this.options.context = i;
        var n = this.options.dpr;
        t.width = this.options.width * n, t.height = this.options.height * n, this.options.sepeNum = 6.5, void 0 === this.options.showV && (this.options.showV = !0), this.options.canvas_offset_top = 2, this.options.padding_left = 0, this.options.k_v_away = t.height / this.options.sepeNum, this.options.scale_count = void 0 == this.options.scale_count ? 0 : this.options.scale_count, this.options.c_1_height = this.options.showV ? 4 * t.height / this.options.sepeNum : t.height - 90 * n, this.options.padding = {}, this.options.padding.left = 0, this.options.padding.right = 2, this.options.padding.top = 2, this.options.padding.bottom = 0, this.options.unit = {}, this.options.unit.unitHeight = t.height / this.options.sepeNum, this.options.y_sep = this.options.y_sep || 5, this.options.x_sep = this.options.x_sep || 4, "t2" == this.options.type.toLowerCase() ? this.options.x_sep = 2 : "t3" == this.options.type.toLowerCase() ? this.options.x_sep = 3 : "t4" == this.options.type.toLowerCase() ? this.options.x_sep = 4 : "t5" == this.options.type.toLowerCase() && (this.options.x_sep = 5), t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.border = "0", i.translate("0", this.options.canvas_offset_top), i.font = this.options.font_size * this.options.dpr + "px Arial", i.lineWidth = 1 * this.options.dpr, this.options.enableHandle = void 0 == this.options.enableHandle ? !0 : this.options.enableHandle, this.container.appendChild(t)
      }, t.prototype.draw = function (t) {
        this.clear(), this.init();
        var o = this.options.interactive = new c(this.options);
        o.showLoading();
        var e = this;
        try {
          s({
            id: this.options.code,
            type: this.options.type
          }, function (o) {
            o ? i.apply(e, [o]) : i.apply(e, [
              []
            ]), e.options.enableHandle && n.call(e, e.options.context), t && t()
          }, o)
        } catch (r) {
          o.showNoData(), o.hideLoading()
        }
      }, t.prototype.reDraw = function () {
        this.clear(), this.init(), i.call(this)
      }, t.prototype.clear = function (t) {
        this.container ? this.container.innerHTML = "" : document.getElementById(this.options.container).innerHTML = "", t && t()
      }, t
    }();
  t.exports = u
}, function (t, i, n) {
  var o = n(6),
    e = n(7),
    s = n(8),
    r = function () {
      function t(t) {
        this.defaultoptions = e.draw_xy, this.options = {}, o(!1, this.options, this.defaultoptions, t), this.draw()
      }

      function i(t, i, n, o) {
        var e = this,
          s = this.options.padding,
          a = (this.options.c_1_height, t.canvas.width - s.left - s.right, o.length);
        t.save(), t.strokeStyle = "#e5e5e5";
        for (var p, h = 0; p = o[h]; h++) t.beginPath(), t.fillStyle = (a - 1) / 2 > h ? "#19AF43" : h > (a - 1) / 2 ? "#D53D25" : "#333333", t.textBaseline = 0 == h ? "bottom" : h == a - 1 ? "top" : "middle", isNaN(p.num) ? t.fillText("0.00", 5, p.y) : t.fillText(p.num.toFixed(this.options.pricedigit), 5, p.y), r.call(e, t, i, n, p);
        t.restore()
      }

      function n(t, i, n, o) {
        {
          var e = this.options.padding,
            r = this.options.c_1_height,
            a = t.canvas.width - e.left - e.right;
          o.length
        }
        t.save(), t.strokeStyle = "#e5e5e5";
        for (var p, h = 0; p = o[h]; h++) t.beginPath(), h % 2 == 1 ? s(t, 0, Math.round(p.y), t.canvas.width, Math.round(p.y), 5) : (t.moveTo(0, Math.round(p.y)), t.lineTo(t.canvas.width, Math.round(p.y)), t.stroke());
        t.rect(1, 0, a, r), t.stroke(), t.restore()
      }

      function r(t, i, n, o) {
        var e = (i + n) / 2,
          s = t.canvas.width;
        if (e) var r = ((o.num - e) / e * 100).toFixed(2) + "%";
        else var r = "0.00%";
        t.fillText(r, s - t.measureText(r).width - 5, o.y)
      }

      function a(t, i, n, o) {
        var e = this.options.padding.left;
        t.save(), t.beginPath(), t.fillStyle = "#A0A0A0", t.textBaseline = "middle";
        var r = t.canvas.width - e,
          a = i + t.canvas.height / 8 * 1 / 3,
          p = n.length,
          h = 0;
        if ("t1" == this.options.type.toLowerCase())
          for (var l = 0; p > l; l++)
            if (0 == l) t.fillText(n[l].str, e, a);
            else if (l == p - 1) t.fillText(n[l].str, r - t.measureText(n[l].str).width, a);
        else {
          var c = r * (n[l].tick / o) + e - t.measureText(n[l].str).width / 2,
            d = r * (n[p - 1].tick / o) + e - t.measureText(n[p - 1].str).width,
            u = h + t.measureText(n[l].str).width;
          if (u + 10 > c || c + t.measureText(n[l].str).width + 10 > d) continue;
          h = c, t.fillText(n[l].str, c, a)
        } else
          for (var f = (r - e) / p, g = 0; p > g; g++) t.fillText(n[g], (g + 1) * f - f / 2 - t.measureText(n[g]).width / 2, a);
        var m = this.options.x_sep,
          v = r / m;
        t.strokeStyle = "#e5e5e5";
        for (var g = 1; m > g; g++) {
          var x = !1;
          t.beginPath(), "t1" == this.options.type.toLowerCase() && g == m / 2 ? x = !0 : "t2" == this.options.type.toLowerCase() ? (this.options.x_sep = 2, 1 == g && (x = !0)) : "t3" == this.options.type.toLowerCase() ? this.options.x_sep = 3 : "t4" == this.options.type.toLowerCase() ? (this.options.x_sep = 4, 2 == g && (x = !0)) : "t5" == this.options.type.toLowerCase() ? this.options.x_sep = 5 : x = !1, x ? (t.strokeStyle = "#e5e5e5", t.moveTo(e + v * g, 0), t.lineTo(e + v * g, i), t.stroke()) : s(t, Math.round(e + v * g), 0, Math.round(e + v * g), i, 5)
        }
        t.restore()
      }

      function p(t, i, n, o) {
        for (var e = (t - i) / (n - 1), s = [], r = 0; n > r; r++) s.push({
          num: i + r * e,
          x: 0,
          y: o - r / (n - 1) * o
        });
        return s
      }
      return t.prototype.draw = function () {
        var t = this.options.data,
          i = this.options.context,
          o = t.max,
          e = t.min,
          s = this.options.y_sep,
          r = t.timeStrs,
          h = this.options.c_1_height,
          l = p(o, e, s, h);
        this.options.line_list_array = l, n.call(this, i, o, e, l), r && a.apply(this, [i, h, r, t.total])
      }, t.prototype.drawYMark = function () {
        var t = this.options.data,
          n = this.options.context,
          o = t.max,
          e = t.min,
          s = this.options.line_list_array;
        i.call(this, n, o, e, s)
      }, t
    }();
  t.exports = r
}, function (t) {
  var i = Object.prototype.hasOwnProperty,
    n = Object.prototype.toString,
    o = function (t) {
      return "function" == typeof Array.isArray ? Array.isArray(t) : "[object Array]" === n.call(t)
    },
    e = function (t) {
      if (!t || "[object Object]" !== n.call(t)) return !1;
      var o = i.call(t, "constructor"),
        e = t.constructor && t.constructor.prototype && i.call(t.constructor.prototype, "isPrototypeOf");
      if (t.constructor && !o && !e) return !1;
      var s;
      for (s in t);
      return "undefined" == typeof s || i.call(t, s)
    };
  t.exports = function s() {
    var t, i, n, r, a, p, h = arguments[0],
      l = 1,
      c = arguments.length,
      d = !1;
    for ("boolean" == typeof h ? (d = h, h = arguments[1] || {}, l = 2) : ("object" != typeof h && "function" != typeof h || null == h) && (h = {}); c > l; ++l)
      if (t = arguments[l], null != t)
        for (i in t) n = h[i], r = t[i], h !== r && (d && r && (e(r) || (a = o(r))) ? (a ? (a = !1, p = n && o(n) ? n : []) : p = n && e(n) ? n : {}, h[i] = s(d, p, r)) : "undefined" != typeof r && (h[i] = r));
    return h
  }
}, function (t) {
  var i = {
    defaulttheme: {
      spacing: .4,
      padding_left: 30,
      k_v_away: 30,
      canvas_offset_top: 40,
      point_width: 6,
      font_size: 12,
      point_color: "#8f8f8f",
      up_color: "#e30000",
      down_color: "#007130"
    },
    chartTime: {
      crossline: !0
    },
    chartK: {
      crossline: !1,
      showCross: !0,
      loadingImg: ""
    },
    chartLine: {
      showPoint: !1,
      canvasPaddingTop: 10,
      canvasPaddingLeft: 20,
      pointRadius: 10,
      lineMarkWidth: 15
    },
    draw_xy: {
      axis_color: "#fff",
      y_max: 100,
      y_min: 0,
      sepe_num: 5,
      y_padding_per: .05,
      date_offset_top: 15
    },
    draw_xy_web: {
      spacing: .4,
      padding_left: 30,
      k_v_away: 30,
      canvas_offset_top: 40,
      point_width: 5,
      font_size: 12,
      point_color: "#8f8f8f",
      up_color: "#e30000",
      down_color: "#007130",
      axis_color: "#fff",
      y_max: 100,
      y_min: 0,
      sepe_num: 9,
      y_padding_per: .05,
      date_offset_top: 15,
      crossline: !0,
      showCross: !0
    },
    draw_line: {
      avg_cost_color: "#DAA520"
    },
    draw_k: {},
    draw_ma: {},
    draw_v: {},
    interactive: {}
  };
  t.exports = i
}, function (t, i, n) {
  function o(t, i, n, o, s, r) {
    t.save();
    for (var a = void 0 === r ? 5 : r, p = o - i, h = s - n, l = Math.floor(Math.sqrt(p * p + h * h) / a), c = 0; l > c; c++) c % 2 === 0 ? t.moveTo(e(i + p / l * c), e(n + h / l * c)) : t.lineTo(e(i + p / l * c), e(n + h / l * c));
    t.stroke(), t.restore()
  }
  var e = n(9);
  t.exports = o
}, function (t) {
  function i(t) {
    if (isNaN(t)) return t;
    var i = Math.floor(t);
    return i + .5
  }
  t.exports = i
}, function (t, i, n) {
  function o(t, i, n) {
    var o = location.protocol + "//pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js",
      r = "fsdata",
      a = t.type.toLowerCase();
    "t1" === a && (a = "r");
    var p = {
      id: t.id,
      TYPE: a,
      js: r + "((x))",
      rtntype: 5,
      isCR: !1
    };
    s(o, p, r, function (o) {
      try {
        if (o) {
          var s = e(o, a, t.id);
          i(s)
        } else i(null)
      } catch (r) {
        n.showNoData(), n.hideLoading()
      }
    })
  }
  var e = n(11),
    s = n(14);
  t.exports = o
}, function (t, i, n) {
  function o(t) {
    var i = Math.floor(t / 60 / 60),
      n = t / 60 % 60;
    return s(i % 24, 2) + ":" + s(n, 2)
  }
  var e = n(12),
    s = n(13).fixed,
    r = function (t, i, n) {
      var s = (n.charAt(n.length - 1), t.info),
        r = s.ticks.split("|"),
        a = s.yc,
        p = 0,
        h = s.jys;
      s.pricedigit.split(".").length > 1 && (p = 0 == s.pricedigit.split(".")[1].length ? 2 : s.pricedigit.split(".")[1].length);
      var l = 0,
        c = a,
        d = 0,
        u = "",
        f = [],
        g = t.data,
        m = {};
      m.name = t.name, m.pricedigit = p, m.yc = a, m.data = [], m.total = s.total, m.timeStrs = [];
      for (var v = 0; v < g.length; v++) {
        var x = g[v].split(",");
        if (u !== x[0].split(" ")[0]) {
          var y = x[0].split(" ")[0].split("-");
          u = x[0].split(" ")[0], f.push(y[1] + "/" + y[2])
        }
        if (d = d > Number(x[2]) ? d : Number(x[2]), x[3] && 0 != x[3]) {
          if (x[1] >= x[3]) var w = x[1],
            _ = x[3];
          else var _ = x[1],
            w = x[3];
          l = Math.max(l, w), c = Math.min(c, _)
        }
        var b = {};
        b.time = x[0].split(" ")[1], b.price = x[1], 0 != v ? (b.percent = 0 == a ? 0 : ((x[1] - a) / a * 100).toFixed(2), b.up = x[1] - a > 0 ? !0 : !1) : (b.percent = 0 == a ? 0 : ((x[1] - a) / a * 100).toFixed(2), b.up = x[1] - a > 0 ? !0 : !1), b.volume = Number(Number(x[2]).toFixed(0)), b.avg_cost = x[3], m.data.push(b)
      }
      var M = 0,
        A = [],
        k = r.slice(3);
      for (v = 0, len = k.length; len > v; v += 2) {
        var T = M;
        M += (k[v + 1] - k[v]) / 60 + 1, 0 !== v ? (A.push({
          str: o(k[v - 1]) + "/" + o(k[v]),
          tick: T
        }), v === len - 2 && A.push({
          str: o(k[v + 1]),
          tick: M
        })) : (A.push({
          str: o(k[v]),
          tick: 0
        }), v === len - 2 && A.push({
          str: o(k[v + 1]),
          tick: M
        }))
      }
      return 2 != h && 6 != h && 13 != h && 80 != h && (A = [], A.push({
        str: o(k[0]),
        tick: 0
      }), A.push({
        str: o(k[k.length - 1]),
        tick: M
      })), "r" === i ? m.timeStrs = [].concat(A) : (m.timeStrs = f, i.match(/[0-9]/)[0] < f.length && (m.timeStrs = f.slice(1))), m.total = M, i.match(/[0-9]/) && (m.total = M * i.match(/[0-9]/)[0]), m.max = e(l, c, a).max, m.min = e(l, c, a).min, m
    };
  t.exports = r
}, function (t) {
  function i(t, i, n) {
    var o = 0,
      e = 0;
    n = parseFloat(n) || 0;
    var s = Math.max(Math.abs(n - t), Math.abs(n - i));
    return o = Number(n) + 1.05 * s, e = Number(n) - 1.05 * s, t == i && i == n && (o = 1.08 * n, e = .92 * n), 0 == n && (o = 0, e = 0), {
      max: o,
      min: e
    }
  }
  t.exports = i
}, function (t) {
  var i = {
    getMktByCode: function (t) {
      if (t.Length < 3) return t + "1";
      var i = t.substr(0, 1),
        n = t.substr(0, 3);
      return "5" == i || "6" == i || "9" == i ? t + "1" : "009" == n || "126" == n || "110" == n || "201" == n || "202" == n || "203" == n || "204" == n ? t + "1" : t + "2"
    },
    fixed: function (t, i) {
      var n = 0;
      t = t.toString();
      var o = t;
      for (n = 0; n < i - t.length; n++) o = "0" + o;
      return o
    },
    transform: function (t) {
      return t.replace(/(\d{4})(\d{2})(\d{2})/g, function (t, i, n, o) {
        return i + "-" + n + "-" + o
      })
    },
    windowToCanvas: function (t, i, n) {
      return {
        x: i * this.options.dpr,
        y: n * this.options.dpr
      }
    },
    canvasToWindow: function (t, i, n) {
      var o = t.getBoundingClientRect();
      return {
        x: i / this.options.dpr,
        y: (n + this.options.canvas_offset_top) * (o.height / t.height)
      }
    },
    get_y: function (t) {
      var i = this.options.c_1_height / 1,
        n = this.options.data.max / 1,
        o = this.options.data.min / 1;
      return n == o ? i / 2 : i - i * (t - o) / (n - o)
    },
    get_x: function (t) {
      var i = this.options.context.canvas,
        n = this.options.type,
        o = this.options.rect_unit.rect_w,
        e = this.options.data.data.length,
        s = this.options.data.total,
        r = this.options.padding_left;
      return "TL" == n ? (i.width - r) / s * t + r : (i.width - r) / e * t + r - o / 2
    },
    get_rect: function (t, i) {
      var n = (t.width - this.options.padding_left) / i,
        o = n * (1 - this.options.spacing);
      return {
        rect_w: n,
        bar_w: o
      }
    },
    format_unit: function (t, i) {
      i = void 0 == i ? 2 : i;
      var n = !1;
      0 > t && (t = Math.abs(t), n = !0);
      var o = 0,
        e = "";
      return n ? (1e4 > t ? o = t / 1 : t >= 1e4 && 1e8 > t ? (o = t / 1e4, e = "万") : t >= 1e8 ? (o = t / 1e8, e = "千万") : o = t / 1, o = -1 * o) : 1e4 > t ? o = t / 1 : t >= 1e4 && 1e8 > t ? (o = t / 1e4, e = "万") : t >= 1e8 ? (o = t / 1e8, e = "千万") : o = t / 1, (o / 1).toFixed(i) / 1 == (o / 1).toFixed(0) / 1 && (i = 0), parseFloat((o / 1).toFixed(i)) + e
    },
    translate: function (t) {
      function i(t) {
        return 100 > t ? t.toFixed(2) : Math.round(t)
      }
      var n = (t + "").length;
      return 4 >= n ? t : 9 > n ? i(1 * t / 1e4) + "万" : 13 > n ? i(1 * t / Math.pow(10, 8)) + "千万" : 16 >= n ? i(1 * t / Math.pow(10, 12)) + "亿" : void 0
    },
    addEvent: function (t, i, n) {
      t.attachEvent ? (t["e" + i + n] = n, t[i + n] = function () {
        t["e" + i + n](window.event)
      }, t.attachEvent("on" + i, t[i + n])) : t.addEventListener(i, n, !1)
    },
    removeEvent: function (t, i, n) {
      t.detachEvent ? (t.detachEvent("on" + i, t[i + n]), t[i + n] = null) : t.removeEventListener(i, n, !1)
    }
  };
  t.exports = i
}, function (t) {
  var i = function (t, i, n, o) {
    t = t || "", i = i || {}, n = n || "", o = o || function () {};
    var e = function (t) {
      var i = [];
      for (var n in t) t.hasOwnProperty(n) && i.push(n);
      return i
    };
    if ("object" == typeof i) {
      for (var s = "", r = e(i), a = 0; a < r.length; a++) s += encodeURIComponent(r[a]) + "=" + encodeURIComponent(i[r[a]]), a != r.length - 1 && (s += "&");
      t += "?" + s
    } else "function" == typeof i && (n = i, o = n);
    "function" == typeof n && (o = n, n = "callback"), Date.now || (Date.now = function () {
      return (new Date).getTime()
    });
    var p = Date.now(),
      h = "jsonp" + Math.round(p + 1000001 * Math.random());
    "string" == typeof n && (h = n), window[h] = function (t) {
      o(t);
      try {
        document.getElementsByTagName("head")[0].removeChild(l), delete window[h]
      } catch (i) {
        window[h] = void 0
      }
    }, t += -1 === t.indexOf("?") ? "?" : "&";
    var l = document.createElement("script");
    l.setAttribute("src", t + n + "=" + h), document.getElementsByTagName("head")[0].appendChild(l)
  };
  t.exports = i
}, function (t, i, n) {
  var o = n(6),
    e = n(7),
    s = (n(13), n(16)),
    r = function () {
      function t(t) {
        this.defaultoptions = e.draw_line, this.options = {}, o(!1, this.options, this.defaultoptions, t), this.draw()
      }

      function i(t, i) {
        t.beginPath(), t.save(), t.strokeStyle = "#195F9A";
        for (var n, o = 0; n = i[o]; o++) {
          var e = s.get_x.call(this, o + 1),
            r = s.get_y.call(this, n.price);
          t.lineTo(e, r), n.cross_x = e, n.cross_y = r
        }
        t.stroke(), t.restore()
      }
      return t.prototype.draw = function () {
        var t = this.options.context,
          n = this.options.data,
          o = n.data;
        i.apply(this, [t, o])
      }, t
    }();
  t.exports = r
}, function (t) {
  var i = {
    windowToCanvas: function (t, i, n) {
      return {
        x: i * this.options.dpr,
        y: n * this.options.dpr
      }
    },
    canvasToWindow: function (t, i, n) {
      var o = t.getBoundingClientRect();
      return {
        x: i / this.options.dpr,
        y: (n + this.options.canvas_offset_top) * (o.height / t.height)
      }
    },
    get_y: function (t) {
      return this.options.data.max - this.options.data.min == 0 ? this.options.c_1_height / 2 : this.options.c_1_height - this.options.c_1_height * (t - this.options.data.min) / (this.options.data.max - this.options.data.min)
    },
    get_x: function (t) {
      var i = this.options.context.canvas,
        n = (this.options.type, this.options.rect_unit.rect_w, this.options.data.data.length, this.options.data.total),
        o = this.options.padding_left;
      return (i.width - o - this.options.padding.right) / n * t + o
    }
  };
  t.exports = i
}, function (t, i, n) {
  var o = n(6),
    e = n(7),
    s = (n(13), n(16)),
    r = function () {
      function t(t) {
        this.defaultoptions = e.draw_line, this.options = {}, o(!0, this.options, this.defaultoptions, t), this.draw()
      }
      return t.prototype.draw = function () {
        var t = this.options.context,
          i = this.options.data;
        this.options.height = t.canvas.height * e.defaulttheme.c_h_percent, this.draw_k(t, i)
      }, t.prototype.draw_k = function (t, i) {
        var n = this.options.avg_cost_color,
          o = i.data;
        t.beginPath(), t.lineWidth = 1, t.strokeStyle = n, t.fillStyle = "";
        for (var e = 0; e < o.length; e++) {
          var r = s.get_x.call(this, e + 1),
            a = s.get_y.call(this, o[e].avg_cost);
          0 == e ? t.moveTo(r, a) : t.lineTo(r, a)
        }
        t.stroke()
      }, t
    }();
  t.exports = r
}, function (t, i, n) {
  var o = n(6),
    e = n(13),
    s = n(8),
    r = n(7),
    a = n(16),
    p = function () {
      function t(t) {
        this.defaultoptions = r.draw_v, this.options = {}, o(!1, this.options, this.defaultoptions, t), this.draw()
      }

      function i() {
        var t = this.options.context,
          i = this.options.data,
          o = i.data,
          e = this.options.padding_left,
          r = 2 * this.options.unit.unitHeight,
          h = .9 * r,
          l = t.canvas.height,
          c = l - r,
          d = t.canvas.width - this.options.padding_left,
          u = this.options.x_sep,
          f = d / u;
        if (!o || 0 == o.length) return t.beginPath(), t.fillStyle = "#999", t.strokeStyle = "#e5e5e5", t.rect(this.options.padding_left, c, t.canvas.width - this.options.padding_left, r - 2), void t.stroke();
        this.options.data.v_max = p(this.options.data);
        var g = i.v_max.toFixed(0),
          m = this.options.rect_unit,
          v = m.bar_w,
          x = this.options.up_color,
          y = this.options.down_color;
        this.options.showVMax === !0 && n(t, g, c), t.beginPath(), t.strokeStyle = "#e5e5e5", t.lineWidth = this.options.dpr, t.rect(this.options.padding_left + 1, c, d - 2, r - 2), t.moveTo(e, c + r / 2), t.lineTo(d, c + r / 2), t.stroke();
        for (var w = 1; u - 1 >= w; w++) {
          var _ = !1;
          t.beginPath(), "t2" == this.options.type.toLowerCase() ? (this.options.x_sep = 2, 1 == w && (_ = !0)) : "t3" == this.options.type.toLowerCase() ? this.options.x_sep = 3 : "t4" == this.options.type.toLowerCase() ? (this.options.x_sep = 4, 2 == w && (_ = !0)) : "t5" == this.options.type.toLowerCase() ? this.options.x_sep = 5 : _ = !1, _ ? (t.moveTo(e + d / 2, c), t.lineTo(e + d / 2, l), t.stroke()) : s(t, f * w + e, c, f * w + e, l)
        }
        t.lineWidth = 1;
        for (var b, M = 0; b = o[M]; M++) {
          var A = b.volume,
            k = b.up,
            T = A / g * h,
            C = a.get_x.call(this, M + 1),
            E = l - T;
          t.beginPath(), t.moveTo(C, E), 0 == M ? k ? (t.fillStyle = x, t.strokeStyle = x) : (t.fillStyle = y, t.strokeStyle = y) : b.price >= o[M - 1].price ? (t.fillStyle = x, t.strokeStyle = x) : (t.fillStyle = y, t.strokeStyle = y), t.rect(C - v / 2, E, v, T), t.fill()
        }
      }

      function n(t, i, n) {
        t.beginPath(), t.fillStyle = "#999", t.textBaseline = "top", t.fillText(e.format_unit(i), 0, n + 10), t.stroke()
      }

      function p(t) {
        if (t.data[0]) var i = t.data[0].volume;
        else var i = 0;
        for (var n = 0, o = t.data; n < t.data.length; n++) i < o[n].volume && (i = o[n].volume);
        return i
      }
      return t.prototype.draw = function () {
        var t = this.options.context;
        t.beginPath(), t.save(), i.call(this), t.restore()
      }, t
    }();
  t.exports = p
}, function (t) {
  var i = {
    getMktByCode: function (t) {
      if (t.Length < 3) return t + "1";
      var i = t.substr(0, 1),
        n = t.substr(0, 3);
      return "5" == i || "6" == i || "9" == i ? t + "1" : "009" == n || "126" == n || "110" == n || "201" == n || "202" == n || "203" == n || "204" == n ? t + "1" : t + "2"
    },
    fixed: function (t, i) {
      var n = 0;
      t = t.toString();
      var o = t;
      for (n = 0; n < i - t.length; n++) o = "0" + o;
      return o
    },
    transform: function (t) {
      return t.replace(/(\d{4})(\d{2})(\d{2})/g, function (t, i, n, o) {
        return i + "-" + n + "-" + o
      })
    },
    windowToCanvas: function (t, i, n) {
      return {
        x: i * this.options.dpr,
        y: n * this.options.dpr
      }
    },
    canvasToWindow: function (t, i, n) {
      var o = t.getBoundingClientRect();
      return {
        x: i / this.options.dpr,
        y: (n + this.options.canvas_offset_top) * (Math.abs(o.bottom - o.top) / t.height)
      }
    },
    get_y: function (t) {
      var i = this.options.currentData && this.options.currentData.max || this.options.data.max,
        n = this.options.currentData && this.options.currentData.min || this.options.data.min;
      return this.options.c_k_height - this.options.c_k_height * (t - n) / (i - n)
    },
    get_x: function (t) {
      var i = this.options.context.canvas,
        n = this.options.chartType,
        o = this.options.rect_unit.rect_w,
        e = this.options.currentData && this.options.currentData.data.length || this.options.data.data.length,
        s = this.options.currentData && this.options.currentData.total || this.options.data.total,
        r = this.options.padding.left,
        a = this.options.padding.right;
      return "TL" == n ? (i.width - r - a) / s * t + r : (i.width - r - a) / e * t + r - o / 2
    },
    get_rect: function (t, i) {
      var n = (t.width - this.options.padding.left - this.options.padding.right) / i,
        o = n * (1 - this.options.spacing);
      return {
        rect_w: n,
        bar_w: o
      }
    },
    format_unit: function (t, i) {
      i = void 0 == i ? 2 : i;
      var n = !1;
      0 > t && (t = Math.abs(t), n = !0);
      var o = 0,
        e = "";
      return n ? (1e4 > t ? o = t / 1 : t >= 1e4 && 1e8 > t ? (o = t / 1e4, e = "万") : t >= 1e8 ? (o = t / 1e8, e = "千万") : o = t / 1, o = -1 * o) : 1e4 > t ? o = t / 1 : t >= 1e4 && 1e8 > t ? (o = t / 1e4, e = "万") : t >= 1e8 ? (o = t / 1e8, e = "千万") : o = t / 1, (o / 1).toFixed(i) / 1 == (o / 1).toFixed(0) / 1 && (i = 0), (o / 1).toFixed(i) + e
    },
    addEvent: function (t, i, n) {
      t.attachEvent ? (t["e" + i + n] = n, t[i + n] = function () {
        t["e" + i + n](window.event)
      }, t.attachEvent("on" + i, t[i + n])) : t.addEventListener(i, n, !1)
    },
    removeEvent: function (t, i, n) {
      t.detachEvent ? (t.detachEvent("on" + i, t[i + n]), t[i + n] = null) : t.removeEventListener(i, n, !1)
    }
  };
  t.exports = i
}, function (t, i, n) {
  var o = n(21),
    e = n(13),
    s = n(7),
    r = function () {
      function t(t) {
        this.defaultoptions = s.interactive, this.options = o(this.defaultoptions, t)
      }
      return t.prototype.cross = function (t, i, n) {
        var o = (t.getBoundingClientRect(), this.options.dpr);
        if (!this.options.cross) {
          this.options.cross = {};
          var e = document.createElement("div");
          e.className = "cross-y", e.style.height = this.options.showV ? this.options.canvas.height / o + "px" : (this.options.c_1_height + this.options.canvas_offset_top) / o + "px", e.style.top = "0px", this.options.cross.y_line = e;
          var s = document.createElement("div");
          s.className = "cross-x", s.style.width = t.width / o + "px", this.options.cross.x_line = s;
          var r = document.createElement("div");
          r.className = "cross-p", r.style.width = r.style.height = this.options.point_width + "px", r.style.borderRadius = r.style.width, r.style.backgroundColor = this.options.point_color, this.options.cross.point = r;
          var a = document.createDocumentFragment();
          this.options.crossline ? (a.appendChild(s), a.appendChild(e), a.appendChild(r)) : a.appendChild(e), document.getElementById(this.options.container).appendChild(a)
        }
        var e = this.options.cross.y_line;
        e && (e.style.left = i + "px");
        var s = this.options.cross.x_line;
        s && (s.style.top = n + "px");
        var r = this.options.cross.point;
        if (r) {
          var p = this.options.point_width;
          r.style.left = i - p / 2 + "px", r.style.top = n - p / 2 + "px"
        }
      }, t.prototype.markMA = function (t, i, n, o) {
        if (this.options.mark_ma) {
          var e = this.options.mark_ma.mark_ma;
          this.options.mark_ma.ma_5_data.innerText = i ? "MA5:" + ("-" == i.value ? "-" : (i.value / 1).toFixed(this.options.pricedigit)) : this.default_m5 && "-" != this.default_m5.value ? "MA5:" + (this.default_m5.value / 1).toFixed(this.options.pricedigit) : "MA5: -", this.options.mark_ma.ma_10_data.innerText = n ? "MA10:" + ("-" == n.value ? "-" : (n.value / 1).toFixed(this.options.pricedigit)) : this.default_m10 && "-" != this.default_m10.value ? "MA10:" + (this.default_m10.value / 1).toFixed(this.options.pricedigit) : "MA10: -", this.options.mark_ma.ma_20_data.innerText = o ? "MA20:" + ("-" == o.value ? "-" : (o.value / 1).toFixed(this.options.pricedigit)) : this.default_m20 && "-" != this.default_m20.value ? "MA20:" + (this.default_m20.value / 1).toFixed(this.options.pricedigit) : "MA20: -"
        } else {
          this.options.mark_ma = {};
          var e = document.createElement("div");
          e.className = "mark-ma", e.style.top = "-1px", this.options.mark_ma.mark_ma = e;
          var s = document.createDocumentFragment(),
            r = document.createElement("span");
          r.className = "span-m5", r.innerText = i ? "MA5:" + ("-" == i.value ? "-" : (i.value / 1).toFixed(this.options.pricedigit)) : this.default_m5 && "-" != this.default_m5.value ? "MA5:" + (this.default_m5.value / 1).toFixed(this.options.pricedigit) : "MA5: -", this.options.mark_ma.ma_5_data = r;
          var a = document.createElement("span");
          a.id = "ma_10_data", a.className = "span-m10", a.innerText = n ? "MA10:" + ("-" == n.value ? "-" : (n.value / 1).toFixed(this.options.pricedigit)) : this.default_m10 && "-" != this.default_m10.value ? "MA10:" + (this.default_m10.value / 1).toFixed(this.options.pricedigit) : "MA10: -", this.options.mark_ma.ma_10_data = a;
          var p = document.createElement("span");
          p.id = "ma_20_data", p.className = "span-m20", p.innerText = o ? "MA20:" + ("-" == o.value ? "-" : (o.value / 1).toFixed(this.options.pricedigit)) : this.default_m20 && "-" != this.default_m20.value ? "MA20:" + (this.default_m20.value / 1).toFixed(this.options.pricedigit) : "MA20: -", this.options.mark_ma.ma_20_data = p, s.appendChild(r), s.appendChild(a), s.appendChild(p), e.appendChild(s), document.getElementById(this.options.container).appendChild(e), document.body.clientWidth <= 320 && (r.style.fontSize = "10px", a.style.fontSize = "10px", p.style.fontSize = "10px")
        }
      }, t.prototype.scale = function (t) {
        e.canvasToWindow.apply(this, [t, t.width, this.options.c_1_height]);
        if (!this.options.scale) {
          this.options.scale = {};
          var i = document.createElement("div");
          i.className = "scale-div", i.style.right = "20px", i.style.top = (this.options.c_1_height + this.options.canvas_offset_top) / this.options.dpr - 40 + "px", this.options.scale.scale = i;
          var n = document.createDocumentFragment(),
            o = document.createElement("span");
          o.className = "span-minus", this.options.scale.minus = o;
          var s = document.createElement("span");
          s.className = "span-plus", this.options.scale.plus = s, n.appendChild(o), n.appendChild(s), i.appendChild(n), document.getElementById(this.options.container).appendChild(i)
        }
      }, t.prototype.showTip = function (t, i, n) {
        var o = this.options.type.toUpperCase();
        if (this.options.tip) {
          var s = this.options.tip,
            r = this.options.tip.tip,
            a = Math.round(n.volume);
          "DK" == o || "WK" == o || "MK" == o || "M5K" == o || "M15K" == o || "M30K" == o || "M60K" == o ? (s.close.innerText = n.close, s.percent.innerText = n.percent + "%", s.count.innerText = e.translate(a), s.time.innerText = n.data_time.replace(/-/g, "/")) : ("T1" == o || "T2" == o || "T3" == o || "T4" == o || "T5" == o) && (s.close.innerText = n.price, s.percent.innerText = n.percent + "%", s.count.innerText = e.translate(a), s.time.innerText = n.time)
        } else {
          this.options.tip = {};
          var r = document.createElement("div");
          r.className = "show-tip", this.options.tip.tip = r;
          var p = document.createDocumentFragment(),
            h = document.createElement("span");
          h.className = "span-price", this.options.tip.close = h;
          var l = document.createElement("span");
          this.options.tip.percent = l;
          var c = document.createElement("span");
          this.options.tip.count = c;
          var d = document.createElement("span");
          this.options.tip.time = d;
          var u = document.createElement("div");
          u.className = "tip-line-1", u.appendChild(h), u.appendChild(l);
          var f = document.createElement("div");
          f.className = "tip-line-2", f.appendChild(c), f.appendChild(d), p.appendChild(u), p.appendChild(f), r.appendChild(p), document.getElementById(this.options.container).appendChild(r);
          var a = Math.round(n.volume);
          if ("DK" == o || "WK" == o || "MK" == o || "M5K" == o || "M15K" == o || "M30K" == o || "M60K" == o) {
            h.innerText = n.close, l.innerText = n.percent + "%", c.innerText = e.translate(a), d.innerText = n.data_time, r.style.top = -r.clientHeight + "px";
            var g = "span-k-c1",
              m = "span-k-c2"
          } else if ("T1" == o || "T2" == o || "T3" == o || "T4" == o || "T5" == o) {
            h.innerText = n.price, l.innerText = n.percent + "%", c.innerText = e.translate(a), d.innerText = n.time, r.style.top = -r.clientHeight + "px", r.className = r.className + " time-tip";
            var g = "span-time-c1",
              m = "span-time-c2"
          }
          h.className = h.className + " " + g, l.className = l.className + " " + m, c.className = c.className + " " + g, d.className = d.className + " " + m
        }
        n && n.up ? r.style.backgroundColor = this.options.up_color : n && !n.up && (r.style.backgroundColor = this.options.down_color), r.style.left = i <= r.clientWidth / 2 + this.options.padding_left / this.options.dpr ? this.options.padding_left / this.options.dpr + "px" : i >= t.width / this.options.dpr - r.clientWidth / 2 ? t.width / this.options.dpr - r.clientWidth + "px" : i - r.clientWidth / 2 + "px"
      }, t.prototype.markPoint = function (t, i, n, o) {
        if (o >= 0) {
          var s = e.canvasToWindow.apply(this, [n, n.width, this.options.c_1_height]),
            r = e.canvasToWindow.apply(this, [n, t, this.options.c_1_height]),
            a = document.createElement("div");
          a.className = "mark-point";
          var p = this.options.markPoint.imgUrl,
            h = void 0 == this.options.markPoint.width ? 15 : this.options.markPoint.width + "px",
            l = void 0 == this.options.markPoint.height ? 15 : this.options.markPoint.height + "px";
          if (p && (a.style.background = "url(" + p + ") no-repeat center center/" + h + " " + l + " #cccccc", a.style.background = "url(" + p + ") no-repeat center center/" + h + " " + l + " #cccccc"), this.options.markPoint.width && this.options.markPoint.height ? (a.style.width = h, a.style.height = l) : (a.style.width = h, a.style.height = l), a.setAttribute("data-point", i), !this.options.pointsContainer) {
            var c = document.createElement("div");
            this.options.pointsContainer = c, document.getElementById(this.options.container).appendChild(this.options.pointsContainer)
          }
          this.options.pointsContainer.appendChild(a), a.style.left = r.x - a.clientWidth / 2 + "px", a.style.top = s.y - 30 + "px"
        }
      }, t.prototype.show = function () {
        if (this.options.cross) {
          var t = this.options.cross.x_line;
          t && (t.style.display = "block");
          var i = this.options.cross.y_line;
          i && (i.style.display = "block");
          var n = this.options.cross.point;
          n && (n.style.display = "block")
        }
        if (this.options.tip) {
          var o = this.options.tip.tip;
          o && (o.style.display = "block")
        }
      }, t.prototype.hide = function () {
        if (this.options.cross) {
          var t = this.options.cross.x_line;
          t && (t.style.display = "none");
          var i = this.options.cross.y_line;
          i && (i.style.display = "none");
          var n = this.options.cross.point;
          n && (n.style.display = "none")
        }
        if (this.options.mark_ma) {
          var o = this.options.mark_ma.ma_5_data;
          o && (o.innerText = this.default_m5 && "-" != this.default_m5.value ? "MA5:" + (this.default_m5.value / 1).toFixed(this.options.pricedigit) : "MA5: -");
          var e = this.options.mark_ma.ma_10_data;
          e && (e.innerText = this.default_m10 && "-" != this.default_m10.value ? "MA10:" + (this.default_m10.value / 1).toFixed(this.options.pricedigit) : "MA10: -");
          var s = this.options.mark_ma.ma_20_data;
          s && (s.innerText = this.default_m20 && "-" != this.default_m20.value ? "MA20:" + (this.default_m20.value / 1).toFixed(this.options.pricedigit) : "MA20: -")
        }
        if (this.options.tip) {
          var r = this.options.tip.tip;
          r && (r.style.display = "none")
        }
      }, t.prototype.showLoading = function () {
        if (this.options.loading) this.options.loading.style.display = "block";
        else {
          var t = document.getElementById(this.options.container),
            i = document.createElement("div");
          i.className = "loading-chart", i.innerText = "拼命加载中...", i.style.height = this.options.height - 100 + "px", i.style.width = this.options.width + "px", i.style.paddingTop = "100px", this.options.loading = i, t.appendChild(i)
        }
      }, t.prototype.hideLoading = function () {
        this.options.loading.style.display = "none"
      }, t.prototype.showNoData = function () {
        if (this.options.noData) this.options.noData.style.display = "block";
        else {
          var t = document.getElementById(this.options.container),
            i = document.createElement("div");
          i.className = "loading-chart", i.innerText = "æš‚æ— æ•°æ®", i.style.height = this.options.height - 100 + "px", i.style.width = this.options.width + "px", i.style.paddingTop = "100px", this.options.noData = i, t.appendChild(i)
        }
      }, t
    }();
  t.exports = r
}, function (t) {
  var i, n, o;
  o = function (t) {
    return "[object Object]" === Object.prototype.toString.call(t)
  }, n = function e(t, i) {
    var n;
    for (n in t)
      if ("undefined" != typeof t[n]) try {
        if (o(t[n]) && o(i[n]) && e(t[n], i[n]), i.hasOwnProperty(n)) continue;
        i[n] = t[n]
      } catch (s) {}
  }, i = function () {
    var t, i = arguments,
      e = {};
    if (!i.length) return {};
    for (t = i.length - 1; t >= 0; t--) o(i[t]) && n(i[t], e);
    return i[0] = e, e
  }, t.exports = i
}, function (t) {
  function i(t, i, n, o, e, s) {
    var r = navigator.appVersion;
    (r.indexOf("MSIE 8.0") > -1 || r.indexOf("MSIE 7.0") > -1) && (s = !0);
    var a = t.canvas,
      p = new Image;
    o = void 0 == o ? 164 : o, e = void 0 == e ? 41 : e, p.width = 0, p.height = 0, p.src = '', s ? t.drawImage(p, a.width - i, n, o, e) : p.onload = function () {
      setTimeout(function () {
        t.drawImage(p, a.width - i, n, o, e)
      }, 1)
    }
  }
  t.exports = i
}, function (t, i, n) {
  var o = n(24),
    e = n(7),
    s = n(26),
    r = n(29),
    a = n(30),
    p = n(31),
    h = n(13),
    l = n(20),
    c = n(6),
    d = n(22),
    u = n(32),
    f = function () {
      function t(t) {
        this.defaultoptions = e.chartK, this.options = {}, c(!0, this.options, e.defaulttheme, t), this.container = document.getElementById(t.container), this.container.className = this.container.className.replace(/emcharts-container/g, "").trim(), this.container.className = this.container.className + " emcharts-container", this.options.onChartLoaded = void 0 == t.onChartLoaded ? function () {} : t.onChartLoaded
      }

      function i() {
        var t = this,
          i = t.options.type,
          o = t.options.interactive;
        this.options.interactive.showLoading();
        try {
          "DK" == i ? this.options.type = "K" : "WK" == i ? this.options.type = "WK" : "MK" == i ? this.options.type = "MK" : "M5K" == i ? this.options.type = "M5K" : "M15K" == i ? this.options.type = "M15K" : "M30K" == i ? this.options.type = "M30K" : "M60K" == i && (this.options.type = "M60K"), s(n.call(t), function (i) {
            i && (f.apply(t, [i]), t.options.clickable = !0)
          }, o)
        } catch (e) {
          t.options.clickable = !0, o.showNoData(), o.hideLoading()
        }
      }

      function n() {
        var t = {};
        return t.type = this.options.type, t.code = this.options.code, t.count = this.options.scale_count, t.authorityType = this.options.authorityType, t
      }

      function f(t) {
        var i = this.options.context,
          n = i.canvas;
        this.options.data = null == t ? this.options.data : t, t = this.options.data;
        var e = this.options.interactive;
        try {
          if (!t || !t.data || 0 == t.data.length) return this.options.data = {}, new o(this.options), new p(this.options), void e.hideLoading();
          if (this.options.pricedigit = t.pricedigit || 2, e.options.pricedigit = this.options.pricedigit, s) {
            var s = t.five_average,
              l = t.ten_average,
              c = t.twenty_average;
            e.default_m5 = s[s.length - 1], e.default_m10 = l[l.length - 1], e.default_m20 = c[c.length - 1]
          }
          var u = h.get_rect.apply(this, [n, t.data.length]);
          this.options.rect_unit = u;
          var f = new o(this.options);
          if (t && t.data && t.data.length > 0 && (new r(this.options), new a(this.options)), this.options.showV && new p(this.options), f.drawYMark(), this.options.interactive.options.pointsContainer) {
            var g = this.options.interactive.options.pointsContainer.children;
            this.markPointsDom = g
          }
          e.hideLoading(), this.options.onChartLoaded(this)
        } catch (m) {
          _this.options.clickable = !0, e.showNoData(), e.hideLoading()
        }
        return d.apply(this, [this.options.context, 190, 20]), !0
      }

      function g(t) {
        var n = this,
          o = t.canvas,
          e = n.options.interactive;
        this.options.clickable = !0;
        var s = !1,
          r = this.options.delaytouch = !0;
        o.addEventListener("touchstart", function (t) {
          r ? (s = !1, timer_s = setTimeout(function () {
            s = !0, e.show(), m.apply(n, [e, t.changedTouches[0]]), t.preventDefault()
          }, 200)) : (e.show(), m.apply(n, [e, t.changedTouches[0]])), n.options.preventdefault && t.preventDefault()
        }), o.addEventListener("touchmove", function (t) {
          r ? (clearTimeout(timer_s), s && (m.apply(n, [e, t.changedTouches[0]]), t.preventDefault())) : m.apply(n, [e, t.changedTouches[0]]), n.options.preventdefault && t.preventDefault()
        }), o.addEventListener("touchend", function () {
          r && clearTimeout(timer_s), e.hide()
        }), o.addEventListener("touchcancel", function (t) {
          r && clearTimeout(timer_s), e.hide(), n.options.preventdefault && t.preventDefault()
        }), o.addEventListener("mousemove", function (t) {
          m.apply(n, [e, t]), t.preventDefault()
        }), o.addEventListener("mouseleave", function (t) {
          e.hide(), t.preventDefault()
        }), o.addEventListener("mouseenter", function (t) {
          e.show(), t.preventDefault()
        });
        var a = e.options.scale.plus,
          p = e.options.scale.minus;
        a.addEventListener("click", function () {
          var e = n.options.scale_count;
          2 > e && n.options.clickable && (n.options.clickable = !1, p.style.opacity = "1", n.options.scale_count = e + 1, n.options.interactive.options.pointsContainer && (n.options.interactive.options.pointsContainer.innerHTML = ""), t.clearRect(0, -n.options.canvas_offset_top, o.width, o.height), i.apply(n)), n.options.scale_count >= 2 && (a.style.opacity = "0.5")
        }), p.addEventListener("click", function () {
          var e = n.options.scale_count;
          e > -2 && n.options.clickable && (n.options.clickable = !1, a.style.opacity = "1", n.options.scale_count = e - 1, n.options.interactive.options.pointsContainer && (n.options.interactive.options.pointsContainer.innerHTML = ""), t.clearRect(0, -n.options.canvas_offset_top, o.width, o.height), i.apply(n)), n.options.scale_count <= -2 && (p.style.opacity = "0.5")
        })
      }

      function m(t, i) {
        var n = this.options.canvas,
          o = this.options.data.data,
          e = this.options.data.five_average,
          s = this.options.data.ten_average,
          r = this.options.data.twenty_average,
          a = this.options.rect_unit,
          p = a.rect_w,
          l = i.offsetX || i.clientX - this.container.getBoundingClientRect().left,
          c = i.offsetY || i.clientY - this.container.getBoundingClientRect().top,
          d = h.windowToCanvas.apply(this, [n, l, c]),
          u = d.x.toFixed(0),
          f = Math.floor((u - this.options.padding_left) / p);
        if (o && o[f]) {
          t.showTip(n, l, o[f]);
          var g = h.canvasToWindow.apply(this, [n, o[f].cross_x, o[f].cross_y]),
            m = g.x,
            v = g.y;
          t.cross(n, m, v)
        }
        e && e[f] && t.markMA(n, e[f], s[f], r[f])
      }

      function v() {
        var t = null == u.getCookie("emcharts-authorityType") ? "" : u.getCookie("emcharts-authorityType");
        if (void 0 === this.options.authorityType) this.options.authorityType = t;
        else if (t !== this.options.authorityType) {
          var i = 1e6,
            n = new Date;
          n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3), u.setCookie("emcharts-authorityType", this.options.authorityType, n, "/")
        }
      }
      return t.prototype.init = function () {
        this.options.type = void 0 == this.options.type ? "DK" : this.options.type;
        var t = document.createElement("canvas");
        this.container.style.position = "relative";
        var i = t.getContext("2d");
        this.options.canvas = t, this.options.context = i;
        var n = this.options.dpr;
        t.width = this.options.width * n, t.height = this.options.height * n, this.options.sepeNum = 7, this.options.canvas_offset_top = t.height / this.options.sepeNum / 2, this.options.padding_left = 0, this.options.k_v_away = t.height / this.options.sepeNum, this.options.scale_count = void 0 == this.options.scale_count ? 0 : this.options.scale_count, this.options.showV = void 0 == this.options.showV ? !0 : this.options.showV, this.options.showVMark = void 0 == this.options.showVMark ? !1 : this.options.showVMark, this.options.c_1_height = this.options.showV ? 4 * t.height / this.options.sepeNum : t.height - 90 * n, this.options.unit = {}, this.options.unit.unitHeight = t.height / this.options.sepeNum, t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.border = "0", this.options.crossline = !1, i.translate("0", this.options.canvas_offset_top), i.font = this.options.font_size * this.options.dpr + "px Arial", i.lineWidth = 1 * this.options.dpr, this.options.enableHandle = void 0 == this.options.enableHandle ? !0 : this.options.enableHandle, this.container.appendChild(t), v.call(this)
      }, t.prototype.draw = function (t) {
        var i = this;
        i.clear(), i.init();
        var o = i.options.interactive = new l(i.options);
        o.showLoading();
        var e = i.options.type;
        try {
          "DK" == e ? this.options.type = "DK" : "WK" == e ? this.options.type = "WK" : "MK" == e ? this.options.type = "MK" : "M5K" == e ? this.options.type = "M5K" : "M15K" == e ? this.options.type = "M15K" : "M30K" == e ? this.options.type = "M30K" : "M60K" == e && (this.options.type = "M60K"), s(n.call(i), function (n) {
            var e = f.apply(i, [n]);
            o.markMA(i.options.canvas), o.scale(i.options.canvas), e && i.options.enableHandle && g.call(i, i.options.context), t && t(i.options)
          }, o)
        } catch (r) {
          o.showNoData(), o.hideLoading()
        }
      }, t.prototype.reDraw = function () {
        this.clear(), this.init(), f.call(this)
      }, t.prototype.clear = function (t) {
        this.container ? this.container.innerHTML = "" : document.getElementById(this.options.container).innerHTML = "", t && t()
      }, t.prototype.getMarkPointsDom = function () {
        var t = this.options.interactive.options.pointsContainer.children;
        return t
      }, t
    }();
  t.exports = f
}, function (t, i, n) {
  var o = n(6),
    e = n(7),
    s = n(25),
    r = n(9),
    a = function () {
      function t(t) {
        this.defaultoptions = e.draw_xy, this.options = {}, o(!1, this.options, this.defaultoptions, t), this.draw()
      }

      function i(t, i, n, o) {
        o.length;
        t.beginPath(), t.fillStyle = "#333333", t.strokeStyle = "#e5e5e5", t.rect(1, 0, this.options.canvas.width - 2, this.options.c_1_height), t.stroke(), t.beginPath();
        for (var e = 0; 3 > e; e++) {
          var a = (e + 1) / 4 * (t.canvas.width - this.options.padding_left) + this.options.padding_left;
          1 == e ? (t.strokeStyle = "#e5e5e5", t.moveTo(r(a), .5), t.lineTo(r(a), r(this.options.c_1_height)), t.stroke()) : (t.strokeStyle = "#efefef", s(t, a, 0, a, this.options.c_1_height, 5))
        }
        for (var p, e = 0; p = o[e]; e++) t.beginPath(), 2 == e ? (t.strokeStyle = "#e5e5e5", t.moveTo(.5, r(p.y)), t.lineTo(r(t.canvas.width), r(p.y)), t.stroke()) : 0 != e && e != o.length - 1 && (t.strokeStyle = "#efefef", s(t, 0, Math.round(p.y), t.canvas.width, Math.round(p.y), 5))
      }

      function n(t, i, n) {
        var o = this.options.padding_left;
        t.beginPath(), t.fillStyle = "#999";
        var e = t.canvas.width,
          s = i + 1 * this.options.unit.unitHeight / 3,
          r = this.options.data.data.filter(function (t) {
            return void 0 !== t
          }).length;
        if (r > 10) t.fillText(n[0], o, s), t.fillText(n[1], (e - o) / 2 + o - t.measureText(n[1]).width / 2, s), t.fillText(n[2], e - t.measureText(n[2]).width, s);
        else {
          t.fillText(n[0], o, s);
          var a = o + (e - o) / 10 * r - this.options.rect_unit.rect_w / 2 - t.measureText(n[2]).width / 2;
          a > o + t.measureText(n[0]).width + 10 && t.fillText(n[2], a, s)
        }
      }

      function a(t, i, n, o) {
        for (var e = (t - i) / (n - 1), s = [], r = 0; n > r; r++) s.push({
          num: i + r * e,
          x: 0,
          y: o - r / (n - 1) * o
        });
        return s
      }
      return t.prototype.draw = function () {
        var t = this.options.data,
          o = this.options.context,
          e = (this.options.type, t.max),
          s = t.min,
          r = 5,
          p = t.timeStrs,
          h = this.options.c_1_height,
          l = a(e, s, r, h);
        this.options.y_mark_list = l, i.apply(this, [o, e, s, l]), p && n.apply(this, [o, h, p])
      }, t.prototype.drawYMark = function () {
        var t = this.options.context;
        t.beginPath(), t.fillStyle = "#333333", t.strokeStyle = "#e5e5e5";
        for (var i, n = this.options.y_mark_list, o = 0; i = n[o]; o++) t.beginPath(), isNaN(i.num) ? t.fillText("0.00", 0, i.y - 10) : 0 == o ? t.fillText(i.num.toFixed(this.options.pricedigit), 5, i.y - 10) : o == n.length - 1 ? t.fillText(i.num.toFixed(this.options.pricedigit), 5, i.y + 25) : t.fillText(i.num.toFixed(this.options.pricedigit), 5, i.y + 10)
      }, t
    }();
  t.exports = a
}, function (t, i, n) {
  function o(t, i, n, o, s, r) {
    t.save();
    for (var a = void 0 === r ? 5 : r, p = o - i, h = s - n, l = Math.floor(Math.sqrt(p * p + h * h) / a), c = 0; l > c; c++) c % 2 === 0 ? t.moveTo(e(i + p / l * c), e(n + h / l * c)) : t.lineTo(e(i + p / l * c), e(n + h / l * c));
    t.stroke(), t.restore()
  }
  var e = n(9);
  t.exports = o
}, function (t, i, n) {
  function o(t, i, n) {
    var o = location.protocol + "//pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js",
      a = "fsdata" + (new Date).getTime().toString().substring(0, 10),
      p = t.code || t,
      h = "k";
    "dk" !== t.type.toLowerCase() && (h = t.type);
    var l = 0 | t.count,
      c = 60;
    switch (l) {
      case 0:
        c = 60;
        break;
      case 1:
        c = 45;
        break;
      case 2:
        c = 36;
        break;
      case -1:
        c = 105;
        break;
      case -2:
        c = 205
    }
    var d = new Date,
      u = d.getFullYear().toString() + r((d.getMonth() + 1).toString(), 2) + r(d.getDate(), 2),
      f = u + "," + (c + 20);
    null !== h.match("M") && "MK" !== h && (f = u + r(d.getHours(), 2) + r(d.getMinutes(), 2) + "," + (c + 20));
    var g = {
      id: p,
      TYPE: h,
      js: a + "((x))",
      rtntype: 5,
      QueryStyle: "2.2",
      QuerySpan: f,
      extend: "cma,5,10,20,30",
      isCR: !1
    };
    "" !== t.authorityType && t.authorityType && (g.authorityType = t.authorityType), e(o, g, a, function (t) {
      try {
        if (t) {
          var o = t.info;
          if (window.pricedigit = o.pricedigit.split(".").length > 1 ? 0 == o.pricedigit.split(".")[1].length ? 2 : o.pricedigit.split(".")[1].length : 0, o.total < c) var e = s(t, o.total);
          else var e = s(t, c);
          e.name = t.name, e.total = o.total, e.count = c - 20, e.pricedigit = window.pricedigit, e.data.length < 10 && (e.data.length = 10), i(e)
        } else i(null)
      } catch (r) {
        n.showNoData(), n.hideLoading()
      }
    })
  }
  var e = n(14),
    s = n(27),
    r = n(13).fixed;
  t.exports = o
}, function (t, i, n) {
  function o(t, i) {
    var n = t.info || {},
      o = t.data,
      h = {},
      l = -99999999,
      c = 99999999,
      d = 0,
      u = 0;
    h.data = [], h.max = 0, h.min = t.info.yc, h.v_max = 0, h.total = t.info.total, h.name = t.name, h.code = t.code, h.pricedigit = (t.info.pricedigit.split(".")[1] || "").length;
    var f = t.info.yc,
      g = o.length,
      m = g - i > 0 ? g - i : 0;
    f = 0 === m ? o[0].split(/\[|\]/)[0].split(",")[2] : o[m - 1].split(/\[|\]/)[0].split(",")[2];
    var v = t.data;
    for (u = m; g > u; u++) {
      var x = v[u].split(/\[|\]/),
        y = v[u].split(/\[|\]/)[0].split(","),
        w = {};
      w.data_time = y[0], w.open = y[1], w.close = y[2], w.highest = y[3], w.lowest = y[4];
      var _;
      if (u > 0) {
        var b = v[u - 1].split(/\[|\]/)[0].split(",");
        _ = b[2]
      } else _ = n.yc || y[2];
      if (u > 0 ? w.percent = 0 == f ? 0 : (100 * (1 * w.close - f) / f * 1).toFixed(2) : (w.percent = 0, l = c = w.open), w.priceChange = (w.close - _).toFixed(h.pricedigit), w.percent = 0 === _ ? 0 : (w.priceChange / _ * 100).toFixed(2), u == m && (w.priceChange = 0..toFixed(h.pricedigit), w.percent = 0..toFixed(h.pricedigit)), w.volume = y[5], f = w.close, w.up = 1 * w.close - 1 * w.open >= 0 ? !0 : !1, x[1]) {
        var M = x[1].split(",");
        e.call(h, "five_average", M[0], w.data_time), e.call(h, "ten_average", M[1], w.data_time), e.call(h, "twenty_average", M[2], w.data_time), e.call(h, "thirty_average", M[3], w.data_time)
      }
      l = Math.max(l, w.highest), c = Math.min(c, w.lowest), h.max = s([1 * w.highest, y[1], y[2], y[3], y[4], _]), h.min = r([1 * w.highest, y[1], y[2], y[3], y[4], _]), d = d > 1 * w.volume ? d : 1 * w.volume, h.data.push(w)
    }
    return h.timeStrs = [], h.timeStrs[0] = a(o[m].split(",")[0]), h.timeStrs[1] = a(o[Math.floor((g + m) / 2)].split(",")[0]), h.timeStrs[2] = a(o[g - 1].split(",")[0]), h.max = parseFloat(p(l, c).max), h.min = parseFloat(p(l, c).min), h.v_max = Number(d.toFixed(2)), h
  }

  function e(t, i, n) {
    "-" === i && (i = null), void 0 === this[t] ? this[t] = [{
      value: i,
      date: n
    }] : this[t].push({
      value: i,
      date: n
    })
  }

  function s(t) {
    for (var i = [], n = 0; n < t.length; n++) isNaN(t[n]) || i.push(parseFloat(t[n]));
    return i.sort(function (t, i) {
      return i - t
    }), i[0]
  }

  function r(t) {
    for (var i = [], n = 0; n < t.length; n++) isNaN(t[n]) || i.push(parseFloat(t[n]));
    return i.sort(function (t, i) {
      return t - i
    }), i[0]
  } {
    var a = n(13).transform,
      p = n(28);
    n(13).fixed
  }
  t.exports = o
}, function (t) {
  function i(t, i) {
    var n = 0,
      o = (t - i) / 2 * .05;
    return n = t + o, i -= o, {
      max: n,
      min: i
    }
  }
  t.exports = i
}, function (t, i, n) {
  var o = n(6),
    e = n(13),
    s = n(7),
    r = function () {
      function t(t) {
        this.defaultoptions = s.draw_k, this.options = {}, o(!1, this.options, this.defaultoptions, t), this.draw()
      }
      return t.prototype.draw = function () {
        var t = this.options.context,
          i = this.options.data,
          n = i.data;
        this.drawK(t, n)
      }, t.prototype.drawK = function (t, i) {
        var n = this.options.rect_unit,
          o = n.bar_w,
          s = this.options.up_color,
          r = this.options.down_color,
          a = this.options.interactive,
          p = {};
        if (this.options.markPoint && this.options.markPoint.show) {
          var h = this.options.markPoint.dateList;
          for (var l in h) p[h[l]] = h[l]
        }
        for (var c, d = 0; c = i[d]; d++) {
          var u = c.up;
          t.beginPath(), t.lineWidth = 1, u ? (t.fillStyle = s, t.strokeStyle = s) : (t.fillStyle = r, t.strokeStyle = r);
          var f = e.get_x.call(this, d + 1),
            g = e.get_y.call(this, c.open),
            m = e.get_y.call(this, c.close),
            v = e.get_y.call(this, c.highest),
            x = e.get_y.call(this, c.lowest);
          c.cross_x = f, c.cross_y = m, p[c.data_time] && a.markPoint(f, c.data_time, this.options.context.canvas, this.options.scale_count), t.moveTo(f, x), t.lineTo(f, v), t.stroke(), t.beginPath(), m >= g ? t.rect(f - o / 2, g, o, m - g) : t.rect(f - o / 2, m, o, g - m), t.stroke(), t.fill()
        }
      }, t
    }();
  t.exports = r
}, function (t, i, n) {
  var o = n(6),
    e = n(13),
    s = n(7),
    r = (n(9), function () {
      function t(t) {
        this.defaultoptions = s.drawMA, this.options = {}, o(!1, this.options, this.defaultoptions, t), this.draw()
      }

      function i(t, i, n) {
        var o = [];
        t.beginPath(), t.strokeStyle = n;
        for (var s = !1, r = 0; r < i.length; r++) {
          var a = i[r];
          if (a && a.value) {
            var p = e.get_x.call(this, r + 1),
              h = e.get_y.call(this, a.value);
            o.push(a), 0 == r ? t.moveTo(p, h) : h > this.options.c_1_height || 0 > h ? (t.moveTo(p, h), s = !0) : s ? (t.moveTo(p, h), s = !1) : t.lineTo(p, h)
          }
        }
        return t.stroke(), t.beginPath(), o
      }
      return t.prototype.draw = function () {
        var t = this.options.context,
          n = this.options.data,
          o = n.five_average,
          e = n.ten_average,
          s = n.twenty_average;
        this.options.ma_5_data = i.apply(this, [t, o, "#f4cb15"]), this.options.ma_10_data = i.apply(this, [t, e, "#ff5b10"]), this.options.ma_20_data = i.apply(this, [t, s, "#488ee6"])
      }, t
    }());
  t.exports = r
}, function (t, i, n) {
  var o = n(6),
    e = n(13),
    s = n(7),
    r = n(25),
    a = n(9),
    p = function () {
      function t(t) {
        this.defaultoptions = s.draw_v, this.options = {}, o(!1, this.options, this.defaultoptions, t), this.draw()
      }

      function i() {
        var t = this.options.context,
          i = this.options.data,
          o = i.data,
          s = 2 * this.options.unit.unitHeight,
          p = .9 * s,
          h = t.canvas.height - this.options.canvas_offset_top,
          l = h - s;
        if (!o || 0 == o.length) return t.beginPath(), t.fillStyle = "#999", t.strokeStyle = "rgba(230,230,230, 1)", t.rect(a(this.options.padding_left), a(l), t.canvas.width - this.options.padding_left - 2, s), void t.stroke();
        var c = i.v_max.toFixed(0),
          d = this.options.rect_unit,
          u = d.bar_w,
          f = this.options.up_color,
          g = this.options.down_color;
        this.options.showV && this.options.showVMark && n.apply(this, [t, c, l]), t.fillStyle = "#333333", t.strokeStyle = "#e5e5e5", t.lineWidth = this.options.dpr, t.rect(a(this.options.padding_left), a(l), t.canvas.width - this.options.padding_left - 2, s), t.moveTo(a(this.options.padding_left), a(l + s / 2)), t.lineTo(a(t.canvas.width - this.options.padding_left), a(l + s / 2)), t.stroke(), t.beginPath();
        for (var m = 0; 3 > m; m++) {
          var v = (m + 1) / 4 * (t.canvas.width - this.options.padding_left) + this.options.padding_left;
          1 == m ? (t.strokeStyle = "#e5e5e5", t.moveTo(a(v), a(l)), t.lineTo(a(v), a(h)), t.stroke()) : (t.strokeStyle = "#efefef", r(t, v, l, v, h, 5))
        }
        for (var x, m = 0; x = o[m]; m++) {
          var y = x.volume,
            w = x.up,
            _ = y / c * p,
            v = e.get_x.call(this, m + 1),
            b = h - _;
          t.beginPath(), t.moveTo(a(v), a(b)), w ? (t.fillStyle = f, t.strokeStyle = f) : (t.fillStyle = g, t.strokeStyle = g), t.rect(a(v - u / 2), a(b), u, _), t.stroke(), t.fill()
        }
      }

      function n(t, i, n) {
        t.beginPath(), t.fillStyle = "#999", t.fillText(e.format_unit(i), 5, n + 25), t.stroke()
      }
      return t.prototype.draw = function () {
        "TL" == this.options.type ? drawVTime.call(this) : i.call(this)
      }, t
    }();
  t.exports = p
}, function (t) {
  var i = {
    getCookieVal: function (t) {
      var i = document.cookie.indexOf(";", t);
      return -1 == i && (i = document.cookie.length), unescape(document.cookie.substring(t, i))
    },
    getCookie: function (t) {
      for (var n = t + "=", o = n.length, e = document.cookie.length, s = 0; e > s;) {
        var r = s + o;
        if (document.cookie.substring(s, r) == n) return i.getCookieVal(r);
        if (s = document.cookie.indexOf(" ", s) + 1, 0 == s) break
      }
      return null
    },
    setCookie: function (t, i, n, o, e, s) {
      document.cookie = t + "=" + escape(i) + (n ? "; expires=" + n : "") + (o ? "; path=" + o : "") + (e ? "; domain=" + e : "") + (s ? "; secure" : "")
    },
    deleteCookie: function (t, i, n) {
      getCookie(t) && (document.cookie = t + "=" + (i ? "; path=" + i : "") + (n ? "; domain=" + n : "") + "; expires=Thu, 01-Jan-1970 00:00:01 GMT")
    }
  };
  t.exports = i
}, function (t, i, n) {
  var o = n(34),
    e = n(7),
    s = n(35),
    r = n(6),
    a = n(20),
    p = n(22),
    h = (n(13), function () {
      function t(t) {
        this.defaultoptions = e.chartLine, this.options = {}, r(!0, this.options, e.defaulttheme, this.defaultoptions, t), this.container = document.getElementById(t.container), this.container.className = this.container.className.replace(/emcharts-container/g, "").trim(), this.container.className = this.container.className + " emcharts-container", this.onChartLoaded = void 0 == t.onChartLoaded ? function () {} : t.onChartLoaded
      }

      function i(t) {
        for (var i = -1e6, n = 0, o = [], e = 0; e < t.length; e++) o = o.concat(t[e].data);
        i = o[0], n = o[0];
        for (var e = 1; e < o.length; e++) o[e] && (i = Math.max(i, o[e]), n = Math.min(n, o[e]));
        return i = i / 1 + .05 * (i - n), n = n / 1 - .05 * (i - n), {
          max: i,
          min: n
        }
      }
      return t.prototype.init = function () {
        this.options.type = "line";
        var t = document.createElement("canvas");
        this.container.style.position = "relative";
        var i = t.getContext("2d");
        this.options.canvas = t, this.options.context = i;
        var n = this.options.dpr;
        t.width = this.options.width * n, t.height = this.options.height * n, this.options.canvas_offset_top = t.height / 18, this.options.padding_left = t.width / 6, this.options.k_v_away = t.height / 18, this.options.scale_count = 0, this.options.decimalCount = void 0 == this.options.decimalCount ? 2 : this.options.decimalCount, this.options.c_1_height = this.options.showflag ? t.height * (5 / 9) : t.height * (7 / 9), t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.border = "0", i.translate("0", this.options.canvas_offset_top), i.font = this.options.font_size * this.options.dpr + "px Arial", i.lineWidth = 1 * this.options.dpr + .5, this.container.appendChild(t)
      }, t.prototype.draw = function () {
        this.clear(), this.init(), this.options.interactive = new a(this.options);
        var t = this.options.context,
          n = this.options.series;
        this.options.data = {};
        var e = i(n);
        this.options.data.max = e.max, this.options.data.min = e.min, this.options.padding_left = t.measureText("+9000ä¸‡").width + 20, new o(this.options), new s(this.options), p.apply(this, [t, 190, 20])
      }, t.prototype.reDraw = function () {
        this.clear(), this.init(), this.draw()
      }, t.prototype.clear = function (t) {
        this.container ? this.container.innerHTML = "" : document.getElementById(this.options.container).innerHTML = "", t && t()
      }, t
    }());
  t.exports = h
}, function (t, i, n) {
  var o = n(6),
    e = n(7),
    s = n(13),
    r = function () {
      function t(t) {
        this.defaultoptions = e.draw_xy, this.options = {}, o(!1, this.options, this.defaultoptions, t), this.draw()
      }

      function i(t, i, n, o) {
        t.save(), t.fillStyle = "#b1b1b1", t.strokeStyle = "#ccc", t.textAlign = "right";
        for (var e, r = 0; e = o[r]; r++) t.beginPath(), t.moveTo(this.options.padding_left, Math.round(e.y)), t.lineTo(t.canvas.width, Math.round(e.y)), t.fillText(s.format_unit(e.num / 1, this.options.decimalCount), this.options.padding_left - 10, e.y + 10), t.stroke();
        t.restore()
      }

      function n(t, i, n) {
        t.save();
        var o = this.options.padding_left;
        t.beginPath(), t.textAlign = "center", t.fillStyle = "#b1b1b1";
        for (var e, s = t.canvas.width, r = n.length, a = 0; r > a; a++) e = n[a], (void 0 == e.show ? !0 : e.show) && (r - 1 > a ? t.fillText(e.value, a * (s - o) / (r - 1) + o, this.options.c_1_height + 40) : a * (s - o) / (r - 1) + o + t.measureText(e.value).width > t.canvas.width && t.fillText(e.value, t.canvas.width - t.measureText(e.value).width / 2, this.options.c_1_height + 40)), (void 0 == e.showline ? !0 : e.showline) && (t.strokeStyle = "#ccc", t.moveTo(a * (s - o) / (r - 1) + o, 0), t.lineTo(a * (s - o) / (r - 1) + o, this.options.c_1_height));
        t.stroke(), t.restore()
      }

      function r(t, i, n, o) {
        for (var e = (t - i) / (n - 1), s = [], r = 0; n > r; r++) s.push({
          num: i + r * e,
          x: 0,
          y: o - r / (n - 1) * o
        });
        return s
      }
      return t.prototype.draw = function () {
        var t = this.options.context,
          o = this.options.data.max,
          e = this.options.data.min,
          s = this.options.sepenum || 6,
          a = this.options.xaxis,
          p = this.options.c_1_height,
          h = r(o, e, s, p);
        i.call(this, t, o, e, h), n.apply(this, [t, p, a])
      }, t
    }();
  t.exports = r
}, function (t, i, n) {
  var o = n(6),
    e = n(7),
    s = n(13),
    r = function () {
      function t(t) {
        this.defaultoptions = e.drawLine, this.options = {}, o(!1, this.options, this.defaultoptions, t), this.draw()
      }

      function i(t, i) {
        t.save();
        var n = i.data,
          o = n.length;
        t.beginPath();
        for (var e = 0; o > e; e++) {
          var r = n[e];
          if (r) {
            var a = (t.canvas.width - this.options.padding_left) / (o - 1) * e + this.options.padding_left,
              p = s.get_y.call(this, r);
            0 == e ? t.moveTo(this.options.padding_left, p) : e == o - 1 ? t.lineTo(a, p) : t.lineTo(a, p)
          }
        }
        t.stroke(), t.restore()
      }

      function n(t, i) {
        t.save();
        for (var n, o = i.data, e = o.length, r = this.options.pointRadius, a = 0; n = o[a]; a++) {
          t.beginPath();
          var p = (t.canvas.width - this.options.padding_left) / (e - 1) * a + this.options.padding_left,
            h = s.get_y.call(this, n);
          0 == a ? (t.arc(p, h, r, 0, 2 * Math.PI, !0), t.fill()) : a == e - 1 || (t.arc(p, h, r, 0, 2 * Math.PI, !0), t.fill())
        }
        t.restore()
      }

      function r(t, i) {
        t.save();
        for (var n, o = this.options.dpr, e = t.canvas.width / 2, s = this.options.lineMarkWidth * o, r = 0, a = t.canvas.height * (7 / 9 - 1 / 18), p = 0; n = i[p]; p++) {
          t.beginPath(), t.strokeStyle = "#cadef8";
          var h = Math.floor(p / 2) * (s + 7 * o),
            l = this.options.font_size * this.options.dpr + (s - this.options.font_size * this.options.dpr) / 2;
          0 == p ? (t.fillStyle = n.color, t.rect(r + 20, a, s, s), t.fill(), t.fillStyle = "#333", t.fillText(n.name, r + s + 80, a + l)) : (p + 1) % 2 == 0 ? (t.fillStyle = n.color, t.rect(e, a + h, s, s), t.fill(), t.fillStyle = "#333", t.fillText(n.name, e + s + 60, a + h + l)) : (t.fillStyle = n.color, t.rect(r + 20, a + h, s, s), t.fill(), t.fillStyle = "#333", t.fillText(n.name, r + s + 80, a + h + l))
        }
        t.restore()
      }
      return t.prototype.draw = function () {
        var t = this.options.context;
        t.lineWidth = 1 * this.options.dpr + 1;
        for (var o, e = this.options.series, s = 0; o = e[s]; s++) t.fillStyle = void 0 == o.color ? "#333" : o.color, t.strokeStyle = void 0 == o.color ? "#333" : o.color, i.apply(this, [t, o]), o.showpoint && n.apply(this, [t, o]);
        this.options.showflag && r.apply(this, [t, e])
      }, t
    }();
  t.exports = r
}, function (t, i, n) {
  var o = n(21),
    e = n(37),
    s = n(38),
    r = n(39),
    a = n(40),
    p = n(22),
    h = function () {
      function t(t) {
        this.options = o(this.options, t), this.options.barWidth || (this.options.barWidth = .5), this.options.barWidth > 1 && (this.options.barWidth = 1), this.options.barWidth < .01 && (this.options.barWidth = .01), this.container = document.getElementById(t.container), this.container.className = this.container.className + " canvas-container"
      }
      return t.prototype.init = function () {
        this.container.style.position = "relative";
        var t = 2,
          i = document.createElement("canvas");
        try {
          var n = i.getContext("2d")
        } catch (o) {
          i = window.G_vmlCanvasManager.initElement(i);
          var n = i.getContext("2d")
        }
        i.width = t * this.options.width, i.height = t * this.options.height, i.style.width = this.options.width + "px", i.style.height = this.options.height + "px", i.style.border = "0";
        var n = i.getContext("2d");
        this.options.font_size = 12, n.font = this.options.font_size * t + "px Arial", n.lineWidth = 1 * t, this.options.dpr = t, this.options.canvas = i, this.options.context = n, this.container.appendChild(i), this.options.defaultColor = "#FF7200", this.options.defaultHoverColor = "#FF9A4A", this.options.sepeNum || (this.options.sepeNum = 4), this.options.padding = {}, this.options.padding.left = n.measureText("2.00").width * t, this.options.padding.right = 10, this.options.padding.top = 2 * this.options.font_size * t;
        var e = this.options.xaxis;
        if (this.options.angle || 0 == this.options.angle) {
          var r = e[0].value;
          this.options.padding.bottom = n.measureText(r).width * Math.sin(2 * Math.PI / 360 * this.options.angle) + 25
        } else this.options.padding.bottom = 50 * t;
        var a = (i.width - this.options.padding.left - this.options.padding.right) / this.options.series.data.length,
          h = a * this.options.barWidth;
        this.options.unit_w_len = a, this.options.unit_w_kind = h;
        var l = s(this.options.sepeNum, this.options.series.data);
        this.options.coordinate = l, p.apply(this, [this.options.context, 90 * t, 40 * t, 82 * t, 20 * t])
      }, t.prototype.draw = function (t) {
        this.init();
        var i = this;
        new e(this.options), r.call(this), this.options.canvas.addEventListener("touchstart", function (t) {
          var n = t.touches[0].clientX - i.container.getBoundingClientRect().left,
            o = t.touches[0].clientY - i.container.getBoundingClientRect().top;
          a.call(i, n, o)
        }, !1), this.options.canvas.addEventListener("click", function (t) {
          var n = t.clientX - i.container.getBoundingClientRect().left,
            o = t.clientY - i.container.getBoundingClientRect().top;
          a.call(i, n, o)
        }, !1), t && t()
      }, t.prototype.reDraw = function (t) {
        this.options = {}, this.options = o(this.options, t), this.clear(), this.draw()
      }, t.prototype.clear = function (t) {
        this.container ? this.container.innerHTML = "" : document.getElementById(this.options.container).innerHTML = "", t && t()
      }, t
    }();
  t.exports = h
}, function (t, i, n) {
  var o = n(21),
    e = n(8),
    s = function () {
      function t(t) {
        this.options = {}, this.options = o(this.options, t), this.draw()
      }

      function i(t, i) {
        var n = 1; - 1 !== i.toString().indexOf(".") && (n = i.toString().length - i.toString().indexOf(".") - 1);
        var o = Math.pow(10, n);
        return Math.round(t * o) / o
      }
      return t.prototype.init = function () {
        this.options.yLefShow = !0, this.options.yRightShow = !0, this.options.isDash = !0, this.options.xSplitShow = !1, this.options.xShowDivide = !1
      }, t.prototype.draw = function () {
        this.init(); {
          var t = this.options.padding.top,
            n = this.options.padding.left,
            o = this.options.padding.right,
            s = this.options.padding.bottom,
            r = this.options.context,
            a = this.options.canvas,
            p = this.options.xaxis,
            h = (this.options.series.data, this.options.unit_w_len),
            l = this.options.dpr,
            c = this.options.coordinate,
            d = c.max,
            u = c.min,
            f = c.stepHeight,
            g = this.options.sepeNum;
          a.height - t - s
        }
        r.save();
        var m = Math.round(a.height - s),
          v = Math.round(t),
          x = Math.round(n),
          y = Math.round(a.width - o);
        r.strokeStyle = "#C9C9C9", r.beginPath(), r.moveTo(x, m), r.lineTo(y, m), r.moveTo(x, m), r.lineTo(x, v), r.moveTo(x, v), r.lineTo(y, v), r.moveTo(y, m), r.lineTo(y, v), r.stroke();
        var w = (m - v) / g;
        r.textBaseline = "top";
        for (var _ = 0, b = p.length; b > _; _++) {
          var M = r.measureText(p[_].value).width;
          p[_].show && r.fillText(p[_].value, x + _ * h + (h - M) / 2, m + 15)
        }
        for (_ = 1, b = g; b > _; _++) {
          var A = l / 2;
          _ == d / f ? (r.beginPath(), r.moveTo(x, Math.round(w * _ + t) + A), r.lineTo(y, A + Math.round(w * _ + t)), r.stroke()) : e(r, x, Math.round(w * _ + t) + A, y, A + Math.round(w * _ + t), 3)
        }
        this.options.coordinateMaxY;
        r.textAlign = "end";
        for (_ = 0; g >= _; _++) r.beginPath(), r.textBaseline = 0 === _ ? "bottom" : _ === g ? "top" : "middle", r.fillText(i(u + _ * f, f), n - 10, w * (g - _) + t)
      }, t
    }();
  t.exports = s
}, function (t) {
  function i(t, i) {
    for (var e = [], r = 0, a = i.length; a > r; r++) 0 / 0 !== i[r] && null !== i[r] && void 0 !== i[r] && e.push(i[r]);
    e.length <= 1 && e.push(0);
    for (var p = e[0], h = e[0], a = e.length, l = {}, c = 1, r = a - 1; r >= 0; r--) p = Math.max(p, e[r]), h = Math.min(h, e[r]);
    if (0 >= p && (p = Math.abs(h), h = Math.abs(p), c = -1), isNaN(p) || isNaN(h)) return {
      max: 0,
      min: 0,
      stepHeight: 0
    };
    if (p === h && 0 === p) return {
      max: 0,
      min: 0,
      stepHeight: 0
    };
    var d = o(t, p, h),
      u = s(d),
      f = d * Math.pow(10, Math.abs(u) + 1),
      g = Math.floor(p / d + 1);
    return g = h >= 0 ? t : t - Math.floor(Math.abs(h) / d + 1), 1 === c ? (l.max = 1 * n(g * f, -Math.abs(u) - 1), l.min = 1 * -n((t - g) * f, -Math.abs(u) - 1)) : (l.min = 1 * n(g * f, -Math.abs(u) - 1) * c, l.max = 1 * -n((t - g) * f, -Math.abs(u) - 1) * c), l.stepHeight = d, l
  }

  function n(t, i) {
    var n = t;
    if (t.toString().indexOf("e+") > 0) {
      for (var o = t.toString().split("e+"), e = o[0].split("."), s = parseInt(o[1]), r = e[1] ? e[1].length : 0, a = e[0] + (e[1] ? e[1] : ""), p = 0, h = s - r; h > p; p++) a += "0";
      n = a
    }
    var l = t + "";
    l = n + "";
    var h = l.length,
      c = l.split(""),
      d = l.indexOf("."); - 1 === d && (d = h);
    var u = d + i;
    if (c.splice(d, 1), u >= h)
      for (var p = 0; u - h >= p; p++) c.push("0");
    else if (0 >= u) {
      for (var p = 0; p >= u; p--) c.unshift("0");
      u = 1
    }
    return d > u ? c.splice(u, 0, ".") : c.splice(u, 0, "."), c.join("")
  }

  function o(t, i, n) {
    var o = t,
      s = i;
    if (0 > n && i > 0 && (s = i + Math.abs(n), o = t - 1), 0 === s && 0 === t) return 0;
    var r = s / o;
    return e(r)
  }

  function e(t) {
    var i = s(t),
      n = t + "";
    0 > i && (n = t.toFixed(Math.abs(i) + 2));
    var o, e, n = n.replace(/\./g, "");
    return o = (n + "").match(/[1-9]/g), o = o[0] || 0, e = n.indexOf(o + "") + 1 > n.length ? "0" : n.charAt(n.indexOf(o + "") + 1), 3 >= e ? e = "5" : (e = 0, o = 1 * o + 1, 10 === o && (o = "1", e = "0", i += 1)), 1 * ((o + "" + e) * Math.pow(10, i - 1)).toFixed(Math.abs(i) + 2)
  }

  function s(t) {
    var i = (t + "").split(".");
    return 0 == i[0] && i[1] ? -(i[1].match(/^[0]*/g) + "").length - 1 : i[0].length - 1
  }
  t.exports = i
}, function (t) {
  function i() {
    var t = this.options.series,
      i = this.options.unit_w_len,
      n = this.options.unit_w_kind,
      o = this.options.coordinate,
      e = o.max,
      s = o.min,
      r = o.stepHeight,
      a = this.options.sepeNum,
      p = this.options.canvas,
      h = this.options.context,
      l = this.options.padding.top,
      c = this.options.padding.left,
      d = (this.options.padding.right, this.options.padding.bottom),
      u = p.height - d - l,
      f = l + e / r * u / a;
    h.beginPath(), h.save(), h.lineWidth = this.options.dpr, h.fillStyle = this.options.series.color;
    for (var g = 0, m = t.data.length; m > g; g++) {
      var v = n,
        x = u * (t.data[g] / (e - s)),
        y = g * i + c + (i - n) / 2,
        w = f - x;
      h.fillRect(Math.round(y), Math.round(w), Math.round(v), Math.round(x))
    }
    h.restore()
  }
  t.exports = i
}, function (t, i, n) {
  function o(t, i) {
    function n(t, i) {
      h.fillStyle = i;
      var n = k * (m.data[t] / (_ - b)),
        o = t * v + (v - x) / 2 + u,
        e = n > 0 ? T - n : T,
        s = x;
      n = Math.abs(n), h.clearRect(Math.round(o), Math.round(e), Math.round(s), Math.round(n)), h.fillRect(Math.round(o), Math.round(e), Math.round(s), Math.round(n))
    }
    var o, s, r, a, p = this.options.dpr,
      h = this.options.context,
      l = t * p,
      c = i * p,
      d = this.options.padding.top,
      u = this.options.padding.left,
      f = this.options.padding.right,
      g = this.options.padding.bottom,
      m = this.options.series,
      v = this.options.unit_w_len,
      x = this.options.unit_w_kind,
      y = this.options.canvas,
      w = this.options.coordinate,
      _ = w.max,
      b = w.min,
      M = w.stepHeight,
      A = this.options.sepeNum,
      k = y.height - d - g,
      T = d + _ / M * k / A,
      C = Math.floor((l - u) / v),
      E = !1;
    if (0 > C || C >= m.data.length ? E = !1 : (o = k * (m.data[C] / (_ - b)), s = x, r = C * v + (v - x) / 2 + u, a = o > 0 ? T - o : T, l >= r && r + s >= l && c >= a && c <= a + Math.abs(o) && (E = !0)), E)
      if (void 0 !== this.options.preColume && n(this.options.preColume, m.color), this.options.preColume = C, n(C, m.hoverColor), this.options.tipPanel) {
        var S, L, P = this.options.tipPanel,
          D = (T - o) / p,
          N = r / p + x / p / 2,
          B = o > 0 ? x / p / 2 - P.clientHeight : -x / p / 2;
        P.children[0].innerHTML = this.options.xaxis[C].value, P.children[1].innerHTML = (void 0 === m.name ? "" : m.name + ":") + m.data[C] + (void 0 === m.suffix ? "" : m.suffix), L = d > D + B ? d / p + 10 : D + B > y.height - g ? g / p - P.clientHeight - 10 : D + B, S = N * p > (y.width - f) / 2 ? r / p + x / p / 2 - P.clientWidth : r / p + x / p / 2, "hidden" === this.options.tipPanel.style.visibility ? (P.style.top = L + "px", P.style.left = S + "px", this.options.tipPanel.style.visibility = "visible") : e.fast2slow(P, S, L)
      } else {
        var P = document.createElement("div"),
          W = document.createElement("strong"),
          F = document.createElement("div");
        W.innerHTML = this.options.xaxis[C].value, F.innerHTML = (void 0 === m.name ? "" : m.name + ":") + m.data[C] + (void 0 === m.suffix ? "" : m.suffix), P.appendChild(W), P.appendChild(F), this.container.appendChild(P), this.options.tipPanel = P, P.style.position = "absolute", P.style.mineHeight = "30px", P.style.paddingRight = "10px", P.style.opacity = "0.5", P.style.backgroundColor = "#4C4C4C", P.style.borderRadius = "5px", P.style.padding = "5px", P.style.color = "white", W.style.whiteSpace = "nowrap", F.style.margin = "0px";
        var D = (T - o) / p,
          B = o > 0 ? x / p / 2 - P.clientHeight : -x / p / 2,
          N = r / p + x / p / 2;
        P.style.top = d > D + B ? d / p + 10 + "px" : D + B > y.height - g ? g / p - P.clientHeight - 10 + "px" : D + B + "px", P.style.left = N * p > (y.width - f) / 2 ? r / p + x / p / 2 - P.clientWidth + "px" : r / p + x / p / 2 + "px"
      }
    else void 0 !== this.options.preColume && (tempCurrent = this.options.preColume, n(tempCurrent, m.color)), this.options.tipPanel && (this.options.tipPanel.style.visibility = "hidden")
  }
  var e = n(41);
  t.exports = o
}, function (t) {
  var i = {
    fast2slow: function (t, i, n) {
      var o = parseInt(t.style.left),
        e = parseInt(t.style.top),
        s = (n - e) / 5,
        r = (i - o) / 5;
      if (0 === r && 0 === s) return void clearTimeout(t.timer);
      if (0 === r ? s = Math.abs(s) <= 1 ? 1 * s / Math.abs(s) : s : 0 === s ? r = Math.abs(r) <= 1 ? 1 * r / Math.abs(r) : r : (s = Math.abs(s) <= 1 ? 1 * s / Math.abs(s) : s, r = Math.abs(r) <= 1 ? 1 * r / Math.abs(r) : r), Math.abs(i - (o + r)) <= 1 && Math.abs(n - (e + s)) <= 1) return void clearTimeout(t.timer);
      Math.abs(i - o) <= 1 && (r = 0), Math.abs(n - e) <= 1 && (s = 0), t.style.left = o + r + "px", t.style.top = e + s + "px";
      var a = this;
      t.timer = setTimeout(function () {
        a.fast2slow(t, i, n)
      }, 10)
    }
  };
  t.exports = i
}, function (t, i, n) {
  var o = n(43),
    e = n(7),
    s = n(44),
    r = n(21),
    a = n(22),
    p = n(13),
    h = n(38),
    l = function () {
      function t(t) {
        this.defaultoptions = e.defaulttheme, this.options = r(this.defaultoptions, t), this.container = document.getElementById(t.container), this.container.className = this.container.className + " emcharts-container", this.onChartLoaded = void 0 == t.onChartLoaded ? function () {} : t.onChartLoaded
      }

      function i(t, i) {
        var n = t / i,
          o = n * (1 - this.options.groupSpacing);
        return {
          rect_w: n,
          bar_w: o
        }
      }

      function n(t, i) {
        var n = t / i,
          o = n * (1 - this.options.groupUnitSpacing);
        return {
          rect_w: n,
          bar_w: o
        }
      }

      function l(t) {
        var i = this.options.data.max - this.options.data.min;
        if (t >= 0 && this.options.data.min < 0) {
          var n = this.options.c_1_height * this.options.data.max / i;
          return n - this.options.c_1_height * t / i
        }
        if (t >= 0 && this.options.data.min >= 0) {
          var n = this.options.c_1_height;
          return n - this.options.c_1_height * (t - this.options.data.min) / i
        }
        if (0 > t && this.options.data.max >= 0) {
          var o = this.options.c_1_height * this.options.data.max / i;
          return this.options.c_1_height * Math.abs(t) / i + o
        }
        return 0 > t && this.options.data.max < 0 ? this.options.c_1_height * Math.abs(t) / i + 0 : void 0
      }

      function c(t, i) {
        var n = this.options.group,
          o = this.options.groupUnit,
          e = this.options.padding_left,
          s = this.options.group.rect_w - this.options.group.bar_w,
          r = this.options.groupUnit.rect_w - this.options.groupUnit.bar_w;
        return n.rect_w * t + e + o.rect_w * i + s / 2 + r / 2
      }

      function d(t) {
        var i = t * this.options.dpr,
          n = {},
          o = this.options.padding_left,
          e = this.options.group,
          s = this.options.groupUnit,
          r = (this.options.canvas, this.options.series),
          a = Math.floor((i - o) / e.rect_w);
        0 > a && (a = 0);
        var p = Math.floor((i - o - a * e.rect_w - (e.rect_w - e.bar_w) / 2) / s.rect_w);
        return 0 > p ? p = 0 : p > 3 && (p = 3), n.midddleLine = c.call(this, a, p) + s.bar_w / 2, n.tipsX = this.options.padding_left + e.rect_w * a, n.tipsY = l.call(this, r[a].data[0]) + this.options.canvas_offset_top, n.midddleLineHeight = n.tipsY, n.content = {}, n.content.series = this.options.series[a].data, n.content.colors = this.options.xaxis[a], n.content.names = this.options.xaxis[a].names, n.content.suffixs = this.options.xaxis[a].suffixs, n.arr = a + ":" + p, n
      }

      function u(t) {
        for (var i = t.length, n = [], o = 0; i > o; o++) n = n.concat(t[o].data);
        var e = h(this.options.sepeNum, n),
          s = this.options.context,
          r = s.measureText(p.format_unit(e.stepHeight)).width - s.measureText(p.format_unit(parseInt(e.stepHeight))).width,
          a = s.measureText(p.format_unit(parseInt(e.max))).width,
          l = s.measureText(p.format_unit(parseInt(e.min))).width,
          c = a > l ? a : l,
          d = c + r;
        return {
          max: e.max,
          min: e.min,
          step: e.stepHeight,
          maxPaddingLeftWidth: d
        }
      }
      return t.prototype.init = function () {
        this.options.type = "group-bar";
        var t = document.createElement("canvas");
        this.container.style.position = "relative";
        try {
          var i = t.getContext("2d")
        } catch (n) {
          t = window.G_vmlCanvasManager.initElement(t);
          var i = t.getContext("2d")
        }
        this.options.canvas = t, this.options.context = i, this.options.sepeNum = void 0 == this.options.sepeNum ? 4 : this.options.sepeNum, this.options.sepeNum < 2 && (this.options.sepeNum = 2), this.container.appendChild(t);
        var o = this.options.dpr = 1;
        t.width = this.options.width * o, t.height = this.options.height * o, this.options.canvas_offset_top = 15 * o, this.options.c_1_height = t.height - 50 * o, t.style.width = this.options.width + "px", t.style.height = this.options.height + "px", t.style.border = "0";
        var e = this.options.series,
          t = this.options.canvas,
          s = u.apply(this, [e]);
        s.min < 0 && (this.options.isLessZero = !0), this.options.data = {}, this.options.data.max = s.max, this.options.data.min = s.min, this.options.data.step = s.step, this.options.padding_left = s.maxPaddingLeftWidth * o + 30, this.options.drawWidth = t.width - 10, i.translate("0", this.options.canvas_offset_top), i.font = this.options.font_size * this.options.dpr + "px Arial", i.lineWidth = 1 * this.options.dpr, this.options.groupSpacing = void 0 == this.options.groupSpacing ? "0.2" : this.options.groupSpacing, this.options.groupUnitSpacing = void 0 == this.options.groupUnitSpacing ? "0.2" : this.options.groupUnitSpacing, a.apply(this, [this.options.context, this.options.padding_left + 95 * o, 10 * o, 82 * o, 20 * o])
      }, t.prototype.draw = function () {
        this.clear(), this.init(), this.options.group = i.call(this, this.options.drawWidth - this.options.padding_left, this.options.series.length), this.options.groupUnit = n.call(this, this.options.group.bar_w, this.options.series[0].data.length), new o(this.options), new s(this.options), this.addInteractive()
      }, t.prototype.addInteractive = function () {
        var t, i = this.options.canvas,
          n = this.options.group,
          o = this,
          e = document.createElement("div"),
          s = document.createElement("div"),
          r = {},
          a = "x:x",
          h = this.options.dpr,
          l = this.options.padding_left,
          c = this.options.canvas_offset_top,
          u = this.options.c_1_height;
        e.className = "web-tips", s.className = "group-bar-mark", s.style.width = n.rect_w / h + "px", s.style.backgroundColor = "#333", o.container.appendChild(e), o.container.appendChild(s), p.addEvent.call(o, i, "mousemove", function (f) {
          var g, m;
          if (f.layerX ? (g = f.layerX, m = f.layerY) : f.x && (g = f.x, m = f.y), g >= l / h && g * h < o.options.drawWidth && m >= c / h && (c + u) / h > m ? (e.style.display = "inline-block", s.style.display = "inline-block") : (e.style.display = "none", s.style.display = "none"), g * h < o.options.drawWidth && (t = d.call(o, g)), a !== t.arr) {
            r.midddleLine = p.canvasToWindow.call(o, i, t.midddleLine, 0), r.tips = p.canvasToWindow.call(o, i, t.tipsX, t.tipsY);
            var v = t.content.series,
              x = t.content.colors,
              y = t.content.names,
              w = t.content.suffixs;
            e.innerHTML = "";
            var _ = document.createElement("div");
            _.innerHTML = x.value, e.appendChild(_);
            for (var b, M = 0; b = v[M]; M++) {
              var A = document.createElement("span");
              A.className = "bar-color-span", A.style.backgroundColor = x.colors[M];
              var k = document.createElement("span");
              k.className = "bar-value-span", k.innerHTML = (void 0 === y ? "" : y[M]) + b + (void 0 === w ? "" : w[M]);
              var T = document.createElement("div");
              T.className = "", T.appendChild(A), T.appendChild(k), e.appendChild(T)
            }
            var C = f.offsetX || f.clientX - o.container.getBoundingClientRect().left,
              E = f.offsetY || f.clientY - o.container.getBoundingClientRect().top;
            e.style.left = C > i.width / 2 / h ? t.tipsX / h - e.clientWidth + "px" : (t.tipsX + o.options.group.rect_w) / h + "px", e.style.top = t.tipsY / h - e.clientHeight / 2 + "px";
            var S = p.windowToCanvas.apply(o, [i, C, E]),
              L = S.x.toFixed(0);
            if (L - o.options.padding_left > 0) {
              var P = Math.floor((L - o.options.padding_left) / n.rect_w);
              s.style.height = u / o.options.dpr + "px", s.style.left = (P * n.rect_w + o.options.padding_left) / h + "px", s.style.top = c / h + "px"
            }
            a = t.arr
          }
        })
      }, t.prototype.reDraw = function () {
        this.clear(), this.init(), this.draw()
      }, t.prototype.clear = function (t) {
        this.container ? this.container.innerHTML = "" : document.getElementById(this.options.container).innerHTML = "", t && t()
      }, t
    }();
  t.exports = l
}, function (t, i, n) {
  var o = n(21),
    e = n(7),
    s = (n(13), n(8)),
    r = n(9),
    a = function () {
      function t(t) {
        this.defaultoptions = e.draw_xy, this.options = o(this.defaultoptions, t), this.draw()
      }

      function i(t, i, n, o) {
        function e(t) {
          return t && (t = parseFloat(t.toFixed(a.options.maxDot))), t
        }
        t.save();
        var a = this,
          p = o.length;
        t.fillStyle = "#979797", t.textAlign = "right";
        for (var h, l = 0; h = o[l]; l++) {
          t.beginPath();
          var c = !0;
          this.options.data.min < 0 ? this.options.data.min + this.options.data.step * l < 0 ? t.fillText(this.options.data.min + e(this.options.data.step * l), this.options.padding_left - 10, h.y + 5) : this.options.data.min + this.options.data.step * l == 0 ? (t.fillText(0, this.options.padding_left - 10, h.y + 5), c = !1, t.strokeStyle = "#c9c9c9", t.moveTo(r(this.options.padding_left), r(h.y)), t.lineTo(r(this.options.drawWidth), r(h.y)), t.stroke()) : t.fillText(this.options.data.min + e(this.options.data.step * l), this.options.padding_left - 10, h.y + 5) : t.fillText(this.options.data.min + e(this.options.data.step * l), this.options.padding_left - 10, h.y + 5), 0 != l && l != p - 1 && c && (t.save(), t.beginPath(), t.strokeStyle = "#e6e6e6", s(t, this.options.padding_left, Math.round(h.y), this.options.drawWidth, Math.round(h.y), 3), t.restore())
        }
        t.restore()
      }

      function n(t, i, n) {
        t.save();
        var o = this.options.padding_left,
          e = this.options.dpr;
        t.beginPath(), t.strokeStyle = "#c9c9c9", t.rect(r(o), .5, Math.round(this.options.drawWidth - o), Math.round(this.options.c_1_height)), t.stroke(), t.textAlign = "left", t.fillStyle = "#979797";
        for (var s, a = this.options.drawWidth, p = n.length, h = 0; p > h; h++) {
          t.beginPath(), s = n[h].value; {
            var l = h * (a - o) / p + o;
            void 0 == n[h].show ? !0 : !1
          }
          if ((void 0 == n[h].show || n[h].show) && t.fillText(s, l + ((a - o) / p - t.measureText(s).width) / 2, this.options.c_1_height + 20 * e), h == p - 1) {
            t.moveTo(r(l), r(this.options.c_1_height)), t.lineTo(r(l), r(this.options.c_1_height + 5 * e));
            var l = (h + 1) * (a - o) / p + o;
            t.moveTo(r(l), r(this.options.c_1_height)), t.lineTo(r(l), r(this.options.c_1_height + 5 * e))
          } else t.moveTo(r(l), r(this.options.c_1_height)), t.lineTo(r(l), r(this.options.c_1_height + 5 * e));
          t.stroke()
        }
        t.stroke(), t.restore()
      }

      function a(t, i, n, o) {
        for (var e = this.options.data.step, s = [], r = 0; n >= r; r++) s.push({
          num: i + r * e,
          x: 0,
          y: o - r / n * o
        });
        return s
      }
      return t.prototype.draw = function () {
        var t = this.options.context,
          o = this.options.data.max,
          e = this.options.data.min,
          s = this.options.sepeNum,
          r = this.options.xaxis,
          p = this.options.c_1_height,
          h = a.apply(this, [o, e, s, p]);
        i.call(this, t, o, e, h), n.apply(this, [t, p, r])
      }, t
    }();
  t.exports = a
}, function (t, i, n) {
  var o = n(21),
    e = n(7),
    s = function () {
      function t(t) {
        this.defaultoptions = e.drawLine, this.options = o(this.defaultoptions, t), this.draw()
      }

      function i(t) {
        var i = this.options.data.max - this.options.data.min;
        if (t >= 0 && this.options.data.min < 0) {
          var n = this.options.c_1_height * this.options.data.max / i;
          return n - this.options.c_1_height * t / i
        }
        if (t >= 0 && this.options.data.min >= 0) {
          var n = this.options.c_1_height;
          return n - this.options.c_1_height * (t - this.options.data.min) / i
        }
        if (0 > t && this.options.data.max >= 0) {
          var o = this.options.c_1_height * this.options.data.max / i;
          return this.options.c_1_height * Math.abs(t) / i + o
        }
        return 0 > t && this.options.data.max < 0 ? this.options.c_1_height * Math.abs(t) / i + 0 : void 0
      }

      function n(t, i) {
        var n = this.options.group,
          o = this.options.groupUnit,
          e = this.options.padding_left,
          s = this.options.group.rect_w - this.options.group.bar_w,
          r = this.options.groupUnit.rect_w - this.options.groupUnit.bar_w;
        return n.rect_w * t + e + o.rect_w * i + s / 2 + r / 2
      }
      return t.prototype.draw = function () {
        var t = this.options.context;
        t.lineWidth = 1 * this.options.dpr + 1;
        for (var o, e = this.options.series, s = this.options.xaxis, r = 0; o = e[r]; r++)
          for (var a = o.data, p = a.length, h = 0; p > h; h++) {
            var l = a[h];
            t.beginPath(), t.fillStyle = void 0 == s[r].colors[h] ? "#333" : s[r].colors[h], t.strokeStyle = void 0 == s[r].colors[h] ? "#333" : s[r].colors[h];
            var c = n.apply(this, [r, h]),
              d = i.call(this, l);
            if (d >= 0 && this.options.data.min < 0) {
              var u = this.options.c_1_height * this.options.data.max / (this.options.data.max - this.options.data.min);
              t.rect(c, d, this.options.groupUnit.bar_w, u - d)
            } else if (d >= 0 && this.options.data.min >= 0) {
              var u = this.options.c_1_height;
              t.rect(c, d, this.options.groupUnit.bar_w, u - d)
            } else if (0 > d && this.options.data.max >= 0) {
              var u = this.options.c_1_height * this.options.data.max / (this.options.data.max - this.options.data.min);
              t.rect(c, u, this.options.groupUnit.bar_w, d)
            } else if (0 > d && this.options.data.max < 0) {
              var u = 0;
              t.rect(c, u, this.options.groupUnit.bar_w, d)
            }
            t.fill()
          }
      }, t
    }();
  t.exports = s
}, , , , , , , , , , function (t, i, n) {
  var o = n(55),
    e = n(7),
    s = n(57),
    r = n(21),
    a = n(20),
    p = n(22),
    h = n(13),
    l = n(38),
    c = function () {
      function t(t) {
        this.options = {}, this.options = r(e.defaulttheme, t), this.container = document.getElementById(t.container), this.container.className = this.container.className.replace(/emcharts-container/g, "").trim(), this.container.className = this.container.className + " emcharts-container", this.onChartLoaded = void 0 == t.onChartLoaded ? function () {} : t.onChartLoaded
      }

      function i(t) {
        for (var i = t.length, n = [], o = 0; i > o; o++) n = n.concat(t[o].data);
        n.sort(function (t, i) {
          return 1 * t - 1 * i
        });
        var e = 1 * n[0],
          s = 1 * n[n.length - 1],
          r = (s + e) / 2;
        s - e > 1 && r - Math.floor(r) > 0 && (e = n[0] - (r - Math.floor(r)), r = Math.floor(r));
        var a = {};
        if (s * e > 0 && e !== s && (s - e) / Math.abs(s) <= .5)
          if (a = l(this.options.sepeNum, [s - r, e - r]), (a.max + r) * (a.min + r) < 0) {
            var p = Math.min(Math.abs(a.max + r), Math.abs(a.min + r));
            a.max = s >= 0 ? a.max + r + p : 0, a.min = s >= 0 ? 0 : a.min + r - p
          } else a.max += r, a.min += r;
        else a = l(this.options.sepeNum, n);
        var c = this.options.context;
        if (a.stepHeight >= 1e4) var d = c.measureText(h.format_unit(a.stepHeight)).width - c.measureText(h.format_unit(parseInt(a.stepHeight))).width;
        else var d = c.measureText(a.stepHeight).width - c.measureText(parseInt(a.stepHeight)).width;
        var u = c.measureText(h.format_unit(parseInt(a.max))).width,
          f = c.measureText(h.format_unit(parseInt(a.min))).width,
          g = u > f ? u : f,
          m = g + d;
        return 0 == a.max && 0 == a.min && (a.max = Math.ceil(this.options.sepeNum / 2), a.min = -Math.floor(this.options.sepeNum / 2), a.stepHeight = 1), {
          max: a.max,
          min: a.min,
          step: a.stepHeight,
          maxPaddingLeftWidth: m
        }
      }
      return t.prototype.init = function () {
        this.options.type = "line";
        var t = !0,
          i = document.createElement("div");
        i.className = "event-div", this.container.appendChild(i), this.eventDiv = i;
        var n = document.createElement("canvas");
        this.container.style.position = "relative", this.container.appendChild(n);
        try {
          var o = n.getContext("2d")
        } catch (e) {
          n = window.G_vmlCanvasManager.initElement(n);
          var o = n.getContext("2d")
        }
        this.options.canvas = n, this.options.context = o;
        var s = this.options.dpr = void 0 == this.options.dpr ? 1 : this.options.dpr;
        n.width = this.options.width * s, n.height = this.options.height * s, this.options.canvas_offset_top = 15 * s, this.options.scale_count = 0, this.options.decimalCount = void 0 == this.options.decimalCount ? 2 : this.options.decimalCount;
        var r = this.options.xaxis;
        if (this.options.angle && 0 != this.options.angle) {
          var a = o.measureText(r[0].value).width * Math.sin(2 * Math.PI * (this.options.angle / 360)) + 30;
          this.options.angle_height = a, this.options.c_1_height = this.options.canvas.height - this.options.canvas_offset_top * s - a * s
        } else this.options.c_1_height = n.height - this.options.canvas_offset_top * s - 40 * s;
        void 0 === this.options.showname && (this.options.showname = !0), this.options.sepeNum = void 0 == this.options.sepeNum ? 4 : this.options.sepeNum, this.options.sepeNum < 2 && (this.options.sepeNum = 2), n.style.width = this.options.width + "px", n.style.height = this.options.height + "px", n.style.border = "0";
        var p = !1;
        p ? t && o.translate("0", this.options.canvas_offset_top) : o.translate("0", this.options.canvas_offset_top);
        var h = "",
          l = "",
          c = "";
        this.options.font ? (c = this.options.font.fontFamily ? this.options.font.fontFamily : "Arial", l = this.options.font.fontSize ? this.options.font.fontSize * this.options.dpr : 12 * this.options.dpr, h = l + "px " + c) : h = 12 * this.options.dpr + "px Arial", o.font = h, o.lineWidth = 1 * this.options.dpr, this.options.padding = {}, this.options.padding.left = 0, this.options.padding.right = 0, this.options.padding.top = 0, this.options.padding.bottom = 0, this.options.pointRadius = void 0 == this.options.pointRadius ? 5 : this.options.pointRadius
      }, t.prototype.draw = function () {
        this.clear(), this.init(), this.options.interactive = new a(this.options);
        var t = this.options.context,
          n = (this.options.dpr, this.options.series);
        this.options.data = {};
        var e = i.call(this, n);
        this.options.data.max = e.max, this.options.data.min = e.min, this.options.data.step = e.step, this.options.padding_left = Math.round(e.maxPaddingLeftWidth + 10);
        var r = this.options.xaxis,
          h = t.measureText(r[0].value).width / 2 + 10,
          l = t.measureText(r[r.length - 1].value).width + 10;
        if (this.options.padding_left < h && (this.options.padding_left = h), this.options.series2 && 0 !== this.options.series2.length) {
          var c = this.options.series2,
            d = i.call(this, c);
          this.options.data.max2 = d.max, this.options.data.min2 = d.min, this.options.data.step2 = d.step, this.options.padding.right = Math.round(e.maxPaddingLeftWidth + 20)
        }
        this.options.angle && 0 != this.options.angle && (this.options.padding.right = t.measureText(this.options.xaxis[0].value).width * Math.cos(2 * Math.PI * (this.options.angle / 360)) + 10), this.options.padding.right < l && (this.options.padding.right = l), this.options.series2 && 0 !== this.options.series2.length ? (this.options.drawWidth = Math.round(t.canvas.width - this.options.padding.right), p.apply(this, [t, 100 + this.options.padding.right, 10, 82, 20])) : (this.options.drawWidth = Math.round(t.canvas.width - this.options.padding.right), p.apply(this, [t, 100 + this.options.padding.right, 10, 82, 20])), new o(this.options), new s(this.options), this.addInteractive()
      }, t.prototype.addInteractive = function () {
        function t(t, g) {
          var m = t * p - r,
            v = g * p - a,
            x = 0,
            y = [];
          x = i / 2 > m % i ? Math.floor(m / i) : Math.ceil(m / i), 0 > x && (x = 0), x > o.length - 1 && (x = o.length - 1);
          for (var w = 0, _ = e.length; _ > w; w++) y.push({
            color: e[w].color,
            data: (void 0 === e[w].data[x] || null === e[w].data[x] ? "" : e[w].data[x]) + (e[w].suffix || ""),
            name: e[w].name,
            y: void 0 === e[w].data[x] ? a + h.get_y.call(l, 0) : a + h.get_y.call(l, e[w].data[x]),
            suffix: e[w].suffix || ""
          });
          if (l.options.series2)
            for (w = 0, _ = s.length; _ > w; w++) y.push({
              color: s[w].color,
              data: (void 0 === s[w].data[x] || null === s[w].data[x] ? "" : s[w].data[x]) + (s[w].suffix || ""),
              name: s[w].name,
              y: void 0 === s[w].data[x] ? a + u / 2 : a + (u - u * (s[w].data[x] - d) / (c - d)),
              suffix: s[w].suffix || ""
            });
          y.sort(function (t, i) {
            return t.y - i.y
          });
          var b = 0,
            M = !1;
          if (b = 1 == o.length ? x * i / p + i / p * .5 + r / p : x * i / p + r / p, l.options.interOption) {
            var A = l.options.interOption.tips,
              k = A.children;
            k[0].innerHTML = o[x].value;
            for (var T = 0, _ = y.length; _ > T; T++) y[T].data === y[T].suffix ? k[T + 1].style.display = "none" : (M = !0, k[T + 1].style.display = "block", k[T + 1].children[0].style.backgroundColor = y[T].color, k[T + 1].children[1].innerHTML = (l.options.showname ? y[T].name : "") + " " + y[T].data);
            M ? A.style.display = "block" : (A.style.display = "none", A.style.left = "-10000px"), A.style.left = x * i / p + r / p >= n.width / p / 2 ? b - r / 2 - A.clientWidth + "px" : b + r / 2 + "px", A.style.top = (y[0].y + y[y.length - 1].y) / 2 / p - 50 + "px";
            var C = l.options.interOption.yLine;
            C.style.left = b + "px";
            for (var E = l.options.interOption.circles, S = 0, L = y.length; L > S; S++) y[S].data === y[S].suffix ? E[S].style.display = "none" : (E[S].style.display = "block", E[S].style.top = y[S].y / p - f + "px", E[S].style.left = b - f + "px", E[S].style.borderColor = y[S].color);
            M && (l.options.interOption.tips.style.display = "block", C.style.display = "block")
          } else {
            l.options.interOption = {};
            var A = document.createElement("div");
            A.className = "chart_line_tips", l.container.appendChild(A), A.style.top = (y[0].y + y[y.length - 1].y) / 2 / p + "px";
            var P = document.createElement("div");
            P.className = "chart_line_tips_title", P.innerHTML = o[x].value, A.appendChild(P);
            var C = document.createElement("div");
            C.className = "chart_line_yline", C.style.left = b + "px", C.style.top = a / p + "px", C.style.height = u / p + "px", l.container.appendChild(C);
            var E = [];
            for (w = 0, _ = y.length; _ > w; w++) {
              var D = document.createElement("div");
              D.className = "chart_line_tips_line";
              var N = document.createElement("span");
              N.className = "chart_line_tips_color", N.style.backgroundColor = y[w].color, D.appendChild(N);
              var B = document.createElement("span");
              B.innerHTML = (l.options.showname ? y[w].name : "") + y[w].data, D.appendChild(B), A.appendChild(D);
              var W = document.createElement("div");
              W.className = "chart_line_cir", W.style.width = 2 * f + "px", W.style.height = 2 * f + "px", W.style.borderRadius = 2 * f + "px", W.style.top = y[w].y / p - f + "px", W.style.left = b - f + "px", W.style.borderColor = y[w].color, void 0 === y[w] || y[w].data === y[w].suffix ? (W.style.display = "none", D.style.display = "none") : M = !0, l.container.appendChild(W), E.push(W)
            }
            A.style.left = x * i / p + r / p > n.width / 2 ? b - r / 2 - A.clientWidth + "px" : b + r / 2 + "px", l.options.interOption.tips = A, l.options.interOption.yLine = C, l.options.interOption.circles = E
          }
          var F = this.options.series2 ? r : 10;
          if (m += 1, m >= 0 && m < n.width - r - F + 3 && v >= 0 && u >= v && M) {
            l.options.interOption.tips.style.display = "block";
            for (var S = 0, L = y.length; L > S; S++) y[S].data === y[S].suffix || (E[S].style.display = "block");
            C.style.display = "block"
          } else {
            l.options.interOption.tips.style.display = "none", l.options.interOption.tips.style.left = "-10000px";
            for (var S = 0, L = E.length; L > S; S++) E[S].style.display = "none";
            C.style.display = "none"
          }
        }
        var i, n = this.options.canvas,
          o = this.options.xaxis,
          e = this.options.series,
          s = this.options.series2,
          r = (this.options.context, this.options.padding_left),
          a = this.options.canvas_offset_top,
          p = this.options.dpr;
        i = 1 === o.length ? this.options.drawWidth - r : (this.options.drawWidth - r) / (o.length - 1);
        var l = this,
          c = (this.options.data.max, this.options.data.min, this.options.data.max2),
          d = this.options.data.min2,
          u = this.options.c_1_height,
          f = this.options.pointRadius / p;
        h.addEvent(l.eventDiv, "touchmove", function (i) {
          var n = i.changedTouches[0],
            o = n.offsetX || n.clientX - l.container.getBoundingClientRect().left,
            e = n.offsetY || n.clientY - l.container.getBoundingClientRect().top;
          try {
            i.preventDefault()
          } catch (s) {}
          t.call(l, o, e)
        }), h.addEvent(l.eventDiv, "mousemove", function (i) {
          var n = i.clientX - l.container.getBoundingClientRect().left,
            o = i.clientY - l.container.getBoundingClientRect().top;
          try {
            i.preventDefault()
          } catch (e) {}
          t.call(l, n, o)
        }), h.addEvent(l.eventDiv, "touchend", function (t) {
          if (l.options.interOption) {
            var i = l.options.interOption.circles;
            l.options.interOption.tips.style.display = "none";
            for (var n = 0, o = i.length; o > n; n++) i[n].style.display = "none";
            l.options.interOption.yLine.style.display = "none"
          }
          try {
            t.preventDefault()
          } catch (e) {}
        }), h.addEvent(l.eventDiv, "mouseleave", function (t) {
          if (l.options.interOption) {
            var i = l.options.interOption.circles;
            l.options.interOption.tips.style.display = "none";
            for (var n = 0, o = i.length; o > n; n++) i[n].style.display = "none";
            l.options.interOption.yLine.style.display = "none"
          }
          try {
            t.preventDefault()
          } catch (e) {}
        })
      }, t.prototype.reDraw = function () {
        this.clear(), this.init(), this.draw()
      }, t.prototype.clear = function (t) {
        try {
          this.container.innerHTML = "", this.options.interOption && (this.options.interOption = null)
        } catch (i) {
          this.container.innerHTML = ""
        }
        t && t()
      }, t
    }();
  t.exports = c
}, function (t, i, n) {
  var o = n(21),
    e = n(7),
    s = n(13),
    r = n(8),
    a = n(9),
    p = n(56),
    h = function () {
      function t(t) {
        this.options = o(e.defaulttheme, t), this.draw()
      }

      function i(t, i, n, o, e) {
        var s = e ? this.options.data.step2 : this.options.data.step;
        t.save(), t.fillStyle = void 0 == this.options.font.color ? "#000" : this.options.font.color, t.textAlign = "right", t.lineWidth = 1;
        for (var p, h = this.options.dpr, c = 0; p = o[c]; c++) t.beginPath(), 0 == c || c == o.length - 1 || (t.strokeStyle = "#e6e6e6", r(t, this.options.padding_left, p.y, this.options.drawWidth, p.y, 3)), this.options.series2 && 0 !== this.options.series2.length && e ? (t.textAlign = "left", t.fillText(l(p.num / 1, s), a(this.options.drawWidth + 5), a(p.y + 5 * h))) : (t.textAlign = "right", t.fillText(l(p.num / 1, s), a(this.options.padding_left - 5), a(p.y + 5 * h)));
        t.restore()
      }

      function n(t, i, n) {
        t.save(), t.lineWidth = 1;
        var o = this.options.dpr,
          e = this.options.padding_left;
        t.textAlign = "center", t.fillStyle = this.options.font ? void 0 == this.options.font.color ? "#000" : this.options.font.color : "#000";
        for (var s, h = this.options.drawWidth, l = n.length, c = 0; l > c; c++) {
          t.beginPath(), s = n[c]; {
            var d = t.measureText(s).width;
            Math.cos(2 * Math.PI / 360 * this.options.angle) * d
          }
          if (void 0 == s.show ? !0 : s.show)
            if (1 == l) {
              var u = (this.options.drawWidth - this.options.padding_left) / 2 + this.options.padding_left;
              t.fillText(s.value, a(u), a(this.options.c_1_height + 20 * o))
            } else {
              var u = c * (h - e) / (l - 1) + e;
              this.options.angle && 0 != this.options.angle ? p(s.value, t, a(u), a(this.options.c_1_height + 10 * o), this.options.angle) : (this.options.drawWidth > u + t.measureText(s.value).width || c == l - 1) && t.fillText(s.value, a(u), a(this.options.c_1_height + 20 * o))
            } if (void 0 == s.showline ? !0 : s.showline) {
            var u = c * (h - e) / (l - 1) + e;
            0 == c || c == l - 1 || (t.strokeStyle = "#e6e6e6", r(t, u, 0, c * (h - e) / (l - 1) + e, this.options.c_1_height + 2, 3))
          }
        }
        t.restore()
      }

      function h(t, i, n, o, e) {
        for (var s = e, r = [], a = 0; n >= a; a++) r.push({
          num: i + a * s,
          x: 0,
          y: o - a / n * o
        });
        return r
      }

      function l(t, i) {
        var n = 1; - 1 !== i.toString().indexOf(".") && (n = i.toString().length - i.toString().indexOf(".") - 1);
        var o = Math.pow(10, n);
        return s.format_unit(Math.round(t * o) / o, n)
      }
      return t.prototype.draw = function () {
        var t = this.options.context,
          o = this.options.data.max,
          e = this.options.data.max2,
          s = this.options.data.step,
          r = this.options.data.min,
          p = this.options.data.min2,
          l = this.options.data.step2,
          c = this.options.series2,
          d = this.options.sepeNum || 4,
          u = this.options.xaxis,
          f = this.options.c_1_height;
        t.beginPath(), t.lineWidth = 1, t.strokeStyle = "#ccc", t.rect(a(this.options.padding_left), .5, Math.round(this.options.drawWidth - this.options.padding_left), Math.round(f)), t.stroke();
        var g = h(o, r, d, f, s);
        if (i.call(this, t, o, r, g, !1), c && 0 !== c.length && c.some(function (t) {
            return 0 !== t.data.length
          })) {
          var m = h(e, p, d, f, l);
          i.call(this, t, o, r, m, !0)
        }
        n.apply(this, [t, f, u])
      }, t
    }();
  t.exports = h
}, function (t) {
  function i(t, i, n, o, e, s) {
    i.save(), i.textBaseline = "middle", i.textAlign = "left", s ? (i.translate(n, o), i.rotate(Math.PI / 180 * e), i.fillText(t, 0, 0), i.translate(-n, -o), i.rotate(-(Math.PI / 180) * e)) : (i.translate(n, o), i.rotate(Math.PI / 180 * e), i.fillText(t, 0, 0), i.translate(-n, -o), i.rotate(-(Math.PI / 180) * e)), i.restore()
  }
  t.exports = i
}, function (t, i, n) {
  var o = n(21),
    e = n(7),
    s = n(13),
    r = n(9),
    a = function () {
      function t(t) {
        this.options = o(e.defaulttheme, t), this.draw()
      }

      function i(t, i, n) {
        t.save();
        var o = i.data,
          e = o.length;
        t.beginPath();
        for (var r = 0, p = 0; e > p; p++) {
          var h = o[p];
          if (null !== h && "" !== h && void 0 !== h) {
            var l = (this.options.drawWidth - this.options.padding_left) / (e - 1) * p + this.options.padding_left;
            if (n) var c = a.call(this, h);
            else var c = s.get_y.call(this, h);
            0 == p ? t.moveTo(this.options.padding_left, c) : p == e - 1 ? t.lineTo(l, c) : null === r || "" === r || void 0 === r ? t.moveTo(l, c) : (t.lineTo(l, c), t.moveTo(l, c))
          }
          r = h
        }
        t.stroke(), t.restore()
      }

      function n(t, i, n) {
        t.save();
        for (var o = i.data, e = o.length, p = this.options.pointRadius, h = 0; e > h; h++) {
          var l = o[h];
          if (null != l && "" !== l && void 0 != l) {
            if (t.beginPath(), 1 == e) var c = 1;
            else var c = e - 1;
            if (1 == e) var d = (this.options.drawWidth - this.options.padding_left) / 2 + this.options.padding_left;
            else var d = (this.options.drawWidth - this.options.padding_left) / c * h + this.options.padding_left;
            if (n) var u = a.call(this, l);
            else var u = s.get_y.call(this, l);
            0 == h ? (t.arc(r(d), r(u), p, 0, 2 * Math.PI, !0), t.fill()) : (t.arc(r(d), r(u), p, 0, 2 * Math.PI, !0), t.fill())
          }
        }
        t.restore()
      }

      function a(t) {
        return this.options.c_1_height - this.options.c_1_height * (t - this.options.data.min2) / (this.options.data.max2 - this.options.data.min2)
      }
      return t.prototype.draw = function () {
        var t = this.options.context;
        t.lineWidth = 1;
        for (var o, e = this.options.series, s = 0; o = e[s]; s++) t.fillStyle = void 0 == o.color ? "#333" : o.color, t.strokeStyle = void 0 == o.color ? "#333" : o.color, i.apply(this, [t, o, !1]), o.showpoint ? n.apply(this, [t, o, !1]) : 1 == o.data.length && n.apply(this, [t, o, !1]);
        if (this.options.series2)
          for (var o, r = this.options.series2, s = 0; o = r[s]; s++) t.fillStyle = void 0 == o.color ? "#333" : o.color, t.strokeStyle = void 0 == o.color ? "#333" : o.color, i.apply(this, [t, o, !0]), o.showpoint && n.apply(this, [t, o, !0])
      }, t
    }();
  t.exports = a
}, , , function (t) {
  var i = {
    getMktByCode: function (t) {
      if (t.Length < 3) return t + "1";
      var i = t.substr(0, 1),
        n = t.substr(0, 3);
      return "5" == i || "6" == i || "9" == i ? t + "1" : "009" == n || "126" == n || "110" == n || "201" == n || "202" == n || "203" == n || "204" == n ? t + "1" : t + "2"
    },
    fixed: function (t, i) {
      var n = 0;
      t = t.toString();
      var o = t;
      for (n = 0; n < i - t.length; n++) o = "0" + o;
      return o
    },
    transform: function (t) {
      return t.replace(/(\d{4})(\d{2})(\d{2})/g, function (t, i, n, o) {
        return i + "-" + n + "-" + o
      })
    },
    windowToCanvas: function (t, i, n) {
      return {
        x: i * this.options.dpr,
        y: n * this.options.dpr
      }
    },
    canvasToWindow: function (t, i, n) {
      var o = t.getBoundingClientRect();
      return {
        x: i / this.options.dpr,
        y: (n + this.options.canvas_offset_top) * (Math.abs(o.bottom - o.top) / t.height)
      }
    },
    get_y: function (t) {
      var i = this.options.currentData && this.options.currentData.max || this.options.data.max,
        n = this.options.currentData && this.options.currentData.min || this.options.data.min;
      return i == n ? this.options.c_k_height / 2 : this.options.c_k_height - this.options.c_k_height * (t - n) / (i - n)
    },
    get_x: function (t) {
      var i = this.options.context.canvas,
        n = this.options.chartType,
        o = this.options.rect_unit.rect_w,
        e = this.options.currentData && this.options.currentData.data.length || this.options.data.data.length,
        s = this.options.currentData && this.options.currentData.total || this.options.data.total,
        r = this.options.padding.left,
        a = this.options.padding.right;
      return "TL" == n ? (i.width - r - a) / s * t + r : (i.width - r - a) / e * t + r - o / 2
    },
    get_rect: function (t, i) {
      var n = (t.width - this.options.padding.left - this.options.padding.right) / i,
        o = n * (1 - this.options.spacing);
      return {
        rect_w: n,
        bar_w: o
      }
    },
    format_unit: function (t, i) {
      i = void 0 == i ? 2 : i;
      var n = !1;
      0 > t && (t = Math.abs(t), n = !0);
      var o = 0,
        e = "";
      return n ? (1e4 > t ? o = t / 1 : t >= 1e4 && 1e8 > t ? (o = t / 1e4, e = "万") : t >= 1e8 ? (o = t / 1e8, e = "千万") : o = t / 1, o = -1 * o) : 1e4 > t ? o = t / 1 : t >= 1e4 && 1e8 > t ? (o = t / 1e4, e = "万") : t >= 1e8 ? (o = t / 1e8, e = "千万") : o = t / 1, (o / 1).toFixed(i) / 1 == (o / 1).toFixed(0) / 1 && (i = 0), (o / 1).toFixed(i) + e
    },
    addEvent: function (t, i, n) {
      t.attachEvent ? (t["e" + i + n] = n, t[i + n] = function () {
        t["e" + i + n](window.event)
      }, t.attachEvent("on" + i, t[i + n])) : t.addEventListener(i, n, !1)
    },
    removeEvent: function (t, i, n) {
      t.detachEvent ? (t.detachEvent("on" + i, t[i + n]), t[i + n] = null) : t.removeEventListener(i, n, !1)
    },
    findArrayMax: function (t) {
      for (var i = [0], n = 0; n < t.length; n++) isNaN(t[n]) || i.push(parseFloat(t[n]));
      return i.sort(function (t, i) {
        return i - t
      }), i[0]
    },
    findArrayMin: function (t) {
      for (var i = [0], n = 0; n < t.length; n++) isNaN(t[n]) || i.push(parseFloat(t[n]));
      return i.sort(function (t, i) {
        return t - i
      }), i[0]
    },
    formatYNum: function (t, i) {
      var n = "";
      if (t > 1e5 && 1e8 > t) {
        var o = (t / 1e4).toFixed(i);
        n = o >= 1e3 ? o.substr(0, 4) + "万" : o.substr(0, 5) + "万"
      } else if (t > 1e8) {
        var o = (t / 1e8).toFixed(i);
        n = o.substr(0, 5) + "万"
      } else n = t.toFixed(t >= 1e3 && i > 2 ? 2 : i);
      return n
    },
    getElementByClass: function (t, i) {
      for (var n = [], t = t.getElementsByTagName("*"), o = 0; o < t.length; o++) t[o].className == i && n.push(t[o]);
      return n
    }
  };
  t.exports = i
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function (t) {
  var i = {
    rank: function (t, i) {
      for (var n = t.split(""), o = 1; o < n.length; o++) {
        var e = parseInt(n[o], 16) + 1 * i;
        n[o] = 16 > e ? e.toString(16) : "F"
      }
      return n.join("")
    },
    ranks: function (t, i) {
      for (var n = [], o = 0, e = t.length; e > o; o++) {
        for (var s = t[o].split(""), r = 1; r < s.length; r++) {
          var a = parseInt(s[r], 16) + 1 * i;
          s[r] = 16 > a ? a.toString(16) : "F"
        }
        n.push(s.join(""))
      }
      return n
    }
  };
  t.exports = i
}, , , , , , , , function (t, i, n) {
  var o = n(175);
  "string" == typeof o && (o = [
    [t.id, o, ""]
  ]);
  n(180)(o, {});
  o.locals && (t.exports = o.locals)
}, function (t, i, n) {
  i = t.exports = n(176)(), i.push([t.id, "\r\n/*æ‰‹æœºç‰ˆå›¾è¡¨æ ·å¼*/\r\n.emcharts-container .show-tip {\r\n    position: absolute;\r\n    top: 0 !important;\r\n    top: 0px;\r\n    z-index: 999;\r\n    border: 0;\r\n    padding: 10px;\r\n    border-radius: 7px;\r\n    background-color: #17b03e;\r\n    color: #fff;\r\n    font-size: 20px;\r\n    font-weight: lighter;\r\n    font-family: 'Microsoft Yahei';\r\n   \r\n}\r\n.emcharts-container .show-tip .span-price{\r\n	font-size: 22px;\r\n}\r\n.emcharts-container .show-tip span{\r\n	font-size: 14px;height:25px;line-height:25px;\r\n    white-space: nowrap;\r\n}\r\n\r\n.emcharts-container .tip-line-1,.tip-line-2{\r\n	height:25px;\r\n	line-height:25px;\r\n}\r\n\r\n.emcharts-container .show-tip .span-time-c1{\r\n	text-align: left;\r\n	margin-right: 10px;\r\n}\r\n.emcharts-container .show-tip .span-time-c2{\r\n	text-align: right;\r\n}\r\n\r\n.emcharts-container .show-tip .span-k-c1{\r\n	text-align: left;\r\n	margin-right: 10px;\r\n}\r\n.emcharts-container .show-tip .span-k-c2{\r\n	text-align: right;\r\n}\r\n\r\n\r\n.emcharts-container .cross-y{\r\n	position:absolute;top:0px;z-index:98;border-left:1px dashed #8f8f8f;width:0px;background-color:#fff;pointer-events: none;\r\n}\r\n.emcharts-container .cross-x{\r\n	position:absolute;left:0px;z-index:98;border-top:1px dashed #8f8f8f;height:0px;\r\n}\r\n.emcharts-container .cross-p{\r\n	position:absolute;z-index:100;\r\n}\r\n.emcharts-container .mark-ma{\r\n	position:absolute;top:0px;left:0px;z-index:97;border:0;font-family:Arial;font-weight:lighter;\r\n}\r\n.emcharts-container .mark-ma span {\r\n	display:inline-block;padding-right:3px;font-size:12px;text-align:left;color:#ffba42;\r\n}\r\n\r\n.emcharts-container .mark-ma .span-m5{\r\n	color:#f4cb15;\r\n}\r\n.emcharts-container .mark-ma .span-m10{\r\n	color:#ff5b10;\r\n}\r\n.emcharts-container .mark-ma .span-m20{\r\n	color:#488ee6;\r\n}\r\n.emcharts-container .mark-ma .span-m30{\r\n	color:#fe59fe;\r\n}\r\n\r\n.emcharts-container .bar-color-span{\r\n	display: inline-block;\r\n	margin-left: 10px;\r\n	width: 10px;\r\n	height: 10px;\r\n	vertical-align: middle;\r\n}\r\n\r\n.emcharts-container .bar-value-span{\r\n	display: inline-block;\r\n	min-width: 50px;\r\n	padding: 0px 5px;\r\n	height: 20px;\r\n	line-height: 20px;\r\n	vertical-align: middle;\r\n	text-align: center;\r\n}\r\n\r\n/* chart_line çš„æ ·å¼ */\r\n.emcharts-container .chart_line_tips{\r\n	position: absolute;\r\n	z-index: 100;\r\n	background-color: #000;\r\n	filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=70);\r\n	opacity: 0.7;\r\n	color:white;\r\n	min-width: 80px;\r\n	padding: 10px;\r\n	border-radius: 5px;\r\n	font-family: \"Microsoft YaHei\";\r\n	font-weight: lighter;\r\n	text-align: left;\r\n	-webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none;\r\n}\r\n.emcharts-container .chart_line_tips_title{\r\n	font-size: 16px;\r\n	font-weight: 400px;\r\n	padding: 5px 0px;\r\n}\r\n.emcharts-container .chart_line_tips_line{\r\n	padding: 2px 0px;\r\n	font-size: 12px;\r\n}\r\n.emcharts-container .chart_line_tips_color{\r\n	display: inline-block;\r\n	width: 10px;\r\n	height: 10px;\r\n	border-radius: 10px;\r\n	margin-right: 5px;\r\n}\r\n.emcharts-container .chart_line_tips_content{}\r\n.emcharts-container .chart_line_yline{\r\n	position: absolute;\r\n	width: 0px;\r\n	border-left: solid 1px #898989;\r\n}\r\n.emcharts-container .chart_line_ybar{\r\n	position: absolute;\r\n	background-color: rgb(51,51,51);	\r\n	filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=10);\r\n	opacity: 0.1;\r\n}\r\n.emcharts-container .chart_line_cir{\r\n	background-color: white;\r\n	width: 10px;\r\n	height: 10px;\r\n	border-radius: 10px;\r\n	border: solid 1px white;\r\n	position: absolute;\r\n}\r\n\r\n.emcharts-container .event-div{\r\n	background-color: #fff;\r\n	opacity: 0;\r\n	position: absolute;\r\n	top: 0px;\r\n	bottom: 0px;\r\n	left: 0px;\r\n	right: 0px;\r\n	filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=0);\r\n	z-index: 1000;\r\n}\r\n\r\n/* æŠ€æœ¯æŒ‡æ ‡çš„æ ·å¼ */\r\n.emcharts-container .markTContainer{\r\n	position: absolute;\r\n	font-family: 'Microsoft Yahei';\r\n	font-weight: lighter;\r\n	font-size: 12px;\r\n}\r\n.emcharts-container .markTContainer span{\r\n	margin-right: 5px;\r\n	display: inline-block;\r\n	*display: inline;\r\n	*zoom:1;\r\n}\r\n\r\n.emcharts-container .scale-div{\r\n	position:absolute;z-index:99;border:0px;width:90px;height:45px;\r\n	opacity:0.7;\r\n}\r\n.emcharts-container .scale-div .span-minus{\r\n	width: 30px;height: 30px;float: left;border-radius: 6px;\r\n	background: url(" + n(177) + ") no-repeat center center #cccccc;\r\n	font-size: 14px;\r\n}\r\n.emcharts-container .scale-div .span-plus{\r\n	width: 30px;height: 30px;float: right;border-radius: 6px;\r\n	background: url(" + n(178) + ") no-repeat center center #cccccc;\r\n	font-size: 14px;\r\n}\r\n.emcharts-container .scale-opacity{\r\n	opacity:0.3;\r\n}\r\n\r\n.emcharts-container .loading-chart {\r\n	position: absolute;\r\n	left:0;\r\n	top:0;\r\n	z-index: 100;\r\n	width: 100%;\r\n	height: 100%;\r\n	/*background-color: #fff;*/\r\n	text-align: center;\r\n    /*opacity: 0.7;*/\r\n    font-size: 20px;\r\n}\r\n\r\n.emcharts-container .delay-div{\r\n	position: absolute;\r\n	left:0;\r\n	top:0;\r\n	z-index: 10000;\r\n	width: 100%;\r\n	height: 100%;\r\n	background-color: #fff;\r\n    opacity: 0;\r\n}\r\n\r\n.emcharts-container .mark-point{\r\n	position: absolute;\r\n	z-index: 97;\r\n	min-width: 15px;\r\n	min-height: 15px;\r\n	border-radius: 10px;\r\n	background: url(" + n(179) + ") no-repeat center center/15px 15px #fff;\r\n	opacity: 1;\r\n}\r\n\r\n\r\n/*webæ¸¯è‚¡çš„æ ·å¼*/\r\n.emcharts-container .web-tips{\r\n	display: none;\r\n	left: -10000px;\r\n	top: -10000px;\r\n	position: absolute;\r\n	text-align: left;\r\n	background-color: #898989;\r\n	border-radius: 2px;\r\n	z-index: 10000;\r\n	display: inline-block;\r\n	color: white;\r\n	font-size: 12px;\r\n	text-align: center;\r\n	padding: 2px;\r\n	white-space:nowrap;\r\n}\r\n.emcharts-container .web-middleLine{\r\n	display: none;\r\n	position: absolute;\r\n	width: 0px;\r\n	border-right: dashed 1px #898989;\r\n}\r\n\r\n.emcharts-container .group-bar-mark{\r\n	position: absolute;\r\n	opacity: 0.1;\r\n	filter: progid:DXImageTransform.Microsoft.Alpha(opacity=10);\r\n}\r\n\r\n.emcharts-container .tech-index{\r\n	position:absolute;\r\n	z-index: 99;\r\n}\r\n\r\n.emcharts-container .tech-index-item{\r\n	background-color: #707070;\r\n	float:left;\r\n	text-align: center;\r\n	color:#fff;\r\n	cursor: pointer;\r\n}\r\n\r\n.emcharts-container .tech-index .current{\r\n	background-color: #c2c2c2;\r\n	color:#707070;\r\n}\r\n\r\n\r\n/*webç‰ˆå›¾è¡¨æ ·å¼*/\r\n.emcharts-container{\r\n	-webkit-user-select:none;\r\n    -moz-user-select:none;\r\n    -ms-user-select:none;\r\n    user-select:none;\r\n    -webkit-tap-highlight-color: transparent;\r\n\r\n   	font-family: simsun;\r\n	font-size: 12px;\r\n	box-sizing: inherit;\r\n}\r\n\r\n.emcharts-container{\r\n	-webkit-user-select:none;\r\n    -moz-user-select:none;\r\n    -ms-user-select:none;\r\n    user-select:none;\r\n    -webkit-tap-highlight-color: transparent;\r\n\r\n   	font-family: simsun;\r\n	font-size: 12px;\r\n	box-sizing: inherit;\r\n}\r\n.emcharts-container .web-show-tip {\r\n	position: absolute;\r\n	top: 0px;\r\n	z-index: 999;\r\n	border: 1px solid #97c8ff;\r\n	/*padding: 8px;*/\r\n	box-shadow: 2px 2px 2px rgba(0,0,0,0.1);\r\n	background-color: #fff;\r\n	color: #666;\r\n	width: 150px;\r\n	font-size: 12px;\r\n	font-weight: lighter;\r\n	font-family: 'arial';\r\n\r\n}\r\n\r\n.emcharts-container .web-tip-line-left{\r\n	float: left;\r\n	width:50%;\r\n	text-align: left;\r\n	height:20px;\r\n	line-height: 20px;\r\n\r\n	*height:15px;\r\n	*line-height: 15px;\r\n}\r\n\r\n.emcharts-container .web-tip-line-right{\r\n	float: left;\r\n	width:50%;\r\n	text-align: right;\r\n	height:20px;\r\n	line-height: 20px;\r\n	white-space: nowrap;\r\n	*height:15px;\r\n	*line-height: 15px;\r\n}\r\n\r\n.emcharts-container .web-tip-first-line{\r\n	width:100%;\r\n	padding: 3px 0px;\r\n	background: #edf5ff;\r\n	text-align: center;\r\n}\r\n\r\n.emcharts-container .web-tip-line-container{\r\n	padding:3px 8px;\r\n	*margin-bottom: 8px;\r\n}\r\n\r\n.emcharts-container .time-tips-coordinate{\r\n	display: none;\r\n	position: absolute;\r\n	height: 14px;\r\n	line-height: 14px;\r\n	padding: 0px 3px;\r\n	font-size: 12px;\r\n	background-color: #707070;\r\n	color: white;\r\n	z-index: 1000;\r\n}\r\n.emcharts-container .time-tips-top{\r\n	display: none;\r\n	font-size: 12px;\r\n	color: #000000;\r\n	position: absolute;\r\n	top: 0px;\r\n	font-weight: lighter;\r\n	font-family: \"Microsoft Yahei\";\r\n}\r\n\r\n/* web ç‰ˆ åˆ†æ—¶å›¾ç›˜å£å¼‚åŠ¨æ ·å¼ */\r\n.emcharts-container .timeChangeMainPad {\r\n    border: solid #65CAFE 1px;\r\n    position: absolute;\r\n    top: 100px;\r\n    left: 100px;\r\n    font-size: 12px;\r\n    color: #555;\r\n    background-color: white;\r\n    z-index: 1000;\r\n}\r\n.emcharts-container .timeChangeTriangle{\r\n	*display: none;\r\n	position: absolute;\r\n    left: 55px;\r\n    top: -6px;\r\n	width: 10px;\r\n	height: 10px;\r\n	background-color: #D1E7FF;\r\n	border-left: solid 1px #65CAFE;\r\n	border-top: solid 1px #65CAFE;\r\n	-webkit-transform: rotate(45deg);    /* for Chrome || Safari */\r\n	-moz-transform: rotate(45deg);       /* for Firefox */\r\n	-ms-transform: rotate(45deg);        /* for IE */\r\n	o-transform: rotate(45deg);         /* for Opera */\r\n}\r\n.emcharts-container .timeChangeTable{\r\n	*width: 170px;\r\n	min-width: 100px;\r\n	height: 50px;\r\n	border-spacing: 0px;\r\n    table-layout: fixed;\r\n}\r\n.emcharts-container .timeChangeHeader{\r\n	background-color: #D1E7FF;\r\n  	text-align: center;\r\n  	*width: 170px;\r\n    min-width: 100px;\r\n	padding: 7px 0px 5px 0px;\r\n	font-size: 14px;          \r\n}\r\n.timeChangeTable td{\r\n	padding: 0px 4px;\r\n	white-space: nowrap;\r\n}\r\n\r\n/* webç‰ˆ kçº¿å›¾æŒ‡æ ‡æ ·å¼ */\r\n\r\n.emcharts-container .kt-pad {\r\n    position: absolute;\r\n    color: #5F5F5F;\r\n    margin-left: 15px;\r\n    min-width: 55px;\r\n}\r\n\r\n.emcharts-container .kt-title {\r\n    margin-bottom: 5px;\r\n    font-size: 12px;\r\n}\r\n\r\n.emcharts-container .kt-line {\r\n    /*background-color: white;*/ \r\n    position: relative; \r\n    margin: 7px 0px;\r\n}\r\n\r\n.emcharts-container .kt-line:hover{\r\n    cursor: pointer;\r\n}\r\n\r\n.emcharts-container .kt-radio-wrap{\r\n	position: relative; \r\n	display: inline-block; \r\n	*zoom:1;\r\n	*display:inline; \r\n	border: solid 1px #305896;height: 10px; \r\n	width: 10px;\r\n	/*background-color: white;*/\r\n	box-sizing:content-box;\r\n}\r\n\r\n.emcharts-container .kt-radio {\r\n    position:absolute; margin: 2px; width: 6px; height: 6px; background-color: #305896;display: none;\r\n}\r\n\r\n.emcharts-container .kt-name {\r\n    color: #555;line-height: 18px;display: inline-block; height: 16px;padding-left: 5px;position: absolute; top: -2px; left: 15px;*display: inline;\r\n}\r\n\r\n.emcharts-container .kt-radio-choose {\r\n    display: block;\r\n}\r\n\r\n/* web k çº¿çš„æ»‘åŠ¨ */\r\n.emcharts-container .slideBarCVS{\r\n	/*background-color: white;*/\r\n	outline: solid 1px #E9E9E9;\r\n\r\n}\r\n\r\n.emcharts-container .leftDrag{\r\n	background-color: white;\r\n	opacity: 2;\r\n	filter: progid:DXImageTransform.Microsoft.Alpha(opacity=200);\r\n}\r\n.emcharts-container .leftDrag:hover{\r\n	cursor: w-resize;\r\n}\r\n\r\n.emcharts-container .rightDrag{\r\n	background-color: white;\r\n}\r\n.emcharts-container .rightDrag:hover{cursor: e-resize;}\r\n.emcharts-container .containerBar{\r\n	background-color: #e0e0e0;\r\n	opacity: 0.5;\r\n	filter: progid:DXImageTransform.Microsoft.Alpha(opacity=50);\r\n	border:solid 1px #35709C;\r\n}\r\n.emcharts-container .containerBar:hover{cursor: move;}\r\n\r\n.emcharts-container .preference-container{\r\n	position: absolute;\r\n	z-index: 101;\r\n}\r\n.emcharts-container .preference-shade{\r\n	background-color: #333;\r\n	opacity: 0.1;\r\n	filter: progid:DXImageTransform.Microsoft.Alpha(opacity=10);\r\n	width:100%;\r\n	height: 100%;\r\n}\r\n.emcharts-container .preference-handle{\r\n	position:absolute;\r\n	z-index: 101;\r\n	/*background-color: #fff;*/\r\n	border: 1px solid #e6e6e6;\r\n	border-left: 0;\r\n	width:30px;\r\n	height: 40px;\r\n	line-height: 20px;\r\n	padding:5px;\r\n	text-align: center;\r\n	cursor: pointer;\r\n	font-size: 12px;\r\n    box-sizing: content-box;\r\n}\r\n.emcharts-container .set-tab{\r\n	border-bottom:1px solid #4267A0;\r\n	height:30px;\r\n	margin-bottom: 5px;\r\n}\r\n.emcharts-container .ma-tab{\r\n	/*float:left;*/\r\n	/*width:50%;*/\r\n	height:30px;\r\n	line-height: 30px;\r\n	text-align: center;\r\n	cursor: pointer;\r\n	font-size: 14px;\r\n}\r\n.emcharts-container .set-tab .current{\r\n	background-color: #4267A0;\r\n	color:#fff;\r\n}\r\n.emcharts-container .right-tab{\r\n	float:left;\r\n	width:50%;\r\n	height:30px;\r\n	line-height: 30px;\r\n	text-align: center;\r\n	cursor: pointer;\r\n	font-size: 14px;\r\n}\r\n\r\n.emcharts-container .set-container{\r\n	position: absolute;\r\n	z-index: 103;\r\n	background-color: #fff;\r\n	width:280px;\r\n	height:200px;\r\n}\r\n\r\n.emcharts-container .pre-notice{\r\n	height:20px;\r\n	line-height: 20px;\r\n	text-align: center;\r\n	margin: 5px 0px;\r\n	font-size: 14px;\r\n}\r\n.emcharts-container .ma-item{\r\n	height: 27px;\r\n	line-height: 30px;\r\n	padding-left: 15px;\r\n	text-align: center;\r\n}\r\n.emcharts-container .setting-span-ma5{\r\n	background-color:#f4cb15;\r\n}\r\n.emcharts-container .setting-span-ma10{\r\n	background-color:#ff5b10;\r\n}\r\n.emcharts-container .setting-span-ma20{\r\n	background-color:#488ee6;\r\n}\r\n.emcharts-container .setting-span-ma30{\r\n	background-color:#fe59fe;\r\n}\r\n\r\n.emcharts-container .span-setting{\r\n	display: inline-block;\r\n	*display: inline;\r\n	*zoom:1;\r\n	height: 15px;\r\n	width:15px;\r\n	margin-left: 10px;\r\n	vertical-align:middle;\r\n	cursor: pointer;\r\n}\r\n.emcharts-container .item-span{\r\n	\r\n}\r\n\r\n.emcharts-container .right-panel{\r\n	text-align: center;\r\n}\r\n.emcharts-container .right-panel-form{\r\n	text-align: left;\r\n	width: 160px;\r\n	margin: 20px auto;\r\n	line-height: 1.8;\r\n}\r\n/*.right-panel-btn{\r\n	border: none;\r\n	padding: 5px 15px;\r\n	margin: 10px 27px;\r\n	background-color: #4267A0;\r\n	color: white;\r\n}\r\n*/\r\n\r\n.emcharts-container .confirm-btn{\r\n	float:left;\r\n	border: none;\r\n	margin-left:30px;\r\n	margin-top:10px;\r\n	width:90px;\r\n	height: 30px;\r\n	line-height: 30px;\r\n	background-color: #305895;\r\n	color: white;\r\n	font-size: 14px;\r\n}\r\n.emcharts-container .cancle-btn{\r\n	float:right;\r\n	border: none;\r\n	margin-right:30px;\r\n	margin-top:10px;\r\n	width:90px;\r\n	height: 30px;\r\n	line-height: 30px;\r\n	background-color: #305895;\r\n	color: white;\r\n	font-size: 14px;\r\n}\r\n\r\n.emcharts-container .colorPad{\r\n	display: none;\r\n	position: absolute;\r\n	top: 120px;\r\n	left: 120px;\r\n	background-color: white;\r\n}\r\n.emcharts-container .colorPadTriangle{\r\n	position: absolute;\r\n	top: 9px;\r\n	left: -12px;\r\n	width: 16px;\r\n	height: 11px;\r\n	*display: none;\r\n	background-color: white;\r\n	overflow: hidden;\r\n	z-index: 100;\r\n}\r\n.emcharts-container .colorPadTriangle .up{\r\n	position: absolute;\r\n	top: 2px;\r\n	left: 3px;\r\n	width: 12px;\r\n	height: 10px;\r\n	border-top: solid 1px #aaa;\r\n	background-color: white;\r\n	-webkit-transform: rotate(-25deg);    /* for Chrome || Safari */\r\n	-moz-transform: rotate(-25deg);       /* for Firefox */\r\n	-ms-transform: rotate(-25deg);        /* for IE */\r\n	o-transform: rotate(-25deg);         /* for Opera */\r\n	*display: none;\r\n	z-index: 10;\r\n}\r\n.emcharts-container .colorPadTriangle .down{\r\n	position: absolute;\r\n	top: 7px;\r\n	left: -1px;\r\n	width: 12px;\r\n	height: 10px;\r\n	border-top: solid 1px #aaa;\r\n	background-color: white;\r\n	-webkit-transform: rotate(25deg);    /* for Chrome || Safari */\r\n	-moz-transform: rotate(25deg);       /* for Firefox */\r\n	-ms-transform: rotate(25deg);        /* for IE */\r\n	o-transform: rotate(25deg);         /* for Opera */\r\n	*display: none;\r\n	z-index: 10;\r\n}\r\n.emcharts-container .colorTable{\r\n	width: 100px;\r\n	height:90px;\r\n	border: solid 1px #aaa; \r\n}\r\n.emcharts-container .colorTable td{\r\n	position: relative;\r\n	z-index: 100;\r\n	border: solid 3px #fff;\r\n}\r\n.emcharts-container .ma-panel{\r\n	position: relative;\r\n}\r\n.emcharts-container .ma-item-input{\r\n	width:30px;\r\n	height: 15px;\r\n	line-height: 15px;\r\n	margin-left: 5px;\r\n	margin-right: 5px;\r\n	font-size: 12px;\r\n	vertical-align:middle;\r\n	padding-left: 3px;\r\n}\r\n\r\n.emcharts-container .fu-quan-select{\r\n\r\n	-webkit-user-select:none;\r\n    -moz-user-select:none;\r\n    -ms-user-select:none;\r\n    user-select:none;\r\n\r\n	position: absolute;\r\n	z-index: 100;\r\n	right:0px;\r\n	top:5px;\r\n	width:50px;\r\n	height:20px;\r\n	font-size: 12px;\r\n	font-family: simsun;\r\n\r\n	 -webkit-appearance: none;\r\n	 padding-left: 3px;\r\n}\r\n/* barHorizontal */\r\n.emcharts-container .horizontal-gmask{\r\n	position: absolute;\r\n	background-color: #000;\r\n	opacity: 0.1;\r\n	filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=10);\r\n}\r\n.emcharts-container .horizontal-gpanel{\r\n	position: absolute;\r\n	background-color: #000;\r\n	border-radius: 5px;\r\n	opacity: 0.7;\r\n	filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=70);\r\n	color:#ffffff;\r\n	padding: 5px 10px;\r\n}\r\n\r\n/*ç›˜å£å¼‚åŠ¨çš„æ•°æ®æœ€åŽä¸€æ¡é—ªçƒ*/\r\n.timePositionChangesAni {\r\n	animation: timePositionChangesAni 0.7s infinite linear alternate;\r\n	-webkit-animation: timePositionChangesAni 0.7s infinite linear alternate;\r\n	-ms-animation: timePositionChangesAni 0.7s infinite linear alternate;\r\n}\r\n\r\n@keyframes timePositionChangesAni{\r\n	0%{width: 6px;height: 6px;margin-top: 0;margin-left: 0;}\r\n	100%{width: 10px;height: 10px;margin-top: -2px;margin-left: -2px;}\r\n}\r\n\r\n@-webkit-keyframes timePositionChangesAni{\r\n	0%{width: 6px;height: 6px;margin-top: 0;margin-left: 0;}\r\n	100%{width: 10px;height: 10px;margin-top: -2px;margin-left: -2px;}\r\n}\r\n\r\n@-ms-keyframes timePositionChangesAni{\r\n	0%{width: 6px;height: 6px;margin-top: 0;margin-left: 0;}\r\n	100%{width: 10px;height: 10px;margin-top: -2px;margin-left: -2px;}\r\n}\r\n\r\n\r\n\r\n/* æ‰“ç‚¹æ ·å¼ */\r\n.__Emcharts_k_dotpints {\r\n	position: absolute;\r\n	z-index: 10;\r\n	left: 0;\r\n	top: 0;\r\n	height: 0;\r\n	width: 0;\r\n	overflow: visible;\r\n}\r\n\r\n.__Emcharts_k_dotpints a,\r\n.__Emcharts_k_dotpints div {\r\n	position: absolute;\r\n	display: block;\r\n	width: 10px;\r\n	height: 10px;\r\n	border: none;\r\n	outline: none;\r\n}\r\n.__Emcharts_k_dotpints a img,\r\n.__Emcharts_k_dotpints div img {\r\n	display: block;\r\n	width: 100%;\r\n	height: 100%;\r\n	outline: none;\r\n	border: none;\r\n}\r\n\r\n", ""])
}, function (t) {
  t.exports = function () {
    var t = [];
    return t.toString = function () {
      for (var t = [], i = 0; i < this.length; i++) {
        var n = this[i];
        t.push(n[2] ? "@media " + n[2] + "{" + n[1] + "}" : n[1])
      }
      return t.join("")
    }, t.i = function (i, n) {
      "string" == typeof i && (i = [
        [null, i, ""]
      ]);
      for (var o = {}, e = 0; e < this.length; e++) {
        var s = this[e][0];
        "number" == typeof s && (o[s] = !0)
      }
      for (e = 0; e < i.length; e++) {
        var r = i[e];
        "number" == typeof r[0] && o[r[0]] || (n && !r[2] ? r[2] = n : n && (r[2] = "(" + r[2] + ") and (" + n + ")"), t.push(r))
      }
    }, t
  }
}, function (t) {
  t.exports = "data:image/png;base64,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"
}, function (t) {
  t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABFSURBVHjaYjxz5gwDMcDY2Pg/jH327FlGYvQwMdAQjBo+avhIMJzx/////0eDBR2wEFsIjRZco4aPGj4AhgMAAAD//wMAq70Q99ei408AAAAASUVORK5CYII="
}, function (t) {
  t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQjBBMjM2MjI2REMxMUU2QURERTg3REFCOEYzQUQzNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQjBBMjM2MzI2REMxMUU2QURERTg3REFCOEYzQUQzNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFCMEEyMzYwMjZEQzExRTZBRERFODdEQUI4RjNBRDM2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFCMEEyMzYxMjZEQzExRTZBRERFODdEQUI4RjNBRDM2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FqRI6gAAAypJREFUeNqsVktIlFEUPhND6DRgOfSCCFs0jQYNWTaJ1qRGjQxhRNKDFi2KJCOoyFVFJgQ9XAQtkhRclVCJFoa5GJUpQQrCFmkygdAsejCZYSO1mb7Dvf/8j7nzAg98zP3Pvfd8cx733GtLHKRs4gZ41T6gDHBJfQz4CAwBfcB0JiO2DER+oA3YRblJGLgKjKomlyh0BcADYDgPEpJrh+XegmxExUAIOMPeUv5ik3tD0paSyAG8BCqTmtsTRCvcapOH24kuD6YjrJS2HJrCbpi8B/hMy11riIrWEc3KPJfU6nPTb4kO4c8HkJapN7p+Lqqt90mbp43F4JfxNYer6xvK4RjRTEh4djcs9IXLiBb+6Ov4m4V14RdE3ae0mQRQwwWiEbGF6uS/3h4Uy+pPiI3zc0RPL+le3XxO1Fyue3odHs1MGgmM8poLhXPkTZKweKoEAaN4FZYcEGMtV+xd9DNRQ4v4Zr0bJiLv0+WLbXvZo1YMrqVMbzlK1PqY6EKdOnRaqKyhfHKfaLDNau2GPe1ZKd8rfvccR0hCoijYw/4uEUoWZ5E+ZtmBPc7lKmu7mcijJCqrIPr5nWgbchlpRrgmhX7kkfCwGrqzt8y5cnaC+JfK2ia7oXeZw1boFOOBbqIjFxHceqL2c3pBMDGHqw4l/m5A/xNc3qni4hz9xWCpSc0H8UdUFAKXdyMSH/+NcPrNJW0scU1iX4lavFbtP7vswmtN3ni2EnWeF0QsdwLmbScRopJSlHVVrq0pxkRTJiIuAj47sxm6/koUhsMp2pBRuFt86FHt+GSXh7UmqdKSnUnY4y8Rog2bdd36jeJbTRRmol7TOcpGwl7E51PDpuVVLc+4M0zINpFduNq4kY72pc6xR8YzZW5BE1r3vqJsqkbhLt2I8h7q0fseF467Qhxc12qRI7Mk5K2bvI/4+n2oLFXtXOwMWDuzKBzug3y4eztU+WGbI9Y3g0PejD5aHBkH+AKLW29YVgTlgsUgCWokqjdDTJZ6h4xvvpKQe2ulrYyvoAWgSRKO5UEyJgmajJ7k8q5LHk+gAdgPlFoekNzSXwH9ssOklf8CDADTqe/lOuA5/wAAAABJRU5ErkJggg=="
}, function (t) {
  function i(t, i) {
    for (var n = 0; n < t.length; n++) {
      var o = t[n],
        e = c[o.id];
      if (e) {
        e.refs++;
        for (var s = 0; s < e.parts.length; s++) e.parts[s](o.parts[s]);
        for (; s < o.parts.length; s++) e.parts.push(a(o.parts[s], i))
      } else {
        for (var r = [], s = 0; s < o.parts.length; s++) r.push(a(o.parts[s], i));
        c[o.id] = {
          id: o.id,
          refs: 1,
          parts: r
        }
      }
    }
  }

  function n(t) {
    for (var i = [], n = {}, o = 0; o < t.length; o++) {
      var e = t[o],
        s = e[0],
        r = e[1],
        a = e[2],
        p = e[3],
        h = {
          css: r,
          media: a,
          sourceMap: p
        };
      n[s] ? n[s].parts.push(h) : i.push(n[s] = {
        id: s,
        parts: [h]
      })
    }
    return i
  }

  function o(t, i) {
    var n = f(),
      o = v[v.length - 1];
    if ("top" === t.insertAt) o ? o.nextSibling ? n.insertBefore(i, o.nextSibling) : n.appendChild(i) : n.insertBefore(i, n.firstChild), v.push(i);
    else {
      if ("bottom" !== t.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
      n.appendChild(i)
    }
  }

  function e(t) {
    t.parentNode.removeChild(t);
    var i = v.indexOf(t);
    i >= 0 && v.splice(i, 1)
  }

  function s(t) {
    var i = document.createElement("style");
    return i.type = "text/css", o(t, i), i
  }

  function r(t) {
    var i = document.createElement("link");
    return i.rel = "stylesheet", o(t, i), i
  }

  function a(t, i) {
    var n, o, a;
    if (i.singleton) {
      var c = m++;
      n = g || (g = s(i)), o = p.bind(null, n, c, !1), a = p.bind(null, n, c, !0)
    } else t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = r(i), o = l.bind(null, n), a = function () {
      e(n), n.href && URL.revokeObjectURL(n.href)
    }) : (n = s(i), o = h.bind(null, n), a = function () {
      e(n)
    });
    return o(t),
      function (i) {
        if (i) {
          if (i.css === t.css && i.media === t.media && i.sourceMap === t.sourceMap) return;
          o(t = i)
        } else a()
      }
  }

  function p(t, i, n, o) {
    var e = n ? "" : o.css;
    if (t.styleSheet) t.styleSheet.cssText = x(i, e);
    else {
      var s = document.createTextNode(e),
        r = t.childNodes;
      r[i] && t.removeChild(r[i]), r.length ? t.insertBefore(s, r[i]) : t.appendChild(s)
    }
  }

  function h(t, i) {
    var n = i.css,
      o = i.media;
    if (o && t.setAttribute("media", o), t.styleSheet) t.styleSheet.cssText = n;
    else {
      for (; t.firstChild;) t.removeChild(t.firstChild);
      t.appendChild(document.createTextNode(n))
    }
  }

  function l(t, i) {
    var n = i.css,
      o = i.sourceMap;
    o && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
    var e = new Blob([n], {
        type: "text/css"
      }),
      s = t.href;
    t.href = URL.createObjectURL(e), s && URL.revokeObjectURL(s)
  }
  var c = {},
    d = function (t) {
      var i;
      return function () {
        return "undefined" == typeof i && (i = t.apply(this, arguments)), i
      }
    },
    u = d(function () {
      return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
    }),
    f = d(function () {
      return document.head || document.getElementsByTagName("head")[0]
    }),
    g = null,
    m = 0,
    v = [];
  t.exports = function (t, o) {
    o = o || {}, "undefined" == typeof o.singleton && (o.singleton = u()), "undefined" == typeof o.insertAt && (o.insertAt = "bottom");
    var e = n(t);
    return i(e, o),
      function (t) {
        for (var s = [], r = 0; r < e.length; r++) {
          var a = e[r],
            p = c[a.id];
          p.refs--, s.push(p)
        }
        if (t) {
          var h = n(t);
          i(h, o)
        }
        for (var r = 0; r < s.length; r++) {
          var p = s[r];
          if (0 === p.refs) {
            for (var l = 0; l < p.parts.length; l++) p.parts[l]();
            delete c[p.id]
          }
        }
      }
  };
  var x = function () {
    var t = [];
    return function (i, n) {
      return t[i] = n, t.filter(Boolean).join("\n")
    }
  }()
}, function (t, i, n) {
  var o = n(21),
    e = n(22),
    s = n(38),
    r = n(182),
    a = n(183),
    p = n(184),
    h = n(166),
    l = n(13),
    c = function () {
      function t(t) {
        this.options = o(this.options, t), this.container = document.getElementById(t.container), this.container.className = this.container.className.replace(/emcharts-container/g, "").trim(), this.container.className = this.container.className + " emcharts-container"
      }
      return t.prototype.init = function () {
        this.container.style.position = "relative", void 0 === this.options.dpr && (this.options.dpr = 3);
        var t = this.options.dpr,
          i = document.createElement("canvas");
        this.container.appendChild(i), i.width = t * this.options.width, i.height = t * this.options.height, i.style.width = this.options.width + "px", i.style.height = this.options.height + "px", i.style.border = "0px";
        try {
          var n = i.getContext("2d")
        } catch (o) {
          i = window.G_vmlCanvasManager.initElement(i);
          var n = i.getContext("2d")
        }
        var n = i.getContext("2d");
        void 0 === this.options.font_size && (this.options.font_size = 12), n.font = this.options.font_size * t + "px Arial", n.lineWidth = 1 * t, this.options.dpr = t, this.options.canvas = i, this.options.context = n, void 0 === this.options.color && (this.options.color = "#6890D5"), void 0 === this.options.hoverColor && (this.options.hoverColor = "#7EA1DA"), this.options.sepeNum || (this.options.sepeNum = 4);
        var r = this.options.yaxis;
        this.options.rankColors = h.ranks(this.options.series.colors, 2);
        for (var a = [], p = this.options.series.datas, l = 0, c = p.length; c > l; l++)
          for (var d = 0; d < p[l].data.length; d++) {
            var u = p[l] || [],
              f = u.data[d] || 0;
            a[d] = (a[d] || 0) + f
          }
        var g = s(this.options.sepeNum, a);
        this.options.coordinate = g, this.options.padding = {};
        for (var m = 0, l = 0, c = r.length; c > l; l++) m = Math.max(n.measureText(r[l].value).width, m) + this.options.font_size / 2;
        this.options.padding.left = m + 10;
        var v = n.measureText(g.max).width;
        this.options.padding.right = v + 10, this.options.padding.top = this.options.font_size * t, this.options.padding.bottom = 2 * this.options.font_size * t;
        var x = (i.height - this.options.padding.top - this.options.padding.bottom) / r.length;
        this.options.unitHeight = x, e.apply(this, [this.options.context, 200 + v, 50, 164, 40])
      }, t.prototype.draw = function (t) {
        this.clear(), this.init();
        var i = this;
        new r(this.options), a.call(this), l.addEvent(i.container, "mousemove", function (t) {
          var n, o;
          t.layerX ? (n = t.layerX, o = t.layerY) : t.x && (n = t.x, o = t.y), p.call(i, n, o);
          try {
            t.preventDefault()
          } catch (e) {
            t.returnValue = !1
          }
        }), l.addEvent(i.container, "mouseleave", function () {
          void 0 !== i.options.tips && (i.options.tips.style.display = "none", i.options.tips.style.left = "-10000")
        }), t && t()
      }, t.prototype.reDraw = function () {
        this.clear(), this.init(), this.draw()
      }, t.prototype.clear = function (t) {
        this.container ? this.container.innerHTML = "" : document.getElementById(this.options.container).innerHTML = "", t && t()
      }, t
    }();
  t.exports = c
}, function (t, i, n) {
  var o = n(21),
    e = n(25),
    s = n(9),
    r = n(60),
    a = function () {
      function t(t) {
        this.options = {}, this.options = o(this.options, t), this.draw()
      }

      function i(t, i) {
        var n = 1; - 1 !== i.toString().indexOf(".") && (n = i.toString().length - i.toString().indexOf(".") - 1);
        var o = Math.pow(10, n);
        return r.format_unit(Math.round(t * o) / o, n)
      }
      return t.prototype.init = function () {
        this.options.xSplitShow = !1, this.options.xShowDivide = !1
      }, t.prototype.draw = function () {
        this.init();
        var t = this.options.padding.top,
          n = this.options.padding.left,
          o = this.options.padding.right,
          r = this.options.padding.bottom,
          a = this.options.context,
          p = this.options.canvas,
          h = this.options.yaxis,
          l = (this.options.series.data, this.options.unitHeight),
          c = this.options.dpr,
          d = this.options.coordinate,
          u = (d.max, d.min),
          f = d.stepHeight,
          g = this.options.sepeNum,
          m = p.width - n - o,
          v = m / g;
        a.save();
        var x = s(Math.round(p.height - r)),
          y = s(Math.round(t)),
          w = s(Math.round(n)),
          _ = s(Math.round(p.width - o));
        a.strokeStyle = "#C9C9C9", a.beginPath(), a.moveTo(w, x), a.lineTo(_, x), a.moveTo(w, x), a.lineTo(w, y), a.moveTo(w, y), a.lineTo(_, y), a.moveTo(_, x), a.lineTo(_, y), a.stroke(), a.save(), a.beginPath(), a.textAlign = "end", a.textBaseline = "middle";
        for (var b = 0, M = h.length; M > b; b++) {
          {
            a.measureText(h[b].value).width
          }
          h[b].show && (a.fillText(h[b].value, n - 8 * c, y + b * l + l / 2), a.moveTo(n - 4 * c, s(y + b * l + l / 2)), a.lineTo(n, s(y + b * l + l / 2)))
        }
        for (a.stroke(), a.restore(), b = 1, M = g; M > b; b++) a.beginPath(), b == -u / f ? (a.moveTo(s(v * b + n), y), a.lineTo(s(v * b + n), x), a.stroke()) : e(a, v * b + n, y, v * b + n, x, 3);
        a.save();
        this.options.coordinateMaxY;
        a.textAlign = "center", a.textBaseline = "top";
        for (a.beginPath(), b = 0; g >= b; b++) a.fillText(i(u + b * f, f), s(v * b + n), x + 7 * c), a.moveTo(s(v * b + n), x), a.lineTo(s(v * b + n), x + 5 * c), a.stroke();
        a.restore()
      }, t
    }();
  t.exports = a
}, function (t, i, n) {
  var o = n(9);
  t.exports = function () {
    var t = (this.options.dpr, this.options.canvas),
      i = this.options.context,
      n = this.options.series.datas,
      e = (this.options.yaxis, this.options.coordinate),
      s = this.options.sepeNum,
      r = this.options.unitHeight,
      a = this.options.padding.left,
      p = this.options.padding.right,
      h = this.options.padding.top,
      l = t.width - a - p,
      c = o(a + l / s * (-e.min / e.stepHeight)),
      d = this.options.color,
      u = (this.options.hoverColor, this.options.series.colors || ["#666666"]);
    i.save(), i.fillStyle = d, i.strokeStyle = d, i.beginPath();
    for (var f = 0, g = n.length; g > f; f++) {
      i.save();
      for (var m = 0, v = n[f].data.length; v > m; m++) {
        var x = n[f].data;
        i.fillStyle = u[f];
        for (var y = 0, w = 0; f > w; w++) {
          var _ = parseFloat(n[w].data[m]) || 0;
          y += _
        }
        var b = parseFloat(x[m]) || 0,
          M = c + l * Math.floor(y) / e.max,
          A = o(h + r * (m + .25)),
          k = Math.round(b / e.max * (l - (c - a)));
        k = k > 0 ? k + f : k;
        var T = Math.round(r / 2);
        i.fillRect(M, A, k, T)
      }
      i.restore()
    }
    i.restore()
  }
}, function (t, i, n) {
  var o = n(9);
  t.exports = function (t, i) {
    function n(t) {
      for (var i = 0, n = a.length; n > i; i++) {
        r.save();
        for (var e = 0, s = a[i].data.length; s > e; e++) {
          var p = a[i].data;
          r.fillStyle = y == e ? t ? x[i] : v[i] : x[i];
          for (var l = 0, u = 0; i > u; u++) {
            var w = parseFloat(a[u].data[e]) || 0;
            l += w
          }
          var _ = parseFloat(p[e]) || 0,
            b = m + g * Math.floor(l) / h.max,
            M = o(f + c * (e + .25)),
            A = Math.round(_ / h.max * (g - (m - d)));
          A = A > 0 ? A + i : A;
          var k = Math.round(c / 2);
          r.fillRect(b, M, A, k)
        }
        r.restore()
      }
    }
    var e = this.options.dpr,
      s = this.options.canvas,
      r = this.options.context,
      a = this.options.series.datas,
      p = this.options.yaxis,
      h = this.options.coordinate,
      l = this.options.sepeNum,
      c = this.options.unitHeight,
      d = this.options.padding.left,
      u = this.options.padding.right,
      f = this.options.padding.top,
      g = (this.options.padding.bottom, s.width - d - u),
      m = o(d + g / l * (-h.min / h.stepHeight)),
      v = this.options.rankColors,
      x = this.options.series.colors || ["#666666"],
      y = Math.floor((i * e - f) / c);
    if (y >= 0 && y < p.length) {
      var w = void 0 === this.options.series.suffix ? "" : this.options.series.suffix,
        _ = document.createElement("div");
      _.innerHTML = p[y].value;
      for (var b = document.createElement("div"), M = 0; M < a.length; M++) {
        var A = a[M].data[y];
        if ("" != A && "-" != A && null != A && void 0 != A) {
          var k = document.createElement("div"),
            T = document.createElement("span");
          T.innerHTML = a[M].name + " " + a[M].data[y] + w;
          var C = document.createElement("span");
          C.style.display = "inline-block", C.style.width = "6px", C.style.height = "6px", C.style.backgroundColor = x[M], C.style.borderRadius = "50%", C.style.marginRight = "5px", k.appendChild(C), k.appendChild(T), b.appendChild(k)
        }
      }
      if (this.options.tips) {
        var E = this.options.tips;
        E.innerHTML = "", d >= t * e || t * e >= d + g ? (this.options.tips.style.display = "none", this.options.tips.style.left = "-10000") : E.style.display = "block", E.appendChild(_), E.appendChild(b), E.style.left = t * e >= d + g / 2 ? t - E.clientWidth - 20 + "px" : t + 20 + "px", E.style.top = i * e <= f + E.clientHeight * e ? f + "px" : i - E.clientHeight + "px"
      } else {
        var S = document.createElement("div");
        S.appendChild(_), S.appendChild(b), this.container.appendChild(S), this.options.tips = S, S.style.position = "absolute", S.style.font = "12px/150% Simsun,arial,sans-serif", S.style.padding = "5px", S.style.backgroundColor = "#000", S.style.color = "#fff", S.style.borderRadius = "5px", S.style.opacity = "0.7", S.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)", S.style.left = t * e >= d + g / 2 ? t - S.clientWidth - 20 + "px" : t + 20 + "px", S.style.top = i * e <= f + S.clientHeight * e ? f + "px" : i - S.clientHeight + "px"
      }
      n()
    } else n(!0), this.options.tips && (this.options.tips.style.display = "none", this.options.tips.style.left = "-10000", y = 0 > y ? 0 : a.length - 1)
  }
}]);
