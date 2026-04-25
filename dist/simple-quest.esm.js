var qt = Object.defineProperty;
var Ke = (n) => {
  throw TypeError(n);
};
var zt = (n, e, t) => e in n ? qt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var x = (n, e, t) => zt(n, typeof e != "symbol" ? e + "" : e, t), It = (n, e, t) => e.has(n) || Ke("Cannot " + t);
var Je = (n, e, t) => e.has(n) ? Ke("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t);
var ce = (n, e, t) => (It(n, e, "access private method"), t);
const Ot = (n, e) => n === e, G = Symbol("solid-proxy"), ze = Symbol("solid-track"), ge = {
  equals: Ot
};
let it = dt;
const j = 1, ye = 2, st = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var S = null;
let Re = null, Pt = null, T = null, R = null, L = null, Se = 0;
function fe(n, e) {
  const t = T, o = S, a = n.length === 0, r = e === void 0 ? o : e, i = a ? st : {
    owned: null,
    cleanups: null,
    context: r ? r.context : null,
    owner: r
  }, s = a ? n : () => n(() => Q(() => oe(i)));
  S = i, T = null;
  try {
    return W(s, !0);
  } finally {
    T = t, S = o;
  }
}
function B(n, e) {
  e = e ? Object.assign({}, ge, e) : ge;
  const t = {
    value: n,
    observers: null,
    observerSlots: null,
    comparator: e.equals || void 0
  }, o = (a) => (typeof a == "function" && (a = a(t.value)), ut(t, a));
  return [ct.bind(t), o];
}
function D(n, e, t) {
  const o = Me(n, e, !1, j);
  ie(o);
}
function pe(n, e, t) {
  it = jt;
  const o = Me(n, e, !1, j);
  o.user = !0, L ? L.push(o) : ie(o);
}
function M(n, e, t) {
  t = t ? Object.assign({}, ge, t) : ge;
  const o = Me(n, e, !0, 0);
  return o.observers = null, o.observerSlots = null, o.comparator = t.equals || void 0, ie(o), ct.bind(o);
}
function Lt(n) {
  return W(n, !1);
}
function Q(n) {
  if (T === null) return n();
  const e = T;
  T = null;
  try {
    return n();
  } finally {
    T = e;
  }
}
function Nt(n) {
  pe(() => Q(n));
}
function lt(n) {
  return S === null || (S.cleanups === null ? S.cleanups = [n] : S.cleanups.push(n)), n;
}
function Ie() {
  return T;
}
function ct() {
  if (this.sources && this.state)
    if (this.state === j) ie(this);
    else {
      const n = R;
      R = null, W(() => be(this), !1), R = n;
    }
  if (T) {
    const n = this.observers ? this.observers.length : 0;
    T.sources ? (T.sources.push(this), T.sourceSlots.push(n)) : (T.sources = [this], T.sourceSlots = [n]), this.observers ? (this.observers.push(T), this.observerSlots.push(T.sources.length - 1)) : (this.observers = [T], this.observerSlots = [T.sources.length - 1]);
  }
  return this.value;
}
function ut(n, e, t) {
  let o = n.value;
  return (!n.comparator || !n.comparator(o, e)) && (n.value = e, n.observers && n.observers.length && W(() => {
    for (let a = 0; a < n.observers.length; a += 1) {
      const r = n.observers[a], i = Re && Re.running;
      i && Re.disposed.has(r), (i ? !r.tState : !r.state) && (r.pure ? R.push(r) : L.push(r), r.observers && ht(r)), i || (r.state = j);
    }
    if (R.length > 1e6)
      throw R = [], new Error();
  }, !1)), e;
}
function ie(n) {
  if (!n.fn) return;
  oe(n);
  const e = Se;
  Bt(n, n.value, e);
}
function Bt(n, e, t) {
  let o;
  const a = S, r = T;
  T = S = n;
  try {
    o = n.fn(e);
  } catch (i) {
    return n.pure && (n.state = j, n.owned && n.owned.forEach(oe), n.owned = null), n.updatedAt = t + 1, ft(i);
  } finally {
    T = r, S = a;
  }
  (!n.updatedAt || n.updatedAt <= t) && (n.updatedAt != null && "observers" in n ? ut(n, o) : n.value = o, n.updatedAt = t);
}
function Me(n, e, t, o = j, a) {
  const r = {
    fn: n,
    state: o,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: S,
    context: S ? S.context : null,
    pure: t
  };
  return S === null || S !== st && (S.owned ? S.owned.push(r) : S.owned = [r]), r;
}
function me(n) {
  if (n.state === 0) return;
  if (n.state === ye) return be(n);
  if (n.suspense && Q(n.suspense.inFallback)) return n.suspense.effects.push(n);
  const e = [n];
  for (; (n = n.owner) && (!n.updatedAt || n.updatedAt < Se); )
    n.state && e.push(n);
  for (let t = e.length - 1; t >= 0; t--)
    if (n = e[t], n.state === j)
      ie(n);
    else if (n.state === ye) {
      const o = R;
      R = null, W(() => be(n, e[0]), !1), R = o;
    }
}
function W(n, e) {
  if (R) return n();
  let t = !1;
  e || (R = []), L ? t = !0 : L = [], Se++;
  try {
    const o = n();
    return Mt(t), o;
  } catch (o) {
    t || (L = null), R = null, ft(o);
  }
}
function Mt(n) {
  if (R && (dt(R), R = null), n) return;
  const e = L;
  L = null, e.length && W(() => it(e), !1);
}
function dt(n) {
  for (let e = 0; e < n.length; e++) me(n[e]);
}
function jt(n) {
  let e, t = 0;
  for (e = 0; e < n.length; e++) {
    const o = n[e];
    o.user ? n[t++] = o : me(o);
  }
  for (e = 0; e < t; e++) me(n[e]);
}
function be(n, e) {
  n.state = 0;
  for (let t = 0; t < n.sources.length; t += 1) {
    const o = n.sources[t];
    if (o.sources) {
      const a = o.state;
      a === j ? o !== e && (!o.updatedAt || o.updatedAt < Se) && me(o) : a === ye && be(o, e);
    }
  }
}
function ht(n) {
  for (let e = 0; e < n.observers.length; e += 1) {
    const t = n.observers[e];
    t.state || (t.state = ye, t.pure ? R.push(t) : L.push(t), t.observers && ht(t));
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
function ft(n, e = S) {
  throw Ht(n);
}
const Gt = Symbol("fallback");
function Xe(n) {
  for (let e = 0; e < n.length; e++) n[e]();
}
function Qt(n, e, t = {}) {
  let o = [], a = [], r = [], i = 0, s = e.length > 1 ? [] : null;
  return lt(() => Xe(r)), () => {
    let l = n() || [], c = l.length, u, d;
    return l[ze], Q(() => {
      let p, k, C, _, q, y, A, f, z;
      if (c === 0)
        i !== 0 && (Xe(r), r = [], o = [], a = [], i = 0, s && (s = [])), t.fallback && (o = [Gt], a[0] = fe((Et) => (r[0] = Et, t.fallback())), i = 1);
      else if (i === 0) {
        for (a = new Array(c), d = 0; d < c; d++)
          o[d] = l[d], a[d] = fe(h);
        i = c;
      } else {
        for (C = new Array(c), _ = new Array(c), s && (q = new Array(c)), y = 0, A = Math.min(i, c); y < A && o[y] === l[y]; y++) ;
        for (A = i - 1, f = c - 1; A >= y && f >= y && o[A] === l[f]; A--, f--)
          C[f] = a[A], _[f] = r[A], s && (q[f] = s[A]);
        for (p = /* @__PURE__ */ new Map(), k = new Array(f + 1), d = f; d >= y; d--)
          z = l[d], u = p.get(z), k[d] = u === void 0 ? -1 : u, p.set(z, d);
        for (u = y; u <= A; u++)
          z = o[u], d = p.get(z), d !== void 0 && d !== -1 ? (C[d] = a[u], _[d] = r[u], s && (q[d] = s[u]), d = k[d], p.set(z, d)) : r[u]();
        for (d = y; d < c; d++)
          d in C ? (a[d] = C[d], r[d] = _[d], s && (s[d] = q[d], s[d](d))) : a[d] = fe(h);
        a = a.slice(0, i = c), o = l.slice(0);
      }
      return a;
    });
    function h(p) {
      if (r[d] = p, s) {
        const [k, C] = B(d);
        return s[d] = C, e(l[d], k);
      }
      return e(l[d]);
    }
  };
}
function b(n, e) {
  return Q(() => n(e || {}));
}
const Ft = (n) => `Stale read from <${n}>.`;
function H(n) {
  const e = "fallback" in n && {
    fallback: () => n.fallback
  };
  return M(Qt(() => n.each, n.children, e || void 0));
}
function X(n) {
  const e = n.keyed, t = M(() => n.when, void 0, void 0), o = e ? t : M(t, void 0, {
    equals: (a, r) => !a == !r
  });
  return M(() => {
    const a = o();
    if (a) {
      const r = n.children;
      return typeof r == "function" && r.length > 0 ? Q(() => r(e ? a : () => {
        if (!Q(o)) throw Ft("Show");
        return t();
      })) : r;
    }
    return n.fallback;
  }, void 0, void 0);
}
const N = (n) => M(() => n());
function Zt(n, e, t) {
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
          let d = i, h = 1, p;
          for (; ++d < a && d < r && !((p = c.get(e[d])) == null || p !== u + h); )
            h++;
          if (h > u - s) {
            const k = e[i];
            for (; s < u; ) n.insertBefore(t[s++], k);
          } else n.replaceChild(t[s++], e[i++]);
        } else i++;
      else e[i++].remove();
    }
  }
}
const Ve = "_$DX_DELEGATE";
function v(n, e, t, o) {
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
    t.has(r) || (t.add(r), e.addEventListener(r, Kt));
  }
}
function Ut(n, e, t) {
  n.removeAttribute(e);
}
function Oe(n, e, t, o) {
  Array.isArray(t) ? (n[`$$${e}`] = t[0], n[`$$${e}Data`] = t[1]) : n[`$$${e}`] = t;
}
function ue(n, e, t) {
  if (!e) return t ? Ut(n, "style") : e;
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
function E(n, e, t) {
  t != null ? n.style.setProperty(e, t) : n.style.removeProperty(e);
}
function g(n, e, t, o) {
  if (t !== void 0 && !o && (o = []), typeof e != "function") return we(n, e, o, t);
  D((a) => we(n, e(), a, t), o);
}
function Kt(n) {
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
function we(n, e, t, o, a) {
  for (; typeof t == "function"; ) t = t();
  if (e === t) return t;
  const r = typeof e, i = o !== void 0;
  if (n = i && t[0] && t[0].parentNode || n, r === "string" || r === "number") {
    if (r === "number" && (e = e.toString(), e === t))
      return t;
    if (i) {
      let s = t[0];
      s && s.nodeType === 3 ? s.data !== e && (s.data = e) : s = document.createTextNode(e), t = J(n, t, o, s);
    } else
      t !== "" && typeof t == "string" ? t = n.firstChild.data = e : t = n.textContent = e;
  } else if (e == null || r === "boolean")
    t = J(n, t, o);
  else {
    if (r === "function")
      return D(() => {
        let s = e();
        for (; typeof s == "function"; ) s = s();
        t = we(n, s, t, o);
      }), () => t;
    if (Array.isArray(e)) {
      const s = [], l = t && Array.isArray(t);
      if (Pe(s, e, t, a))
        return D(() => t = we(n, s, t, o, !0)), () => t;
      if (s.length === 0) {
        if (t = J(n, t, o), i) return t;
      } else l ? t.length === 0 ? We(n, s, o) : Zt(n, t, s) : (t && J(n), We(n, s));
      t = s;
    } else if (e.nodeType) {
      if (Array.isArray(t)) {
        if (i) return t = J(n, t, o, e);
        J(n, t, null, e);
      } else t == null || t === "" || !n.firstChild ? n.appendChild(e) : n.replaceChild(e, n.firstChild);
      t = e;
    }
  }
  return t;
}
function Pe(n, e, t, o) {
  let a = !1;
  for (let r = 0, i = e.length; r < i; r++) {
    let s = e[r], l = t && t[n.length], c;
    if (!(s == null || s === !0 || s === !1)) if ((c = typeof s) == "object" && s.nodeType)
      n.push(s);
    else if (Array.isArray(s))
      a = Pe(n, s, l) || a;
    else if (c === "function")
      if (o) {
        for (; typeof s == "function"; ) s = s();
        a = Pe(n, Array.isArray(s) ? s : [s], Array.isArray(l) ? l : [l]) || a;
      } else
        n.push(s), a = !0;
    else {
      const u = String(s);
      l && l.nodeType === 3 && l.data === u ? n.push(l) : n.push(document.createTextNode(u));
    }
  }
  return a;
}
function We(n, e, t = null) {
  for (let o = 0, a = e.length; o < a; o++) n.insertBefore(e[o], t);
}
function J(n, e, t, o) {
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
function Jt(n) {
  return Object.keys(n).reduce((t, o) => {
    const a = n[o];
    return t[o] = Object.assign({}, a), gt(a.value) && !en(a.value) && !Array.isArray(a.value) && (t[o].value = Object.assign({}, a.value)), Array.isArray(a.value) && (t[o].value = a.value.slice(0)), t;
  }, {});
}
function Xt(n) {
  return n ? Object.keys(n).reduce((t, o) => {
    const a = n[o];
    return t[o] = gt(a) && "value" in a ? a : {
      value: a
    }, t[o].attribute || (t[o].attribute = $t(o)), t[o].parse = "parse" in t[o] ? t[o].parse : typeof t[o].value != "string", t;
  }, {}) : {};
}
function Vt(n) {
  return Object.keys(n).reduce((t, o) => (t[o] = n[o].value, t), {});
}
function Wt(n, e) {
  const t = Jt(e);
  return Object.keys(e).forEach((a) => {
    const r = t[a], i = n.getAttribute(r.attribute), s = n[a];
    i != null && (r.value = r.parse ? pt(i) : i), s != null && (r.value = Array.isArray(s) ? s.slice(0) : s), r.reflect && $e(n, r.attribute, r.value, !!r.parse), Object.defineProperty(n, a, {
      get() {
        return r.value;
      },
      set(l) {
        const c = r.value;
        r.value = l, r.reflect && $e(this, r.attribute, r.value, !!r.parse);
        for (let u = 0, d = this.__propertyChangedCallbacks.length; u < d; u++)
          this.__propertyChangedCallbacks[u](a, l, c);
      },
      enumerable: !0,
      configurable: !0
    });
  }), t;
}
function pt(n) {
  if (n)
    try {
      return JSON.parse(n);
    } catch {
      return n;
    }
}
function $e(n, e, t, o) {
  if (t == null || t === !1) return n.removeAttribute(e);
  let a = o ? JSON.stringify(t) : t;
  n.__updating[e] = !0, a === "true" && (a = ""), n.setAttribute(e, a), Promise.resolve().then(() => delete n.__updating[e]);
}
function $t(n) {
  return n.replace(/\.?([A-Z]+)/g, (e, t) => "-" + t.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function gt(n) {
  return n != null && (typeof n == "object" || typeof n == "function");
}
function en(n) {
  return Object.prototype.toString.call(n) === "[object Function]";
}
function tn(n) {
  return typeof n == "function" && n.toString().indexOf("class") === 0;
}
let _e;
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
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Wt(this, e);
      const a = Vt(this.props), r = this.Component, i = _e;
      try {
        _e = this, this.__initialized = !0, tn(r) ? new r(a, {
          element: this
        }) : r(a, {
          element: this
        });
      } finally {
        _e = i;
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
        this[a] = e[a].parse ? pt(i) : i;
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
    return s ? (s.prototype.Component = i, s) : (s = nn(o, Xt(e)), s.prototype.Component = i, s.prototype.registeredTag = n, r.define(n, s, a), s);
  };
}
function an(n) {
  const e = Object.keys(n), t = {};
  for (let o = 0; o < e.length; o++) {
    const [a, r] = B(n[e[o]]);
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
    return fe((a) => {
      const r = an(e);
      o.addPropertyChangedCallback((s, l) => r[s] = l), o.addReleaseCallback(() => {
        o.renderRoot.textContent = "", a();
      });
      const i = n(r, t);
      return g(o.renderRoot, i);
    }, rn(o));
  };
}
function ln(n, e, t) {
  return arguments.length === 2 && (t = e, e = {}), on(n, e)(sn(t));
}
const Le = Symbol("store-raw"), V = Symbol("store-node"), P = Symbol("store-has"), yt = Symbol("store-self");
function mt(n) {
  let e = n[G];
  if (!e && (Object.defineProperty(n, G, {
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
function ke(n) {
  let e;
  return n != null && typeof n == "object" && (n[G] || !(e = Object.getPrototypeOf(n)) || e === Object.prototype || Array.isArray(n));
}
function ae(n, e = /* @__PURE__ */ new Set()) {
  let t, o, a, r;
  if (t = n != null && n[Le]) return t;
  if (!ke(n) || e.has(n)) return n;
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
  const [o, a] = B(t, {
    equals: !1,
    internal: !0
  });
  return o.$ = a, n[e] = o;
}
function cn(n, e) {
  const t = Reflect.getOwnPropertyDescriptor(n, e);
  return !t || t.get || !t.configurable || e === G || e === V || (delete t.value, delete t.writable, t.get = () => n[G][e]), t;
}
function bt(n) {
  Ie() && re(xe(n, V), yt)();
}
function un(n) {
  return bt(n), Reflect.ownKeys(n);
}
const dn = {
  get(n, e, t) {
    if (e === Le) return n;
    if (e === G) return t;
    if (e === ze)
      return bt(n), t;
    const o = xe(n, V), a = o[e];
    let r = a ? a() : n[e];
    if (e === V || e === P || e === "__proto__") return r;
    if (!a) {
      const i = Object.getOwnPropertyDescriptor(n, e);
      Ie() && (typeof r != "function" || n.hasOwnProperty(e)) && !(i && i.get) && (r = re(o, e, r)());
    }
    return ke(r) ? mt(r) : r;
  },
  has(n, e) {
    return e === Le || e === G || e === ze || e === V || e === P || e === "__proto__" ? !0 : (Ie() && re(xe(n, P), e)(), e in n);
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
function ve(n, e, t, o = !1) {
  if (!o && n[e] === t) return;
  const a = n[e], r = n.length;
  t === void 0 ? (delete n[e], n[P] && n[P][e] && a !== void 0 && n[P][e].$()) : (n[e] = t, n[P] && n[P][e] && a === void 0 && n[P][e].$());
  let i = xe(n, V), s;
  if ((s = re(i, e, a)) && s.$(() => t), Array.isArray(n) && n.length !== r) {
    for (let l = n.length; l < r; l++) (s = i[l]) && s.$();
    (s = re(i, "length", r)) && s.$(n.length);
  }
  (s = i[yt]) && s.$();
}
function wt(n, e) {
  const t = Object.keys(e);
  for (let o = 0; o < t.length; o += 1) {
    const a = t[o];
    ve(n, a, e[a]);
  }
}
function hn(n, e) {
  if (typeof e == "function" && (e = e(n)), e = ae(e), Array.isArray(e)) {
    if (n === e) return;
    let t = 0, o = e.length;
    for (; t < o; t++) {
      const a = e[t];
      n[t] !== a && ve(n, t, a);
    }
    ve(n, "length", o);
  } else wt(n, e);
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
  typeof r == "function" && (r = r(a, t), r === a) || o === void 0 && r == null || (r = ae(r), o === void 0 || ke(a) && ke(r) && !Array.isArray(r) ? wt(a, r) : ve(n, o, r));
}
function fn(...[n, e]) {
  const t = ae(n || {}), o = Array.isArray(t), a = mt(t);
  function r(...i) {
    Lt(() => {
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
  hp: 0,
  die: "d6",
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
var yn = /* @__PURE__ */ v('<div style=display:flex;align-items:center;gap:6px><label style=color:var(--sq-overlay-text-muted);font-size:12px;text-transform:uppercase;letter-spacing:1px>HP</label><select style="background:var(--sq-ctrl-bg);border:1px solid var(--sq-ctrl-border);color:var(--sq-ctrl-text);border-radius:4px;padding:4px 8px;font-size:13px;font-family:inherit;cursor:pointer">'), mn = /* @__PURE__ */ v("<option>");
function bn(n) {
  const e = Array.from({
    length: 31
  }, (t, o) => o);
  return (() => {
    var t = yn(), o = t.firstChild, a = o.nextSibling;
    return a.addEventListener("change", (r) => n.onHpChange(parseInt(r.currentTarget.value, 10))), g(a, () => e.map((r) => (() => {
      var i = mn();
      return i.value = r, g(i, r), i;
    })())), D(() => a.value = n.hp), t;
  })();
}
var wn = /* @__PURE__ */ v("<div style=display:flex;gap:5px;align-items:center>"), kn = /* @__PURE__ */ v('<div style="width:14px;height:14px;border-radius:50%;cursor:pointer;transition:background 0.15s, border-color 0.15s">');
function xn(n) {
  return (() => {
    var e = wn();
    return g(e, b(H, {
      get each() {
        return n.energy;
      },
      children: (t, o) => (() => {
        var a = kn();
        return a.$$click = () => n.onEnergyClick(o()), E(a, "background", t ? "var(--sq-overlay-text)" : "var(--sq-dot-empty-bg)"), E(a, "border", `2px solid ${t ? "var(--sq-overlay-text)" : "var(--sq-dot-empty-border)"}`), a;
      })()
    })), e;
  })();
}
U(["click"]);
var vn = /* @__PURE__ */ v('<div style="background:var(--sq-row-1);border-bottom:1px solid var(--sq-row-border);position:sticky;top:0;z-index:100"><div style="padding:8px 14px 2px;font-size:13px;color:var(--sq-ctrl-text);text-transform:capitalize;user-select:none;-webkit-user-select:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></div><div style="padding:4px 14px 10px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">');
function Cn(n) {
  const e = () => [n.name, n.charClass, n.profession, n.personality].filter(Boolean).join(" · ");
  return (() => {
    var t = vn(), o = t.firstChild, a = o.nextSibling;
    return g(o, e), g(a, b(bn, {
      get hp() {
        return n.hp;
      },
      get onHpChange() {
        return n.onHpChange;
      }
    }), null), g(a, b(xn, {
      get energy() {
        return n.energy;
      },
      get onEnergyClick() {
        return n.onEnergyClick;
      }
    }), null), t;
  })();
}
var An = /* @__PURE__ */ v('<div style="background:var(--sq-row-2);border-bottom:1px solid var(--sq-row-border);padding:10px 14px;display:flex;gap:8px;flex-wrap:wrap"><input type=text placeholder="Character name"><select><option value>Personality</option></select><select><option value>Class</option></select><select><option value>Profession'), Ye = /* @__PURE__ */ v("<option>");
const Ee = {
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
function Sn(n) {
  return (() => {
    var e = An(), t = e.firstChild, o = t.nextSibling;
    o.firstChild;
    var a = o.nextSibling;
    a.firstChild;
    var r = a.nextSibling;
    return r.firstChild, t.$$input = (i) => n.onNameChange(i.currentTarget.value), ue(t, Tn), o.addEventListener("change", (i) => n.onPersonalityChange(i.currentTarget.value)), g(o, b(H, {
      get each() {
        return n.personalities;
      },
      children: (i) => (() => {
        var s = Ye();
        return s.value = i, g(s, i), s;
      })()
    }), null), a.addEventListener("change", (i) => n.onClassChange(i.currentTarget.value)), g(a, b(H, {
      get each() {
        return n.classes;
      },
      children: (i) => (() => {
        var s = Ye();
        return s.value = i, g(s, i), s;
      })()
    }), null), r.addEventListener("change", (i) => n.onProfessionChange(i.currentTarget.value)), g(r, b(H, {
      get each() {
        return n.professions;
      },
      children: (i) => (() => {
        var s = Ye();
        return s.value = i, g(s, i), s;
      })()
    }), null), D((i) => {
      var s = Ee, l = Ee, c = Ee;
      return i.e = ue(o, s, i.e), i.t = ue(a, l, i.t), i.a = ue(r, c, i.a), i;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), D(() => t.value = n.name), D(() => o.value = n.personality), D(() => a.value = n.charClass), D(() => r.value = n.profession), e;
  })();
}
U(["input"]);
var Dn = /* @__PURE__ */ v('<div style="background:var(--sq-row-2);border-bottom:1px solid var(--sq-row-border);padding:8px 14px"><div style=display:flex;gap:4px;flex-wrap:wrap></div><div style=color:var(--sq-overlay-text);font-size:11px;opacity:0.7;margin-top:4px;min-height:14px>'), Rn = /* @__PURE__ */ v('<button style="border-radius:4px;padding:4px 12px;font-size:12px;font-family:inherit;cursor:pointer;transition:all 0.1s">');
function _n(n) {
  const e = M(() => n.statuses.find((t) => t.id === n.combat));
  return (() => {
    var t = Dn(), o = t.firstChild, a = o.nextSibling;
    return g(o, b(H, {
      get each() {
        return n.statuses;
      },
      children: (r) => {
        const i = () => n.combat === r.id;
        return (() => {
          var s = Rn();
          return s.$$click = () => n.onChange(r.id), g(s, () => r.label), D((l) => {
            var c = i() ? "var(--sq-accent)" : "var(--sq-ctrl-bg)", u = i() ? "#ffffff" : "var(--sq-ctrl-text)", d = `1px solid ${i() ? "var(--sq-accent)" : "var(--sq-ctrl-border)"}`, h = i() ? "600" : "400";
            return c !== l.e && E(s, "background", l.e = c), u !== l.t && E(s, "color", l.t = u), d !== l.a && E(s, "border", l.a = d), h !== l.o && E(s, "font-weight", l.o = h), l;
          }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0
          }), s;
        })();
      }
    })), g(a, () => {
      var r;
      return ((r = e()) == null ? void 0 : r.message) ?? "";
    }), t;
  })();
}
U(["click"]);
function je() {
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
let K = je();
function kt(n) {
  K = n;
}
const xt = /[&<>"']/, Yn = new RegExp(xt.source, "g"), vt = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, En = new RegExp(vt.source, "g"), qn = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, tt = (n) => qn[n];
function Y(n, e) {
  if (e) {
    if (xt.test(n))
      return n.replace(Yn, tt);
  } else if (vt.test(n))
    return n.replace(En, tt);
  return n;
}
const zn = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function In(n) {
  return n.replace(zn, (e, t) => (t = t.toLowerCase(), t === "colon" ? ":" : t.charAt(0) === "#" ? t.charAt(1) === "x" ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""));
}
const On = /(^|[^\[])\^/g;
function w(n, e) {
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
function Pn(n, e) {
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
  const a = e.href, r = e.title ? Y(e.title) : null, i = n[1].replace(/\\([\[\]])/g, "$1");
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
    text: Y(i)
  };
}
function Ln(n, e) {
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
    x(this, "options");
    x(this, "rules");
    // set by the lexer
    x(this, "lexer");
    this.options = e || K;
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
      const o = t[0], a = Ln(o, t[3] || "");
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
`, 1)[0].replace(/^\t+/, (q) => " ".repeat(3 * q.length)), h = e.split(`
`, 1)[0], p = 0;
        this.options.pedantic ? (p = 2, l = d.trimStart()) : (p = t[2].search(/[^ ]/), p = p > 4 ? 1 : p, l = d.slice(p), p += t[1].length);
        let k = !1;
        if (!d && /^ *$/.test(h) && (s += h + `
`, e = e.substring(h.length + 1), u = !0), !u) {
          const q = new RegExp(`^ {0,${Math.min(3, p - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), y = new RegExp(`^ {0,${Math.min(3, p - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), A = new RegExp(`^ {0,${Math.min(3, p - 1)}}(?:\`\`\`|~~~)`), f = new RegExp(`^ {0,${Math.min(3, p - 1)}}#`);
          for (; e; ) {
            const z = e.split(`
`, 1)[0];
            if (h = z, this.options.pedantic && (h = h.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), A.test(h) || f.test(h) || q.test(h) || y.test(e))
              break;
            if (h.search(/[^ ]/) >= p || !h.trim())
              l += `
` + h.slice(p);
            else {
              if (k || d.search(/[^ ]/) >= 4 || A.test(d) || f.test(d) || y.test(d))
                break;
              l += `
` + h;
            }
            !k && !h.trim() && (k = !0), s += z + `
`, e = e.substring(z.length + 1), d = h.slice(p);
          }
        }
        r.loose || (c ? r.loose = !0 : /\n *\n *$/.test(s) && (c = !0));
        let C = null, _;
        this.options.gfm && (C = /^\[[ xX]\] /.exec(l), C && (_ = C[0] !== "[ ] ", l = l.replace(/^\[[ xX]\] +/, ""))), r.items.push({
          type: "list_item",
          raw: s,
          task: !!C,
          checked: _,
          loose: !1,
          text: l,
          tokens: []
        }), r.raw += s;
      }
      r.items[r.items.length - 1].raw = s.trimEnd(), r.items[r.items.length - 1].text = l.trimEnd(), r.raw = r.raw.trimEnd();
      for (let u = 0; u < r.items.length; u++)
        if (this.lexer.state.top = !1, r.items[u].tokens = this.lexer.blockTokens(r.items[u].text, []), !r.loose) {
          const d = r.items[u].tokens.filter((p) => p.type === "space"), h = d.length > 0 && d.some((p) => /\n.*\n/.test(p.raw));
          r.loose = h;
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
        text: Y(t[1])
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
        const i = Pn(t[2], "()");
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
        const h = [...a[0]][0].length, p = e.slice(0, i + a.index + h + l);
        if (Math.min(i, l) % 2) {
          const C = p.slice(1, -1);
          return {
            type: "em",
            raw: p,
            text: C,
            tokens: this.lexer.inlineTokens(C)
          };
        }
        const k = p.slice(2, -2);
        return {
          type: "strong",
          raw: p,
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
      return a && r && (o = o.substring(1, o.length - 1)), o = Y(o, !0), {
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
      return t[2] === "@" ? (o = Y(t[1]), a = "mailto:" + o) : (o = Y(t[1]), a = o), {
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
        a = Y(t[0]), r = "mailto:" + a;
      else {
        let i;
        do
          i = t[0], t[0] = ((o = this.rules.inline._backpedal.exec(t[0])) == null ? void 0 : o[0]) ?? "";
        while (i !== t[0]);
        a = Y(t[0]), t[1] === "www." ? r = "http://" + t[0] : r = t[0];
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
      return this.lexer.state.inRawBlock ? o = t[0] : o = Y(t[0]), {
        type: "text",
        raw: t[0],
        text: o
      };
    }
  }
}
const Nn = /^(?: *(?:\n|$))+/, Bn = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/, Mn = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, se = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, jn = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Ct = /(?:[*+-]|\d{1,9}[.)])/, At = w(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, Ct).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), He = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Hn = /^[^\n]+/, Ge = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Gn = w(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", Ge).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Qn = w(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Ct).getRegex(), De = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Qe = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Fn = w("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", Qe).replace("tag", De).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Tt = w(He).replace("hr", se).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", De).getRegex(), Zn = w(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Tt).getRegex(), Fe = {
  blockquote: Zn,
  code: Bn,
  def: Gn,
  fences: Mn,
  heading: jn,
  hr: se,
  html: Fn,
  lheading: At,
  list: Qn,
  newline: Nn,
  paragraph: Tt,
  table: te,
  text: Hn
}, rt = w("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", se).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", De).getRegex(), Un = {
  ...Fe,
  table: rt,
  paragraph: w(He).replace("hr", se).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", rt).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", De).getRegex()
}, Kn = {
  ...Fe,
  html: w(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Qe).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: te,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: w(He).replace("hr", se).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", At).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, St = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Jn = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Dt = /^( {2,}|\\)\n(?!\s*$)/, Xn = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, le = "\\p{P}\\p{S}", Vn = w(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, le).getRegex(), Wn = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g, $n = w(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, le).getRegex(), eo = w("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, le).getRegex(), to = w("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, le).getRegex(), no = w(/\\([punct])/, "gu").replace(/punct/g, le).getRegex(), oo = w(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), ao = w(Qe).replace("(?:-->|$)", "-->").getRegex(), ro = w("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ao).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ae = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, io = w(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", Ae).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Rt = w(/^!?\[(label)\]\[(ref)\]/).replace("label", Ae).replace("ref", Ge).getRegex(), _t = w(/^!?\[(ref)\](?:\[\])?/).replace("ref", Ge).getRegex(), so = w("reflink|nolink(?!\\()", "g").replace("reflink", Rt).replace("nolink", _t).getRegex(), Ze = {
  _backpedal: te,
  // only used for GFM url
  anyPunctuation: no,
  autolink: oo,
  blockSkip: Wn,
  br: Dt,
  code: Jn,
  del: te,
  emStrongLDelim: $n,
  emStrongRDelimAst: eo,
  emStrongRDelimUnd: to,
  escape: St,
  link: io,
  nolink: _t,
  punctuation: Vn,
  reflink: Rt,
  reflinkSearch: so,
  tag: ro,
  text: Xn,
  url: te
}, lo = {
  ...Ze,
  link: w(/^!?\[(label)\]\((.*?)\)/).replace("label", Ae).getRegex(),
  reflink: w(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Ae).getRegex()
}, Ne = {
  ...Ze,
  escape: w(St).replace("])", "~|])").getRegex(),
  url: w(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, co = {
  ...Ne,
  br: w(Dt).replace("{2,}", "*").getRegex(),
  text: w(Ne.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, he = {
  normal: Fe,
  gfm: Un,
  pedantic: Kn
}, $ = {
  normal: Ze,
  gfm: Ne,
  breaks: co,
  pedantic: lo
};
class I {
  constructor(e) {
    x(this, "tokens");
    x(this, "options");
    x(this, "state");
    x(this, "tokenizer");
    x(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || K, this.options.tokenizer = this.options.tokenizer || new Ce(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      block: he.normal,
      inline: $.normal
    };
    this.options.pedantic ? (t.block = he.pedantic, t.inline = $.pedantic) : this.options.gfm && (t.block = he.gfm, this.options.breaks ? t.inline = $.breaks : t.inline = $.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: he,
      inline: $
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new I(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new I(t).inlineTokens(e);
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
          let h;
          this.options.extensions.startInline.forEach((p) => {
            h = p.call({ lexer: this }, d), typeof h == "number" && h >= 0 && (u = Math.min(u, h));
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
class Te {
  constructor(e) {
    x(this, "options");
    this.options = e || K;
  }
  code(e, t, o) {
    var r;
    const a = (r = (t || "").match(/^\S*/)) == null ? void 0 : r[0];
    return e = e.replace(/\n$/, "") + `
`, a ? '<pre><code class="language-' + Y(a) + '">' + (o ? e : Y(e, !0)) + `</code></pre>
` : "<pre><code>" + (o ? e : Y(e, !0)) + `</code></pre>
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
class Ue {
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
    x(this, "options");
    x(this, "renderer");
    x(this, "textRenderer");
    this.options = e || K, this.options.renderer = this.options.renderer || new Te(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new Ue();
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
          o += this.renderer.heading(this.parseInline(i.tokens), i.depth, In(this.parseInline(i.tokens, this.textRenderer)));
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
            for (let h = 0; h < d.length; h++)
              l += this.renderer.tablecell(this.parseInline(d[h].tokens), { header: !1, align: i.align[h] });
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
            const h = i.items[d], p = h.checked, k = h.task;
            let C = "";
            if (h.task) {
              const _ = this.renderer.checkbox(!!p);
              c ? h.tokens.length > 0 && h.tokens[0].type === "paragraph" ? (h.tokens[0].text = _ + " " + h.tokens[0].text, h.tokens[0].tokens && h.tokens[0].tokens.length > 0 && h.tokens[0].tokens[0].type === "text" && (h.tokens[0].tokens[0].text = _ + " " + h.tokens[0].tokens[0].text)) : h.tokens.unshift({
                type: "text",
                text: _ + " "
              }) : C += _ + " ";
            }
            C += this.parse(h.tokens, c), u += this.renderer.listitem(C, k, !!p);
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
    x(this, "options");
    this.options = e || K;
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
x(ne, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
var Z, Be, Yt;
class uo {
  constructor(...e) {
    Je(this, Z);
    x(this, "defaults", je());
    x(this, "options", this.setOptions);
    x(this, "parse", ce(this, Z, Be).call(this, I.lex, O.parse));
    x(this, "parseInline", ce(this, Z, Be).call(this, I.lexInline, O.parseInline));
    x(this, "Parser", O);
    x(this, "Renderer", Te);
    x(this, "TextRenderer", Ue);
    x(this, "Lexer", I);
    x(this, "Tokenizer", Ce);
    x(this, "Hooks", ne);
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
        const r = this.defaults.renderer || new Te(this.defaults);
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
              return Promise.resolve(l.call(r, u)).then((h) => c.call(r, h));
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
    return I.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return O.parse(e, t ?? this.defaults);
  }
}
Z = new WeakSet(), Be = function(e, t) {
  return (o, a) => {
    const r = { ...a }, i = { ...this.defaults, ...r };
    this.defaults.async === !0 && r.async === !1 && (i.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), i.async = !0);
    const s = ce(this, Z, Yt).call(this, !!i.silent, !!i.async);
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
}, Yt = function(e, t) {
  return (o) => {
    if (o.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
      const a = "<p>An error occurred:</p><pre>" + Y(o.message + "", !0) + "</pre>";
      return t ? Promise.resolve(a) : a;
    }
    if (t)
      return Promise.reject(o);
    throw o;
  };
};
const F = new uo();
function m(n, e) {
  return F.parse(n, e);
}
m.options = m.setOptions = function(n) {
  return F.setOptions(n), m.defaults = F.defaults, kt(m.defaults), m;
};
m.getDefaults = je;
m.defaults = K;
m.use = function(...n) {
  return F.use(...n), m.defaults = F.defaults, kt(m.defaults), m;
};
m.walkTokens = function(n, e) {
  return F.walkTokens(n, e);
};
m.parseInline = F.parseInline;
m.Parser = O;
m.parser = O.parse;
m.Renderer = Te;
m.TextRenderer = Ue;
m.Lexer = I;
m.lexer = I.lex;
m.Tokenizer = Ce;
m.Hooks = ne;
m.parse = m;
m.options;
m.setOptions;
m.use;
m.walkTokens;
m.parseInline;
O.parse;
I.lex;
const ho = "data:image/png;base64,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";
var fo = /* @__PURE__ */ v('<div style="background:#ffffff;border-radius:6px;margin-bottom:8px;box-shadow:0px -2px 4px rgba(0,0,0,0.2);overflow:hidden"><div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;cursor:pointer;user-select:none"><span style=color:var(--sq-accent);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px></span><div style=display:flex;gap:8px;align-items:center><span style=color:#aaaaaa;font-size:12px>'), po = /* @__PURE__ */ v('<span style="background:var(--sq-accent);color:#ffffff;border-radius:3px;padding:2px 8px;font-size:10px;font-weight:700;white-space:nowrap"> energy'), go = /* @__PURE__ */ v(`<div style="padding:0 12px 10px;color:#555555;font-size:13px;line-height:1.6;font-family:'Varela Round', 'Nunito', sans-serif">`);
const yo = ["display:inline-block", `background-image:radial-gradient(circle, rgba(255,255,255,.75), rgba(255,255,255,0)), url(${ho})`, "background-size:66% 66%,contain", "background-repeat:no-repeat", "background-position:50% 50%,50% 50%", "color:#3f3e4a", "padding:0.8em 0.6em", "line-height:2em", "font-weight:700", "font-size:13px", "min-width:50px", "text-align:center", "cursor:pointer"].join(";");
function mo(n) {
  return m.parse(n).split(/(<h4>[\s\S]*?<\/h4>)/g).map((o) => o.startsWith("<h4>") ? o.replace(/<h4>([\s\S]*?)<\/h4>/g, (a, r) => `<h4>${r.replace(/\bD(\d+)\b/g, `<span class="die-heading" data-sides="$1" style="${yo}">D$1</span>`)}</h4>`) : o.replace(/\bD(\d+)\b/g, '<span class="die-inline" data-sides="$1">D$1</span>')).join("");
}
function bo(n) {
  const [e, t] = B(!1);
  function o(a) {
    const r = a.target;
    if (r.classList.contains("die-inline") || r.classList.contains("die-heading")) {
      const i = parseInt(r.dataset.sides ?? "6", 10);
      n.onRoll(i);
    }
  }
  return (() => {
    var a = fo(), r = a.firstChild, i = r.firstChild, s = i.nextSibling, l = s.firstChild;
    return r.$$click = () => {
      var c;
      t((u) => !u), (c = n.onActivate) == null || c.call(n, n.card);
    }, g(i, () => n.card.title), g(s, (() => {
      var c = N(() => n.card.energyCost !== void 0);
      return () => c() && (() => {
        var u = po(), d = u.firstChild;
        return g(u, () => n.card.energyCost, d), u;
      })();
    })(), l), g(l, () => e() ? "▼" : "▲"), g(a, (() => {
      var c = N(() => !e());
      return () => c() && (() => {
        var u = go();
        return u.$$click = o, D(() => u.innerHTML = mo(n.card.body)), u;
      })();
    })(), null), a;
  })();
}
U(["click"]);
var wo = /* @__PURE__ */ v('<div style="background:#ffffff;border-radius:6px;margin-bottom:8px;box-shadow:0px -2px 4px rgba(0,0,0,0.2);overflow:hidden"><div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;cursor:pointer;user-select:none"><span style=color:var(--sq-accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px></span><span style=color:#aaaaaa;font-size:12px>'), ko = /* @__PURE__ */ v(`<div style="padding:0 12px 10px;color:#555555;font-size:13px;line-height:1.6;font-family:'Varela Round', 'Nunito', sans-serif">`);
function qe(n) {
  const [e, t] = B(!1);
  return (() => {
    var o = wo(), a = o.firstChild, r = a.firstChild, i = r.nextSibling;
    return a.$$click = () => t((s) => !s), g(r, () => n.title), g(i, () => e() ? "▲" : "▼"), g(o, (() => {
      var s = N(() => !!e());
      return () => s() && (() => {
        var l = ko();
        return D(() => l.innerHTML = m.parse(n.body)), l;
      })();
    })(), null), o;
  })();
}
U(["click"]);
var xo = /* @__PURE__ */ v(`<div style="background:#ffffff;border-radius:6px;margin-bottom:8px;box-shadow:0px -2px 4px rgba(0,0,0,0.2);border-top:3px solid var(--sq-accent);overflow:hidden"><div style="padding:10px 12px 4px"><span style=color:var(--sq-accent);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px>Am I Dead?</span></div><div style="padding:0 12px 12px;color:#555555;font-size:13px;line-height:1.6;font-family:'Varela Round', 'Nunito', sans-serif">`);
function vo(n) {
  return (() => {
    var e = xo(), t = e.firstChild;
    t.firstChild;
    var o = t.nextSibling;
    return D(() => o.innerHTML = m.parse(n.body)), e;
  })();
}
var Co = /* @__PURE__ */ v('<div style="padding:12px 14px">');
function Ao(n) {
  const e = M(() => n.abilities.filter((t) => {
    const o = t.source === n.charClass || t.source === n.profession || t.source === "general", a = t.context === "inGeneral" || t.context === n.combat;
    return o && a;
  }));
  return (() => {
    var t = Co();
    return g(t, b(X, {
      get when() {
        return N(() => n.hp === 0)() && n.deathContent;
      },
      get children() {
        return b(vo, {
          get body() {
            return n.deathContent;
          }
        });
      }
    }), null), g(t, b(X, {
      get when() {
        return N(() => n.combat === "inGeneral")() && !!n.descriptions[n.personality];
      },
      get children() {
        return b(qe, {
          get title() {
            return n.personality;
          },
          get body() {
            return n.descriptions[n.personality];
          }
        });
      }
    }), null), g(t, b(X, {
      get when() {
        return N(() => n.combat === "inGeneral")() && !!n.descriptions[n.charClass];
      },
      get children() {
        return b(qe, {
          get title() {
            return n.charClass;
          },
          get body() {
            return n.descriptions[n.charClass];
          }
        });
      }
    }), null), g(t, b(X, {
      get when() {
        return N(() => n.combat === "inGeneral")() && !!n.descriptions[n.profession];
      },
      get children() {
        return b(qe, {
          get title() {
            return n.profession;
          },
          get body() {
            return n.descriptions[n.profession];
          }
        });
      }
    }), null), g(t, b(H, {
      get each() {
        return e();
      },
      children: (o) => b(bo, {
        card: o,
        get onRoll() {
          return n.onRoll;
        },
        get onActivate() {
          return n.onActivate;
        }
      })
    }), null), t;
  })();
}
var To = /* @__PURE__ */ v('<div style="background:var(--sq-row-3);border-top:1px solid var(--sq-row-border);padding:8px 14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span style=color:var(--sq-overlay-text-muted);font-size:12px;text-transform:uppercase;letter-spacing:1px>GM</span><div style="width:36px;height:18px;border-radius:9px;cursor:pointer;position:relative;transition:background 0.2s;flex-shrink:0"><div style="width:14px;height:14px;background:#ffffff;border-radius:50%;position:absolute;top:1px;transition:left 0.2s"></div></div><button style="margin-left:auto;background:var(--sq-ctrl-bg);border:1px solid var(--sq-ctrl-border);color:var(--sq-overlay-text);border-radius:50%;width:24px;height:24px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0">?'), So = /* @__PURE__ */ v('<button style="background:var(--sq-ctrl-bg);border:1px solid var(--sq-accent);color:var(--sq-accent);border-radius:4px;padding:3px 10px;font-size:12px;font-family:inherit">Save'), Do = /* @__PURE__ */ v('<select style="background:var(--sq-ctrl-bg);border:1px solid var(--sq-ctrl-border);color:var(--sq-ctrl-text);border-radius:4px;padding:3px 8px;font-size:12px;font-family:inherit;cursor:pointer"><option value>Load character...'), Ro = /* @__PURE__ */ v("<option>");
function _o(n) {
  const e = () => Object.keys(n.savedCharacters);
  return (() => {
    var t = To(), o = t.firstChild, a = o.nextSibling, r = a.firstChild, i = a.nextSibling;
    return a.$$click = () => n.onToggle(!n.enabled), g(t, (() => {
      var s = N(() => !!n.enabled);
      return () => s() && [(() => {
        var l = So();
        return Oe(l, "click", n.onSave), D((c) => {
          var u = !n.characterName, d = n.characterName ? "pointer" : "not-allowed", h = n.characterName ? "1" : "0.4";
          return u !== c.e && (l.disabled = c.e = u), d !== c.t && E(l, "cursor", c.t = d), h !== c.a && E(l, "opacity", c.a = h), c;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), l;
      })(), (() => {
        var l = Do();
        return l.firstChild, l.addEventListener("change", (c) => {
          c.currentTarget.value && n.onLoad(c.currentTarget.value), c.currentTarget.value = "";
        }), g(l, b(H, {
          get each() {
            return e();
          },
          children: (c) => (() => {
            var u = Ro();
            return u.value = c, g(u, c), u;
          })()
        }), null), l;
      })()];
    })(), i), Oe(i, "click", n.onHelpOpen), D((s) => {
      var l = n.enabled ? "var(--sq-accent)" : "var(--sq-ctrl-bg)", c = `1px solid ${n.enabled ? "var(--sq-accent)" : "var(--sq-ctrl-border)"}`, u = n.enabled ? "19px" : "1px";
      return l !== s.e && E(a, "background", s.e = l), c !== s.t && E(a, "border", s.t = c), u !== s.a && E(r, "left", s.a = u), s;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), t;
  })();
}
U(["click"]);
var Yo = /* @__PURE__ */ v(`<div style=position:absolute;inset:0;background:#ffffff;z-index:500;overflow:auto;padding:16px><div style=display:flex;justify-content:space-between;align-items:center;margin-bottom:12px><span style=color:var(--sq-accent);font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px>General Rules</span><button style=background:var(--sq-accent);color:#ffffff;border:none;border-radius:50%;width:28px;height:28px;font-size:16px;font-weight:700;font-family:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0>×</button></div><div style="color:#3f3e4a;font-size:13px;line-height:1.7;font-family:'Varela Round', 'Nunito', sans-serif">`);
function Eo(n) {
  return (() => {
    var e = Yo(), t = e.firstChild, o = t.firstChild, a = o.nextSibling, r = t.nextSibling;
    return Oe(a, "click", n.onClose), D(() => r.innerHTML = m.parse(n.body)), e;
  })();
}
U(["click"]);
var qo = /* @__PURE__ */ v('<div style="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.85);border:1px solid var(--sq-accent);color:#ffffff;padding:10px 20px;border-radius:6px;font-size:16px;font-weight:700;z-index:9999;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,0.5)">');
function zo(n) {
  return b(X, {
    get when() {
      return n.visible;
    },
    get children() {
      var e = qo();
      return g(e, () => n.message), e;
    }
  });
}
const Io = '@import"https://fonts.googleapis.com/css2?family=Varela+Round&family=Nunito:wght@400;600;700&display=swap";/*! tailwindcss v4.2.4 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-900:oklch(39.6% .141 25.723);--spacing:.25rem;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.invisible{visibility:hidden}.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.start{inset-inline-start:var(--spacing)}.end{inset-inline-end:var(--spacing)}.isolate{isolation:isolate}.order-0,.order-none{order:0}.container{width:100%}@media(min-width:40rem){.container{max-width:40rem}}@media(min-width:48rem){.container{max-width:48rem}}@media(min-width:64rem){.container{max-width:64rem}}@media(min-width:80rem){.container{max-width:80rem}}@media(min-width:96rem){.container{max-width:96rem}}.\\!hidden{display:none!important}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.table{display:table}.table-caption{display:table-caption}.table-cell{display:table-cell}.flex-shrink{flex-shrink:1}.flex-grow,.grow{flex-grow:1}.border-collapse{border-collapse:collapse}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.resize{resize:both}.flex-wrap{flex-wrap:wrap}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.rounded{border-radius:.25rem}.border{border-style:var(--tw-border-style);border-width:1px}.mask-repeat{-webkit-mask-repeat:repeat;mask-repeat:repeat}.text-wrap{text-wrap:wrap}.break-words,.wrap-break-word{overflow-wrap:break-word}.capitalize{text-transform:capitalize}.lowercase{text-transform:lowercase}.uppercase{text-transform:uppercase}.italic{font-style:italic}.ordinal{--tw-ordinal:ordinal;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.underline{text-decoration-line:underline}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.grayscale{--tw-grayscale:grayscale(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.invert{--tw-invert:invert(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.sepia{--tw-sepia:sepia(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.\\!filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)!important}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.data-\\[personality\\=passionate\\]\\:bg-red-900[data-personality=passionate]{background-color:var(--color-red-900)}}:host{font-family:var(--sq-font-family,"Varela Round", "Nunito", sans-serif);--sq-bg:#888;--sq-accent:#888;--sq-overlay-text:#fffffff2;--sq-overlay-text-muted:#ffffff8c;--sq-ctrl-bg:#ffffff26;--sq-ctrl-border:#ffffff4d;--sq-ctrl-text:#fffffff2;--sq-row-1:#00000026;--sq-row-2:#0000001a;--sq-row-3:#0003;--sq-row-border:#0000001f;--sq-dot-empty-bg:#fff3;--sq-dot-empty-border:#fff6;background-color:var(--sq-bg);color:#3f3e4a;display:block}:host([data-personality=passionate]){--sq-bg:#943a11;--sq-accent:#943a11}:host([data-personality=calculating]){--sq-bg:#26869d;--sq-accent:#26869d}:host([data-personality=wild]){--sq-bg:#758d2c;--sq-accent:#758d2c}:host([data-personality=selfish]){--sq-bg:#3f3e4a;--sq-accent:#3f3e4a}:host([data-personality=righteous]){--sq-bg:#daceae;--sq-accent:#5a5060;--sq-overlay-text:#5a5060;--sq-overlay-text-muted:#5a506080;--sq-ctrl-bg:#0000000f;--sq-ctrl-border:#5a506040;--sq-ctrl-text:#5a5060;--sq-row-1:#0000000f;--sq-row-2:#0000000a;--sq-row-3:#00000014;--sq-row-border:#5a506026;--sq-dot-empty-bg:#5a50601f;--sq-dot-empty-border:#5a506040}.die-inline{color:#26869d;cursor:pointer;border-bottom:1px solid #26869d;font-weight:700}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}';
var Oo = /* @__PURE__ */ v("<style>"), Po = /* @__PURE__ */ v("<div style=height:100%;display:flex;flex-direction:column;overflow:hidden;position:relative><div style=flex:1;overflow-y:auto;min-height:0>");
function Lo(n) {
  const {
    state: e,
    setState: t,
    setEnergy: o,
    loadFromStorage: a,
    saveCharacter: r,
    loadCharacter: i
  } = gn(), [s, l] = B(""), [c, u] = B(!1), [d, h] = B(!1);
  let p;
  const k = M(() => {
    if (!n.content) return null;
    try {
      return JSON.parse(n.content);
    } catch {
      return null;
    }
  });
  Nt(() => {
    a();
  }), pe(() => {
    if (n.character)
      try {
        const y = JSON.parse(n.character);
        t({
          ...y
        });
      } catch {
      }
  }), lt(() => {
    p !== void 0 && clearTimeout(p);
  });
  function C(y) {
    p !== void 0 && clearTimeout(p), l(y), u(!0), p = setTimeout(() => u(!1), 2500);
  }
  function _(y) {
    const A = Math.floor(Math.random() * y) + 1;
    C(`d${y} → ${A}`);
  }
  function q(y) {
    y.energyCost !== void 0 && n.element.dispatchEvent(new CustomEvent("abilityactivate", {
      detail: {
        title: y.title,
        energyCost: y.energyCost
      },
      bubbles: !0,
      composed: !0
    }));
  }
  return pe(() => {
    e.personality ? n.element.setAttribute("data-personality", e.personality) : n.element.removeAttribute("data-personality");
  }), pe(() => {
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
    var y = Oo();
    return g(y, Io), y;
  })(), (() => {
    var y = Po(), A = y.firstChild;
    return g(y, b(Cn, {
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
      onHpChange: (f) => t("hp", f),
      onEnergyClick: o
    }), A), g(y, b(Sn, {
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
        var f;
        return ((f = k()) == null ? void 0 : f.personalities) ?? [];
      },
      get classes() {
        var f;
        return ((f = k()) == null ? void 0 : f.classes) ?? [];
      },
      get professions() {
        var f;
        return ((f = k()) == null ? void 0 : f.professions) ?? [];
      },
      onNameChange: (f) => t("name", f),
      onPersonalityChange: (f) => t("personality", f),
      onClassChange: (f) => t("class", f),
      onProfessionChange: (f) => t("profession", f)
    }), A), g(y, b(_n, {
      get combat() {
        return e.combat;
      },
      get statuses() {
        var f;
        return ((f = k()) == null ? void 0 : f.statuses) ?? [];
      },
      onChange: (f) => t("combat", f)
    }), A), g(A, b(Ao, {
      get abilities() {
        var f;
        return ((f = k()) == null ? void 0 : f.abilities) ?? [];
      },
      get descriptions() {
        var f;
        return ((f = k()) == null ? void 0 : f.descriptions) ?? {};
      },
      get deathContent() {
        var f;
        return ((f = k()) == null ? void 0 : f.deathContent) ?? "";
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
      get hp() {
        return e.hp;
      },
      onRoll: _,
      onActivate: q
    }), null), g(A, b(_o, {
      get enabled() {
        return e.gmMode;
      },
      get characterName() {
        return e.name;
      },
      get savedCharacters() {
        return e.savedCharacters;
      },
      onToggle: (f) => t("gmMode", f),
      onSave: r,
      onLoad: i,
      onHelpOpen: () => h(!0)
    }), null), g(y, b(zo, {
      get message() {
        return s();
      },
      get visible() {
        return c();
      }
    }), null), g(y, b(X, {
      get when() {
        return d();
      },
      get children() {
        return b(Eo, {
          get body() {
            var f;
            return ((f = k()) == null ? void 0 : f.generalContent) ?? "";
          },
          onClose: () => h(!1)
        });
      }
    }), null), y;
  })()];
}
const Mo = {
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
    { id: "outOfCombat", label: "Out of Combat", message: "No enemies nearby." }
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
  // ─── Death Rules (shown when HP = 0) ─────────────────────────────────────────
  deathContent: `Not really. Your character is still alive, but a couple things have happened:

* You can no longer use your combat abilities and have ZERO energy.
* You can move up to 3 squares per turn.
* You can use your class's special Dying ability OR attempt to Resuscitate yourself.
* **DEATH PENALTY:** Discard one equippable item or lose 4 Gold.

# Resuscitate

Attempt to recover from your wounds and return to the fight. If an ally is adjacent, they can spend 3 Energy to boost your roll by 1 BEFORE you roll.

#### Roll a D6

* _1–5_ You are still clinging to life. If you attempt to Resuscitate next turn, add 1 to your roll.
* _6_ You return to life with 5 HP and 4 energy.

# Dying Warrior — Trip
**Adjacent**

#### Roll a D20

* _1–4_ You hold on, but they keep moving. If the enemy moves, they drag you with them.
* _5–13_ You trip the enemy. They are unable to physically move on their turn.
* _14–19_ You trip the enemy. They can't move and take 3 damage in the fall.
* _20_ You leap on an enemy's back. They flail about, likely hitting themselves or a fellow enemy.

# Dying Marksman — Shoot
**Defensive**

Every time an enemy passes your line of sight (any square DIRECTLY in front of you), shoot an arrow at them.

#### Roll a D4

Do the rolled amount of damage.

# Dying Sage — Possession
**Range 5** — NOTE: Previously possessed enemies CANNOT be possessed again.

#### Roll a D20

* _1–5_ Failed possession. The enemy does half damage this turn.
* _6–13_ Possess the enemy for a turn.
* _14–19_ Possess the enemy until it takes damage.
* _20_ Possess an enemy until it dies.

# Dying Wizard — Elemental Storm

#### Roll a D6 twice

Drop a burst of flame X squares left/right and Y squares up/down from the Wizard's location. You choose which roll is X and which is Y.

If the flame lands ON an enemy, they take 4 damage. NEXT TO an enemy: 1 damage. The flame remains for the encounter and damages friend and foe alike.`,
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
}) => b(Lo, {
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
  Mo as sampleContent
};
