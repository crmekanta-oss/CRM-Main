import { useState, useEffect } from "react";

// ─── THEMES ───────────────────────────────────────────────────────────────────
export const THEMES = {
  obsidian: {
    name: "Obsidian", emoji: "⬛", desc: "Professional dark slate",
    light: {
      bg:"#f4f6fa", surface:"#ffffff", surfaceHover:"#f0f3f8", surfaceEl:"#eef1f7", sidebar:"#ffffff",
      brand:"#4361ee", brandHover:"#3451d1", brandSubtle:"#e8ecfd", brandRgb:"67,97,238",
      ink:"#0d1117", inkSub:"#2d3748", inkMuted:"#718096", inkInvert:"#ffffff",
      line:"#e8ecf2", lineMid:"#d1d9e6", lineStrong:"#a0aec0", sidebarBrand:"#4361ee",
    },
    dark: {
      bg:"#0a0c12", surface:"#121620", surfaceHover:"#1a1f2e", surfaceEl:"#181c2a", sidebar:"#0f1320",
      brand:"#6c8fff", brandHover:"#5a7cf0", brandSubtle:"rgba(108,143,255,0.12)", brandRgb:"108,143,255",
      ink:"#e8ecf8", inkSub:"#9baacf", inkMuted:"#4e5d80", inkInvert:"#0a0c12",
      line:"rgba(255,255,255,0.07)", lineMid:"rgba(255,255,255,0.11)", lineStrong:"rgba(255,255,255,0.2)", sidebarBrand:"#6c8fff",
    },
  },
  emerald: {
    name: "Emerald", emoji: "💚", desc: "Growth & prosperity",
    light: {
      bg:"#f4f9f6", surface:"#ffffff", surfaceHover:"#eaf4ef", surfaceEl:"#ecf5f0", sidebar:"#ffffff",
      brand:"#059669", brandHover:"#047857", brandSubtle:"#d1fae5", brandRgb:"5,150,105",
      ink:"#052e16", inkSub:"#065f46", inkMuted:"#6b7280", inkInvert:"#ffffff",
      line:"#d1fae5", lineMid:"#a7f3d0", lineStrong:"#6ee7b7", sidebarBrand:"#059669",
    },
    dark: {
      bg:"#030d09", surface:"#0a1f14", surfaceHover:"#102818", surfaceEl:"#0e2316", sidebar:"#071810",
      brand:"#34d399", brandHover:"#10b981", brandSubtle:"rgba(5,150,105,0.15)", brandRgb:"52,211,153",
      ink:"#ecfdf5", inkSub:"#6ee7b7", inkMuted:"#34d399", inkInvert:"#030d09",
      line:"rgba(255,255,255,0.07)", lineMid:"rgba(255,255,255,0.11)", lineStrong:"rgba(255,255,255,0.18)", sidebarBrand:"#34d399",
    },
  },
  sand: {
    name: "Sand", emoji: "🏺", desc: "Warm parchment",
    light: {
      bg:"#f5f1eb", surface:"#faf8f4", surfaceHover:"#ece7de", surfaceEl:"#ede9e1", sidebar:"#faf8f4",
      brand:"#9a7a45", brandHover:"#7d6235", brandSubtle:"#f2e8d5", brandRgb:"154,122,69",
      ink:"#111009", inkSub:"#2a2520", inkMuted:"#4a4540", inkInvert:"#f5f1eb",
      line:"#e0d9ce", lineMid:"#c8c2b4", lineStrong:"#b0a898", sidebarBrand:"#9a7a45",
    },
    dark: {
      bg:"#141210", surface:"#1c1a17", surfaceHover:"#242018", surfaceEl:"#222018", sidebar:"#161410",
      brand:"#c9a96e", brandHover:"#b8934e", brandSubtle:"rgba(154,122,69,0.15)", brandRgb:"201,169,110",
      ink:"#f0ece5", inkSub:"#c8b89a", inkMuted:"#9a8a70", inkInvert:"#1a1814",
      line:"rgba(255,255,255,0.07)", lineMid:"rgba(255,255,255,0.11)", lineStrong:"rgba(255,255,255,0.18)", sidebarBrand:"#c9a96e",
    },
  },
  violet: {
    name: "Violet", emoji: "💜", desc: "Deep purple elegance",
    light: {
      bg:"#f5f3ff", surface:"#ffffff", surfaceHover:"#ede9fd", surfaceEl:"#eae6fd", sidebar:"#ffffff",
      brand:"#7c3aed", brandHover:"#6d28d9", brandSubtle:"#ede9fb", brandRgb:"124,58,237",
      ink:"#1a0533", inkSub:"#3b1f6b", inkMuted:"#6b5b8a", inkInvert:"#f4f2fa",
      line:"#e0d9f8", lineMid:"#c5bde8", lineStrong:"#a99fd4", sidebarBrand:"#7c3aed",
    },
    dark: {
      bg:"#0f0b1a", surface:"#17122a", surfaceHover:"#1f1835", surfaceEl:"#1c1530", sidebar:"#130f23",
      brand:"#a78bfa", brandHover:"#8b5cf6", brandSubtle:"rgba(124,58,237,0.18)", brandRgb:"167,139,250",
      ink:"#f0ecff", inkSub:"#c4b8f0", inkMuted:"#8b7bb8", inkInvert:"#0f0b1a",
      line:"rgba(255,255,255,0.07)", lineMid:"rgba(255,255,255,0.11)", lineStrong:"rgba(255,255,255,0.18)", sidebarBrand:"#a78bfa",
    },
  },
  slate: {
    name: "Slate", emoji: "🌫️", desc: "Clean neutral grey",
    light: {
      bg:"#f1f3f6", surface:"#ffffff", surfaceHover:"#e5e8ed", surfaceEl:"#e8eaef", sidebar:"#ffffff",
      brand:"#334155", brandHover:"#1e293b", brandSubtle:"#dde3ee", brandRgb:"51,65,85",
      ink:"#0f172a", inkSub:"#1e293b", inkMuted:"#475569", inkInvert:"#f1f3f6",
      line:"#e2e8f0", lineMid:"#cbd5e1", lineStrong:"#94a3b8", sidebarBrand:"#334155",
    },
    dark: {
      bg:"#0a0d12", surface:"#111827", surfaceHover:"#1a2333", surfaceEl:"#182030", sidebar:"#0e1520",
      brand:"#94a3b8", brandHover:"#cbd5e1", brandSubtle:"rgba(51,65,85,0.25)", brandRgb:"148,163,184",
      ink:"#f1f5f9", inkSub:"#cbd5e1", inkMuted:"#64748b", inkInvert:"#0a0d12",
      line:"rgba(255,255,255,0.07)", lineMid:"rgba(255,255,255,0.11)", lineStrong:"rgba(255,255,255,0.18)", sidebarBrand:"#94a3b8",
    },
  },
};

