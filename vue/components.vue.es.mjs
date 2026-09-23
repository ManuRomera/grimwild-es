import { inject as R, openBlock as l, createElementBlock as n, createElementVNode as t, toDisplayString as u, Fragment as $, renderList as f, normalizeClass as D, withDirectives as w, vModelCheckbox as B, unref as a, vModelText as p, computed as L, createTextVNode as W, createVNode as y, createCommentVNode as g, createBlock as M, vShow as K, vModelSelect as A, withCtx as U, ref as ne, renderSlot as ee, toRaw as q, normalizeStyle as oe } from "../lib/vue.esm-browser.js";
function te() {
  const e = R("ui"), m = (r, d = !1) => {
    var c;
    return ((c = e == null ? void 0 : e.abiertos) == null ? void 0 : c[r]) ?? d;
  };
  return { isOpen: m, toggle: (r, d = !1) => {
    e && (e.abiertos = { ...e.abiertos, [r]: !m(r, d) });
  }, setAll: (r, d) => {
    if (!e) return;
    const c = { ...e.abiertos };
    for (const b of r) c[b] = d;
    e.abiertos = c;
  } };
}
const s = (e, m) => m ? game.i18n.format(e, m) : game.i18n.localize(e), ie = ["data-ayuda"], de = { class: "gw-label" }, ce = { class: "gw-traits__list" }, re = ["data-tooltip"], ue = ["name", "onUpdate:modelValue", "disabled"], me = ["name", "onUpdate:modelValue", "list", "aria-label", "disabled"], be = ["id"], he = ["value"], Z = {
  __name: "TraitList",
  props: ["context", "field", "title", "yes", "no", "options", "ayuda"],
  setup(e) {
    var o;
    const m = ((o = R("sheet")) == null ? void 0 : o.id) ?? "grimwild";
    return (i, r) => (l(), n("section", {
      class: "gw-traits",
      "data-ayuda": e.ayuda
    }, [
      t("h3", de, u(e.title), 1),
      t("ul", ce, [
        (l(!0), n($, null, f(e.context.system[e.field], (d, c) => (l(), n("li", {
          key: c,
          class: D(["gw-trait", d.are ? "is" : "isnt"])
        }, [
          t("label", {
            class: "gw-trait__state",
            "data-tooltip": `${e.yes} / ${e.no}`
          }, [
            w(t("input", {
              type: "checkbox",
              class: "visually-hidden",
              name: `system.${e.field}.${c}.are`,
              "onUpdate:modelValue": (b) => d.are = b,
              disabled: !e.context.editable
            }, null, 8, ue), [
              [B, d.are]
            ]),
            t("i", {
              class: D(["fa-solid", d.are ? "fa-check" : "fa-xmark"]),
              inert: ""
            }, null, 2),
            t("span", null, u(d.are ? e.yes : e.no), 1)
          ], 8, re),
          w(t("input", {
            type: "text",
            class: "gw-trait__value",
            name: `system.${e.field}.${c}.value`,
            "onUpdate:modelValue": (b) => d.value = b,
            list: `${a(m)}-${e.field}`,
            "aria-label": `${e.title} ${c + 1} (${d.are ? e.yes : e.no})`,
            disabled: !e.context.editable
          }, null, 8, me), [
            [p, d.value]
          ])
        ], 2))), 128))
      ]),
      t("datalist", {
        id: `${a(m)}-${e.field}`
      }, [
        (l(!0), n($, null, f(e.options, (d, c) => (l(), n("option", {
          key: c,
          value: a(s)(d)
        }, null, 8, he))), 128))
      ], 8, be)
    ], 8, ie));
  }
}, ye = { class: "gw-id" }, ge = { class: "gw-id__top" }, xe = ["aria-label", "disabled"], $e = ["src", "alt"], Ie = { class: "gw-id__who" }, we = ["aria-label", "placeholder", "disabled"], fe = { class: "gw-id__path" }, _e = ["list", "aria-label", "placeholder", "disabled"], ke = ["id"], ve = ["value"], pe = {
  class: "gw-id__level",
  "data-ayuda": "xp"
}, De = { class: "gw-level" }, Le = { class: "gw-xp-count" }, Me = ["aria-label"], Ue = ["aria-checked", "aria-label", "data-level", "data-xp", "disabled"], Re = { class: "gw-id__lists" }, Ge = {
  __name: "CharIdentity",
  props: ["context"],
  setup(e) {
    var h;
    const m = e, o = R("rawDocument"), i = ((h = R("sheet")) == null ? void 0 : h.id) ?? "grimwild", r = L(() => {
      var x;
      return (((x = game.packs.get("grimwild.talents")) == null ? void 0 : x.folders.contents) ?? []).map((I) => I.name).sort((I, k) => I.localeCompare(k));
    }), d = game.settings.get("grimwild", "slowXp"), c = L(() => o.system.xp.steps.map((x) => d ? x.map((I) => I * 2) : x));
    function b(x) {
      const I = m.context.system.xp.value;
      return I >= x ? "full" : d && I === x - 1 ? "half" : "empty";
    }
    return (x, I) => (l(), n("aside", ye, [
      t("div", ge, [
        t("button", {
          type: "button",
          class: "gw-portrait",
          "data-action": "onEditImage",
          "aria-label": a(s)("GRIMWILD.UI.editPortrait"),
          disabled: !e.context.editable
        }, [
          t("img", {
            src: e.context.actor.img,
            "data-edit": "img",
            alt: e.context.actor.name
          }, null, 8, $e)
        ], 8, xe),
        t("div", Ie, [
          w(t("input", {
            type: "text",
            class: "gw-id__name",
            name: "name",
            "onUpdate:modelValue": I[0] || (I[0] = (k) => e.context.actor.name = k),
            "aria-label": a(s)("Name"),
            placeholder: a(s)("Name"),
            disabled: !e.context.editable
          }, null, 8, we), [
            [p, e.context.actor.name]
          ]),
          t("div", fe, [
            w(t("input", {
              type: "text",
              name: "system.path",
              "onUpdate:modelValue": I[1] || (I[1] = (k) => e.context.system.path = k),
              list: `${a(i)}-paths`,
              "aria-label": a(s)("GRIMWILD.Actor.Character.FIELDS.path.label"),
              placeholder: a(s)("GRIMWILD.Actor.Character.FIELDS.path.label"),
              disabled: !e.context.editable
            }, null, 8, _e), [
              [p, e.context.system.path]
            ]),
            t("datalist", {
              id: `${a(i)}-paths`
            }, [
              (l(!0), n($, null, f(r.value, (k) => (l(), n("option", {
                key: k,
                value: k
              }, null, 8, ve))), 128))
            ], 8, ke)
          ]),
          t("div", pe, [
            t("span", De, [
              W(u(a(s)("GRIMWILD.Actor.Character.FIELDS.level.label")) + " ", 1),
              t("strong", null, u(e.context.system.level), 1)
            ]),
            t("span", Le, u(e.context.system.xp.value) + " " + u(a(s)("GRIMWILD.Actor.Character.FIELDS.xp.short")), 1)
          ])
        ])
      ]),
      t("div", {
        class: "gw-xp",
        role: "group",
        "aria-label": a(s)("GRIMWILD.Actor.Character.FIELDS.xp.label")
      }, [
        (l(!0), n($, null, f(c.value, (k, v) => (l(), n("div", {
          key: v,
          class: "gw-xp__row"
        }, [
          (l(!0), n($, null, f(k, (_) => (l(), n("button", {
            key: _,
            type: "button",
            class: D(["gw-xp__pip", b(_)]),
            role: "checkbox",
            "aria-checked": String(b(_) !== "empty"),
            "aria-label": `${a(s)("GRIMWILD.Actor.Character.FIELDS.xp.short")} ${_}`,
            "data-action": "changeXp",
            "data-level": v + 1,
            "data-xp": _,
            disabled: !e.context.editable
          }, null, 10, Ue))), 128))
        ]))), 128))
      ], 8, Me),
      t("div", Re, [
        y(Z, {
          context: e.context,
          field: "traits",
          ayuda: "traits",
          title: a(s)("GRIMWILD.Actor.Character.FIELDS.traits.label"),
          yes: a(s)("GRIMWILD.UI.traitIs"),
          no: a(s)("GRIMWILD.UI.traitIsNot"),
          options: x.CONFIG.GRIMWILD.traits
        }, null, 8, ["context", "title", "yes", "no", "options"]),
        y(Z, {
          context: e.context,
          field: "desires",
          ayuda: "desires",
          title: a(s)("GRIMWILD.Actor.Character.FIELDS.desires.label"),
          yes: a(s)("GRIMWILD.UI.wants"),
          no: a(s)("GRIMWILD.UI.doesNotWant"),
          options: x.CONFIG.GRIMWILD.desires
        }, null, 8, ["context", "title", "yes", "no", "options"])
      ])
    ]));
  }
}, We = ["aria-label"], Ve = { class: "gw-play__stats" }, Te = { class: "gw-statgroup gw-statgroup--physical" }, Ae = { class: "gw-statgroup gw-statgroup--mental" }, Fe = { class: "gw-play__status" }, Ce = { class: "gw-meta" }, Ee = { class: "gw-meta__item" }, Ne = { class: "gw-label" }, Se = { class: "gw-meta__item" }, Pe = { class: "gw-label" }, Oe = {
  __name: "CharPlay",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("section", {
      class: "gw-play",
      "aria-label": a(s)("GRIMWILD.UI.play")
    }, [
      t("div", Ve, [
        t("div", Te, [
          y(a(N), {
            context: e.context,
            stat: "bra"
          }, null, 8, ["context"]),
          y(a(N), {
            context: e.context,
            stat: "agi"
          }, null, 8, ["context"])
        ]),
        t("div", Ae, [
          y(a(N), {
            context: e.context,
            stat: "wit"
          }, null, 8, ["context"]),
          y(a(N), {
            context: e.context,
            stat: "pre"
          }, null, 8, ["context"])
        ])
      ]),
      t("div", Fe, [
        y(a(le), { context: e.context }, null, 8, ["context"]),
        t("div", Ce, [
          t("div", Ee, [
            t("span", Ne, [
              o[0] || (o[0] = t("i", {
                class: "fa-solid fa-bolt",
                inert: ""
              }, null, -1)),
              W(" " + u(e.context.systemFields.spark.label), 1)
            ]),
            y(a(F), {
              steps: e.context.system.spark.steps,
              name: "system.spark.steps",
              kind: "spark",
              ayuda: "spark",
              icon: "fa-solid fa-bolt",
              label: e.context.systemFields.spark.label
            }, null, 8, ["steps", "label"])
          ]),
          t("div", Se, [
            t("span", Pe, [
              o[1] || (o[1] = t("i", {
                class: "fa-solid fa-feather",
                inert: ""
              }, null, -1)),
              W(" " + u(e.context.systemFields.story.label), 1)
            ]),
            y(a(F), {
              steps: e.context.system.story.steps,
              name: "system.story.steps",
              kind: "story",
              ayuda: "story",
              icon: "fa-solid fa-book-open",
              label: e.context.systemFields.story.label
            }, null, 8, ["steps", "label"])
          ])
        ])
      ])
    ], 8, We));
  }
}, He = { class: "gw-compact" }, je = { class: "gw-compact__head" }, Be = ["src"], qe = { class: "gw-compact__who" }, Ye = ["aria-label", "disabled"], ze = { class: "gw-compact__sub" }, Xe = { key: 0 }, Je = { class: "gw-compact__stats" }, Qe = { class: "gw-meta" }, Ze = { class: "gw-meta__item" }, Ke = { class: "gw-label" }, et = { class: "gw-meta__item" }, tt = { class: "gw-label" }, at = {
  key: 0,
  class: "gw-compact__section",
  "data-ayuda": "conditions"
}, lt = { class: "gw-label" }, st = { class: "gw-compact__conds" }, nt = { class: "gw-cond__label" }, ot = {
  key: 1,
  class: "gw-compact__section"
}, it = ["aria-expanded"], dt = { class: "gw-label" }, ct = { class: "gw-compact__items" }, rt = ["data-item-id"], ut = { class: "gw-compact__item-name" }, mt = { class: "gw-item__trackers" }, bt = {
  __name: "CharCompact",
  props: ["context"],
  setup(e) {
    const m = e, { isOpen: o, toggle: i } = te(), r = L(() => m.context.system.conditions.map((c, b) => ({ condition: c, key: b })).filter(({ condition: c }) => {
      var b;
      return (b = c.name) == null ? void 0 : b.trim();
    })), d = L(() => {
      var c, b;
      return [...((c = m.context.itemTypes) == null ? void 0 : c.talent) ?? [], ...((b = m.context.itemTypes) == null ? void 0 : b.arcana) ?? []].filter((h) => {
        var x;
        return (x = h.system.trackers) == null ? void 0 : x.length;
      });
    });
    return (c, b) => (l(), n("div", He, [
      t("header", je, [
        t("img", {
          class: "gw-compact__portrait",
          src: e.context.actor.img,
          alt: "",
          width: "52",
          height: "52"
        }, null, 8, Be),
        t("div", qe, [
          w(t("input", {
            type: "text",
            class: "gw-id__name",
            name: "name",
            "onUpdate:modelValue": b[0] || (b[0] = (h) => e.context.actor.name = h),
            "aria-label": a(s)("Name"),
            disabled: !e.context.editable
          }, null, 8, Ye), [
            [p, e.context.actor.name]
          ]),
          t("span", ze, [
            e.context.system.path ? (l(), n("span", Xe, u(e.context.system.path) + " · ", 1)) : g("", !0),
            W(u(a(s)("GRIMWILD.Actor.Character.FIELDS.level.label")) + " " + u(e.context.system.level), 1)
          ])
        ])
      ]),
      t("div", Je, [
        (l(), n($, null, f(["bra", "agi", "wit", "pre"], (h) => y(a(N), {
          key: h,
          context: e.context,
          stat: h,
          compact: !0
        }, null, 8, ["context", "stat"])), 64))
      ]),
      y(a(le), {
        context: e.context,
        compact: !0
      }, null, 8, ["context"]),
      t("div", Qe, [
        t("div", Ze, [
          t("span", Ke, [
            b[2] || (b[2] = t("i", {
              class: "fa-solid fa-bolt",
              inert: ""
            }, null, -1)),
            W(" " + u(e.context.systemFields.spark.label), 1)
          ]),
          y(a(F), {
            steps: e.context.system.spark.steps,
            name: "system.spark.steps",
            kind: "spark",
            ayuda: "spark",
            icon: "fa-solid fa-bolt",
            label: e.context.systemFields.spark.label
          }, null, 8, ["steps", "label"])
        ]),
        t("div", et, [
          t("span", tt, [
            b[3] || (b[3] = t("i", {
              class: "fa-solid fa-feather",
              inert: ""
            }, null, -1)),
            W(" " + u(e.context.systemFields.story.label), 1)
          ]),
          y(a(F), {
            steps: e.context.system.story.steps,
            name: "system.story.steps",
            kind: "story",
            ayuda: "story",
            icon: "fa-solid fa-book-open",
            label: e.context.systemFields.story.label
          }, null, 8, ["steps", "label"])
        ])
      ]),
      r.value.length ? (l(), n("section", at, [
        t("h3", lt, u(e.context.systemFields.conditions.label), 1),
        t("ul", st, [
          (l(!0), n($, null, f(r.value, ({ condition: h, key: x }) => (l(), n("li", {
            key: x,
            class: D(["gw-cond gw-cond--mini", `gw-cond--${h.severity || "none"}`])
          }, [
            t("span", nt, u(h.name), 1),
            h.severity !== "permanent" ? (l(), M(a(V), {
              key: 0,
              field: "conditions",
              "field-key": x,
              "field-name": `system.conditions.${x}.pool.diceNum`,
              pool: h.pool,
              label: h.name,
              min: "0"
            }, null, 8, ["field-key", "field-name", "pool", "label"])) : g("", !0)
          ], 2))), 128))
        ])
      ])) : g("", !0),
      d.value.length ? (l(), n("section", ot, [
        t("button", {
          type: "button",
          class: "gw-disclosure",
          "aria-expanded": String(a(o)("compact-items", !0)),
          onClick: b[1] || (b[1] = (h) => a(i)("compact-items", !0))
        }, [
          b[4] || (b[4] = t("i", {
            class: "fa-solid fa-chevron-down",
            inert: ""
          }, null, -1)),
          t("span", dt, u(a(s)("GRIMWILD.Actor.Tabs.Talents")) + " · " + u(a(s)("GRIMWILD.Actor.Tabs.Arcana")), 1)
        ], 8, it),
        w(t("ul", ct, [
          (l(!0), n($, null, f(d.value, (h) => (l(), n("li", {
            key: h._id,
            "data-item-id": h._id,
            "data-document-class": "Item"
          }, [
            t("span", ut, u(h.name), 1),
            t("div", mt, [
              (l(!0), n($, null, f(h.system.trackers, (x, I) => (l(), M(a(j), {
                key: I,
                tracker: x,
                index: I,
                "item-id": h._id,
                editable: e.context.editable
              }, null, 8, ["tracker", "index", "item-id", "editable"]))), 128))
            ])
          ], 8, rt))), 128))
        ], 512), [
          [K, a(o)("compact-items", !0)]
        ])
      ])) : g("", !0)
    ]));
  }
}, ht = { class: "gw-details" }, yt = {
  class: "gw-details__col gw-backgrounds",
  "data-ayuda": "backgrounds"
}, gt = {
  class: "gw-features",
  "data-ayuda": "features"
}, xt = { class: "gw-heading" }, $t = ["placeholder", "aria-label", "disabled"], It = { class: "gw-heading" }, wt = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], ft = { class: "gw-label" }, _t = { class: "gw-bg__wises" }, kt = ["name", "onUpdate:modelValue", "aria-label", "disabled"], vt = { class: "gw-details__col" }, pt = {
  class: "gw-conditions",
  "data-ayuda": "conditions"
}, Dt = { class: "gw-section-head" }, Lt = { class: "gw-heading" }, Mt = {
  key: 0,
  type: "button",
  class: "gw-button",
  "data-action": "createArrayEntry",
  "data-field": "conditions"
}, Ut = {
  key: 0,
  class: "gw-empty"
}, Rt = { class: "gw-cards" }, Gt = { class: "gw-cond__row" }, Wt = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], Vt = ["data-key", "aria-label", "data-tooltip"], Tt = { class: "gw-cond__row" }, At = ["name", "onUpdate:modelValue", "aria-label", "disabled"], Ft = ["value"], Ct = {
  class: "gw-bonds",
  "data-ayuda": "bonds"
}, Et = { class: "gw-section-head" }, Nt = { class: "gw-heading" }, St = {
  key: 0,
  type: "button",
  class: "gw-button",
  "data-action": "createArrayEntry",
  "data-field": "bonds"
}, Pt = {
  key: 0,
  class: "gw-empty"
}, Ot = { class: "gw-cards" }, Ht = { class: "gw-bond__text" }, jt = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], Bt = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], qt = ["data-key", "aria-label", "data-tooltip"], Yt = {
  __name: "CharDetails",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("div", ht, [
      t("section", yt, [
        t("div", gt, [
          t("h3", xt, u(a(s)("GRIMWILD.Actor.Character.FIELDS.features.label")), 1),
          w(t("input", {
            type: "text",
            name: "system.features",
            "onUpdate:modelValue": o[0] || (o[0] = (i) => e.context.system.features = i),
            placeholder: a(s)("GRIMWILD.Actor.Character.FIELDS.features.placeholder"),
            "aria-label": a(s)("GRIMWILD.Actor.Character.FIELDS.features.label"),
            disabled: !e.context.editable
          }, null, 8, $t), [
            [p, e.context.system.features]
          ])
        ]),
        t("h3", It, u(e.context.systemFields.backgrounds.label), 1),
        (l(!0), n($, null, f(e.context.system.backgrounds, (i, r) => (l(), n("article", {
          key: r,
          class: "gw-bg"
        }, [
          w(t("input", {
            type: "text",
            class: "gw-bg__name",
            name: `system.backgrounds.${r}.name`,
            "onUpdate:modelValue": (d) => i.name = d,
            placeholder: a(s)("GRIMWILD.Actor.Character.FIELDS.backgrounds.placeholder"),
            "aria-label": `${e.context.systemFields.backgrounds.label} ${r + 1}`,
            disabled: !e.context.editable
          }, null, 8, wt), [
            [p, i.name]
          ]),
          t("span", ft, u(a(s)("GRIMWILD.Actor.Character.FIELDS.backgrounds.FIELDS.wises.label")), 1),
          t("ul", _t, [
            (l(), n($, null, f([0, 1, 2], (d) => t("li", { key: d }, [
              w(t("input", {
                type: "text",
                name: `system.backgrounds.${r}.wises.${d}`,
                "onUpdate:modelValue": (c) => i.wises[d] = c,
                "aria-label": `${a(s)("GRIMWILD.Actor.Character.FIELDS.backgrounds.FIELDS.wises.label")} ${d + 1}`,
                disabled: !e.context.editable
              }, null, 8, kt), [
                [p, i.wises[d]]
              ])
            ])), 64))
          ])
        ]))), 128))
      ]),
      t("div", vt, [
        t("section", pt, [
          t("header", Dt, [
            t("h3", Lt, u(e.context.systemFields.conditions.label), 1),
            e.context.editable ? (l(), n("button", Mt, [
              o[1] || (o[1] = t("i", {
                class: "fa-solid fa-plus",
                inert: ""
              }, null, -1)),
              t("span", null, u(a(s)("GRIMWILD.UI.addCondition")), 1)
            ])) : g("", !0)
          ]),
          e.context.system.conditions.length ? g("", !0) : (l(), n("p", Ut, u(a(s)("GRIMWILD.UI.noConditions")), 1)),
          t("ul", Rt, [
            (l(!0), n($, null, f(e.context.system.conditions, (i, r) => (l(), n("li", {
              key: r,
              class: D(["gw-cond", `gw-cond--${i.severity || "none"}`])
            }, [
              t("div", Gt, [
                w(t("input", {
                  type: "text",
                  class: "gw-cond__name",
                  name: `system.conditions.${r}.name`,
                  "onUpdate:modelValue": (d) => i.name = d,
                  placeholder: a(s)("GRIMWILD.UI.conditionName"),
                  "aria-label": a(s)("GRIMWILD.UI.conditionName"),
                  disabled: !e.context.editable
                }, null, 8, Wt), [
                  [p, i.name]
                ]),
                e.context.editable ? (l(), n("button", {
                  key: 0,
                  type: "button",
                  class: "gw-icon-button gw-danger",
                  "data-action": "deleteArrayEntry",
                  "data-field": "conditions",
                  "data-key": r,
                  "aria-label": a(s)("GRIMWILD.UI.deleteCondition"),
                  "data-tooltip": a(s)("GRIMWILD.UI.deleteCondition")
                }, o[2] || (o[2] = [
                  t("i", {
                    class: "fa-solid fa-trash",
                    inert: ""
                  }, null, -1)
                ]), 8, Vt)) : g("", !0)
              ]),
              t("div", Tt, [
                w(t("select", {
                  class: "gw-cond__severity",
                  name: `system.conditions.${r}.severity`,
                  "onUpdate:modelValue": (d) => i.severity = d,
                  "aria-label": a(s)("GRIMWILD.UI.duration"),
                  disabled: !e.context.editable
                }, [
                  (l(!0), n($, null, f(e.context.systemFields.conditions.element.fields.severity.choices, (d, c) => (l(), n("option", {
                    key: c,
                    value: c
                  }, u(a(s)(d)), 9, Ft))), 128))
                ], 8, At), [
                  [A, i.severity]
                ]),
                i.severity !== "permanent" ? (l(), M(a(V), {
                  key: 0,
                  field: "conditions",
                  "field-key": r,
                  "field-name": `system.conditions.${r}.pool.diceNum`,
                  pool: i.pool,
                  label: i.name,
                  min: "0"
                }, null, 8, ["field-key", "field-name", "pool", "label"])) : g("", !0)
              ])
            ], 2))), 128))
          ])
        ]),
        t("section", Ct, [
          t("header", Et, [
            t("h3", Nt, u(e.context.systemFields.bonds.label), 1),
            e.context.editable ? (l(), n("button", St, [
              o[3] || (o[3] = t("i", {
                class: "fa-solid fa-plus",
                inert: ""
              }, null, -1)),
              t("span", null, u(a(s)("GRIMWILD.UI.addBond")), 1)
            ])) : g("", !0)
          ]),
          e.context.system.bonds.length ? g("", !0) : (l(), n("p", Pt, u(a(s)("GRIMWILD.UI.noBonds")), 1)),
          t("ul", Ot, [
            (l(!0), n($, null, f(e.context.system.bonds, (i, r) => (l(), n("li", {
              key: r,
              class: "gw-bond",
              "data-bond-actor": ""
            }, [
              o[5] || (o[5] = t("i", {
                class: "fa-solid fa-user gw-bond__icon",
                inert: ""
              }, null, -1)),
              t("div", Ht, [
                w(t("input", {
                  type: "text",
                  class: "gw-bond__name",
                  name: `system.bonds.${r}.name`,
                  "onUpdate:modelValue": (d) => i.name = d,
                  placeholder: a(s)("GRIMWILD.UI.bondCharacter"),
                  "aria-label": a(s)("GRIMWILD.UI.bondCharacter"),
                  disabled: !e.context.editable
                }, null, 8, jt), [
                  [p, i.name]
                ]),
                w(t("input", {
                  type: "text",
                  class: "gw-bond__desc",
                  name: `system.bonds.${r}.description`,
                  "onUpdate:modelValue": (d) => i.description = d,
                  placeholder: a(s)("GRIMWILD.UI.bondDescription"),
                  "aria-label": a(s)("GRIMWILD.UI.bondDescription"),
                  disabled: !e.context.editable
                }, null, 8, Bt), [
                  [p, i.description]
                ])
              ]),
              e.context.editable ? (l(), n("button", {
                key: 0,
                type: "button",
                class: "gw-icon-button gw-danger",
                "data-action": "deleteArrayEntry",
                "data-field": "bonds",
                "data-key": r,
                "aria-label": a(s)("GRIMWILD.UI.deleteBond"),
                "data-tooltip": a(s)("GRIMWILD.UI.deleteBond")
              }, o[4] || (o[4] = [
                t("i", {
                  class: "fa-solid fa-trash",
                  inert: ""
                }, null, -1)
              ]), 8, qt)) : g("", !0)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}, zt = {
  __name: "CharTalents",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), M(a(se), {
      context: e.context,
      type: "talent",
      pack: "grimwild.talents",
      title: a(s)("GRIMWILD.Actor.Tabs.Talents"),
      empty: a(s)("GRIMWILD.UI.noTalents")
    }, null, 8, ["context", "title", "empty"]));
  }
}, Xt = { class: "gw-arcana__meta" }, Jt = { class: "gw-tag" }, Qt = {
  key: 0,
  class: "gw-arcana__touch"
}, Zt = {
  key: 0,
  class: "gw-arcana__limits"
}, Kt = ["innerHTML"], ea = {
  __name: "CharArcana",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), M(a(se), {
      context: e.context,
      type: "arcana",
      pack: "grimwild.arcana",
      title: a(s)("GRIMWILD.Actor.Tabs.Arcana"),
      empty: a(s)("GRIMWILD.UI.noArcana")
    }, {
      details: U(({ item: i }) => {
        var r;
        return [
          t("p", Xt, [
            t("span", Jt, u(a(s)(`GRIMWILD.UI.${i.system.tier || "minor"}Arcana`)), 1),
            i.system.touchstones ? (l(), n("span", Qt, [
              t("strong", null, u(a(s)("GRIMWILD.Item.Arcana.FIELDS.touchstones.label")) + ":", 1),
              o[0] || (o[0] = W()),
              t("em", null, u(i.system.touchstones), 1)
            ])) : g("", !0)
          ]),
          i.system.limitations ? (l(), n("div", Zt, [
            t("strong", null, u(a(s)("GRIMWILD.Item.Arcana.FIELDS.limitations.label")) + ":", 1),
            t("div", {
              innerHTML: (r = e.context.editors[`items.${i._id}.system.limitations`]) == null ? void 0 : r.enriched
            }, null, 8, Kt)
          ])) : g("", !0)
        ];
      }),
      _: 1
    }, 8, ["context", "title", "empty"]));
  }
}, ta = { class: "gw-mhead" }, aa = ["aria-label", "disabled"], la = ["src", "alt"], sa = { class: "gw-mhead__main" }, na = ["aria-label", "placeholder", "disabled"], oa = { class: "gw-mhead__meta" }, ia = {
  key: 0,
  class: "gw-select-chip"
}, da = ["disabled"], ca = ["value"], ra = {
  key: 1,
  class: "gw-select-chip"
}, ua = ["disabled"], ma = ["value"], ba = {
  key: 2,
  class: "gw-mhead__pool",
  "data-ayuda": "challenge"
}, ha = { class: "gw-label" }, ya = {
  __name: "MonsterHeader",
  props: ["context"],
  setup(e) {
    const m = e, o = L(() => m.context.actor.type === "monster"), i = L(() => m.context.actor.type === "linkedChallenge" || o.value && ["boss", "elite"].includes(m.context.system.tier)), r = Object.fromEntries(["mook", "tough", "elite", "boss"].map((c) => [c, s(`GRIMWILD.Actor.Monster.Tiers.${c}`)])), d = Object.fromEntries([
      "blaster",
      "brute",
      "lurker",
      "marauder",
      "marksman",
      "overseer",
      "predator",
      "protector",
      "skirmisher",
      "swarmer",
      "tactician",
      "trickster"
    ].map((c) => [c, s(`GRIMWILD.Actor.Monster.Roles.${c}`)]));
    return (c, b) => (l(), n("header", ta, [
      t("button", {
        type: "button",
        class: "gw-portrait gw-portrait--monster",
        "data-action": "onEditImage",
        "aria-label": a(s)("GRIMWILD.UI.editPortrait"),
        disabled: !e.context.editable
      }, [
        t("img", {
          src: e.context.actor.img,
          "data-edit": "img",
          alt: e.context.actor.name
        }, null, 8, la)
      ], 8, aa),
      t("div", sa, [
        w(t("input", {
          type: "text",
          class: "gw-mhead__name",
          name: "name",
          "onUpdate:modelValue": b[0] || (b[0] = (h) => e.context.actor.name = h),
          "aria-label": a(s)("Name"),
          placeholder: a(s)("Name"),
          disabled: !e.context.editable
        }, null, 8, na), [
          [p, e.context.actor.name]
        ]),
        t("div", oa, [
          o.value ? (l(), n("label", ia, [
            t("span", null, u(a(s)("GRIMWILD.Actor.Monster.FIELDS.role.label")), 1),
            w(t("select", {
              name: "system.role",
              "onUpdate:modelValue": b[1] || (b[1] = (h) => e.context.system.role = h),
              disabled: !e.context.editable
            }, [
              b[3] || (b[3] = t("option", { value: "" }, "—", -1)),
              (l(!0), n($, null, f(a(d), (h, x) => (l(), n("option", {
                key: x,
                value: x
              }, u(h), 9, ca))), 128))
            ], 8, da), [
              [A, e.context.system.role]
            ])
          ])) : g("", !0),
          o.value ? (l(), n("label", ra, [
            t("span", null, u(a(s)("GRIMWILD.Item.Arcana.FIELDS.tier.label")), 1),
            w(t("select", {
              name: "system.tier",
              "onUpdate:modelValue": b[2] || (b[2] = (h) => e.context.system.tier = h),
              disabled: !e.context.editable
            }, [
              (l(!0), n($, null, f(a(r), (h, x) => (l(), n("option", {
                key: x,
                value: x
              }, u(h), 9, ma))), 128))
            ], 8, ua), [
              [A, e.context.system.tier]
            ])
          ])) : g("", !0),
          i.value ? (l(), n("div", ba, [
            t("span", ha, u(a(s)("GRIMWILD.UI.challengePool")), 1),
            y(a(V), {
              field: "pool",
              pool: e.context.system.pool,
              label: e.context.actor.name,
              min: "0"
            }, null, 8, ["pool", "label"])
          ])) : g("", !0)
        ])
      ])
    ]));
  }
}, ga = { class: "gw-challenges-wrap" }, xa = { class: "gw-section-head" }, $a = { class: "gw-heading" }, Ia = {
  key: 0,
  type: "button",
  class: "gw-button",
  "data-action": "createDoc",
  "data-document-class": "Item",
  "data-type": "challenge"
}, wa = {
  key: 0,
  class: "gw-empty"
}, fa = { class: "gw-challenges" }, _a = ["data-item-id"], ka = { class: "gw-challenge__head" }, va = {
  class: "gw-pool gw-pool--challenge",
  "data-ayuda": "challenge"
}, pa = ["aria-label", "disabled"], Da = { class: "gw-pool__value" }, La = { class: "gw-challenge__name" }, Ma = { class: "gw-challenge__bar" }, Ua = { class: "gw-challenge__suspense" }, Ra = { class: "gw-label" }, Ga = { class: "gw-challenge__controls" }, Wa = ["aria-label", "data-tooltip"], Va = ["aria-label", "data-tooltip"], Ta = { class: "gw-challenge__body" }, Aa = ["innerHTML"], Fa = {
  key: 1,
  class: "gw-challenge__traits"
}, Ca = {
  key: 2,
  class: "gw-challenge__moves"
}, Ea = {
  key: 3,
  class: "gw-challenge__fails"
}, Na = {
  key: 1,
  class: "fa-solid fa-xmark gw-challenge__fail-mark",
  inert: ""
}, Sa = {
  __name: "MonsterChallenges",
  props: ["context"],
  setup(e) {
    const m = e, o = L(() => {
      var r;
      return ((r = m.context.itemTypes) == null ? void 0 : r.challenge) ?? [];
    }), i = s("TYPES.Item.challenge");
    return (r, d) => (l(), n("section", ga, [
      t("header", xa, [
        t("h3", $a, u(a(s)("GRIMWILD.Actor.Tabs.Challenges")), 1),
        e.context.editable ? (l(), n("button", Ia, [
          d[0] || (d[0] = t("i", {
            class: "fa-solid fa-plus",
            inert: ""
          }, null, -1)),
          t("span", null, u(a(s)("GRIMWILD.UI.add")), 1)
        ])) : g("", !0)
      ]),
      o.value.length ? g("", !0) : (l(), n("p", wa, u(a(s)("GRIMWILD.UI.noChallenges")), 1)),
      t("ol", fa, [
        (l(!0), n($, null, f(o.value, (c) => {
          var b, h;
          return l(), n("li", {
            key: c._id,
            class: "gw-challenge",
            "data-item-id": c._id,
            "data-drag": "true",
            draggable: "true",
            "data-document-class": "Item"
          }, [
            t("header", ka, [
              t("div", va, [
                t("button", {
                  type: "button",
                  class: "gw-pool__roll",
                  "data-action": "roll",
                  "data-roll-type": "item",
                  "aria-label": a(s)("GRIMWILD.UI.rollPool", { name: c.name, dice: c.system.pool.diceNum }),
                  disabled: !(c.system.pool.diceNum > 0)
                }, d[1] || (d[1] = [
                  t("i", {
                    class: "fa-solid fa-dice-d6",
                    inert: ""
                  }, null, -1)
                ]), 8, pa),
                t("span", Da, u(c.system.pool.diceNum) + "d", 1)
              ]),
              t("h4", La, u(c.name), 1)
            ]),
            t("div", Ma, [
              t("div", Ua, [
                t("span", Ra, u(a(s)("GRIMWILD.Resources.suspense")), 1),
                y(a(F), {
                  steps: c.system.suspense.steps,
                  kind: "suspense",
                  ayuda: "suspense",
                  icon: "fa-solid fa-hourglass-half",
                  label: a(s)("GRIMWILD.Resources.suspense"),
                  "change-action": "updateItemField",
                  "change-field": "system.suspense.steps",
                  "item-id": c._id
                }, null, 8, ["steps", "label", "item-id"])
              ]),
              t("div", Ga, [
                t("button", {
                  type: "button",
                  class: "gw-icon-button",
                  "data-action": "viewDoc",
                  "aria-label": a(s)("DOCUMENT.Edit", { type: a(i) }),
                  "data-tooltip": a(s)("DOCUMENT.Edit", { type: a(i) })
                }, d[2] || (d[2] = [
                  t("i", {
                    class: "fa-solid fa-pen-to-square",
                    inert: ""
                  }, null, -1)
                ]), 8, Wa),
                e.context.editable ? (l(), n("button", {
                  key: 0,
                  type: "button",
                  class: "gw-icon-button gw-danger",
                  "data-action": "deleteDoc",
                  "aria-label": a(s)("DOCUMENT.Delete", { type: a(i) }),
                  "data-tooltip": a(s)("DOCUMENT.Delete", { type: a(i) })
                }, d[3] || (d[3] = [
                  t("i", {
                    class: "fa-solid fa-trash",
                    inert: ""
                  }, null, -1)
                ]), 8, Va)) : g("", !0)
              ])
            ]),
            t("div", Ta, [
              (b = c.system.description) != null && b.length ? (l(), n("div", {
                key: 0,
                class: "gw-challenge__desc",
                innerHTML: (h = e.context.editors[`items.${c._id}.system.description`]) == null ? void 0 : h.enriched
              }, null, 8, Aa)) : g("", !0),
              c.system.traits.length ? (l(), n("ul", Fa, [
                (l(!0), n($, null, f(c.system.traits, (x, I) => (l(), n("li", { key: I }, u(x), 1))), 128))
              ])) : g("", !0),
              c.system.moves.length ? (l(), n("ul", Ca, [
                (l(!0), n($, null, f(c.system.moves, (x, I) => (l(), n("li", { key: I }, u(x), 1))), 128))
              ])) : g("", !0),
              c.system.failure.length ? (l(), n("ul", Ea, [
                (l(!0), n($, null, f(c.system.failure, (x, I) => (l(), n("li", { key: I }, [
                  x.pool.diceNum > 0 ? (l(), M(a(V), {
                    key: 0,
                    field: "failure",
                    "field-key": I,
                    "no-input": !0,
                    "item-id": c._id,
                    pool: x.pool,
                    label: x.value
                  }, null, 8, ["field-key", "item-id", "pool", "label"])) : (l(), n("i", Na)),
                  t("span", null, u(x.value), 1)
                ]))), 128))
              ])) : g("", !0)
            ])
          ], 8, _a);
        }), 128))
      ])
    ]));
  }
}, Pa = { class: "gw-senses" }, Oa = { class: "gw-heading" }, Ha = ["for"], ja = ["id", "name", "onUpdate:modelValue", "disabled"], Ba = { class: "gw-colors" }, qa = { class: "gw-heading" }, Ya = { class: "gw-colors__grid" }, za = ["innerHTML"], Xa = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], Ja = { class: "gw-prose" }, Qa = { class: "gw-heading" }, Za = {
  __name: "MonsterBiography",
  props: ["context"],
  setup(e) {
    var i;
    const m = ((i = R("sheet")) == null ? void 0 : i.id) ?? "grimwild", o = [
      { key: "sights", icon: "fa-eye", label: s("GRIMWILD.UI.sights") },
      { key: "sounds", icon: "fa-ear-listen", label: s("GRIMWILD.UI.sounds") },
      { key: "smells", icon: "fa-wind", label: s("GRIMWILD.UI.smells") }
    ];
    return (r, d) => (l(), n($, null, [
      t("section", Pa, [
        t("h3", Oa, u(a(s)("GRIMWILD.UI.sensories")), 1),
        (l(), n($, null, f(o, (c) => t("div", {
          key: c.key,
          class: "gw-sense"
        }, [
          t("i", {
            class: D(["fa-solid", c.icon]),
            inert: ""
          }, null, 2),
          t("label", {
            for: `${a(m)}-${c.key}`,
            class: "gw-label"
          }, u(c.label), 9, Ha),
          w(t("input", {
            type: "text",
            id: `${a(m)}-${c.key}`,
            name: `system.sensories.${c.key}`,
            "onUpdate:modelValue": (b) => e.context.system.sensories[c.key] = b,
            disabled: !e.context.editable
          }, null, 8, ja), [
            [p, e.context.system.sensories[c.key]]
          ])
        ])), 64))
      ]),
      t("section", Ba, [
        t("h3", qa, u(a(s)("GRIMWILD.UI.colors")), 1),
        t("div", Ya, [
          (l(!0), n($, null, f(e.context.system.sensories.colors, (c, b) => (l(), n("div", {
            key: b,
            class: "gw-color-edit"
          }, [
            t("div", {
              class: "gw-color-edit__picker",
              innerHTML: e.context.customElements[`system.sensories.colors.${b}.color`].outerHTML
            }, null, 8, za),
            w(t("input", {
              type: "text",
              name: `system.sensories.colors.${b}.name`,
              "onUpdate:modelValue": (h) => c.name = h,
              placeholder: a(s)("GRIMWILD.UI.colorName"),
              "aria-label": a(s)("GRIMWILD.UI.colorName"),
              disabled: !e.context.editable
            }, null, 8, Xa), [
              [p, c.name]
            ])
          ]))), 128))
        ])
      ]),
      t("section", Ja, [
        t("h3", Qa, u(e.context.systemFields.biography.label), 1),
        y(a(T), {
          editable: e.context.editable,
          field: e.context.editors["system.biography"]
        }, null, 8, ["editable", "field"])
      ])
    ], 64));
  }
}, Ka = { class: "monster-tables-wrapper form-group stacked" }, el = ["aria-label", "data-tooltip", "data-key"], tl = { class: "form-group" }, al = ["name", "placeholder", "onUpdate:modelValue"], ll = { class: "form-group" }, sl = ["name", "placeholder", "onUpdate:modelValue"], nl = { class: "tables-wrapper form-group stacked" }, ol = { class: "form-group stacked" }, il = ["aria-label", "data-tooltip", "data-field", "data-key"], dl = ["name", "onUpdate:modelValue"], cl = ["data-field"], rl = {
  class: "monster-table-create entry-create",
  type: "button",
  "data-action": "createArrayEntry",
  "data-field": "tables"
}, ul = {
  __name: "MonsterTables",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("section", Ka, [
      (l(), n("div", {
        class: "monster-tables form-group stacked",
        key: e.context._arrayEntryKey
      }, [
        (l(!0), n($, null, f(e.context.system.tables, (i, r) => (l(), n("fieldset", {
          class: "add-another-entries",
          key: r
        }, [
          t("legend", null, u(a(s)("GRIMWILD.UI.table")), 1),
          t("button", {
            class: "legend-control entry-delete",
            "aria-label": a(s)("GRIMWILD.UI.deleteTable"),
            "data-tooltip": a(s)("GRIMWILD.UI.deleteTable"),
            type: "button",
            "data-action": "deleteArrayEntry",
            "data-field": "tables",
            "data-key": r
          }, o[0] || (o[0] = [
            t("i", {
              class: "fas fa-trash",
              inert: ""
            }, null, -1)
          ]), 8, el),
          t("div", tl, [
            t("label", null, u(a(s)("GRIMWILD.UI.tableName")), 1),
            w(t("input", {
              type: "text",
              name: `system.tables.${r}.name`,
              placeholder: a(s)("GRIMWILD.UI.tableNamePlaceholder"),
              "onUpdate:modelValue": (d) => i.name = d
            }, null, 8, al), [
              [p, i.name]
            ])
          ]),
          t("div", ll, [
            t("label", null, u(a(s)("GRIMWILD.UI.tableInstructions")), 1),
            w(t("input", {
              type: "text",
              name: `system.tables.${r}.instructions`,
              placeholder: a(s)("GRIMWILD.UI.tableInstructionsPlaceholder"),
              "onUpdate:modelValue": (d) => i.instructions = d
            }, null, 8, sl), [
              [p, i.instructions]
            ])
          ]),
          t("div", nl, [
            t("div", ol, [
              (l(!0), n($, null, f(i.table, (d, c) => (l(), n("fieldset", {
                class: "tables-wrapper add-another-entries",
                key: c
              }, [
                t("legend", null, u(a(s)("GRIMWILD.UI.d6")), 1),
                t("button", {
                  class: "legend-control entry-delete",
                  "aria-label": a(s)("GRIMWILD.UI.deleteD6Group"),
                  "data-tooltip": a(s)("GRIMWILD.UI.deleteD6Group"),
                  type: "button",
                  "data-action": "deleteArrayEntry",
                  "data-field": `system.tables.${r}.table`,
                  "data-key": c
                }, o[1] || (o[1] = [
                  t("i", {
                    class: "fas fa-trash",
                    inert: ""
                  }, null, -1)
                ]), 8, il),
                (l(!0), n($, null, f(d, (b, h) => (l(), n("div", {
                  key: h,
                  class: "form-group"
                }, [
                  t("label", null, u(Number(h) + 1), 1),
                  w(t("input", {
                    type: "text",
                    name: `system.tables.${r}.table.${c}.${h}`,
                    "onUpdate:modelValue": (x) => e.context.system.tables[r].table[c][h] = x
                  }, null, 8, dl), [
                    [p, e.context.system.tables[r].table[c][h]]
                  ])
                ]))), 128))
              ]))), 128))
            ]),
            t("button", {
              class: "table-control entry-create",
              type: "button",
              "data-action": "createArrayEntry",
              "data-field": `system.tables.${r}.table`,
              "data-field-type": "StringField",
              "data-count": "6"
            }, [
              o[2] || (o[2] = t("i", {
                class: "fas fa-plus",
                inert: ""
              }, null, -1)),
              W(" " + u(a(s)("GRIMWILD.UI.addD6TableGroup")), 1)
            ], 8, cl)
          ])
        ]))), 128)),
        t("button", rl, [
          o[3] || (o[3] = t("i", {
            class: "fas fa-plus",
            inert: ""
          }, null, -1)),
          W(" " + u(a(s)("GRIMWILD.UI.addTable")), 1)
        ])
      ]))
    ]));
  }
}, ml = { class: "gw-lists" }, bl = {
  __name: "MonsterTraitsMoves",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("div", ml, [
      y(a(O), {
        context: e.context,
        field: "traits",
        kind: "trait",
        icon: "fa-diamond",
        title: e.context.systemFields.traits.label,
        add: a(s)("GRIMWILD.UI.addTrait"),
        remove: a(s)("GRIMWILD.UI.deleteTrait"),
        placeholder: a(s)("GRIMWILD.UI.traitDescription")
      }, null, 8, ["context", "title", "add", "remove", "placeholder"]),
      y(a(O), {
        context: e.context,
        field: "moves",
        kind: "move",
        icon: "fa-caret-right",
        title: e.context.systemFields.moves.label,
        add: a(s)("GRIMWILD.UI.addMove"),
        remove: a(s)("GRIMWILD.UI.deleteMove"),
        placeholder: a(s)("GRIMWILD.UI.moveDescription")
      }, null, 8, ["context", "title", "add", "remove", "placeholder"])
    ]));
  }
}, hl = { class: "gw-desires" }, yl = { class: "gw-heading" }, gl = { class: "gw-desire gw-desire--want" }, xl = { class: "gw-desire__label" }, $l = ["aria-label", "disabled"], Il = { class: "gw-desire gw-desire--avoid" }, wl = { class: "gw-desire__label" }, fl = ["aria-label", "disabled"], _l = {
  __name: "MonsterDesires",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("section", hl, [
      t("h3", yl, u(a(s)("GRIMWILD.Actor.Character.FIELDS.desires.label")), 1),
      t("div", gl, [
        t("span", xl, [
          o[2] || (o[2] = t("i", {
            class: "fa-solid fa-heart",
            inert: ""
          }, null, -1)),
          W(" " + u(a(s)("GRIMWILD.UI.wants")), 1)
        ]),
        w(t("input", {
          type: "text",
          name: "system.desires.0.value",
          "onUpdate:modelValue": o[0] || (o[0] = (i) => e.context.system.desires[0].value = i),
          "aria-label": a(s)("GRIMWILD.UI.wants"),
          disabled: !e.context.editable
        }, null, 8, $l), [
          [p, e.context.system.desires[0].value]
        ])
      ]),
      t("div", Il, [
        t("span", wl, [
          o[3] || (o[3] = t("i", {
            class: "fa-solid fa-heart-crack",
            inert: ""
          }, null, -1)),
          W(" " + u(a(s)("GRIMWILD.UI.doesNotWant")), 1)
        ]),
        w(t("input", {
          type: "text",
          name: "system.desires.1.value",
          "onUpdate:modelValue": o[1] || (o[1] = (i) => e.context.system.desires[1].value = i),
          "aria-label": a(s)("GRIMWILD.UI.doesNotWant"),
          disabled: !e.context.editable
        }, null, 8, fl), [
          [p, e.context.system.desires[1].value]
        ])
      ])
    ]));
  }
}, kl = { class: "gw-prose" }, vl = { class: "gw-heading" }, pl = {
  __name: "ItemDescription",
  props: ["item", "context"],
  setup(e) {
    return (m, o) => (l(), n("section", kl, [
      t("h3", vl, u(e.context.systemFields.description.label), 1),
      y(a(T), {
        editable: e.context.editable,
        field: e.context.editors["system.description"]
      }, null, 8, ["editable", "field"])
    ]));
  }
}, Dl = { class: "gw-mhead gw-ihead" }, Ll = ["aria-label", "disabled"], Ml = ["src", "alt"], Ul = { class: "gw-mhead__main" }, Rl = ["placeholder", "aria-label", "disabled"], Gl = { class: "gw-mhead__meta" }, Wl = { class: "gw-tag" }, Vl = {
  class: "gw-mhead__pool",
  "data-ayuda": "challenge"
}, Tl = { class: "gw-label" }, Al = { class: "gw-mhead__pool" }, Fl = { class: "gw-label" }, Cl = {
  __name: "ItemHeader",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("header", Dl, [
      t("button", {
        type: "button",
        class: "gw-portrait gw-portrait--item",
        "data-action": "onEditImage",
        "aria-label": a(s)("GRIMWILD.UI.editPortrait"),
        disabled: !e.context.editable
      }, [
        t("img", {
          src: e.context.item.img,
          "data-edit": "img",
          alt: e.context.item.name
        }, null, 8, Ml)
      ], 8, Ll),
      t("div", Ul, [
        w(t("input", {
          type: "text",
          class: "gw-mhead__name",
          name: "name",
          "onUpdate:modelValue": o[0] || (o[0] = (i) => e.context.item.name = i),
          placeholder: a(s)("Name"),
          "aria-label": a(s)("Name"),
          disabled: !e.context.editable
        }, null, 8, Rl), [
          [p, e.context.item.name]
        ]),
        t("div", Gl, [
          t("span", Wl, u(a(s)(`TYPES.Item.${e.context.item.type}`)), 1),
          e.context.item.type === "challenge" ? (l(), n($, { key: 0 }, [
            t("div", Vl, [
              t("span", Tl, u(e.context.systemFields.pool.label), 1),
              y(a(V), {
                field: "pool",
                pool: e.context.system.pool,
                label: e.context.item.name,
                min: "0"
              }, null, 8, ["pool", "label"])
            ]),
            t("div", Al, [
              t("span", Fl, u(e.context.systemFields.suspense.label), 1),
              y(a(F), {
                steps: e.context.system.suspense.steps,
                name: "system.suspense.steps",
                kind: "suspense",
                ayuda: "suspense",
                icon: "fa-solid fa-hourglass-half",
                label: e.context.systemFields.suspense.label
              }, null, 8, ["steps", "label"])
            ])
          ], 64)) : g("", !0)
        ])
      ])
    ]));
  }
}, El = {
  __name: "ItemAttributes",
  props: ["context"],
  setup(e) {
    return R("rawDocument"), (m, o) => (l(), n($, null, [
      ["arcana", "talent"].includes(e.context.item.type) ? (l(), M(a(ys), {
        key: 0,
        context: e.context
      }, null, 8, ["context"])) : g("", !0),
      e.context.item.type === "challenge" ? (l(), M(a(Fs), {
        key: 1,
        context: e.context
      }, null, 8, ["context"])) : g("", !0)
    ], 64));
  }
}, Nl = { class: "gw-trackers-edit" }, Sl = { class: "gw-section-head" }, Pl = { class: "gw-heading" }, Ol = {
  key: 0,
  type: "button",
  class: "gw-button",
  "data-action": "createTracker"
}, Hl = {
  key: 0,
  class: "gw-empty"
}, jl = { class: "gw-cards" }, Bl = { class: "gw-field" }, ql = ["for"], Yl = ["id", "name", "onUpdate:modelValue"], zl = { class: "gw-field" }, Xl = ["for"], Jl = ["id", "name", "onUpdate:modelValue"], Ql = { value: "pool" }, Zl = { value: "points" }, Kl = {
  key: 0,
  class: "gw-field gw-field--check",
  "data-ayuda": "powerPool"
}, es = ["name", "onUpdate:modelValue"], ts = { class: "gw-label" }, as = { class: "gw-field" }, ls = ["for"], ss = ["id", "name", "onUpdate:modelValue", "max"], ns = ["id", "name", "onUpdate:modelValue", "max"], os = { class: "gw-field" }, is = ["for"], ds = ["id", "name", "onUpdate:modelValue"], cs = {
  key: 1,
  class: "gw-field"
}, rs = ["for"], us = ["id", "name", "onUpdate:modelValue"], ms = { value: !1 }, bs = { value: !0 }, hs = ["data-key", "aria-label", "data-tooltip"], ys = {
  __name: "TalentTrackers",
  props: ["context"],
  setup(e) {
    var o;
    const m = ((o = R("sheet")) == null ? void 0 : o.id) ?? "grimwild";
    return (i, r) => (l(), n("section", Nl, [
      t("header", Sl, [
        t("h3", Pl, u(e.context.systemFields.trackers.label), 1),
        e.context.editable ? (l(), n("button", Ol, [
          r[0] || (r[0] = t("i", {
            class: "fa-solid fa-plus",
            inert: ""
          }, null, -1)),
          t("span", null, u(a(s)("GRIMWILD.UI.addTracker")), 1)
        ])) : g("", !0)
      ]),
      e.context.system.trackers.length ? g("", !0) : (l(), n("p", Hl, u(a(s)("GRIMWILD.UI.noTrackers")), 1)),
      t("ul", jl, [
        (l(!0), n($, null, f(e.context.system.trackers, (d, c) => (l(), n("li", {
          key: c,
          class: "gw-tracker-edit"
        }, [
          t("div", Bl, [
            t("label", {
              for: `${a(m)}-tr-${c}-label`,
              class: "gw-label"
            }, u(a(s)("GRIMWILD.UI.label")), 9, ql),
            w(t("input", {
              type: "text",
              id: `${a(m)}-tr-${c}-label`,
              name: `system.trackers.${c}.label`,
              "onUpdate:modelValue": (b) => d.label = b
            }, null, 8, Yl), [
              [p, d.label]
            ])
          ]),
          t("div", zl, [
            t("label", {
              for: `${a(m)}-tr-${c}-type`,
              class: "gw-label"
            }, u(a(s)("GRIMWILD.UI.type")), 9, Xl),
            w(t("select", {
              id: `${a(m)}-tr-${c}-type`,
              name: `system.trackers.${c}.type`,
              "onUpdate:modelValue": (b) => d.type = b
            }, [
              t("option", Ql, u(a(s)("GRIMWILD.UI.pool")), 1),
              t("option", Zl, u(a(s)("GRIMWILD.Resources.points")), 1)
            ], 8, Jl), [
              [A, d.type]
            ])
          ]),
          d.type === "pool" ? (l(), n("label", Kl, [
            w(t("input", {
              type: "checkbox",
              name: `system.trackers.${c}.pool.powerPool`,
              "onUpdate:modelValue": (b) => d.pool.powerPool = b
            }, null, 8, es), [
              [B, d.pool.powerPool]
            ]),
            t("span", ts, u(a(s)("GRIMWILD.UI.powerPool")), 1)
          ])) : g("", !0),
          t("div", as, [
            t("label", {
              for: `${a(m)}-tr-${c}-value`,
              class: "gw-label"
            }, u(a(s)("GRIMWILD.UI.value")), 9, ls),
            d.type === "pool" ? w((l(), n("input", {
              key: 0,
              type: "number",
              id: `${a(m)}-tr-${c}-value`,
              name: `system.trackers.${c}.pool.diceNum`,
              "onUpdate:modelValue": (b) => d.pool.diceNum = b,
              min: "0",
              max: d.pool.max > 0 ? d.pool.max : null
            }, null, 8, ss)), [
              [p, d.pool.diceNum]
            ]) : w((l(), n("input", {
              key: 1,
              type: "number",
              id: `${a(m)}-tr-${c}-value`,
              name: `system.trackers.${c}.points.value`,
              "onUpdate:modelValue": (b) => d.points.value = b,
              min: "0",
              max: d.points.max
            }, null, 8, ns)), [
              [p, d.points.value]
            ])
          ]),
          t("div", os, [
            t("label", {
              for: `${a(m)}-tr-${c}-max`,
              class: "gw-label"
            }, u(a(s)("GRIMWILD.UI.max")), 9, is),
            w(t("input", {
              type: "number",
              id: `${a(m)}-tr-${c}-max`,
              name: `system.trackers.${c}.${d.type}.max`,
              min: "1",
              "onUpdate:modelValue": (b) => d[d.type].max = b
            }, null, 8, ds), [
              [p, d[d.type].max]
            ])
          ]),
          d.type === "points" ? (l(), n("div", cs, [
            t("label", {
              for: `${a(m)}-tr-${c}-steps`,
              class: "gw-label"
            }, u(a(s)("GRIMWILD.UI.display")), 9, rs),
            w(t("select", {
              id: `${a(m)}-tr-${c}-steps`,
              name: `system.trackers.${c}.points.showSteps`,
              "onUpdate:modelValue": (b) => d.points.showSteps = b
            }, [
              t("option", ms, u(a(s)("GRIMWILD.UI.number")), 1),
              t("option", bs, u(a(s)("GRIMWILD.UI.checkboxes")), 1)
            ], 8, us), [
              [A, d.points.showSteps]
            ])
          ])) : g("", !0),
          t("button", {
            type: "button",
            class: "gw-icon-button gw-danger gw-tracker-edit__delete",
            "data-action": "deleteTracker",
            "data-key": c,
            "aria-label": a(s)("GRIMWILD.UI.deletePool"),
            "data-tooltip": a(s)("GRIMWILD.UI.deletePool")
          }, r[1] || (r[1] = [
            t("i", {
              class: "fa-solid fa-trash",
              inert: ""
            }, null, -1)
          ]), 8, hs)
        ]))), 128))
      ])
    ]));
  }
}, gs = { class: "gw-prose" }, xs = { class: "gw-heading" }, $s = { class: "gw-field" }, Is = ["for"], ws = ["id", "disabled"], fs = ["value"], _s = { class: "gw-field" }, ks = ["for"], vs = ["id", "disabled"], ps = { class: "gw-field gw-field--stacked" }, Ds = { class: "gw-label" }, Ls = {
  __name: "ArcanaDetails",
  props: ["context"],
  setup(e) {
    var o;
    const m = ((o = R("sheet")) == null ? void 0 : o.id) ?? "grimwild";
    return (i, r) => (l(), n("section", gs, [
      t("h3", xs, u(a(s)("GRIMWILD.UI.details")), 1),
      t("div", $s, [
        t("label", {
          for: `${a(m)}-tier`,
          class: "gw-label"
        }, u(e.context.systemFields.tier.label), 9, Is),
        w(t("select", {
          id: `${a(m)}-tier`,
          name: "system.tier",
          "onUpdate:modelValue": r[0] || (r[0] = (d) => e.context.system.tier = d),
          disabled: !e.context.editable
        }, [
          (l(), n($, null, f(["minor", "major", "mythic"], (d) => t("option", {
            key: d,
            value: d
          }, u(a(s)(`GRIMWILD.UI.${d}Arcana`)), 9, fs)), 64))
        ], 8, ws), [
          [A, e.context.system.tier]
        ])
      ]),
      t("div", _s, [
        t("label", {
          for: `${a(m)}-touchstones`,
          class: "gw-label"
        }, u(e.context.systemFields.touchstones.label), 9, ks),
        w(t("input", {
          type: "text",
          id: `${a(m)}-touchstones`,
          name: "system.touchstones",
          "onUpdate:modelValue": r[1] || (r[1] = (d) => e.context.system.touchstones = d),
          disabled: !e.context.editable
        }, null, 8, vs), [
          [p, e.context.system.touchstones]
        ])
      ]),
      t("div", ps, [
        t("span", Ds, u(e.context.systemFields.limitations.label), 1),
        y(a(T), {
          editable: e.context.editable,
          field: e.context.editors["system.limitations"]
        }, null, 8, ["editable", "field"])
      ])
    ]));
  }
}, Ms = { class: "gw-lists" }, Us = { class: "gw-entries gw-entries--fail" }, Rs = { class: "gw-section-head" }, Gs = { class: "gw-heading" }, Ws = ["aria-label", "data-tooltip"], Vs = { class: "gw-entries__list" }, Ts = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], As = ["data-key", "aria-label", "data-tooltip"], Fs = {
  __name: "ChallengeTraitsMoves",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("div", Ms, [
      y(a(O), {
        context: e.context,
        field: "traits",
        kind: "trait",
        icon: "fa-diamond",
        title: e.context.systemFields.traits.label,
        add: a(s)("GRIMWILD.UI.addTrait"),
        remove: a(s)("GRIMWILD.UI.deleteTrait"),
        placeholder: a(s)("GRIMWILD.UI.traitDescription")
      }, null, 8, ["context", "title", "add", "remove", "placeholder"]),
      y(a(O), {
        context: e.context,
        field: "moves",
        kind: "move",
        icon: "fa-caret-right",
        title: e.context.systemFields.moves.label,
        add: a(s)("GRIMWILD.UI.addMove"),
        remove: a(s)("GRIMWILD.UI.deleteMove"),
        placeholder: a(s)("GRIMWILD.UI.moveDescription")
      }, null, 8, ["context", "title", "add", "remove", "placeholder"]),
      t("section", Us, [
        t("header", Rs, [
          t("h3", Gs, u(e.context.systemFields.failure.label), 1),
          e.context.editable ? (l(), n("button", {
            key: 0,
            type: "button",
            class: "gw-icon-button",
            "data-action": "createArrayEntry",
            "data-field": "failure",
            "aria-label": a(s)("GRIMWILD.UI.addFailureState"),
            "data-tooltip": a(s)("GRIMWILD.UI.addFailureState")
          }, o[0] || (o[0] = [
            t("i", {
              class: "fa-solid fa-plus",
              inert: ""
            }, null, -1)
          ]), 8, Ws)) : g("", !0)
        ]),
        t("ul", Vs, [
          (l(!0), n($, null, f(e.context.system.failure, (i, r) => (l(), n("li", {
            key: r,
            class: "gw-entry gw-entry--fail"
          }, [
            y(a(V), {
              field: "failure",
              "field-key": r,
              "field-name": `system.failure.${r}.pool.diceNum`,
              pool: i.pool,
              label: i.value,
              min: "0"
            }, null, 8, ["field-key", "field-name", "pool", "label"]),
            w(t("input", {
              type: "text",
              name: `system.failure.${r}.value`,
              "onUpdate:modelValue": (d) => e.context.system.failure[r].value = d,
              placeholder: a(s)("GRIMWILD.UI.failureDescription"),
              "aria-label": `${e.context.systemFields.failure.label} ${r + 1}`,
              disabled: !e.context.editable
            }, null, 8, Ts), [
              [p, e.context.system.failure[r].value]
            ]),
            e.context.editable ? (l(), n("button", {
              key: 0,
              type: "button",
              class: "gw-icon-button gw-danger",
              "data-action": "deleteArrayEntry",
              "data-field": "failure",
              "data-key": r,
              "aria-label": a(s)("GRIMWILD.UI.deleteFail"),
              "data-tooltip": a(s)("GRIMWILD.UI.deleteFail")
            }, o[1] || (o[1] = [
              t("i", {
                class: "fa-solid fa-xmark",
                inert: ""
              }, null, -1)
            ]), 8, As)) : g("", !0)
          ]))), 128))
        ])
      ])
    ]));
  }
};
function ae(e) {
  const m = R("ui"), o = R("sheet"), i = (o == null ? void 0 : o.id) ?? "grimwild-sheet", r = () => {
    var b;
    return ((b = Object.values(e ?? {}).find((h) => h.active)) == null ? void 0 : b.key) ?? Object.keys(e ?? {})[0];
  }, d = L(() => e != null && e[m == null ? void 0 : m.pestana] && !e[m.pestana].hidden ? m.pestana : r());
  return { uid: i, active: d, select: (b) => {
    m && (m.pestana = b);
  } };
}
const Cs = ["aria-expanded", "aria-controls"], Es = ["id"], Ns = ["id", "aria-selected", "aria-controls", "tabindex", "data-tab", "onClick"], Ss = { class: "gw-tab__label" }, Y = {
  __name: "Tabs",
  props: ["tabs"],
  setup(e) {
    const m = e, { uid: o, active: i, select: r } = ae(m.tabs), d = ne(!1), c = L(() => Object.values(m.tabs).filter((x) => !x.hidden));
    function b(x) {
      r(x), d.value = !1;
    }
    function h(x) {
      var v;
      const I = c.value.map((_) => _.key);
      let k = I.indexOf(i.value);
      switch (x.key) {
        case "ArrowRight":
        case "ArrowDown":
          k = (k + 1) % I.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          k = (k - 1 + I.length) % I.length;
          break;
        case "Home":
          k = 0;
          break;
        case "End":
          k = I.length - 1;
          break;
        default:
          return;
      }
      x.preventDefault(), b(I[k]), (v = x.currentTarget.querySelector(`[data-tab="${I[k]}"]`)) == null || v.focus();
    }
    return (x, I) => {
      var k;
      return l(), n("nav", {
        class: D(["gw-tabs", { "is-open": d.value }])
      }, [
        t("button", {
          type: "button",
          class: "gw-tabs__menu",
          "aria-expanded": String(d.value),
          "aria-controls": `${a(o)}-tablist`,
          onClick: I[0] || (I[0] = (v) => d.value = !d.value)
        }, [
          I[1] || (I[1] = t("i", {
            class: "fa-solid fa-bars",
            inert: ""
          }, null, -1)),
          t("span", null, u((k = e.tabs[a(i)]) == null ? void 0 : k.label), 1),
          I[2] || (I[2] = t("i", {
            class: "fa-solid fa-chevron-down gw-tabs__chev",
            inert: ""
          }, null, -1))
        ], 8, Cs),
        t("div", {
          class: "gw-tabs__list",
          role: "tablist",
          id: `${a(o)}-tablist`,
          onKeydown: h
        }, [
          (l(!0), n($, null, f(c.value, (v) => (l(), n("button", {
            key: v.key,
            type: "button",
            role: "tab",
            class: D(["gw-tab", { active: v.key === a(i) }]),
            id: `${a(o)}-tab-${v.key}`,
            "aria-selected": String(v.key === a(i)),
            "aria-controls": `${a(o)}-panel-${v.key}`,
            tabindex: v.key === a(i) ? 0 : -1,
            "data-tab": v.key,
            onClick: (_) => b(v.key)
          }, [
            v.icon ? (l(), n("i", {
              key: 0,
              class: D(v.icon),
              inert: ""
            }, null, 2)) : g("", !0),
            t("span", Ss, u(v.label), 1)
          ], 10, Ns))), 128))
        ], 40, Es)
      ], 2);
    };
  }
}, Ps = ["id", "aria-labelledby"], G = {
  __name: "Tab",
  props: ["tab", "tabs"],
  setup(e) {
    const m = e, { uid: o, active: i } = ae(m.tabs);
    return (r, d) => w((l(), n("div", {
      class: D(["gw-panel", `gw-panel--${e.tab.key}`]),
      role: "tabpanel",
      tabindex: "-1",
      id: `${a(o)}-panel-${e.tab.key}`,
      "aria-labelledby": `${a(o)}-tab-${e.tab.key}`
    }, [
      ee(r.$slots, "default")
    ], 10, Ps)), [
      [K, a(i) === e.tab.key]
    ]);
  }
}, Os = ["innerHTML"], T = {
  __name: "Prosemirror",
  props: ["field", "editable"],
  setup(e) {
    return (m, o) => {
      var i, r;
      return l(), n("div", {
        class: "prose-mirror-wrapper",
        innerHTML: e.editable && ((i = e.field) != null && i.element) ? e.field.element.outerHTML : ((r = e.field) == null ? void 0 : r.enriched) ?? ""
      }, null, 8, Os);
    };
  }
}, Hs = {
  class: "gw-pool",
  "data-ayuda": "pool"
}, js = ["data-action", "data-roll-type", "data-item-id", "data-field", "data-key", "aria-label", "data-tooltip", "disabled"], Bs = { key: 0 }, qs = {
  key: 0,
  class: "gw-pool__value"
}, Ys = ["data-action-change", "data-item-id", "name", "value", "min", "max", "aria-label"], zs = { class: "gw-pool__suffix" }, V = {
  __name: "RollPoolInput",
  props: [
    "buttonAction",
    "buttonRollType",
    "buttonLabel",
    "inputAction",
    "field",
    "fieldKey",
    "fieldName",
    "noInput",
    "itemId",
    "pool",
    "min",
    "max",
    "suffix",
    "label"
  ],
  setup(e) {
    const m = e, o = L(() => m.fieldName ?? (m.field ? `system.${m.field}.diceNum` : null)), i = L(() => {
      var r;
      return s("GRIMWILD.UI.rollPool", { name: m.label ?? m.buttonLabel ?? "", dice: ((r = m.pool) == null ? void 0 : r.diceNum) ?? 0 }).trim();
    });
    return (r, d) => {
      var c, b, h;
      return l(), n("div", Hs, [
        t("button", {
          type: "button",
          class: "gw-pool__roll",
          "data-action": e.buttonAction ?? "rollPool",
          "data-roll-type": e.buttonRollType,
          "data-item-id": e.itemId,
          "data-field": e.field,
          "data-key": e.fieldKey,
          "aria-label": i.value,
          "data-tooltip": e.buttonLabel ? null : i.value,
          disabled: !(((c = e.pool) == null ? void 0 : c.diceNum) > 0)
        }, [
          d[0] || (d[0] = t("i", {
            class: "fa-solid fa-dice-d6",
            inert: ""
          }, null, -1)),
          e.buttonLabel ? (l(), n("span", Bs, u(e.buttonLabel), 1)) : g("", !0)
        ], 8, js),
        e.noInput ? (l(), n("span", qs, u(((b = e.pool) == null ? void 0 : b.diceNum) ?? 0) + "d", 1)) : (l(), n($, { key: 1 }, [
          t("input", {
            type: "number",
            class: "gw-pool__input",
            "data-action-change": e.inputAction,
            "data-item-id": e.itemId,
            name: o.value,
            value: ((h = e.pool) == null ? void 0 : h.diceNum) ?? 0,
            min: e.min ?? 0,
            max: e.max || null,
            "aria-label": a(s)("GRIMWILD.UI.poolDice")
          }, null, 8, Ys),
          t("span", zs, u(e.suffix ?? "d"), 1)
        ], 64))
      ]);
    };
  }
}, Xs = ["data-stat", "aria-label"], Js = { class: "gw-stat__name" }, Qs = ["name", "min", "max", "aria-label", "disabled"], Zs = ["data-tooltip"], Ks = ["name", "disabled"], en = { class: "gw-mark__text" }, N = {
  __name: "StatBlock",
  props: ["context", "stat", "compact"],
  setup(e) {
    const m = e, o = L(() => m.context.system.stats[m.stat]), i = L(() => m.context.systemFields.stats.fields[m.stat]), r = L(() => s(`GRIMWILD.Stat.${m.stat}.long`)), d = L(() => s(`GRIMWILD.Stat.${m.stat}.abbr`)), c = L(() => m.context.editable);
    return (b, h) => (l(), n("div", {
      class: D(["gw-stat", [`gw-stat--${e.stat}`, { marked: o.value.marked }]])
    }, [
      t("button", {
        type: "button",
        class: "gw-stat__roll",
        "data-action": "roll",
        "data-roll-type": "stat",
        "data-stat": e.stat,
        "aria-label": a(s)("GRIMWILD.UI.rollStat", { stat: r.value }),
        "data-ayuda": "stat"
      }, [
        t("span", Js, u(e.compact ? d.value : r.value), 1),
        h[2] || (h[2] = t("i", {
          class: "fa-solid fa-dice-d6 gw-stat__dice",
          inert: ""
        }, null, -1))
      ], 8, Xs),
      w(t("input", {
        type: "number",
        class: "gw-stat__value",
        name: `system.stats.${e.stat}.value`,
        "onUpdate:modelValue": h[0] || (h[0] = (x) => o.value.value = x),
        min: i.value.fields.value.min,
        max: i.value.fields.value.max,
        "aria-label": r.value,
        disabled: !c.value
      }, null, 8, Qs), [
        [p, o.value.value]
      ]),
      t("label", {
        class: D(["gw-mark", { on: o.value.marked }]),
        "data-ayuda": "mark",
        "data-tooltip": a(s)("GRIMWILD.Damage.marked")
      }, [
        w(t("input", {
          type: "checkbox",
          class: "visually-hidden",
          name: `system.stats.${e.stat}.marked`,
          "onUpdate:modelValue": h[1] || (h[1] = (x) => o.value.marked = x),
          disabled: !c.value
        }, null, 8, Ks), [
          [B, o.value.marked]
        ]),
        t("i", {
          class: D([o.value.marked ? "fa-solid" : "fa-regular", "fa-bookmark"]),
          inert: ""
        }, null, 2),
        t("span", en, u(o.value.marked ? a(s)("GRIMWILD.Damage.marked") : a(s)("GRIMWILD.UI.mark")), 1)
      ], 10, Zs)
    ], 2));
  }
}, tn = ["data-ayuda"], an = ["name", "checked"], ln = { class: "gw-toggle__text" }, sn = {
  key: 0,
  class: "fa-solid fa-check gw-toggle__check",
  inert: ""
}, H = {
  __name: "Toggle",
  props: ["modelValue", "name", "label", "icon", "kind", "ayuda"],
  emits: ["update:modelValue"],
  setup(e, { emit: m }) {
    const o = m;
    return (i, r) => (l(), n("label", {
      class: D(["gw-toggle", [`gw-toggle--${e.kind}`, { on: e.modelValue }]]),
      "data-ayuda": e.ayuda
    }, [
      t("input", {
        type: "checkbox",
        class: "visually-hidden",
        name: e.name,
        checked: e.modelValue,
        onChange: r[0] || (r[0] = (d) => o("update:modelValue", d.target.checked))
      }, null, 40, an),
      t("i", {
        class: D([e.modelValue ? "fa-solid" : "fa-regular", e.icon]),
        inert: ""
      }, null, 2),
      t("span", ln, u(e.label), 1),
      e.modelValue ? (l(), n("i", sn)) : g("", !0)
    ], 10, tn));
  }
}, nn = { class: "gw-harm-wrap" }, on = { class: "gw-harm-wrap" }, dn = { class: "gw-harm-wrap" }, le = {
  __name: "HarmTrack",
  props: ["context", "compact"],
  setup(e) {
    return (m, o) => (l(), n("div", {
      class: D(["gw-harms", { compact: e.compact }])
    }, [
      t("div", nn, [
        y(H, {
          kind: "bloodied",
          icon: "fa-droplet",
          ayuda: "bloodied",
          name: "system.bloodied.marked",
          label: a(s)("GRIMWILD.Damage.bloodied"),
          modelValue: e.context.system.bloodied.marked,
          "onUpdate:modelValue": o[0] || (o[0] = (i) => e.context.system.bloodied.marked = i)
        }, null, 8, ["label", "modelValue"]),
        e.context.enableHarm && !e.compact ? (l(), M(V, {
          key: 0,
          field: "bloodied",
          "field-name": "system.bloodied.pool.diceNum",
          label: a(s)("GRIMWILD.Damage.bloodied"),
          pool: e.context.system.bloodied.pool,
          min: "0",
          max: e.context.maxBloodied,
          suffix: e.context.maxBloodied ? `/ ${e.context.maxBloodied}` : "d"
        }, null, 8, ["label", "pool", "max", "suffix"])) : g("", !0)
      ]),
      t("div", on, [
        y(H, {
          kind: "rattled",
          icon: "fa-brain",
          ayuda: "rattled",
          name: "system.rattled.marked",
          label: a(s)("GRIMWILD.Damage.rattled"),
          modelValue: e.context.system.rattled.marked,
          "onUpdate:modelValue": o[1] || (o[1] = (i) => e.context.system.rattled.marked = i)
        }, null, 8, ["label", "modelValue"]),
        e.context.enableHarm && !e.compact ? (l(), M(V, {
          key: 0,
          field: "rattled",
          "field-name": "system.rattled.pool.diceNum",
          label: a(s)("GRIMWILD.Damage.rattled"),
          pool: e.context.system.rattled.pool,
          min: "0",
          max: e.context.maxRattled,
          suffix: e.context.maxRattled ? `/ ${e.context.maxRattled}` : "d"
        }, null, 8, ["label", "pool", "max", "suffix"])) : g("", !0)
      ]),
      t("div", dn, [
        y(H, {
          kind: "dropped",
          icon: "fa-skull",
          ayuda: "dropped",
          name: "system.dropped",
          label: a(s)("GRIMWILD.Damage.dropped"),
          modelValue: e.context.system.dropped,
          "onUpdate:modelValue": o[2] || (o[2] = (i) => e.context.system.dropped = i)
        }, null, 8, ["label", "modelValue"])
      ])
    ], 2));
  }
}, cn = ["aria-label", "data-ayuda"], rn = ["data-tooltip"], un = ["name", "checked", "data-action-change", "data-field", "data-key", "data-item-id"], mn = { class: "visually-hidden" }, F = {
  __name: "Pips",
  props: ["steps", "name", "label", "icon", "kind", "ayuda", "changeAction", "changeField", "itemId"],
  setup(e) {
    return (m, o) => (l(), n("div", {
      class: D(["gw-pips", `gw-pips--${e.kind}`]),
      role: "group",
      "aria-label": e.label,
      "data-ayuda": e.ayuda
    }, [
      (l(!0), n($, null, f(e.steps, (i, r) => (l(), n("label", {
        key: r,
        class: D(["gw-pip", { on: i }]),
        "data-tooltip": `${e.label} ${r + 1}`
      }, [
        t("input", {
          type: "checkbox",
          class: "visually-hidden",
          name: e.name ? `${e.name}.${r}` : null,
          checked: i,
          "data-action-change": e.changeAction,
          "data-field": e.changeField,
          "data-key": r,
          "data-item-id": e.itemId
        }, null, 8, un),
        t("i", {
          class: D(e.icon),
          inert: ""
        }, null, 2),
        t("span", mn, u(e.label) + " " + u(r + 1), 1)
      ], 10, rn))), 128))
    ], 10, cn));
  }
}, bn = ["data-item-id", "data-key", "aria-label", "disabled", "data-ayuda"], hn = { key: 0 }, yn = { class: "gw-tracker__num" }, gn = ["data-item-id", "data-tracker-key", "value", "max", "aria-label", "disabled"], xn = {
  key: 0,
  class: "gw-tracker__label"
}, $n = ["aria-label"], In = ["aria-checked", "aria-label", "data-item-id", "data-tracker-key", "data-value", "data-tracker-value", "disabled"], wn = {
  key: 2,
  class: "gw-tracker__num"
}, fn = ["data-item-id", "data-tracker-key", "value", "max", "aria-label", "disabled"], _n = { "aria-hidden": "true" }, j = {
  __name: "ItemTracker",
  props: ["tracker", "index", "itemId", "editable"],
  setup(e) {
    return (m, o) => (l(), n("div", {
      class: D(["gw-tracker", `gw-tracker--${e.tracker.type}`])
    }, [
      e.tracker.type === "pool" ? (l(), n($, { key: 0 }, [
        t("button", {
          type: "button",
          class: "gw-tracker__roll",
          "data-action": "rollPool",
          "data-item-id": e.itemId,
          "data-key": e.index,
          "aria-label": a(s)("GRIMWILD.UI.rollPool", { name: e.tracker.label ?? "", dice: e.tracker.pool.diceNum }),
          disabled: !(e.tracker.pool.diceNum > 0),
          "data-ayuda": e.tracker.pool.powerPool ? "powerPool" : "pool"
        }, [
          o[0] || (o[0] = t("i", {
            class: "fa-solid fa-dice-d6",
            inert: ""
          }, null, -1)),
          e.tracker.label ? (l(), n("span", hn, u(e.tracker.label), 1)) : g("", !0)
        ], 8, bn),
        t("span", yn, [
          t("input", {
            type: "number",
            "data-action-change": "updateItemTracker",
            "data-item-id": e.itemId,
            "data-tracker-key": e.index,
            value: e.tracker.pool.diceNum,
            min: "0",
            max: e.tracker.pool.max > 0 ? e.tracker.pool.max : null,
            "aria-label": `${e.tracker.label ?? ""} (${a(s)("GRIMWILD.UI.poolDice")})`,
            disabled: !e.editable
          }, null, 8, gn),
          o[1] || (o[1] = t("span", { "aria-hidden": "true" }, "d", -1))
        ])
      ], 64)) : (l(), n($, { key: 1 }, [
        e.tracker.label ? (l(), n("span", xn, u(e.tracker.label), 1)) : g("", !0),
        e.tracker.points.showSteps ? (l(), n("span", {
          key: 1,
          class: "gw-tracker__pips",
          role: "group",
          "aria-label": e.tracker.label
        }, [
          (l(!0), n($, null, f(Number(e.tracker.points.max), (i) => (l(), n("button", {
            key: i,
            type: "button",
            class: D(["gw-point", { on: e.tracker.points.value >= i }]),
            role: "checkbox",
            "aria-checked": String(e.tracker.points.value >= i),
            "aria-label": `${e.tracker.label ?? ""} ${i}`,
            "data-action": "updateItemTracker",
            "data-item-id": e.itemId,
            "data-tracker-key": e.index,
            "data-value": i,
            "data-tracker-value": e.tracker.points.value,
            disabled: !e.editable
          }, null, 10, In))), 128))
        ], 8, $n)) : (l(), n("span", wn, [
          t("input", {
            type: "number",
            "data-action-change": "updateItemTracker",
            "data-item-id": e.itemId,
            "data-tracker-key": e.index,
            value: e.tracker.points.value,
            min: "0",
            max: e.tracker.points.max,
            "aria-label": e.tracker.label,
            disabled: !e.editable
          }, null, 8, fn),
          t("span", _n, "/ " + u(e.tracker.points.max), 1)
        ]))
      ], 64))
    ], 2));
  }
}, kn = { class: "gw-items__head" }, vn = { class: "gw-heading" }, pn = { class: "gw-items__tools" }, Dn = ["aria-label", "data-tooltip"], Ln = ["data-type"], Mn = ["data-pack"], Un = {
  key: 0,
  class: "gw-empty"
}, Rn = { class: "gw-items__list" }, Gn = ["data-item-id"], Wn = { class: "gw-item__head" }, Vn = ["aria-label", "data-tooltip"], Tn = ["src"], An = ["aria-expanded", "aria-controls", "onClick"], Fn = {
  key: 0,
  class: "gw-item__trackers"
}, Cn = { class: "gw-item__controls" }, En = ["aria-label", "data-tooltip"], Nn = ["aria-label", "data-tooltip"], Sn = ["id", "inert"], Pn = { class: "gw-item__inner" }, On = {
  key: 0,
  class: "gw-item__trackers gw-item__trackers--more"
}, Hn = ["innerHTML"], jn = {
  key: 2,
  class: "gw-item__notes"
}, Bn = { key: 0 }, qn = ["innerHTML"], E = 2, se = {
  __name: "ItemRows",
  props: ["context", "type", "pack", "title", "empty"],
  setup(e) {
    var I;
    const m = e, o = ((I = R("sheet")) == null ? void 0 : I.id) ?? "grimwild", { isOpen: i, toggle: r, setAll: d } = te(), c = (k) => `item-${k._id}`, b = L(() => {
      var k;
      return ((k = m.context.itemTypes) == null ? void 0 : k[m.type]) ?? [];
    }), h = L(() => b.value.length > 0 && b.value.every((k) => i(c(k)))), x = L(() => s(`TYPES.Item.${m.type}`));
    return (k, v) => (l(), n("section", {
      class: D(["gw-items", `gw-items--${e.type}`])
    }, [
      t("header", kn, [
        t("h3", vn, u(e.title), 1),
        t("div", pn, [
          b.value.length ? (l(), n("button", {
            key: 0,
            type: "button",
            class: "gw-icon-button",
            "aria-label": h.value ? a(s)("GRIMWILD.UI.collapseAll") : a(s)("GRIMWILD.UI.expandAll"),
            "data-tooltip": h.value ? a(s)("GRIMWILD.UI.collapseAll") : a(s)("GRIMWILD.UI.expandAll"),
            onClick: v[0] || (v[0] = (_) => a(d)(b.value.map((S) => c(S)), !h.value))
          }, [
            t("i", {
              class: D(["fa-solid", h.value ? "fa-angles-up" : "fa-angles-down"]),
              inert: ""
            }, null, 2)
          ], 8, Dn)) : g("", !0),
          e.context.editable ? (l(), n("button", {
            key: 1,
            type: "button",
            class: "gw-button",
            "data-action": "createDoc",
            "data-document-class": "Item",
            "data-type": e.type
          }, [
            v[1] || (v[1] = t("i", {
              class: "fa-solid fa-plus",
              inert: ""
            }, null, -1)),
            t("span", null, u(a(s)("GRIMWILD.UI.add")), 1)
          ], 8, Ln)) : g("", !0),
          t("button", {
            type: "button",
            class: "gw-button",
            "data-action": "openPack",
            "data-pack": e.pack
          }, [
            v[2] || (v[2] = t("i", {
              class: "fa-solid fa-book-atlas",
              inert: ""
            }, null, -1)),
            t("span", null, u(a(s)("GRIMWILD.UI.compendium")), 1)
          ], 8, Mn)
        ])
      ]),
      b.value.length ? g("", !0) : (l(), n("p", Un, u(e.empty), 1)),
      t("ol", Rn, [
        (l(!0), n($, null, f(b.value, (_) => {
          var S, z, X, J, Q;
          return l(), n("li", {
            key: _._id,
            class: D(["gw-item", { open: a(i)(c(_)) }]),
            "data-item-id": _._id,
            "data-drag": "true",
            draggable: "true",
            "data-document-class": "Item"
          }, [
            t("div", Wn, [
              t("button", {
                type: "button",
                class: "gw-item__img",
                "data-action": "roll",
                "data-roll-type": "item",
                "aria-label": a(s)("GRIMWILD.UI.sendToChat", { name: _.name }),
                "data-tooltip": a(s)("GRIMWILD.UI.sendToChat", { name: _.name })
              }, [
                t("img", {
                  src: _.img,
                  alt: "",
                  width: "32",
                  height: "32"
                }, null, 8, Tn)
              ], 8, Vn),
              t("button", {
                type: "button",
                class: "gw-item__name",
                "aria-expanded": String(a(i)(c(_))),
                "aria-controls": `${a(o)}-${_._id}-body`,
                onClick: (P) => a(r)(c(_))
              }, [
                t("span", null, u(_.name), 1),
                v[3] || (v[3] = t("i", {
                  class: "fa-solid fa-chevron-down gw-item__chev",
                  inert: ""
                }, null, -1))
              ], 8, An),
              (S = _.system.trackers) != null && S.length ? (l(), n("div", Fn, [
                (l(!0), n($, null, f(_.system.trackers.slice(0, E), (P, C) => (l(), M(j, {
                  key: C,
                  tracker: P,
                  index: C,
                  "item-id": _._id,
                  editable: e.context.editable
                }, null, 8, ["tracker", "index", "item-id", "editable"]))), 128))
              ])) : g("", !0),
              t("div", Cn, [
                t("button", {
                  type: "button",
                  class: "gw-icon-button",
                  "data-action": "viewDoc",
                  "aria-label": a(s)("DOCUMENT.Edit", { type: x.value }),
                  "data-tooltip": a(s)("DOCUMENT.Edit", { type: x.value })
                }, v[4] || (v[4] = [
                  t("i", {
                    class: "fa-solid fa-pen-to-square",
                    inert: ""
                  }, null, -1)
                ]), 8, En),
                e.context.editable ? (l(), n("button", {
                  key: 0,
                  type: "button",
                  class: "gw-icon-button gw-danger",
                  "data-action": "deleteDoc",
                  "aria-label": a(s)("DOCUMENT.Delete", { type: x.value }),
                  "data-tooltip": a(s)("DOCUMENT.Delete", { type: x.value })
                }, v[5] || (v[5] = [
                  t("i", {
                    class: "fa-solid fa-trash",
                    inert: ""
                  }, null, -1)
                ]), 8, Nn)) : g("", !0)
              ])
            ]),
            t("div", {
              class: "gw-item__body",
              id: `${a(o)}-${_._id}-body`,
              inert: !a(i)(c(_))
            }, [
              t("div", Pn, [
                ((z = _.system.trackers) == null ? void 0 : z.length) > E ? (l(), n("div", On, [
                  (l(!0), n($, null, f(_.system.trackers.slice(E), (P, C) => (l(), M(j, {
                    key: C + E,
                    tracker: P,
                    index: C + E,
                    "item-id": _._id,
                    editable: e.context.editable
                  }, null, 8, ["tracker", "index", "item-id", "editable"]))), 128))
                ])) : g("", !0),
                ee(k.$slots, "details", { item: _ }),
                _.system.description ? (l(), n("div", {
                  key: 1,
                  class: "gw-item__desc",
                  innerHTML: (X = e.context.editors[`items.${_._id}.system.description`]) == null ? void 0 : X.enriched
                }, null, 8, Hn)) : g("", !0),
                (J = _.system.notes) != null && J.description ? (l(), n("div", jn, [
                  _.system.notes.label ? (l(), n("strong", Bn, u(_.system.notes.label), 1)) : g("", !0),
                  t("div", {
                    innerHTML: (Q = e.context.editors[`items.${_._id}.system.notes.description`]) == null ? void 0 : Q.enriched
                  }, null, 8, qn)
                ])) : g("", !0)
              ])
            ], 8, Sn)
          ], 10, Gn);
        }), 128))
      ])
    ], 2));
  }
}, Yn = { class: "gw-section-head" }, zn = { class: "gw-heading" }, Xn = ["data-field", "aria-label", "data-tooltip"], Jn = { class: "gw-entries__list" }, Qn = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], Zn = ["data-field", "data-key", "aria-label", "data-tooltip"], O = {
  __name: "EntryList",
  props: ["context", "field", "kind", "icon", "title", "add", "remove", "placeholder"],
  setup(e) {
    return (m, o) => (l(), n("section", {
      class: D(["gw-entries", `gw-entries--${e.kind}`])
    }, [
      t("header", Yn, [
        t("h3", zn, u(e.title), 1),
        e.context.editable ? (l(), n("button", {
          key: 0,
          type: "button",
          class: "gw-icon-button",
          "data-action": "createArrayEntry",
          "data-field": e.field,
          "aria-label": e.add,
          "data-tooltip": e.add
        }, o[0] || (o[0] = [
          t("i", {
            class: "fa-solid fa-plus",
            inert: ""
          }, null, -1)
        ]), 8, Xn)) : g("", !0)
      ]),
      t("ul", Jn, [
        (l(!0), n($, null, f(e.context.system[e.field], (i, r) => (l(), n("li", {
          key: r,
          class: "gw-entry"
        }, [
          t("i", {
            class: D(["fa-solid", e.icon, "gw-entry__bullet"]),
            inert: ""
          }, null, 2),
          w(t("input", {
            type: "text",
            name: `system.${e.field}.${r}`,
            "onUpdate:modelValue": (d) => e.context.system[e.field][r] = d,
            placeholder: e.placeholder,
            "aria-label": `${e.title} ${r + 1}`,
            disabled: !e.context.editable
          }, null, 8, Qn), [
            [p, e.context.system[e.field][r]]
          ]),
          e.context.editable ? (l(), n("button", {
            key: 0,
            type: "button",
            class: "gw-icon-button gw-danger",
            "data-action": "deleteArrayEntry",
            "data-field": e.field,
            "data-key": r,
            "aria-label": e.remove,
            "data-tooltip": e.remove
          }, o[1] || (o[1] = [
            t("i", {
              class: "fa-solid fa-xmark",
              inert: ""
            }, null, -1)
          ]), 8, Zn)) : g("", !0)
        ]))), 128))
      ])
    ], 2));
  }
}, Kn = {
  key: 1,
  class: "gw-char__layout gw-scroll"
}, eo = { class: "gw-char__main" }, to = { class: "gw-panels" }, ao = { class: "gw-prose" }, lo = { class: "gw-heading" }, so = { class: "gw-prose" }, no = { class: "gw-heading" }, ko = {
  __name: "DocumentSheet",
  props: ["context"],
  setup(e) {
    const m = e, o = R("ui"), i = q(m.context.tabs).primary;
    return (r, d) => {
      var c, b;
      return l(), n("div", {
        class: D(["grimwild-vue gw-sheet gw-char standard-form", { "is-compact": (c = a(o)) == null ? void 0 : c.compacto }])
      }, [
        (b = a(o)) != null && b.compacto ? (l(), M(a(bt), {
          key: 0,
          context: e.context
        }, null, 8, ["context"])) : (l(), n("div", Kn, [
          y(a(Ge), { context: e.context }, null, 8, ["context"]),
          t("div", eo, [
            y(a(Oe), { context: e.context }, null, 8, ["context"]),
            y(a(Y), { tabs: a(i) }, null, 8, ["tabs"]),
            t("div", to, [
              y(a(G), {
                tab: a(i).details,
                tabs: a(i)
              }, {
                default: U(() => [
                  y(a(Yt), { context: e.context }, null, 8, ["context"])
                ]),
                _: 1
              }, 8, ["tab", "tabs"]),
              y(a(G), {
                tab: a(i).talents,
                tabs: a(i)
              }, {
                default: U(() => [
                  y(a(zt), { context: e.context }, null, 8, ["context"])
                ]),
                _: 1
              }, 8, ["tab", "tabs"]),
              y(a(G), {
                tab: a(i).arcana,
                tabs: a(i)
              }, {
                default: U(() => [
                  y(a(ea), { context: e.context }, null, 8, ["context"])
                ]),
                _: 1
              }, 8, ["tab", "tabs"]),
              y(a(G), {
                tab: a(i).biography,
                tabs: a(i)
              }, {
                default: U(() => [
                  t("section", ao, [
                    t("h3", lo, u(e.context.systemFields.biography.label), 1),
                    y(a(T), {
                      editable: e.context.editable,
                      field: e.context.editors["system.biography"]
                    }, null, 8, ["editable", "field"])
                  ])
                ]),
                _: 1
              }, 8, ["tab", "tabs"]),
              y(a(G), {
                tab: a(i).notes,
                tabs: a(i)
              }, {
                default: U(() => [
                  t("section", so, [
                    t("h3", no, u(e.context.systemFields.notes.label), 1),
                    y(a(T), {
                      editable: e.context.editable,
                      field: e.context.editors["system.notes"]
                    }, null, 8, ["editable", "field"])
                  ])
                ]),
                _: 1
              }, 8, ["tab", "tabs"])
            ])
          ])
        ]))
      ], 2);
    };
  }
}, oo = { class: "grimwild-vue gw-sheet gw-monster standard-form" }, io = ["aria-label"], co = {
  key: 0,
  class: "gw-colorband__name"
}, ro = { class: "gw-monster__layout gw-scroll" }, uo = { class: "gw-panels" }, mo = { class: "gw-prose" }, bo = { class: "gw-heading" }, vo = {
  __name: "MonsterSheet",
  props: ["context"],
  setup(e) {
    const m = e, o = q(m.context.tabs).primary, i = L(() => m.context.actor.type === "monster"), r = L(() => {
      var d;
      return (((d = m.context.system.sensories) == null ? void 0 : d.colors) ?? []).filter((c) => c.color);
    });
    return (d, c) => (l(), n("div", oo, [
      i.value && r.value.length ? (l(), n("div", {
        key: 0,
        class: "gw-colorband",
        role: "list",
        "aria-label": a(s)("GRIMWILD.UI.colors")
      }, [
        (l(!0), n($, null, f(r.value, (b, h) => (l(), n("div", {
          key: h,
          class: "gw-colorband__item",
          role: "listitem"
        }, [
          t("span", {
            class: "gw-colorband__swatch",
            style: oe({ backgroundColor: b.color })
          }, null, 4),
          b.name ? (l(), n("span", co, u(b.name), 1)) : g("", !0)
        ]))), 128))
      ], 8, io)) : g("", !0),
      t("div", ro, [
        y(a(ya), { context: e.context }, null, 8, ["context"]),
        y(a(Y), { tabs: a(o) }, null, 8, ["tabs"]),
        t("div", uo, [
          a(o).biography ? (l(), M(a(G), {
            key: 0,
            tab: a(o).biography,
            tabs: a(o)
          }, {
            default: U(() => [
              y(a(Za), { context: e.context }, null, 8, ["context"])
            ]),
            _: 1
          }, 8, ["tab", "tabs"])) : g("", !0),
          y(a(G), {
            tab: a(o).moves,
            tabs: a(o)
          }, {
            default: U(() => [
              y(a(bl), { context: e.context }, null, 8, ["context"]),
              i.value ? (l(), M(a(_l), {
                key: 0,
                context: e.context
              }, null, 8, ["context"])) : g("", !0)
            ]),
            _: 1
          }, 8, ["tab", "tabs"]),
          a(o).tables ? (l(), M(a(G), {
            key: 1,
            tab: a(o).tables,
            tabs: a(o)
          }, {
            default: U(() => [
              y(a(ul), { context: e.context }, null, 8, ["context"])
            ]),
            _: 1
          }, 8, ["tab", "tabs"])) : g("", !0),
          y(a(G), {
            tab: a(o).challenges,
            tabs: a(o)
          }, {
            default: U(() => [
              y(a(Sa), { context: e.context }, null, 8, ["context"])
            ]),
            _: 1
          }, 8, ["tab", "tabs"]),
          y(a(G), {
            tab: a(o).notes,
            tabs: a(o)
          }, {
            default: U(() => [
              t("section", mo, [
                t("h3", bo, u(e.context.systemFields.notes.label), 1),
                y(a(T), {
                  editable: e.context.editable,
                  field: e.context.editors["system.notes"]
                }, null, 8, ["editable", "field"])
              ])
            ]),
            _: 1
          }, 8, ["tab", "tabs"])
        ])
      ])
    ]));
  }
}, ho = { class: "grimwild-vue gw-sheet gw-itemsheet standard-form" }, yo = { class: "gw-itemsheet__layout gw-scroll" }, go = { class: "gw-panels" }, xo = {
  key: 0,
  class: "gw-prose"
}, $o = { class: "gw-heading" }, Io = { class: "gw-field" }, wo = ["for"], fo = ["id", "disabled"], po = {
  __name: "ItemSheet",
  props: ["context"],
  setup(e) {
    var r;
    const m = e, o = ((r = R("sheet")) == null ? void 0 : r.id) ?? "grimwild", i = q(m.context.tabs).primary;
    return (d, c) => (l(), n("div", ho, [
      t("div", yo, [
        y(a(Cl), { context: e.context }, null, 8, ["context"]),
        y(a(Y), { tabs: a(i) }, null, 8, ["tabs"]),
        t("div", go, [
          y(a(G), {
            tab: a(i).description,
            tabs: a(i)
          }, {
            default: U(() => {
              var b;
              return [
                y(a(pl), { context: e.context }, null, 8, ["context"]),
                (b = e.context.system) != null && b.notes ? (l(), n("section", xo, [
                  t("h3", $o, u(a(s)("GRIMWILD.UI.notes")), 1),
                  t("div", Io, [
                    t("label", {
                      for: `${a(o)}-notes-label`,
                      class: "gw-label"
                    }, u(a(s)("GRIMWILD.UI.label")), 9, wo),
                    w(t("input", {
                      type: "text",
                      id: `${a(o)}-notes-label`,
                      name: "system.notes.label",
                      "onUpdate:modelValue": c[0] || (c[0] = (h) => e.context.system.notes.label = h),
                      disabled: !e.context.editable
                    }, null, 8, fo), [
                      [p, e.context.system.notes.label]
                    ])
                  ]),
                  y(a(T), {
                    editable: e.context.editable,
                    field: e.context.editors["system.notes.description"]
                  }, null, 8, ["editable", "field"])
                ])) : g("", !0)
              ];
            }),
            _: 1
          }, 8, ["tab", "tabs"]),
          y(a(G), {
            tab: a(i).attributes,
            tabs: a(i)
          }, {
            default: U(() => [
              e.context.item.type === "arcana" ? (l(), M(a(Ls), {
                key: 0,
                context: e.context
              }, null, 8, ["context"])) : g("", !0),
              y(a(El), { context: e.context }, null, 8, ["context"])
            ]),
            _: 1
          }, 8, ["tab", "tabs"])
        ])
      ])
    ]));
  }
};
export {
  ko as DocumentSheetVue,
  po as ItemSheetVue,
  vo as MonsterSheetVue
};
//# sourceMappingURL=components.vue.es.mjs.map
