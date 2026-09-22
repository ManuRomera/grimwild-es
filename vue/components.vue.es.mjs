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
}, gt = { class: "gw-heading" }, xt = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], $t = { class: "gw-label" }, It = { class: "gw-bg__wises" }, wt = ["name", "onUpdate:modelValue", "aria-label", "disabled"], ft = { class: "gw-details__col" }, _t = {
  class: "gw-conditions",
  "data-ayuda": "conditions"
}, kt = { class: "gw-section-head" }, vt = { class: "gw-heading" }, pt = {
  key: 0,
  type: "button",
  class: "gw-button",
  "data-action": "createArrayEntry",
  "data-field": "conditions"
}, Dt = {
  key: 0,
  class: "gw-empty"
}, Lt = { class: "gw-cards" }, Mt = { class: "gw-cond__row" }, Ut = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], Rt = ["data-key", "aria-label", "data-tooltip"], Gt = { class: "gw-cond__row" }, Wt = ["name", "onUpdate:modelValue", "aria-label", "disabled"], Vt = ["value"], Tt = {
  class: "gw-bonds",
  "data-ayuda": "bonds"
}, At = { class: "gw-section-head" }, Ft = { class: "gw-heading" }, Ct = {
  key: 0,
  type: "button",
  class: "gw-button",
  "data-action": "createArrayEntry",
  "data-field": "bonds"
}, Et = {
  key: 0,
  class: "gw-empty"
}, Nt = { class: "gw-cards" }, St = { class: "gw-bond__text" }, Pt = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], Ot = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], Ht = ["data-key", "aria-label", "data-tooltip"], jt = {
  __name: "CharDetails",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("div", ht, [
      t("section", yt, [
        t("h3", gt, u(e.context.systemFields.backgrounds.label), 1),
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
          }, null, 8, xt), [
            [p, i.name]
          ]),
          t("span", $t, u(a(s)("GRIMWILD.Actor.Character.FIELDS.backgrounds.FIELDS.wises.label")), 1),
          t("ul", It, [
            (l(), n($, null, f([0, 1, 2], (d) => t("li", { key: d }, [
              w(t("input", {
                type: "text",
                name: `system.backgrounds.${r}.wises.${d}`,
                "onUpdate:modelValue": (c) => i.wises[d] = c,
                "aria-label": `${a(s)("GRIMWILD.Actor.Character.FIELDS.backgrounds.FIELDS.wises.label")} ${d + 1}`,
                disabled: !e.context.editable
              }, null, 8, wt), [
                [p, i.wises[d]]
              ])
            ])), 64))
          ])
        ]))), 128))
      ]),
      t("div", ft, [
        t("section", _t, [
          t("header", kt, [
            t("h3", vt, u(e.context.systemFields.conditions.label), 1),
            e.context.editable ? (l(), n("button", pt, [
              o[0] || (o[0] = t("i", {
                class: "fa-solid fa-plus",
                inert: ""
              }, null, -1)),
              t("span", null, u(a(s)("GRIMWILD.UI.addCondition")), 1)
            ])) : g("", !0)
          ]),
          e.context.system.conditions.length ? g("", !0) : (l(), n("p", Dt, u(a(s)("GRIMWILD.UI.noConditions")), 1)),
          t("ul", Lt, [
            (l(!0), n($, null, f(e.context.system.conditions, (i, r) => (l(), n("li", {
              key: r,
              class: D(["gw-cond", `gw-cond--${i.severity || "none"}`])
            }, [
              t("div", Mt, [
                w(t("input", {
                  type: "text",
                  class: "gw-cond__name",
                  name: `system.conditions.${r}.name`,
                  "onUpdate:modelValue": (d) => i.name = d,
                  placeholder: a(s)("GRIMWILD.UI.conditionName"),
                  "aria-label": a(s)("GRIMWILD.UI.conditionName"),
                  disabled: !e.context.editable
                }, null, 8, Ut), [
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
                }, o[1] || (o[1] = [
                  t("i", {
                    class: "fa-solid fa-trash",
                    inert: ""
                  }, null, -1)
                ]), 8, Rt)) : g("", !0)
              ]),
              t("div", Gt, [
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
                  }, u(a(s)(d)), 9, Vt))), 128))
                ], 8, Wt), [
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
        t("section", Tt, [
          t("header", At, [
            t("h3", Ft, u(e.context.systemFields.bonds.label), 1),
            e.context.editable ? (l(), n("button", Ct, [
              o[2] || (o[2] = t("i", {
                class: "fa-solid fa-plus",
                inert: ""
              }, null, -1)),
              t("span", null, u(a(s)("GRIMWILD.UI.addBond")), 1)
            ])) : g("", !0)
          ]),
          e.context.system.bonds.length ? g("", !0) : (l(), n("p", Et, u(a(s)("GRIMWILD.UI.noBonds")), 1)),
          t("ul", Nt, [
            (l(!0), n($, null, f(e.context.system.bonds, (i, r) => (l(), n("li", {
              key: r,
              class: "gw-bond",
              "data-bond-actor": ""
            }, [
              o[4] || (o[4] = t("i", {
                class: "fa-solid fa-user gw-bond__icon",
                inert: ""
              }, null, -1)),
              t("div", St, [
                w(t("input", {
                  type: "text",
                  class: "gw-bond__name",
                  name: `system.bonds.${r}.name`,
                  "onUpdate:modelValue": (d) => i.name = d,
                  placeholder: a(s)("GRIMWILD.UI.bondCharacter"),
                  "aria-label": a(s)("GRIMWILD.UI.bondCharacter"),
                  disabled: !e.context.editable
                }, null, 8, Pt), [
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
                }, null, 8, Ot), [
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
              }, o[3] || (o[3] = [
                t("i", {
                  class: "fa-solid fa-trash",
                  inert: ""
                }, null, -1)
              ]), 8, Ht)) : g("", !0)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}, Bt = {
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
}, qt = { class: "gw-arcana__meta" }, Yt = { class: "gw-tag" }, zt = {
  key: 0,
  class: "gw-arcana__touch"
}, Xt = {
  key: 0,
  class: "gw-arcana__limits"
}, Jt = ["innerHTML"], Qt = {
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
          t("p", qt, [
            t("span", Yt, u(a(s)(`GRIMWILD.UI.${i.system.tier || "minor"}Arcana`)), 1),
            i.system.touchstones ? (l(), n("span", zt, [
              t("strong", null, u(a(s)("GRIMWILD.Item.Arcana.FIELDS.touchstones.label")) + ":", 1),
              o[0] || (o[0] = W()),
              t("em", null, u(i.system.touchstones), 1)
            ])) : g("", !0)
          ]),
          i.system.limitations ? (l(), n("div", Xt, [
            t("strong", null, u(a(s)("GRIMWILD.Item.Arcana.FIELDS.limitations.label")) + ":", 1),
            t("div", {
              innerHTML: (r = e.context.editors[`items.${i._id}.system.limitations`]) == null ? void 0 : r.enriched
            }, null, 8, Jt)
          ])) : g("", !0)
        ];
      }),
      _: 1
    }, 8, ["context", "title", "empty"]));
  }
}, Zt = { class: "gw-mhead" }, Kt = ["aria-label", "disabled"], ea = ["src", "alt"], ta = { class: "gw-mhead__main" }, aa = ["aria-label", "placeholder", "disabled"], la = { class: "gw-mhead__meta" }, sa = {
  key: 0,
  class: "gw-select-chip"
}, na = ["disabled"], oa = ["value"], ia = {
  key: 1,
  class: "gw-select-chip"
}, da = ["disabled"], ca = ["value"], ra = {
  key: 2,
  class: "gw-mhead__pool",
  "data-ayuda": "challenge"
}, ua = { class: "gw-label" }, ma = {
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
    return (c, b) => (l(), n("header", Zt, [
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
        }, null, 8, ea)
      ], 8, Kt),
      t("div", ta, [
        w(t("input", {
          type: "text",
          class: "gw-mhead__name",
          name: "name",
          "onUpdate:modelValue": b[0] || (b[0] = (h) => e.context.actor.name = h),
          "aria-label": a(s)("Name"),
          placeholder: a(s)("Name"),
          disabled: !e.context.editable
        }, null, 8, aa), [
          [p, e.context.actor.name]
        ]),
        t("div", la, [
          o.value ? (l(), n("label", sa, [
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
              }, u(h), 9, oa))), 128))
            ], 8, na), [
              [A, e.context.system.role]
            ])
          ])) : g("", !0),
          o.value ? (l(), n("label", ia, [
            t("span", null, u(a(s)("GRIMWILD.Item.Arcana.FIELDS.tier.label")), 1),
            w(t("select", {
              name: "system.tier",
              "onUpdate:modelValue": b[2] || (b[2] = (h) => e.context.system.tier = h),
              disabled: !e.context.editable
            }, [
              (l(!0), n($, null, f(a(r), (h, x) => (l(), n("option", {
                key: x,
                value: x
              }, u(h), 9, ca))), 128))
            ], 8, da), [
              [A, e.context.system.tier]
            ])
          ])) : g("", !0),
          i.value ? (l(), n("div", ra, [
            t("span", ua, u(a(s)("GRIMWILD.UI.challengePool")), 1),
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
}, ba = { class: "gw-challenges-wrap" }, ha = { class: "gw-section-head" }, ya = { class: "gw-heading" }, ga = {
  key: 0,
  type: "button",
  class: "gw-button",
  "data-action": "createDoc",
  "data-document-class": "Item",
  "data-type": "challenge"
}, xa = {
  key: 0,
  class: "gw-empty"
}, $a = { class: "gw-challenges" }, Ia = ["data-item-id"], wa = { class: "gw-challenge__head" }, fa = {
  class: "gw-pool gw-pool--challenge",
  "data-ayuda": "challenge"
}, _a = ["aria-label", "disabled"], ka = { class: "gw-pool__value" }, va = { class: "gw-challenge__name" }, pa = { class: "gw-challenge__bar" }, Da = { class: "gw-challenge__suspense" }, La = { class: "gw-label" }, Ma = { class: "gw-challenge__controls" }, Ua = ["aria-label", "data-tooltip"], Ra = ["aria-label", "data-tooltip"], Ga = { class: "gw-challenge__body" }, Wa = ["innerHTML"], Va = {
  key: 1,
  class: "gw-challenge__traits"
}, Ta = {
  key: 2,
  class: "gw-challenge__moves"
}, Aa = {
  key: 3,
  class: "gw-challenge__fails"
}, Fa = {
  key: 1,
  class: "fa-solid fa-xmark gw-challenge__fail-mark",
  inert: ""
}, Ca = {
  __name: "MonsterChallenges",
  props: ["context"],
  setup(e) {
    const m = e, o = L(() => {
      var r;
      return ((r = m.context.itemTypes) == null ? void 0 : r.challenge) ?? [];
    }), i = s("TYPES.Item.challenge");
    return (r, d) => (l(), n("section", ba, [
      t("header", ha, [
        t("h3", ya, u(a(s)("GRIMWILD.Actor.Tabs.Challenges")), 1),
        e.context.editable ? (l(), n("button", ga, [
          d[0] || (d[0] = t("i", {
            class: "fa-solid fa-plus",
            inert: ""
          }, null, -1)),
          t("span", null, u(a(s)("GRIMWILD.UI.add")), 1)
        ])) : g("", !0)
      ]),
      o.value.length ? g("", !0) : (l(), n("p", xa, u(a(s)("GRIMWILD.UI.noChallenges")), 1)),
      t("ol", $a, [
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
            t("header", wa, [
              t("div", fa, [
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
                ]), 8, _a),
                t("span", ka, u(c.system.pool.diceNum) + "d", 1)
              ]),
              t("h4", va, u(c.name), 1)
            ]),
            t("div", pa, [
              t("div", Da, [
                t("span", La, u(a(s)("GRIMWILD.Resources.suspense")), 1),
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
              t("div", Ma, [
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
                ]), 8, Ua),
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
                ]), 8, Ra)) : g("", !0)
              ])
            ]),
            t("div", Ga, [
              (b = c.system.description) != null && b.length ? (l(), n("div", {
                key: 0,
                class: "gw-challenge__desc",
                innerHTML: (h = e.context.editors[`items.${c._id}.system.description`]) == null ? void 0 : h.enriched
              }, null, 8, Wa)) : g("", !0),
              c.system.traits.length ? (l(), n("ul", Va, [
                (l(!0), n($, null, f(c.system.traits, (x, I) => (l(), n("li", { key: I }, u(x), 1))), 128))
              ])) : g("", !0),
              c.system.moves.length ? (l(), n("ul", Ta, [
                (l(!0), n($, null, f(c.system.moves, (x, I) => (l(), n("li", { key: I }, u(x), 1))), 128))
              ])) : g("", !0),
              c.system.failure.length ? (l(), n("ul", Aa, [
                (l(!0), n($, null, f(c.system.failure, (x, I) => (l(), n("li", { key: I }, [
                  x.pool.diceNum > 0 ? (l(), M(a(V), {
                    key: 0,
                    field: "failure",
                    "field-key": I,
                    "no-input": !0,
                    "item-id": c._id,
                    pool: x.pool,
                    label: x.value
                  }, null, 8, ["field-key", "item-id", "pool", "label"])) : (l(), n("i", Fa)),
                  t("span", null, u(x.value), 1)
                ]))), 128))
              ])) : g("", !0)
            ])
          ], 8, Ia);
        }), 128))
      ])
    ]));
  }
}, Ea = { class: "gw-senses" }, Na = { class: "gw-heading" }, Sa = ["for"], Pa = ["id", "name", "onUpdate:modelValue", "disabled"], Oa = { class: "gw-colors" }, Ha = { class: "gw-heading" }, ja = { class: "gw-colors__grid" }, Ba = ["innerHTML"], qa = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], Ya = { class: "gw-prose" }, za = { class: "gw-heading" }, Xa = {
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
      t("section", Ea, [
        t("h3", Na, u(a(s)("GRIMWILD.UI.sensories")), 1),
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
          }, u(c.label), 9, Sa),
          w(t("input", {
            type: "text",
            id: `${a(m)}-${c.key}`,
            name: `system.sensories.${c.key}`,
            "onUpdate:modelValue": (b) => e.context.system.sensories[c.key] = b,
            disabled: !e.context.editable
          }, null, 8, Pa), [
            [p, e.context.system.sensories[c.key]]
          ])
        ])), 64))
      ]),
      t("section", Oa, [
        t("h3", Ha, u(a(s)("GRIMWILD.UI.colors")), 1),
        t("div", ja, [
          (l(!0), n($, null, f(e.context.system.sensories.colors, (c, b) => (l(), n("div", {
            key: b,
            class: "gw-color-edit"
          }, [
            t("div", {
              class: "gw-color-edit__picker",
              innerHTML: e.context.customElements[`system.sensories.colors.${b}.color`].outerHTML
            }, null, 8, Ba),
            w(t("input", {
              type: "text",
              name: `system.sensories.colors.${b}.name`,
              "onUpdate:modelValue": (h) => c.name = h,
              placeholder: a(s)("GRIMWILD.UI.colorName"),
              "aria-label": a(s)("GRIMWILD.UI.colorName"),
              disabled: !e.context.editable
            }, null, 8, qa), [
              [p, c.name]
            ])
          ]))), 128))
        ])
      ]),
      t("section", Ya, [
        t("h3", za, u(e.context.systemFields.biography.label), 1),
        y(a(T), {
          editable: e.context.editable,
          field: e.context.editors["system.biography"]
        }, null, 8, ["editable", "field"])
      ])
    ], 64));
  }
}, Ja = { class: "monster-tables-wrapper form-group stacked" }, Qa = ["aria-label", "data-tooltip", "data-key"], Za = { class: "form-group" }, Ka = ["name", "placeholder", "onUpdate:modelValue"], el = { class: "form-group" }, tl = ["name", "placeholder", "onUpdate:modelValue"], al = { class: "tables-wrapper form-group stacked" }, ll = { class: "form-group stacked" }, sl = ["aria-label", "data-tooltip", "data-field", "data-key"], nl = ["name", "onUpdate:modelValue"], ol = ["data-field"], il = {
  class: "monster-table-create entry-create",
  type: "button",
  "data-action": "createArrayEntry",
  "data-field": "tables"
}, dl = {
  __name: "MonsterTables",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("section", Ja, [
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
          ]), 8, Qa),
          t("div", Za, [
            t("label", null, u(a(s)("GRIMWILD.UI.tableName")), 1),
            w(t("input", {
              type: "text",
              name: `system.tables.${r}.name`,
              placeholder: a(s)("GRIMWILD.UI.tableNamePlaceholder"),
              "onUpdate:modelValue": (d) => i.name = d
            }, null, 8, Ka), [
              [p, i.name]
            ])
          ]),
          t("div", el, [
            t("label", null, u(a(s)("GRIMWILD.UI.tableInstructions")), 1),
            w(t("input", {
              type: "text",
              name: `system.tables.${r}.instructions`,
              placeholder: a(s)("GRIMWILD.UI.tableInstructionsPlaceholder"),
              "onUpdate:modelValue": (d) => i.instructions = d
            }, null, 8, tl), [
              [p, i.instructions]
            ])
          ]),
          t("div", al, [
            t("div", ll, [
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
                ]), 8, sl),
                (l(!0), n($, null, f(d, (b, h) => (l(), n("div", {
                  key: h,
                  class: "form-group"
                }, [
                  t("label", null, u(Number(h) + 1), 1),
                  w(t("input", {
                    type: "text",
                    name: `system.tables.${r}.table.${c}.${h}`,
                    "onUpdate:modelValue": (x) => e.context.system.tables[r].table[c][h] = x
                  }, null, 8, nl), [
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
            ], 8, ol)
          ])
        ]))), 128)),
        t("button", il, [
          o[3] || (o[3] = t("i", {
            class: "fas fa-plus",
            inert: ""
          }, null, -1)),
          W(" " + u(a(s)("GRIMWILD.UI.addTable")), 1)
        ])
      ]))
    ]));
  }
}, cl = { class: "gw-lists" }, rl = {
  __name: "MonsterTraitsMoves",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("div", cl, [
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
}, ul = { class: "gw-desires" }, ml = { class: "gw-heading" }, bl = { class: "gw-desire gw-desire--want" }, hl = { class: "gw-desire__label" }, yl = ["aria-label", "disabled"], gl = { class: "gw-desire gw-desire--avoid" }, xl = { class: "gw-desire__label" }, $l = ["aria-label", "disabled"], Il = {
  __name: "MonsterDesires",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("section", ul, [
      t("h3", ml, u(a(s)("GRIMWILD.Actor.Character.FIELDS.desires.label")), 1),
      t("div", bl, [
        t("span", hl, [
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
        }, null, 8, yl), [
          [p, e.context.system.desires[0].value]
        ])
      ]),
      t("div", gl, [
        t("span", xl, [
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
        }, null, 8, $l), [
          [p, e.context.system.desires[1].value]
        ])
      ])
    ]));
  }
}, wl = { class: "gw-prose" }, fl = { class: "gw-heading" }, _l = {
  __name: "ItemDescription",
  props: ["item", "context"],
  setup(e) {
    return (m, o) => (l(), n("section", wl, [
      t("h3", fl, u(e.context.systemFields.description.label), 1),
      y(a(T), {
        editable: e.context.editable,
        field: e.context.editors["system.description"]
      }, null, 8, ["editable", "field"])
    ]));
  }
}, kl = { class: "gw-mhead gw-ihead" }, vl = ["aria-label", "disabled"], pl = ["src", "alt"], Dl = { class: "gw-mhead__main" }, Ll = ["placeholder", "aria-label", "disabled"], Ml = { class: "gw-mhead__meta" }, Ul = { class: "gw-tag" }, Rl = {
  class: "gw-mhead__pool",
  "data-ayuda": "challenge"
}, Gl = { class: "gw-label" }, Wl = { class: "gw-mhead__pool" }, Vl = { class: "gw-label" }, Tl = {
  __name: "ItemHeader",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("header", kl, [
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
        }, null, 8, pl)
      ], 8, vl),
      t("div", Dl, [
        w(t("input", {
          type: "text",
          class: "gw-mhead__name",
          name: "name",
          "onUpdate:modelValue": o[0] || (o[0] = (i) => e.context.item.name = i),
          placeholder: a(s)("Name"),
          "aria-label": a(s)("Name"),
          disabled: !e.context.editable
        }, null, 8, Ll), [
          [p, e.context.item.name]
        ]),
        t("div", Ml, [
          t("span", Ul, u(a(s)(`TYPES.Item.${e.context.item.type}`)), 1),
          e.context.item.type === "challenge" ? (l(), n($, { key: 0 }, [
            t("div", Rl, [
              t("span", Gl, u(e.context.systemFields.pool.label), 1),
              y(a(V), {
                field: "pool",
                pool: e.context.system.pool,
                label: e.context.item.name,
                min: "0"
              }, null, 8, ["pool", "label"])
            ]),
            t("div", Wl, [
              t("span", Vl, u(e.context.systemFields.suspense.label), 1),
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
}, Al = {
  __name: "ItemAttributes",
  props: ["context"],
  setup(e) {
    return R("rawDocument"), (m, o) => (l(), n($, null, [
      ["arcana", "talent"].includes(e.context.item.type) ? (l(), M(a(ms), {
        key: 0,
        context: e.context
      }, null, 8, ["context"])) : g("", !0),
      e.context.item.type === "challenge" ? (l(), M(a(Vs), {
        key: 1,
        context: e.context
      }, null, 8, ["context"])) : g("", !0)
    ], 64));
  }
}, Fl = { class: "gw-trackers-edit" }, Cl = { class: "gw-section-head" }, El = { class: "gw-heading" }, Nl = {
  key: 0,
  type: "button",
  class: "gw-button",
  "data-action": "createTracker"
}, Sl = {
  key: 0,
  class: "gw-empty"
}, Pl = { class: "gw-cards" }, Ol = { class: "gw-field" }, Hl = ["for"], jl = ["id", "name", "onUpdate:modelValue"], Bl = { class: "gw-field" }, ql = ["for"], Yl = ["id", "name", "onUpdate:modelValue"], zl = { value: "pool" }, Xl = { value: "points" }, Jl = {
  key: 0,
  class: "gw-field gw-field--check",
  "data-ayuda": "powerPool"
}, Ql = ["name", "onUpdate:modelValue"], Zl = { class: "gw-label" }, Kl = { class: "gw-field" }, es = ["for"], ts = ["id", "name", "onUpdate:modelValue", "max"], as = ["id", "name", "onUpdate:modelValue", "max"], ls = { class: "gw-field" }, ss = ["for"], ns = ["id", "name", "onUpdate:modelValue"], os = {
  key: 1,
  class: "gw-field"
}, is = ["for"], ds = ["id", "name", "onUpdate:modelValue"], cs = { value: !1 }, rs = { value: !0 }, us = ["data-key", "aria-label", "data-tooltip"], ms = {
  __name: "TalentTrackers",
  props: ["context"],
  setup(e) {
    var o;
    const m = ((o = R("sheet")) == null ? void 0 : o.id) ?? "grimwild";
    return (i, r) => (l(), n("section", Fl, [
      t("header", Cl, [
        t("h3", El, u(e.context.systemFields.trackers.label), 1),
        e.context.editable ? (l(), n("button", Nl, [
          r[0] || (r[0] = t("i", {
            class: "fa-solid fa-plus",
            inert: ""
          }, null, -1)),
          t("span", null, u(a(s)("GRIMWILD.UI.addTracker")), 1)
        ])) : g("", !0)
      ]),
      e.context.system.trackers.length ? g("", !0) : (l(), n("p", Sl, u(a(s)("GRIMWILD.UI.noTrackers")), 1)),
      t("ul", Pl, [
        (l(!0), n($, null, f(e.context.system.trackers, (d, c) => (l(), n("li", {
          key: c,
          class: "gw-tracker-edit"
        }, [
          t("div", Ol, [
            t("label", {
              for: `${a(m)}-tr-${c}-label`,
              class: "gw-label"
            }, u(a(s)("GRIMWILD.UI.label")), 9, Hl),
            w(t("input", {
              type: "text",
              id: `${a(m)}-tr-${c}-label`,
              name: `system.trackers.${c}.label`,
              "onUpdate:modelValue": (b) => d.label = b
            }, null, 8, jl), [
              [p, d.label]
            ])
          ]),
          t("div", Bl, [
            t("label", {
              for: `${a(m)}-tr-${c}-type`,
              class: "gw-label"
            }, u(a(s)("GRIMWILD.UI.type")), 9, ql),
            w(t("select", {
              id: `${a(m)}-tr-${c}-type`,
              name: `system.trackers.${c}.type`,
              "onUpdate:modelValue": (b) => d.type = b
            }, [
              t("option", zl, u(a(s)("GRIMWILD.UI.pool")), 1),
              t("option", Xl, u(a(s)("GRIMWILD.Resources.points")), 1)
            ], 8, Yl), [
              [A, d.type]
            ])
          ]),
          d.type === "pool" ? (l(), n("label", Jl, [
            w(t("input", {
              type: "checkbox",
              name: `system.trackers.${c}.pool.powerPool`,
              "onUpdate:modelValue": (b) => d.pool.powerPool = b
            }, null, 8, Ql), [
              [B, d.pool.powerPool]
            ]),
            t("span", Zl, u(a(s)("GRIMWILD.UI.powerPool")), 1)
          ])) : g("", !0),
          t("div", Kl, [
            t("label", {
              for: `${a(m)}-tr-${c}-value`,
              class: "gw-label"
            }, u(a(s)("GRIMWILD.UI.value")), 9, es),
            d.type === "pool" ? w((l(), n("input", {
              key: 0,
              type: "number",
              id: `${a(m)}-tr-${c}-value`,
              name: `system.trackers.${c}.pool.diceNum`,
              "onUpdate:modelValue": (b) => d.pool.diceNum = b,
              min: "0",
              max: d.pool.max > 0 ? d.pool.max : null
            }, null, 8, ts)), [
              [p, d.pool.diceNum]
            ]) : w((l(), n("input", {
              key: 1,
              type: "number",
              id: `${a(m)}-tr-${c}-value`,
              name: `system.trackers.${c}.points.value`,
              "onUpdate:modelValue": (b) => d.points.value = b,
              min: "0",
              max: d.points.max
            }, null, 8, as)), [
              [p, d.points.value]
            ])
          ]),
          t("div", ls, [
            t("label", {
              for: `${a(m)}-tr-${c}-max`,
              class: "gw-label"
            }, u(a(s)("GRIMWILD.UI.max")), 9, ss),
            w(t("input", {
              type: "number",
              id: `${a(m)}-tr-${c}-max`,
              name: `system.trackers.${c}.${d.type}.max`,
              min: "1",
              "onUpdate:modelValue": (b) => d[d.type].max = b
            }, null, 8, ns), [
              [p, d[d.type].max]
            ])
          ]),
          d.type === "points" ? (l(), n("div", os, [
            t("label", {
              for: `${a(m)}-tr-${c}-steps`,
              class: "gw-label"
            }, u(a(s)("GRIMWILD.UI.display")), 9, is),
            w(t("select", {
              id: `${a(m)}-tr-${c}-steps`,
              name: `system.trackers.${c}.points.showSteps`,
              "onUpdate:modelValue": (b) => d.points.showSteps = b
            }, [
              t("option", cs, u(a(s)("GRIMWILD.UI.number")), 1),
              t("option", rs, u(a(s)("GRIMWILD.UI.checkboxes")), 1)
            ], 8, ds), [
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
          ]), 8, us)
        ]))), 128))
      ])
    ]));
  }
}, bs = { class: "gw-prose" }, hs = { class: "gw-heading" }, ys = { class: "gw-field" }, gs = ["for"], xs = ["id", "disabled"], $s = ["value"], Is = { class: "gw-field" }, ws = ["for"], fs = ["id", "disabled"], _s = { class: "gw-field gw-field--stacked" }, ks = { class: "gw-label" }, vs = {
  __name: "ArcanaDetails",
  props: ["context"],
  setup(e) {
    var o;
    const m = ((o = R("sheet")) == null ? void 0 : o.id) ?? "grimwild";
    return (i, r) => (l(), n("section", bs, [
      t("h3", hs, u(a(s)("GRIMWILD.UI.details")), 1),
      t("div", ys, [
        t("label", {
          for: `${a(m)}-tier`,
          class: "gw-label"
        }, u(e.context.systemFields.tier.label), 9, gs),
        w(t("select", {
          id: `${a(m)}-tier`,
          name: "system.tier",
          "onUpdate:modelValue": r[0] || (r[0] = (d) => e.context.system.tier = d),
          disabled: !e.context.editable
        }, [
          (l(), n($, null, f(["minor", "major", "mythic"], (d) => t("option", {
            key: d,
            value: d
          }, u(a(s)(`GRIMWILD.UI.${d}Arcana`)), 9, $s)), 64))
        ], 8, xs), [
          [A, e.context.system.tier]
        ])
      ]),
      t("div", Is, [
        t("label", {
          for: `${a(m)}-touchstones`,
          class: "gw-label"
        }, u(e.context.systemFields.touchstones.label), 9, ws),
        w(t("input", {
          type: "text",
          id: `${a(m)}-touchstones`,
          name: "system.touchstones",
          "onUpdate:modelValue": r[1] || (r[1] = (d) => e.context.system.touchstones = d),
          disabled: !e.context.editable
        }, null, 8, fs), [
          [p, e.context.system.touchstones]
        ])
      ]),
      t("div", _s, [
        t("span", ks, u(e.context.systemFields.limitations.label), 1),
        y(a(T), {
          editable: e.context.editable,
          field: e.context.editors["system.limitations"]
        }, null, 8, ["editable", "field"])
      ])
    ]));
  }
}, ps = { class: "gw-lists" }, Ds = { class: "gw-entries gw-entries--fail" }, Ls = { class: "gw-section-head" }, Ms = { class: "gw-heading" }, Us = ["aria-label", "data-tooltip"], Rs = { class: "gw-entries__list" }, Gs = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], Ws = ["data-key", "aria-label", "data-tooltip"], Vs = {
  __name: "ChallengeTraitsMoves",
  props: ["context"],
  setup(e) {
    return (m, o) => (l(), n("div", ps, [
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
      t("section", Ds, [
        t("header", Ls, [
          t("h3", Ms, u(e.context.systemFields.failure.label), 1),
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
          ]), 8, Us)) : g("", !0)
        ]),
        t("ul", Rs, [
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
            }, null, 8, Gs), [
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
            ]), 8, Ws)) : g("", !0)
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
const Ts = ["aria-expanded", "aria-controls"], As = ["id"], Fs = ["id", "aria-selected", "aria-controls", "tabindex", "data-tab", "onClick"], Cs = { class: "gw-tab__label" }, Y = {
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
        ], 8, Ts),
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
            t("span", Cs, u(v.label), 1)
          ], 10, Fs))), 128))
        ], 40, As)
      ], 2);
    };
  }
}, Es = ["id", "aria-labelledby"], G = {
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
    ], 10, Es)), [
      [K, a(i) === e.tab.key]
    ]);
  }
}, Ns = ["innerHTML"], T = {
  __name: "Prosemirror",
  props: ["field", "editable"],
  setup(e) {
    return (m, o) => {
      var i, r;
      return l(), n("div", {
        class: "prose-mirror-wrapper",
        innerHTML: e.editable && ((i = e.field) != null && i.element) ? e.field.element.outerHTML : ((r = e.field) == null ? void 0 : r.enriched) ?? ""
      }, null, 8, Ns);
    };
  }
}, Ss = {
  class: "gw-pool",
  "data-ayuda": "pool"
}, Ps = ["data-action", "data-roll-type", "data-item-id", "data-field", "data-key", "aria-label", "data-tooltip", "disabled"], Os = { key: 0 }, Hs = {
  key: 0,
  class: "gw-pool__value"
}, js = ["data-action-change", "data-item-id", "name", "value", "min", "max", "aria-label"], Bs = { class: "gw-pool__suffix" }, V = {
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
      return l(), n("div", Ss, [
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
          e.buttonLabel ? (l(), n("span", Os, u(e.buttonLabel), 1)) : g("", !0)
        ], 8, Ps),
        e.noInput ? (l(), n("span", Hs, u(((b = e.pool) == null ? void 0 : b.diceNum) ?? 0) + "d", 1)) : (l(), n($, { key: 1 }, [
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
          }, null, 8, js),
          t("span", Bs, u(e.suffix ?? "d"), 1)
        ], 64))
      ]);
    };
  }
}, qs = ["data-stat", "aria-label"], Ys = { class: "gw-stat__name" }, zs = ["name", "min", "max", "aria-label", "disabled"], Xs = ["data-tooltip"], Js = ["name", "disabled"], Qs = { class: "gw-mark__text" }, N = {
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
        t("span", Ys, u(e.compact ? d.value : r.value), 1),
        h[2] || (h[2] = t("i", {
          class: "fa-solid fa-dice-d6 gw-stat__dice",
          inert: ""
        }, null, -1))
      ], 8, qs),
      w(t("input", {
        type: "number",
        class: "gw-stat__value",
        name: `system.stats.${e.stat}.value`,
        "onUpdate:modelValue": h[0] || (h[0] = (x) => o.value.value = x),
        min: i.value.fields.value.min,
        max: i.value.fields.value.max,
        "aria-label": r.value,
        disabled: !c.value
      }, null, 8, zs), [
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
        }, null, 8, Js), [
          [B, o.value.marked]
        ]),
        t("i", {
          class: D([o.value.marked ? "fa-solid" : "fa-regular", "fa-bookmark"]),
          inert: ""
        }, null, 2),
        t("span", Qs, u(o.value.marked ? a(s)("GRIMWILD.Damage.marked") : a(s)("GRIMWILD.UI.mark")), 1)
      ], 10, Xs)
    ], 2));
  }
}, Zs = ["data-ayuda"], Ks = ["name", "checked"], en = { class: "gw-toggle__text" }, tn = {
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
      }, null, 40, Ks),
      t("i", {
        class: D([e.modelValue ? "fa-solid" : "fa-regular", e.icon]),
        inert: ""
      }, null, 2),
      t("span", en, u(e.label), 1),
      e.modelValue ? (l(), n("i", tn)) : g("", !0)
    ], 10, Zs));
  }
}, an = { class: "gw-harm-wrap" }, ln = { class: "gw-harm-wrap" }, sn = { class: "gw-harm-wrap" }, le = {
  __name: "HarmTrack",
  props: ["context", "compact"],
  setup(e) {
    return (m, o) => (l(), n("div", {
      class: D(["gw-harms", { compact: e.compact }])
    }, [
      t("div", an, [
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
      t("div", ln, [
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
      t("div", sn, [
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
}, nn = ["aria-label", "data-ayuda"], on = ["data-tooltip"], dn = ["name", "checked", "data-action-change", "data-field", "data-key", "data-item-id"], cn = { class: "visually-hidden" }, F = {
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
        }, null, 8, dn),
        t("i", {
          class: D(e.icon),
          inert: ""
        }, null, 2),
        t("span", cn, u(e.label) + " " + u(r + 1), 1)
      ], 10, on))), 128))
    ], 10, nn));
  }
}, rn = ["data-item-id", "data-key", "aria-label", "disabled", "data-ayuda"], un = { key: 0 }, mn = { class: "gw-tracker__num" }, bn = ["data-item-id", "data-tracker-key", "value", "max", "aria-label", "disabled"], hn = {
  key: 0,
  class: "gw-tracker__label"
}, yn = ["aria-label"], gn = ["aria-checked", "aria-label", "data-item-id", "data-tracker-key", "data-value", "data-tracker-value", "disabled"], xn = {
  key: 2,
  class: "gw-tracker__num"
}, $n = ["data-item-id", "data-tracker-key", "value", "max", "aria-label", "disabled"], In = { "aria-hidden": "true" }, j = {
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
          e.tracker.label ? (l(), n("span", un, u(e.tracker.label), 1)) : g("", !0)
        ], 8, rn),
        t("span", mn, [
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
          }, null, 8, bn),
          o[1] || (o[1] = t("span", { "aria-hidden": "true" }, "d", -1))
        ])
      ], 64)) : (l(), n($, { key: 1 }, [
        e.tracker.label ? (l(), n("span", hn, u(e.tracker.label), 1)) : g("", !0),
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
          }, null, 10, gn))), 128))
        ], 8, yn)) : (l(), n("span", xn, [
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
          }, null, 8, $n),
          t("span", In, "/ " + u(e.tracker.points.max), 1)
        ]))
      ], 64))
    ], 2));
  }
}, wn = { class: "gw-items__head" }, fn = { class: "gw-heading" }, _n = { class: "gw-items__tools" }, kn = ["aria-label", "data-tooltip"], vn = ["data-type"], pn = ["data-pack"], Dn = {
  key: 0,
  class: "gw-empty"
}, Ln = { class: "gw-items__list" }, Mn = ["data-item-id"], Un = { class: "gw-item__head" }, Rn = ["aria-label", "data-tooltip"], Gn = ["src"], Wn = ["aria-expanded", "aria-controls", "onClick"], Vn = {
  key: 0,
  class: "gw-item__trackers"
}, Tn = { class: "gw-item__controls" }, An = ["aria-label", "data-tooltip"], Fn = ["aria-label", "data-tooltip"], Cn = ["id", "inert"], En = { class: "gw-item__inner" }, Nn = {
  key: 0,
  class: "gw-item__trackers gw-item__trackers--more"
}, Sn = ["innerHTML"], Pn = {
  key: 2,
  class: "gw-item__notes"
}, On = { key: 0 }, Hn = ["innerHTML"], E = 2, se = {
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
      t("header", wn, [
        t("h3", fn, u(e.title), 1),
        t("div", _n, [
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
          ], 8, kn)) : g("", !0),
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
          ], 8, vn)) : g("", !0),
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
          ], 8, pn)
        ])
      ]),
      b.value.length ? g("", !0) : (l(), n("p", Dn, u(e.empty), 1)),
      t("ol", Ln, [
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
            t("div", Un, [
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
                }, null, 8, Gn)
              ], 8, Rn),
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
              ], 8, Wn),
              (S = _.system.trackers) != null && S.length ? (l(), n("div", Vn, [
                (l(!0), n($, null, f(_.system.trackers.slice(0, E), (P, C) => (l(), M(j, {
                  key: C,
                  tracker: P,
                  index: C,
                  "item-id": _._id,
                  editable: e.context.editable
                }, null, 8, ["tracker", "index", "item-id", "editable"]))), 128))
              ])) : g("", !0),
              t("div", Tn, [
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
                ]), 8, An),
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
                ]), 8, Fn)) : g("", !0)
              ])
            ]),
            t("div", {
              class: "gw-item__body",
              id: `${a(o)}-${_._id}-body`,
              inert: !a(i)(c(_))
            }, [
              t("div", En, [
                ((z = _.system.trackers) == null ? void 0 : z.length) > E ? (l(), n("div", Nn, [
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
                }, null, 8, Sn)) : g("", !0),
                (J = _.system.notes) != null && J.description ? (l(), n("div", Pn, [
                  _.system.notes.label ? (l(), n("strong", On, u(_.system.notes.label), 1)) : g("", !0),
                  t("div", {
                    innerHTML: (Q = e.context.editors[`items.${_._id}.system.notes.description`]) == null ? void 0 : Q.enriched
                  }, null, 8, Hn)
                ])) : g("", !0)
              ])
            ], 8, Cn)
          ], 10, Mn);
        }), 128))
      ])
    ], 2));
  }
}, jn = { class: "gw-section-head" }, Bn = { class: "gw-heading" }, qn = ["data-field", "aria-label", "data-tooltip"], Yn = { class: "gw-entries__list" }, zn = ["name", "onUpdate:modelValue", "placeholder", "aria-label", "disabled"], Xn = ["data-field", "data-key", "aria-label", "data-tooltip"], O = {
  __name: "EntryList",
  props: ["context", "field", "kind", "icon", "title", "add", "remove", "placeholder"],
  setup(e) {
    return (m, o) => (l(), n("section", {
      class: D(["gw-entries", `gw-entries--${e.kind}`])
    }, [
      t("header", jn, [
        t("h3", Bn, u(e.title), 1),
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
        ]), 8, qn)) : g("", !0)
      ]),
      t("ul", Yn, [
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
          }, null, 8, zn), [
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
          ]), 8, Xn)) : g("", !0)
        ]))), 128))
      ])
    ], 2));
  }
}, Jn = {
  key: 1,
  class: "gw-char__layout gw-scroll"
}, Qn = { class: "gw-char__main" }, Zn = { class: "gw-panels" }, Kn = { class: "gw-prose" }, eo = { class: "gw-heading" }, to = { class: "gw-prose" }, ao = { class: "gw-heading" }, wo = {
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
        }, null, 8, ["context"])) : (l(), n("div", Jn, [
          y(a(Ge), { context: e.context }, null, 8, ["context"]),
          t("div", Qn, [
            y(a(Oe), { context: e.context }, null, 8, ["context"]),
            y(a(Y), { tabs: a(i) }, null, 8, ["tabs"]),
            t("div", Zn, [
              y(a(G), {
                tab: a(i).details,
                tabs: a(i)
              }, {
                default: U(() => [
                  y(a(jt), { context: e.context }, null, 8, ["context"])
                ]),
                _: 1
              }, 8, ["tab", "tabs"]),
              y(a(G), {
                tab: a(i).talents,
                tabs: a(i)
              }, {
                default: U(() => [
                  y(a(Bt), { context: e.context }, null, 8, ["context"])
                ]),
                _: 1
              }, 8, ["tab", "tabs"]),
              y(a(G), {
                tab: a(i).arcana,
                tabs: a(i)
              }, {
                default: U(() => [
                  y(a(Qt), { context: e.context }, null, 8, ["context"])
                ]),
                _: 1
              }, 8, ["tab", "tabs"]),
              y(a(G), {
                tab: a(i).biography,
                tabs: a(i)
              }, {
                default: U(() => [
                  t("section", Kn, [
                    t("h3", eo, u(e.context.systemFields.biography.label), 1),
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
                  t("section", to, [
                    t("h3", ao, u(e.context.systemFields.notes.label), 1),
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
}, lo = { class: "grimwild-vue gw-sheet gw-monster standard-form" }, so = ["aria-label"], no = {
  key: 0,
  class: "gw-colorband__name"
}, oo = { class: "gw-monster__layout gw-scroll" }, io = { class: "gw-panels" }, co = { class: "gw-prose" }, ro = { class: "gw-heading" }, fo = {
  __name: "MonsterSheet",
  props: ["context"],
  setup(e) {
    const m = e, o = q(m.context.tabs).primary, i = L(() => m.context.actor.type === "monster"), r = L(() => {
      var d;
      return (((d = m.context.system.sensories) == null ? void 0 : d.colors) ?? []).filter((c) => c.color);
    });
    return (d, c) => (l(), n("div", lo, [
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
          b.name ? (l(), n("span", no, u(b.name), 1)) : g("", !0)
        ]))), 128))
      ], 8, so)) : g("", !0),
      t("div", oo, [
        y(a(ma), { context: e.context }, null, 8, ["context"]),
        y(a(Y), { tabs: a(o) }, null, 8, ["tabs"]),
        t("div", io, [
          a(o).biography ? (l(), M(a(G), {
            key: 0,
            tab: a(o).biography,
            tabs: a(o)
          }, {
            default: U(() => [
              y(a(Xa), { context: e.context }, null, 8, ["context"])
            ]),
            _: 1
          }, 8, ["tab", "tabs"])) : g("", !0),
          y(a(G), {
            tab: a(o).moves,
            tabs: a(o)
          }, {
            default: U(() => [
              y(a(rl), { context: e.context }, null, 8, ["context"]),
              i.value ? (l(), M(a(Il), {
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
              y(a(dl), { context: e.context }, null, 8, ["context"])
            ]),
            _: 1
          }, 8, ["tab", "tabs"])) : g("", !0),
          y(a(G), {
            tab: a(o).challenges,
            tabs: a(o)
          }, {
            default: U(() => [
              y(a(Ca), { context: e.context }, null, 8, ["context"])
            ]),
            _: 1
          }, 8, ["tab", "tabs"]),
          y(a(G), {
            tab: a(o).notes,
            tabs: a(o)
          }, {
            default: U(() => [
              t("section", co, [
                t("h3", ro, u(e.context.systemFields.notes.label), 1),
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
}, uo = { class: "grimwild-vue gw-sheet gw-itemsheet standard-form" }, mo = { class: "gw-itemsheet__layout gw-scroll" }, bo = { class: "gw-panels" }, ho = {
  key: 0,
  class: "gw-prose"
}, yo = { class: "gw-heading" }, go = { class: "gw-field" }, xo = ["for"], $o = ["id", "disabled"], _o = {
  __name: "ItemSheet",
  props: ["context"],
  setup(e) {
    var r;
    const m = e, o = ((r = R("sheet")) == null ? void 0 : r.id) ?? "grimwild", i = q(m.context.tabs).primary;
    return (d, c) => (l(), n("div", uo, [
      t("div", mo, [
        y(a(Tl), { context: e.context }, null, 8, ["context"]),
        y(a(Y), { tabs: a(i) }, null, 8, ["tabs"]),
        t("div", bo, [
          y(a(G), {
            tab: a(i).description,
            tabs: a(i)
          }, {
            default: U(() => {
              var b;
              return [
                y(a(_l), { context: e.context }, null, 8, ["context"]),
                (b = e.context.system) != null && b.notes ? (l(), n("section", ho, [
                  t("h3", yo, u(a(s)("GRIMWILD.UI.notes")), 1),
                  t("div", go, [
                    t("label", {
                      for: `${a(o)}-notes-label`,
                      class: "gw-label"
                    }, u(a(s)("GRIMWILD.UI.label")), 9, xo),
                    w(t("input", {
                      type: "text",
                      id: `${a(o)}-notes-label`,
                      name: "system.notes.label",
                      "onUpdate:modelValue": c[0] || (c[0] = (h) => e.context.system.notes.label = h),
                      disabled: !e.context.editable
                    }, null, 8, $o), [
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
              e.context.item.type === "arcana" ? (l(), M(a(vs), {
                key: 0,
                context: e.context
              }, null, 8, ["context"])) : g("", !0),
              y(a(Al), { context: e.context }, null, 8, ["context"])
            ]),
            _: 1
          }, 8, ["tab", "tabs"])
        ])
      ])
    ]));
  }
};
export {
  wo as DocumentSheetVue,
  _o as ItemSheetVue,
  fo as MonsterSheetVue
};
//# sourceMappingURL=components.vue.es.mjs.map
