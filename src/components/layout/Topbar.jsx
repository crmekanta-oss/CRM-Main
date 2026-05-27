import React, { useState, useEffect, useRef } from "react";
import { F_BODY, F_MONO, F } from "../../theme/index.js";
import { Ic, P, Avatar, Badge } from "../ui/index.jsx";
import { OnlineAvatarCluster } from "./PresencePanel.jsx";
import { can } from "../../constants.js";
import { today } from "../../utils.js";

export function Topbar({ title, search, setSearch, user, onAdd, onExportAll, onExportFiltered, fLen, aLen, onMenuToggle, T, todayCount, dateFilter, setDateFilter, dateType, setDateType, todayFunnels = [], notifCount = 0, onNotifClick, onImportCSV, onlineUsers = [] }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const h = e => { if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const now = new Date();
  const dayName = now.toLocaleDateString("en-IN", { weekday: "long" });
  const dateStr = now.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="ek-topbar">
      {/* Mobile menu */}
      <button onClick={onMenuToggle} className="ek-mobile-menu ek-show-mobile"
        style={{ background: T.surfaceEl, border: `1.5px solid ${T.line}`, cursor: "pointer", color: T.inkSub, padding: 0, flexShrink: 0, display: "none", alignItems: "center", justifyContent: "center", borderRadius: 10, width: 38, height: 38, transition: "all .14s" }}
        onMouseEnter={e => e.currentTarget.style.background = T.surfaceHover}
        onMouseLeave={e => e.currentTarget.style.background = T.surfaceEl}>
        <Ic d={P.menu} sz={18} color={T.inkSub} sw={2} />
      </button>

      {/* Title */}
      <div style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <h1 style={{ fontSize: 16, fontWeight: 800, color: T.ink, margin: 0, letterSpacing: "-0.4px", lineHeight: 1.2 }}>{title}</h1>
        <div className="ek-topbar-sub" style={{ fontSize: 10, fontFamily: F_MONO, color: T.inkMuted, letterSpacing: "0.02em", lineHeight: 1.3, marginTop: 1 }}>
          {dayName} · {dateStr}
        </div>
      </div>

      {/* Search */}
      <div className="ek-topbar-search" style={{
        display: "flex", alignItems: "center", gap: 8,
        background: searchFocused ? T.surface : T.surfaceEl,
        border: `1.5px solid ${searchFocused ? T.brand : T.line}`,
        borderRadius: 10, padding: "0 12px", height: 38,
        minWidth: 160, maxWidth: 260, flex: 1, marginLeft: 8,
        transition: "all .15s",
        boxShadow: searchFocused ? `0 0 0 3px rgba(${T.brandRgb},0.12)` : "none",
      }}>
        <Ic d={P.search} sz={14} color={searchFocused ? T.brand : T.inkMuted} />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search leads…"
          style={{ border: "none", outline: "none", background: "transparent", color: T.ink, fontSize: 13, fontFamily: F_BODY, width: "100%", fontWeight: 500 }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ background: T.surfaceEl, border: "none", cursor: "pointer", color: T.inkMuted, padding: 0, display: "flex", borderRadius: 4, width: 18, height: 18, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Ic d={P.close} sz={10} color={T.inkMuted} />
          </button>
        )}
      </div>

      <div style={{ flex: 1 }} />

      {/* Count badge */}
      <div className="ek-hide-mobile" style={{ fontSize: 11, color: T.inkMuted, fontFamily: F_MONO, padding: "5px 10px", background: T.surfaceEl, borderRadius: 8, border: `1.5px solid ${T.line}`, whiteSpace: "nowrap", fontWeight: 500 }}>
        {fLen} / {aLen} leads
      </div>

      {/* Online users cluster */}
      {onlineUsers.length > 0 && (
        <div className="ek-hide-mobile" style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", background: T.surfaceEl, borderRadius: 20, border: `1.5px solid ${T.line}` }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", animation: "pulse 2s ease infinite", boxShadow: "0 0 0 2px #10b98120" }} />
          <OnlineAvatarCluster users={onlineUsers} T={T} />
          <span style={{ fontSize: 11, fontFamily: "JetBrains Mono,monospace", color: T.inkMuted, letterSpacing: "0.04em", fontWeight: 500 }}>
            {onlineUsers.length} online
          </span>
        </div>
      )}

      {/* Add button */}
      {can(user, "create") && (
        <button onClick={onAdd} style={{
          height: 38, padding: "0 16px", borderRadius: 10,
          background: T.brand, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 7,
          fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: F_BODY,
          transition: "all .14s", flexShrink: 0,
          boxShadow: `0 3px 10px ${T.brand}44`,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = T.brandHover; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 6px 16px ${T.brand}44`; }}
          onMouseLeave={e => { e.currentTarget.style.background = T.brand; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 3px 10px ${T.brand}44`; }}>
          <Ic d={P.plus} sz={14} color="#fff" sw={2.5} />
          <span className="ek-hide-mobile" style={{ display: "flex" }}>New Lead</span>
        </button>
      )}

      {/* Notifications */}
      <button onClick={onNotifClick} title="Notifications" style={{
        position: "relative", width: 38, height: 38, borderRadius: 10,
        background: "transparent", border: `1.5px solid ${T.line}`,
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all .14s", flexShrink: 0,
      }}
        onMouseEnter={e => { e.currentTarget.style.background = T.surfaceEl; e.currentTarget.style.borderColor = T.lineMid; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.line; }}>
        <Ic d={P.bell} sz={16} color={T.inkSub} />
        {notifCount > 0 && (
          <span style={{
            position: "absolute", top: -4, right: -4,
            minWidth: 17, height: 17, borderRadius: 9,
            background: "#ef4444", color: "#fff",
            fontSize: 9, fontWeight: 800, fontFamily: F_MONO,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `2px solid ${T.surface}`, padding: "0 3px",
          }}>{notifCount > 99 ? "99+" : notifCount}</span>
        )}
      </button>

      {/* More menu */}
      <div ref={moreRef} style={{ position: "relative" }}>
        <button onClick={() => setMoreOpen(x => !x)} title="More options" style={{
          width: 38, height: 38, borderRadius: 10,
          background: moreOpen ? T.brandSubtle : "transparent",
          border: `1.5px solid ${moreOpen ? T.brand : T.line}`,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .14s", flexShrink: 0,
        }}
          onMouseEnter={e => { if (!moreOpen) { e.currentTarget.style.background = T.surfaceEl; e.currentTarget.style.borderColor = T.lineMid; } }}
          onMouseLeave={e => { if (!moreOpen) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.line; } }}>
          <Ic d={P.more} sz={16} color={moreOpen ? T.brand : T.inkSub} />
        </button>
        {moreOpen && (
          <div className="ek-dropdown" style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, minWidth: 210, zIndex: 100 }}>
            <div style={{ padding: "6px 0" }}>
              {can(user, "export") && <>
                <div className="ek-dropdown-item" onClick={() => { onExportAll(); setMoreOpen(false); }}>
                  <Ic d={P.dl} sz={14} color={T.inkMuted} />
                  <span style={{ fontSize: 13, color: T.ink, fontWeight: 500 }}>Export all ({aLen})</span>
                </div>
                <div className="ek-dropdown-item" onClick={() => { onExportFiltered(); setMoreOpen(false); }}>
                  <Ic d={P.filter} sz={14} color={T.inkMuted} />
                  <span style={{ fontSize: 13, color: T.ink, fontWeight: 500 }}>Export filtered ({fLen})</span>
                </div>
              </>}
              {can(user, "create") && (
                <div className="ek-dropdown-item" onClick={() => { onImportCSV && onImportCSV(); setMoreOpen(false); }}>
                  <Ic d={P.up} sz={14} color={T.inkMuted} />
                  <span style={{ fontSize: 13, color: T.ink, fontWeight: 500 }}>Import CSV</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
