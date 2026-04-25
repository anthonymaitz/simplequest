var Et = Object.defineProperty;
var Ze = (n) => {
  throw TypeError(n);
};
var qt = (n, e, t) => e in n ? Et(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var b = (n, e, t) => qt(n, typeof e != "symbol" ? e + "" : e, t), Yt = (n, e, t) => e.has(n) || Ze("Cannot " + t);
var Ke = (n, e, t) => e.has(n) ? Ze("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t);
var ce = (n, e, t) => (Yt(n, e, "access private method"), t);
const zt = (n, e) => n === e, H = Symbol("solid-proxy"), Ye = Symbol("solid-track"), ye = {
  equals: zt
};
let it = ut;
const j = 1, me = 2, st = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var C = null;
let De = null, Ot = null, x = null, A = null, P = null, Re = 0;
function pe(n, e) {
  const t = x, o = C, a = n.length === 0, r = e === void 0 ? o : e, i = a ? st : {
    owned: null,
    cleanups: null,
    context: r ? r.context : null,
    owner: r
  }, s = a ? n : () => n(() => B(() => oe(i)));
  C = i, x = null;
  try {
    return V(s, !0);
  } finally {
    x = t, C = o;
  }
}
function Q(n, e) {
  e = e ? Object.assign({}, ye, e) : ye;
  const t = {
    value: n,
    observers: null,
    observerSlots: null,
    comparator: e.equals || void 0
  }, o = (a) => (typeof a == "function" && (a = a(t.value)), ct(t, a));
  return [lt.bind(t), o];
}
function T(n, e, t) {
  const o = je(n, e, !1, j);
  ie(o);
}
function ge(n, e, t) {
  it = Mt;
  const o = je(n, e, !1, j);
  o.user = !0, P ? P.push(o) : ie(o);
}
function L(n, e, t) {
  t = t ? Object.assign({}, ye, t) : ye;
  const o = je(n, e, !0, 0);
  return o.observers = null, o.observerSlots = null, o.comparator = t.equals || void 0, ie(o), lt.bind(o);
}
function It(n) {
  return V(n, !1);
}
function B(n) {
  if (x === null) return n();
  const e = x;
  x = null;
  try {
    return n();
  } finally {
    x = e;
  }
}
function Pt(n) {
  ge(() => B(n));
}
function Nt(n) {
  return C === null || (C.cleanups === null ? C.cleanups = [n] : C.cleanups.push(n)), n;
}
function ze() {
  return x;
}
function lt() {
  if (this.sources && this.state)
    if (this.state === j) ie(this);
    else {
      const n = A;
      A = null, V(() => we(this), !1), A = n;
    }
  if (x) {
    const n = this.observers ? this.observers.length : 0;
    x.sources ? (x.sources.push(this), x.sourceSlots.push(n)) : (x.sources = [this], x.sourceSlots = [n]), this.observers ? (this.observers.push(x), this.observerSlots.push(x.sources.length - 1)) : (this.observers = [x], this.observerSlots = [x.sources.length - 1]);
  }
  return this.value;
}
function ct(n, e, t) {
  let o = n.value;
  return (!n.comparator || !n.comparator(o, e)) && (n.value = e, n.observers && n.observers.length && V(() => {
    for (let a = 0; a < n.observers.length; a += 1) {
      const r = n.observers[a], i = De && De.running;
      i && De.disposed.has(r), (i ? !r.tState : !r.state) && (r.pure ? A.push(r) : P.push(r), r.observers && dt(r)), i || (r.state = j);
    }
    if (A.length > 1e6)
      throw A = [], new Error();
  }, !1)), e;
}
function ie(n) {
  if (!n.fn) return;
  oe(n);
  const e = Re;
  Lt(n, n.value, e);
}
function Lt(n, e, t) {
  let o;
  const a = C, r = x;
  x = C = n;
  try {
    o = n.fn(e);
  } catch (i) {
    return n.pure && (n.state = j, n.owned && n.owned.forEach(oe), n.owned = null), n.updatedAt = t + 1, ht(i);
  } finally {
    x = r, C = a;
  }
  (!n.updatedAt || n.updatedAt <= t) && (n.updatedAt != null && "observers" in n ? ct(n, o) : n.value = o, n.updatedAt = t);
}
function je(n, e, t, o = j, a) {
  const r = {
    fn: n,
    state: o,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: C,
    context: C ? C.context : null,
    pure: t
  };
  return C === null || C !== st && (C.owned ? C.owned.push(r) : C.owned = [r]), r;
}
function be(n) {
  if (n.state === 0) return;
  if (n.state === me) return we(n);
  if (n.suspense && B(n.suspense.inFallback)) return n.suspense.effects.push(n);
  const e = [n];
  for (; (n = n.owner) && (!n.updatedAt || n.updatedAt < Re); )
    n.state && e.push(n);
  for (let t = e.length - 1; t >= 0; t--)
    if (n = e[t], n.state === j)
      ie(n);
    else if (n.state === me) {
      const o = A;
      A = null, V(() => we(n, e[0]), !1), A = o;
    }
}
function V(n, e) {
  if (A) return n();
  let t = !1;
  e || (A = []), P ? t = !0 : P = [], Re++;
  try {
    const o = n();
    return jt(t), o;
  } catch (o) {
    t || (P = null), A = null, ht(o);
  }
}
function jt(n) {
  if (A && (ut(A), A = null), n) return;
  const e = P;
  P = null, e.length && V(() => it(e), !1);
}
function ut(n) {
  for (let e = 0; e < n.length; e++) be(n[e]);
}
function Mt(n) {
  let e, t = 0;
  for (e = 0; e < n.length; e++) {
    const o = n[e];
    o.user ? n[t++] = o : be(o);
  }
  for (e = 0; e < t; e++) be(n[e]);
}
function we(n, e) {
  n.state = 0;
  for (let t = 0; t < n.sources.length; t += 1) {
    const o = n.sources[t];
    if (o.sources) {
      const a = o.state;
      a === j ? o !== e && (!o.updatedAt || o.updatedAt < Re) && be(o) : a === me && we(o, e);
    }
  }
}
function dt(n) {
  for (let e = 0; e < n.observers.length; e += 1) {
    const t = n.observers[e];
    t.state || (t.state = me, t.pure ? A.push(t) : P.push(t), t.observers && dt(t));
  }
}
function oe(n) {
  let e;
  if (n.sources)
    for (; n.sources.length; ) {
      const t = n.sources.pop(), o = n.sourceSlots.pop(), a = t.observers;
      if (a && a.length) {
        const r = a.pop(), i = t.observerSlots.pop();
        o < a.length && (r.sourceSlots[i] = o, a[o] = r, t.observerSlots[o] = i);
      }
    }
  if (n.tOwned) {
    for (e = n.tOwned.length - 1; e >= 0; e--) oe(n.tOwned[e]);
    delete n.tOwned;
  }
  if (n.owned) {
    for (e = n.owned.length - 1; e >= 0; e--) oe(n.owned[e]);
    n.owned = null;
  }
  if (n.cleanups) {
    for (e = n.cleanups.length - 1; e >= 0; e--) n.cleanups[e]();
    n.cleanups = null;
  }
  n.state = 0;
}
function Ht(n) {
  return n instanceof Error ? n : new Error(typeof n == "string" ? n : "Unknown error", {
    cause: n
  });
}
function ht(n, e = C) {
  throw Ht(n);
}
const Bt = Symbol("fallback");
function Qe(n) {
  for (let e = 0; e < n.length; e++) n[e]();
}
function Ft(n, e, t = {}) {
  let o = [], a = [], r = [], i = 0, s = e.length > 1 ? [] : null;
  return Nt(() => Qe(r)), () => {
    let l = n() || [], c = l.length, u, d;
    return l[Ye], B(() => {
      let h, k, v, R, N, S, D, E, q;
      if (c === 0)
        i !== 0 && (Qe(r), r = [], o = [], a = [], i = 0, s && (s = [])), t.fallback && (o = [Bt], a[0] = pe(($t) => (r[0] = $t, t.fallback())), i = 1);
      else if (i === 0) {
        for (a = new Array(c), d = 0; d < c; d++)
          o[d] = l[d], a[d] = pe(f);
        i = c;
      } else {
        for (v = new Array(c), R = new Array(c), s && (N = new Array(c)), S = 0, D = Math.min(i, c); S < D && o[S] === l[S]; S++) ;
        for (D = i - 1, E = c - 1; D >= S && E >= S && o[D] === l[E]; D--, E--)
          v[E] = a[D], R[E] = r[D], s && (N[E] = s[D]);
        for (h = /* @__PURE__ */ new Map(), k = new Array(E + 1), d = E; d >= S; d--)
          q = l[d], u = h.get(q), k[d] = u === void 0 ? -1 : u, h.set(q, d);
        for (u = S; u <= D; u++)
          q = o[u], d = h.get(q), d !== void 0 && d !== -1 ? (v[d] = a[u], R[d] = r[u], s && (N[d] = s[u]), d = k[d], h.set(q, d)) : r[u]();
        for (d = S; d < c; d++)
          d in v ? (a[d] = v[d], r[d] = R[d], s && (s[d] = N[d], s[d](d))) : a[d] = pe(f);
        a = a.slice(0, i = c), o = l.slice(0);
      }
      return a;
    });
    function f(h) {
      if (r[d] = h, s) {
        const [k, v] = Q(d);
        return s[d] = v, e(l[d], k);
      }
      return e(l[d]);
    }
  };
}
function m(n, e) {
  return B(() => n(e || {}));
}
const Gt = (n) => `Stale read from <${n}>.`;
function M(n) {
  const e = "fallback" in n && {
    fallback: () => n.fallback
  };
  return L(Ft(() => n.each, n.children, e || void 0));
}
function J(n) {
  const e = n.keyed, t = L(() => n.when, void 0, void 0), o = e ? t : L(t, void 0, {
    equals: (a, r) => !a == !r
  });
  return L(() => {
    const a = o();
    if (a) {
      const r = n.children;
      return typeof r == "function" && r.length > 0 ? B(() => r(e ? a : () => {
        if (!B(o)) throw Gt("Show");
        return t();
      })) : r;
    }
    return n.fallback;
  }, void 0, void 0);
}
const Y = (n) => L(() => n());
function Ut(n, e, t) {
  let o = t.length, a = e.length, r = o, i = 0, s = 0, l = e[a - 1].nextSibling, c = null;
  for (; i < a || s < r; ) {
    if (e[i] === t[s]) {
      i++, s++;
      continue;
    }
    for (; e[a - 1] === t[r - 1]; )
      a--, r--;
    if (a === i) {
      const u = r < o ? s ? t[s - 1].nextSibling : t[r - s] : l;
      for (; s < r; ) n.insertBefore(t[s++], u);
    } else if (r === s)
      for (; i < a; )
        (!c || !c.has(e[i])) && e[i].remove(), i++;
    else if (e[i] === t[r - 1] && t[s] === e[a - 1]) {
      const u = e[--a].nextSibling;
      n.insertBefore(t[s++], e[i++].nextSibling), n.insertBefore(t[--r], u), e[a] = t[r];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let d = s;
        for (; d < r; ) c.set(t[d], d++);
      }
      const u = c.get(e[i]);
      if (u != null)
        if (s < u && u < r) {
          let d = i, f = 1, h;
          for (; ++d < a && d < r && !((h = c.get(e[d])) == null || h !== u + f); )
            f++;
          if (f > u - s) {
            const k = e[i];
            for (; s < u; ) n.insertBefore(t[s++], k);
          } else n.replaceChild(t[s++], e[i++]);
        } else i++;
      else e[i++].remove();
    }
  }
}
const Ve = "_$DX_DELEGATE";
function w(n, e, t, o) {
  let a;
  const r = () => {
    const s = document.createElement("template");
    return s.innerHTML = n, s.content.firstChild;
  }, i = () => (a || (a = r())).cloneNode(!0);
  return i.cloneNode = i, i;
}
function U(n, e = window.document) {
  const t = e[Ve] || (e[Ve] = /* @__PURE__ */ new Set());
  for (let o = 0, a = n.length; o < a; o++) {
    const r = n[o];
    t.has(r) || (t.add(r), e.addEventListener(r, Zt));
  }
}
function Wt(n, e, t) {
  n.removeAttribute(e);
}
function Oe(n, e, t, o) {
  Array.isArray(t) ? (n[`$$${e}`] = t[0], n[`$$${e}Data`] = t[1]) : n[`$$${e}`] = t;
}
function ue(n, e, t) {
  if (!e) return t ? Wt(n, "style") : e;
  const o = n.style;
  if (typeof e == "string") return o.cssText = e;
  typeof t == "string" && (o.cssText = t = void 0), t || (t = {}), e || (e = {});
  let a, r;
  for (r in t)
    e[r] == null && o.removeProperty(r), delete t[r];
  for (r in e)
    a = e[r], a !== t[r] && (o.setProperty(r, a), t[r] = a);
  return t;
}
function _(n, e, t) {
  t != null ? n.style.setProperty(e, t) : n.style.removeProperty(e);
}
function p(n, e, t, o) {
  if (t !== void 0 && !o && (o = []), typeof e != "function") return ke(n, e, o, t);
  T((a) => ke(n, e(), a, t), o);
}
function Zt(n) {
  let e = n.target;
  const t = `$$${n.type}`, o = n.target, a = n.currentTarget, r = (l) => Object.defineProperty(n, "target", {
    configurable: !0,
    value: l
  }), i = () => {
    const l = e[t];
    if (l && !e.disabled) {
      const c = e[`${t}Data`];
      if (c !== void 0 ? l.call(e, c, n) : l.call(e, n), n.cancelBubble) return;
    }
    return e.host && typeof e.host != "string" && !e.host._$host && e.contains(n.target) && r(e.host), !0;
  }, s = () => {
    for (; i() && (e = e._$host || e.parentNode || e.host); ) ;
  };
  if (Object.defineProperty(n, "currentTarget", {
    configurable: !0,
    get() {
      return e || document;
    }
  }), n.composedPath) {
    const l = n.composedPath();
    r(l[0]);
    for (let c = 0; c < l.length - 2 && (e = l[c], !!i()); c++) {
      if (e._$host) {
        e = e._$host, s();
        break;
      }
      if (e.parentNode === a)
        break;
    }
  } else s();
  r(o);
}
function ke(n, e, t, o, a) {
  for (; typeof t == "function"; ) t = t();
  if (e === t) return t;
  const r = typeof e, i = o !== void 0;
  if (n = i && t[0] && t[0].parentNode || n, r === "string" || r === "number") {
    if (r === "number" && (e = e.toString(), e === t))
      return t;
    if (i) {
      let s = t[0];
      s && s.nodeType === 3 ? s.data !== e && (s.data = e) : s = document.createTextNode(e), t = Z(n, t, o, s);
    } else
      t !== "" && typeof t == "string" ? t = n.firstChild.data = e : t = n.textContent = e;
  } else if (e == null || r === "boolean")
    t = Z(n, t, o);
  else {
    if (r === "function")
      return T(() => {
        let s = e();
        for (; typeof s == "function"; ) s = s();
        t = ke(n, s, t, o);
      }), () => t;
    if (Array.isArray(e)) {
      const s = [], l = t && Array.isArray(t);
      if (Ie(s, e, t, a))
        return T(() => t = ke(n, s, t, o, !0)), () => t;
      if (s.length === 0) {
        if (t = Z(n, t, o), i) return t;
      } else l ? t.length === 0 ? Xe(n, s, o) : Ut(n, t, s) : (t && Z(n), Xe(n, s));
      t = s;
    } else if (e.nodeType) {
      if (Array.isArray(t)) {
        if (i) return t = Z(n, t, o, e);
        Z(n, t, null, e);
      } else t == null || t === "" || !n.firstChild ? n.appendChild(e) : n.replaceChild(e, n.firstChild);
      t = e;
    }
  }
  return t;
}
function Ie(n, e, t, o) {
  let a = !1;
  for (let r = 0, i = e.length; r < i; r++) {
    let s = e[r], l = t && t[n.length], c;
    if (!(s == null || s === !0 || s === !1)) if ((c = typeof s) == "object" && s.nodeType)
      n.push(s);
    else if (Array.isArray(s))
      a = Ie(n, s, l) || a;
    else if (c === "function")
      if (o) {
        for (; typeof s == "function"; ) s = s();
        a = Ie(n, Array.isArray(s) ? s : [s], Array.isArray(l) ? l : [l]) || a;
      } else
        n.push(s), a = !0;
    else {
      const u = String(s);
      l && l.nodeType === 3 && l.data === u ? n.push(l) : n.push(document.createTextNode(u));
    }
  }
  return a;
}
function Xe(n, e, t = null) {
  for (let o = 0, a = e.length; o < a; o++) n.insertBefore(e[o], t);
}
function Z(n, e, t, o) {
  if (t === void 0) return n.textContent = "";
  const a = o || document.createTextNode("");
  if (e.length) {
    let r = !1;
    for (let i = e.length - 1; i >= 0; i--) {
      const s = e[i];
      if (a !== s) {
        const l = s.parentNode === n;
        !r && !i ? l ? n.replaceChild(a, s) : n.insertBefore(a, t) : l && s.remove();
      } else r = !0;
    }
  } else n.insertBefore(a, t);
  return [a];
}
function Kt(n) {
  return Object.keys(n).reduce((t, o) => {
    const a = n[o];
    return t[o] = Object.assign({}, a), pt(a.value) && !en(a.value) && !Array.isArray(a.value) && (t[o].value = Object.assign({}, a.value)), Array.isArray(a.value) && (t[o].value = a.value.slice(0)), t;
  }, {});
}
function Qt(n) {
  return n ? Object.keys(n).reduce((t, o) => {
    const a = n[o];
    return t[o] = pt(a) && "value" in a ? a : {
      value: a
    }, t[o].attribute || (t[o].attribute = Jt(o)), t[o].parse = "parse" in t[o] ? t[o].parse : typeof t[o].value != "string", t;
  }, {}) : {};
}
function Vt(n) {
  return Object.keys(n).reduce((t, o) => (t[o] = n[o].value, t), {});
}
function Xt(n, e) {
  const t = Kt(e);
  return Object.keys(e).forEach((a) => {
    const r = t[a], i = n.getAttribute(r.attribute), s = n[a];
    i != null && (r.value = r.parse ? ft(i) : i), s != null && (r.value = Array.isArray(s) ? s.slice(0) : s), r.reflect && Je(n, r.attribute, r.value, !!r.parse), Object.defineProperty(n, a, {
      get() {
        return r.value;
      },
      set(l) {
        const c = r.value;
        r.value = l, r.reflect && Je(this, r.attribute, r.value, !!r.parse);
        for (let u = 0, d = this.__propertyChangedCallbacks.length; u < d; u++)
          this.__propertyChangedCallbacks[u](a, l, c);
      },
      enumerable: !0,
      configurable: !0
    });
  }), t;
}
function ft(n) {
  if (n)
    try {
      return JSON.parse(n);
    } catch {
      return n;
    }
}
function Je(n, e, t, o) {
  if (t == null || t === !1) return n.removeAttribute(e);
  let a = o ? JSON.stringify(t) : t;
  n.__updating[e] = !0, a === "true" && (a = ""), n.setAttribute(e, a), Promise.resolve().then(() => delete n.__updating[e]);
}
function Jt(n) {
  return n.replace(/\.?([A-Z]+)/g, (e, t) => "-" + t.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function pt(n) {
  return n != null && (typeof n == "object" || typeof n == "function");
}
function en(n) {
  return Object.prototype.toString.call(n) === "[object Function]";
}
function tn(n) {
  return typeof n == "function" && n.toString().indexOf("class") === 0;
}
let $e;
function nn(n, e) {
  const t = Object.keys(e);
  return class extends n {
    static get observedAttributes() {
      return t.map((a) => e[a].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
      for (let a of t)
        this[a] = void 0;
    }
    connectedCallback() {
      if (this.__initialized) return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Xt(this, e);
      const a = Vt(this.props), r = this.Component, i = $e;
      try {
        $e = this, this.__initialized = !0, tn(r) ? new r(a, {
          element: this
        }) : r(a, {
          element: this
        });
      } finally {
        $e = i;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected) return;
      this.__propertyChangedCallbacks.length = 0;
      let a = null;
      for (; a = this.__releaseCallbacks.pop(); ) a(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(a, r, i) {
      if (this.__initialized && !this.__updating[a] && (a = this.lookupProp(a), a in e)) {
        if (i == null && !this[a]) return;
        this[a] = e[a].parse ? ft(i) : i;
      }
    }
    lookupProp(a) {
      if (e)
        return t.find((r) => a === r || a === e[r].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(a) {
      this.__releaseCallbacks.push(a);
    }
    addPropertyChangedCallback(a) {
      this.__propertyChangedCallbacks.push(a);
    }
  };
}
function on(n, e = {}, t = {}) {
  const {
    BaseElement: o = HTMLElement,
    extension: a,
    customElements: r = window.customElements
  } = t;
  return (i) => {
    let s = r.get(n);
    return s ? (s.prototype.Component = i, s) : (s = nn(o, Qt(e)), s.prototype.Component = i, s.prototype.registeredTag = n, r.define(n, s, a), s);
  };
}
function an(n) {
  const e = Object.keys(n), t = {};
  for (let o = 0; o < e.length; o++) {
    const [a, r] = Q(n[e[o]]);
    Object.defineProperty(t, e[o], {
      get: a,
      set(i) {
        r(() => i);
      }
    });
  }
  return t;
}
function rn(n) {
  if (n.assignedSlot && n.assignedSlot._$owner) return n.assignedSlot._$owner;
  let e = n.parentNode;
  for (; e && !e._$owner && !(e.assignedSlot && e.assignedSlot._$owner); )
    e = e.parentNode;
  return e && e.assignedSlot ? e.assignedSlot._$owner : n._$owner;
}
function sn(n) {
  return (e, t) => {
    const { element: o } = t;
    return pe((a) => {
      const r = an(e);
      o.addPropertyChangedCallback((s, l) => r[s] = l), o.addReleaseCallback(() => {
        o.renderRoot.textContent = "", a();
      });
      const i = n(r, t);
      return p(o.renderRoot, i);
    }, rn(o));
  };
}
function ln(n, e, t) {
  return arguments.length === 2 && (t = e, e = {}), on(n, e)(sn(t));
}
const Pe = Symbol("store-raw"), K = Symbol("store-node"), I = Symbol("store-has"), gt = Symbol("store-self");
function yt(n) {
  let e = n[H];
  if (!e && (Object.defineProperty(n, H, {
    value: e = new Proxy(n, dn)
  }), !Array.isArray(n))) {
    const t = Object.keys(n), o = Object.getOwnPropertyDescriptors(n);
    for (let a = 0, r = t.length; a < r; a++) {
      const i = t[a];
      o[i].get && Object.defineProperty(n, i, {
        enumerable: o[i].enumerable,
        get: o[i].get.bind(e)
      });
    }
  }
  return e;
}
function ve(n) {
  let e;
  return n != null && typeof n == "object" && (n[H] || !(e = Object.getPrototypeOf(n)) || e === Object.prototype || Array.isArray(n));
}
function ae(n, e = /* @__PURE__ */ new Set()) {
  let t, o, a, r;
  if (t = n != null && n[Pe]) return t;
  if (!ve(n) || e.has(n)) return n;
  if (Array.isArray(n)) {
    Object.isFrozen(n) ? n = n.slice(0) : e.add(n);
    for (let i = 0, s = n.length; i < s; i++)
      a = n[i], (o = ae(a, e)) !== a && (n[i] = o);
  } else {
    Object.isFrozen(n) ? n = Object.assign({}, n) : e.add(n);
    const i = Object.keys(n), s = Object.getOwnPropertyDescriptors(n);
    for (let l = 0, c = i.length; l < c; l++)
      r = i[l], !s[r].get && (a = n[r], (o = ae(a, e)) !== a && (n[r] = o));
  }
  return n;
}
function xe(n, e) {
  let t = n[e];
  return t || Object.defineProperty(n, e, {
    value: t = /* @__PURE__ */ Object.create(null)
  }), t;
}
function re(n, e, t) {
  if (n[e]) return n[e];
  const [o, a] = Q(t, {
    equals: !1,
    internal: !0
  });
  return o.$ = a, n[e] = o;
}
function cn(n, e) {
  const t = Reflect.getOwnPropertyDescriptor(n, e);
  return !t || t.get || !t.configurable || e === H || e === K || (delete t.value, delete t.writable, t.get = () => n[H][e]), t;
}
function mt(n) {
  ze() && re(xe(n, K), gt)();
}
function un(n) {
  return mt(n), Reflect.ownKeys(n);
}
const dn = {
  get(n, e, t) {
    if (e === Pe) return n;
    if (e === H) return t;
    if (e === Ye)
      return mt(n), t;
    const o = xe(n, K), a = o[e];
    let r = a ? a() : n[e];
    if (e === K || e === I || e === "__proto__") return r;
    if (!a) {
      const i = Object.getOwnPropertyDescriptor(n, e);
      ze() && (typeof r != "function" || n.hasOwnProperty(e)) && !(i && i.get) && (r = re(o, e, r)());
    }
    return ve(r) ? yt(r) : r;
  },
  has(n, e) {
    return e === Pe || e === H || e === Ye || e === K || e === I || e === "__proto__" ? !0 : (ze() && re(xe(n, I), e)(), e in n);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: un,
  getOwnPropertyDescriptor: cn
};
function _e(n, e, t, o = !1) {
  if (!o && n[e] === t) return;
  const a = n[e], r = n.length;
  t === void 0 ? (delete n[e], n[I] && n[I][e] && a !== void 0 && n[I][e].$()) : (n[e] = t, n[I] && n[I][e] && a === void 0 && n[I][e].$());
  let i = xe(n, K), s;
  if ((s = re(i, e, a)) && s.$(() => t), Array.isArray(n) && n.length !== r) {
    for (let l = n.length; l < r; l++) (s = i[l]) && s.$();
    (s = re(i, "length", r)) && s.$(n.length);
  }
  (s = i[gt]) && s.$();
}
function bt(n, e) {
  const t = Object.keys(e);
  for (let o = 0; o < t.length; o += 1) {
    const a = t[o];
    _e(n, a, e[a]);
  }
}
function hn(n, e) {
  if (typeof e == "function" && (e = e(n)), e = ae(e), Array.isArray(e)) {
    if (n === e) return;
    let t = 0, o = e.length;
    for (; t < o; t++) {
      const a = e[t];
      n[t] !== a && _e(n, t, a);
    }
    _e(n, "length", o);
  } else bt(n, e);
}
function ee(n, e, t = []) {
  let o, a = n;
  if (e.length > 1) {
    o = e.shift();
    const i = typeof o, s = Array.isArray(n);
    if (Array.isArray(o)) {
      for (let l = 0; l < o.length; l++)
        ee(n, [o[l]].concat(e), t);
      return;
    } else if (s && i === "function") {
      for (let l = 0; l < n.length; l++)
        o(n[l], l) && ee(n, [l].concat(e), t);
      return;
    } else if (s && i === "object") {
      const {
        from: l = 0,
        to: c = n.length - 1,
        by: u = 1
      } = o;
      for (let d = l; d <= c; d += u)
        ee(n, [d].concat(e), t);
      return;
    } else if (e.length > 1) {
      ee(n[o], e, [o].concat(t));
      return;
    }
    a = n[o], t = [o].concat(t);
  }
  let r = e[0];
  typeof r == "function" && (r = r(a, t), r === a) || o === void 0 && r == null || (r = ae(r), o === void 0 || ve(a) && ve(r) && !Array.isArray(r) ? bt(a, r) : _e(n, o, r));
}
function fn(...[n, e]) {
  const t = ae(n || {}), o = Array.isArray(t), a = yt(t);
  function r(...i) {
    It(() => {
      o && i.length === 1 ? hn(t, i[0]) : ee(t, i);
    });
  }
  return [a, r];
}
const et = "simplequest-characters", pn = {
  name: "",
  personality: "",
  class: "",
  profession: "",
  combat: "inGeneral",
  energy: Array(10).fill(!1),
  hp: 10,
  die: "d6",
  round: 0,
  usedAbilities: [],
  selectedAbility: null,
  gmMode: !1,
  savedCharacters: {}
};
function gn() {
  const [n, e] = fn(
    structuredClone(pn)
  );
  function t(i) {
    e("energy", (s) => s.map((l, c) => c <= i));
  }
  function o() {
    try {
      const i = localStorage.getItem(et);
      i && e("savedCharacters", JSON.parse(i));
    } catch {
    }
  }
  function a() {
    if (!n.name) return;
    const { gmMode: i, savedCharacters: s, ...l } = n, c = { ...n.savedCharacters, [n.name]: l };
    e("savedCharacters", c);
    try {
      localStorage.setItem(et, JSON.stringify(c));
    } catch {
    }
  }
  function r(i) {
    const s = n.savedCharacters[i];
    s && e({ ...s });
  }
  return { state: n, setState: e, setEnergy: t, loadFromStorage: o, saveCharacter: a, loadCharacter: r };
}
var yn = /* @__PURE__ */ w('<div style=display:flex;align-items:center;gap:6px><label style=color:var(--sq-overlay-text-muted);font-size:12px;text-transform:uppercase;letter-spacing:1px>HP</label><select style="background:var(--sq-ctrl-bg);border:1px solid var(--sq-ctrl-border);color:var(--sq-ctrl-text);border-radius:4px;padding:4px 8px;font-size:13px;font-family:inherit;cursor:pointer">'), mn = /* @__PURE__ */ w("<option>");
function bn(n) {
  const e = Array.from({
    length: 31
  }, (t, o) => o);
  return (() => {
    var t = yn(), o = t.firstChild, a = o.nextSibling;
    return a.addEventListener("change", (r) => n.onHpChange(parseInt(r.currentTarget.value, 10))), p(a, () => e.map((r) => (() => {
      var i = mn();
      return i.value = r, p(i, r), i;
    })())), T(() => a.value = n.hp), t;
  })();
}
var wn = /* @__PURE__ */ w("<div style=display:flex;gap:5px;align-items:center>"), kn = /* @__PURE__ */ w('<div style="width:14px;height:14px;border-radius:50%;cursor:pointer;transition:background 0.15s, border-color 0.15s">');
function vn(n) {
  return (() => {
    var e = wn();
    return p(e, m(M, {
      get each() {
        return n.energy;
      },
      children: (t, o) => (() => {
        var a = kn();
        return a.$$click = () => n.onEnergyClick(o()), _(a, "background", t ? "var(--sq-overlay-text)" : "var(--sq-dot-empty-bg)"), _(a, "border", `2px solid ${t ? "var(--sq-overlay-text)" : "var(--sq-dot-empty-border)"}`), a;
      })()
    })), e;
  })();
}
U(["click"]);
var xn = /* @__PURE__ */ w('<div style="background:var(--sq-row-1);border-bottom:1px solid var(--sq-row-border);position:sticky;top:0;z-index:100"><div style="padding:8px 14px 2px;font-size:13px;color:var(--sq-ctrl-text);text-transform:capitalize;user-select:none;-webkit-user-select:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></div><div style="padding:4px 14px 10px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">');
function _n(n) {
  const e = () => [n.name, n.charClass, n.profession, n.personality].filter(Boolean).join(" · ");
  return (() => {
    var t = xn(), o = t.firstChild, a = o.nextSibling;
    return p(o, e), p(a, m(bn, {
      get hp() {
        return n.hp;
      },
      get onHpChange() {
        return n.onHpChange;
      }
    }), null), p(a, m(vn, {
      get energy() {
        return n.energy;
      },
      get onEnergyClick() {
        return n.onEnergyClick;
      }
    }), null), t;
  })();
}
var Cn = /* @__PURE__ */ w('<div style="background:var(--sq-row-2);border-bottom:1px solid var(--sq-row-border);padding:10px 14px;display:flex;gap:8px;flex-wrap:wrap"><input type=text placeholder="Character name"><select><option value>Personality</option></select><select><option value>Class</option></select><select><option value>Profession'), Ee = /* @__PURE__ */ w("<option>");
const qe = {
  background: "var(--sq-ctrl-bg)",
  border: "1px solid var(--sq-ctrl-border)",
  color: "var(--sq-ctrl-text)",
  "border-radius": "4px",
  padding: "5px 8px",
  "font-size": "13px",
  "font-family": "inherit",
  cursor: "pointer",
  flex: "1",
  "min-width": "0",
  "text-transform": "capitalize"
}, Tn = {
  background: "var(--sq-ctrl-bg)",
  border: "1px solid var(--sq-ctrl-border)",
  color: "var(--sq-ctrl-text)",
  "border-radius": "4px",
  padding: "5px 8px",
  "font-size": "13px",
  "font-family": "inherit",
  flex: "1",
  "min-width": "0",
  outline: "none"
};
function An(n) {
  return (() => {
    var e = Cn(), t = e.firstChild, o = t.nextSibling;
    o.firstChild;
    var a = o.nextSibling;
    a.firstChild;
    var r = a.nextSibling;
    return r.firstChild, t.$$input = (i) => n.onNameChange(i.currentTarget.value), ue(t, Tn), o.addEventListener("change", (i) => n.onPersonalityChange(i.currentTarget.value)), p(o, m(M, {
      get each() {
        return n.personalities;
      },
      children: (i) => (() => {
        var s = Ee();
        return s.value = i, p(s, i), s;
      })()
    }), null), a.addEventListener("change", (i) => n.onClassChange(i.currentTarget.value)), p(a, m(M, {
      get each() {
        return n.classes;
      },
      children: (i) => (() => {
        var s = Ee();
        return s.value = i, p(s, i), s;
      })()
    }), null), r.addEventListener("change", (i) => n.onProfessionChange(i.currentTarget.value)), p(r, m(M, {
      get each() {
        return n.professions;
      },
      children: (i) => (() => {
        var s = Ee();
        return s.value = i, p(s, i), s;
      })()
    }), null), T((i) => {
      var s = qe, l = qe, c = qe;
      return i.e = ue(o, s, i.e), i.t = ue(a, l, i.t), i.a = ue(r, c, i.a), i;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), T(() => t.value = n.name), T(() => o.value = n.personality), T(() => a.value = n.charClass), T(() => r.value = n.profession), e;
  })();
}
U(["input"]);
var Rn = /* @__PURE__ */ w('<div style="background:var(--sq-row-2);border-bottom:1px solid var(--sq-row-border);padding:8px 14px"><div style=display:flex;gap:4px;flex-wrap:wrap></div><div style=color:var(--sq-overlay-text);font-size:11px;opacity:0.7;margin-top:4px;min-height:14px>'), Sn = /* @__PURE__ */ w('<button style="border-radius:4px;padding:4px 12px;font-size:12px;font-family:inherit;cursor:pointer;transition:all 0.1s">');
function Dn(n) {
  const e = L(() => n.statuses.find((t) => t.id === n.combat));
  return (() => {
    var t = Rn(), o = t.firstChild, a = o.nextSibling;
    return p(o, m(M, {
      get each() {
        return n.statuses;
      },
      children: (r) => {
        const i = () => n.combat === r.id;
        return (() => {
          var s = Sn();
          return s.$$click = () => n.onChange(r.id), p(s, () => r.label), T((l) => {
            var c = i() ? "var(--sq-accent)" : "var(--sq-ctrl-bg)", u = i() ? "#ffffff" : "var(--sq-ctrl-text)", d = `1px solid ${i() ? "var(--sq-accent)" : "var(--sq-ctrl-border)"}`, f = i() ? "600" : "400";
            return c !== l.e && _(s, "background", l.e = c), u !== l.t && _(s, "color", l.t = u), d !== l.a && _(s, "border", l.a = d), f !== l.o && _(s, "font-weight", l.o = f), l;
          }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0
          }), s;
        })();
      }
    })), p(a, () => {
      var r;
      return ((r = e()) == null ? void 0 : r.message) ?? "";
    }), t;
  })();
}
U(["click"]);
function Me() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let W = Me();
function wt(n) {
  W = n;
}
const kt = /[&<>"']/, $n = new RegExp(kt.source, "g"), vt = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, En = new RegExp(vt.source, "g"), qn = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, tt = (n) => qn[n];
function $(n, e) {
  if (e) {
    if (kt.test(n))
      return n.replace($n, tt);
  } else if (vt.test(n))
    return n.replace(En, tt);
  return n;
}
const Yn = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function zn(n) {
  return n.replace(Yn, (e, t) => (t = t.toLowerCase(), t === "colon" ? ":" : t.charAt(0) === "#" ? t.charAt(1) === "x" ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""));
}
const On = /(^|[^\[])\^/g;
function y(n, e) {
  let t = typeof n == "string" ? n : n.source;
  e = e || "";
  const o = {
    replace: (a, r) => {
      let i = typeof r == "string" ? r : r.source;
      return i = i.replace(On, "$1"), t = t.replace(a, i), o;
    },
    getRegex: () => new RegExp(t, e)
  };
  return o;
}
function nt(n) {
  try {
    n = encodeURI(n).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return n;
}
const te = { exec: () => null };
function ot(n, e) {
  const t = n.replace(/\|/g, (r, i, s) => {
    let l = !1, c = i;
    for (; --c >= 0 && s[c] === "\\"; )
      l = !l;
    return l ? "|" : " |";
  }), o = t.split(/ \|/);
  let a = 0;
  if (o[0].trim() || o.shift(), o.length > 0 && !o[o.length - 1].trim() && o.pop(), e)
    if (o.length > e)
      o.splice(e);
    else
      for (; o.length < e; )
        o.push("");
  for (; a < o.length; a++)
    o[a] = o[a].trim().replace(/\\\|/g, "|");
  return o;
}
function de(n, e, t) {
  const o = n.length;
  if (o === 0)
    return "";
  let a = 0;
  for (; a < o && n.charAt(o - a - 1) === e; )
    a++;
  return n.slice(0, o - a);
}
function In(n, e) {
  if (n.indexOf(e[1]) === -1)
    return -1;
  let t = 0;
  for (let o = 0; o < n.length; o++)
    if (n[o] === "\\")
      o++;
    else if (n[o] === e[0])
      t++;
    else if (n[o] === e[1] && (t--, t < 0))
      return o;
  return -1;
}
function at(n, e, t, o) {
  const a = e.href, r = e.title ? $(e.title) : null, i = n[1].replace(/\\([\[\]])/g, "$1");
  if (n[0].charAt(0) !== "!") {
    o.state.inLink = !0;
    const s = {
      type: "link",
      raw: t,
      href: a,
      title: r,
      text: i,
      tokens: o.inlineTokens(i)
    };
    return o.state.inLink = !1, s;
  }
  return {
    type: "image",
    raw: t,
    href: a,
    title: r,
    text: $(i)
  };
}
function Pn(n, e) {
  const t = n.match(/^(\s+)(?:```)/);
  if (t === null)
    return e;
  const o = t[1];
  return e.split(`
`).map((a) => {
    const r = a.match(/^\s+/);
    if (r === null)
      return a;
    const [i] = r;
    return i.length >= o.length ? a.slice(o.length) : a;
  }).join(`
`);
}
class Ce {
  // set by the lexer
  constructor(e) {
    b(this, "options");
    b(this, "rules");
    // set by the lexer
    b(this, "lexer");
    this.options = e || W;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const o = t[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? o : de(o, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const o = t[0], a = Pn(o, t[3] || "");
      return {
        type: "code",
        raw: o,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: a
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let o = t[2].trim();
      if (/#$/.test(o)) {
        const a = de(o, "#");
        (this.options.pedantic || !a || / $/.test(a)) && (o = a.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: o,
        tokens: this.lexer.inline(o)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: t[0]
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let o = t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, `
    $1`);
      o = de(o.replace(/^ *>[ \t]?/gm, ""), `
`);
      const a = this.lexer.state.top;
      this.lexer.state.top = !0;
      const r = this.lexer.blockTokens(o);
      return this.lexer.state.top = a, {
        type: "blockquote",
        raw: t[0],
        tokens: r,
        text: o
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let o = t[1].trim();
      const a = o.length > 1, r = {
        type: "list",
        raw: "",
        ordered: a,
        start: a ? +o.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      o = a ? `\\d{1,9}\\${o.slice(-1)}` : `\\${o}`, this.options.pedantic && (o = a ? o : "[*+-]");
      const i = new RegExp(`^( {0,3}${o})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let s = "", l = "", c = !1;
      for (; e; ) {
        let u = !1;
        if (!(t = i.exec(e)) || this.rules.block.hr.test(e))
          break;
        s = t[0], e = e.substring(s.length);
        let d = t[2].split(`
`, 1)[0].replace(/^\t+/, (N) => " ".repeat(3 * N.length)), f = e.split(`
`, 1)[0], h = 0;
        this.options.pedantic ? (h = 2, l = d.trimStart()) : (h = t[2].search(/[^ ]/), h = h > 4 ? 1 : h, l = d.slice(h), h += t[1].length);
        let k = !1;
        if (!d && /^ *$/.test(f) && (s += f + `
`, e = e.substring(f.length + 1), u = !0), !u) {
          const N = new RegExp(`^ {0,${Math.min(3, h - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), S = new RegExp(`^ {0,${Math.min(3, h - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), D = new RegExp(`^ {0,${Math.min(3, h - 1)}}(?:\`\`\`|~~~)`), E = new RegExp(`^ {0,${Math.min(3, h - 1)}}#`);
          for (; e; ) {
            const q = e.split(`
`, 1)[0];
            if (f = q, this.options.pedantic && (f = f.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), D.test(f) || E.test(f) || N.test(f) || S.test(e))
              break;
            if (f.search(/[^ ]/) >= h || !f.trim())
              l += `
` + f.slice(h);
            else {
              if (k || d.search(/[^ ]/) >= 4 || D.test(d) || E.test(d) || S.test(d))
                break;
              l += `
` + f;
            }
            !k && !f.trim() && (k = !0), s += q + `
`, e = e.substring(q.length + 1), d = f.slice(h);
          }
        }
        r.loose || (c ? r.loose = !0 : /\n *\n *$/.test(s) && (c = !0));
        let v = null, R;
        this.options.gfm && (v = /^\[[ xX]\] /.exec(l), v && (R = v[0] !== "[ ] ", l = l.replace(/^\[[ xX]\] +/, ""))), r.items.push({
          type: "list_item",
          raw: s,
          task: !!v,
          checked: R,
          loose: !1,
          text: l,
          tokens: []
        }), r.raw += s;
      }
      r.items[r.items.length - 1].raw = s.trimEnd(), r.items[r.items.length - 1].text = l.trimEnd(), r.raw = r.raw.trimEnd();
      for (let u = 0; u < r.items.length; u++)
        if (this.lexer.state.top = !1, r.items[u].tokens = this.lexer.blockTokens(r.items[u].text, []), !r.loose) {
          const d = r.items[u].tokens.filter((h) => h.type === "space"), f = d.length > 0 && d.some((h) => /\n.*\n/.test(h.raw));
          r.loose = f;
        }
      if (r.loose)
        for (let u = 0; u < r.items.length; u++)
          r.items[u].loose = !0;
      return r;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const o = t[1].toLowerCase().replace(/\s+/g, " "), a = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: o,
        raw: t[0],
        href: a,
        title: r
      };
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e);
    if (!t || !/[:|]/.test(t[2]))
      return;
    const o = ot(t[1]), a = t[2].replace(/^\||\| *$/g, "").split("|"), r = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split(`
`) : [], i = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (o.length === a.length) {
      for (const s of a)
        /^ *-+: *$/.test(s) ? i.align.push("right") : /^ *:-+: *$/.test(s) ? i.align.push("center") : /^ *:-+ *$/.test(s) ? i.align.push("left") : i.align.push(null);
      for (const s of o)
        i.header.push({
          text: s,
          tokens: this.lexer.inline(s)
        });
      for (const s of r)
        i.rows.push(ot(s, i.header.length).map((l) => ({
          text: l,
          tokens: this.lexer.inline(l)
        })));
      return i;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const o = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: o,
        tokens: this.lexer.inline(o)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: $(t[1])
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const o = t[2].trim();
      if (!this.options.pedantic && /^</.test(o)) {
        if (!/>$/.test(o))
          return;
        const i = de(o.slice(0, -1), "\\");
        if ((o.length - i.length) % 2 === 0)
          return;
      } else {
        const i = In(t[2], "()");
        if (i > -1) {
          const l = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + i;
          t[2] = t[2].substring(0, i), t[0] = t[0].substring(0, l).trim(), t[3] = "";
        }
      }
      let a = t[2], r = "";
      if (this.options.pedantic) {
        const i = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(a);
        i && (a = i[1], r = i[3]);
      } else
        r = t[3] ? t[3].slice(1, -1) : "";
      return a = a.trim(), /^</.test(a) && (this.options.pedantic && !/>$/.test(o) ? a = a.slice(1) : a = a.slice(1, -1)), at(t, {
        href: a && a.replace(this.rules.inline.anyPunctuation, "$1"),
        title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer);
    }
  }
  reflink(e, t) {
    let o;
    if ((o = this.rules.inline.reflink.exec(e)) || (o = this.rules.inline.nolink.exec(e))) {
      const a = (o[2] || o[1]).replace(/\s+/g, " "), r = t[a.toLowerCase()];
      if (!r) {
        const i = o[0].charAt(0);
        return {
          type: "text",
          raw: i,
          text: i
        };
      }
      return at(o, r, o[0], this.lexer);
    }
  }
  emStrong(e, t, o = "") {
    let a = this.rules.inline.emStrongLDelim.exec(e);
    if (!a || a[3] && o.match(/[\p{L}\p{N}]/u))
      return;
    if (!(a[1] || a[2] || "") || !o || this.rules.inline.punctuation.exec(o)) {
      const i = [...a[0]].length - 1;
      let s, l, c = i, u = 0;
      const d = a[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (d.lastIndex = 0, t = t.slice(-1 * e.length + i); (a = d.exec(t)) != null; ) {
        if (s = a[1] || a[2] || a[3] || a[4] || a[5] || a[6], !s)
          continue;
        if (l = [...s].length, a[3] || a[4]) {
          c += l;
          continue;
        } else if ((a[5] || a[6]) && i % 3 && !((i + l) % 3)) {
          u += l;
          continue;
        }
        if (c -= l, c > 0)
          continue;
        l = Math.min(l, l + c + u);
        const f = [...a[0]][0].length, h = e.slice(0, i + a.index + f + l);
        if (Math.min(i, l) % 2) {
          const v = h.slice(1, -1);
          return {
            type: "em",
            raw: h,
            text: v,
            tokens: this.lexer.inlineTokens(v)
          };
        }
        const k = h.slice(2, -2);
        return {
          type: "strong",
          raw: h,
          text: k,
          tokens: this.lexer.inlineTokens(k)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let o = t[2].replace(/\n/g, " ");
      const a = /[^ ]/.test(o), r = /^ /.test(o) && / $/.test(o);
      return a && r && (o = o.substring(1, o.length - 1)), o = $(o, !0), {
        type: "codespan",
        raw: t[0],
        text: o
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let o, a;
      return t[2] === "@" ? (o = $(t[1]), a = "mailto:" + o) : (o = $(t[1]), a = o), {
        type: "link",
        raw: t[0],
        text: o,
        href: a,
        tokens: [
          {
            type: "text",
            raw: o,
            text: o
          }
        ]
      };
    }
  }
  url(e) {
    var o;
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let a, r;
      if (t[2] === "@")
        a = $(t[0]), r = "mailto:" + a;
      else {
        let i;
        do
          i = t[0], t[0] = ((o = this.rules.inline._backpedal.exec(t[0])) == null ? void 0 : o[0]) ?? "";
        while (i !== t[0]);
        a = $(t[0]), t[1] === "www." ? r = "http://" + t[0] : r = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: a,
        href: r,
        tokens: [
          {
            type: "text",
            raw: a,
            text: a
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      let o;
      return this.lexer.state.inRawBlock ? o = t[0] : o = $(t[0]), {
        type: "text",
        raw: t[0],
        text: o
      };
    }
  }
}
const Nn = /^(?: *(?:\n|$))+/, Ln = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/, jn = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, se = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Mn = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, xt = /(?:[*+-]|\d{1,9}[.)])/, _t = y(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, xt).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), He = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Hn = /^[^\n]+/, Be = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Bn = y(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", Be).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Fn = y(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, xt).getRegex(), Se = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Fe = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Gn = y("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", Fe).replace("tag", Se).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Ct = y(He).replace("hr", se).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Se).getRegex(), Un = y(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ct).getRegex(), Ge = {
  blockquote: Un,
  code: Ln,
  def: Bn,
  fences: jn,
  heading: Mn,
  hr: se,
  html: Gn,
  lheading: _t,
  list: Fn,
  newline: Nn,
  paragraph: Ct,
  table: te,
  text: Hn
}, rt = y("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", se).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Se).getRegex(), Wn = {
  ...Ge,
  table: rt,
  paragraph: y(He).replace("hr", se).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", rt).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Se).getRegex()
}, Zn = {
  ...Ge,
  html: y(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Fe).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: te,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: y(He).replace("hr", se).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", _t).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Tt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Kn = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, At = /^( {2,}|\\)\n(?!\s*$)/, Qn = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, le = "\\p{P}\\p{S}", Vn = y(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, le).getRegex(), Xn = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g, Jn = y(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, le).getRegex(), eo = y("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, le).getRegex(), to = y("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, le).getRegex(), no = y(/\\([punct])/, "gu").replace(/punct/g, le).getRegex(), oo = y(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), ao = y(Fe).replace("(?:-->|$)", "-->").getRegex(), ro = y("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ao).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Te = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, io = y(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", Te).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Rt = y(/^!?\[(label)\]\[(ref)\]/).replace("label", Te).replace("ref", Be).getRegex(), St = y(/^!?\[(ref)\](?:\[\])?/).replace("ref", Be).getRegex(), so = y("reflink|nolink(?!\\()", "g").replace("reflink", Rt).replace("nolink", St).getRegex(), Ue = {
  _backpedal: te,
  // only used for GFM url
  anyPunctuation: no,
  autolink: oo,
  blockSkip: Xn,
  br: At,
  code: Kn,
  del: te,
  emStrongLDelim: Jn,
  emStrongRDelimAst: eo,
  emStrongRDelimUnd: to,
  escape: Tt,
  link: io,
  nolink: St,
  punctuation: Vn,
  reflink: Rt,
  reflinkSearch: so,
  tag: ro,
  text: Qn,
  url: te
}, lo = {
  ...Ue,
  link: y(/^!?\[(label)\]\((.*?)\)/).replace("label", Te).getRegex(),
  reflink: y(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Te).getRegex()
}, Ne = {
  ...Ue,
  escape: y(Tt).replace("])", "~|])").getRegex(),
  url: y(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, co = {
  ...Ne,
  br: y(At).replace("{2,}", "*").getRegex(),
  text: y(Ne.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, he = {
  normal: Ge,
  gfm: Wn,
  pedantic: Zn
}, X = {
  normal: Ue,
  gfm: Ne,
  breaks: co,
  pedantic: lo
};
class z {
  constructor(e) {
    b(this, "tokens");
    b(this, "options");
    b(this, "state");
    b(this, "tokenizer");
    b(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || W, this.options.tokenizer = this.options.tokenizer || new Ce(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      block: he.normal,
      inline: X.normal
    };
    this.options.pedantic ? (t.block = he.pedantic, t.inline = X.pedantic) : this.options.gfm && (t.block = he.gfm, this.options.breaks ? t.inline = X.breaks : t.inline = X.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: he,
      inline: X
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new z(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new z(t).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(/\r\n|\r/g, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const o = this.inlineQueue[t];
      this.inlineTokens(o.src, o.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = []) {
    this.options.pedantic ? e = e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e = e.replace(/^( *)(\t+)/gm, (s, l, c) => l + "    ".repeat(c.length));
    let o, a, r, i;
    for (; e; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((s) => (o = s.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), !0) : !1))) {
        if (o = this.tokenizer.space(e)) {
          e = e.substring(o.raw.length), o.raw.length === 1 && t.length > 0 ? t[t.length - 1].raw += `
` : t.push(o);
          continue;
        }
        if (o = this.tokenizer.code(e)) {
          e = e.substring(o.raw.length), a = t[t.length - 1], a && (a.type === "paragraph" || a.type === "text") ? (a.raw += `
` + o.raw, a.text += `
` + o.text, this.inlineQueue[this.inlineQueue.length - 1].src = a.text) : t.push(o);
          continue;
        }
        if (o = this.tokenizer.fences(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.heading(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.hr(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.blockquote(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.list(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.html(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.def(e)) {
          e = e.substring(o.raw.length), a = t[t.length - 1], a && (a.type === "paragraph" || a.type === "text") ? (a.raw += `
` + o.raw, a.text += `
` + o.raw, this.inlineQueue[this.inlineQueue.length - 1].src = a.text) : this.tokens.links[o.tag] || (this.tokens.links[o.tag] = {
            href: o.href,
            title: o.title
          });
          continue;
        }
        if (o = this.tokenizer.table(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.lheading(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (r = e, this.options.extensions && this.options.extensions.startBlock) {
          let s = 1 / 0;
          const l = e.slice(1);
          let c;
          this.options.extensions.startBlock.forEach((u) => {
            c = u.call({ lexer: this }, l), typeof c == "number" && c >= 0 && (s = Math.min(s, c));
          }), s < 1 / 0 && s >= 0 && (r = e.substring(0, s + 1));
        }
        if (this.state.top && (o = this.tokenizer.paragraph(r))) {
          a = t[t.length - 1], i && a.type === "paragraph" ? (a.raw += `
` + o.raw, a.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = a.text) : t.push(o), i = r.length !== e.length, e = e.substring(o.raw.length);
          continue;
        }
        if (o = this.tokenizer.text(e)) {
          e = e.substring(o.raw.length), a = t[t.length - 1], a && a.type === "text" ? (a.raw += `
` + o.raw, a.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = a.text) : t.push(o);
          continue;
        }
        if (e) {
          const s = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(s);
            break;
          } else
            throw new Error(s);
        }
      }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, t = []) {
    let o, a, r, i = e, s, l, c;
    if (this.tokens.links) {
      const u = Object.keys(this.tokens.links);
      if (u.length > 0)
        for (; (s = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null; )
          u.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (s = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; )
      i = i.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (s = this.tokenizer.rules.inline.anyPunctuation.exec(i)) != null; )
      i = i.slice(0, s.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; e; )
      if (l || (c = ""), l = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((u) => (o = u.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), !0) : !1))) {
        if (o = this.tokenizer.escape(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.tag(e)) {
          e = e.substring(o.raw.length), a = t[t.length - 1], a && o.type === "text" && a.type === "text" ? (a.raw += o.raw, a.text += o.text) : t.push(o);
          continue;
        }
        if (o = this.tokenizer.link(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(o.raw.length), a = t[t.length - 1], a && o.type === "text" && a.type === "text" ? (a.raw += o.raw, a.text += o.text) : t.push(o);
          continue;
        }
        if (o = this.tokenizer.emStrong(e, i, c)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.codespan(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.br(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.del(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.autolink(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (!this.state.inLink && (o = this.tokenizer.url(e))) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (r = e, this.options.extensions && this.options.extensions.startInline) {
          let u = 1 / 0;
          const d = e.slice(1);
          let f;
          this.options.extensions.startInline.forEach((h) => {
            f = h.call({ lexer: this }, d), typeof f == "number" && f >= 0 && (u = Math.min(u, f));
          }), u < 1 / 0 && u >= 0 && (r = e.substring(0, u + 1));
        }
        if (o = this.tokenizer.inlineText(r)) {
          e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (c = o.raw.slice(-1)), l = !0, a = t[t.length - 1], a && a.type === "text" ? (a.raw += o.raw, a.text += o.text) : t.push(o);
          continue;
        }
        if (e) {
          const u = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(u);
            break;
          } else
            throw new Error(u);
        }
      }
    return t;
  }
}
class Ae {
  constructor(e) {
    b(this, "options");
    this.options = e || W;
  }
  code(e, t, o) {
    var r;
    const a = (r = (t || "").match(/^\S*/)) == null ? void 0 : r[0];
    return e = e.replace(/\n$/, "") + `
`, a ? '<pre><code class="language-' + $(a) + '">' + (o ? e : $(e, !0)) + `</code></pre>
` : "<pre><code>" + (o ? e : $(e, !0)) + `</code></pre>
`;
  }
  blockquote(e) {
    return `<blockquote>
${e}</blockquote>
`;
  }
  html(e, t) {
    return e;
  }
  heading(e, t, o) {
    return `<h${t}>${e}</h${t}>
`;
  }
  hr() {
    return `<hr>
`;
  }
  list(e, t, o) {
    const a = t ? "ol" : "ul", r = t && o !== 1 ? ' start="' + o + '"' : "";
    return "<" + a + r + `>
` + e + "</" + a + `>
`;
  }
  listitem(e, t, o) {
    return `<li>${e}</li>
`;
  }
  checkbox(e) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph(e) {
    return `<p>${e}</p>
`;
  }
  table(e, t) {
    return t && (t = `<tbody>${t}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + t + `</table>
`;
  }
  tablerow(e) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e, t) {
    const o = t.header ? "th" : "td";
    return (t.align ? `<${o} align="${t.align}">` : `<${o}>`) + e + `</${o}>
`;
  }
  /**
   * span level renderer
   */
  strong(e) {
    return `<strong>${e}</strong>`;
  }
  em(e) {
    return `<em>${e}</em>`;
  }
  codespan(e) {
    return `<code>${e}</code>`;
  }
  br() {
    return "<br>";
  }
  del(e) {
    return `<del>${e}</del>`;
  }
  link(e, t, o) {
    const a = nt(e);
    if (a === null)
      return o;
    e = a;
    let r = '<a href="' + e + '"';
    return t && (r += ' title="' + t + '"'), r += ">" + o + "</a>", r;
  }
  image(e, t, o) {
    const a = nt(e);
    if (a === null)
      return o;
    e = a;
    let r = `<img src="${e}" alt="${o}"`;
    return t && (r += ` title="${t}"`), r += ">", r;
  }
  text(e) {
    return e;
  }
}
class We {
  // no need for block level renderers
  strong(e) {
    return e;
  }
  em(e) {
    return e;
  }
  codespan(e) {
    return e;
  }
  del(e) {
    return e;
  }
  html(e) {
    return e;
  }
  text(e) {
    return e;
  }
  link(e, t, o) {
    return "" + o;
  }
  image(e, t, o) {
    return "" + o;
  }
  br() {
    return "";
  }
}
class O {
  constructor(e) {
    b(this, "options");
    b(this, "renderer");
    b(this, "textRenderer");
    this.options = e || W, this.options.renderer = this.options.renderer || new Ae(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new We();
  }
  /**
   * Static Parse Method
   */
  static parse(e, t) {
    return new O(t).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, t) {
    return new O(t).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, t = !0) {
    let o = "";
    for (let a = 0; a < e.length; a++) {
      const r = e[a];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
        const i = r, s = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (s !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(i.type)) {
          o += s || "";
          continue;
        }
      }
      switch (r.type) {
        case "space":
          continue;
        case "hr": {
          o += this.renderer.hr();
          continue;
        }
        case "heading": {
          const i = r;
          o += this.renderer.heading(this.parseInline(i.tokens), i.depth, zn(this.parseInline(i.tokens, this.textRenderer)));
          continue;
        }
        case "code": {
          const i = r;
          o += this.renderer.code(i.text, i.lang, !!i.escaped);
          continue;
        }
        case "table": {
          const i = r;
          let s = "", l = "";
          for (let u = 0; u < i.header.length; u++)
            l += this.renderer.tablecell(this.parseInline(i.header[u].tokens), { header: !0, align: i.align[u] });
          s += this.renderer.tablerow(l);
          let c = "";
          for (let u = 0; u < i.rows.length; u++) {
            const d = i.rows[u];
            l = "";
            for (let f = 0; f < d.length; f++)
              l += this.renderer.tablecell(this.parseInline(d[f].tokens), { header: !1, align: i.align[f] });
            c += this.renderer.tablerow(l);
          }
          o += this.renderer.table(s, c);
          continue;
        }
        case "blockquote": {
          const i = r, s = this.parse(i.tokens);
          o += this.renderer.blockquote(s);
          continue;
        }
        case "list": {
          const i = r, s = i.ordered, l = i.start, c = i.loose;
          let u = "";
          for (let d = 0; d < i.items.length; d++) {
            const f = i.items[d], h = f.checked, k = f.task;
            let v = "";
            if (f.task) {
              const R = this.renderer.checkbox(!!h);
              c ? f.tokens.length > 0 && f.tokens[0].type === "paragraph" ? (f.tokens[0].text = R + " " + f.tokens[0].text, f.tokens[0].tokens && f.tokens[0].tokens.length > 0 && f.tokens[0].tokens[0].type === "text" && (f.tokens[0].tokens[0].text = R + " " + f.tokens[0].tokens[0].text)) : f.tokens.unshift({
                type: "text",
                text: R + " "
              }) : v += R + " ";
            }
            v += this.parse(f.tokens, c), u += this.renderer.listitem(v, k, !!h);
          }
          o += this.renderer.list(u, s, l);
          continue;
        }
        case "html": {
          const i = r;
          o += this.renderer.html(i.text, i.block);
          continue;
        }
        case "paragraph": {
          const i = r;
          o += this.renderer.paragraph(this.parseInline(i.tokens));
          continue;
        }
        case "text": {
          let i = r, s = i.tokens ? this.parseInline(i.tokens) : i.text;
          for (; a + 1 < e.length && e[a + 1].type === "text"; )
            i = e[++a], s += `
` + (i.tokens ? this.parseInline(i.tokens) : i.text);
          o += t ? this.renderer.paragraph(s) : s;
          continue;
        }
        default: {
          const i = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(i), "";
          throw new Error(i);
        }
      }
    }
    return o;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, t) {
    t = t || this.renderer;
    let o = "";
    for (let a = 0; a < e.length; a++) {
      const r = e[a];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
        const i = this.options.extensions.renderers[r.type].call({ parser: this }, r);
        if (i !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
          o += i || "";
          continue;
        }
      }
      switch (r.type) {
        case "escape": {
          const i = r;
          o += t.text(i.text);
          break;
        }
        case "html": {
          const i = r;
          o += t.html(i.text);
          break;
        }
        case "link": {
          const i = r;
          o += t.link(i.href, i.title, this.parseInline(i.tokens, t));
          break;
        }
        case "image": {
          const i = r;
          o += t.image(i.href, i.title, i.text);
          break;
        }
        case "strong": {
          const i = r;
          o += t.strong(this.parseInline(i.tokens, t));
          break;
        }
        case "em": {
          const i = r;
          o += t.em(this.parseInline(i.tokens, t));
          break;
        }
        case "codespan": {
          const i = r;
          o += t.codespan(i.text);
          break;
        }
        case "br": {
          o += t.br();
          break;
        }
        case "del": {
          const i = r;
          o += t.del(this.parseInline(i.tokens, t));
          break;
        }
        case "text": {
          const i = r;
          o += t.text(i.text);
          break;
        }
        default: {
          const i = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(i), "";
          throw new Error(i);
        }
      }
    }
    return o;
  }
}
class ne {
  constructor(e) {
    b(this, "options");
    this.options = e || W;
  }
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
}
b(ne, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
var G, Le, Dt;
class uo {
  constructor(...e) {
    Ke(this, G);
    b(this, "defaults", Me());
    b(this, "options", this.setOptions);
    b(this, "parse", ce(this, G, Le).call(this, z.lex, O.parse));
    b(this, "parseInline", ce(this, G, Le).call(this, z.lexInline, O.parseInline));
    b(this, "Parser", O);
    b(this, "Renderer", Ae);
    b(this, "TextRenderer", We);
    b(this, "Lexer", z);
    b(this, "Tokenizer", Ce);
    b(this, "Hooks", ne);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    var a, r;
    let o = [];
    for (const i of e)
      switch (o = o.concat(t.call(this, i)), i.type) {
        case "table": {
          const s = i;
          for (const l of s.header)
            o = o.concat(this.walkTokens(l.tokens, t));
          for (const l of s.rows)
            for (const c of l)
              o = o.concat(this.walkTokens(c.tokens, t));
          break;
        }
        case "list": {
          const s = i;
          o = o.concat(this.walkTokens(s.items, t));
          break;
        }
        default: {
          const s = i;
          (r = (a = this.defaults.extensions) == null ? void 0 : a.childTokens) != null && r[s.type] ? this.defaults.extensions.childTokens[s.type].forEach((l) => {
            const c = s[l].flat(1 / 0);
            o = o.concat(this.walkTokens(c, t));
          }) : s.tokens && (o = o.concat(this.walkTokens(s.tokens, t)));
        }
      }
    return o;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((o) => {
      const a = { ...o };
      if (a.async = this.defaults.async || a.async || !1, o.extensions && (o.extensions.forEach((r) => {
        if (!r.name)
          throw new Error("extension name required");
        if ("renderer" in r) {
          const i = t.renderers[r.name];
          i ? t.renderers[r.name] = function(...s) {
            let l = r.renderer.apply(this, s);
            return l === !1 && (l = i.apply(this, s)), l;
          } : t.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const i = t[r.level];
          i ? i.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
      }), a.extensions = t), o.renderer) {
        const r = this.defaults.renderer || new Ae(this.defaults);
        for (const i in o.renderer) {
          if (!(i in r))
            throw new Error(`renderer '${i}' does not exist`);
          if (i === "options")
            continue;
          const s = i, l = o.renderer[s], c = r[s];
          r[s] = (...u) => {
            let d = l.apply(r, u);
            return d === !1 && (d = c.apply(r, u)), d || "";
          };
        }
        a.renderer = r;
      }
      if (o.tokenizer) {
        const r = this.defaults.tokenizer || new Ce(this.defaults);
        for (const i in o.tokenizer) {
          if (!(i in r))
            throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i))
            continue;
          const s = i, l = o.tokenizer[s], c = r[s];
          r[s] = (...u) => {
            let d = l.apply(r, u);
            return d === !1 && (d = c.apply(r, u)), d;
          };
        }
        a.tokenizer = r;
      }
      if (o.hooks) {
        const r = this.defaults.hooks || new ne();
        for (const i in o.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (i === "options")
            continue;
          const s = i, l = o.hooks[s], c = r[s];
          ne.passThroughHooks.has(i) ? r[s] = (u) => {
            if (this.defaults.async)
              return Promise.resolve(l.call(r, u)).then((f) => c.call(r, f));
            const d = l.call(r, u);
            return c.call(r, d);
          } : r[s] = (...u) => {
            let d = l.apply(r, u);
            return d === !1 && (d = c.apply(r, u)), d;
          };
        }
        a.hooks = r;
      }
      if (o.walkTokens) {
        const r = this.defaults.walkTokens, i = o.walkTokens;
        a.walkTokens = function(s) {
          let l = [];
          return l.push(i.call(this, s)), r && (l = l.concat(r.call(this, s))), l;
        };
      }
      this.defaults = { ...this.defaults, ...a };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return z.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return O.parse(e, t ?? this.defaults);
  }
}
G = new WeakSet(), Le = function(e, t) {
  return (o, a) => {
    const r = { ...a }, i = { ...this.defaults, ...r };
    this.defaults.async === !0 && r.async === !1 && (i.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), i.async = !0);
    const s = ce(this, G, Dt).call(this, !!i.silent, !!i.async);
    if (typeof o > "u" || o === null)
      return s(new Error("marked(): input parameter is undefined or null"));
    if (typeof o != "string")
      return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(o) + ", string expected"));
    if (i.hooks && (i.hooks.options = i), i.async)
      return Promise.resolve(i.hooks ? i.hooks.preprocess(o) : o).then((l) => e(l, i)).then((l) => i.hooks ? i.hooks.processAllTokens(l) : l).then((l) => i.walkTokens ? Promise.all(this.walkTokens(l, i.walkTokens)).then(() => l) : l).then((l) => t(l, i)).then((l) => i.hooks ? i.hooks.postprocess(l) : l).catch(s);
    try {
      i.hooks && (o = i.hooks.preprocess(o));
      let l = e(o, i);
      i.hooks && (l = i.hooks.processAllTokens(l)), i.walkTokens && this.walkTokens(l, i.walkTokens);
      let c = t(l, i);
      return i.hooks && (c = i.hooks.postprocess(c)), c;
    } catch (l) {
      return s(l);
    }
  };
}, Dt = function(e, t) {
  return (o) => {
    if (o.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
      const a = "<p>An error occurred:</p><pre>" + $(o.message + "", !0) + "</pre>";
      return t ? Promise.resolve(a) : a;
    }
    if (t)
      return Promise.reject(o);
    throw o;
  };
};
const F = new uo();
function g(n, e) {
  return F.parse(n, e);
}
g.options = g.setOptions = function(n) {
  return F.setOptions(n), g.defaults = F.defaults, wt(g.defaults), g;
};
g.getDefaults = Me;
g.defaults = W;
g.use = function(...n) {
  return F.use(...n), g.defaults = F.defaults, wt(g.defaults), g;
};
g.walkTokens = function(n, e) {
  return F.walkTokens(n, e);
};
g.parseInline = F.parseInline;
g.Parser = O;
g.parser = O.parse;
g.Renderer = Ae;
g.TextRenderer = We;
g.Lexer = z;
g.lexer = z.lex;
g.Tokenizer = Ce;
g.Hooks = ne;
g.parse = g;
g.options;
g.setOptions;
g.use;
g.walkTokens;
g.parseInline;
O.parse;
z.lex;
var ho = /* @__PURE__ */ w('<div style="background:#ffffff;border-radius:6px;margin-bottom:8px;overflow:hidden;transition:opacity 0.2s, box-shadow 0.15s"><div style="display:flex;align-items:center;padding:10px 12px"><span style=flex:1;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;user-select:none></span><div style=display:flex;gap:6px;align-items:center;margin-right:8px>'), fo = /* @__PURE__ */ w('<span style="background:#ddd;color:#999;border-radius:3px;padding:2px 6px;font-size:9px;font-weight:700;letter-spacing:0.5px">USED'), po = /* @__PURE__ */ w('<span style="border-radius:3px;padding:2px 8px;font-size:10px;font-weight:700;white-space:nowrap;transition:all 0.15s"> energy'), go = /* @__PURE__ */ w('<span style="color:#aaaaaa;font-size:12px;cursor:pointer;user-select:none;padding:0 2px">'), yo = /* @__PURE__ */ w(`<div style="padding:0 12px 10px;color:#555555;font-size:13px;line-height:1.6;font-family:'Varela Round', 'Nunito', sans-serif">`);
function mo(n) {
  return g.parse(n).replace(/\bD(\d+)\b/g, "<strong>D$1</strong>");
}
function bo(n) {
  const [e, t] = Q(!1);
  function o() {
    var r;
    n.used || (r = n.onActivate) == null || r.call(n, n.card);
  }
  function a(r) {
    r.stopPropagation(), !n.used && t((i) => !i);
  }
  return (() => {
    var r = ho(), i = r.firstChild, s = i.firstChild, l = s.nextSibling;
    return s.$$click = o, p(s, () => n.card.title), p(l, (() => {
      var c = Y(() => !!n.used);
      return () => c() ? fo() : Y(() => n.card.energyCost !== void 0)() && (() => {
        var u = po(), d = u.firstChild;
        return p(u, () => n.card.energyCost, d), T((f) => {
          var h = n.selected ? "var(--sq-accent)" : "rgba(0,0,0,0.12)", k = n.selected ? "#fff" : "var(--sq-accent)";
          return h !== f.e && _(u, "background", f.e = h), k !== f.t && _(u, "color", f.t = k), f;
        }, {
          e: void 0,
          t: void 0
        }), u;
      })();
    })()), p(i, (() => {
      var c = Y(() => !n.used);
      return () => c() && (() => {
        var u = go();
        return u.$$click = a, p(u, () => e() ? "▲" : "▼"), u;
      })();
    })(), null), p(r, (() => {
      var c = Y(() => !!(e() && !n.used));
      return () => c() && (() => {
        var u = yo();
        return T(() => u.innerHTML = mo(n.card.body)), u;
      })();
    })(), null), T((c) => {
      var u = n.selected ? "0 0 0 2px var(--sq-accent), 0px -2px 4px rgba(0,0,0,0.15)" : "0px -2px 4px rgba(0,0,0,0.2)", d = `2px solid ${n.used ? "#e0e0e0" : n.selected ? "var(--sq-accent)" : "transparent"}`, f = n.used ? 0.45 : 1, h = n.selected ? "color-mix(in srgb, var(--sq-accent) 8%, white)" : "transparent", k = n.used ? "#bbbbbb" : "var(--sq-accent)", v = n.used ? "line-through" : "none", R = n.used ? "default" : "pointer";
      return u !== c.e && _(r, "box-shadow", c.e = u), d !== c.t && _(r, "border", c.t = d), f !== c.a && _(r, "opacity", c.a = f), h !== c.o && _(i, "background", c.o = h), k !== c.i && _(s, "color", c.i = k), v !== c.n && _(s, "text-decoration", c.n = v), R !== c.s && _(s, "cursor", c.s = R), c;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0
    }), r;
  })();
}
U(["click"]);
var wo = /* @__PURE__ */ w('<div style="background:#ffffff;border-radius:6px;margin-bottom:8px;box-shadow:0px -2px 4px rgba(0,0,0,0.2);overflow:hidden"><div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;cursor:pointer;user-select:none"><span style=color:var(--sq-accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px></span><span style=color:#aaaaaa;font-size:12px>'), ko = /* @__PURE__ */ w(`<div style="padding:0 12px 10px;color:#555555;font-size:13px;line-height:1.6;font-family:'Varela Round', 'Nunito', sans-serif">`);
function fe(n) {
  const [e, t] = Q(!1);
  return (() => {
    var o = wo(), a = o.firstChild, r = a.firstChild, i = r.nextSibling;
    return a.$$click = () => t((s) => !s), p(r, () => n.title), p(i, () => e() ? "▲" : "▼"), p(o, (() => {
      var s = Y(() => !!e());
      return () => s() && (() => {
        var l = ko();
        return T(() => l.innerHTML = g.parse(n.body)), l;
      })();
    })(), null), o;
  })();
}
U(["click"]);
var vo = /* @__PURE__ */ w('<div style="padding:12px 14px">');
function xo(n) {
  const e = L(() => n.abilities.filter((t) => {
    const o = t.source === n.charClass || t.source === n.profession || t.source === "general", a = t.context === n.combat;
    return o && a;
  }));
  return (() => {
    var t = vo();
    return p(t, m(J, {
      get when() {
        return Y(() => n.combat === "isDead")() && n.deathContent;
      },
      get children() {
        return m(fe, {
          title: "Dead",
          get body() {
            return n.deathContent;
          }
        });
      }
    }), null), p(t, m(J, {
      get when() {
        return Y(() => n.combat === "inGeneral")() && !!n.descriptions[n.personality];
      },
      get children() {
        return m(fe, {
          get title() {
            return n.personality;
          },
          get body() {
            return n.descriptions[n.personality];
          }
        });
      }
    }), null), p(t, m(J, {
      get when() {
        return Y(() => n.combat === "inGeneral")() && !!n.descriptions[n.charClass];
      },
      get children() {
        return m(fe, {
          get title() {
            return n.charClass;
          },
          get body() {
            return n.descriptions[n.charClass];
          }
        });
      }
    }), null), p(t, m(J, {
      get when() {
        return Y(() => n.combat === "inGeneral")() && !!n.descriptions[n.profession];
      },
      get children() {
        return m(fe, {
          get title() {
            return n.profession;
          },
          get body() {
            return n.descriptions[n.profession];
          }
        });
      }
    }), null), p(t, m(M, {
      get each() {
        return e();
      },
      children: (o) => m(bo, {
        card: o,
        get used() {
          return n.usedAbilities.includes(o.title);
        },
        get selected() {
          return n.selectedAbility === o.title;
        },
        get onActivate() {
          return n.onActivate;
        }
      })
    }), null), t;
  })();
}
var _o = /* @__PURE__ */ w('<div style="background:var(--sq-row-3);border-top:1px solid var(--sq-row-border);padding:8px 14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span style=color:var(--sq-overlay-text-muted);font-size:12px;text-transform:uppercase;letter-spacing:1px>GM</span><div style="width:36px;height:18px;border-radius:9px;cursor:pointer;position:relative;transition:background 0.2s;flex-shrink:0"><div style="width:14px;height:14px;background:#ffffff;border-radius:50%;position:absolute;top:1px;transition:left 0.2s"></div></div><button style="margin-left:auto;background:var(--sq-ctrl-bg);border:1px solid var(--sq-ctrl-border);color:var(--sq-overlay-text);border-radius:50%;width:24px;height:24px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0">?'), Co = /* @__PURE__ */ w('<button style="background:var(--sq-ctrl-bg);border:1px solid var(--sq-accent);color:var(--sq-accent);border-radius:4px;padding:3px 10px;font-size:12px;font-family:inherit">Save'), To = /* @__PURE__ */ w('<select style="background:var(--sq-ctrl-bg);border:1px solid var(--sq-ctrl-border);color:var(--sq-ctrl-text);border-radius:4px;padding:3px 8px;font-size:12px;font-family:inherit;cursor:pointer"><option value>Load character...'), Ao = /* @__PURE__ */ w("<option>");
function Ro(n) {
  const e = () => Object.keys(n.savedCharacters);
  return (() => {
    var t = _o(), o = t.firstChild, a = o.nextSibling, r = a.firstChild, i = a.nextSibling;
    return a.$$click = () => n.onToggle(!n.enabled), p(t, (() => {
      var s = Y(() => !!n.enabled);
      return () => s() && [(() => {
        var l = Co();
        return Oe(l, "click", n.onSave), T((c) => {
          var u = !n.characterName, d = n.characterName ? "pointer" : "not-allowed", f = n.characterName ? "1" : "0.4";
          return u !== c.e && (l.disabled = c.e = u), d !== c.t && _(l, "cursor", c.t = d), f !== c.a && _(l, "opacity", c.a = f), c;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), l;
      })(), (() => {
        var l = To();
        return l.firstChild, l.addEventListener("change", (c) => {
          c.currentTarget.value && n.onLoad(c.currentTarget.value), c.currentTarget.value = "";
        }), p(l, m(M, {
          get each() {
            return e();
          },
          children: (c) => (() => {
            var u = Ao();
            return u.value = c, p(u, c), u;
          })()
        }), null), l;
      })()];
    })(), i), Oe(i, "click", n.onHelpOpen), T((s) => {
      var l = n.enabled ? "var(--sq-accent)" : "var(--sq-ctrl-bg)", c = `1px solid ${n.enabled ? "var(--sq-accent)" : "var(--sq-ctrl-border)"}`, u = n.enabled ? "19px" : "1px";
      return l !== s.e && _(a, "background", s.e = l), c !== s.t && _(a, "border", s.t = c), u !== s.a && _(r, "left", s.a = u), s;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), t;
  })();
}
U(["click"]);
var So = /* @__PURE__ */ w(`<div style=position:absolute;inset:0;background:#ffffff;z-index:500;overflow:auto;padding:16px><div style=display:flex;justify-content:space-between;align-items:center;margin-bottom:12px><span style=color:var(--sq-accent);font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px>General Rules</span><button style=background:var(--sq-accent);color:#ffffff;border:none;border-radius:50%;width:28px;height:28px;font-size:16px;font-weight:700;font-family:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0>×</button></div><div style="color:#3f3e4a;font-size:13px;line-height:1.7;font-family:'Varela Round', 'Nunito', sans-serif">`);
function Do(n) {
  return (() => {
    var e = So(), t = e.firstChild, o = t.firstChild, a = o.nextSibling, r = t.nextSibling;
    return Oe(a, "click", n.onClose), T(() => r.innerHTML = g.parse(n.body)), e;
  })();
}
U(["click"]);
const $o = '@import"https://fonts.googleapis.com/css2?family=Varela+Round&family=Nunito:wght@400;600;700&display=swap";/*! tailwindcss v4.2.4 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-900:oklch(39.6% .141 25.723);--spacing:.25rem;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.invisible{visibility:hidden}.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.start{inset-inline-start:var(--spacing)}.end{inset-inline-end:var(--spacing)}.isolate{isolation:isolate}.order-0,.order-none{order:0}.container{width:100%}@media(min-width:40rem){.container{max-width:40rem}}@media(min-width:48rem){.container{max-width:48rem}}@media(min-width:64rem){.container{max-width:64rem}}@media(min-width:80rem){.container{max-width:80rem}}@media(min-width:96rem){.container{max-width:96rem}}.\\!hidden{display:none!important}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.table{display:table}.table-caption{display:table-caption}.table-cell{display:table-cell}.flex-shrink{flex-shrink:1}.flex-grow,.grow{flex-grow:1}.border-collapse{border-collapse:collapse}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.resize{resize:both}.flex-wrap{flex-wrap:wrap}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.rounded{border-radius:.25rem}.border{border-style:var(--tw-border-style);border-width:1px}.mask-repeat{-webkit-mask-repeat:repeat;mask-repeat:repeat}.text-wrap{text-wrap:wrap}.break-words,.wrap-break-word{overflow-wrap:break-word}.capitalize{text-transform:capitalize}.lowercase{text-transform:lowercase}.uppercase{text-transform:uppercase}.italic{font-style:italic}.ordinal{--tw-ordinal:ordinal;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.line-through{text-decoration-line:line-through}.underline{text-decoration-line:underline}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.grayscale{--tw-grayscale:grayscale(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.invert{--tw-invert:invert(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.sepia{--tw-sepia:sepia(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.\\!filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)!important}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.data-\\[personality\\=passionate\\]\\:bg-red-900[data-personality=passionate]{background-color:var(--color-red-900)}}:host{font-family:var(--sq-font-family,"Varela Round", "Nunito", sans-serif);--sq-bg:#888;--sq-accent:#888;--sq-overlay-text:#fffffff2;--sq-overlay-text-muted:#ffffff8c;--sq-ctrl-bg:#ffffff26;--sq-ctrl-border:#ffffff4d;--sq-ctrl-text:#fffffff2;--sq-row-1:#00000026;--sq-row-2:#0000001a;--sq-row-3:#0003;--sq-row-border:#0000001f;--sq-dot-empty-bg:#fff3;--sq-dot-empty-border:#fff6;background-color:var(--sq-bg);color:#3f3e4a;display:block}:host([data-personality=passionate]){--sq-bg:#943a11;--sq-accent:#943a11}:host([data-personality=calculating]){--sq-bg:#26869d;--sq-accent:#26869d}:host([data-personality=wild]){--sq-bg:#758d2c;--sq-accent:#758d2c}:host([data-personality=selfish]){--sq-bg:#3f3e4a;--sq-accent:#3f3e4a}:host([data-personality=righteous]){--sq-bg:#daceae;--sq-accent:#5a5060;--sq-overlay-text:#5a5060;--sq-overlay-text-muted:#5a506080;--sq-ctrl-bg:#0000000f;--sq-ctrl-border:#5a506040;--sq-ctrl-text:#5a5060;--sq-row-1:#0000000f;--sq-row-2:#0000000a;--sq-row-3:#00000014;--sq-row-border:#5a506026;--sq-dot-empty-bg:#5a50601f;--sq-dot-empty-border:#5a506040}.die-inline{color:#26869d;cursor:pointer;border-bottom:1px solid #26869d;font-weight:700}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}';
var Eo = /* @__PURE__ */ w("<style>"), qo = /* @__PURE__ */ w("<div style=height:100%;display:flex;flex-direction:column;overflow:hidden;position:relative><div style=flex:1;overflow-y:auto;min-height:0>");
function Yo(n) {
  const {
    state: e,
    setState: t,
    setEnergy: o,
    loadFromStorage: a,
    saveCharacter: r,
    loadCharacter: i
  } = gn(), [s, l] = Q(!1), c = L(() => {
    if (!n.content) return null;
    try {
      return JSON.parse(n.content);
    } catch {
      return null;
    }
  });
  Pt(() => {
    a();
  }), ge(() => {
    if (n.character)
      try {
        const d = JSON.parse(n.character);
        t({
          ...d
        });
      } catch {
      }
  });
  function u(d) {
    n.element.dispatchEvent(new CustomEvent("abilityactivate", {
      detail: {
        title: d.title,
        energyCost: d.energyCost
      },
      bubbles: !0,
      composed: !0
    }));
  }
  return ge(() => {
    e.personality ? n.element.setAttribute("data-personality", e.personality) : n.element.removeAttribute("data-personality");
  }), ge(() => {
    n.element.dispatchEvent(new CustomEvent("characterchange", {
      detail: {
        name: e.name,
        class: e.class,
        profession: e.profession,
        personality: e.personality,
        die: e.die
      },
      bubbles: !0,
      composed: !0
    }));
  }), [(() => {
    var d = Eo();
    return p(d, $o), d;
  })(), (() => {
    var d = qo(), f = d.firstChild;
    return p(d, m(_n, {
      get hp() {
        return e.hp;
      },
      get energy() {
        return e.energy;
      },
      get name() {
        return e.name;
      },
      get charClass() {
        return e.class;
      },
      get profession() {
        return e.profession;
      },
      get personality() {
        return e.personality;
      },
      onHpChange: (h) => t("hp", h),
      onEnergyClick: o
    }), f), p(d, m(An, {
      get name() {
        return e.name;
      },
      get personality() {
        return e.personality;
      },
      get charClass() {
        return e.class;
      },
      get profession() {
        return e.profession;
      },
      get personalities() {
        var h;
        return ((h = c()) == null ? void 0 : h.personalities) ?? [];
      },
      get classes() {
        var h;
        return ((h = c()) == null ? void 0 : h.classes) ?? [];
      },
      get professions() {
        var h;
        return ((h = c()) == null ? void 0 : h.professions) ?? [];
      },
      onNameChange: (h) => t("name", h),
      onPersonalityChange: (h) => t("personality", h),
      onClassChange: (h) => t("class", h),
      onProfessionChange: (h) => t("profession", h)
    }), f), p(d, m(Dn, {
      get combat() {
        return e.combat;
      },
      get statuses() {
        var h;
        return ((h = c()) == null ? void 0 : h.statuses) ?? [];
      },
      onChange: (h) => t("combat", h)
    }), f), p(f, m(xo, {
      get abilities() {
        var h;
        return ((h = c()) == null ? void 0 : h.abilities) ?? [];
      },
      get descriptions() {
        var h;
        return ((h = c()) == null ? void 0 : h.descriptions) ?? {};
      },
      get deathContent() {
        var h;
        return ((h = c()) == null ? void 0 : h.deathContent) ?? "";
      },
      get charClass() {
        return e.class;
      },
      get profession() {
        return e.profession;
      },
      get personality() {
        return e.personality;
      },
      get combat() {
        return e.combat;
      },
      get usedAbilities() {
        return e.usedAbilities ?? [];
      },
      get selectedAbility() {
        return e.selectedAbility ?? null;
      },
      onActivate: u
    }), null), p(f, m(Ro, {
      get enabled() {
        return e.gmMode;
      },
      get characterName() {
        return e.name;
      },
      get savedCharacters() {
        return e.savedCharacters;
      },
      onToggle: (h) => t("gmMode", h),
      onSave: r,
      onLoad: i,
      onHelpOpen: () => l(!0)
    }), null), p(d, m(J, {
      get when() {
        return s();
      },
      get children() {
        return m(Do, {
          get body() {
            var h;
            return ((h = c()) == null ? void 0 : h.generalContent) ?? "";
          },
          onClose: () => l(!1)
        });
      }
    }), null), d;
  })()];
}
const Io = {
  personalities: ["passionate", "wild", "calculating", "righteous", "selfish"],
  classes: ["wizard", "sage", "fighter", "marksman", "monk"],
  professions: [
    "animal-trainer",
    "criminal",
    "diplomat",
    "merchant",
    "performer",
    "priest",
    "scout",
    "soldier",
    "tinkerer",
    "warlock"
  ],
  statuses: [
    { id: "inGeneral", label: "General", message: "Standard rules apply." },
    { id: "inCombat", label: "In Combat", message: "Combat is active. Initiative counts." },
    { id: "outOfCombat", label: "Out of Combat", message: "No enemies nearby." },
    { id: "isDead", label: "Dead", message: "You have 0 HP. Move up to 3 squares per turn. Use your Dying ability or Resuscitate." }
  ],
  // ─── Descriptions ────────────────────────────────────────────────────────────
  descriptions: {
    passionate: `"My name is Inigo Montoya. You killed my father. Prepare to die."
— Inigo Montoya, The Princess Bride

Passionate characters follow their hearts. They live in the moment and trust their instincts when it comes to making important decisions in life and love. They can be impulsive, quick-tempered, and easily swayed by emotional appeals. But when they join your cause, a Passionate character will stay with you to the bitter end and always give 100 percent.

Passion can also be channeled into dedication. It takes a great deal of passion to dedicate your life to seeking revenge on the criminals who killed your fiancé.`,
    wild: `"It's Showtime."
— Beetlejuice

Wild Characters are unpredictable and will often do things that, to others, seem foolish or short-sighted. They are neither "good" nor "bad" but instead a neutral force of nature.

While role playing a Wild Character, it may be beneficial to flip a coin or roll a D2 to decide a course of action.`,
    calculating: `"Logic clearly dictates that the needs of the many outweigh the needs of the few."
— Spock, Star Trek II

Calculating characters carefully consider the pros and cons of their actions before proceeding. Nothing they do is rash, ill-considered, or impulsive. What they lack in speed and passion, they make up in efficiency and intellectual superiority.

They will often gladly storm the castle with the rest of their party… but only after thoroughly examining every other possible solution first.`,
    righteous: `"A man must have a code."
— The Wire

Righteous characters tend to think of others before themselves and are usually concerned with "doing the right thing" despite what it could mean for their own goals. They are boy scouts, peace officers, and are generally what you think of when you hear the word "hero."`,
    selfish: `"Throw me the idol, I'll throw you the whip!"
— Raiders of the Lost Ark

There is only one true concern in a selfish character's life: themselves. Every action they take will be weighed against their own self-interests. Selfish characters are not always completely evil — it will often be in their best interest to defeat a bad guy bent on destroying the world… mostly because the world is where they currently live.`,
    wizard: "Wizards are smarter than the average human. They possess intelligence on par with your average multi-day Jeopardy Champion. They can identify unknown objects, places, famous people, and monsters. A D20 roll may be required for more difficult subjects.",
    sage: `Sages channel their mystical abilities through a small personal token or weapon. Keep this on you at all times.

Sages can channel and adjust the powerful unseen forces of nature that control all life in the universe. Wise sages are careful about where, when, and how they use their abilities — playing with forces they can barely understand will often have unintended consequences.

Sages have the deductive reasoning skills of your average socially awkward but brilliant title character of a weekly detective series. You can often determine, at a glance, whether someone or something is harmful or friendly.`,
    fighter: "Fighters are much stronger than the average human. They can lift, push, pull, and throw items with strength comparable to an Olympic athlete. For more difficult tasks, a D20 roll may be requested.",
    marksman: "Marksmen are very fast and light on their feet. They have the speed and agility of an Olympic runner or gymnast. For more difficult, superhuman efforts, a D20 roll may be required.",
    monk: "Monks have trained their bodies to be weapons. They are disciplined, precise, and can perform feats of physical strength and agility that border on supernatural.",
    "animal-trainer": `* You have a pet! It can be any animal you wish, but keep it smaller than a black bear. Keep in mind the animal you choose will limit your ability to stay inside an inn. A scary animal, like a dragon, may perturb NPCs.
* You also travel with 3 empty kennels. One is occupied by your starter pet, but the others are for any new pets you may pick up.`,
    criminal: `* Your actions will determine whether or not society is aware of your criminal tendencies. Anonymity has obvious benefits. However, being a famous criminal will lead to making underworld contacts and lawman enemies. Tread cautiously.
* Burglars carry a small pack of 5 items to help them with their crimes (lock picks, grappling hooks, smoke bombs, etc.).`,
    diplomat: `* You are usually the party spokesman. Authorities you encounter will prefer to deal with you.
* Diplomats are great at passing bribes! Everyone has a price.
* **Optional:** Your character may act as a representative of a foreign power or royalty.`,
    merchant: `* Merchants are in this adventuring game for the money. They will usually ONLY take a job if a fee is involved.
* Merchants travel with a cart of goods (up to 10 items). You start with 5 items of your choosing.
* Your Merchant can sell items in their cart to NPCs they meet — sales must make logical sense.`,
    performer: `* Performers in costume cannot carry conspicuous armor or weapons.
* Performers travel with a costume trunk — 5 costumes chosen before you set off.
* Performers can earn money by singing in bars or busking in town squares.`,
    priest: `* You are a member of the clergy. This affords you a level of respect among godfearing types.
* Design your own religion! You may find various skill rolls get a bonus if the situation fits your backstory.

**Choose one Taboo** (forbidden to your priest):
* No verbal communication or business with non-clergy of opposite gender (allies excluded)
* No lying — ever
* No use of potions, medicines, bandages, or non-holy equipment
* No harming non-humanoid non-evil animals
* No earning Gold Coins — all money is "dispersed to the poor"`,
    scout: "Scouts CANNOT carry or equip items that make noise or create light and still use their scout abilities.",
    soldier: `* **Orders:** All soldiers have standing orders as part of a military organization.
* **Fellow Soldiers:** You may encounter fellow soldiers who follow the same banner — outrank them to give instructions; be outranked to receive them.
* **Wages:** Soldiers receive a regular wage from their organization.
* **Discharge:** Too many disciplinary actions leads to discharge and Mercenary status.`,
    tinkerer: `* If your party travels in a steampunk contraption, odds are your tinkerer owns or pilots it.
* Tinkerers carry a small toolbox with 5 tools for repairs and building small machines.`,
    warlock: "You commune with dark forces, so most respectable NPCs will not be disposed toward treating you kindly. You will rarely be able to apply for odd jobs. Pets will growl at you."
  },
  // ─── General Rules (shown in ? panel) ────────────────────────────────────────
  generalContent: `# Skill Checks

There are no skill checks. Anything an athletic adult can do, your players can do. Complicated actions are covered in character/job descriptions.

# Energy

Each player has 10 energy. Energy can be used for attacks, movement, or general actions.

Energy is always refunded at the START of that player's turn.

# Combat Actions

Regular Combat Actions can only be performed ONCE per turn.
Defensive Combat Actions can be performed as many times as you wish.

# General Actions

* Drink a potion: 1 energy
* Pick an item up: 1 energy
* Push a button/pull a lever: 1 energy
* Throw an item: 2 energy per 3 squares

# Movement Actions

* Standard Move: 1 energy per square
* Climbing a wall: 1 energy per 5 feet
* Horizontal Leap: 3 energy per square
* Swimming: 2 energy per square (calm), 3 in a current
* Carrying a heavy item: 3 energy per square

# Entering Combat

When combat begins, players roll a D20 against the GM's combat preparedness level. If ANY player rolls highest, the players ALL go first. If the GM wins, the monsters go first and players have HALF energy for defensive abilities.

# Knocked Out

When a player reaches 0 HP, see the "Am I Dead?" rules.

# Death

There is no permanent death in Simplequest. Dead players are returned to life at the end of combat.

# Fire

Fire in combat does 2 damage to adjacent enemies or players if they END their turn adjacent to it. Standing in fire does 3 damage. Fire can spread in flammable areas.`,
  // ─── Death intro (shown as description header when status = Dead) ────────────
  deathContent: `Your character is still alive, but a couple things have happened:

* You can no longer use your combat abilities and have ZERO energy.
* You can move up to 3 squares per turn.
* Use your class's special Dying ability OR attempt to Resuscitate yourself.
* **DEATH PENALTY:** Discard one equippable item or lose 4 Gold.`,
  // ─── Abilities ───────────────────────────────────────────────────────────────
  abilities: [
    // ── General ──────────────────────────────────────────────────────────────
    {
      title: "Rest",
      body: "Spend 10 minutes resting to recover **D6** energy. You may not rest in combat.",
      context: "inGeneral",
      source: "general"
    },
    {
      title: "Assist",
      body: "Help an ally with their action. They add **D4** to their roll.",
      context: "inGeneral",
      source: "general"
    },
    // ── Wizard ────────────────────────────────────────────────────────────────
    {
      title: "Wand",
      body: `Attack an enemy with a ranged magic blast.

#### Roll a D6

* _1–5_ Do rolled amount of damage to a single enemy.
* _6_ Do 5 damage OR freeze enemy in place for 1 turn.

---

**Wand (passive):** Your magic wand can do small parlor tricks — levitate small objects, conjure food, or manipulate far away objects as if your hands were there.`,
      context: "inCombat",
      source: "wizard",
      energyCost: 3
    },
    {
      title: "Morph",
      body: `Turn an enemy into a less harmful creature! Does not work on Elites. Only one target can be morphed at a time.

#### Roll a D20

* _1–2_ Unintended Morph — the enemy turns into a different, more powerful monster.
* _3–19_ Your spell turns the enemy into a harmless woodland creature. They remain that way until damaged. On their turn, they roll D20 — if they match your roll or lower, they're cured.
* _20_ The enemy is turned into a friendly woodland creature. You now have a pet.`,
      context: "inCombat",
      source: "wizard",
      energyCost: 4
    },
    {
      title: "Reverse Morph",
      body: `Turn a small barnyard or woodland creature into a humanoid of your choice. The enchantment lasts about an hour.

#### Roll a D20

* _1_ Reversal! You are now transformed into an animal instead for 24 hours!
* _2–19_ You are successful. The higher the roll, the more they are likely to pass for human, the longer the enchantment lasts, and their willingness to follow commands.
* _20_ The Full Fairy Tale — the animal is now human forever.`,
      context: "outOfCombat",
      source: "wizard"
    },
    {
      title: "Chain Lightning",
      body: `Attack nearby enemies with a volley of forked lightning.

#### Roll a D4 (no ally damage)
#### Roll a D6 (will hit allies)

* _1–3_ Deal rolled amount of damage to rolled amount of enemies in range.
* _4+_ Uncontrollable Storm. All valid targets in range take 4 lightning damage.`,
      context: "inCombat",
      source: "wizard",
      energyCost: 5
    },
    {
      title: "Storm",
      body: `Make it rain! Must be outside.

#### Roll a D20

* _1–8_ Your attempt to alter the weather fails.
* _9–14_ It starts to rain.
* _15–19_ It starts to storm. Everyone should probably get inside.
* _20_ A violent and dangerous storm appears. Bad things happen. You and your party MUST seek shelter.`,
      context: "outOfCombat",
      source: "wizard"
    },
    {
      title: "Teleport",
      body: `Avoid an attack by teleporting yourself or an ally to another location.

#### Roll a D6

* _1_ Not fast enough. Take all damage, but teleport 3 squares in any direction.
* _2–3_ Take half damage (round down), teleport 3 squares.
* _4–5_ Avoid the attack and move the rolled amount of squares.
* _6_ Switch places with any non-elite enemy. That poor jerk gets hit instead.`,
      context: "inCombat",
      source: "wizard",
      energyCost: 3
    },
    {
      title: "Teleport (General)",
      body: `Move at will through space and time about 10–20 yards at a time. Bypass walls, crowds, jail cell doors. As long as you can see where you are going or have already been there.

**WARNING:** You must pass through a dimension ruled by some pretty nasty monsters.

#### Roll a D20 in secret when you teleport

* _1_ You accidentally teleport to a random location. The GM will let you know where you land, goof.
* _2–19_ It goes off without a hitch. Nice.
* _20_ You return from the netherrealms with a demon in tow.`,
      context: "outOfCombat",
      source: "wizard"
    },
    {
      title: "Illusion",
      body: `Create an illusory double. You may only have one illusion spell operating at a time. If a friendly spell is cast on your double, you receive the benefit.

#### Roll a D20

* _1–2_ Botch. You accidentally create an illusion of a nearby enemy.
* _3–10_ Create an illusion character. Secretly designate one the "real" you. The illusion must stay within 2 squares or it disappears. Illusion is destroyed if attacked.
* _11–18_ Two illusions are created.
* _19–20_ Three illusions are created.`,
      context: "inCombat",
      source: "wizard",
      energyCost: 3
    },
    {
      title: "Illusion (General)",
      body: `Create an illusion. You must concentrate on maintaining it at all times or it will vanish. Can be used to explain, distract, or fool NPCs.

#### D10 to create a small simple illusion
#### D8 to create a person-sized illusion
#### D6 to create an enormous, complicated room-sized illusion

* _1–3_ Failure. You create an image, but it is clearly a magical construct.
* _4–5_ A simple illusion that will on first glance appear real, but won't bear sustained scrutiny.
* _6+_ Your illusion is perfect — sight and sound — and will fool a large group for a while.`,
      context: "outOfCombat",
      source: "wizard"
    },
    {
      title: "Living Flame",
      body: `Create a sentient ball of fire that will do your bidding for a turn.

#### Roll a D6

* _1_ Wild Fireball created adjacent to caster. Does 2 damage to all adjacent enemies and allies.
* _2–5_ Fireball created on target square. Does 3 damage to target. The flame then moves the rolled amount of squares in one direction, doing 2 damage to additional targets.
* _6_ Create a fireball on target square. Does 3 damage to target. You can then move the flame in any direction for 4 additional squares, doing 2 damage to any targets it hits.`,
      context: "inCombat",
      source: "wizard",
      energyCost: 4
    },
    {
      title: "Flame",
      body: `Create a small flame to light torches or set things on fire. But be careful…

#### Roll a D20

* _1–2_ You create a small flame… on yourself. Hope there's some water nearby.
* _3–15_ You create a small, controllable flame.
* _16–19_ Whoops. Fire goes out of control. Better find a way to put it out quickly.
* _20_ You create a huge fireball. If you are in or near a wooden building or forest, it will be an inferno within minutes. ALSO, one item your group possesses is lost to the fire.`,
      context: "outOfCombat",
      source: "wizard"
    },
    // ── Sage ──────────────────────────────────────────────────────────────────
    {
      title: "Read",
      body: "Examine a person, creature, or object and gain insight. Roll **D20** — higher results reveal deeper information. Consult the GM.",
      context: "inGeneral",
      source: "sage"
    },
    {
      title: "Hex",
      body: `Blast an enemy with a cloud of hex magic.

#### Roll a D6

* _1–5_ Deal rolled amount of damage to the target.
* _6_ Deal 5 damage to the target. Create a Pain Aura on the target square that does 1 damage to enemies who end their turn on that square.`,
      context: "inCombat",
      source: "sage",
      energyCost: 3
    },
    {
      title: "Bad Luck",
      body: `Your mystical abilities have a negative impact on nearby small machines and man-made physical objects. You can cause hammerheads to fall off, furnaces to clog, small ropes to snap, and strip gears in clocks.

#### Roll a D8

* _1–2_ Failure. The object withstands your attempt.
* _3–6_ The object breaks. The GM will take your roll amount in consideration to determine severity.
* _7_ The object breaks in a comically obvious way. This will likely draw some suspicion.
* _8_ Haywire. Windows shatter, chairs snap, glasses break in a several-yard radius. This will definitely draw attention to you.`,
      context: "outOfCombat",
      source: "sage"
    },
    {
      title: "Heal",
      body: `Heal self or a player. Any healing done over the target's max HP can be applied as ½ damage to a single enemy adjacent to the target.

#### Roll a D12

* _1_ Botch. Your target is healed for 2 life but loses 2 energy next turn.
* _2–10_ Target is healed for rolled amount.
* _11–12_ Target is healed for rolled amount. Create a magic shield on the target square. Characters inside take 1 less damage from attacks.`,
      context: "inCombat",
      source: "sage",
      energyCost: 4
    },
    {
      title: "Heal (Out of Combat)",
      body: `Attempt to heal an injured or ailing NPC.

#### Roll a D12 if target is ill enough to call out sick
#### Roll a D10 if target is seriously ill
#### Roll a D6 if target is near death

* _1–2_ They take a turn for the worse. If the people who called for your help are superstitious, you may be accused of witchcraft.
* _3–5_ They are stabilized, but not out of the woods.
* _6–9_ They miraculously recover. Your roll value determines how quickly they do so.
* _10–12_ They instantaneously recover. You can expect gratitude, rewards, etc.`,
      context: "outOfCombat",
      source: "sage"
    },
    {
      title: "Shield",
      body: `Create a persistent magical shield on the board that prevents combat damage to characters standing in it.

#### Roll a D20

* _1–3_ Weak Shield. Prevents 2 damage from a single attack and then disappears.
* _7–13_ Stable Shield. Prevents 1 damage.
* _14–19_ Powerful Shield. Prevents 2 damage.
* _20_ Amazing Shield. Prevents 3 damage.`,
      context: "inCombat",
      source: "sage",
      energyCost: 3
    },
    {
      title: "Out of Combat Heal",
      body: `Heal your party ONCE when a combat encounter ends. Useful for dungeons or dangerous areas where resting is not an option.

#### Roll a D20

Distribute the rolled amount among your party members as you see fit.`,
      context: "outOfCombat",
      source: "sage"
    },
    {
      title: "Dispel",
      body: `Attempt to remove a persistent magic spell on the board (shields, pain auras).

#### Roll a D8 if you or another hero made the construct
#### Roll a D6 if it is naturally occurring
#### Roll a D4 if an enemy created it

* _1–2_ Violent explosion. Do 3 damage to the nearest enemy AND the nearest ally to the element.
* _3–5_ The element is destroyed. Do the rolled amount of damage to the enemy closest to the element.
* _6–7_ The element is destroyed. Distribute the rolled amount of damage amongst any enemies in range as you see fit.
* _8_ Instantly disintegrate the nearest non-elite enemy.`,
      context: "inCombat",
      source: "sage",
      energyCost: 3
    },
    {
      title: "Misfortune",
      body: `Afflict an NPC with a brief, minor physical ailment of your choosing. Examples: a bout of sneezing during an important speech, tripping over their own feet, choking at a fancy dinner.

#### Roll a D10 if they are unaware of your presence
#### Roll a D8 if they are aware of your presence
#### Roll a D6 if you have used this ability on them before

* _1_ Haywire. Everyone within several yards, yourself included, suffers from a severe case of the same malady.
* _2–3_ Your hex affects a completely random target.
* _3–5_ It works… possibly a little too well. They will likely be aware they are being messed with.
* _6+_ It works and no one is the wiser.`,
      context: "outOfCombat",
      source: "sage"
    },
    {
      title: "Cleanse",
      body: `Attempt to remove a harmful debuff from yourself or a party member.

#### Roll a D20

* _1_ You infect yourself with the ailment you attempted to remove.
* _2–7_ Improve. The ailment does one final turn of damage and is then removed.
* _8–16_ Success. Debuff removed.
* _17+_ Transfer the debuff to a new target within Range 5.`,
      context: "inCombat",
      source: "sage",
      energyCost: 3
    },
    {
      title: "Exorcism",
      body: `If someone is possessed by a demon, under the influence of a foul magical agent, or under the effects of mind control, you can restore them.

**WARNING:** Attempting an exorcism on an unaffiliated target may cause brain damage. Also, an extracted demon or spirit will be less than thrilled by your actions…

#### Roll a D8 (gain a roll bonus based on advance knowledge of the affliction)

* _1–3_ The victim is beyond your help.
* _4–7_ The malady is removed. Your roll value determines how injured the victim may be.
* _8_ The victim is cured and totally fine.`,
      context: "outOfCombat",
      source: "sage"
    },
    {
      title: "Fear",
      body: `Attempt to scare enemies in your range into fleeing in terror. NOTE: If the afflicted creature runs into an object or off a ledge, they take 2 damage.

#### Roll a D8

* _1_ Botch. ALL characters (including your party and self) flee 3 squares in the opposite direction of where they are currently facing.
* _2–4_ 1 non-elite enemy of your choice flees 4 squares away from you.
* _5–7_ Up to 3 non-elite enemies (or 1 elite) of your choice flee 4 squares away from you.`,
      context: "inCombat",
      source: "sage",
      energyCost: 3
    },
    {
      title: "Jedi Mind Trick",
      body: `Attempt to convince a friendly, non-suspicious NPC of a simple but obvious falsehood. Complex concepts will not work.

#### D8 for a highly intelligent person
#### D10 for a person of average intelligence
#### D12 for a fool

* _1–2_ Epic Failure. Not only does it not work, but they are aware you tried to dupe them with magic.
* _3–5_ Regular failure. They are unaware you tried to dupe them.
* _6+_ Success. They believe your statement as if it were absolute truth.`,
      context: "outOfCombat",
      source: "sage"
    },
    // ── Fighter ───────────────────────────────────────────────────────────────
    {
      title: "Strike",
      body: `Attack with your mainhand fighter weapon.

#### Roll a D6

* _1–5_ Do rolled amount of damage to a single enemy.
* _6_ Critical Blow. Do 7 damage and knock enemy back 1 square.

---

**Slice (passive):** Your sword can cut simple ropes, fruit, and thin pieces of wood. No roll required for simple items. For more difficult cuts (like a metal chain), roll a D8: 1–5 Failure, 6–8 Success.`,
      context: "inCombat",
      source: "fighter",
      energyCost: 3
    },
    {
      title: "Shield Block",
      body: `Use your shield to prevent damage to self OR an adjacent ally.

#### Roll a D6

* _1_ Prevent 1 damage, but drop your shield. Lose 2 energy next turn to pick it back up.
* _2–5_ Prevent rolled amount of damage.
* _6_ Shield Bash — prevent 5 damage and do 3 damage to adjacent enemy.`,
      context: "inCombat",
      source: "fighter",
      energyCost: 2
    },
    {
      title: "Pin",
      body: `Subdue a regular humanoid — including members of your own team!

#### Roll a D12 for a regular humanoid or a Mage/Marksman PC
#### Roll a D8 for an elite humanoid or a fellow Warrior PC

* _1–4_ They break free.
* _5–8_ You succeed in holding them in place for up to a minute.
* _9–12_ You can put them in a sleeper hold and knock them unconscious. If you want.`,
      context: "outOfCombat",
      source: "fighter"
    },
    {
      title: "Reckless Assault",
      body: `Assault the enemy with a flurry of deadly blows.

#### Roll 4× D4

* Even number rolls are done to the enemy.
* Odd number rolls are done to yourself OR an adjacent ally (GM choice).
* If ALL rolls are odd, do the damage to the enemy instead.
* If ALL rolls are even, do an additional D8 damage to the enemy.`,
      context: "inCombat",
      source: "fighter",
      energyCost: 5
    },
    {
      title: "Upper Hand",
      body: `Your deadly combination of great strength and lightning reflexes allow you to quickly gain the upper hand on an NPC. Turn a simple handshake into a grappling hold. Resist arrest by flipping shackles on your jailor.

#### Roll a D20

* _1–4_ Great failure. You injure yourself in the attempt.
* _5–7_ You are evenly matched. You are now grappling with your opponent.
* _8–19_ Success. Whatever you attempted to describe happened.
* _20+_ Unintended success. Something else happens you didn't expect. Usually positive.`,
      context: "outOfCombat",
      source: "fighter"
    },
    {
      title: "Cleave",
      body: `A mighty swing that hits all nearby enemies.

#### Roll a D8

* _1_ Do 1 damage to adjacent characters, including yourself and allies.
* _2–7_ Do half rolled amount (round down) to all adjacent enemies.
* _8_ Tornado of Death — if you have energy remaining, you can move while spinning, hitting adjacent enemies for 4 damage.`,
      context: "inCombat",
      source: "fighter",
      energyCost: 4
    },
    {
      title: "Chop",
      body: `Fell small trees, or knock out wooden support beams or lampposts.

#### Roll a D6

* _1–2_ You fail. If not time sensitive, you can attempt again at +1 after 5–10 minutes.
* _3–6_ You succeed at chopping down whatever you're trying to knock down.`,
      context: "outOfCombat",
      source: "fighter"
    },
    {
      title: "Charge",
      body: `Fling yourself across the battlefield and strike an enemy. NOTE: Only works on enemies on the same plane as you. If you have to climb or swim to reach them, you can't charge.

#### Roll a D10

* _1_ Missed! You move 10 squares forward. If you run into an obstacle, take 4 damage.
* _2–5_ Move yourself adjacent to the FURTHEST enemy within 10 squares.
* _6–9_ Move adjacent to the FURTHEST enemy within 10 squares. Do half rolled amount (round down) as damage.
* _10_ Knock into next week. Move adjacent to the FURTHEST enemy within 10 squares. Do the travelled distance amount of damage.`,
      context: "inCombat",
      source: "fighter",
      energyCost: 4
    },
    {
      title: "Door Bash",
      body: `Locked door in your way? Attempt to knock it down with brute strength. Note: This will create a loud noise.

#### D20 for a standard wooden door
#### D12 for a barred wooden door
#### D10 for a metal door

* _1–6_ The door holds, despite your best efforts.
* _7–9_ The door breaks, allowing entry.
* _10+_ The door explodes, injuring or startling any NPCs that may be inside.`,
      context: "outOfCombat",
      source: "fighter"
    },
    {
      title: "Taunt",
      body: `Attempt to gain the attention of an enemy. Use anytime before an enemy moves. **ENHANCE:** GM can grant a roll bonus if you shout a creative insult.

#### Roll a D20

* _1–3_ Your shout attracts a previously unseen enemy onto the battlefield.
* _5–12_ Target enemy takes D6 damage if they DO NOT attack you this turn.
* _13–18_ Target enemy MUST attack you this turn.
* _19–20_ All enemies within Range 4 will move to attack you for a turn if possible.`,
      context: "inCombat",
      source: "fighter",
      energyCost: 2
    },
    {
      title: "Distract",
      body: `Gain the attention of NPCs to allow a fellow player to do something unseen (pick a pocket, unlock a door, steal documents from a desk).

#### Roll a D10 to distract a single NPC
#### D8 to distract a small group
#### D6 for a large crowd

* _1–3_ You fail to gain the attention of the target.
* _4–5_ You succeed for about 15 seconds.
* _6+_ You can keep a group enthralled for several minutes.`,
      context: "outOfCombat",
      source: "fighter"
    },
    // ── Marksman ──────────────────────────────────────────────────────────────
    {
      title: "Shoot",
      body: `Fire an arrow in a straight (or diagonal) line.

#### Roll a D6, do X damage to single target
OR
#### Roll a D8

* _1_ Arrow misses target and hits a nearby ally for 3 damage.
* _2–8_ Do rolled amount of damage to a single target.`,
      context: "inCombat",
      source: "marksman",
      energyCost: 3
    },
    {
      title: "Shoot Arrow",
      body: `Arrows can be shot in a variety of non-combat ways — cut a hanging man from a scaffold, hit simple wooden levers to open gates, hunt small animals, etc.

#### Roll a D12 to hit a STATIONARY target
#### D8 on a moving target

* _1_ Spectacular failure. If there's a noisy pot to shatter or an innocent bystander, you totally hit it.
* _2–3_ Regular failure. If no witnesses and time is not of the essence, you can try again.
* _4–6_ Success, but you give away your shooting position.
* _7+_ Great success. If you were trying to be stealthy, nobody noticed.`,
      context: "outOfCombat",
      source: "marksman"
    },
    {
      title: "Fire Arrows",
      body: `Send a flaming arrow in a straight or diagonal line to damage an enemy or set an object alight.

#### Roll a D20

* _1–3_ Miss. The flaming arrow sets a random square adjacent to your target on fire.
* _4–17_ Set Ablaze. Do 4 damage to target and create a fireball on your target square.
* _18–20_ Wildfire. Do 6 damage to target. Several nearby squares also catch fire.`,
      context: "inCombat",
      source: "marksman",
      energyCost: 4
    },
    {
      title: "Poison Arrow",
      body: `Send a poisonous arrow to damage an enemy over time.

Poisoned enemies must roll a D4 at the beginning of their next turn. If they match their original damage amount, they are cured. If not, they take the new rolled amount as damage.

#### Roll a D8

* _1_ You accidentally touch the poisoned tip. Both you and the target are poisoned.
* _2–7_ Target takes half rolled amount as damage (rounded up) and is poisoned.
* _8_ Paralyzing Shot. 4 damage and you choose whether it hits the enemy's leg (cannot move), arm (cannot physically attack), or head (cannot cast spells).`,
      context: "inCombat",
      source: "marksman",
      energyCost: 4
    },
    {
      title: "Poison Resistance",
      body: `You've spent years working with poisons, building up a sort of immunity to them. Most poisons have no effect on you.

Even deadly or powerful poisons require a D20 check to see how effective they are on you.`,
      context: "inGeneral",
      source: "marksman"
    },
    {
      title: "Distracting Shot",
      body: `Take advantage of a distracted enemy as they attack an ally (NOT YOU) to get in some extra damage. You must have line of sight with the enemy.

#### Roll a D10

* _1_ Spectacular failure. You shoot your ally for 2 damage. Sorry.
* _2–8_ Half rolled (round down) range damage to the creature.
* _9–10_ 5 range damage. Its attack is messed up and it only does half damage to your ally.`,
      context: "inCombat",
      source: "marksman",
      energyCost: 2
    },
    {
      title: "Ask Questions Later",
      body: `Quickly draw your weapon to attack an enemy before they have a chance to react. This will likely throw you into combat.

#### Roll a D20

* _1–2_ You fumble the weapon and it falls to the floor. If this begins combat, you lose 3 energy on your first turn to pick it up again.
* _3–6_ You manage to pull out your weapon and get a shot off. 2 damage and combat begins.
* _7–14_ 4 damage and combat begins.
* _15–19_ 6 damage, combat begins, and you take your turn first.
* _20_ You kill a non-elite enemy instantly. Surviving enemies may surrender. If not, you and your party go first.`,
      context: "outOfCombat",
      source: "marksman"
    },
    {
      title: "Dodge",
      body: `Attempt to avoid an attack.

#### Roll a D20 (NOTE: Roleplaying a dodge using terrain features earns a GM bonus to this roll)

* _1–2_ Botch. You collide with the nearest enemy or adjacent ally. 2 damage to both of you and the intended attack continues.
* _3–12_ Resist 1/3 rolled amount (round down) damage. Move to adjacent square.
* _13–19_ Resist all damage. Move up to 2 squares.
* _20_ Human Shield. Resist all damage, move 2 squares. Enemy instead hits another enemy if in range, or self.`,
      context: "inCombat",
      source: "marksman",
      energyCost: 2
    },
    // ── Monk ──────────────────────────────────────────────────────────────────
    {
      title: "Kung Fu",
      body: `Assault the enemy with a series of punches and kicks.

#### Roll a D4

* _1_ 1 Damage.
* _2_ 2 Damage.
* _3_ 3 Damage. You may use Martial Arts again for 2 Energy.
* _4_ 3 Damage. You may use Martial Arts again for 1 Energy.`,
      context: "inCombat",
      source: "monk",
      energyCost: 3
    },
    {
      title: "Judo Throw",
      body: `Grab an enemy and throw them a great distance.

#### Roll a D6

* _1_ Grapple. You are locked in a struggle with the target. To escape, you must perform another Judo Throw. If you lack the energy, both of you are locked in the grapple, unable to act until your next turn. Damage to either of you breaks this effect.
* _2–6_ Target takes X damage and moves Y squares in any direction, where X+Y equals the amount rolled. Monk determines the values.`,
      context: "inCombat",
      source: "monk",
      energyCost: 4
    },
    {
      title: "Chi Heal",
      body: `Use your own life force to aid an ally.

#### Roll a D10

* _1_ You lack proper concentration. You may reroll for 1 Energy. CONCENTRATE!
* _2–8_ Heal target for rolled amount. You take damage equal to HALF rolled amount (rounded down).
* _9–10_ Heal target for 8 health. Deal 4 damage to nearest enemy.`,
      context: "inCombat",
      source: "monk",
      energyCost: 4
    },
    {
      title: "Soul Siphon",
      body: `Use a secret martial arts technique to steal the life force from an enemy.

#### Roll a D20

* _1_ You accidentally steal the very essence of your target. For the rest of the encounter, that enemy exerts influence over your actions — they can move you 1–3 squares at the end of your turn OR do a weak attack if you are near allies!
* _2–10_ You do 3 damage to your target and recover 2 health.
* _11–19_ You do 5 damage and recover 4 health.
* _20_ You do 6 damage. You recover all of your spent energy this turn. Party on!`,
      context: "inCombat",
      source: "monk",
      energyCost: 5
    },
    {
      title: "Flying Scissor Kick",
      body: `Fly through the air and assault a nearby enemy. Before you roll, choose one of the 8 possible directions. NOTE: This attack ends if you encounter a large terrain object.

#### Roll a D8

* _1–7_ Travel rolled amount of spaces in a single direction. If you collide with an enemy or terrain object, you deal 3 damage and stop moving.
* _8_ Travel 6 spaces in a single direction. If you collide with an enemy, you deal 5 damage. You may spend 1 additional energy per square to keep moving, dealing 1 damage per square.`,
      context: "inCombat",
      source: "monk",
      energyCost: 4
    },
    {
      title: "Earthcall",
      body: `Implore the very earth beneath your feet to create rock barriers. These barriers remain on the board for the remainder of the encounter.

#### Roll a D20

* _1_ Quicksand! Everyone within range must spend 3 energy per square to move for an entire turn. You are stuck and cannot move at all for an entire turn.
* _2–10_ A pillar of earth shoots out of the ground, knocking an enemy into the air for 1/2 rolled damage.
* _11–19_ A pillar of earth knocks an enemy into the air for 5 damage and adjacent enemies for 2 damage each.
* _20_ Earthquake! The earth opens up, consuming a non-elite target, killing them instantly. Elite targets take 8 damage. All ground-based enemies and allies in visible range take 1 damage.`,
      context: "inCombat",
      source: "monk",
      energyCost: 5
    },
    {
      title: "Dodge",
      body: `Attempt to avoid an attack.

#### Roll a D10 (NOTE: Roleplaying a dodge using terrain features earns a GM bonus to this roll)

* _1_ Botch. You collide with the nearest enemy or adjacent ally. 2 damage to both of you and the intended attack continues.
* _2–8_ Resist 1/2 rolled amount (round down) damage. Move to adjacent square.
* _9–10_ Perfect dodge. Resist all damage and move up to 2 squares.`,
      context: "inCombat",
      source: "monk",
      energyCost: 2
    },
    // ── Animal Trainer ────────────────────────────────────────────────────────
    {
      title: "Analyze Beast",
      body: `Learn the weaknesses of any non-humanoid beast (wolves, spiders, bears, dragons) enemy. Can only be performed ONCE per enemy type.

#### Roll a D4

* _1_ Learn how much HP the enemy has.
* _2_ Learn the nature of their attacks.
* _3_ Learn the enemy's weaknesses, if any.
* _4_ You do an additional 1 damage to that enemy type for the remainder of the battle.`,
      context: "inCombat",
      source: "animal-trainer",
      energyCost: 2
    },
    {
      title: "Talk With The Animals",
      body: `You often understand the intentions and motives of friendly, wild animals. In some cases, you can even communicate with them.

#### Roll a D4

* _1_ You can ask an animal a question.
* _2_ You can make a simple request of any friendly animal.
* _3_ Convince an animal to assist you in an upcoming fight. They are not controllable like a pet and their assistance may not be what you expect…
* _4_ Choose any one of the above options.`,
      context: "outOfCombat",
      source: "animal-trainer"
    },
    {
      title: "Summon Pet",
      body: `Summon an animal friend into battle. You can only summon a pet once per battle. You can dismiss your pet on your turn. If your pet dies, it is gone forever.

#### Roll a D20

* _1–4_ Feral. Your pet will ignore your commands and attack friends and foes (but not you).
* _5–12_ Leashed. Your pet can take simple instructions, so long as you stay within Range 3. Otherwise it is uncontrolled.
* _13–19_ Good Boy. Your pet obeys your every command, regardless of distance.
* _20_ Make Friends. Your pet can convince another non-humanoid monster to join your side.`,
      context: "inCombat",
      source: "animal-trainer",
      energyCost: 5
    },
    {
      title: "Domesticate",
      body: `Attempt to domesticate a non-aggressive wild animal you encounter. Once per day.

Wild animals in training must be kept in a kennel. If the animal is not trained on the last attempt, it is untrainable and must be freed.

#### Roll a D4 on your first day
#### D6 on second day
#### D8 on the last, as necessary

* _1_ YOW! It bit you! One of your items is randomly damaged and cannot be used until repaired.
* _2–3_ The animal does not respond to your attempts at training.
* _4+_ You successfully train the animal. It is now your pet.`,
      context: "outOfCombat",
      source: "animal-trainer"
    },
    // ── Criminal ──────────────────────────────────────────────────────────────
    {
      title: "Mark Target",
      body: `Find the weakest member of the herd and single them out for destruction.

#### Roll a D4

* _1–3_ Identify the creature with the lowest HP in your range. Your attacks do 1 additional damage to that enemy.
* _4_ Identify the creature with the lowest HP in your range. Your ENTIRE PARTY's attacks do 1 additional damage to that enemy.`,
      context: "inCombat",
      source: "criminal",
      energyCost: 2
    },
    {
      title: "Case",
      body: `Identify the best targets for thievery in the immediate area.

#### Roll a D4

* _1_ Identify the most valuable, thievable item in the immediate area.
* _2_ Identify the best pickpocket target in the immediate area.
* _3_ Get a good sense of the local security measures and whether attempting a theft is a good idea.
* _4_ Choose one of the above.`,
      context: "outOfCombat",
      source: "criminal"
    },
    {
      title: "Pickpocket",
      body: `Attempt to steal something from a humanoid enemy.

#### Roll a D8 if in front of an enemy
#### Roll a D10 if on the side
#### Roll a D12 if directly behind

* _1–2_ You are caught! They counterattack you with their standard attack.
* _3–6_ You find nothing, but you do stab them in the thigh for the rolled amount of damage.
* _7–8_ Success! You find some money!
* _9–10_ Success! You steal the weapon in their hand. They can no longer use it to attack.
* _11+_ Success! You steal a random item! But the added weight means you are encumbered and have -1 energy for the remainder of the encounter.`,
      context: "inCombat",
      source: "criminal",
      energyCost: 5
    },
    {
      title: "Pick Lock",
      body: `Attempt to open a sealed chest, door, or lock.

#### Roll a D20 for a simple lock
#### Roll a D12 for a normal lock
#### Roll a D10 for a complex lock

* _1–4_ Lockpick breaks in lock. Door/chest cannot be opened.
* _5–7_ Your first attempt fails. You can try again, but if this is time sensitive, be careful.
* _8–11_ Lock opens.
* _12+_ Lock opens. In addition to scripted items, you also find some money.`,
      context: "outOfCombat",
      source: "criminal"
    },
    // ── Diplomat ──────────────────────────────────────────────────────────────
    {
      title: "Analyze Person",
      body: `Learn the weaknesses of any humanoid (human, dwarf, elf, halfling, etc.) enemy. Can only be performed ONCE per enemy type.

#### Roll a D4

* _1_ Learn how much HP the enemy has.
* _2_ Learn the nature of their attacks.
* _3_ Learn the enemy's weaknesses, if any.
* _4_ You do an additional 1 damage to that enemy type for the remainder of the battle.`,
      context: "inCombat",
      source: "diplomat",
      energyCost: 2
    },
    {
      title: "Detect Motives",
      body: `You are skilled at assessing a situation and understanding what people want. You can often tell just by looking at someone what they're really like — even if they are trying to deceive you.

#### Roll a D4

* _1_ You determine whether or not a person is being honest.
* _2_ You understand their motives.
* _3_ You understand what they desire.
* _4_ If an NPC is harboring a secret, you get at least a clue as to what it may be.`,
      context: "outOfCombat",
      source: "diplomat"
    },
    {
      title: "Persuade",
      body: `ONCE per battle, convince a non-elite minion to fight for you.

#### Roll a D20 (Modifications: convincing RP, actual monetary bribes)

* _1–2_ Failure. That monster is insulted and will only attack you.
* _3–6_ Confuse. The monster is confused by your argument. It will not attack you this turn.
* _7–19_ Success. The monster fights for you. Stay in earshot (6 squares) or it'll ignore you.
* _20_ Congrats. You now have a pet. Give it a name. It will follow any instructions regardless of distance. NOTE: Cannot persuade another minion until your old pet is released or killed.`,
      context: "inCombat",
      source: "diplomat",
      energyCost: 5
    },
    {
      title: "Bribe",
      body: `Attempt to get your way with a monetary bribe. Roll a die — the result determines how much the bribe will cost you. Feel free to pass the hat around your party.

#### Roll a D2 if they like you
#### Roll a D4 if they are neutral
#### Roll a D6 if they dislike you`,
      context: "outOfCombat",
      source: "diplomat"
    },
    // ── Merchant ──────────────────────────────────────────────────────────────
    {
      title: "Renegotiate",
      body: "After you are attacked, make the GM reroll their damage dice! You must take the new damage amount, even if it is higher…",
      context: "inCombat",
      source: "merchant",
      energyCost: 2
    },
    {
      title: "Shopping",
      body: `You are an expert at buying and selling goods. You know where all the best shops are, or if you are already in a shop, whether or not you can get a better deal.

#### Roll a D4

* _1_ Get a discount at this particular shop.
* _2_ Get a better deal when trading in goods.
* _3_ Gain access to items "in the back room" not available to regular customers.
* _4_ Choose one of the above.`,
      context: "outOfCombat",
      source: "merchant"
    },
    {
      title: "Equipment Cart",
      body: `Summon your small 1×2 Merchant Cart onto the battlefield. It has 15 HP and can move 2 squares on your turn. It cannot be healed or traverse difficult terrain. Can only be summoned once per combat encounter.

Up to two players can hide inside the cart. Once inside, players are immune to damage but cannot use offensive or ranged abilities.`,
      context: "inCombat",
      source: "merchant",
      energyCost: 0
    },
    {
      title: "Identify Sellable Item",
      body: `Find treasure in items most adventurers would overlook.

#### Roll a D20

* _1–6_ It's actual junk. You can take it with you, but it will be difficult to sell.
* _7–17_ You find one or two decent items you can add to your stock. Roll determines value.
* _19–20_ You find a valuable treasure that is actually decent enough to use in your adventures.`,
      context: "outOfCombat",
      source: "merchant"
    },
    // ── Performer ─────────────────────────────────────────────────────────────
    {
      title: "Mimic",
      body: `Attempt to mimic an attack made upon you.

#### Roll a D4

* _1–3_ Copy Attack — on your next attack, in addition to your regular damage, do the amount of damage you just took as well.
* _4_ Nailed It — learn the enemy's attack. You can use this ability yourself for the remainder of the battle.`,
      context: "inCombat",
      source: "performer",
      energyCost: 4
    },
    {
      title: "Perform",
      body: `All eyes are on you. This better be good.

#### Roll a D4

* _1_ The audience doesn't really pay you much attention.
* _2_ The audience really gets into the performance.
* _3_ The audience is entranced. They will likely throw some money your way.
* _4_ You are the second coming of Elvis.`,
      context: "outOfCombat",
      source: "performer"
    },
    {
      title: "Compose Song",
      body: `Sing a song about the current battle. You will actually be composing this song during combat, so keep a notepad nearby. You MUST add a new line per turn and there should be some kind of proper form or rhyming scheme.

#### Different kinds of lines have different effects (choose one if a line qualifies for multiple):

* Lines that describe **SPECIFIC ENEMY ACTIONS** → that enemy does half damage this turn.
* Lines about **SPECIFIC ALLY ACTIONS** in range → heal them D4+1 HP.
* Lines about **YOURSELF** → refund of energy, but no effect, you egomaniac…
* **Insulting an enemy** → no concrete effect, but they may be more inclined to attack you…`,
      context: "inCombat",
      source: "performer",
      energyCost: 1
    },
    {
      title: "Disguise",
      body: `Impersonate either a specific NPC (The King, a famous criminal) or a type of NPC (a guard, a courtesan) for purposes of deception.

When your costume is created, the GM will rate it from 1 to 6. A cobbled-together guard uniform may only be a 2 or 3. If you knock out a guard and take his uniform, that will likely be a 5 or 6.

#### Roll a D6 when attempting to fool a person or roomful of persons

* _Lower or Equal_ You fool everyone. You are as you appear to be.
* _Higher_ They see through your costume immediately or become suspicious. Time to find an exit.`,
      context: "outOfCombat",
      source: "performer"
    },
    // ── Priest ────────────────────────────────────────────────────────────────
    {
      title: "Miracle!",
      body: `When an enemy is about to attack you, pray to the heavens to spare your life. NOTE: You can only use this once per turn.

#### Roll a D100

* _1–85_ Like what happens with most prayers, nothing happens.
* _86–99_ The attack misses completely! This is clearly due to divine intervention!
* _100_ You are infused with the spirit of a powerful celestial being for the remainder of the encounter. Your life is healed to full and you can attack with a mighty celestial blade for 2 Energy that does D100 damage.`,
      context: "inCombat",
      source: "priest",
      energyCost: 1
    },
    {
      title: "Sense the Divine",
      body: `Sense the presence of divine or mystical beings. They will often take the form of mortals, but you know better…

#### Roll a D20

The quality of your roll determines how firm a read you have. A low roll may mean you feel a presence. An extremely high roll can pinpoint exactly where this deity may be hiding.`,
      context: "outOfCombat",
      source: "priest"
    },
    {
      title: "Convert",
      body: `Attempt to convince an enemy to repent their evil ways after they have injured you.

#### Roll a D10 — compare your roll to the TOTAL amount of damage a SINGLE non-elite enemy has inflicted upon you in the current battle

* _Equal or Lower_ The enemy regrets their actions and will now fight on your side.
* _Higher_ No regrets. The enemy resents your attempts. They will DEFINITELY attack you next turn.

You can only successfully convert one enemy per encounter.`,
      context: "inCombat",
      source: "priest",
      energyCost: 4
    },
    {
      title: "Preach",
      body: `Attempt to convert an NPC or group of NPCs to your religion. Once a day.

#### Roll a D20

* _1–5_ They hate what you have to say and will not speak to you. The locals will give you a hard time.
* _6–14_ The locals appreciate what you have to say. They'll help you out.
* _15–19_ You've gained a follower! They will aid your party in various ways: money, lodging, tips and secrets, maybe even a magic item.
* _20_ You've gained a zealot. They will do whatever you tell them to do — including following you into battle.`,
      context: "outOfCombat",
      source: "priest"
    },
    // ── Scout ─────────────────────────────────────────────────────────────────
    {
      title: "Detect Hidden",
      body: `Attempt to detect hidden traps or monsters.

#### Roll a D20

* _1_ If there's a trap within 3 squares, you detect it… by setting it off.
* _2–9_ Detect invisible/hidden traps or monsters within 3 squares.
* _10–16_ Detect invisible/hidden traps or monsters within 6 squares.
* _17–20_ Detect invisible/hidden traps or monsters within 8 squares.`,
      context: "inCombat",
      source: "scout",
      energyCost: 2
    },
    {
      title: "Knowledge — Danger",
      body: `Your mastery over the senses of sight and hearing allow you to detect nearby danger. Rustles in nearby bushes from hungry wolves, guards in the next room quietly loading crossbows, kobolds waiting to strike in the trees. You notice details others may not.

#### Roll a D20 — number determines quality of read.`,
      context: "outOfCombat",
      source: "scout"
    },
    {
      title: "Stealth",
      body: `Blend into your surroundings and go invisible to enemies.

#### Roll a D6

* If you roll **EQUAL TO OR LOWER** than the distance between you and the nearest enemy, you succeed in going stealth.
* If you roll **HIGHER**, you fail, but you are harder to see and the next attack on you will deal 1 less damage.

While in stealth, enemies may not attack you. If an enemy walks next to you on their turn, stealth is removed.

Attacking, healing, or performing defensive actions removes stealth. HOWEVER, your first attack out of stealth does ×2 damage as an Ambush.`,
      context: "inCombat",
      source: "scout",
      energyCost: 5
    },
    {
      title: "Spy",
      body: `Attempt to spy on people unobserved.

#### Roll a D6 VERSUS the subject you're spying on. If you match or exceed their roll, you are unseen.

**Modifiers:** Dress, time of day, and cover can give bonuses. Awareness of subjects or animal presence can give negatives.

NOTE: You may have to make SEVERAL spy checks in a row if you are attempting to sneak into a heavily guarded area.`,
      context: "outOfCombat",
      source: "scout"
    },
    // ── Soldier ───────────────────────────────────────────────────────────────
    {
      title: "Adaptable",
      body: `You are an expert at adapting to changing conditions on a battlefield. Use this ability after you have been PHYSICALLY attacked. This ability can stack with any other class defensive abilities.

#### Roll a D4

* _1–3_ Prevent rolled amount of damage the NEXT TIME this enemy ability is used against you.
* _4_ Prevent 2 damage NEXT and EVERY TIME this ability is used against you in this battle.`,
      context: "inCombat",
      source: "soldier",
      energyCost: 2
    },
    {
      title: "Battle Strategy",
      body: `Size up a location and assess the best way to utilize your surroundings for advantage.

#### Roll a D4

* _1_ Tell where the enemy will most likely attack from. Or, where hidden bad guys are most likely to be found.
* _2_ Tell where spots of good defensive cover are. Or poor cover — like a wobbly table or a rug under a shaky chandelier.
* _3_ Spy 1 hidden trap. Or confirm there are no traps in the area.
* _4_ Choose any of the above.`,
      context: "outOfCombat",
      source: "soldier"
    },
    {
      title: "Weapon Master",
      body: `There is no weapon in the world you cannot wield. Steal a weapon from an enemy and use it against them! Cannot be used against Elite Enemies or enemies who are not carrying weapons.

#### Roll a D20

* _1_ You yank the weapon out of their hand, but fall over backward and hit yourself with it. Lose D6 life.
* _2–8_ You get into a tug of war match. Both of you roll D6. You exchange damage. The person with the highest roll keeps the weapon.
* _9–18_ You steal their weapon. You can now use any special attacks that weapon may bestow.
* _19–20_ You steal their weapon and immediately kill them with it. Violently.

You may only have one stolen weapon at a time.`,
      context: "inCombat",
      source: "soldier",
      energyCost: 5
    },
    {
      title: "Marshal Forces",
      body: `Organize a group of local military officials or guards to perform a complex, non-combat related task. Form a posse, a bucket brigade, or an anti-riot squad.

#### Roll a D6

* _1_ Whoops. Your target outranks you. Now YOU are the one taking orders here.
* _2–5_ You gain the rolled amount of redshirt minions, prepared to take your orders.
* _6_ As many people as you need to get the job done appear, within reason.`,
      context: "outOfCombat",
      source: "soldier"
    },
    // ── Tinkerer ──────────────────────────────────────────────────────────────
    {
      title: "Analyze Mechanical Construct",
      body: `Learn the weaknesses of any mechanical (steampunk, robot, golem) enemy. Can only be performed ONCE per enemy type.

#### Roll a D4

* _1_ Learn how much HP the enemy has.
* _2_ Learn the nature of their attacks.
* _3_ Learn the enemy's weaknesses, if any.
* _4_ You do an additional 1 damage to that enemy type for the remainder of the battle.`,
      context: "inCombat",
      source: "tinkerer",
      energyCost: 2
    },
    {
      title: "Repair Machine",
      body: `If something is broken, your tinkerer knows what is wrong with it and, if possible, how to fix it.

#### Roll a D20 (add a modifier if you have an appropriate tool)

* _~1_ It's reaaaaally broken. Will take several days to repair.
* _~10_ You can probably get this thing up and going in an hour or so. You may need an additional component.
* _~20_ You turn a screw and it's basically good as new.`,
      context: "outOfCombat",
      source: "tinkerer"
    },
    {
      title: "Create Mechanical Trap",
      body: `Create a small mechanical trap in 1 nearby unoccupied square.

#### Roll a D20

* _1–4_ Botch. The trap goes off. All enemies and allies in range roll a D6, including you. Lowest roll takes that much damage.
* _5–11_ You create a trap. Anyone who walks over that square, friend or foe, takes D6 damage. They are immobilized on rolls of 4+; they escape next turn. The trap can be reset by a Marksman for 2 Energy and no roll.
* _12–19_ Your trap is invisible to all enemies, even to the GM.
* _20_ You can set two invisible traps.`,
      context: "inCombat",
      source: "tinkerer",
      energyCost: 3
    },
    {
      title: "Macguyver",
      body: `Create small, interesting machines or gizmos out of 2–3 simple found objects in the immediate area. A tranq dart gun made out of rolled-up parchment, a nearby toadstool, and a sewing needle? Sounds great. Whatever you imagine, as long as it makes fantasy RPG sense.

Search the immediate area for the components you need. GM assigns a target number based on RP and likelihood of finding the object.

#### Roll a D10

* If you roll **OVER** the number, you find the item.
* If the items can be reasonably found (leaves in a forest, a garbage can in a city street), no roll required.
* You can use any item in your toolbox for no roll.

Your tinkerer can keep up to 2 successfully created machines to use later. Every time you use the machine, roll a D6 — if you roll a 1, it breaks.`,
      context: "outOfCombat",
      source: "tinkerer"
    },
    // ── Dying (isDead) ────────────────────────────────────────────────────────
    {
      title: "Resuscitate",
      body: `Attempt to recover from your wounds and return to the fight. If an ally is adjacent, they can spend 3 Energy to boost your roll by 1 BEFORE you roll.

#### Roll a D6

* _1–5_ You are still clinging to life. If you attempt to Resuscitate next turn, add 1 to your roll.
* _6_ You return to life with 5 HP and 4 energy.`,
      context: "isDead",
      source: "general"
    },
    {
      title: "Dying — Trip",
      body: `**Adjacent**

#### Roll a D20

* _1–4_ You hold on, but they keep moving. If the enemy moves, they drag you with them.
* _5–13_ You trip the enemy. They are unable to physically move on their turn.
* _14–19_ You trip the enemy. They can't move and take 3 damage in the fall.
* _20_ You leap on an enemy's back. They flail about, likely hitting themselves or a fellow enemy.`,
      context: "isDead",
      source: "fighter"
    },
    {
      title: "Dying — Shoot",
      body: `**Defensive**

Every time an enemy passes your line of sight (any square DIRECTLY in front of you), shoot an arrow at them.

#### Roll a D4

Do the rolled amount of damage.`,
      context: "isDead",
      source: "marksman"
    },
    {
      title: "Dying — Possession",
      body: `**Range 5** — NOTE: Previously possessed enemies CANNOT be possessed again.

#### Roll a D20

* _1–5_ Failed possession. The enemy does half damage this turn.
* _6–13_ Possess the enemy for a turn.
* _14–19_ Possess the enemy until it takes damage.
* _20_ Possess an enemy until it dies.`,
      context: "isDead",
      source: "sage"
    },
    {
      title: "Dying — Elemental Storm",
      body: `#### Roll a D6 twice

Drop a burst of flame X squares left/right and Y squares up/down from your location. You choose which roll is X and which is Y.

If the flame lands ON an enemy, they take 4 damage. NEXT TO an enemy: 1 damage. The flame remains for the encounter and damages friend and foe alike.`,
      context: "isDead",
      source: "wizard"
    },
    {
      title: "Dying — Last Stand",
      body: `Even as you fall, your training drives one final strike.

#### Roll a D8

Do the rolled amount of damage to an adjacent enemy.`,
      context: "isDead",
      source: "monk"
    },
    // ── Warlock ───────────────────────────────────────────────────────────────
    {
      title: "Analyze Undead",
      body: `Learn the weaknesses of any undead (skeleton, zombie, vampire, etc.) enemy. Can only be performed ONCE per enemy type.

#### Roll a D4

* _1_ Learn how much HP the enemy has.
* _2_ Learn the nature of their attacks.
* _3_ Learn the enemy's weaknesses, if any.
* _4_ You do an additional 1 damage to that enemy type for the remainder of the battle.`,
      context: "inCombat",
      source: "warlock",
      energyCost: 2
    },
    {
      title: "Detect Evil",
      body: `You have a vast knowledge of the dark magics. You can identify evil spells, sense when dark magic is occurring, and identify artifacts of darkness.

#### Roll a D4

* _1_ Pinpoint the source of the evil magic.
* _2_ Understand the effects of the evil.
* _3_ Identify the name of the person/entity behind the evil magic.
* _4_ Choose one of the above three options.`,
      context: "outOfCombat",
      source: "warlock"
    },
    {
      title: "Create Zombie",
      body: `Create a zombie from a freshly killed corpse of a humanoid enemy or NPC. Only one zombie can be active at a time.

#### Roll a D20

* _1–2_ Failure. You anger the ghostly spirit of the dead. It returns, seeking vengeance.
* _3–19_ They return as a zombie under your control.
* _20_ The target returns to life, unzombified. Grateful for the miracle resurrection, they join your cause.

**Summoned Zombie Stats:** 10 HP, 4 Movement per turn.
**Standard Attack (Adjacent Bite):** Roll a D6 — _1–2_ Do rolled amount of damage, you lose control of the zombie next turn (it attacks the closest target, friend or foe). _3–6_ Do rolled amount of damage.`,
      context: "inCombat",
      source: "warlock",
      energyCost: 4
    },
    {
      title: "Commune With the Dead",
      body: `Summon a spirit to gain information. Must be cast near a dead body or a grave. Once per body, or close by group of bodies.

#### Roll a D20 (RP gathering materials and details about the ritual for a bonus to the roll)

* _1_ Poltergeist. You and your party are now haunted by an angry spirit. The only way to get rid of it is to bring it peace…
* _2–5_ You hear a faint whisper of a hint, or clue, as if on the wind.
* _6–12_ An angry, restless, barely useful spirit is reluctantly summoned.
* _13–19_ A helpful spirit will be summoned. It will do all it can to aid you on your quest.
* _20_ Your spirit friend will aid you in an upcoming battle. It is a non-elite NPC that takes verbal instructions on its turn from you.`,
      context: "outOfCombat",
      source: "warlock"
    }
  ]
};
ln("simple-quest", {
  content: "",
  character: ""
}, (n, {
  element: e
}) => m(Yo, {
  get content() {
    return n.content;
  },
  get character() {
    return n.character;
  },
  element: e
}), {
  shadow: !0
});
export {
  Io as sampleContent
};