// ─── useTheme hook ─────────────────────────────────────────────────────────────
export const useTheme = () => {
  const [themeId, setThemeId] = useState(() => {
    try { return localStorage.getItem("ek-theme") || "obsidian"; } catch { return "obsidian"; }
  });
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("ek-dark") === "1"; } catch { return false; }
  });
  const toggleDark = () => setDark(d => {
    const next = !d;
    try { localStorage.setItem("ek-dark", next ? "1" : "0"); } catch {}
    return next;
  });
  const setTheme = (id) => {
    if (!THEMES[id]) return;
    try { localStorage.setItem("ek-theme", id); } catch {}
    setThemeId(id);
  };
  return { themeId, setTheme, dark, toggleDark };
};

export const useDark = () => {
  const { dark, toggleDark } = useTheme();
  return { dark, toggle: toggleDark };
};

// ─── makeT — signature: makeT(dark, themeId) ──────────────────────────────────
export const makeT = (dark, themeId = "obsidian") => {
  const def = THEMES[themeId] || THEMES.obsidian;
  const base = dark ? def.dark : def.light;
  return {
    ...base,
    themeId,
    won:     { dot:"#10b981", bg: dark?"rgba(16,185,129,0.12)":"#d1fae5",  text: dark?"#34d399":"#065f46" },
    pending: { dot:"#f59e0b", bg: dark?"rgba(245,158,11,0.12)":"#fef3c7",  text: dark?"#fbbf24":"#92400e" },
    lost:    { dot:"#ef4444", bg: dark?"rgba(239,68,68,0.12)":"#fee2e2",   text: dark?"#f87171":"#991b1b" },
    drop:    { dot:"#6b7280", bg: dark?"rgba(107,114,128,0.10)":"#f3f4f6", text: dark?"#9ca3af":"#374151" },
    cold:    { dot:"#8b5cf6", bg: dark?"rgba(139,92,246,0.12)":"#ede9fe",  text: dark?"#a78bfa":"#5b21b6" },
    neg:     { dot:"#f43f5e", bg: dark?"rgba(239,68,68,0.08)":"#fff1f2",   text: dark?"#fb7185":"#be123c" },
    ntc:     { dot:"#64748b", bg: dark?"rgba(100,116,139,0.1)":"#f1f5f9",  text: dark?"#94a3b8":"#334155" },
    new:     { dot:"#3b82f6", bg: dark?"rgba(59,130,246,0.12)":"#dbeafe",  text: dark?"#60a5fa":"#1e40af" },
    high:    { dot:"#f59e0b", bg: dark?"rgba(245,158,11,0.12)":"#fef3c7",  text: dark?"#fbbf24":"#92400e" },
    premium: { dot:"#8b5cf6", bg: dark?"rgba(139,92,246,0.12)":"#f3e8ff",  text: dark?"#c084fc":"#6b21a8" },
    bulk:    { dot:"#10b981", bg: dark?"rgba(16,185,129,0.12)":"#d1fae5",  text: dark?"#34d399":"#065f46" },
    r: { xs:"4px", sm:"6px", md:"8px", lg:"10px", xl:"12px", "2xl":"16px", "3xl":"20px" },
    shadowSm:  dark ? "0 1px 4px rgba(0,0,0,0.5)"    : "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    shadowMd:  dark ? "0 4px 16px rgba(0,0,0,0.5)"   : "0 4px 12px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
    shadowLg:  dark ? "0 10px 30px rgba(0,0,0,0.6)"  : "0 12px 32px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)",
    shadowXl:  dark ? "0 25px 60px rgba(0,0,0,0.7)"  : "0 24px 48px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08)",
    shadow2xl: dark ? "0 40px 80px rgba(0,0,0,0.8)"  : "0 25px 50px rgba(0,0,0,0.12)",
    glow: `0 0 0 3px rgba(${base.brandRgb},0.2)`,
  };
};

