import { inject as L, createElementBlock as o, openBlock as l, createElementVNode as t, withDirectives as y, toDisplayString as c, vModelText as h, Fragment as p, renderList as b, normalizeClass as k, vModelCheckbox as _, unref as f, createTextVNode as V, createBlock as T, createCommentVNode as m, vModelSelect as A, createVNode as g, toRaw as E, renderSlot as z, reactive as F, withCtx as U, normalizeStyle as R } from "../lib/vue.esm-browser.js";
const gwLocalize = (key) => globalThis.game?.i18n?.localize(key) ?? key;
const G = { class: "grimwild-sidebar grid-span-1" }, W = { class: "grimwild-avatar" }, O = ["src", "title"], j = { class: "sidebar-details flexcol" }, B = { class: "name form-group stacked" }, X = { class: "path form-group stacked" }, q = { class: "traits form-group stacked" }, J = { class: "form-group stacked" }, Q = ["name", "onUpdate:modelValue"], Y = ["name", "onUpdate:modelValue"], Z = { id: "traits-list" }, K = ["value"], tt = { class: "desires form-group stacked" }, et = { class: "form-group stacked" }, st = ["name", "onUpdate:modelValue"], at = ["name", "onUpdate:modelValue"], lt = { id: "desires-list" }, ot = ["value"], nt = { class: "xp form-group stacked" }, it = { class: "xp-lvl grid grid-2col" }, dt = { class: "form-group" }, rt = { class: "form-group" }, ct = ["data-level", "data-xp", "checked"], ut = {
  __name: "CharSidebar",
  props: ["context"],
  setup(e) {
    const r = L("rawDocument"), s = game.settings.get("grimwild", "slowXp"), a = r.system.xp.steps.map((i) => s ? i.map((u) => u * 2) : i);
    function n(i) {
      let u = !1;
      return r.system.xp.value >= i && (u = !0), s && r.system.xp.value == i - 1 && (u = !0), u;
    }
    function d(i) {
      let u = "empty";
      return r.system.xp.value >= i && (u = "full"), s && r.system.xp.value == i - 1 && (u = "half"), `xp-${u}`;
    }
    return (i, u) => (l(), o("aside", G, [
      t("div", W, [
        t("img", {
          class: "profile-img",
          src: e.context.actor.img,
          "data-edit": "img",
          "data-action": "onEditImage",
          title: e.context.actor.name,
          height: "100",
          width: "100"
        }, null, 8, O)
      ]),
      t("div", j, [
        t("div", B, [
          t("label", null, c(i.game.i18n.localize("Name")), 1),
          y(t("input", {
            type: "text",
            name: "name",
            "onUpdate:modelValue": u[0] || (u[0] = (x) => e.context.actor.name = x)
          }, null, 512), [
            [h, e.context.actor.name]
          ])
        ]),
        t("div", X, [
          t("label", null, c(i.game.i18n.localize("GRIMWILD.Actor.Character.FIELDS.path.label")), 1),
          y(t("input", {
            type: "text",
            name: "system.path",
            "onUpdate:modelValue": u[1] || (u[1] = (x) => e.context.system.path = x)
          }, null, 512), [
            [h, e.context.system.path]
          ])
        ]),
        t("div", q, [
          t("label", null, c(e.context.systemFields.traits.label), 1),
          t("div", J, [
            (l(!0), o(p, null, b(e.context.system.traits, (x, v) => (l(), o("div", {
              class: k(`trait form-group ${x.are ? "are" : "not"}`),
              key: v
            }, [
              y(t("input", {
                type: "checkbox",
                name: `system.traits.${v}.are`,
                "onUpdate:modelValue": ($) => x.are = $,
                readonly: ""
              }, null, 8, Q), [
                [_, x.are]
              ]),
              y(t("input", {
                type: "text",
                name: `system.traits.${v}.value`,
                "onUpdate:modelValue": ($) => x.value = $,
                list: "traits-list"
              }, null, 8, Y), [
                [h, x.value]
              ])
            ], 2))), 128)),
            t("datalist", Z, [
              (l(!0), o(p, null, b(i.CONFIG.GRIMWILD.traits, (x, v) => (l(), o("option", {
                key: v,
                value: i.game.i18n.localize(x)
              }, c(i.game.i18n.localize(x)), 9, K))), 128))
            ])
          ])
        ]),
        t("div", tt, [
          t("label", null, c(e.context.systemFields.desires.label), 1),
          t("div", et, [
            (l(!0), o(p, null, b(e.context.system.desires, (x, v) => (l(), o("div", {
              class: k(`desire form-group ${x.are ? "are" : "not"}`),
              key: v
            }, [
              y(t("input", {
                type: "checkbox",
                name: `system.desires.${v}.are`,
                "onUpdate:modelValue": ($) => x.are = $,
                readonly: ""
              }, null, 8, st), [
                [_, x.are]
              ]),
              y(t("input", {
                type: "text",
                name: `system.desires.${v}.value`,
                "onUpdate:modelValue": ($) => x.value = $,
                list: "desires-list"
              }, null, 8, at), [
                [h, x.value]
              ])
            ], 2))), 128)),
            t("datalist", lt, [
              (l(!0), o(p, null, b(i.CONFIG.GRIMWILD.desires, (x, v) => (l(), o("option", {
                key: v,
                value: i.game.i18n.localize(x)
              }, c(i.game.i18n.localize(x)), 9, ot))), 128))
            ])
          ])
        ]),
        t("div", nt, [
          t("div", it, [
            t("span", dt, [
              t("label", null, c(i.game.i18n.localize("GRIMWILD.Actor.Character.FIELDS.level.label")), 1),
              t("span", null, c(e.context.system.level), 1)
            ]),
            t("span", rt, [
              t("label", null, c(i.game.i18n.localize("GRIMWILD.Actor.Character.FIELDS.xp.short")), 1),
              t("span", null, c(e.context.system.xp.value), 1)
            ])
          ]),
          (l(!0), o(p, null, b(f(a), (x, v) => (l(), o("div", { key: v }, [
            (l(!0), o(p, null, b(x, ($, C) => (l(), o("input", {
              key: C,
              type: "checkbox",
              "data-level": v + 1,
              "data-xp": $,
              "data-action": "changeXp",
              checked: n($),
              class: k(`xp-checkbox ${d($)}`)
            }, null, 10, ct))), 128))
          ]))), 128))
        ])
      ])
    ]));
  }
}, mt = { class: "sheet-header stroke stroke-bottom flexrow" }, yt = { class: "header-fields flexcol" }, ft = { class: "stats grid grid-2col" }, pt = { class: "stats-group form-group" }, xt = ["data-stat"], bt = { class: "flexrow" }, gt = ["name", "onUpdate:modelValue", "data-tooltip"], ht = ["name", "onUpdate:modelValue", "min", "max"], $t = { class: "stats-harm harm-group form-group" }, vt = { class: "harm harm-bloodied" }, kt = { class: "harm harm-rattled" }, _t = { class: "harm harm-dropped" }, Vt = { class: "metacurrency-fields flexcol" }, Ut = { class: "spark form-group stacked" }, wt = { class: "form-inputs" }, Tt = { class: "story form-group stacked" }, Dt = { class: "form-inputs" }, It = {
  __name: "CharHeader",
  props: ["context"],
  setup(e) {
    const r = L("rawDocument");
    return (s, a) => {
      var n, d, i, u, x, v;
      return l(), o("header", mt, [
        t("div", yt, [
          t("div", ft, [
            (l(), o(p, null, b([["bra", "agi"], ["wit", "pre"]], ($, C) => t("div", {
              key: C,
              class: k(`${C === 0 ? "stats-physical" : "stats-mental"} form-group stacked`)
            }, [
              t("div", pt, [
                (l(!0), o(p, null, b($, (D, H) => (l(), o("div", {
                  key: H,
                  class: k(`stat stat-${D} form-group stacked`)
                }, [
                  t("label", null, [
                    t("button", {
                      type: "button",
                      "data-action": "roll",
                      "data-roll-type": "stat",
                      "data-stat": D
                    }, [
                      a[7] || (a[7] = t("i", { class: "fas fa-dice-d6" }, null, -1)),
                      V(" " + c(f(r).system.stats[D].label), 1)
                    ], 8, xt)
                  ]),
                  t("div", bt, [
                    y(t("input", {
                      type: "checkbox",
                      name: `system.stats.${D}.marked`,
                      "onUpdate:modelValue": (N) => e.context.system.stats[D].marked = N,
                      class: "marked",
                      "data-tooltip": s.game.i18n.localize("GRIMWILD.Damage.marked")
                    }, null, 8, gt), [
                      [_, e.context.system.stats[D].marked]
                    ]),
                    y(t("input", {
                      type: "number",
                      name: `system.stats.${D}.value`,
                      "onUpdate:modelValue": (N) => e.context.system.stats[D].value = N,
                      min: e.context.systemFields.stats.fields[D].fields.value.min,
                      max: e.context.systemFields.stats.fields[D].fields.value.max
                    }, null, 8, ht), [
                      [h, e.context.system.stats[D].value]
                    ])
                  ])
                ], 2))), 128))
              ])
            ], 2)), 64))
          ]),
          t("div", $t, [
            t("div", vt, [
              t("label", null, [
                y(t("input", {
                  type: "checkbox",
                  name: "system.bloodied.marked",
                  "onUpdate:modelValue": a[0] || (a[0] = ($) => e.context.system.bloodied.marked = $)
                }, null, 512), [
                  [_, e.context.system.bloodied.marked]
                ]),
                V(" " + c(s.game.i18n.localize("GRIMWILD.Damage.bloodied")), 1)
              ]),
              (n = e.context) != null && n.enableHarm ? (l(), T(f(I), {
                key: 0,
                "button-action": "rollPool",
                field: "bloodied",
                "field-name": "system.bloodied.pool.diceNum",
                pool: e.context.system.bloodied.pool,
                min: "0",
                max: (d = e.context) == null ? void 0 : d.maxBloodied,
                suffix: (i = e.context) != null && i.maxBloodied ? `/ ${e.context.maxBloodied}` : "d"
              }, null, 8, ["pool", "max", "suffix"])) : m("", !0)
            ]),
            t("div", kt, [
              t("label", null, [
                y(t("input", {
                  type: "checkbox",
                  name: "system.rattled.marked",
                  "onUpdate:modelValue": a[1] || (a[1] = ($) => e.context.system.rattled.marked = $)
                }, null, 512), [
                  [_, e.context.system.rattled.marked]
                ]),
                V(" " + c(s.game.i18n.localize("GRIMWILD.Damage.rattled")), 1)
              ]),
              (u = e.context) != null && u.enableHarm ? (l(), T(f(I), {
                key: 0,
                "button-action": "rollPool",
                field: "rattled",
                "field-name": "system.rattled.pool.diceNum",
                pool: e.context.system.rattled.pool,
                min: "0",
                max: (x = e.context) == null ? void 0 : x.maxRattled,
                suffix: (v = e.context) != null && v.maxRattled ? `/ ${e.context.maxRattled}` : "d"
              }, null, 8, ["pool", "max", "suffix"])) : m("", !0)
            ]),
            t("div", _t, [
              t("label", null, [
                y(t("input", {
                  type: "checkbox",
                  name: "system.dropped",
                  "onUpdate:modelValue": a[2] || (a[2] = ($) => e.context.system.dropped = $)
                }, null, 512), [
                  [_, e.context.system.dropped]
                ]),
                V(" " + c(s.game.i18n.localize("GRIMWILD.Damage.dropped")), 1)
              ])
            ])
          ])
        ]),
        t("div", Vt, [
          t("div", Ut, [
            t("label", null, [
              a[8] || (a[8] = t("i", { class: "fas fa-bolt" }, null, -1)),
              V(" " + c(e.context.systemFields.spark.label), 1)
            ]),
            t("div", wt, [
              y(t("input", {
                type: "checkbox",
                name: "system.spark.steps.0",
                "onUpdate:modelValue": a[3] || (a[3] = ($) => e.context.system.spark.steps[0] = $)
              }, null, 512), [
                [_, e.context.system.spark.steps[0]]
              ]),
              y(t("input", {
                type: "checkbox",
                name: "system.spark.steps.1",
                "onUpdate:modelValue": a[4] || (a[4] = ($) => e.context.system.spark.steps[1] = $)
              }, null, 512), [
                [_, e.context.system.spark.steps[1]]
              ])
            ])
          ]),
          t("div", Tt, [
            t("label", null, [
              a[9] || (a[9] = t("i", { class: "fas fa-book" }, null, -1)),
              V(" " + c(e.context.systemFields.story.label), 1)
            ]),
            t("div", Dt, [
              y(t("input", {
                type: "checkbox",
                name: "system.story.steps.0",
                "onUpdate:modelValue": a[5] || (a[5] = ($) => e.context.system.story.steps[0] = $)
              }, null, 512), [
                [_, e.context.system.story.steps[0]]
              ]),
              y(t("input", {
                type: "checkbox",
                name: "system.story.steps.1",
                "onUpdate:modelValue": a[6] || (a[6] = ($) => e.context.system.story.steps[1] = $)
              }, null, 512), [
                [_, e.context.system.story.steps[1]]
              ])
            ])
          ])
        ])
      ]);
    };
  }
}, Mt = { class: "grid grid-2col" }, At = { class: "backgrounds grid-span-1 grid-row-span-2 grid-start-1" }, Lt = { class: "background-name form-group stacked" }, Ct = ["name", "onUpdate:modelValue", "placeholder"], Et = { class: "wises form-group stacked" }, Nt = { class: "form-group stacked" }, Ft = ["name", "onUpdate:modelValue"], St = ["name", "onUpdate:modelValue"], Pt = ["name", "onUpdate:modelValue"], Ht = { class: "conditions-fieldset grid-span-1 grid-start-2" }, zt = { class: "conditions form-group stacked" }, Rt = { class: "condition-duration" }, Gt = ["name", "onUpdate:modelValue"], Wt = ["value"], Ot = ["name", "onUpdate:modelValue"], jt = ["data-key"], Bt = { class: "bonds-fieldset grid-span-1 grid-start-2 grid-row-start-2" }, Xt = { class: "bonds form-group stacked" }, qt = ["name", "onUpdate:modelValue"], Jt = ["name", "onUpdate:modelValue"], Qt = ["data-key"], Yt = {
  __name: "CharDetails",
  props: ["actor", "context"],
  setup(e) {
    return (r, s) => (l(), o("div", Mt, [
      t("fieldset", At, [
        t("legend", null, c(e.context.systemFields.backgrounds.label), 1),
        (l(!0), o(p, null, b(e.context.system.backgrounds, (a, n) => (l(), o("div", {
          class: k(`background flexcol ${n === 0 ? "stroke stroke-bottom" : ""}`),
          key: n
        }, [
          t("div", Lt, [
            t("label", null, c(r.game.i18n.localize("Name")), 1),
            y(t("input", {
              type: "text",
              name: `system.backgrounds.${n}.name`,
              "onUpdate:modelValue": (d) => a.name = d,
              placeholder: r.game.i18n.localize("GRIMWILD.Actor.Character.FIELDS.backgrounds.placeholder")
            }, null, 8, Ct), [
              [h, a.name]
            ])
          ]),
          t("div", Et, [
            t("label", null, c(r.game.i18n.localize("GRIMWILD.Actor.Character.FIELDS.backgrounds.FIELDS.wises.label")), 1),
            t("div", Nt, [
              y(t("input", {
                type: "text",
                name: `system.backgrounds.${n}.wises.0`,
                "onUpdate:modelValue": (d) => a.wises[0] = d
              }, null, 8, Ft), [
                [h, a.wises[0]]
              ]),
              y(t("input", {
                type: "text",
                name: `system.backgrounds.${n}.wises.1`,
                "onUpdate:modelValue": (d) => a.wises[1] = d
              }, null, 8, St), [
                [h, a.wises[1]]
              ]),
              y(t("input", {
                type: "text",
                name: `system.backgrounds.${n}.wises.2`,
                "onUpdate:modelValue": (d) => a.wises[2] = d
              }, null, 8, Pt), [
                [h, a.wises[2]]
              ])
            ])
          ])
        ], 2))), 128))
      ]),
      t("fieldset", Ht, [
        t("legend", null, c(e.context.systemFields.conditions.label), 1),
        s[1] || (s[1] = t("button", {
          class: "condition-control condition-create",
          title: gwLocalize("GRIMWILD.UI.addCondition"),
          "data-action": "createArrayEntry",
          "data-field": "conditions"
        }, [
          t("i", { class: "fas fa-plus" })
        ], -1)),
        t("div", zt, [
          (l(!0), o(p, null, b(e.context.system.conditions, (a, n) => (l(), o("div", {
            class: "condition form-group stacked",
            key: n
          }, [
            t("div", Rt, [
              a.severity !== "permanent" ? (l(), T(f(I), {
                key: 0,
                "button-action": "rollPool",
                field: "conditions",
                "field-key": n,
                "field-name": `system.conditions.${n}.pool.diceNum`,
                pool: a.pool,
                min: "0"
              }, null, 8, ["field-key", "field-name", "pool"])) : m("", !0),
              y(t("select", {
                name: `system.conditions.${n}.severity`,
                "onUpdate:modelValue": (d) => a.severity = d
              }, [
                (l(!0), o(p, null, b(e.context.systemFields.conditions.element.fields.severity.choices, (d, i) => (l(), o("option", {
                  key: i,
                  value: i
                }, c(gwLocalize(d)), 9, Wt))), 128))
              ], 8, Gt), [
                [A, a.severity]
              ])
            ]),
            y(t("input", {
              type: "text",
              name: `system.conditions.${n}.name`,
              "onUpdate:modelValue": (d) => a.name = d,
              placeholder: gwLocalize("GRIMWILD.UI.conditionName")
            }, null, 8, Ot), [
              [h, a.name]
            ]),
            t("a", {
              class: "condition-control condition-delete",
              title: gwLocalize("GRIMWILD.UI.deleteCondition"),
              "data-action": "deleteArrayEntry",
              "data-field": "conditions",
              "data-key": n
            }, s[0] || (s[0] = [
              t("i", { class: "fas fa-trash" }, null, -1)
            ]), 8, jt)
          ]))), 128))
        ])
      ]),
      t("fieldset", Bt, [
        t("legend", null, c(e.context.systemFields.bonds.label), 1),
        s[3] || (s[3] = t("button", {
          class: "bond-control bond-create",
          title: gwLocalize("GRIMWILD.UI.addBond"),
          "data-action": "createArrayEntry",
          "data-field": "bonds"
        }, [
          t("i", { class: "fas fa-plus" })
        ], -1)),
        t("div", Xt, [
          (l(!0), o(p, null, b(e.context.system.bonds, (a, n) => (l(), o("div", {
            class: "bond form-group stacked",
            key: n
          }, [
            y(t("input", {
              type: "text",
              name: `system.bonds.${n}.name`,
              "onUpdate:modelValue": (d) => a.name = d,
              placeholder: gwLocalize("GRIMWILD.UI.bondCharacter")
            }, null, 8, qt), [
              [h, a.name]
            ]),
            y(t("input", {
              type: "text",
              name: `system.bonds.${n}.description`,
              "onUpdate:modelValue": (d) => a.description = d,
              placeholder: gwLocalize("GRIMWILD.UI.bondDescription")
            }, null, 8, Jt), [
              [h, a.description]
            ]),
            t("a", {
              class: "bond-control bond-delete",
              title: gwLocalize("GRIMWILD.UI.deleteBond"),
              "data-action": "deleteArrayEntry",
              "data-field": "bonds",
              "data-key": n
            }, s[2] || (s[2] = [
              t("i", { class: "fas fa-trash" }, null, -1)
            ]), 8, Qt)
          ]))), 128))
        ])
      ])
    ]));
  }
}, Zt = { class: "grid grid-3col" }, Kt = { class: "items-list grid-span-3" }, te = { class: "flexrow items-header stroke stroke-bottom" }, ee = { class: "item-controls" }, se = {
  key: 0,
  class: "item-control item-create",
  title: gwLocalize("GRIMWILD.UI.createItem"),
  "data-action": "createDoc",
  "data-document-class": "Item",
  "data-type": "talent",
  type: "button"
}, ae = ["data-item-id"], le = { class: "item-summary flexrow" }, oe = { class: "item-name" }, ne = { class: "item-image" }, ie = {
  class: "rollable",
  "data-roll-type": "item",
  "data-action": "roll"
}, de = ["src", "title"], re = ["data-item-id"], ce = { class: "item-trackers flexrow" }, ue = ["data-item-id", "data-key"], me = { key: 0 }, ye = { key: 0 }, fe = { class: "tracker-value" }, pe = {
  key: 0,
  class: "tracker-value-pool"
}, xe = ["data-item-id", "data-tracker-key", "value", "max"], be = {
  key: 0,
  class: "tracker-steps flexrow"
}, ge = ["data-item-id", "data-tracker-key", "data-tracker-step-key", "data-value", "data-tracker-value", "checked"], he = {
  key: 1,
  class: "tracker-value-numeric"
}, $e = ["data-item-id", "data-tracker-key", "value", "max"], ve = { class: "item-controls" }, ke = ["title"], _e = ["title"], Ve = {
  key: 0,
  class: "item-description-wrapper"
}, Ue = { class: "item-description flexcol" }, we = ["innerHTML"], Te = {
  key: 0,
  class: "item-notes"
}, De = { key: 0 }, Ie = ["innerHTML"], Me = {
  __name: "CharTalents",
  props: ["actor", "context"],
  setup(e) {
    return (r, s) => (l(), o("section", Zt, [
      t("ol", Kt, [
        t("li", te, [
          s[2] || (s[2] = t("div", { class: "item-name" }, gwLocalize("GRIMWILD.UI.talentName"), -1)),
          t("div", ee, [
            e.context.editable ? (l(), o("button", se, s[0] || (s[0] = [
              t("i", { class: "fas fa-plus" }, null, -1),
              t("span", null, gwLocalize("GRIMWILD.UI.add"), -1)
            ]))) : m("", !0),
            s[1] || (s[1] = t("button", {
              class: "item-control item-compendium",
              type: "button",
              "data-action": "openPack",
              "data-pack": "grimwild.talents"
            }, [
              t("i", { class: "fas fa-atlas" }),
              V(gwLocalize("GRIMWILD.UI.compendium"))
            ], -1))
          ])
        ]),
        (l(!0), o(p, null, b(e.context.itemTypes.talent, (a, n) => {
          var d;
          return l(), o("li", {
            key: n,
            class: k(`item talent flexcol ${(d = e.context.activeItems) != null && d[a._id] ? "active" : ""} stroke stroke-bottom`),
            "data-item-id": a._id,
            "data-drag": "true",
            draggable: "true",
            "data-document-class": "Item"
          }, [
            t("div", le, [
              t("div", oe, [
                t("div", ne, [
                  t("a", ie, [
                    t("img", {
                      src: a.img,
                      title: a.name,
                      width: "24",
                      height: "24"
                    }, null, 8, de)
                  ])
                ]),
                t("div", {
                  "data-action": "toggleItem",
                  "data-item-id": a._id
                }, c(a.name), 9, re)
              ]),
              t("div", ce, [
                (l(!0), o(p, null, b(a.system.trackers, (i, u) => (l(), o("div", {
                  key: u,
                  class: "tracker flexrow"
                }, [
                  i.type === "pool" ? (l(), o("button", {
                    key: 0,
                    class: "tracker-roll",
                    "data-action": "rollPool",
                    "data-item-id": a.id,
                    "data-key": u
                  }, [
                    s[3] || (s[3] = t("i", { class: "fas fa-dice-d6" }, null, -1)),
                    i.label ? (l(), o("strong", me, c(i.label), 1)) : m("", !0)
                  ], 8, ue)) : (l(), o(p, { key: 1 }, [
                    i.label ? (l(), o("strong", ye, c(i.label), 1)) : m("", !0)
                  ], 64)),
                  t("div", fe, [
                    i.type === "pool" ? (l(), o("div", pe, [
                      t("input", {
                        type: "number",
                        "data-action-change": "updateItemTracker",
                        "data-item-id": a.id,
                        "data-tracker-key": u,
                        value: i.pool.diceNum,
                        min: "0",
                        max: i.pool.max > 0 ? i.pool.max : null
                      }, null, 8, xe),
                      s[4] || (s[4] = t("span", { class: "pool-suffix" }, "d", -1))
                    ])) : m("", !0),
                    i.type === "points" ? (l(), o(p, { key: 1 }, [
                      i.points.showSteps ? (l(), o("div", be, [
                        (l(!0), o(p, null, b(i.points.max, (x, v) => (l(), o("input", {
                          key: v,
                          type: "checkbox",
                          "data-action": "updateItemTracker",
                          "data-item-id": a.id,
                          "data-tracker-key": u,
                          "data-tracker-step-key": v,
                          "data-value": x,
                          "data-tracker-value": i.points.value,
                          checked: i.points.value >= x
                        }, null, 8, ge))), 128))
                      ])) : (l(), o("div", he, [
                        t("input", {
                          type: "number",
                          "data-action-change": "updateItemTracker",
                          "data-item-id": a.id,
                          "data-tracker-key": u,
                          value: i.points.value,
                          min: "0",
                          max: i.points.max
                        }, null, 8, $e),
                        V(" / " + c(i.points.max), 1)
                      ]))
                    ], 64)) : m("", !0)
                  ])
                ]))), 128))
              ]),
              t("div", ve, [
                t("a", {
                  class: "item-control item-edit",
                  title: r.game.i18n.format("DOCUMENT.Edit", { type: r.game.i18n.localize("TYPES.Item.talent") }),
                  "data-action": "viewDoc"
                }, s[5] || (s[5] = [
                  t("i", { class: "fas fa-edit" }, null, -1)
                ]), 8, ke),
                e.context.editable ? (l(), o("a", {
                  key: 0,
                  class: "item-control item-delete",
                  title: r.game.i18n.format("DOCUMENT.Delete", { type: r.game.i18n.localize("TYPES.Item.talent") }),
                  "data-action": "deleteDoc"
                }, s[6] || (s[6] = [
                  t("i", { class: "fas fa-trash" }, null, -1)
                ]), 8, _e)) : m("", !0)
              ])
            ]),
            a.system.description ? (l(), o("div", Ve, [
              t("div", Ue, [
                t("div", {
                  class: "item-description",
                  innerHTML: e.context.editors[`items.${a.id}.system.description`].enriched
                }, null, 8, we),
                a.system.notes.description ? (l(), o("div", Te, [
                  a.system.notes.label ? (l(), o("strong", De, c(a.system.notes.label), 1)) : m("", !0),
                  t("div", {
                    class: "item-notes-description",
                    innerHTML: e.context.editors[`items.${a.id}.system.notes.description`].enriched
                  }, null, 8, Ie)
                ])) : m("", !0)
              ])
            ])) : m("", !0)
          ], 10, ae);
        }), 128))
      ])
    ]));
  }
}, Ae = { class: "grid grid-3col" }, Le = { class: "items-list grid-span-3" }, Ce = { class: "flexrow items-header stroke stroke-bottom" }, Ee = { class: "item-controls" }, Ne = {
  key: 0,
  class: "item-control item-create",
  title: gwLocalize("GRIMWILD.UI.createItem"),
  "data-action": "createDoc",
  "data-document-class": "Item",
  "data-type": "arcana",
  type: "button"
}, Fe = ["data-item-id"], Se = { class: "item-summary flexrow" }, Pe = { class: "item-name" }, He = { class: "item-image" }, ze = {
  class: "rollable",
  "data-roll-type": "item",
  "data-action": "roll"
}, Re = ["src", "title"], Ge = ["data-item-id"], We = { class: "item-trackers flexrow" }, Oe = ["data-item-id", "data-key"], je = { key: 0 }, Be = { key: 0 }, Xe = { class: "tracker-value" }, qe = {
  key: 0,
  class: "tracker-value-pool"
}, Je = ["data-item-id", "data-tracker-key", "value", "max"], Qe = {
  key: 0,
  class: "tracker-steps flexrow"
}, Ye = ["data-item-id", "data-tracker-key", "data-tracker-step-key", "data-value", "data-tracker-value", "checked"], Ze = {
  key: 1,
  class: "tracker-value-numeric"
}, Ke = ["data-item-id", "data-tracker-key", "value", "max"], ts = { class: "item-controls" }, es = ["title"], ss = ["title"], as = {
  key: 0,
  class: "item-description-wrapper"
}, ls = { class: "item-description flexcol" }, os = {
  key: 0,
  class: "item-touchstones"
}, ns = {
  key: 1,
  class: "item-limitations"
}, is = ["innerHTML"], ds = ["innerHTML"], rs = {
  key: 2,
  class: "item-notes"
}, cs = { key: 0 }, us = ["innerHTML"], ms = {
  __name: "CharArcana",
  props: ["actor", "context"],
  setup(e) {
    function r(s) {
      switch (s) {
        case "minor":
          return gwLocalize("GRIMWILD.UI.minorArcana");
        case "major":
          return gwLocalize("GRIMWILD.UI.majorArcana");
        case "mythic":
          return gwLocalize("GRIMWILD.UI.mythicArcana");
        default:
          return gwLocalize("GRIMWILD.UI.minorArcana");
      }
    }
    return (s, a) => (l(), o("section", Ae, [
      t("ol", Le, [
        t("li", Ce, [
          a[2] || (a[2] = t("div", { class: "item-name" }, gwLocalize("GRIMWILD.UI.arcanaName"), -1)),
          t("div", Ee, [
            e.context.editable ? (l(), o("button", Ne, a[0] || (a[0] = [
              t("i", { class: "fas fa-plus" }, null, -1),
              t("span", null, gwLocalize("GRIMWILD.UI.add"), -1)
            ]))) : m("", !0),
            a[1] || (a[1] = t("button", {
              class: "item-control item-compendium",
              type: "button",
              "data-action": "openPack",
              "data-pack": "grimwild.arcana"
            }, [
              t("i", { class: "fas fa-atlas" }),
              V(gwLocalize("GRIMWILD.UI.compendium"))
            ], -1))
          ])
        ]),
        (l(!0), o(p, null, b(e.context.itemTypes.arcana, (n, d) => {
          var i;
          return l(), o("li", {
            key: d,
            class: k(`item talent arcana flexcol ${(i = e.context.activeItems) != null && i[n._id] ? "active" : ""} stroke stroke-bottom`),
            "data-item-id": n._id,
            "data-drag": "true",
            draggable: "true",
            "data-document-class": "Item"
          }, [
            t("div", Se, [
              t("div", Pe, [
                t("div", He, [
                  t("a", ze, [
                    t("img", {
                      src: n.img,
                      title: n.name,
                      width: "24",
                      height: "24"
                    }, null, 8, Re)
                  ])
                ]),
                t("div", {
                  "data-action": "toggleItem",
                  "data-item-id": n._id
                }, c(n.name), 9, Ge)
              ]),
              t("div", We, [
                (l(!0), o(p, null, b(n.system.trackers, (u, x) => (l(), o("div", {
                  key: x,
                  class: "tracker flexrow"
                }, [
                  u.type === "pool" ? (l(), o("button", {
                    key: 0,
                    class: "tracker-roll",
                    "data-action": "rollPool",
                    "data-item-id": n.id,
                    "data-key": x
                  }, [
                    a[3] || (a[3] = t("i", { class: "fas fa-dice-d6" }, null, -1)),
                    u.label ? (l(), o("strong", je, c(u.label), 1)) : m("", !0)
                  ], 8, Oe)) : (l(), o(p, { key: 1 }, [
                    u.label ? (l(), o("strong", Be, c(u.label), 1)) : m("", !0)
                  ], 64)),
                  t("div", Xe, [
                    u.type === "pool" ? (l(), o("div", qe, [
                      t("input", {
                        type: "number",
                        "data-action-change": "updateItemTracker",
                        "data-item-id": n.id,
                        "data-tracker-key": x,
                        value: u.pool.diceNum,
                        min: "0",
                        max: u.pool.max > 0 ? u.pool.max : null
                      }, null, 8, Je),
                      a[4] || (a[4] = t("span", { class: "pool-suffix" }, "d", -1))
                    ])) : m("", !0),
                    u.type === "points" ? (l(), o(p, { key: 1 }, [
                      u.points.showSteps ? (l(), o("div", Qe, [
                        (l(!0), o(p, null, b(u.points.max, (v, $) => (l(), o("input", {
                          key: $,
                          type: "checkbox",
                          "data-action": "updateItemTracker",
                          "data-item-id": n.id,
                          "data-tracker-key": x,
                          "data-tracker-step-key": $,
                          "data-value": v,
                          "data-tracker-value": u.points.value,
                          checked: u.points.value >= v
                        }, null, 8, Ye))), 128))
                      ])) : (l(), o("div", Ze, [
                        t("input", {
                          type: "number",
                          "data-action-change": "updateItemTracker",
                          "data-item-id": n.id,
                          "data-tracker-key": x,
                          value: u.points.value,
                          min: "0",
                          max: u.points.max
                        }, null, 8, Ke),
                        V(" / " + c(u.points.max), 1)
                      ]))
                    ], 64)) : m("", !0)
                  ])
                ]))), 128))
              ]),
              t("div", ts, [
                t("a", {
                  class: "item-control item-edit",
                  title: s.game.i18n.format("DOCUMENT.Edit", { type: s.game.i18n.localize("TYPES.Item.arcana") }),
                  "data-action": "viewDoc"
                }, a[5] || (a[5] = [
                  t("i", { class: "fas fa-edit" }, null, -1)
                ]), 8, es),
                e.context.editable ? (l(), o("a", {
                  key: 0,
                  class: "item-control item-delete",
                  title: s.game.i18n.format("DOCUMENT.Delete", { type: s.game.i18n.localize("TYPES.Item.arcana") }),
                  "data-action": "deleteDoc"
                }, a[6] || (a[6] = [
                  t("i", { class: "fas fa-trash" }, null, -1)
                ]), 8, ss)) : m("", !0)
              ])
            ]),
            n.system.description ? (l(), o("div", as, [
              t("div", ls, [
                t("em", null, c(r(n.system.tier)), 1),
                n.system.touchstones ? (l(), o("div", os, [
                  a[7] || (a[7] = t("strong", null, gwLocalize("GRIMWILD.UI.touchstones"), -1)),
                  a[8] || (a[8] = V()),
                  t("em", null, c(n.system.touchstones), 1)
                ])) : m("", !0),
                n.system.limitations ? (l(), o("div", ns, [
                  a[9] || (a[9] = t("strong", null, gwLocalize("GRIMWILD.UI.limitations"), -1)),
                  t("div", {
                    class: "item-limitations-description",
                    innerHTML: e.context.editors[`items.${n.id}.system.limitations`].enriched
                  }, null, 8, is)
                ])) : m("", !0),
                a[10] || (a[10] = t("hr", null, null, -1)),
                t("div", {
                  class: "item-description",
                  innerHTML: e.context.editors[`items.${n.id}.system.description`].enriched
                }, null, 8, ds),
                n.system.notes.description ? (l(), o("div", rs, [
                  n.system.notes.label ? (l(), o("strong", cs, c(n.system.notes.label), 1)) : m("", !0),
                  t("div", {
                    class: "item-notes-description",
                    innerHTML: e.context.editors[`items.${n.id}.system.notes.description`].enriched
                  }, null, 8, us)
                ])) : m("", !0)
              ])
            ])) : m("", !0)
          ], 10, Fe);
        }), 128))
      ])
    ]));
  }
}, ys = { class: "sheet-header" }, fs = { class: "header-fields grid grid-4col" }, ps = { class: "grimwild-avatar" }, xs = ["src", "title"], bs = { class: "form-group stacked grid-span-3" }, gs = { class: "form-group" }, hs = {
  key: 0,
  class: "challenge-pool form-group stacked"
}, $s = {
  key: 0,
  class: "form-group"
}, vs = { class: "form-group stacked monster-role" }, ks = ["value"], _s = { class: "form-group stacked monster-tier" }, Vs = ["value"], Us = {
  __name: "MonsterHeader",
  props: ["context"],
  setup(e) {
    L("rawDocument");
    const r = {
      mook: gwLocalize("GRIMWILD.Actor.Monster.Tiers.mook"),
      tough: gwLocalize("GRIMWILD.Actor.Monster.Tiers.tough"),
      elite: gwLocalize("GRIMWILD.Actor.Monster.Tiers.elite"),
      boss: gwLocalize("GRIMWILD.Actor.Monster.Tiers.boss")
    }, s = {
      blaster: gwLocalize("GRIMWILD.Actor.Monster.Roles.blaster"),
      brute: gwLocalize("GRIMWILD.Actor.Monster.Roles.brute"),
      lurker: gwLocalize("GRIMWILD.Actor.Monster.Roles.lurker"),
      marauder: gwLocalize("GRIMWILD.Actor.Monster.Roles.marauder"),
      marksman: gwLocalize("GRIMWILD.Actor.Monster.Roles.marksman"),
      overseer: gwLocalize("GRIMWILD.Actor.Monster.Roles.overseer"),
      predator: gwLocalize("GRIMWILD.Actor.Monster.Roles.predator"),
      protector: gwLocalize("GRIMWILD.Actor.Monster.Roles.protector"),
      skirmisher: gwLocalize("GRIMWILD.Actor.Monster.Roles.skirmisher"),
      swarmer: gwLocalize("GRIMWILD.Actor.Monster.Roles.swarmer"),
      tactician: gwLocalize("GRIMWILD.Actor.Monster.Roles.tactician"),
      trickster: gwLocalize("GRIMWILD.Actor.Monster.Roles.trickster")
    };
    return (a, n) => (l(), o("header", ys, [
      t("section", fs, [
        t("div", ps, [
          t("img", {
            class: "profile-img",
            src: e.context.actor.img,
            "data-edit": "img",
            "data-action": "onEditImage",
            title: e.context.actor.name,
            height: "100",
            width: "100"
          }, null, 8, xs)
        ]),
        t("div", bs, [
          t("div", gs, [
            t("div", {
              class: k(`name form-group stacked ${e.context.actor.type === "monster" ? "grid-span-2" : "grid-span-3"}`)
            }, [
              t("label", null, c(a.game.i18n.localize("Name")), 1),
              y(t("input", {
                type: "text",
                name: "name",
                "onUpdate:modelValue": n[0] || (n[0] = (d) => e.context.actor.name = d)
              }, null, 512), [
                [h, e.context.actor.name]
              ])
            ], 2),
            e.context.actor.type === "linkedChallenge" || e.context.actor.type === "monster" && ["boss", "elite"].includes(e.context.system.tier) ? (l(), o("div", hs, [
              n[3] || (n[3] = t("label", null, gwLocalize("GRIMWILD.UI.challengePool"), -1)),
              g(f(I), {
                "button-action": "rollPool",
                field: "pool",
                pool: e.context.system.pool,
                min: "0"
              }, null, 8, ["pool"])
            ])) : m("", !0)
          ]),
          e.context.actor.type === "monster" ? (l(), o("div", $s, [
            t("div", vs, [
              n[5] || (n[5] = t("label", null, gwLocalize("GRIMWILD.Actor.Monster.FIELDS.role.label"), -1)),
              y(t("select", {
                name: "system.role",
                "onUpdate:modelValue": n[1] || (n[1] = (d) => e.context.system.role = d)
              }, [
                n[4] || (n[4] = t("option", { value: "" }, "—", -1)),
                (l(), o(p, null, b(s, (d, i) => t("option", {
                  key: i,
                  value: i
                }, c(d), 9, ks)), 64))
              ], 512), [
                [A, e.context.system.role]
              ])
            ]),
            t("div", _s, [
              n[6] || (n[6] = t("label", null, gwLocalize("GRIMWILD.Item.Arcana.FIELDS.tier.label"), -1)),
              y(t("select", {
                name: "system.tier",
                "onUpdate:modelValue": n[2] || (n[2] = (d) => e.context.system.tier = d)
              }, [
                (l(), o(p, null, b(r, (d, i) => t("option", {
                  key: i,
                  value: i
                }, c(d), 9, Vs)), 64))
              ], 512), [
                [A, e.context.system.tier]
              ])
            ])
          ])) : m("", !0)
        ])
      ])
    ]));
  }
}, ws = { class: "items challenges flexcol" }, Ts = { class: "flexrow items-header" }, Ds = { class: "item-controls" }, Is = {
  key: 0,
  class: "item-control item-create",
  title: gwLocalize("GRIMWILD.UI.createItem"),
  "data-action": "createDoc",
  "data-document-class": "Item",
  "data-type": "challenge",
  type: "button"
}, Ms = { class: "items-list grid-span-3" }, As = ["data-item-id"], Ls = { class: "item-summary flexcol" }, Cs = { class: "item-name flexrow" }, Es = { class: "challenge-pool" }, Ns = { class: "challenge-name" }, Fs = { class: "suspense-controls flexrow" }, Ss = { class: "suspense form-group stacked" }, Ps = { class: "form-inputs" }, Hs = ["data-item-id", "onUpdate:modelValue"], zs = ["data-item-id", "onUpdate:modelValue"], Rs = { class: "item-controls" }, Gs = ["title"], Ws = ["title"], Os = { class: "challenge-fields-wrapper" }, js = { class: "item-description flexcol" }, Bs = ["innerHTML"], Xs = {
  key: 1,
  class: "item-traits"
}, qs = { class: "item-moves" }, Js = { class: "item-failure" }, Qs = {
  __name: "MonsterChallenges",
  props: ["actor", "context"],
  setup(e) {
    return (r, s) => (l(), o("section", ws, [
      t("div", Ts, [
        s[1] || (s[1] = t("div", { class: "item-name" }, gwLocalize("GRIMWILD.Actor.Tabs.Challenges"), -1)),
        t("div", Ds, [
          e.context.editable ? (l(), o("button", Is, s[0] || (s[0] = [
            t("i", { class: "fas fa-plus" }, null, -1),
            t("span", null, gwLocalize("GRIMWILD.UI.add"), -1)
          ]))) : m("", !0)
        ])
      ]),
      t("ol", Ms, [
        (l(!0), o(p, null, b(e.context.itemTypes.challenge, (a, n) => {
          var d;
          return l(), o("li", {
            key: n,
            class: k(`item challenge flexcol ${(d = e.context.activeItems) != null && d[a._id] ? "active" : ""}`),
            "data-item-id": a._id,
            "data-drag": "true",
            draggable: "true",
            "data-document-class": "Item"
          }, [
            t("div", Ls, [
              t("div", Cs, [
                t("div", Es, [
                  g(f(I), {
                    "button-action": "roll",
                    "button-roll-type": "item",
                    "input-action": "updateChallengePool",
                    "item-id": a.id,
                    pool: a.system.pool,
                    "no-input": !0,
                    min: "0"
                  }, null, 8, ["item-id", "pool"])
                ]),
                t("div", Ns, c(a.name), 1)
              ]),
              t("div", Fs, [
                t("div", Ss, [
                  t("div", Ps, [
                    y(t("input", {
                      type: "checkbox",
                      "data-action-change": "updateItemField",
                      "data-field": "system.suspense.steps",
                      "data-key": "0",
                      "data-item-id": a.id,
                      "onUpdate:modelValue": (i) => a.system.suspense.steps[0] = i
                    }, null, 8, Hs), [
                      [_, a.system.suspense.steps[0]]
                    ]),
                    y(t("input", {
                      type: "checkbox",
                      "data-action-change": "updateItemField",
                      "data-field": "system.suspense.steps",
                      "data-key": "1",
                      "data-item-id": a.id,
                      "onUpdate:modelValue": (i) => a.system.suspense.steps[1] = i
                    }, null, 8, zs), [
                      [_, a.system.suspense.steps[1]]
                    ])
                  ])
                ]),
                t("div", Rs, [
                  t("a", {
                    class: "item-control item-edit",
                    title: r.game.i18n.format("DOCUMENT.Edit", { type: r.game.i18n.localize("TYPES.Item.talent") }),
                    "data-action": "viewDoc"
                  }, s[2] || (s[2] = [
                    t("i", { class: "fas fa-edit" }, null, -1)
                  ]), 8, Gs),
                  e.context.editable ? (l(), o("a", {
                    key: 0,
                    class: "item-control item-delete",
                    title: r.game.i18n.format("DOCUMENT.Delete", { type: r.game.i18n.localize("TYPES.Item.talent") }),
                    "data-action": "deleteDoc"
                  }, s[3] || (s[3] = [
                    t("i", { class: "fas fa-trash" }, null, -1)
                  ]), 8, Ws)) : m("", !0)
                ])
              ])
            ]),
            t("div", Os, [
              t("div", js, [
                a.system.description.length ? (l(), o("div", {
                  key: 0,
                  class: "item-description-content",
                  innerHTML: e.context.editors[`items.${a.id}.system.description`].enriched
                }, null, 8, Bs)) : m("", !0),
                a.system.traits.length > 0 ? (l(), o("ul", Xs, [
                  (l(!0), o(p, null, b(a.system.traits, (i, u) => (l(), o("li", {
                    key: u,
                    class: "item-trait"
                  }, c(i), 1))), 128))
                ])) : m("", !0),
                a.system.moves.length > 0 ? (l(), o(p, { key: 2 }, [
                  s[4] || (s[4] = t("hr", null, null, -1)),
                  t("ul", qs, [
                    (l(!0), o(p, null, b(a.system.moves, (i, u) => (l(), o("li", {
                      key: u,
                      class: "item-move"
                    }, c(i), 1))), 128))
                  ])
                ], 64)) : m("", !0),
                a.system.failure.length > 0 ? (l(), o(p, { key: 3 }, [
                  s[5] || (s[5] = t("hr", null, null, -1)),
                  t("ul", Js, [
                    (l(!0), o(p, null, b(a.system.failure, (i, u) => (l(), o("li", {
                      key: u,
                      class: "item-fail form-group"
                    }, [
                      i.pool.diceNum > 0 ? (l(), T(f(I), {
                        key: 0,
                        "button-action": "rollPool",
                        "button-roll-type": "item",
                        field: "failure",
                        "field-key": u,
                        "no-input": !0,
                        "item-id": a.id,
                        pool: i.pool,
                        min: "0"
                      }, null, 8, ["field-key", "item-id", "pool"])) : m("", !0),
                      t("span", null, c(i.value), 1)
                    ]))), 128))
                  ])
                ], 64)) : m("", !0)
              ])
            ])
          ], 10, As);
        }), 128))
      ])
    ]));
  }
}, Ys = { class: "fieldset-prose-mirror" }, Zs = { class: "form-group stacked" }, Ks = { class: "form-group" }, ta = { class: "form-group" }, ea = { class: "form-group" }, sa = { class: "form-group stacked" }, aa = { class: "form-group" }, la = ["name", "onUpdate:modelValue"], oa = ["innerHTML"], na = {
  __name: "MonsterBiography",
  props: ["context"],
  setup(e) {
    return (r, s) => (l(), o(p, null, [
      t("fieldset", Ys, [
        t("legend", null, c(e.context.systemFields.biography.label), 1),
        g(f(M), {
          editable: e.context.editable,
          field: e.context.editors["system.biography"]
        }, null, 8, ["editable", "field"])
      ]),
      t("fieldset", null, [
        s[6] || (s[6] = t("legend", null, gwLocalize("GRIMWILD.UI.sensories"), -1)),
        t("div", Zs, [
          t("div", Ks, [
            s[3] || (s[3] = t("label", null, gwLocalize("GRIMWILD.UI.sights"), -1)),
            y(t("input", {
              type: "text",
              name: "system.sensories.sights",
              "onUpdate:modelValue": s[0] || (s[0] = (a) => e.context.system.sensories.sights = a)
            }, null, 512), [
              [h, e.context.system.sensories.sights]
            ])
          ]),
          t("div", ta, [
            s[4] || (s[4] = t("label", null, gwLocalize("GRIMWILD.UI.sounds"), -1)),
            y(t("input", {
              type: "text",
              name: "system.sensories.sounds",
              "onUpdate:modelValue": s[1] || (s[1] = (a) => e.context.system.sensories.sounds = a)
            }, null, 512), [
              [h, e.context.system.sensories.sounds]
            ])
          ]),
          t("div", ea, [
            s[5] || (s[5] = t("label", null, gwLocalize("GRIMWILD.UI.smells"), -1)),
            y(t("input", {
              type: "text",
              name: "system.sensories.smells",
              "onUpdate:modelValue": s[2] || (s[2] = (a) => e.context.system.sensories.smells = a)
            }, null, 512), [
              [h, e.context.system.sensories.smells]
            ])
          ])
        ])
      ]),
      t("fieldset", null, [
        s[7] || (s[7] = t("legend", null, gwLocalize("GRIMWILD.UI.colors"), -1)),
        t("div", sa, [
          (l(!0), o(p, null, b(e.context.system.sensories.colors, (a, n) => (l(), o("div", {
            key: n,
            class: "form-group"
          }, [
            t("div", aa, [
              y(t("input", {
                type: "text",
                name: `system.sensories.colors.${n}.name`,
                "onUpdate:modelValue": (d) => a.name = d,
                placeholder: gwLocalize("GRIMWILD.UI.colorName")
              }, null, 8, la), [
                [h, a.name]
              ])
            ]),
            t("div", {
              class: "form-group",
              innerHTML: e.context.customElements[`system.sensories.colors.${n}.color`].outerHTML
            }, null, 8, oa)
          ]))), 128))
        ])
      ])
    ], 64));
  }
}, ia = { class: "monster-tables-wrapper form-group stacked" }, da = ["data-key"], ra = { class: "form-group" }, ca = ["name", "onUpdate:modelValue"], ua = { class: "form-group" }, ma = ["name", "onUpdate:modelValue"], ya = { class: "tables-wrapper form-group stacked" }, fa = { class: "form-group stacked" }, pa = ["data-field", "data-key"], xa = ["name", "onUpdate:modelValue"], ba = ["data-field"], ga = {
  __name: "MonsterTables",
  props: ["context"],
  setup(e) {
    return (r, s) => (l(), o("section", ia, [
      (l(), o("div", {
        class: "monster-tables form-group stacked",
        key: e.context._arrayEntryKey
      }, [
        (l(!0), o(p, null, b(e.context.system.tables, (a, n) => (l(), o("fieldset", {
          class: "add-another-entries",
          key: n
        }, [
          s[6] || (s[6] = t("legend", null, gwLocalize("GRIMWILD.UI.table"), -1)),
          t("button", {
            class: "legend-control entry-delete",
            title: gwLocalize("GRIMWILD.UI.deleteTable"),
            "data-action": "deleteArrayEntry",
            "data-field": "tables",
            "data-key": n
          }, s[0] || (s[0] = [
            t("i", { class: "fas fa-trash" }, null, -1)
          ]), 8, da),
          t("div", ra, [
            s[1] || (s[1] = t("label", null, gwLocalize("GRIMWILD.UI.tableName"), -1)),
            y(t("input", {
              type: "text",
              name: `system.tables.${n}.name`,
              placeholder: gwLocalize("GRIMWILD.UI.tableNamePlaceholder"),
              "onUpdate:modelValue": (d) => a.name = d
            }, null, 8, ca), [
              [h, a.name]
            ])
          ]),
          t("div", ua, [
            s[2] || (s[2] = t("label", null, gwLocalize("GRIMWILD.UI.tableInstructions"), -1)),
            y(t("input", {
              type: "text",
              name: `system.tables.${n}.instructions`,
              placeholder: gwLocalize("GRIMWILD.UI.tableInstructionsPlaceholder"),
              "onUpdate:modelValue": (d) => a.instructions = d
            }, null, 8, ma), [
              [h, a.instructions]
            ])
          ]),
          t("div", ya, [
            t("div", fa, [
              (l(!0), o(p, null, b(a.table, (d, i) => (l(), o("fieldset", {
                class: "tables-wrapper add-another-entries",
                key: i
              }, [
                s[4] || (s[4] = t("legend", null, gwLocalize("GRIMWILD.UI.d6"), -1)),
                t("button", {
                  class: "legend-control entry-delete",
                  title: gwLocalize("GRIMWILD.UI.deleteD6Group"),
                  "data-action": "deleteArrayEntry",
                  "data-field": `system.tables.${n}.table`,
                  "data-key": i
                }, s[3] || (s[3] = [
                  t("i", { class: "fas fa-trash" }, null, -1)
                ]), 8, pa),
                (l(!0), o(p, null, b(d, (u, x) => (l(), o("div", {
                  key: x,
                  class: "form-group"
                }, [
                  t("label", null, c(x + 1), 1),
                  y(t("input", {
                    type: "text",
                    name: `system.tables.${n}.table.${i}.${x}`,
                    "onUpdate:modelValue": (v) => e.context.system.tables[n].table[i][x] = v
                  }, null, 8, xa), [
                    [h, e.context.system.tables[n].table[i][x]]
                  ])
                ]))), 128))
              ]))), 128))
            ]),
            t("button", {
              class: "table-control entry-create",
              title: gwLocalize("GRIMWILD.UI.addTableGroup"),
              "data-action": "createArrayEntry",
              "data-field": `system.tables.${n}.table`,
              "data-field-type": "StringField",
              "data-count": "6"
            }, s[5] || (s[5] = [
              t("i", { class: "fas fa-plus" }, null, -1),
              V(gwLocalize("GRIMWILD.UI.addD6TableGroup"))
            ]), 8, ba)
          ])
        ]))), 128)),
        s[7] || (s[7] = t("button", {
          class: "monster-table-create entry-create",
          title: gwLocalize("GRIMWILD.UI.addTable"),
          "data-action": "createArrayEntry",
          "data-field": "tables"
        }, [
          t("i", { class: "fas fa-plus" }),
          V(gwLocalize("GRIMWILD.UI.addTable"))
        ], -1))
      ]))
    ]));
  }
}, ha = { class: "traits-fieldset add-another-entries" }, $a = { class: "traits entries form-group stacked" }, va = ["name", "onUpdate:modelValue"], ka = ["data-key"], _a = { class: "moves-fieldset add-another-entries" }, Va = { class: "moves entries form-group stacked" }, Ua = ["name", "onUpdate:modelValue"], wa = ["data-key"], Ta = {
  __name: "MonsterTraitsMoves",
  props: ["context"],
  setup(e) {
    return (r, s) => (l(), o(p, null, [
      t("fieldset", ha, [
        t("legend", null, c(e.context.systemFields.traits.label), 1),
        s[1] || (s[1] = t("button", {
          class: "trait-control legend-control entry-create",
          title: gwLocalize("GRIMWILD.UI.addTrait"),
          "data-action": "createArrayEntry",
          "data-field": "traits"
        }, [
          t("i", { class: "fas fa-plus" })
        ], -1)),
        t("div", $a, [
          (l(!0), o(p, null, b(e.context.system.traits, (a, n) => (l(), o("div", {
            class: "trait entry form-group stacked",
            key: n
          }, [
            y(t("input", {
              type: "text",
              name: `system.traits.${n}`,
              "onUpdate:modelValue": (d) => e.context.system.traits[n] = d,
              placeholder: gwLocalize("GRIMWILD.UI.traitDescription")
            }, null, 8, va), [
              [h, e.context.system.traits[n]]
            ]),
            t("a", {
              class: "trait-control entry-delete",
              title: gwLocalize("GRIMWILD.UI.deleteTrait"),
              "data-action": "deleteArrayEntry",
              "data-field": "traits",
              "data-key": n
            }, s[0] || (s[0] = [
              t("i", { class: "fas fa-trash" }, null, -1)
            ]), 8, ka)
          ]))), 128))
        ])
      ]),
      t("fieldset", _a, [
        t("legend", null, c(e.context.systemFields.moves.label), 1),
        s[3] || (s[3] = t("button", {
          class: "move-control legend-control entry-create",
          title: gwLocalize("GRIMWILD.UI.addMove"),
          "data-action": "createArrayEntry",
          "data-field": "moves"
        }, [
          t("i", { class: "fas fa-plus" })
        ], -1)),
        t("div", Va, [
          (l(!0), o(p, null, b(e.context.system.moves, (a, n) => (l(), o("div", {
            class: "move entry form-group stacked",
            key: n
          }, [
            y(t("input", {
              type: "text",
              name: `system.moves.${n}`,
              "onUpdate:modelValue": (d) => e.context.system.moves[n] = d,
              placeholder: gwLocalize("GRIMWILD.UI.moveDescription")
            }, null, 8, Ua), [
              [h, e.context.system.moves[n]]
            ]),
            t("a", {
              class: "move-control entry-delete",
              title: gwLocalize("GRIMWILD.UI.deleteMove"),
              "data-action": "deleteArrayEntry",
              "data-field": "moves",
              "data-key": n
            }, s[2] || (s[2] = [
              t("i", { class: "fas fa-trash" }, null, -1)
            ]), 8, wa)
          ]))), 128))
        ])
      ])
    ], 64));
  }
}, Da = { class: "form-group stacked" }, Ia = { class: "form-group" }, Ma = { class: "form-group" }, Aa = {
  __name: "MonsterDesires",
  props: ["context"],
  setup(e) {
    return (r, s) => (l(), o("fieldset", null, [
      s[4] || (s[4] = t("legend", null, gwLocalize("GRIMWILD.Actor.Character.FIELDS.desires.label"), -1)),
      t("div", Da, [
        t("div", Ia, [
          s[2] || (s[2] = t("label", null, gwLocalize("GRIMWILD.UI.wants"), -1)),
          y(t("input", {
            type: "text",
            name: "system.desires.0.value",
            "onUpdate:modelValue": s[0] || (s[0] = (a) => e.context.system.desires[0].value = a)
          }, null, 512), [
            [h, e.context.system.desires[0].value]
          ])
        ]),
        t("div", Ma, [
          s[3] || (s[3] = t("label", null, gwLocalize("GRIMWILD.UI.doesNotWant"), -1)),
          y(t("input", {
            type: "text",
            name: "system.desires.1.value",
            "onUpdate:modelValue": s[1] || (s[1] = (a) => e.context.system.desires[1].value = a)
          }, null, 512), [
            [h, e.context.system.desires[1].value]
          ])
        ])
      ])
    ]));
  }
}, La = { class: "form-group" }, Ca = { class: "field" }, Ea = {
  __name: "ItemDescription",
  props: ["item", "context"],
  setup(e) {
    return (r, s) => (l(), o("fieldset", null, [
      t("legend", null, c(e.context.systemFields.description.label), 1),
      t("div", La, [
        t("div", Ca, [
          g(f(M), {
            editable: e.context.editable,
            field: e.context.editors["system.description"]
          }, null, 8, ["editable", "field"])
        ])
      ])
    ]));
  }
}, Na = { class: "sheet-header" }, Fa = { class: "header-fields grid grid-4col" }, Sa = { class: "grimwild-avatar" }, Pa = ["src", "title"], Ha = { class: "header-sub-fields grid-span-3" }, za = { class: "name form-group stacked" }, Ra = ["placeholder"], Ga = {
  key: 0,
  class: "form-group"
}, Wa = { class: "form-group stacked" }, Oa = { class: "suspense form-group stacked" }, ja = { class: "form-inputs" }, Ba = {
  __name: "ItemHeader",
  props: ["context"],
  setup(e) {
    return L("rawDocument"), (r, s) => (l(), o("header", Na, [
      t("div", Fa, [
        t("div", Sa, [
          t("img", {
            class: "profile-img",
            src: e.context.item.img,
            "data-edit": "img",
            "data-action": "onEditImage",
            title: e.context.item.name,
            height: "100",
            width: "100"
          }, null, 8, Pa)
        ]),
        t("div", Ha, [
          t("div", za, [
            t("label", null, c(r.game.i18n.localize("Name")), 1),
            y(t("input", {
              type: "text",
              name: "name",
              "onUpdate:modelValue": s[0] || (s[0] = (a) => e.context.item.name = a),
              placeholder: r.game.i18n.localize("Name")
            }, null, 8, Ra), [
              [h, e.context.item.name]
            ])
          ]),
          e.context.item.type === "challenge" ? (l(), o("div", Ga, [
            t("div", Wa, [
              t("label", null, c(e.context.systemFields.pool.label), 1),
              g(f(I), {
                "button-action": "rollPool",
                field: "pool",
                pool: e.context.system.pool,
                min: "0"
              }, null, 8, ["pool"])
            ]),
            t("div", Oa, [
              t("label", null, c(e.context.systemFields.suspense.label), 1),
              t("div", ja, [
                y(t("input", {
                  type: "checkbox",
                  name: "system.suspense.steps.0",
                  "onUpdate:modelValue": s[1] || (s[1] = (a) => e.context.system.suspense.steps[0] = a)
                }, null, 512), [
                  [_, e.context.system.suspense.steps[0]]
                ]),
                y(t("input", {
                  type: "checkbox",
                  name: "system.suspense.steps.1",
                  "onUpdate:modelValue": s[2] || (s[2] = (a) => e.context.system.suspense.steps[1] = a)
                }, null, 512), [
                  [_, e.context.system.suspense.steps[1]]
                ])
              ])
            ])
          ])) : m("", !0)
        ])
      ])
    ]));
  }
}, Xa = {
  __name: "ItemAttributes",
  props: ["context"],
  setup(e) {
    return L("rawDocument"), (r, s) => (l(), o(p, null, [
      ["arcana", "talent"].includes(e.context.item.type) ? (l(), T(f(fl), {
        key: 0,
        context: e.context
      }, null, 8, ["context"])) : m("", !0),
      e.context.item.type === "challenge" ? (l(), T(f(Cl), {
        key: 1,
        context: e.context
      }, null, 8, ["context"])) : m("", !0)
    ], 64));
  }
}, qa = { class: "trackers" }, Ja = { class: "tracker form-group stacked" }, Qa = { class: "tracker-values form-group stacked" }, Ya = { class: "tracker-type-group form-group" }, Za = { class: "tracker-type form-group stacked" }, Ka = ["name", "onUpdate:modelValue"], tl = {
  key: 0,
  class: "tracker-power-pool form-group stacked"
}, el = ["name", "onUpdate:modelValue"], sl = { class: "tracker-options form-group" }, al = { class: "tracker-label form-group stacked" }, ll = ["name", "onUpdate:modelValue"], ol = {
  key: 0,
  class: "tracker-value form-group stacked"
}, nl = ["name", "onUpdate:modelValue", "max"], il = {
  key: 1,
  class: "tracker-value form-group stacked"
}, dl = ["name", "max", "onUpdate:modelValue"], rl = { class: "tracker-value tracker-max form-group stacked" }, cl = ["name", "onUpdate:modelValue"], ul = {
  key: 2,
  class: "tracker-steps form-group stacked"
}, ml = ["name", "onUpdate:modelValue"], yl = ["data-key"], fl = {
  __name: "TalentTrackers",
  props: ["context"],
  setup(e) {
    return L("rawDocument"), (r, s) => (l(), o("fieldset", qa, [
      t("legend", null, c(e.context.systemFields.trackers.label), 1),
      t("div", Ja, [
        t("div", Qa, [
          (l(!0), o(p, null, b(e.context.system.trackers, (a, n) => (l(), o("div", {
            key: n,
            class: "form-group stacked trackers-group"
          }, [
            t("div", Ya, [
              t("div", Za, [
                s[1] || (s[1] = t("label", null, gwLocalize("GRIMWILD.UI.type"), -1)),
                y(t("select", {
                  name: `system.trackers.${n}.type`,
                  "onUpdate:modelValue": (d) => a.type = d
                }, s[0] || (s[0] = [
                  t("option", { value: "pool" }, gwLocalize("GRIMWILD.Resources.pools"), -1),
                  t("option", { value: "points" }, gwLocalize("GRIMWILD.Resources.points"), -1)
                ]), 8, Ka), [
                  [A, a.type]
                ])
              ]),
              a.type === "pool" ? (l(), o("div", tl, [
                s[2] || (s[2] = t("label", null, gwLocalize("GRIMWILD.UI.powerPool"), -1)),
                y(t("input", {
                  type: "checkbox",
                  name: `system.trackers.${n}.pool.powerPool`,
                  "onUpdate:modelValue": (d) => a.pool.powerPool = d
                }, null, 8, el), [
                  [_, a.pool.powerPool]
                ])
              ])) : m("", !0)
            ]),
            t("div", sl, [
              t("div", al, [
                s[3] || (s[3] = t("label", null, gwLocalize("GRIMWILD.UI.label"), -1)),
                y(t("input", {
                  type: "text",
                  name: `system.trackers.${n}.label`,
                  "onUpdate:modelValue": (d) => a.label = d
                }, null, 8, ll), [
                  [h, a.label]
                ])
              ]),
              a.type === "pool" ? (l(), o("div", ol, [
                s[4] || (s[4] = t("label", null, gwLocalize("GRIMWILD.UI.value"), -1)),
                y(t("input", {
                  type: "number",
                  name: `system.trackers.${n}.pool.diceNum`,
                  "onUpdate:modelValue": (d) => a.pool.diceNum = d,
                  min: "0",
                  max: a.pool.max > 0 ? a.pool.max : null
                }, null, 8, nl), [
                  [h, a.pool.diceNum]
                ])
              ])) : m("", !0),
              a.type === "points" ? (l(), o("div", il, [
                s[5] || (s[5] = t("label", null, gwLocalize("GRIMWILD.UI.value"), -1)),
                y(t("input", {
                  type: "number",
                  name: `system.trackers.${n}.points.value`,
                  min: "0",
                  max: a.points.max,
                  "onUpdate:modelValue": (d) => a.points.value = d
                }, null, 8, dl), [
                  [h, a.points.value]
                ])
              ])) : m("", !0),
              t("div", rl, [
                s[6] || (s[6] = t("label", null, gwLocalize("GRIMWILD.UI.max"), -1)),
                y(t("input", {
                  type: "number",
                  name: `system.trackers.${n}.${a.type}.max`,
                  min: "1",
                  "onUpdate:modelValue": (d) => a[a.type].max = d
                }, null, 8, cl), [
                  [h, a[a.type].max]
                ])
              ]),
              a.type === "points" ? (l(), o("div", ul, [
                s[8] || (s[8] = t("label", null, gwLocalize("GRIMWILD.UI.display"), -1)),
                y(t("select", {
                  name: `system.trackers.${n}.points.showSteps`,
                  "onUpdate:modelValue": (d) => a.points.showSteps = d
                }, s[7] || (s[7] = [
                  t("option", { value: "false" }, gwLocalize("GRIMWILD.UI.number"), -1),
                  t("option", { value: "true" }, gwLocalize("GRIMWILD.UI.checkboxes"), -1)
                ]), 8, ml), [
                  [A, a.points.showSteps]
                ])
              ])) : m("", !0),
              t("a", {
                class: "tracker-control tracker-delete",
                title: gwLocalize("GRIMWILD.UI.deletePool"),
                "data-action": "deleteTracker",
                "data-key": n
              }, s[9] || (s[9] = [
                t("i", { class: "fas fa-trash" }, null, -1)
              ]), 8, yl)
            ])
          ]))), 128))
        ]),
        s[10] || (s[10] = t("button", {
          class: "tracker-control tracker-create",
          type: "button",
          title: gwLocalize("GRIMWILD.UI.addPool"),
          "data-action": "createTracker"
        }, [
          t("i", { class: "fas fa-plus" }),
          V(gwLocalize("GRIMWILD.UI.addTracker"))
        ], -1))
      ])
    ]));
  }
}, pl = { class: "form-group stacked" }, xl = { class: "form-group" }, bl = { class: "form-group" }, gl = { class: "form-group stacked" }, hl = {
  __name: "ArcanaDetails",
  props: ["context"],
  setup(e) {
    return (r, s) => (l(), o("fieldset", null, [
      t("legend", null, c(r.game.i18n.localize("GRIMWILD.UI.details")), 1),
      t("div", pl, [
        t("div", xl, [
          t("label", null, c(e.context.systemFields.tier.label), 1),
          y(t("select", {
            name: "system.tier",
            "onUpdate:modelValue": s[0] || (s[0] = (a) => e.context.system.tier = a)
          }, s[2] || (s[2] = [
            t("option", { value: "minor" }, gwLocalize("GRIMWILD.UI.minorArcana"), -1),
            t("option", { value: "major" }, gwLocalize("GRIMWILD.UI.majorArcana"), -1),
            t("option", { value: "mythic" }, gwLocalize("GRIMWILD.UI.mythicArcana"), -1)
          ]), 512), [
            [A, e.context.system.tier]
          ])
        ]),
        t("div", bl, [
          t("label", null, c(e.context.systemFields.touchstones.label), 1),
          y(t("input", {
            type: "text",
            name: "system.touchstones",
            "onUpdate:modelValue": s[1] || (s[1] = (a) => e.context.system.touchstones = a)
          }, null, 512), [
            [h, e.context.system.touchstones]
          ])
        ]),
        t("div", gl, [
          t("label", null, c(e.context.systemFields.limitations.label), 1),
          g(f(M), {
            editable: e.context.editable,
            field: e.context.editors["system.limitations"]
          }, null, 8, ["editable", "field"])
        ])
      ])
    ]));
  }
}, $l = { class: "traits-fieldset add-another-entries" }, vl = { class: "traits entries form-group stacked" }, kl = ["name", "onUpdate:modelValue"], _l = ["data-key"], Vl = { class: "moves-fieldset add-another-entries" }, Ul = { class: "moves entries form-group stacked" }, wl = ["name", "onUpdate:modelValue"], Tl = ["data-key"], Dl = { class: "failure-fieldset add-another-entries" }, Il = { class: "failure entries form-group stacked" }, Ml = { class: "failure-state-row flexrow" }, Al = ["name", "onUpdate:modelValue"], Ll = ["data-key"], Cl = {
  __name: "ChallengeTraitsMoves",
  props: ["context"],
  setup(e) {
    return (r, s) => (l(), o(p, null, [
      t("fieldset", $l, [
        t("legend", null, c(e.context.systemFields.traits.label), 1),
        s[1] || (s[1] = t("button", {
          class: "trait-control legend-control entry-create",
          title: gwLocalize("GRIMWILD.UI.addTrait"),
          "data-action": "createArrayEntry",
          "data-field": "traits"
        }, [
          t("i", { class: "fas fa-plus" })
        ], -1)),
        t("div", vl, [
          (l(!0), o(p, null, b(e.context.system.traits, (a, n) => (l(), o("div", {
            class: "trait entry form-group stacked",
            key: n
          }, [
            y(t("input", {
              type: "text",
              name: `system.traits.${n}`,
              "onUpdate:modelValue": (d) => e.context.system.traits[n] = d,
              placeholder: gwLocalize("GRIMWILD.UI.traitDescription")
            }, null, 8, kl), [
              [h, e.context.system.traits[n]]
            ]),
            t("a", {
              class: "trait-control entry-delete",
              title: gwLocalize("GRIMWILD.UI.deleteTrait"),
              "data-action": "deleteArrayEntry",
              "data-field": "traits",
              "data-key": n
            }, s[0] || (s[0] = [
              t("i", { class: "fas fa-trash" }, null, -1)
            ]), 8, _l)
          ]))), 128))
        ])
      ]),
      t("fieldset", Vl, [
        t("legend", null, c(e.context.systemFields.moves.label), 1),
        s[3] || (s[3] = t("button", {
          class: "move-control legend-control entry-create",
          title: gwLocalize("GRIMWILD.UI.addMove"),
          "data-action": "createArrayEntry",
          "data-field": "moves"
        }, [
          t("i", { class: "fas fa-plus" })
        ], -1)),
        t("div", Ul, [
          (l(!0), o(p, null, b(e.context.system.moves, (a, n) => (l(), o("div", {
            class: "move entry form-group stacked",
            key: n
          }, [
            y(t("input", {
              type: "text",
              name: `system.moves.${n}`,
              "onUpdate:modelValue": (d) => e.context.system.moves[n] = d,
              placeholder: gwLocalize("GRIMWILD.UI.moveDescription")
            }, null, 8, wl), [
              [h, e.context.system.moves[n]]
            ]),
            t("a", {
              class: "move-control entry-delete",
              title: gwLocalize("GRIMWILD.UI.deleteMove"),
              "data-action": "deleteArrayEntry",
              "data-field": "moves",
              "data-key": n
            }, s[2] || (s[2] = [
              t("i", { class: "fas fa-trash" }, null, -1)
            ]), 8, Tl)
          ]))), 128))
        ])
      ]),
      t("fieldset", Dl, [
        t("legend", null, c(e.context.systemFields.failure.label), 1),
        s[5] || (s[5] = t("button", {
          class: "fail-control legend-control entry-create",
          title: gwLocalize("GRIMWILD.UI.addFailureState"),
          "data-action": "createArrayEntry",
          "data-field": "failure"
        }, [
          t("i", { class: "fas fa-plus" })
        ], -1)),
        t("div", Il, [
          (l(!0), o(p, null, b(e.context.system.failure, (a, n) => (l(), o("div", {
            class: "fail entry form-group stacked",
            key: n
          }, [
            t("div", Ml, [
              g(f(I), {
                "button-action": "rollPool",
                field: "failure",
                "field-key": n,
                "field-name": `system.failure.${n}.pool.diceNum`,
                pool: a.pool,
                min: "0"
              }, null, 8, ["field-key", "field-name", "pool"]),
              y(t("input", {
                type: "text",
                name: `system.failure.${n}.value`,
                "onUpdate:modelValue": (d) => e.context.system.failure[n].value = d,
                placeholder: gwLocalize("GRIMWILD.UI.failureDescription")
              }, null, 8, Al), [
                [h, e.context.system.failure[n].value]
              ]),
              t("a", {
                class: "fail-control entry-delete",
                title: gwLocalize("GRIMWILD.UI.deleteFail"),
                "data-action": "deleteArrayEntry",
                "data-field": "failure",
                "data-key": n
              }, s[4] || (s[4] = [
                t("i", { class: "fas fa-trash" }, null, -1)
              ]), 8, Ll)
            ])
          ]))), 128))
        ])
      ])
    ], 64));
  }
}, P = (e, r) => {
  const s = e.__vccOpts || e;
  for (const [a, n] of r)
    s[a] = n;
  return s;
}, El = {
  name: "Tabs",
  props: ["context", "actor", "group", "tabs", "flags", "hamburger", "no-span"],
  setup() {
    return {};
  },
  data() {
    return {
      currentTab: "details"
    };
  },
  methods: {
    changeTab(e) {
      var s, a;
      e && e.currentTarget && (this.currentTab = e.currentTarget.dataset.tab);
      for (let [n, d] of Object.entries(this.tabs))
        this.tabs[n].active = !1;
      this.tabs[this.currentTab] && (this.tabs[this.currentTab].active = !0);
      const r = (a = (s = e == null ? void 0 : e.target) == null ? void 0 : s.closest(".section--tabs")) == null ? void 0 : a.querySelector(".sheet-tabs");
      r && r.classList.remove("active");
    },
    toggleMenu(e) {
      var a;
      const r = e.target, s = (a = r == null ? void 0 : r.closest(".section--tabs")) == null ? void 0 : a.querySelector(".sheet-tabs");
      s && s.classList.toggle("active");
    },
    getTabClass(e, r) {
      return `tab-link tab-link--${r}${e.active ? " active" : ""}`;
    }
  },
  async mounted() {
    var r;
    const e = E(this.tabs);
    this.currentTab = ((r = Object.values(e).find((s) => s.active)) == null ? void 0 : r.key) ?? "details", this.tabs[this.currentTab].hidden && (this.currentTab = "details"), this.changeTab(!1);
  }
}, Nl = ["data-group"], Fl = ["data-tab"], Sl = { key: 1 }, Pl = ["data-tab"], Hl = { key: 1 };
function zl(e, r, s, a, n, d) {
  return l(), o("section", {
    class: k(`section section--tabs section--tabs-${s.group} flexshrink`)
  }, [
    s.hamburger ? (l(), o("button", {
      key: 0,
      class: k(`sheet-tabs-toggle sheet-tabs-toggle--${s.group}`),
      onClick: r[0] || (r[0] = (...i) => d.toggleMenu && d.toggleMenu(...i))
    }, r[3] || (r[3] = [
      t("i", { class: "fas fa-bars" }, null, -1),
      t("span", { class: "visually-hidden" }, " Toggle Navigation", -1)
    ]), 2)) : m("", !0),
    t("nav", {
      class: k(`sheet-tabs tabs tabs--${s.group} stroke stroke-bottom`),
      "data-group": s.group
    }, [
      e.noSpan ? (l(!0), o(p, { key: 0 }, b(s.tabs, (i, u) => (l(), o("a", {
        key: `tab-${s.group}-${u}`,
        onClick: r[1] || (r[1] = (...x) => d.changeTab && d.changeTab(...x)),
        class: k(d.getTabClass(i, u)),
        "data-tab": u
      }, [
        i.icon ? (l(), o("i", {
          key: 0,
          class: k(`fas ${i.icon}`)
        }, null, 2)) : m("", !0),
        i.hideLabel ? m("", !0) : (l(), o("span", Sl, c(i.label), 1))
      ], 10, Fl))), 128)) : (l(!0), o(p, { key: 1 }, b(s.tabs, (i, u) => (l(), o("span", {
        key: `tab-${s.group}-${u}`
      }, [
        i.hidden ? m("", !0) : (l(), o("a", {
          key: 0,
          onClick: r[2] || (r[2] = (...x) => d.changeTab && d.changeTab(...x)),
          class: k(d.getTabClass(i, u)),
          "data-tab": u
        }, [
          i.icon ? (l(), o("i", {
            key: 0,
            class: k(`fas ${i.icon}`)
          }, null, 2)) : m("", !0),
          i.hideLabel ? m("", !0) : (l(), o("span", Hl, c(i.label), 1))
        ], 10, Pl))
      ]))), 128))
    ], 10, Nl)
  ], 2);
}
const S = /* @__PURE__ */ P(El, [["render", zl]]), Rl = {
  name: "Tab",
  props: ["context", "actor", "tab", "group", "classes"]
}, Gl = ["data-group", "data-tab"];
function Wl(e, r, s, a, n, d) {
  return l(), o("div", {
    class: k(`tab tab-${s.tab.key} ${["arcana", "talents"].includes(s.tab.key) ? "tab-items" : ""} ${s.tab.active ? "active" : ""} ${s.classes ? s.classes : ""}`),
    "data-group": s.group,
    "data-tab": s.tab.key
  }, [
    z(e.$slots, "default")
  ], 10, Gl);
}
const w = /* @__PURE__ */ P(Rl, [["render", Wl]]), Ol = ["innerHTML"], M = {
  __name: "Prosemirror",
  props: ["field", "editable"],
  setup(e) {
    return (r, s) => (l(), o("div", {
      class: "prose-mirror-wrapper",
      innerHTML: e.editable ? e.field.element.outerHTML : e.field.enriched
    }, null, 8, Ol));
  }
}, jl = { class: "roll-pool form-group" }, Bl = ["data-action", "data-roll-type", "data-item-id", "data-field", "data-key"], Xl = { key: 0 }, ql = {
  key: 0,
  class: "roll-pool-suffix"
}, Jl = ["data-action-change", "data-item-id", "name", "value", "min", "max"], Ql = { class: "roll-pool-suffix" }, I = {
  __name: "RollPoolInput",
  props: [
    "name",
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
    "suffix"
  ],
  setup(e) {
    const r = e;
    r.buttonAction || (r.buttonAction = "rollPool"), r.min || (r.min = 0);
    let s = null;
    return r.fieldName ? s = r.fieldName : r.field && (s = `system.${r.field}.diceNum`), (a, n) => (l(), o("div", jl, [
      t("button", {
        class: "roll-pool-button",
        "data-action": e.buttonAction,
        "data-roll-type": e.buttonRollType,
        "data-item-id": e.itemId,
        "data-field": e.field,
        "data-key": e.fieldKey
      }, [
        n[0] || (n[0] = t("i", { class: "fas fa-dice-d6" }, null, -1)),
        e.buttonLabel ? (l(), o("strong", Xl, c(e.buttonLabel), 1)) : m("", !0)
      ], 8, Bl),
      e.noInput ? (l(), o("span", ql, c(e.pool.diceNum) + "d", 1)) : (l(), o(p, { key: 1 }, [
        t("input", {
          type: "number",
          class: "roll-pool-input",
          "data-action-change": e.inputAction,
          "data-item-id": e.itemId,
          name: f(s),
          value: e.pool.diceNum,
          min: e.min,
          max: e.max
        }, null, 8, Jl),
        t("span", Ql, c(e.suffix ?? "d"), 1)
      ], 64))
    ]));
  }
}, Yl = {
  class: /* @__PURE__ */ k("grimwild-vue standard-form flexcol")
}, Zl = { class: "grimwild-sheet-layout grid grid-4col" }, Kl = { class: "grimwild-main flexcol grid-span-3" }, to = { class: "section--main flexcol" }, eo = { class: "section--fields flexcol" }, so = { class: "fieldset-prose-mirror" }, ao = { class: "fieldset-prose-mirror" }, ko = {
  __name: "DocumentSheet",
  props: ["context"],
  setup(e) {
    const s = E(e.context.tabs), a = F({ ...s });
    return (n, d) => (l(), o("div", Yl, [
      t("div", Zl, [
        g(f(ut), { context: e.context }, null, 8, ["context"]),
        t("section", Kl, [
          g(f(It), { context: e.context }, null, 8, ["context"]),
          t("div", to, [
            g(f(S), {
              tabs: a.primary,
              "no-span": "true"
            }, null, 8, ["tabs"]),
            t("section", eo, [
              g(f(w), {
                group: "primary",
                tab: a.primary.biography
              }, {
                default: U(() => [
                  t("fieldset", so, [
                    t("legend", null, c(e.context.systemFields.biography.label), 1),
                    g(f(M), {
                      editable: e.context.editable,
                      field: e.context.editors["system.biography"]
                    }, null, 8, ["editable", "field"])
                  ])
                ]),
                _: 1
              }, 8, ["tab"]),
              g(f(w), {
                group: "primary",
                tab: a.primary.notes
              }, {
                default: U(() => [
                  t("fieldset", ao, [
                    t("legend", null, c(e.context.systemFields.notes.label), 1),
                    g(f(M), {
                      editable: e.context.editable,
                      field: e.context.editors["system.notes"]
                    }, null, 8, ["editable", "field"])
                  ])
                ]),
                _: 1
              }, 8, ["tab"]),
              g(f(w), {
                group: "primary",
                tab: a.primary.details
              }, {
                default: U(() => [
                  g(f(Yt), {
                    actor: e.context.actor,
                    context: e.context
                  }, null, 8, ["actor", "context"])
                ]),
                _: 1
              }, 8, ["tab"]),
              e.context.actor.type === "character" ? (l(), T(f(w), {
                key: 0,
                group: "primary",
                tab: a.primary.talents
              }, {
                default: U(() => [
                  g(f(Me), {
                    actor: e.context.actor,
                    context: e.context
                  }, null, 8, ["actor", "context"])
                ]),
                _: 1
              }, 8, ["tab"])) : m("", !0),
              e.context.actor.type === "character" ? (l(), T(f(w), {
                key: 1,
                group: "primary",
                tab: a.primary.arcana
              }, {
                default: U(() => [
                  g(f(ms), {
                    actor: e.context.actor,
                    context: e.context
                  }, null, 8, ["actor", "context"])
                ]),
                _: 1
              }, 8, ["tab"])) : m("", !0)
            ])
          ])
        ])
      ])
    ]));
  }
}, lo = {
  class: /* @__PURE__ */ k("grimwild-vue standard-form flexcol")
}, oo = {
  key: 0,
  class: "monster-colors flexrow"
}, no = {
  key: 0,
  class: "monster-color-wrapper"
}, io = {
  key: 0,
  class: "monster-color-name"
}, ro = { class: "grimwild-sheet-layout flexcol" }, co = { class: "section--main flexcol" }, uo = { class: "section--fields flexcol" }, mo = { class: "fieldset-prose-mirror" }, _o = {
  __name: "MonsterSheet",
  props: ["context"],
  setup(e) {
    const s = E(e.context.tabs), a = F({ ...s });
    return (n, d) => (l(), o("div", lo, [
      e.context.actor.type === "monster" ? (l(), o("div", oo, [
        (l(!0), o(p, null, b(e.context.system.sensories.colors, (i, u) => (l(), o(p, { key: u }, [
          i.color ? (l(), o("div", no, [
            t("div", {
              class: "monster-color",
              style: R(`background-color:${i.color}`)
            }, null, 4),
            i.name ? (l(), o("div", io, c(i.name), 1)) : m("", !0)
          ])) : m("", !0)
        ], 64))), 128))
      ])) : m("", !0),
      t("div", ro, [
        g(f(Us), { context: e.context }, null, 8, ["context"]),
        t("div", co, [
          g(f(S), {
            tabs: a.primary,
            "no-span": "true"
          }, null, 8, ["tabs"]),
          t("section", uo, [
            e.context.actor.type === "monster" ? (l(), T(f(w), {
              key: 0,
              group: "primary",
              tab: a.primary.biography
            }, {
              default: U(() => [
                g(f(na), { context: e.context }, null, 8, ["context"])
              ]),
              _: 1
            }, 8, ["tab"])) : m("", !0),
            g(f(w), {
              group: "primary",
              tab: a.primary.moves
            }, {
              default: U(() => [
                g(f(Ta), { context: e.context }, null, 8, ["context"]),
                e.context.actor.type === "monster" ? (l(), T(f(Aa), {
                  key: 0,
                  context: e.context
                }, null, 8, ["context"])) : m("", !0)
              ]),
              _: 1
            }, 8, ["tab"]),
            e.context.actor.type === "monster" ? (l(), T(f(w), {
              key: 1,
              group: "primary",
              tab: a.primary.tables
            }, {
              default: U(() => [
                g(f(ga), { context: e.context }, null, 8, ["context"])
              ]),
              _: 1
            }, 8, ["tab"])) : m("", !0),
            g(f(w), {
              group: "primary",
              tab: a.primary.challenges
            }, {
              default: U(() => [
                g(f(Qs), { context: e.context }, null, 8, ["context"])
              ]),
              _: 1
            }, 8, ["tab"]),
            g(f(w), {
              group: "primary",
              tab: a.primary.notes
            }, {
              default: U(() => [
                t("fieldset", mo, [
                  t("legend", null, c(e.context.systemFields.notes.label), 1),
                  g(f(M), {
                    editable: e.context.editable,
                    field: e.context.editors["system.notes"]
                  }, null, 8, ["editable", "field"])
                ])
              ]),
              _: 1
            }, 8, ["tab"])
          ])
        ])
      ])
    ]));
  }
}, yo = {
  class: /* @__PURE__ */ k("grimwild-vue standard-form flexcol")
}, fo = { class: "grimwild-sheet-layout flexcol" }, po = { class: "grimwild-main flexcol grid-span-3" }, xo = { class: "section--main flexcol" }, bo = { class: "section--fields" }, go = { key: 0 }, ho = { class: "notes form-group stacked" }, $o = { class: "field" }, Vo = {
  __name: "ItemSheet",
  props: ["context"],
  setup(e) {
    const s = E(e.context.tabs), a = F({ ...s });
    return (n, d) => (l(), o("div", yo, [
      t("div", fo, [
        t("section", po, [
          g(f(Ba), { context: e.context }, null, 8, ["context"]),
          t("div", xo, [
            g(f(S), {
              tabs: a.primary,
              "no-span": "true"
            }, null, 8, ["tabs"]),
            t("section", bo, [
              g(f(w), {
                group: "primary",
                tab: a.primary.description
              }, {
                default: U(() => {
                  var i;
                  return [
                    g(f(Ea), {
                      item: e.context.item,
                      context: e.context
                    }, null, 8, ["item", "context"]),
                    (i = e.context.system) != null && i.notes ? (l(), o("fieldset", go, [
                      d[2] || (d[2] = t("legend", null, gwLocalize("GRIMWILD.UI.notes"), -1)),
                      t("div", ho, [
                        d[1] || (d[1] = t("label", null, gwLocalize("GRIMWILD.UI.label"), -1)),
                        y(t("input", {
                          type: "text",
                          name: "system.notes.label",
                          "onUpdate:modelValue": d[0] || (d[0] = (u) => e.context.system.notes.label = u)
                        }, null, 512), [
                          [h, e.context.system.notes.label]
                        ])
                      ]),
                      t("div", $o, [
                        g(f(M), {
                          editable: e.context.editable,
                          field: e.context.editors["system.notes.description"]
                        }, null, 8, ["editable", "field"])
                      ])
                    ])) : m("", !0)
                  ];
                }),
                _: 1
              }, 8, ["tab"]),
              g(f(w), {
                group: "primary",
                tab: a.primary.attributes
              }, {
                default: U(() => [
                  e.context.item.type === "arcana" ? (l(), T(f(hl), {
                    key: 0,
                    context: e.context
                  }, null, 8, ["context"])) : m("", !0),
                  g(f(Xa), { context: e.context }, null, 8, ["context"])
                ]),
                _: 1
              }, 8, ["tab"])
            ])
          ])
        ])
      ])
    ]));
  }
};
export {
  ko as DocumentSheetVue,
  Vo as ItemSheetVue,
  _o as MonsterSheetVue
};
//# sourceMappingURL=components.vue.es.mjs.map
