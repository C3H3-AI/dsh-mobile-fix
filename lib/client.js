window.__ModuleLoader__.load({
  id: "dsh-mobile-fix",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

    // src/client/index.ts
    var client_exports = {};
    __export(client_exports, {
      apply: () => apply,
      inject: () => inject
    });
    module.exports = __toCommonJS(client_exports);
    var SETTINGS_MARKER = "data-dsh-settings-panel";
    var MAX_MARKER = "data-dsh-settings-max";
    var STYLE = `
    [data-dsh-settings-panel] { position: relative; transition: width 160ms ease, height 160ms ease, max-width 160ms ease, max-height 160ms ease, border-radius 160ms ease; }
    [data-dsh-settings-panel][data-dsh-settings-max] { position: fixed !important; inset: 0 !important; width: 100vw !important; max-width: 100vw !important; height: 100dvh !important; max-height: 100dvh !important; border-radius: 0 !important; }
    @media (max-width: 768px) {
      div[class*="dialog"], div[role="dialog"], div[class*="modal"] { max-width: 100vw !important; max-height: 100vh !important; box-sizing: border-box !important; }
      div[class*="dialog"] > :first-child, div[role="dialog"] > :first-child, div[class*="modal"] > :first-child { max-width: 100% !important; box-sizing: border-box !important; }
      body { padding-bottom: env(safe-area-inset-bottom, 0px) !important; }
      input, select, textarea, button { font-size: 16px !important; }
      [class*="pI_x6G_frame"], [data-dsh-frame] { grid-template-columns: minmax(0, 1fr) !important; }
      [class*="sidebarCol"], [data-pane="sidebar"] { position: fixed !important; inset-block: 0 !important; inset-inline-start: 0 !important; z-index: 1100 !important; width: min(88vw, 320px) !important; transform: translateX(0); transition: transform 160ms ease; }
      [class*="sidebarCol"]:has([class*="collapsed"]), [data-sidebar-collapsed] [data-pane="sidebar"] { width: 0 !important; min-width: 0 !important; transform: translateX(-105%) !important; pointer-events: none !important; box-shadow: none !important; border: 0 !important; }
      [class*="hHd-Xa_toggle"] { position: fixed !important; top: max(8px, env(safe-area-inset-top)) !important; left: 8px !important; z-index: 1300 !important; width: 44px !important; height: 44px !important; }
      [class*="centerCol"], [data-pane="conversation"] { width: 100% !important; min-width: 0 !important; }
      [data-dsh-settings-panel] { position: fixed !important; inset: 0 !important; width: 100vw !important; max-width: 100vw !important; height: 100dvh !important; max-height: 100dvh !important; border-radius: 0 !important; flex-direction: column !important; }
      [data-dsh-settings-panel] > nav { flex: none !important; width: 100% !important; flex-direction: column !important; height: auto !important; max-height: 30dvh !important; gap: 4px !important; padding: 8px 12px !important; overflow: hidden !important; }
      [data-dsh-settings-panel] > nav > [class*='navTitle'] { display: none !important; }
      [data-dsh-settings-panel] > nav > [class*='navList'] { flex: none !important; flex-direction: row !important; width: 100% !important; height: auto !important; max-height: 26dvh !important; gap: 8px !important; overflow-x: auto !important; overflow-y: hidden !important; }
      [data-dsh-settings-panel] > nav [class*='navCell'] { flex: 0 0 auto !important; width: auto !important; min-width: 96px !important; height: 40px !important; }
      [data-dsh-settings-panel] > :not(nav) { flex: 1 1 auto !important; width: 100% !important; min-width: 0 !important; overflow-y: auto !important; }
    }
    @media (prefers-reduced-motion: reduce) { [data-dsh-settings-panel] { transition: none !important; } }
    `;
    function ensureStyle() {
      const existing = document.querySelector("style[data-dsh-mobile-fix]");
      if (existing !== null) return existing;
      const style = document.createElement("style");
      style.setAttribute("data-dsh-mobile-fix", "");
      style.textContent = STYLE;
      document.head.appendChild(style);
      return style;
    }
    function isSettingsDialog(el) {
      if (el.getAttribute("role") !== "dialog") return false;
      if (el.getAttribute("aria-modal") !== "true") return false;
      const kids = Array.from(el.children);
      if (kids.find((c) => c.tagName === "NAV") === void 0) return false;
      return kids.filter((c) => c.tagName !== "NAV").length >= 1;
    }
    function install(panel) {
      if (panel.hasAttribute(SETTINGS_MARKER)) return;
      panel.setAttribute(SETTINGS_MARKER, "");
      const onDblClick = (e) => {
        const t = e.target;
        if (t && t.closest('button, [role="button"], a, input, select, textarea')) return;
        panel.toggleAttribute(MAX_MARKER, !panel.hasAttribute(MAX_MARKER));
      };
      panel.addEventListener("dblclick", onDblClick);
      panel.__dshMobileFixCleanup = () => {
        panel.removeEventListener("dblclick", onDblClick);
      };
    }
    var inject = [];
    function apply(ctx) {
      ctx.effect(() => {
        ensureStyle();
        let installed = false;
        const tryInstall = () => {
          if (installed) return;
          const target = Array.from(document.querySelectorAll('[role="dialog"]')).find(isSettingsDialog) ?? null;
          if (target !== null) {
            install(target);
            installed = true;
          }
        };
        tryInstall();
        const observer = new MutationObserver(() => tryInstall());
        observer.observe(document.body, { childList: true, subtree: true });
        return () => {
          observer.disconnect();
          const panel = document.querySelector("[" + SETTINGS_MARKER + "]");
          const p = panel;
          if (p && typeof p.__dshMobileFixCleanup === "function") p.__dshMobileFixCleanup();
        };
      });
    }

    return module.exports;
  }
});