export const F_BODY  = "'Plus Jakarta Sans', 'SF Pro Display', system-ui, -apple-system, sans-serif";
export const F_MONO  = "'JetBrains Mono', 'Fira Code', monospace";
export const F_SERIF = "'Lora', Georgia, serif";
export const F       = F_BODY;

export function FontLoader({ dark, themeId = "obsidian" }) {
  useEffect(() => {
    if (!document.getElementById("ek-font")) {
      const l = document.createElement("link");
      l.id = "ek-font"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap";
      document.head.appendChild(l);
    }
    const def = THEMES[themeId] || THEMES.obsidian;
    const base = dark ? def.dark : def.light;
    let g = document.getElementById("ek-global-style");
    if (!g) { g = document.createElement("style"); g.id = "ek-global-style"; document.head.appendChild(g); }
    g.textContent = `
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      :root{font-size:14px}
      html{height:100%}
      body{
        background:${base.bg};color:${base.ink};
        font-family:'Plus Jakarta Sans','SF Pro Display',system-ui,-apple-system,sans-serif;
        -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
        transition:background .3s,color .3s;height:100%;overflow:hidden;
      }
      #root{height:100%;display:flex;flex-direction:column}
      input,select,textarea,button{font-family:inherit}

      @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes scaleIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
      @keyframes slideRight{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}
      @keyframes slideLeft{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
      @keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}
      @keyframes bounceIn{0%{opacity:0;transform:scale(0.85)}60%{transform:scale(1.03)}100%{opacity:1;transform:scale(1)}}
      @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

      ::-webkit-scrollbar{width:5px;height:5px}
      ::-webkit-scrollbar-track{background:transparent}
      ::-webkit-scrollbar-thumb{background:rgba(${base.brandRgb},.2);border-radius:10px}
      ::-webkit-scrollbar-thumb:hover{background:rgba(${base.brandRgb},.4)}
      ::-webkit-scrollbar-corner{background:transparent}
      ::selection{background:rgba(${base.brandRgb},0.18);color:${base.ink}}

      /* Layout primitives */
      .ek-shell{height:100vh;overflow:hidden;display:flex}
      .ek-main-col{flex:1;min-width:0;height:100vh;overflow:hidden;display:flex;flex-direction:column}
      .ek-page-content{flex:1;overflow-y:auto;animation:fadeUp .22s ease both}
      .ek-table-scroll{overflow-y:auto}
      .ek-hide-mobile{display:flex}
      .ek-show-mobile{display:none}

      /* Cards */
      .ek-card{
        background:${base.surface};border:1px solid ${base.line};
        border-radius:14px;
        box-shadow:0 1px 4px rgba(0,0,0,0.05),0 1px 2px rgba(0,0,0,0.03);
        transition:box-shadow .2s ease,transform .2s ease,border-color .2s ease;
      }
      .ek-card-hover:hover{
        box-shadow:0 10px 28px rgba(0,0,0,0.09),0 4px 10px rgba(0,0,0,0.04);
        transform:translateY(-2px);border-color:${base.lineMid};
      }

      /* KPI grid */
      .ek-kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
      .ek-stats-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:10px}
      .ek-dash-grid{display:grid;grid-template-columns:1fr 320px;gap:20px;align-items:start}
      .ek-analytics-hero{display:grid;grid-template-columns:2fr 1fr;gap:16px}
      .ek-stat-card{transition:transform .2s ease,box-shadow .2s ease;cursor:pointer}
      .ek-stat-card:hover{transform:translateY(-2px)}
      .ek-table-row{transition:background .12s ease}
      .ek-stats-row1{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:12px}
      .ek-stats-row2{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}

      /* Sidebar */
      .ek-sidebar{
        width:248px;height:100vh;flex-shrink:0;
        background:${base.sidebar};border-right:1px solid ${base.line};
        display:flex;flex-direction:column;
        position:relative;z-index:10;
        transition:width .22s cubic-bezier(0.4,0,0.2,1);overflow:hidden;
      }
      .ek-sidebar.collapsed{width:64px}

      /* Bottom nav */
      .ek-bottom-nav{
        display:none;position:fixed;bottom:0;left:0;right:0;
        background:${base.surface};border-top:1px solid ${base.line};
        z-index:200;height:calc(64px + env(safe-area-inset-bottom));
        padding-bottom:env(safe-area-inset-bottom);
        align-items:center;justify-content:space-around;
        box-shadow:0 -8px 32px rgba(0,0,0,0.1);
        backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
      }
      .ek-bottom-nav-item{
        display:flex;flex-direction:column;align-items:center;gap:4px;
        padding:6px 8px;border-radius:12px;border:none;background:none;
        cursor:pointer;transition:all .18s ease;flex:1;
        -webkit-tap-highlight-color:transparent;min-width:44px;min-height:48px;justify-content:center;
      }
      .ek-bottom-nav-item.active{background:rgba(${base.brandRgb},0.1)}
      .ek-bottom-nav-label{font-size:9px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-top:2px}

      /* Shimmer skeleton */
      .ek-skeleton{
        background:linear-gradient(90deg,${base.surfaceEl} 0%,${base.surfaceHover} 50%,${base.surfaceEl} 100%);
        background-size:600px 100%;animation:shimmer 1.6s infinite;border-radius:8px;
      }

      /* Focus rings */
      button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{
        outline:2px solid ${base.brand};outline-offset:2px;
      }

      /* Responsive grids */
      @media(max-width:1400px){
        .ek-kpi-grid{grid-template-columns:repeat(4,1fr)!important}
        .ek-stats-grid{grid-template-columns:repeat(4,1fr)!important}
      }
      @media(max-width:1200px){
        .ek-kpi-grid{grid-template-columns:repeat(2,1fr)!important}
        .ek-dash-grid{grid-template-columns:1fr!important}
        .ek-analytics-hero{grid-template-columns:1fr!important}
        .ek-stats-row1{grid-template-columns:repeat(2,1fr)!important}
        .ek-stats-row2{grid-template-columns:repeat(3,1fr)!important}
      }
      @media(max-width:768px){
        html{-webkit-text-size-adjust:100%}
        *{-webkit-tap-highlight-color:transparent}
        .ek-shell{height:100dvh}
        .ek-main-col{height:100dvh}
        .ek-page-content{padding-bottom:calc(72px + env(safe-area-inset-bottom))!important}
        .ek-sidebar{display:none!important}
        .ek-sidebar.open{
          display:flex!important;position:fixed!important;
          top:0!important;left:0!important;bottom:0!important;
          width:min(280px,88vw)!important;z-index:300!important;
          height:100dvh!important;box-shadow:8px 0 48px rgba(0,0,0,0.35)!important;
        }
        .ek-bottom-nav{display:flex!important}
        .ek-hide-mobile{display:none!important}
        .ek-show-mobile{display:flex!important}
        .ek-kpi-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}
        .ek-stats-grid{grid-template-columns:repeat(2,1fr)!important;gap:8px!important}
        .ek-stats-row1{grid-template-columns:repeat(2,1fr)!important;gap:8px!important;margin-bottom:8px!important}
        .ek-stats-row2{grid-template-columns:repeat(2,1fr)!important;gap:8px!important}
        .ek-dash-grid{grid-template-columns:1fr!important;gap:12px!important}
        .ek-topbar-sub{display:none!important}
        .ek-mobile-menu{display:flex!important}
        .ek-drawer{width:100vw!important;max-width:100vw!important}
        .ek-modal{width:calc(100vw - 16px)!important;margin:0 auto}
        .ek-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
        .ek-filter-scroll{overflow-x:auto;flex-wrap:nowrap;-webkit-overflow-scrolling:touch}
        .ek-filter-scroll>*{flex-shrink:0}
        .ek-topbar{padding:0 14px!important;gap:10px!important;height:52px!important}
        .ek-contacts-grid{grid-template-columns:1fr!important;gap:10px!important}
        .ek-contacts-header{flex-direction:column!important;align-items:flex-start!important;gap:10px!important}
      }
      @media(max-width:480px){
        .ek-kpi-grid{grid-template-columns:1fr 1fr!important;gap:8px!important}
        .ek-stats-grid{grid-template-columns:1fr 1fr!important;gap:6px!important}
        .ek-topbar-search{max-width:140px!important;min-width:80px!important}
      }

      /* iOS scroll */
      .ek-page-content,.ek-table-scroll,[style*="overflow-y:auto"],[style*="overflowY:auto"]{
        -webkit-overflow-scrolling:touch;
      }

      /* Table hover */
      .ek-tr:hover td{background:rgba(${base.brandRgb},0.04)!important}

      /* Dropdown */
      .ek-dropdown{
        background:${base.surface};border:1px solid ${base.lineMid};
        border-radius:14px;box-shadow:0 20px 48px rgba(0,0,0,0.14),0 4px 12px rgba(0,0,0,0.06);
        overflow:hidden;animation:scaleIn .15s ease;transform-origin:top center;
      }
      .ek-dropdown-item{
        padding:10px 14px;font-size:13px;color:${base.ink};
        cursor:pointer;transition:background .1s;display:flex;align-items:center;gap:10px;
      }
      .ek-dropdown-item:hover{background:${base.surfaceEl}}

      /* Topbar */
      .ek-topbar{
        background:${base.surface};border-bottom:1px solid ${base.line};
        height:56px;display:flex;align-items:center;
        padding:0 24px;gap:12px;
        position:sticky;top:0;z-index:8;flex-shrink:0;
      }

      /* Tag pill */
      .ek-tag{
        display:inline-flex;align-items:center;gap:4px;
        padding:3px 9px;border-radius:6px;
        font-size:11px;font-weight:600;
        font-family:'JetBrains Mono',monospace;letter-spacing:0.04em;
      }

      /* Input base */
      .ek-input{
        width:100%;height:40px;border-radius:10px;
        border:1.5px solid ${base.line};background:${base.surface};
        color:${base.ink};font-size:13px;padding:0 12px;
        transition:border-color .15s,box-shadow .15s;outline:none;
      }
      .ek-input:focus{border-color:${base.brand};box-shadow:0 0 0 3px rgba(${base.brandRgb},0.15)}
      .ek-input::placeholder{color:${base.inkMuted}}

      /* Responsive form grids */
      .ek-form-3col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
      .ek-form-2col{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      @media(max-width:600px){
        .ek-form-3col{grid-template-columns:1fr!important}
        .ek-form-2col{grid-template-columns:1fr!important}
        .ek-tasks-form-grid{grid-template-columns:1fr!important}
        .ek-tasks-form-grid2{grid-template-columns:1fr 1fr!important}
        /* Prevent iOS zoom on input focus - must be 16px */
        input,select,textarea{font-size:16px!important}
        input[type="number"]{font-size:16px!important}
      }

      /* Settings mobile */
      @media(max-width:768px){
        .ek-settings-sidebar{display:none!important}
        .ek-settings-tabs-mobile{display:block!important}
      }

      /* Analytics mobile */
      .ek-analytics-tabs{display:flex;gap:6px;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:2px}
      .ek-analytics-tabs::-webkit-scrollbar{display:none}
      .ek-analytics-chart-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
      .ek-analytics-stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
      @media(max-width:768px){
        .ek-analytics-chart-grid{grid-template-columns:1fr!important}
        .ek-analytics-stat-row{grid-template-columns:repeat(2,1fr)!important;gap:8px!important}
        .ek-analytics-hero{grid-template-columns:1fr!important}
      }
      @media(max-width:480px){
        .ek-analytics-stat-row{grid-template-columns:1fr 1fr!important;gap:6px!important}
      }
      .ek-contacts-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;align-items:start;width:100%;box-sizing:border-box}
      .ek-contact-card{
        background:${base.surface};border:1.5px solid ${base.line};border-radius:14px;
        padding:16px 18px;cursor:pointer;
        transition:all .18s ease;
        box-shadow:0 1px 4px rgba(0,0,0,0.04);
        height:fit-content;
      }
      .ek-contact-card:hover{
        border-color:${base.brand};
        transform:translateY(-2px);
        box-shadow:0 8px 24px rgba(${base.brandRgb},0.1),0 4px 8px rgba(0,0,0,0.06);
      }
    `;
  }, [dark, themeId]);
  return null;
}
