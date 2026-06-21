const fs = require('fs');
const path = require('path');

// V8 HTML content - will be built in parts
let html = '';

function append(content) {
    html += content;
}

// ============================================================
// Part 1: HTML Head with all CSS
// ============================================================
append(`<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>李阳 - AI产品经理 / 产品经理 / 产品运营</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <!-- AOS 滚动动画 -->
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
    <style>
    /* =============================================
       CSS 变量（浅色 / 深色 双主题）
       ============================================= */
    :root, [data-theme="light"] {
        --blue:      #3B82F6;
        --blue-deep: #2563EB;
        --green:     #10B981;
        --orange:    #F59E0B;
        --purple:    #8B5CF6;
        --pink:      #EC4899;
        --red:       #EF4444;
        --indigo:    #6366F1;

        --bg:        #F8FAFC;
        --bg-card:   #FFFFFF;
        --bg-glass:  rgba(255,255,255,0.72);

        --text:      #0F172A;
        --text-2:    #64748B;
        --text-3:    #94A3B8;
        --border:    rgba(0,0,0,0.07);

        --nav-h:     64px;
        --r-xl:      24px;
        --r-lg:      18px;
        --r-md:      12px;
        --r-pill:    999px;

        --sh-card:   0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06);
        --sh-hover:  0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.05);
        --sh-float:  0 16px 48px rgba(0,0,0,0.18);
        --ease:      cubic-bezier(0.25, 0.46, 0.45, 0.94);
        --t:         all 0.3s var(--ease);
    }

    /* ---- 深色主题 ---- */
    [data-theme="dark"] {
        --blue:      #60A5FA;
        --blue-deep: #3B82F6;
        --green:     #34D399;
        --orange:    #FBBF24;
        --purple:    #A78BFA;
        --pink:      #F472B6;
        --red:       #F87171;
        --indigo:    #818CF8;

        --bg:        #0D1117;
        --bg-card:   #161B22;
        --bg-glass:  rgba(22,27,34,0.72);

        --text:      #E6EDF3;
        --text-2:    #8B949E;
        --text-3:    #484F58;
        --border:    rgba(255,255,255,0.08);

        --sh-card:   0 1px 3px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.3);
        --sh-hover:  0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2);
        --sh-float:  0 16px 48px rgba(0,0,0,0.6);
    }

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

    html { scroll-behavior: smooth; }

    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", sans-serif;
        background: var(--bg);
        color: var(--text);
        line-height: 1.6;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        transition: background 0.4s, color 0.4s;
    }

    /* =============================================
       阅读进度条 V8 NEW
       ============================================= */
    #readingProgressBar {
        position: fixed; top: 0; left: 0;
        width: 0%; height: 3px;
        background: linear-gradient(90deg, var(--blue), var(--purple), var(--pink));
        z-index: 10001;
        transition: width 0.15s ease;
        box-shadow: 0 0 8px rgba(59,130,246,0.4);
    }

    /* =============================================
       回到顶部按钮 V8 NEW
       ============================================= */
    #backToTop {
        position: fixed;
        bottom: 32px; right: 32px;
        width: 48px; height: 48px;
        border-radius: 50%;
        background: var(--bg-card);
        border: 1px solid var(--border);
        box-shadow: var(--sh-float);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s var(--ease);
        z-index: 999;
        color: var(--text-2);
        font-size: 20px;
    }
    #backToTop.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    #backToTop:hover {
        background: var(--blue);
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(59,130,246,0.3);
    }
    [data-theme="dark"] #backToTop {
        background: var(--bg-card);
        border-color: rgba(255,255,255,0.1);
    }

    /* =============================================
       毛玻璃导航栏
       ============================================= */
    .nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
        height: var(--nav-h);
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 48px;
        background: rgba(248,250,252,0.82);
        backdrop-filter: blur(24px) saturate(180%);
        -webkit-backdrop-filter: blur(24px) saturate(180%);
        border-bottom: 1px solid rgba(0,0,0,0.05);
        transition: background 0.3s, box-shadow 0.3s;
    }
    [data-theme="dark"] .nav {
        background: rgba(13,17,23,0.82);
        border-bottom-color: rgba(255,255,255,0.06);
    }
    .nav.scrolled {
        box-shadow: 0 1px 12px rgba(0,0,0,0.08);
    }
    .nav-logo {
        font-size: 20px; font-weight: 800; letter-spacing: -0.5px;
        background: linear-gradient(135deg, var(--blue), var(--purple));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    .nav-links { display: flex; gap: 6px; }
    .nav-link {
        padding: 8px 18px;
        border-radius: var(--r-pill);
        font-size: 13.5px; font-weight: 600;
        color: var(--text-2);
        text-decoration: none;
        transition: var(--t);
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .nav-link:hover { color: var(--blue); background: rgba(59,130,246,0.06); }
    .nav-link.active {
        color: white;
        background: linear-gradient(135deg, var(--blue), var(--blue-deep));
        box-shadow: 0 2px 8px rgba(59,130,246,0.3);
    }
    .nav-right { display: flex; align-items: center; gap: 12px; }

    /* 主题切换按钮 */
    .theme-toggle {
        width: 40px; height: 40px;
        border-radius: 50%;
        border: 1px solid var(--border);
        background: var(--bg-card);
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        font-size: 18px;
        transition: var(--t);
        position: relative;
        overflow: hidden;
    }
    .theme-toggle:hover { transform: rotate(30deg) scale(1.1); border-color: var(--blue); }
    .theme-toggle .icon-sun { display: inline; }
    .theme-toggle .icon-moon { display: none; }
    [data-theme="dark"] .theme-toggle .icon-sun { display: none; }
    [data-theme="dark"] .theme-toggle .icon-moon { display: inline; }

    /* 快捷键提示 V8 NEW */
    .nav-shortcut-hint {
        font-size: 11px; color: var(--text-3);
        padding: 4px 10px;
        border-radius: var(--r-pill);
        background: rgba(0,0,0,0.03);
        display: flex; align-items: center; gap: 4px;
    }
    [data-theme="dark"] .nav-shortcut-hint { background: rgba(255,255,255,0.05); }
    .nav-shortcut-hint kbd {
        padding: 1px 5px;
        border-radius: 4px;
        font-size: 10.5px;
        font-weight: 700;
        background: var(--bg-card);
        border: 1px solid var(--border);
        font-family: inherit;
    }

    /* =============================================
       Ripple 效果 V8 NEW
       ============================================= */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(59,130,246,0.25);
        transform: scale(0);
        animation: ripple-anim 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-anim {
        to { transform: scale(4); opacity: 0; }
    }

    /* =============================================
       Hero 区域
       ============================================= */
    .hero-section {
        min-height: 100vh;
        display: flex; align-items: center; justify-content: center;
        padding: calc(var(--nav-h) + 40px) 48px 60px;
        position: relative;
        overflow: hidden;
    }
    .hero-grid {
        max-width: 1100px; width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
    }
    .hero-left { position: relative; z-index: 1; }
    .hero-greeting {
        font-size: 15px; font-weight: 600; color: var(--blue);
        letter-spacing: 2px; text-transform: uppercase;
        margin-bottom: 12px;
    }
    .hero-name {
        font-size: clamp(38px, 5.5vw, 60px);
        font-weight: 900; letter-spacing: -2px; line-height: 1.1;
        margin-bottom: 16px;
    }
    .hero-name-gradient {
        background: linear-gradient(135deg, var(--blue), var(--purple), var(--pink));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    .hero-role {
        font-size: clamp(16px, 2vw, 20px);
        color: var(--text-2);
        margin-bottom: 20px; min-height: 30px;
    }
    .hero-desc {
        font-size: 15.5px; color: var(--text-2); line-height: 1.8;
        margin-bottom: 28px; max-width: 460px;
    }
    .hero-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
    .hero-tag {
        padding: 6px 14px;
        border-radius: var(--r-pill);
        font-size: 12.5px; font-weight: 600;
        transition: var(--t);
        cursor: default;
    }
    .hero-cta {
        display: flex; gap: 14px; flex-wrap: wrap;
    }

    /* 社交链接 V8 NEW */
    .hero-social-links {
        display: flex; gap: 10px; margin-top: 24px;
    }
    .social-link-btn {
        width: 40px; height: 40px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        background: var(--bg-card);
        border: 1px solid var(--border);
        color: var(--text-2);
        text-decoration: none;
        font-size: 16px;
        transition: var(--t);
        position: relative;
        overflow: hidden;
    }
    .social-link-btn:hover {
        transform: translateY(-3px);
        box-shadow: var(--sh-hover);
    }
    .social-link-btn.github:hover { background: #24292e; color: white; border-color: #24292e; }
    .social-link-btn.zhihu:hover { background: #0066FF; color: white; border-color: #0066FF; }
    .social-link-btn.juejin:hover { background: #1E80FF; color: white; border-color: #1E80FF; }
    .social-link-btn.email:hover { background: var(--blue); color: white; border-color: var(--blue); }

    .btn {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 13px 28px;
        border-radius: var(--r-pill);
        font-size: 14.5px; font-weight: 700;
        text-decoration: none;
        transition: var(--t);
        cursor: pointer; border: none;
        position: relative;
        overflow: hidden;
    }
    .btn-primary {
        background: linear-gradient(135deg, var(--blue), var(--blue-deep));
        color: white;
        box-shadow: 0 4px 16px rgba(59,130,246,0.3);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(59,130,246,0.4); }
    .btn-ghost {
        background: transparent;
        color: var(--text-2);
        border: 1.5px solid var(--border);
    }
    .btn-ghost:hover { border-color: var(--blue); color: var(--blue); background: rgba(59,130,246,0.04); }

    .hero-right {
        position: relative;
        display: flex; align-items: center; justify-content: center;
        z-index: 1;
    }
    .hero-avatar-frame {
        position: relative;
        width: 340px; height: 340px;
    }
    .hero-avatar-ring {
        position: absolute; inset: -12px;
        border-radius: 50%;
        border: 2px solid rgba(59,130,246,0.15);
        animation: ring-pulse 3s ease-in-out infinite;
    }
    @keyframes ring-pulse {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.04); opacity: 1; }
    }
    .hero-avatar {
        width: 100%; height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--blue), var(--purple));
        display: flex; align-items: center; justify-content: center;
        font-size: 96px; font-weight: 900; color: white;
        box-shadow: var(--sh-float);
        transition: transform 0.4s var(--ease);
        overflow: hidden;
    }
    .hero-avatar img {
        width: 100%; height: 100%;
        object-fit: cover; border-radius: 50%;
    }
    .hero-avatar:hover { transform: scale(1.03); }

    .hero-contact-pills {
        position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%);
        display: flex; gap: 8px;
    }
    .hero-contact-item {
        display: flex; align-items: center; gap: 7px;
    }
    .hero-contact-item svg { width: 15px; height: 15px; fill: var(--text-3); flex-shrink: 0; }

    /* =============================================
       Bento Grid 数据指标卡
       ============================================= */
    .bento-section {
        max-width: 1120px;
        margin: 0 auto;
        padding: 0 32px 80px;
    }
    .bento-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: auto auto;
        gap: 16px;
    }
    .bento-card {
        background: var(--bg-card);
        border-radius: var(--r-xl);
        padding: 28px;
        box-shadow: var(--sh-card);
        transition: var(--t);
        position: relative;
        overflow: hidden;
    }
    .bento-card:hover {
        box-shadow: var(--sh-hover);
        transform: translateY(-3px);
    }
    .bento-w2 { grid-column: span 2; }
    .bento-w3 { grid-column: span 3; }
    .bento-w6 { grid-column: span 6; }

    .bento-stat-num {
        font-size: 48px; font-weight: 900; line-height: 1;
        letter-spacing: -2px;
        margin-bottom: 6px;
    }
    .bento-stat-label {
        font-size: 13.5px; color: var(--text-2); font-weight: 500;
        margin-bottom: 4px;
    }
    .bento-stat-sub { font-size: 12px; color: var(--text-3); }
    .bento-badge {
        position: absolute; top: 20px; right: 20px;
        padding: 4px 10px;
        border-radius: var(--r-pill);
        font-size: 11px; font-weight: 700;
        letter-spacing: 0.5px;
    }

    /* 荣誉横排 */
    .honor-scroll { display: flex; gap: 12px; flex-wrap: wrap; }
    .honor-pill {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 10px 18px;
        border-radius: var(--r-pill);
        font-size: 13.5px; font-weight: 600;
        transition: var(--t); cursor: default;
    }
    .honor-pill:hover { transform: translateY(-2px); box-shadow: var(--sh-hover); }

    /* =============================================
       通用区块标题
       ============================================= */
    .section-head { margin-bottom: 48px; }
    .section-head-tag {
        display: inline-block; padding: 5px 14px;
        border-radius: var(--r-pill);
        font-size: 12px; font-weight: 700; letter-spacing: 1px;
        text-transform: uppercase;
        background: rgba(59,130,246,0.08);
        color: var(--blue);
        margin-bottom: 14px;
    }
    .section-head h2 {
        font-size: clamp(28px, 4vw, 38px);
        font-weight: 800; letter-spacing: -1px; line-height: 1.2;
        color: var(--text);
        margin-bottom: 10px;
    }
    .section-head p { font-size: 16px; color: var(--text-2); }

    /* =============================================
       垂直时间轴
       ============================================= */
    .timeline-wrap { position: relative; padding-left: 0; }
    .timeline-line {
        position: absolute;
        left: 120px; top: 24px; bottom: 24px;
        width: 2px;
        background: linear-gradient(to bottom, var(--blue), var(--purple), var(--green));
        border-radius: 1px;
    }
    .tl-item {
        display: grid;
        grid-template-columns: 120px 28px 1fr;
        gap: 0 20px;
        margin-bottom: 40px;
        align-items: start;
    }
    .tl-date-col { text-align: right; padding-top: 18px; }
    .tl-date-text { font-size: 12.5px; font-weight: 600; color: var(--text-2); line-height: 1.4; }
    .tl-dot-col { display: flex; flex-direction: column; align-items: center; padding-top: 18px; }
    .tl-dot {
        width: 14px; height: 14px; border-radius: 50%;
        background: var(--blue-deep);
        border: 3px solid white;
        box-shadow: 0 0 0 2px var(--blue);
        flex-shrink: 0; position: relative; z-index: 1;
    }
    [data-theme="dark"] .tl-dot { border-color: var(--bg-card); }

    .tl-card {
        background: var(--bg-card);
        border-radius: var(--r-lg);
        padding: 24px 28px;
        box-shadow: var(--sh-card);
        transition: var(--t);
        border-left: 3px solid var(--blue);
        position: relative;
    }
    .tl-card:hover { box-shadow: var(--sh-hover); transform: translateX(4px); }
    .tl-card.green  { border-left-color: var(--green); }
    .tl-card.orange { border-left-color: var(--orange); }
    .tl-card.purple { border-left-color: var(--purple); }
    .tl-card.indigo { border-left-color: var(--indigo); }

    .tl-title { font-size: 17px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
    .tl-org { font-size: 14px; color: var(--text-2); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
    .tl-org-tag {
        display: inline-block; padding: 2px 8px;
        background: rgba(59,130,246,0.07); color: var(--blue);
        border-radius: 4px; font-size: 11.5px; font-weight: 600;
    }
    .tl-list { list-style: none; padding: 0; }
    .tl-list li {
        padding: 6px 0 6px 20px; position: relative;
        font-size: 14px; line-height: 1.75; color: var(--text-2);
    }
    .tl-list li::before {
        content: ''; position: absolute; left: 0; top: 14px;
        width: 6px; height: 6px; border-radius: 50%; background: var(--blue);
    }
    .tl-list li strong { color: var(--text); font-weight: 600; }

    /* =============================================
       ECharts 雷达图
       ============================================= */
    .radar-section {
        max-width: 1120px; margin: 0 auto;
        padding: 0 32px 80px;
    }
    .radar-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        align-items: start;
    }
    .radar-card {
        background: var(--bg-card);
        border-radius: var(--r-xl);
        padding: 32px;
        box-shadow: var(--sh-card);
        transition: var(--t);
    }
    .radar-card:hover { box-shadow: var(--sh-hover); }
    #radarChart { width: 100%; height: 380px; }

    .skill-bars-area { display: flex; flex-direction: column; gap: 20px; }
    .skill-bar-row { }
    .skill-bar-head {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 8px;
    }
    .skill-bar-name { font-size: 14px; font-weight: 600; color: var(--text); }
    .skill-bar-val  { font-size: 13px; font-weight: 700; color: var(--blue); }
    .skill-bar-track {
        height: 8px; border-radius: 4px;
        background: rgba(0,0,0,0.05);
        overflow: hidden;
    }
    [data-theme="dark"] .skill-bar-track { background: rgba(255,255,255,0.06); }
    .skill-bar-fill {
        height: 100%; border-radius: 4px;
        background: linear-gradient(90deg, var(--blue), var(--purple));
        width: 0%;
        transition: width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* =============================================
       探索页 - 项目卡片
       ============================================= */
    .explore-section {
        max-width: 1120px; margin: 0 auto;
        padding: 0 32px 80px;
    }
    .explore-tabs {
        display: flex; gap: 8px; margin-bottom: 36px; flex-wrap: wrap;
    }
    .explore-tab {
        padding: 9px 20px;
        border-radius: var(--r-pill);
        font-size: 13px; font-weight: 600;
        color: var(--text-2);
        background: transparent;
        border: 1.5px solid transparent;
        cursor: pointer;
        transition: var(--t);
    }
    .explore-tab:hover { color: var(--blue); border-color: rgba(59,130,246,0.2); }
    .explore-tab.active {
        color: white;
        background: linear-gradient(135deg, var(--blue), var(--blue-deep));
        border-color: transparent;
        box-shadow: 0 2px 8px rgba(59,130,246,0.3);
    }

    .project-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
    }
    .project-card {
        background: var(--bg-card);
        border-radius: var(--r-xl);
        overflow: hidden;
        box-shadow: var(--sh-card);
        transition: var(--t);
        cursor: pointer;
        position: relative;
    }
    .project-card:hover {
        box-shadow: var(--sh-hover);
        transform: translateY(-4px);
    }
    .project-card-img {
        height: 180px;
        display: flex; align-items: center; justify-content: center;
        font-size: 48px; color: white; font-weight: 800;
        position: relative; overflow: hidden;
    }
    .project-card-img::after {
        content: ''; position: absolute; inset: 0;
        background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3) 100%);
    }
    .project-card-body { padding: 22px 24px 24px; }
    .project-card-title { font-size: 17px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
    .project-card-desc { font-size: 13.5px; color: var(--text-2); line-height: 1.7; margin-bottom: 14px; }
    .project-card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .project-card-tag {
        padding: 3px 10px;
        border-radius: var(--r-pill);
        font-size: 11px; font-weight: 600;
    }

    /* =============================================
       项目详情抽屉 V8 ENHANCED - Case Study 格式
       ============================================= */
    .drawer-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.4);
        backdrop-filter: blur(4px);
        z-index: 2000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.35s;
    }
    .drawer-overlay.open { opacity: 1; visibility: visible; }
    .drawer {
        position: fixed;
        top: 0; right: 0;
        width: 680px; max-width: 92vw;
        height: 100vh;
        background: var(--bg-card);
        box-shadow: -8px 0 48px rgba(0,0,0,0.15);
        z-index: 2001;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        overflow-y: auto;
        overflow-x: hidden;
    }
    .drawer.open { transform: translateX(0); }
    .drawer-close {
        position: sticky; top: 0; z-index: 10;
        float: right;
        margin: 20px 20px 0 0;
        width: 40px; height: 40px;
        border-radius: 50%;
        background: var(--bg-glass);
        backdrop-filter: blur(12px);
        border: 1px solid var(--border);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        font-size: 18px; color: var(--text-2);
        transition: var(--t);
    }
    .drawer-close:hover { background: var(--red); color: white; }

    .drawer-hero {
        padding: 48px 40px 32px;
        background: linear-gradient(135deg, var(--blue), var(--purple));
        color: white;
        position: relative;
    }
    .drawer-hero-bg {
        position: absolute; inset: 0;
        opacity: 0.08;
        background: radial-gradient(circle at 30% 50%, white 0%, transparent 60%);
    }
    .drawer-hero-icon { font-size: 40px; margin-bottom: 16px; position: relative; }
    .drawer-hero-title { font-size: 26px; font-weight: 800; line-height: 1.3; margin-bottom: 10px; position: relative; }
    .drawer-hero-sub { font-size: 14px; opacity: 0.85; line-height: 1.6; position: relative; }

    .drawer-body { padding: 32px 40px 48px; }

    /* V8 NEW - Case Study 结构化格式 */
    .case-study-section {
        margin-bottom: 32px;
    }
    .case-study-section h3 {
        font-size: 16px; font-weight: 700; color: var(--text);
        margin-bottom: 14px;
        display: flex; align-items: center; gap: 8px;
    }
    .case-study-section h3 .cs-icon {
        width: 28px; height: 28px;
        border-radius: 8px;
        display: flex; align-items: center; justify-content: center;
        font-size: 14px;
    }
    .case-study-text {
        font-size: 14px; color: var(--text-2); line-height: 1.8;
    }
    .case-study-list {
        list-style: none; padding: 0;
    }
    .case-study-list li {
        padding: 8px 0 8px 24px;
        font-size: 14px; color: var(--text-2); line-height: 1.7;
        position: relative;
    }
    .case-study-list li::before {
        content: ''; position: absolute; left: 0; top: 16px;
        width: 8px; height: 8px; border-radius: 50%;
        background: var(--blue);
    }
    .case-study-metrics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-top: 16px;
    }
    .case-metric-card {
        background: var(--bg);
        border-radius: var(--r-md);
        padding: 16px;
        text-align: center;
    }
    .case-metric-num {
        font-size: 28px; font-weight: 900; color: var(--blue);
        letter-spacing: -1px;
    }
    .case-metric-label {
        font-size: 12px; color: var(--text-3); margin-top: 4px;
    }

    /* V8 NEW - 项目视觉展示区 */
    .drawer-visual-placeholder {
        width: 100%;
        height: 200px;
        border-radius: var(--r-lg);
        background: var(--bg);
        border: 2px dashed var(--border);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--text-3);
        font-size: 14px;
        margin: 20px 0;
        transition: var(--t);
        cursor: pointer;
    }
    .drawer-visual-placeholder:hover {
        border-color: var(--blue);
        color: var(--blue);
        background: rgba(59,130,246,0.03);
    }
    .drawer-visual-placeholder .visual-icon { font-size: 40px; margin-bottom: 8px; }

    .drawer-tech-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
    .drawer-tech-tag {
        padding: 5px 14px;
        border-radius: var(--r-pill);
        font-size: 12px; font-weight: 600;
    }

    /* =============================================
       AI 匹配分析面板
       ============================================= */
    .ai-section {
        max-width: 1120px; margin: 0 auto;
        padding: 0 32px 80px;
    }
    .ai-panel {
        background: var(--bg-card);
        border-radius: var(--r-xl);
        padding: 40px;
        box-shadow: var(--sh-card);
        transition: var(--t);
    }
    .ai-panel:hover { box-shadow: var(--sh-hover); }
    .ai-top { display: flex; gap: 32px; flex-wrap: wrap; }

    .ai-input-area { flex: 1; min-width: 300px; }
    .ai-input-area label {
        display: block; font-size: 14px; font-weight: 600; color: var(--text);
        margin-bottom: 10px;
    }
    .ai-textarea {
        width: 100%; min-height: 160px;
        padding: 16px;
        border-radius: var(--r-lg);
        border: 1.5px solid var(--border);
        background: var(--bg);
        color: var(--text);
        font-size: 14px; line-height: 1.7;
        font-family: inherit;
        resize: vertical;
        transition: border-color 0.3s;
    }
    .ai-textarea:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }

    .ai-config { width: 280px; }
    .ai-config label {
        display: block; font-size: 13px; font-weight: 600; color: var(--text-2);
        margin-bottom: 8px;
    }
    .ai-select {
        width: 100%; padding: 10px 14px;
        border-radius: var(--r-md);
        border: 1.5px solid var(--border);
        background: var(--bg);
        color: var(--text);
        font-size: 14px;
        cursor: pointer;
        margin-bottom: 16px;
        transition: border-color 0.3s;
    }
    .ai-select:focus { outline: none; border-color: var(--blue); }

    .ai-key-input {
        width: 100%; padding: 10px 14px;
        border-radius: var(--r-md);
        border: 1.5px solid var(--border);
        background: var(--bg);
        color: var(--text);
        font-size: 13px;
        margin-bottom: 12px;
        transition: border-color 0.3s;
    }
    .ai-key-input:focus { outline: none; border-color: var(--blue); }

    .ai-btn {
        width: 100%; padding: 14px;
        border-radius: var(--r-lg);
        border: none;
        background: linear-gradient(135deg, var(--blue), var(--purple));
        color: white;
        font-size: 15px; font-weight: 700;
        cursor: pointer;
        transition: var(--t);
        position: relative;
        overflow: hidden;
    }
    .ai-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(59,130,246,0.3); }
    .ai-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    /* 半圆仪表盘 */
    .gauge-wrap {
        display: flex; flex-direction: column; align-items: center;
        margin: 32px 0;
    }
    .gauge {
        position: relative; width: 200px; height: 100px;
        overflow: hidden;
    }
    .gauge-bg, .gauge-fill {
        position: absolute; inset: 0;
        border-radius: 200px 200px 0 0;
    }
    .gauge-bg {
        background: var(--bg);
        border: 8px solid rgba(0,0,0,0.06);
        border-bottom: none;
    }
    [data-theme="dark"] .gauge-bg { border-color: rgba(255,255,255,0.06); }
    .gauge-fill {
        border: 8px solid var(--blue);
        border-bottom: none;
        transform-origin: bottom center;
        transform: rotate(225deg);
        transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .gauge-fill.green { border-color: var(--green); }
    .gauge-fill.orange { border-color: var(--orange); }
    .gauge-fill.red { border-color: var(--red); }
    .gauge-center {
        position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
        text-align: center; z-index: 2;
    }
    .gauge-score { font-size: 42px; font-weight: 900; color: var(--text); line-height: 1; }
    .gauge-label { font-size: 13px; color: var(--text-2); margin-top: 4px; }

    /* 结果面板 */
    .result-panel {
        margin-top: 32px;
        padding: 28px;
        border-radius: var(--r-lg);
        background: var(--bg);
        display: none;
    }
    .result-panel.show { display: block; animation: fadeUp 0.5s; }
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .dim-row {
        display: flex; align-items: center; gap: 12px;
        margin-bottom: 10px;
    }
    .dim-name { width: 100px; font-size: 13px; font-weight: 600; color: var(--text-2); text-align: right; flex-shrink: 0; }
    .dim-bar-bg { flex: 1; height: 8px; border-radius: 4px; background: rgba(0,0,0,0.05); overflow: hidden; }
    [data-theme="dark"] .dim-bar-bg { background: rgba(255,255,255,0.06); }
    .dim-bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, var(--blue), var(--purple)); width: 0%; transition: width 1s 0.3s; }
    .dim-score { width: 36px; font-size: 13px; font-weight: 700; color: var(--blue); }

    .md-result {
        margin-top: 20px;
        padding: 20px;
        border-radius: var(--r-md);
        background: var(--bg-card);
        font-size: 14px; line-height: 1.8;
        color: var(--text-2);
    }
    .md-result h1, .md-result h2, .md-result h3 { color: var(--text); margin: 16px 0 8px; }
    .md-result h2 { font-size: 18px; }
    .md-result h3 { font-size: 16px; }
    .md-result p { margin-bottom: 10px; }
    .md-result ul, .md-result ol { padding-left: 20px; margin-bottom: 10px; }
    .md-result li { margin-bottom: 6px; }
    .md-result code {
        padding: 2px 6px; border-radius: 4px;
        background: rgba(59,130,246,0.08); color: var(--blue);
        font-size: 0.9em;
    }
    .md-result pre {
        padding: 16px; border-radius: var(--r-md);
        background: var(--bg); overflow-x: auto;
        margin: 12px 0;
    }
    .md-result pre code { background: none; padding: 0; color: var(--text); }
    .md-result blockquote {
        padding: 12px 16px;
        border-left: 3px solid var(--blue);
        background: rgba(59,130,246,0.04);
        border-radius: 0 var(--r-md) var(--r-md) 0;
        margin: 12px 0;
    }

    .kw-highlight {
        background: rgba(59,130,246,0.1);
        color: var(--blue);
        padding: 1px 5px;
        border-radius: 3px;
        font-weight: 600;
    }

    /* V8 NEW - AI 匹配闭环功能 */
    .ai-actions {
        display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap;
    }
    .ai-action-btn {
        padding: 10px 20px;
        border-radius: var(--r-pill);
        font-size: 13px; font-weight: 600;
        cursor: pointer;
        transition: var(--t);
        border: 1.5px solid var(--border);
        background: var(--bg-card);
        color: var(--text-2);
        display: flex; align-items: center; gap: 6px;
        position: relative;
        overflow: hidden;
    }
    .ai-action-btn:hover {
        border-color: var(--blue);
        color: var(--blue);
        transform: translateY(-2px);
    }
    .ai-action-btn.primary {
        background: linear-gradient(135deg, var(--blue), var(--purple));
        color: white;
        border-color: transparent;
    }
    .ai-action-btn.primary:hover {
        color: white;
        box-shadow: 0 4px 16px rgba(59,130,246,0.3);
    }

    /* =============================================
       Footer V8 ENHANCED - 社交链接 & 网站信息
       ============================================= */
    .site-footer {
        background: var(--bg-card);
        border-top: 1px solid var(--border);
        padding: 60px 48px 32px;
        margin-top: 40px;
    }
    .footer-grid {
        max-width: 1120px; margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 40px;
        margin-bottom: 40px;
    }
    .footer-brand-name {
        font-size: 20px; font-weight: 800;
        background: linear-gradient(135deg, var(--blue), var(--purple));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 12px;
    }
    .footer-brand-desc {
        font-size: 14px; color: var(--text-2); line-height: 1.7;
        margin-bottom: 20px;
    }

    /* V8 NEW - 社交链接 */
    .footer-social-links {
        display: flex; gap: 10px;
    }
    .footer-social-link {
        width: 38px; height: 38px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        background: var(--bg);
        color: var(--text-2);
        text-decoration: none;
        font-size: 16px;
        transition: var(--t);
    }
    .footer-social-link:hover {
        transform: translateY(-3px);
    }
    .footer-social-link.github:hover { background: #24292e; color: white; }
    .footer-social-link.zhihu:hover { background: #0066FF; color: white; }
    .footer-social-link.juejin:hover { background: #1E80FF; color: white; }
    .footer-social-link.email:hover { background: var(--blue); color: white; }

    .footer-col-title {
        font-size: 14px; font-weight: 700; color: var(--text);
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .footer-links { list-style: none; padding: 0; }
    .footer-links li { margin-bottom: 10px; }
    .footer-links a {
        font-size: 13.5px; color: var(--text-2);
        text-decoration: none;
        transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--blue); }

    .footer-bottom {
        max-width: 1120px; margin: 0 auto;
        padding-top: 24px;
        border-top: 1px solid var(--border);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
    }
    .footer-copy { font-size: 13px; color: var(--text-3); }

    /* V8 NEW - 网站构建信息面板 */
    .footer-build-info-toggle {
        font-size: 12px; color: var(--text-3);
        cursor: pointer;
        padding: 4px 10px;
        border-radius: var(--r-pill);
        transition: var(--t);
        display: flex; align-items: center; gap: 4px;
    }
    .footer-build-info-toggle:hover {
        color: var(--blue);
        background: rgba(59,130,246,0.06);
    }
    .footer-build-info {
        display: none;
        max-width: 1120px; margin: 0 auto;
        padding: 20px;
        border-radius: var(--r-md);
        background: var(--bg);
        margin-top: 16px;
        font-size: 12.5px;
        color: var(--text-2);
        line-height: 1.8;
    }
    .footer-build-info.show { display: block; animation: fadeUp 0.3s; }
    .footer-build-info code {
        padding: 1px 5px; border-radius: 3px;
        background: rgba(59,130,246,0.08); color: var(--blue);
        font-size: 0.9em;
    }
    .footer-build-badge {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 2px 8px; border-radius: var(--r-pill);
        font-size: 11px; font-weight: 600;
    }

    /* =============================================
       浮动按钮
       ============================================= */
    .fab-group {
        position: fixed;
        bottom: 32px; left: 32px;
        display: flex; flex-direction: column; gap: 10px;
        z-index: 998;
    }
    .fab {
        width: 48px; height: 48px;
        border-radius: 50%;
        background: var(--bg-card);
        border: 1px solid var(--border);
        box-shadow: var(--sh-float);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        font-size: 20px;
        transition: var(--t);
        color: var(--text-2);
        position: relative;
        overflow: hidden;
    }
    .fab:hover { transform: scale(1.1); box-shadow: var(--sh-hover); color: var(--blue); }

    /* =============================================
       Modal
       ============================================= */
    .modal-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(6px);
        z-index: 3000;
        display: flex; align-items: center; justify-content: center;
        opacity: 0; visibility: hidden;
        transition: all 0.3s;
    }
    .modal-overlay.open { opacity: 1; visibility: visible; }
    .modal {
        background: var(--bg-card);
        border-radius: var(--r-xl);
        padding: 40px;
        max-width: 520px; width: 92%;
        box-shadow: var(--sh-float);
        transform: translateY(20px) scale(0.95);
        transition: transform 0.35s;
        position: relative;
    }
    .modal-overlay.open .modal { transform: translateY(0) scale(1); }
    .modal-close {
        position: absolute; top: 16px; right: 16px;
        width: 36px; height: 36px;
        border-radius: 50%;
        border: none; background: var(--bg);
        cursor: pointer; font-size: 16px; color: var(--text-2);
        display: flex; align-items: center; justify-content: center;
        transition: var(--t);
    }
    .modal-close:hover { background: var(--red); color: white; }
    .modal h2 { font-size: 22px; font-weight: 800; color: var(--text); margin-bottom: 8px; }
    .modal p { font-size: 14px; color: var(--text-2); margin-bottom: 20px; }

    .upload-drop {
        border: 2px dashed var(--border);
        border-radius: var(--r-lg);
        padding: 32px;
        text-align: center;
        cursor: pointer;
        transition: var(--t);
        margin-bottom: 16px;
    }
    .upload-drop:hover { border-color: var(--blue); background: rgba(59,130,246,0.03); }
    .upload-drop-icon { font-size: 40px; margin-bottom: 8px; }
    .upload-drop-text { font-size: 14px; color: var(--text-2); }
    .upload-drop-sub { font-size: 12px; color: var(--text-3); margin-top: 4px; }

    /* =============================================
       Page 切换
       ============================================= */
    .page { display: none; }
    .page.active { display: block; animation: pageIn 0.4s ease; }
    @keyframes pageIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* =============================================
       AOS 自定义动画
       ============================================= */
    [data-aos="card-up"] {
        opacity: 0; transform: translateY(30px);
        transition: opacity 0.5s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    [data-aos="card-up"].aos-animate { opacity: 1; transform: translateY(0); }

    /* =============================================
       快捷键帮助面板 V8 NEW
       ============================================= */
    .shortcut-help-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(6px);
        z-index: 5000;
        display: flex; align-items: center; justify-content: center;
        opacity: 0; visibility: hidden;
        transition: all 0.3s;
    }
    .shortcut-help-overlay.open { opacity: 1; visibility: visible; }
    .shortcut-help-panel {
        background: var(--bg-card);
        border-radius: var(--r-xl);
        padding: 36px;
        max-width: 480px; width: 92%;
        box-shadow: var(--sh-float);
        transform: translateY(20px) scale(0.95);
        transition: transform 0.35s;
    }
    .shortcut-help-overlay.open .shortcut-help-panel { transform: translateY(0) scale(1); }
    .shortcut-help-title { font-size: 20px; font-weight: 800; color: var(--text); margin-bottom: 20px; }
    .shortcut-row {
        display: flex; justify-content: space-between; align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid var(--border);
    }
    .shortcut-row:last-child { border-bottom: none; }
    .shortcut-desc { font-size: 14px; color: var(--text-2); }
    .shortcut-keys { display: flex; gap: 4px; }
    .shortcut-key {
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 12px; font-weight: 700;
        background: var(--bg);
        border: 1px solid var(--border);
        color: var(--text);
        font-family: inherit;
    }

    /* =============================================
       响应式
       ============================================= */
    @media (max-width: 900px) {
        .nav { padding: 0 20px; }
        .hero-grid { grid-template-columns: 1fr; text-align: center; }
        .hero-left { order: 2; }
        .hero-right { order: 1; }
        .hero-avatar-frame { width: 200px; height: 200px; margin: 0 auto; }
        .hero-desc { margin: 0 auto 28px; }
        .hero-cta { justify-content: center; }
        .hero-social-links { justify-content: center; }
        .hero-tags { justify-content: center; }
        .bento-grid { grid-template-columns: repeat(2, 1fr); }
        .bento-w2, .bento-w3, .bento-w6 { grid-column: span 2; }
        .radar-grid { grid-template-columns: 1fr; }
        .tl-item { grid-template-columns: 60px 20px 1fr; }
        .timeline-line { left: 60px; }
        .tl-date-text { font-size: 11px; }
        .footer-grid { grid-template-columns: 1fr 1fr; }
        .drawer { width: 100vw; max-width: 100vw; }
        .ai-top { flex-direction: column; }
        .ai-config { width: 100%; }
        .case-study-metrics { grid-template-columns: 1fr; }
        .nav-shortcut-hint { display: none; }
    }
    @media (max-width: 600px) {
        .bento-grid { grid-template-columns: 1fr; }
        .bento-w2, .bento-w3, .bento-w6 { grid-column: span 1; }
        .footer-grid { grid-template-columns: 1fr; }
        .hero-section { padding-left: 20px; padding-right: 20px; }
        .bento-section, .radar-section, .explore-section, .ai-section { padding-left: 16px; padding-right: 16px; }
        .project-grid { grid-template-columns: 1fr; }
    }

    /* =============================================
       打印样式
       ============================================= */
    @media print {
        .nav, .fab-group, .theme-toggle, #backToTop, #readingProgressBar,
        .drawer-overlay, .modal-overlay, .shortcut-help-overlay,
        .ai-section, .hero-social-links, .footer-social-links { display: none !important; }
        .page { display: block !important; }
        body { background: white; color: black; }
        .tl-card, .bento-card, .radar-card, .project-card { box-shadow: none; border: 1px solid #ddd; }
    }
    </style>
</head>
<body>
`);

// Write Part 1 to temp file
fs.writeFileSync('v8_part1.html', html, 'utf8');
console.log('Part 1 written');
});


`).then(fs => {
  // Actually, let me rewrite this as a proper script
  process.exit(0);
});
