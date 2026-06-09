<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Untraceable Browser</title>
  <link rel="icon" href="https://aicreation-file.miricanvas.com/a00/production/private/txt2img/2026/05/23/14/cf83ba53-7234-47e7-9fc4-5e638a88062b.png">
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&family=M+PLUS+Rounded+1c:wght@400;700&display=swap" rel="stylesheet">
  <style>
    /* ===== ブラウザ本体 ===== */
    *, body { margin:0; padding:0; box-sizing:border-box; }
    body, .navbar, .tabbar, button, input, select { font-family:"Ubuntu",sans-serif; font-weight:300; }
    body { background-image:url("https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/8103728/282569_954041.jpeg"); background-size:cover; background-position:center; background-attachment:fixed; height:100vh; display:flex; flex-direction:column; overflow:hidden; }
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    .blink{animation:blink 1s infinite}
    #favBar{position:fixed;left:0;top:0;width:150px;height:100%;background:rgba(0,0,0,0.8);transform:translateX(-149px);transition:transform 0.3s;z-index:9999;display:flex;flex-direction:column;align-items:center;padding-top:20px;gap:8px;overflow-y:auto}
    #favBar:hover{transform:translateX(0)}
    .fav-header{color:#aaa;font-size:11px;pointer-events:none;flex-shrink:0}
    .fav-item{position:relative;color:white;font-size:12px;text-align:center;cursor:pointer;width:130px;padding:8px 6px 6px;border-radius:5px;display:flex;flex-direction:column;align-items:center;gap:4px;flex-shrink:0;user-select:none}
    .fav-item:hover{background:rgba(255,255,255,0.15)}
    .fav-item.drag-over{background:rgba(90,170,255,0.25);outline:1px dashed #5af}
    .fav-item.dragging{opacity:0.4}
    .fav-favicon{width:24px;height:24px;border-radius:4px;object-fit:cover;background:rgba(255,255,255,0.08)}
    .fav-name{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.3}
    .remove-btn{position:absolute;top:2px;right:4px;color:#ff6666;font-size:12px;font-weight:bold;line-height:1}
    #fpsDisplay{position:fixed;left:4px;bottom:12px;z-index:9998;background:rgba(0,0,0,0.6);color:#0f0;font-size:12px;font-family:'Orbitron',monospace;font-weight:400;padding:3px 10px;border-radius:6px;pointer-events:none;letter-spacing:1px;white-space:nowrap}
    .tab-favicon{width:14px;height:14px;border-radius:2px;flex-shrink:0}
    #bootOverlay{position:fixed;inset:0;z-index:999999;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Orbitron',monospace}
    #bootLines{display:flex;flex-direction:column;gap:10px;min-width:360px}
    .boot-line{font-size:14px;color:#0f0;opacity:0;white-space:nowrap}
    .boot-line.show{animation:bootIn 0.3s ease forwards}
    @keyframes bootIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    .boot-line .boot-ok{color:#5af;margin-left:10px}
    #bootBar{width:360px;height:3px;background:#111;border-radius:2px;margin-top:20px;overflow:hidden}
    #bootBarFill{height:100%;width:0%;background:linear-gradient(90deg,#0f0,#5af);border-radius:2px;transition:width 0.3s ease}
    #loadingOverlay{position:absolute;inset:0;z-index:200;display:none;flex-direction:column;align-items:center;justify-content:center;background:rgba(10,10,10,0.72);backdrop-filter:blur(4px);pointer-events:none}
    #loadingOverlay.active{display:flex}
    .load-spinner{width:48px;height:48px;border:4px solid rgba(255,255,255,0.15);border-top-color:#5af;border-radius:50%;animation:spin 0.7s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}
    .load-label{margin-top:16px;color:rgba(255,255,255,0.7);font-size:13px;letter-spacing:1px}
    .tabbar{display:flex;align-items:center;background:#222;border-bottom:1px solid #444;padding:0 10px;height:44px;z-index:101;flex-shrink:0;overflow-x:auto}
    .tab{display:flex;align-items:center;gap:6px;height:36px;padding:0 14px 0 16px;background:#2e2e2e;border:1px solid #444;border-bottom:none;border-radius:8px 8px 0 0;color:#aaa;font-size:14px;cursor:pointer;min-width:100px;max-width:200px;margin-right:3px;white-space:nowrap}
    .tab.active{background:#333;color:#fff;border-color:#555}
    .tab:hover:not(.active){background:#3a3a3a}
    .tab-title{flex:1;overflow:hidden;text-overflow:ellipsis}
    .tab-close{width:18px;height:18px;border-radius:50%;border:none;background:transparent;color:#777;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:0;line-height:1}
    .tab-close:hover{background:rgba(255,80,80,0.3);color:#fff}
    #addTabBtn{height:36px;padding:0 14px;background:transparent;border:1px solid #444;border-radius:8px;color:#888;cursor:pointer;font-size:20px;display:flex;align-items:center;flex-shrink:0}
    #addTabBtn:hover{background:#3a3a3a;color:#fff}
    .navbar{display:flex;align-items:center;gap:8px;padding:9px 14px;background:#333;border-bottom:1px solid #555;z-index:100;flex-shrink:0}
    #logoImg{height:58px;width:auto;margin-right:8px;cursor:pointer;border-radius:8px;transition:opacity 0.15s,transform 0.15s}
    #logoImg:hover{opacity:0.75;transform:scale(0.95)}
    #clock{color:white;font-size:14px;text-align:center;min-width:115px;line-height:1.5}
    .nbtn{height:38px;padding:0 14px;border-radius:8px;border:1px solid #555;background:#444;color:white;cursor:pointer;font-size:13px;white-space:nowrap}
    .nbtn:hover{background:#555}
    #resetButton{background:#800;border-color:#800}
    #urlInput{flex:1;height:38px;padding:0 14px;border-radius:8px;border:1px solid #555;background:#222;color:#fff;outline:none;font-size:14px}
    #panicBtn{height:38px;padding:0 14px;border-radius:8px;border:none;background:linear-gradient(135deg,#c0392b,#8e0000);color:white;cursor:pointer;font-size:13px;box-shadow:0 0 8px rgba(200,0,0,0.4);white-space:nowrap}
    #panicBtn:hover{box-shadow:0 0 16px rgba(255,0,0,0.7)}
    #filterBtn{height:38px;padding:0 14px;border-radius:8px;border:1px solid #555;background:#444;color:white;cursor:pointer;font-size:13px;white-space:nowrap;transition:background 0.2s,box-shadow 0.2s}
    #filterBtn:hover{background:#555}
    #filterBtn.on{background:linear-gradient(135deg,#1a6b3a,#0d4025);box-shadow:0 0 10px rgba(0,200,80,0.5);border-color:#2d9e55}
    #bgMenu{position:fixed;top:100px;right:220px;background:#111;padding:8px;border-radius:10px;display:none;flex-direction:column;gap:3px;z-index:5000;border:1px solid #444}
    #bgMenu.open{display:flex}
    .bg-option{color:white;padding:7px 14px;cursor:pointer;border-radius:5px;font-size:13px}
    .bg-option:hover{background:#333}
    #toolPopup{position:fixed;top:100px;right:14px;background:#111;padding:16px;border-radius:10px;display:none;border:1px solid #444;z-index:5000;color:white;width:260px}
    #toolPopup.open{display:block}
    #gustBtn{width:100%;padding:12px;background:transparent;color:white;border:1px solid #444;font-size:20px;cursor:pointer;border-radius:5px}
    hr{margin:10px 0;border:0;border-top:1px solid #333}
    #mainContent{flex:1;position:relative;overflow:hidden}
    .tab-frame{position:absolute;inset:0;width:100%;height:100%;border:none;display:none}
    .tab-frame.active{display:block}
    #messageArea{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;color:#fff;text-align:center;text-shadow:0 2px 4px rgba(0,0,0,0.8);padding:40px 20px}
    #darkVeil{position:fixed;inset:0;z-index:77777;pointer-events:none;background-color:rgba(232,216,184,0.5);opacity:0;transition:opacity 0.4s}
    #darkVeil.active{opacity:1}
    body.veil-on{filter:brightness(0.72) saturate(0.6)}
    #privacyStatus{position:fixed;bottom:12px;right:16px;z-index:500;background:rgba(0,0,0,0.55);color:rgba(255,255,255,0.5);font-size:11px;padding:4px 10px;border-radius:12px;pointer-events:none}
    #screensaver{position:fixed;inset:0;z-index:88888;background:rgba(0,0,0,0.92);backdrop-filter:blur(18px);display:none;flex-direction:column;align-items:center;justify-content:center;cursor:pointer}
    #screensaver.active{display:flex}
    #ssClock{font-size:100px;color:rgba(255,255,255,0.75);letter-spacing:8px;animation:ssPulse 3s ease-in-out infinite}
    @keyframes ssPulse{0%,100%{opacity:0.6}50%{opacity:0.9}}
    #ssDate{font-size:20px;color:rgba(255,255,255,0.6);margin-top:14px;letter-spacing:4px}
    #ssHint{position:absolute;bottom:40px;font-size:13px;color:rgba(255,255,255,0.5);letter-spacing:2px;animation:ssPulse 4s ease-in-out infinite}
    #memoToggleBtn{display:flex;align-items:center;justify-content:center;padding:0 8px}
    #memoPanel{position:fixed;bottom:80px;left:18px;z-index:8000;width:380px;background:rgba(18,18,18,0.97);border:1px solid #444;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.7);display:none;flex-direction:column;overflow:hidden}
    #memoPanel.open{display:flex}
    #memoHeader{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.05);border-bottom:1px solid #333;cursor:grab;user-select:none}
    #memoHeader:active{cursor:grabbing}
    #memoHeaderLeft{display:flex;align-items:center;gap:8px}
    #memoTitle{color:#ccc;font-size:13px}
    #memoSaveStatus{font-size:11px;color:#777}
    #memoCloseBtn{width:22px;height:22px;border-radius:50%;border:none;background:rgba(255,255,255,0.08);color:#aaa;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center}
    #memoCloseBtn:hover{background:rgba(255,80,80,0.35);color:#fff}
    #memoToolbar{display:flex;align-items:center;gap:5px;padding:6px 10px;border-bottom:1px solid #2a2a2a;flex-wrap:wrap}
    #memoToolbar label{color:#888;font-size:11px}
    .color-swatch{width:17px;height:17px;border-radius:3px;cursor:pointer;border:2px solid transparent;transition:transform 0.15s;flex-shrink:0}
    .color-swatch:hover{transform:scale(1.25);border-color:#fff}
    #colorPicker{width:24px;height:24px;border:none;border-radius:4px;cursor:pointer;padding:0}
    #fontSizeSelect{height:22px;padding:0 4px;border-radius:4px;border:1px solid #444;background:#2a2a2a;color:#ccc;font-size:11px;cursor:pointer;outline:none}
    #memoBody{min-height:220px;max-height:360px;padding:12px;color:#eee;font-size:14px;line-height:1.7;outline:none;overflow-y:auto;white-space:pre-wrap;word-break:break-word}
    #memoBody:empty::before{content:"メモを入力...";color:#444;pointer-events:none}
    #memoFooter{display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-top:1px solid #2a2a2a}
    #memoSaveBtn{padding:5px 14px;background:#1a5c34;border:none;border-radius:5px;color:white;cursor:pointer;font-size:12px}
    #memoSaveBtn:hover{background:#227a45}
    #memoClearBtn{padding:5px 10px;background:transparent;border:1px solid #444;border-radius:5px;color:#777;cursor:pointer;font-size:11px}
    #memoClearBtn:hover{color:#ff6666;border-color:#ff6666}
    #memoCharCount{font-size:11px;color:#555}

    /* ===== 地理ノート偽装オーバーレイ ===== */
    #disguiseOverlay {
      position:fixed; inset:0; z-index:99999;
      display:none; overflow-y:auto;
      background:#f5f0e8;
      font-family:'Zen Kaku Gothic New',sans-serif;
      line-height:1.7; color:#2c2416;
      animation:fadeInG 0.12s ease;
    }
    #disguiseOverlay.active { display:block; }
    @keyframes fadeInG{from{opacity:0}to{opacity:1}}

    #disguiseHint {
      position:fixed; bottom:8px; right:12px; z-index:100000;
      font-size:10px; color:rgba(0,0,0,0.18); pointer-events:none;
      font-family:monospace; display:none;
    }
    #disguiseHint.active { display:block; }

    /* 地理ノート内スタイル */
    #geo-header { background:#2c2416; color:#f5f0e8; position:sticky; top:0; z-index:10; box-shadow:0 2px 12px rgba(0,0,0,0.2); }
    .geo-header-inner { max-width:960px; margin:0 auto; padding:14px 24px; display:flex; align-items:center; justify-content:space-between; }
    .geo-logo { font-family:'M PLUS Rounded 1c',sans-serif; font-size:20px; font-weight:700; letter-spacing:0.05em; display:flex; align-items:center; gap:10px; color:#f5f0e8; }
    .geo-logo-badge { background:#c8502a; color:white; font-size:11px; padding:3px 8px; border-radius:4px; font-weight:700; letter-spacing:0.1em; }
    #geo-nav { display:flex; gap:4px; }
    #geo-nav a { color:#ccc; text-decoration:none; font-size:13px; padding:6px 12px; border-radius:6px; transition:all 0.2s; }
    #geo-nav a:hover, #geo-nav a.geo-active { background:rgba(255,255,255,0.15); color:white; }
    .geo-container { max-width:960px; margin:0 auto; padding:32px 24px; }
    .geo-section-title { font-family:'M PLUS Rounded 1c',sans-serif; font-size:22px; font-weight:700; color:#2c2416; margin-bottom:20px; display:flex; align-items:center; gap:12px; }
    .geo-section-title::before { content:''; display:block; width:6px; height:26px; background:#c8502a; border-radius:3px; }
    .geo-section-subtitle { font-size:13px; color:#9b8c7e; font-weight:400; }
    .geo-chapter-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; margin-bottom:40px; }
    .geo-chapter-card { background:#ffffff; border:1.5px solid #d4c8b8; border-radius:14px; overflow:hidden; cursor:pointer; transition:all 0.25s; text-decoration:none; display:block; }
    .geo-chapter-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.12); border-color:#c8502a; }
    .geo-card-header { padding:18px 20px 14px; border-bottom:1px solid #d4c8b8; }
    .geo-card-region { font-size:11px; font-weight:700; letter-spacing:0.12em; color:#9b8c7e; margin-bottom:6px; }
    .geo-card-title { font-family:'M PLUS Rounded 1c',sans-serif; font-size:17px; font-weight:700; color:#2c2416; margin-bottom:4px; }
    .geo-card-sub { font-size:12px; color:#9b8c7e; }
    .geo-card-body { padding:14px 20px 18px; }
    .geo-kw-list { display:flex; flex-wrap:wrap; gap:6px; }
    .geo-kw { font-size:12px; padding:4px 10px; border-radius:20px; font-weight:500; }
    .geo-kw.red { background:#fae8e3; color:#993c1d; }
    .geo-kw.blue { background:#e3eef8; color:#185fa5; }
    .geo-kw.green { background:#e5f3ec; color:#1a6b40; }
    .geo-content-section { background:#ffffff; border:1.5px solid #d4c8b8; border-radius:16px; padding:28px 32px; margin-bottom:28px; }
    .geo-content-section h2 { font-family:'M PLUS Rounded 1c',sans-serif; font-size:18px; font-weight:700; color:#2c2416; margin-bottom:18px; padding-bottom:12px; border-bottom:2px dashed #d4c8b8; }
    .geo-table { width:100%; border-collapse:collapse; font-size:14px; margin-bottom:8px; }
    .geo-table th { background:#ede7d9; padding:10px 14px; text-align:left; font-weight:700; font-size:13px; color:#6b5d4f; border:1px solid #d4c8b8; }
    .geo-table td { padding:10px 14px; border:1px solid #d4c8b8; vertical-align:top; }
    .geo-table tr:nth-child(even) td { background:#faf7f2; }
    .geo-table tr:hover td { background:#f0ebe0; }
    .geo-hl { background:#fff3cd; padding:1px 4px; border-radius:3px; font-weight:500; }
    .geo-point-box { border-left:4px solid #c8502a; background:#fae8e3; padding:12px 16px; border-radius:0 10px 10px 0; margin:14px 0; font-size:14px; }
    .geo-point-box.blue { border-left-color:#3a7abf; background:#e3eef8; }
    .geo-point-box.green { border-left-color:#2e8b57; background:#e5f3ec; }
    .geo-point-label { font-size:11px; font-weight:700; letter-spacing:0.1em; color:#9b8c7e; margin-bottom:4px; }
    .geo-flashcard-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; margin-top:16px; }
    .geo-flashcard { background:#ede7d9; border:1.5px solid #d4c8b8; border-radius:12px; padding:14px 16px; cursor:pointer; transition:all 0.2s; position:relative; min-height:80px; }
    .geo-flashcard:hover { border-color:#3a7abf; }
    .geo-flashcard .geo-q { font-size:13px; font-weight:700; color:#2c2416; margin-bottom:8px; }
    .geo-flashcard .geo-a { font-size:13px; color:#6b5d4f; display:none; padding-top:8px; border-top:1px dashed #d4c8b8; }
    .geo-flashcard.geo-open .geo-a { display:block; }
    .geo-flashcard .geo-tap-hint { font-size:11px; color:#9b8c7e; position:absolute; bottom:10px; right:14px; }
    .geo-flashcard.geo-open .geo-tap-hint { display:none; }
    .geo-map-note { background:linear-gradient(135deg,#e8f4fd 0%,#f0f8e8 100%); border:1.5px solid #b8d4f0; border-radius:14px; padding:20px 24px; margin:16px 0; font-size:14px; }
    .geo-map-note h3 { font-family:'M PLUS Rounded 1c',sans-serif; font-size:15px; font-weight:700; color:#185fa5; margin-bottom:10px; }
    .geo-tab-nav { display:flex; gap:0; margin-bottom:0; border-bottom:2px solid #d4c8b8; overflow-x:auto; }
    .geo-tab-btn { padding:10px 20px; font-size:14px; font-weight:500; color:#6b5d4f; background:transparent; border:none; cursor:pointer; border-bottom:3px solid transparent; margin-bottom:-2px; white-space:nowrap; transition:all 0.2s; font-family:'Zen Kaku Gothic New',sans-serif; }
    .geo-tab-btn:hover { color:#2c2416; }
    .geo-tab-btn.geo-active { color:#c8502a; border-bottom-color:#c8502a; font-weight:700; }
    .geo-tab-content { display:none; padding-top:24px; }
    .geo-tab-content.geo-active { display:block; }
    .geo-page { display:none; }
    .geo-page.geo-active { display:block; }
    .geo-hero { text-align:center; padding:48px 24px 36px; background:#ffffff; border-radius:16px; border:1.5px solid #d4c8b8; margin-bottom:32px; }
    .geo-hero-label { font-size:12px; letter-spacing:0.15em; color:#9b8c7e; font-weight:700; margin-bottom:12px; }
    .geo-hero h1 { font-family:'M PLUS Rounded 1c',sans-serif; font-size:32px; font-weight:700; color:#2c2416; margin-bottom:10px; line-height:1.3; }
    .geo-hero h1 em { color:#c8502a; font-style:normal; }
    .geo-hero p { font-size:15px; color:#6b5d4f; max-width:480px; margin:0 auto 20px; }
    .geo-hero-tags { display:flex; justify-content:center; gap:8px; flex-wrap:wrap; }
    .geo-hero-tag { font-size:12px; padding:5px 14px; border-radius:20px; border:1px solid #d4c8b8; color:#6b5d4f; background:#f5f0e8; }
    #geo-footer { text-align:center; padding:32px 24px; color:#9b8c7e; font-size:13px; border-top:1px solid #d4c8b8; margin-top:20px; }
    @media(max-width:640px){.geo-container{padding:20px 16px}.geo-hero h1{font-size:24px}.geo-content-section{padding:20px 18px}#geo-nav{display:none}}
  </style>
</head>
<body>

<!-- 起動アニメーション -->
<div id="bootOverlay">
  <div id="bootLines">
    <div class="boot-line" id="bl0">&gt; Initializing Secure Session...</div>
    <div class="boot-line" id="bl1">&gt; Loading encryption modules...<span class="boot-ok" id="bl1ok"></span></div>
    <div class="boot-line" id="bl2">&gt; Bypassing history tracking...<span class="boot-ok" id="bl2ok"></span></div>
    <div class="boot-line" id="bl3">&gt; Mounting sandbox environment...<span class="boot-ok" id="bl3ok"></span></div>
    <div class="boot-line" id="bl4">&gt; Done.<span class="boot-ok" id="bl4ok"></span></div>
  </div>
  <div id="bootBar"><div id="bootBarFill"></div></div>
</div>

<!-- ===== 地理ノート偽装オーバーレイ ===== -->
<div id="disguiseOverlay">
  <header id="geo-header">
    <div class="geo-header-inner">
      <div class="geo-logo">🌏 中2地理まとめ<span class="geo-logo-badge">STUDY</span></div>
      <nav id="geo-nav">
        <a href="#" class="geo-active" onclick="geoShowPage('home',this);return false;">ホーム</a>
        <a href="#" onclick="geoShowPage('asia',this);return false;">アジア</a>
        <a href="#" onclick="geoShowPage('europe',this);return false;">ヨーロッパ</a>
        <a href="#" onclick="geoShowPage('africa',this);return false;">アフリカ</a>
        <a href="#" onclick="geoShowPage('americas',this);return false;">南北アメリカ</a>
        <a href="#" onclick="geoShowPage('quiz',this);return false;">一問一答</a>
      </nav>
    </div>
  </header>
  <div class="geo-container">

    <!-- ホーム -->
    <div id="geo-page-home" class="geo-page geo-active">
      <div class="geo-hero">
        <p class="geo-hero-label">中学2年生 社会・地理</p>
        <h1>世界の<em>地理</em>まとめノート</h1>
        <p>各地域の自然・産業・文化をわかりやすく整理。テスト直前の確認に使おう！</p>
        <div class="geo-hero-tags">
          <span class="geo-hero-tag">📍 アジア州</span><span class="geo-hero-tag">📍 ヨーロッパ州</span>
          <span class="geo-hero-tag">📍 アフリカ州</span><span class="geo-hero-tag">📍 南北アメリカ</span><span class="geo-hero-tag">📍 オセアニア</span>
        </div>
      </div>
      <div class="geo-section-title">単元を選ぶ</div>
      <div class="geo-chapter-grid">
        <a href="#" class="geo-chapter-card" onclick="geoShowPage('asia',document.querySelector('#geo-nav a:nth-child(2)'));return false;">
          <div class="geo-card-header"><div class="geo-card-region">CHAPTER 1</div><div class="geo-card-title">アジア州</div><div class="geo-card-sub">東・東南・南・西アジアの特色</div></div>
          <div class="geo-card-body"><div class="geo-kw-list"><span class="geo-kw red">季節風</span><span class="geo-kw blue">ASEAN</span><span class="geo-kw green">稲作</span><span class="geo-kw red">中国経済</span><span class="geo-kw blue">石油産出</span></div></div>
        </a>
        <a href="#" class="geo-chapter-card" onclick="geoShowPage('europe',document.querySelector('#geo-nav a:nth-child(3)'));return false;">
          <div class="geo-card-header"><div class="geo-card-region">CHAPTER 2</div><div class="geo-card-title">ヨーロッパ州</div><div class="geo-card-sub">EU統合と多様な文化</div></div>
          <div class="geo-card-body"><div class="geo-kw-list"><span class="geo-kw blue">EU</span><span class="geo-kw green">混合農業</span><span class="geo-kw red">偏西風</span><span class="geo-kw blue">ユーロ</span><span class="geo-kw green">地中海農業</span></div></div>
        </a>
        <a href="#" class="geo-chapter-card" onclick="geoShowPage('africa',document.querySelector('#geo-nav a:nth-child(4)'));return false;">
          <div class="geo-card-header"><div class="geo-card-region">CHAPTER 3</div><div class="geo-card-title">アフリカ州</div><div class="geo-card-sub">植民地の歴史と現在の課題</div></div>
          <div class="geo-card-body"><div class="geo-kw-list"><span class="geo-kw red">モノカルチャー</span><span class="geo-kw blue">サハラ砂漠</span><span class="geo-kw green">植民地</span><span class="geo-kw red">レアメタル</span></div></div>
        </a>
        <a href="#" class="geo-chapter-card" onclick="geoShowPage('americas',document.querySelector('#geo-nav a:nth-child(5)'));return false;">
          <div class="geo-card-header"><div class="geo-card-region">CHAPTER 4</div><div class="geo-card-title">南北アメリカ州</div><div class="geo-card-sub">多文化社会と大規模農業</div></div>
          <div class="geo-card-body"><div class="geo-kw-list"><span class="geo-kw blue">NAFTA(USMCA)</span><span class="geo-kw green">適地適作</span><span class="geo-kw red">アマゾン開発</span><span class="geo-kw blue">多文化社会</span></div></div>
        </a>
        <a href="#" class="geo-chapter-card" onclick="geoShowPage('quiz',document.querySelector('#geo-nav a:nth-child(6)'));return false;">
          <div class="geo-card-header"><div class="geo-card-region">PRACTICE</div><div class="geo-card-title">一問一答クイズ</div><div class="geo-card-sub">カードをタップして答えをチェック</div></div>
          <div class="geo-card-body"><div class="geo-kw-list"><span class="geo-kw red">重要語句</span><span class="geo-kw blue">地名</span><span class="geo-kw green">統計・数値</span></div></div>
        </a>
      </div>
      <div class="geo-content-section">
        <h2>📌 テストによく出る！世界の基本データ</h2>
        <table class="geo-table">
          <thead><tr><th>項目</th><th>数値・内容</th><th>ポイント</th></tr></thead>
          <tbody>
            <tr><td>世界の人口</td><td>約<span class="geo-hl">80億人</span></td><td>アジアに約60%が集中</td></tr>
            <tr><td>世界最大の国（面積）</td><td><span class="geo-hl">ロシア連邦</span></td><td>約1,710万km²（日本の約45倍）</td></tr>
            <tr><td>世界最多人口の国</td><td><span class="geo-hl">インド</span>（中国を抜いた）</td><td>14億人以上、若い人口が多い</td></tr>
            <tr><td>赤道が通る大陸</td><td>南アメリカ・アフリカ・アジア</td><td>熱帯雨林気候が広がる</td></tr>
            <tr><td>本初子午線</td><td>経度<span class="geo-hl">0度</span>（ロンドン）</td><td>グリニッジ天文台を通る</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- アジア -->
    <div id="geo-page-asia" class="geo-page">
      <div class="geo-section-title">アジア州 <span class="geo-section-subtitle">Chapter 1</span></div>
      <div class="geo-content-section">
        <div class="geo-tab-nav">
          <button class="geo-tab-btn geo-active" onclick="geoSwitchTab(this,'geo-asia-tab1')">東アジア</button>
          <button class="geo-tab-btn" onclick="geoSwitchTab(this,'geo-asia-tab2')">東南アジア</button>
          <button class="geo-tab-btn" onclick="geoSwitchTab(this,'geo-asia-tab3')">南アジア</button>
          <button class="geo-tab-btn" onclick="geoSwitchTab(this,'geo-asia-tab4')">西アジア</button>
        </div>
        <div id="geo-asia-tab1" class="geo-tab-content geo-active">
          <div class="geo-point-box"><div class="geo-point-label">🔑 最重要ポイント</div>中国は「世界の工場」から「世界の市場」へ転換。沿岸部と内陸部の<strong>経済格差（地域格差）</strong>が問題。</div>
          <table class="geo-table"><thead><tr><th>国・地域</th><th>特色</th><th>キーワード</th></tr></thead><tbody>
            <tr><td><strong>中国</strong></td><td>人口約14億人。経済特区を設けて外国企業を誘致し、急速に経済成長</td><td>経済特区、一人っ子政策（廃止）、漢族</td></tr>
            <tr><td><strong>韓国</strong></td><td>サムスン・LGなど電子産業が発展。K-POPなどの韓流文化も輸出</td><td>ICT産業、韓流、ハングル</td></tr>
            <tr><td><strong>日本</strong></td><td>加工貿易で発展。近年は少子高齢化・貿易摩擦が課題</td><td>少子高齢化、加工貿易、技術立国</td></tr>
          </tbody></table>
          <div class="geo-map-note"><h3>🗺 東アジアの気候</h3><p>夏に南東の<strong>季節風（モンスーン）</strong>が吹き込み、高温多湿になる。冬は北西の季節風で寒冷・乾燥。稲作には夏の高温多雨が適している。</p></div>
        </div>
        <div id="geo-asia-tab2" class="geo-tab-content">
          <div class="geo-point-box blue"><div class="geo-point-label">🔑 最重要ポイント</div><strong>ASEAN（東南アジア諸国連合）</strong>：10か国が加盟。工業化が進み「ASEAN諸国」は世界の工場に。</div>
          <table class="geo-table"><thead><tr><th>テーマ</th><th>内容</th></tr></thead><tbody>
            <tr><td>主な農産物</td><td>米（タイ・ベトナムは世界的輸出国）、天然ゴム、パーム油、コーヒー</td></tr>
            <tr><td>宗教の分布</td><td>タイ・ミャンマー→仏教、インドネシア・マレーシア→イスラム教、フィリピン→キリスト教</td></tr>
            <tr><td>工業化</td><td>外国企業の工場誘致→輸出指向型工業。賃金が安く、労働力が豊富</td></tr>
            <tr><td>熱帯林の開発</td><td>農地・プランテーションへの転換で熱帯林が急減→環境問題</td></tr>
          </tbody></table>
        </div>
        <div id="geo-asia-tab3" class="geo-tab-content">
          <div class="geo-point-box green"><div class="geo-point-label">🔑 最重要ポイント</div>インドはIT産業で急成長。英語教育と理系人材が豊富で、ICT大国に。</div>
          <table class="geo-table"><thead><tr><th>国</th><th>特色</th></tr></thead><tbody>
            <tr><td><strong>インド</strong></td><td>カースト制（身分制度）の残存。BRICSの一員。バンガロールはIT産業の中心地。<br>宗教：ヒンドゥー教が多数、イスラム教も多い</td></tr>
            <tr><td><strong>バングラデシュ</strong></td><td>デルタ地帯で洪水が多い。縫製業（衣類）が主要産業</td></tr>
          </tbody></table>
          <div class="geo-point-box"><div class="geo-point-label">💡 ガンジス川</div>ヒンドゥー教の聖なる川。流域に人口が集中し、農業・生活の場となっている。</div>
        </div>
        <div id="geo-asia-tab4" class="geo-tab-content">
          <div class="geo-point-box"><div class="geo-point-label">🔑 最重要ポイント</div>西アジアは<strong>石油資源</strong>が豊富。OPECに多くの国が加盟し、世界の原油供給を左右する。</div>
          <table class="geo-table"><thead><tr><th>項目</th><th>内容</th></tr></thead><tbody>
            <tr><td>主な宗教</td><td>イスラム教（礼拝・断食・聖地メッカへの巡礼）</td></tr>
            <tr><td>主要国</td><td>サウジアラビア、アラブ首長国連邦（UAE）、イラン、イラク</td></tr>
            <tr><td>気候</td><td>砂漠気候が多い。乾燥地帯のため農業用水の確保が重要</td></tr>
            <tr><td>石油収入</td><td>近年は観光・金融など産業の多角化を推進</td></tr>
          </tbody></table>
        </div>
      </div>
    </div>

    <!-- ヨーロッパ -->
    <div id="geo-page-europe" class="geo-page">
      <div class="geo-section-title">ヨーロッパ州 <span class="geo-section-subtitle">Chapter 2</span></div>
      <div class="geo-content-section">
        <h2>🇪🇺 EU（ヨーロッパ連合）のしくみ</h2>
        <div class="geo-point-box blue"><div class="geo-point-label">🔑 最重要ポイント</div>EUは経済・政治的な統合体。共通通貨<strong>ユーロ</strong>を採用（全加盟国ではない）。人・物・お金・サービスが国境を越えて自由に移動できる。</div>
        <table class="geo-table"><thead><tr><th>項目</th><th>内容</th></tr></thead><tbody>
          <tr><td>設立の流れ</td><td>EC（ヨーロッパ共同体）→ 1993年にEU発足</td></tr>
          <tr><td>加盟国数</td><td>27か国（イギリスは2020年に離脱＝Brexit）</td></tr>
          <tr><td>共通通貨</td><td>ユーロ（€）を採用。ただしスイス・ノルウェーなど非加盟国も</td></tr>
          <tr><td>課題</td><td>東西ヨーロッパの経済格差、難民・移民問題、各国の主権との摩擦</td></tr>
        </tbody></table>
      </div>
      <div class="geo-content-section">
        <h2>🌾 ヨーロッパの農業</h2>
        <div class="geo-flashcard-grid">
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">混合農業とは？</div><div class="geo-a">穀物栽培と家畜飼育を組み合わせた農業。北フランス・ドイツなど北西部で行われる。</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">地中海農業の特色は？</div><div class="geo-a">夏は乾燥→オリーブ・ぶどう・柑橘類。冬は温暖で降水→小麦。スペイン・イタリア・ギリシャが中心。</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">酪農が盛んな地域は？</div><div class="geo-a">デンマーク・オランダなど北海沿岸。冷涼な気候で牧草が育ちやすく、乳製品を輸出。</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">偏西風の影響は？</div><div class="geo-a">大西洋から吹く偏西風と暖流（北大西洋海流）の影響で、高緯度のわりに温暖。西岸海洋性気候。</div><span class="geo-tap-hint">タップで確認</span></div>
        </div>
      </div>
      <div class="geo-content-section">
        <h2>🏭 ヨーロッパの工業</h2>
        <table class="geo-table"><thead><tr><th>地域</th><th>特色</th></tr></thead><tbody>
          <tr><td>ルール工業地帯（ドイツ）</td><td>石炭・鉄鉱石を使う重工業で発展。現在は機械・化学工業が中心</td></tr>
          <tr><td>北イタリア</td><td>ミラノ周辺にファッション・機械工業が集中</td></tr>
          <tr><td>エアバス（EU共同）</td><td>航空機を共同製造。EU統合のシンボル的産業</td></tr>
        </tbody></table>
      </div>
    </div>

    <!-- アフリカ -->
    <div id="geo-page-africa" class="geo-page">
      <div class="geo-section-title">アフリカ州 <span class="geo-section-subtitle">Chapter 3</span></div>
      <div class="geo-content-section">
        <h2>🌍 アフリカの自然と気候</h2>
        <div class="geo-map-note"><h3>🗺 気候帯の配列（赤道から北・南へ）</h3><p>赤道付近→<strong>熱帯雨林</strong>（コンゴ盆地）→<strong>サバナ</strong>→<strong>砂漠</strong>（サハラ・ナミブ）→<strong>地中海性気候</strong>（南端・北端）</p></div>
        <table class="geo-table"><thead><tr><th>地形・地物</th><th>内容</th></tr></thead><tbody>
          <tr><td>サハラ砂漠</td><td>世界最大の砂漠。アフリカ大陸北部に広がる</td></tr>
          <tr><td>ナイル川</td><td>世界最長の川。エジプトの農業を支える</td></tr>
          <tr><td>コンゴ盆地</td><td>世界第2位の熱帯雨林。生物多様性の宝庫</td></tr>
          <tr><td>キリマンジャロ山</td><td>アフリカ最高峰（5,895m）。タンザニア</td></tr>
        </tbody></table>
      </div>
      <div class="geo-content-section">
        <h2>📜 植民地支配の歴史と影響</h2>
        <div class="geo-point-box"><div class="geo-point-label">🔑 最重要ポイント</div>19世紀、ヨーロッパ列強がアフリカをほぼ完全に植民地化。<strong>直線的な国境線</strong>は民族・文化を無視して引かれたため、現在も民族紛争の原因に。</div>
        <table class="geo-table"><thead><tr><th>問題</th><th>内容</th></tr></thead><tbody>
          <tr><td>モノカルチャー経済</td><td>特定の農産物・鉱産物だけに依存。価格変動の影響を受けやすい</td></tr>
          <tr><td>公用語問題</td><td>旧宗主国の言語（英語・フランス語等）が公用語に→民族語の衰退</td></tr>
          <tr><td>食料問題</td><td>人口増加・干ばつ・内戦で食料不足が続く地域も</td></tr>
          <tr><td>レアメタル</td><td>コバルト・コルタンなど希少金属が豊富→産地紛争の原因にも</td></tr>
        </tbody></table>
        <div class="geo-point-box green"><div class="geo-point-label">📈 近年の変化</div>「アフリカの角」などで携帯電話の普及が急速進展。若い人口と経済成長で「アフリカの時代」とも言われる。</div>
      </div>
    </div>

    <!-- 南北アメリカ -->
    <div id="geo-page-americas" class="geo-page">
      <div class="geo-section-title">南北アメリカ州 <span class="geo-section-subtitle">Chapter 4</span></div>
      <div class="geo-content-section">
        <div class="geo-tab-nav">
          <button class="geo-tab-btn geo-active" onclick="geoSwitchTab(this,'geo-am-tab1')">北アメリカ</button>
          <button class="geo-tab-btn" onclick="geoSwitchTab(this,'geo-am-tab2')">南アメリカ</button>
        </div>
        <div id="geo-am-tab1" class="geo-tab-content geo-active">
          <div class="geo-point-box blue"><div class="geo-point-label">🔑 最重要ポイント</div>アメリカの農業は<strong>適地適作</strong>と<strong>企業的農業</strong>が特色。農業地域が気候・地形に合わせてはっきり分かれる。</div>
          <table class="geo-table"><thead><tr><th>農業地帯</th><th>主要作物</th><th>場所</th></tr></thead><tbody>
            <tr><td>春小麦地帯</td><td>小麦（春まき）</td><td>カナダ・北部大平原</td></tr>
            <tr><td>冬小麦地帯</td><td>小麦（秋まき）</td><td>グレートプレーンズ南部</td></tr>
            <tr><td>とうもろこし地帯</td><td>とうもろこし・大豆</td><td>コーンベルト（五大湖周辺）</td></tr>
            <tr><td>綿花地帯</td><td>綿花</td><td>コットンベルト（南部）</td></tr>
            <tr><td>酪農地帯</td><td>乳製品</td><td>五大湖周辺・北東部</td></tr>
          </tbody></table>
          <div class="geo-point-box"><div class="geo-point-label">🏭 シリコンバレー</div>カリフォルニア州サンフランシスコ南部。Google・Apple・Meta等のIT企業が集積。世界の技術革新をリード。</div>
          <table class="geo-table" style="margin-top:14px"><thead><tr><th>項目</th><th>内容</th></tr></thead><tbody>
            <tr><td>多文化社会</td><td>ヨーロッパ系・アフリカ系・ヒスパニック・アジア系など多様な民族が共存</td></tr>
            <tr><td>NAFTA→USMCA</td><td>アメリカ・カナダ・メキシコの自由貿易協定。2020年に改定</td></tr>
          </tbody></table>
        </div>
        <div id="geo-am-tab2" class="geo-tab-content">
          <div class="geo-point-box green"><div class="geo-point-label">🔑 最重要ポイント</div>ブラジルは<strong>バイオエタノール（さとうきび）</strong>生産・大豆輸出で急成長。アマゾンの開発と<strong>熱帯雨林破壊</strong>が深刻な問題。</div>
          <table class="geo-table"><thead><tr><th>国・地域</th><th>特色</th></tr></thead><tbody>
            <tr><td><strong>ブラジル</strong></td><td>大豆・コーヒーの輸出大国。多民族社会（ポルトガル系・アフリカ系・日系等）</td></tr>
            <tr><td><strong>アルゼンチン</strong></td><td>パンパ（大草原）で牛の放牧・小麦栽培が盛ん</td></tr>
            <tr><td><strong>アンデス山脈</strong></td><td>標高差を利用した農業（高地→ジャガイモ・アルパカ）。インカ文明の地</td></tr>
          </tbody></table>
          <div class="geo-map-note" style="margin-top:16px"><h3>🌳 アマゾンの熱帯雨林</h3><p>地球上の酸素の20%を生産する「地球の肺」。農地・牧場・道路開発で急速に減少。温暖化・生物多様性への影響が懸念される。</p></div>
        </div>
      </div>
    </div>

    <!-- 一問一答 -->
    <div id="geo-page-quiz" class="geo-page">
      <div class="geo-section-title">一問一答 <span class="geo-section-subtitle">カードをタップして答えを確認しよう</span></div>
      <div class="geo-content-section">
        <h2>🌏 アジア州</h2>
        <div class="geo-flashcard-grid">
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">中国が沿岸部に設けた、外国企業向けの特別な地区は？</div><div class="geo-a">経済特区（シェンジェン・上海など）</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">東南アジア10か国が加盟する地域連合の略称は？</div><div class="geo-a">ASEAN（東南アジア諸国連合）</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">インドのIT産業の中心都市はどこ？</div><div class="geo-a">バンガロール</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">夏に南東から吹く、アジアの気候を特色づける風は？</div><div class="geo-a">季節風（モンスーン）</div><span class="geo-tap-hint">タップで確認</span></div>
        </div>
      </div>
      <div class="geo-content-section">
        <h2>🇪🇺 ヨーロッパ州</h2>
        <div class="geo-flashcard-grid">
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">EUの共通通貨の名前は？</div><div class="geo-a">ユーロ（€）</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">イギリスがEUを離脱したことを何という？</div><div class="geo-a">Brexit（ブレグジット）。2020年に正式離脱。</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">北西ヨーロッパを温暖にしている大西洋の暖流は？</div><div class="geo-a">北大西洋海流（偏西風の影響とセットで覚える）</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">地中海沿岸で夏に栽培されるおもな作物2つは？</div><div class="geo-a">オリーブとぶどう（夏の乾燥に強い）</div><span class="geo-tap-hint">タップで確認</span></div>
        </div>
      </div>
      <div class="geo-content-section">
        <h2>🌍 アフリカ・南北アメリカ州</h2>
        <div class="geo-flashcard-grid">
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">特定の農産物・鉱産物に依存した経済構造を何という？</div><div class="geo-a">モノカルチャー経済（価格変動の影響を受けやすい）</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">アメリカで五大湖周辺に広がる農業地帯は？</div><div class="geo-a">コーンベルト（とうもろこし・大豆の産地）</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">ブラジルが大量生産する再生可能エネルギー燃料は？</div><div class="geo-a">バイオエタノール（さとうきびから製造）</div><span class="geo-tap-hint">タップで確認</span></div>
          <div class="geo-flashcard" onclick="this.classList.toggle('geo-open')"><div class="geo-q">アルゼンチンの大草原・農牧業地帯の名称は？</div><div class="geo-a">パンパ（牛の放牧・小麦栽培が盛ん）</div><span class="geo-tap-hint">タップで確認</span></div>
        </div>
      </div>
    </div>

  </div><!-- /geo-container -->
  <footer id="geo-footer">
    <p>📚 中2社会（地理）まとめノート｜定期テスト対策用</p>
    <p style="margin-top:6px">カードをタップして答えを確認しよう。各単元のページでさらに詳しく学べます。</p>
  </footer>
</div><!-- /disguiseOverlay -->

<!-- 偽装中ヒント（極小・目立たない） -->
<div id="disguiseHint">Shift+Esc で戻る</div>

<!-- スクリーンセーバー -->
<div id="screensaver">
  <div id="ssClock">00:00</div>
  <div id="ssDate"></div>
  <div id="ssHint">クリックまたはキーを押して復帰</div>
</div>

<div id="privacyStatus">待機中</div>
<div id="fpsDisplay">-- FPS</div>
<div id="darkVeil"></div>
<div id="favBar"></div>

<!-- タブバー -->
<div class="tabbar" id="tabbar">
  <div id="addTabBtn" title="新しいタブ">＋</div>
</div>

<!-- ナビバー -->
<div class="navbar">
  <img id="logoImg" src="https://cdn.phototourl.com/free/2026-05-27-4d659095-dd46-430b-af9f-a5d9e74d9b22.png" alt="Logo" title="ホームに戻る">
  <div id="clock"></div>
  <button class="nbtn" id="refreshButton">↻</button>
  <input type="text" id="urlInput" placeholder="URLを入力してください...">
  <button class="nbtn" id="goButton">GO</button>
  <button class="nbtn" id="bgButton">背景変更</button>
  <button class="nbtn" id="historyButton">更新情報</button>
  <button class="nbtn" id="resetButton">終了</button>
  <button id="panicBtn">偽装</button>
  <button id="filterBtn">覗き見防止</button>
  <button class="nbtn" id="memoToggleBtn">メモ</button>
  <button class="nbtn" id="menuButton">≡</button>
</div>

<!-- 背景メニュー -->
<div id="bgMenu">
  <div class="bg-option" onclick="changeBg('https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/8103728/282569_954041.jpeg')">美しい山々(標準)</div>
  <div class="bg-option" onclick="changeBg('https://www.s-hoshino.com/wall/natu/001/001_1600_1200.jpg')">美しく反射する夕焼け</div>
  <div class="bg-option" onclick="changeBg('https://sapporotravel.s3-ap-northeast-1.amazonaws.com/st/ph/img/0e0b181e83ff20932f0b28cc7b711142.jpg')">札幌 大通公園</div>
  <div class="bg-option" onclick="changeBg('https://thumb.photo-ac.com/22/22fb220141738f2a7eb5a5d0376acca9_t.jpeg')">日本アルプス</div>
  <div class="bg-option" onclick="changeBg('https://img.magnific.com/free-photo/fuji-mountain-kawaguchiko-lake-morning-autumn-seasons-fuji-mountain-yamanachi-japan_335224-102.jpg?semt=ais_hybrid&w=740&q=80')">秋の富士山</div>
  <div class="bg-option" onclick="changeBg('https://sozai-free.com/wp-content/uploads/2021/06/1img_1989-scaled.jpg')">ノイシュヴァンシュタイン城</div>
  <div class="bg-option" onclick="changeBg('https://o-i-shi.com/wp-content/uploads/2025/05/greenblack-21.jpg')">サイバーグリーン</div>
</div>

<!-- ツールポップアップ -->
<div id="toolPopup">
  <p style="font-size:17px;margin-bottom:10px;">Tools</p>
  <p style="margin-bottom:5px;color:#aaa;font-size:12px;">proxy</p>
  <button id="gustBtn" onclick="window.open('https://html.cafe/x5141df3f')">🌪️ GUST</button>
  <hr>
  <p style="font-size:11px;color:#888;">超軽量な強力プロキシ</p>
  <hr>
  <p style="font-size:15px;margin-bottom:10px;">⚙️ 設定</p>
  <p style="margin-bottom:6px;color:#aaa;font-size:12px;">タブ名・ファビコン偽装</p>
  <div style="display:flex;flex-direction:column;gap:6px;">
    <input type="text" id="disguiseTitleInput" placeholder="タブ名" style="width:100%;height:28px;padding:0 8px;border-radius:5px;border:1px solid #555;background:#222;color:#fff;font-size:12px;outline:none;box-sizing:border-box;">
    <input type="text" id="disguiseFaviconInput" placeholder="ファビコンURL" style="width:100%;height:28px;padding:0 8px;border-radius:5px;border:1px solid #555;background:#222;color:#fff;font-size:12px;outline:none;box-sizing:border-box;">
    <div style="display:flex;gap:5px;">
      <button onclick="applyDisguise(document.getElementById('disguiseTitleInput').value,document.getElementById('disguiseFaviconInput').value)" style="flex:1;height:28px;border-radius:5px;border:none;background:#1a5c34;color:white;font-size:12px;cursor:pointer;">適用</button>
      <button onclick="applyDisguise('','',true)" style="height:28px;padding:0 10px;border-radius:5px;border:1px solid #555;background:transparent;color:#aaa;font-size:12px;cursor:pointer;">解除</button>
    </div>
    <hr style="margin:4px 0;">
    <p style="color:#888;font-size:11px;margin-bottom:2px;">プリセット</p>
    <button onclick="applyDisguise('ホーム - Classroom','https://img.icons8.com/color/48/google-classroom.png')" style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#1e1e1e;border:1px solid #444;border-radius:5px;color:white;font-size:12px;cursor:pointer;text-align:left;">
      <img src="https://img.icons8.com/color/48/google-classroom.png" width="18" height="18" style="border-radius:3px;flex-shrink:0;"><span>ホーム - Classroom</span>
    </button>
  </div>
</div>

<!-- メインコンテンツ -->
<div id="mainContent">
  <div id="loadingOverlay">
    <div class="load-spinner"></div>
    <div class="load-label">読み込み中...</div>
  </div>
  <div id="messageArea">
    <p style="font-size:42px;">Untraceable Browser</p>
    <p style="font-size:120%;margin-top:10px;">URLを入力して GO または Enter</p>
    <p style="margin-top:8px;opacity:0.6;font-size:13px;">iframeベース・ブラウザ履歴なし</p>
    <br><p style="font-size:11px;opacity:0.4;">Ver.1.5.8</p>
  </div>
</div>

<!-- メモパネル -->
<div id="memoPanel">
  <div id="memoHeader">
    <div id="memoHeaderLeft"><span id="memoTitle">📝 メモ</span><span id="memoSaveStatus">未保存</span></div>
    <button id="memoCloseBtn">×</button>
  </div>
  <div id="memoToolbar">
    <label>色：</label>
    <div class="color-swatch" style="background:#ffffff" data-color="#ffffff"></div>
    <div class="color-swatch" style="background:#ffeb3b" data-color="#ffeb3b"></div>
    <div class="color-swatch" style="background:#ff7043" data-color="#ff7043"></div>
    <div class="color-swatch" style="background:#ef5350" data-color="#ef5350"></div>
    <div class="color-swatch" style="background:#66bb6a" data-color="#66bb6a"></div>
    <div class="color-swatch" style="background:#42a5f5" data-color="#42a5f5"></div>
    <div class="color-swatch" style="background:#ce93d8" data-color="#ce93d8"></div>
    <input type="color" id="colorPicker" value="#ffffff">
    <label style="margin-left:4px;">サイズ：</label>
    <select id="fontSizeSelect">
      <option value="11px">11</option><option value="12px">12</option><option value="13px">13</option>
      <option value="14px" selected>14</option><option value="16px">16</option><option value="18px">18</option>
      <option value="20px">20</option><option value="24px">24</option><option value="28px">28</option><option value="32px">32</option>
    </select>
  </div>
  <div id="memoBody" contenteditable="true" spellcheck="false"></div>
  <div id="memoFooter">
    <button id="memoClearBtn">クリア</button>
    <span id="memoCharCount">0 文字</span>
    <button id="memoSaveBtn">💾 保存</button>
  </div>
</div>

<script>
function pad(n){return String(n).padStart(2,'0');}

/* ── 時計 ── */
function updateClock(){
  var now=new Date(),dow=['日','月','火','水','木','金','土'][now.getDay()];
  document.getElementById('clock').innerHTML=now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate()+' ('+dow+')<br>'+now.getHours()+'<span class="blink">:</span>'+pad(now.getMinutes());
  document.getElementById('ssClock').textContent=pad(now.getHours())+':'+pad(now.getMinutes());
  document.getElementById('ssDate').textContent=now.getFullYear()+' / '+pad(now.getMonth()+1)+' / '+pad(now.getDate())+' ('+dow+')';
}
setInterval(updateClock,1000); updateClock();

/* ── アイドル ── */
var ssActive=false,idleTimer,idleCount=30,IDLE_SEC=30;
function showScreensaver(){if(dummyActive)return;ssActive=true;document.getElementById('screensaver').classList.add('active');document.getElementById('privacyStatus').textContent='スクリーンセーバー中';}
function hideScreensaver(){ssActive=false;document.getElementById('screensaver').classList.remove('active');if(!dummyActive)document.getElementById('privacyStatus').textContent='待機中';resetIdleTimer();}
function resetIdleTimer(){
  clearInterval(idleTimer);idleCount=IDLE_SEC;
  if(!dummyActive&&!ssActive)document.getElementById('privacyStatus').textContent='待機中';
  idleTimer=setInterval(function(){if(dummyActive||ssActive)return;idleCount--;document.getElementById('privacyStatus').textContent='💤 '+idleCount+'秒後';if(idleCount<=0){clearInterval(idleTimer);showScreensaver();}},1000);
}

/* ── 覗き見防止 ── */
var filterOn=false;
function toggleFilter(){
  filterOn=!filterOn;
  document.getElementById('darkVeil').classList.toggle('active',filterOn);
  document.body.classList.toggle('veil-on',filterOn);
  document.getElementById('filterBtn').classList.toggle('on',filterOn);
  if(!dummyActive&&!ssActive)document.getElementById('privacyStatus').textContent=filterOn?'覗き見防止有効':'待機中';
}

/* ── 地理ノート偽装 ── */
var dummyActive=false;
function showDummy(){
  dummyActive=true;
  document.getElementById('disguiseOverlay').classList.add('active');
  document.getElementById('disguiseHint').classList.add('active');
  document.getElementById('privacyStatus').textContent='地理ノート表示中';
}
function hideDummy(){
  dummyActive=false;
  document.getElementById('disguiseOverlay').classList.remove('active');
  document.getElementById('disguiseHint').classList.remove('active');
  document.getElementById('privacyStatus').textContent='待機中';
  resetIdleTimer();
}

/* ── 地理ノートのページ切り替え ── */
function geoShowPage(id,linkEl){
  document.querySelectorAll('.geo-page').forEach(function(p){p.classList.remove('geo-active');});
  document.getElementById('geo-page-'+id).classList.add('geo-active');
  document.querySelectorAll('#geo-nav a').forEach(function(a){a.classList.remove('geo-active');});
  if(linkEl)linkEl.classList.add('geo-active');
  document.getElementById('disguiseOverlay').scrollTo({top:0,behavior:'smooth'});
}
function geoSwitchTab(btn,tabId){
  var sec=btn.closest('.geo-content-section');
  sec.querySelectorAll('.geo-tab-btn').forEach(function(b){b.classList.remove('geo-active');});
  sec.querySelectorAll('.geo-tab-content').forEach(function(c){c.classList.remove('geo-active');});
  btn.classList.add('geo-active');
  document.getElementById(tabId).classList.add('geo-active');
}

/* ── 背景 ── */
function changeBg(url){document.body.style.backgroundImage="url('"+url+"')";document.getElementById('bgMenu').classList.remove('open');}

/* ── タブ名・ファビコン偽装 ── */
var originalTitle=document.title;
var originalFavicon=document.querySelector('link[rel="icon"]')?document.querySelector('link[rel="icon"]').href:'';
function applyDisguise(title,faviconUrl,reset){
  var link=document.querySelector('link[rel="icon"]');
  if(!link){link=document.createElement('link');link.rel='icon';document.head.appendChild(link);}
  if(reset){document.title=originalTitle;link.href=originalFavicon;document.getElementById('disguiseTitleInput').value='';document.getElementById('disguiseFaviconInput').value='';}
  else{if(title)document.title=title;if(faviconUrl)link.href=faviconUrl;if(title)document.getElementById('disguiseTitleInput').value=title;if(faviconUrl)document.getElementById('disguiseFaviconInput').value=faviconUrl;}
  document.getElementById('toolPopup').classList.remove('open');
}

/* ── タブ管理 ── */
var tabs=[],activeTabId=null,tabCounter=0;
function createTab(url){
  var id=++tabCounter;
  var iframe=document.createElement('iframe');iframe.className='tab-frame';iframe.id='frame-'+id;
  document.getElementById('mainContent').appendChild(iframe);
  iframe.addEventListener('load',function(){
    hideLoading(id);
    var tab=tabs.find(function(t){return t.id===id;});
    if(tab&&tab.url){try{var fu='https://www.google.com/s2/favicons?sz=32&domain='+new URL(tab.url).hostname;var fi=tab.tabEl.querySelector('.tab-favicon');if(!fi){fi=document.createElement('img');fi.className='tab-favicon';tab.tabEl.insertBefore(fi,tab.tabEl.firstChild);}fi.src=fu;fi.onerror=function(){this.style.display='none';};}catch(e){}}
    try{var cw=iframe.contentWindow;['mousemove','mousedown','keydown','scroll','wheel','touchstart'].forEach(function(ev){cw.addEventListener(ev,function(){if(!dummyActive&&!ssActive)resetIdleTimer();},{passive:true});});}catch(e){}
  });
  var tabEl=document.createElement('div');tabEl.className='tab';tabEl.dataset.id=id;
  tabEl.innerHTML='<span class="tab-title">新しいタブ</span><button class="tab-close">×</button>';
  tabEl.querySelector('.tab-close').onclick=function(e){e.stopPropagation();closeTab(id);};
  tabEl.onclick=function(){switchTab(id);};
  document.getElementById('tabbar').insertBefore(tabEl,document.getElementById('addTabBtn'));
  tabs.push({id:id,url:'',frameEl:iframe,tabEl:tabEl});
  switchTab(id);if(url)loadUrlToTab(id,url);return id;
}
function switchTab(id){
  activeTabId=id;
  tabs.forEach(function(t){var on=t.id===id;t.frameEl.classList.toggle('active',on);t.tabEl.classList.toggle('active',on);});
  var tab=tabs.find(function(t){return t.id===id;});
  if(tab){document.getElementById('urlInput').value=tab.url||'';document.getElementById('messageArea').style.display=tab.url?'none':'flex';}
  resetIdleTimer();
}
function closeTab(id){
  var idx=tabs.findIndex(function(t){return t.id===id;});if(idx===-1)return;
  tabs[idx].frameEl.remove();tabs[idx].tabEl.remove();tabs.splice(idx,1);
  if(tabs.length===0)createTab();else switchTab(tabs[Math.min(idx,tabs.length-1)].id);
  saveTabSession();
}
var loadingTimers={};
function hideLoading(id){if(loadingTimers[id]){clearTimeout(loadingTimers[id]);delete loadingTimers[id];}if(activeTabId===id)document.getElementById('loadingOverlay').classList.remove('active');}

var SITE_NAMES={'youtube.com':'YouTube','google.com':'Google','google.co.jp':'Google','gmail.com':'Gmail','drive.google.com':'Google Drive','docs.google.com':'Google Docs','classroom.google.com':'Google Classroom','meet.google.com':'Google Meet','twitter.com':'Twitter / X','x.com':'X (Twitter)','instagram.com':'Instagram','github.com':'GitHub','wikipedia.org':'Wikipedia','ja.wikipedia.org':'Wikipedia (日本語)','amazon.co.jp':'Amazon','netflix.com':'Netflix','nicovideo.jp':'ニコニコ動画','pixiv.net':'pixiv','yahoo.co.jp':'Yahoo! Japan','chatgpt.com':'ChatGPT','claude.ai':'Claude'};
function getSiteName(url){try{var h=new URL(url).hostname.replace('www.','');if(SITE_NAMES[h])return SITE_NAMES[h];var p=h.split('.');if(p.length>2){var b=p.slice(-2).join('.');if(SITE_NAMES[b])return SITE_NAMES[b];}return h;}catch(e){return url;}}
function resolveInput(input){input=input.trim();if(/^https?:\/\//i.test(input))return input;if(/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(input))return 'https://'+input;return 'https://duckduckgo.com/?q='+encodeURIComponent(input);}
function loadUrlToTab(id,url){
  var tab=tabs.find(function(t){return t.id===id;});if(!tab)return;
  url=resolveInput(url);tab.url=url;tab.frameEl.src=url;tab.tabEl.querySelector('.tab-title').textContent=getSiteName(url);
  document.getElementById('messageArea').style.display='none';document.getElementById('urlInput').value=url;
  if(id===activeTabId)document.getElementById('loadingOverlay').classList.add('active');
  if(loadingTimers[id])clearTimeout(loadingTimers[id]);loadingTimers[id]=setTimeout(function(){hideLoading(id);},10000);
  saveTabSession();resetIdleTimer();
}
function loadUrl(url){loadUrlToTab(activeTabId,url);}
function saveTabSession(){localStorage.setItem('untraceable_tabs',JSON.stringify(tabs.map(function(t){return{url:t.url};})));}
function restoreTabSession(){try{var data=JSON.parse(localStorage.getItem('untraceable_tabs')||'[]');if(!data.length)return false;data.forEach(function(d){createTab(d.url||'');});return true;}catch(e){return false;}}

/* ── ブックマーク ── */
var favs=JSON.parse(localStorage.getItem('favs')||'[{"name":"Wiki","url":"https://ja.wikipedia.org","favicon":""}]');
function saveFavs(){localStorage.setItem('favs',JSON.stringify(favs));}
function getFaviconUrl(u){try{return 'https://www.google.com/s2/favicons?sz=32&domain='+new URL(u).hostname;}catch(e){return '';}}
function renderFavs(){
  var bar=document.getElementById('favBar');bar.innerHTML='<div class="fav-header">ブックマーク</div>';
  favs.forEach(function(f,i){
    var item=document.createElement('div');item.className='fav-item';item.draggable=true;item.dataset.index=i;
    var fs=f.favicon||getFaviconUrl(f.url);
    item.innerHTML='<span class="remove-btn">×</span>'+(fs?'<img class="fav-favicon" src="'+fs+'" onerror="this.style.display=\'none\'">':'')+'<span class="fav-name">'+f.name+'</span>';
    item.addEventListener('click',function(e){if(e.target.classList.contains('remove-btn'))return;loadUrl(f.url);});
    item.querySelector('.remove-btn').addEventListener('click',function(e){e.stopPropagation();favs.splice(i,1);saveFavs();renderFavs();});
    item.addEventListener('dragstart',function(e){e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',i);setTimeout(function(){item.classList.add('dragging');},0);});
    item.addEventListener('dragend',function(){item.classList.remove('dragging');});
    item.addEventListener('dragover',function(e){e.preventDefault();item.classList.add('drag-over');});
    item.addEventListener('dragleave',function(){item.classList.remove('drag-over');});
    item.addEventListener('drop',function(e){e.preventDefault();item.classList.remove('drag-over');var from=parseInt(e.dataTransfer.getData('text/plain'));if(from===i)return;var mv=favs.splice(from,1)[0];favs.splice(i,0,mv);saveFavs();renderFavs();});
    bar.appendChild(item);
  });
  var ab=document.createElement('div');ab.className='fav-item';ab.innerHTML='<span style="font-size:20px;line-height:1;">＋</span>';
  ab.addEventListener('click',function(){var n=prompt('名前');if(!n)return;var u=prompt('URL');if(!u)return;if(!/^https?:\/\//i.test(u))u='https://'+u;favs.push({name:n,url:u,favicon:getFaviconUrl(u)});saveFavs();renderFavs();});
  bar.appendChild(ab);
}

/* ── メモ ── */
function saveMemo(){localStorage.setItem('untraceable_memo',document.getElementById('memoBody').innerHTML);var now=new Date();document.getElementById('memoSaveStatus').textContent='保存 '+pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds());}
function updateCharCount(){var t=document.getElementById('memoBody').innerText||'';document.getElementById('memoCharCount').textContent=t.replace(/\n/g,'').length+' 文字';}

/* ── DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded',function(){

  /* 起動アニメーション */
  (function(){
    var ov=document.getElementById('bootOverlay'),fill=document.getElementById('bootBarFill');
    ov.style.display='flex';
    [{line:'bl0',ok:null,bar:15,delay:0},{line:'bl1',ok:'bl1ok',bar:40,delay:550},{line:'bl2',ok:'bl2ok',bar:65,delay:1050},{line:'bl3',ok:'bl3ok',bar:88,delay:1550},{line:'bl4',ok:'bl4ok',bar:100,delay:2050}].forEach(function(s){
      setTimeout(function(){document.getElementById(s.line).classList.add('show');fill.style.width=s.bar+'%';if(s.ok)document.getElementById(s.ok).textContent=' ✓ OK';},s.delay);
    });
    setTimeout(function(){ov.style.transition='opacity 0.7s ease';ov.style.opacity='0';setTimeout(function(){ov.style.display='none';},750);},2600);
  })();

  if(!restoreTabSession())createTab();
  renderFavs();

  var saved=localStorage.getItem('untraceable_memo');
  if(saved){document.getElementById('memoBody').innerHTML=saved;document.getElementById('memoSaveStatus').textContent='読み込み済み';}
  updateCharCount();
  setInterval(function(){if(document.getElementById('memoBody').innerHTML.trim())saveMemo();},30000);

  setInterval(function(){
    if(dummyActive||ssActive)return;
    var ae=document.activeElement;
    var focused=(ae&&ae.classList.contains('tab-frame'))||tabs.some(function(t){try{return t.frameEl.matches(':focus');}catch(e){return false;}})||(function(){try{return document.getElementById('mainContent').matches(':focus-within');}catch(e){return false;}})();
    if(focused)resetIdleTimer();
  },300);

  document.getElementById('logoImg').onclick=function(){var tab=tabs.find(function(t){return t.id===activeTabId;});if(tab){tab.url='';tab.frameEl.src='about:blank';tab.tabEl.querySelector('.tab-title').textContent='新しいタブ';document.getElementById('messageArea').style.display='flex';document.getElementById('urlInput').value='';}};
  document.getElementById('goButton').onclick=function(){var url=document.getElementById('urlInput').value.trim();if(url)loadUrlToTab(activeTabId,url);};
  document.getElementById('urlInput').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('goButton').click();});
  document.getElementById('refreshButton').onclick=function(){var tab=tabs.find(function(t){return t.id===activeTabId;});if(tab&&tab.url)tab.frameEl.src=tab.frameEl.src;};
  document.getElementById('bgButton').onclick=function(){document.getElementById('bgMenu').classList.toggle('open');document.getElementById('toolPopup').classList.remove('open');};
  document.getElementById('historyButton').onclick=function(){window.open('https://html.cafe/x9745a75d');};
  document.getElementById('resetButton').onclick=function(){if(confirm('セッションを終了しますか？'))location.reload();};

  /* 偽装ボタン → 地理ノートを表示 */
  document.getElementById('panicBtn').onclick=showDummy;

  document.getElementById('filterBtn').onclick=toggleFilter;
  document.getElementById('menuButton').onclick=function(){document.getElementById('toolPopup').classList.toggle('open');document.getElementById('bgMenu').classList.remove('open');};
  document.getElementById('addTabBtn').onclick=function(){createTab();};
  document.getElementById('screensaver').addEventListener('click',hideScreensaver);

  /* ===== キーボードショートカット ===== */
  document.addEventListener('keydown',function(e){
    /* 偽装中: Shift+Esc で解除 */
    if(dummyActive&&e.key==='Escape'&&e.shiftKey){hideDummy();e.preventDefault();return;}
    /* 通常時: Esc で地理ノートを表示 */
    if(!dummyActive&&!ssActive&&e.key==='Escape'&&!e.shiftKey){showDummy();e.preventDefault();return;}
    /* スクリーンセーバー解除 */
    if(!dummyActive&&ssActive){hideScreensaver();return;}
    if(e.altKey&&(e.key==='p'||e.key==='π')){toggleFilter();e.preventDefault();}
    if(e.ctrlKey&&e.key==='t'){e.preventDefault();createTab();}
  });

  ['mousemove','mousedown','keydown','touchstart','scroll','wheel'].forEach(function(ev){
    document.addEventListener(ev,function(e){
      if(ssActive){if(ev==='mousedown'||ev==='touchstart')hideScreensaver();return;}
      if(!dummyActive)resetIdleTimer();
    },{passive:true});
  });

  document.getElementById('memoToggleBtn').onclick=function(){document.getElementById('memoPanel').classList.toggle('open');};
  (function(){
    var panel=document.getElementById('memoPanel'),header=document.getElementById('memoHeader'),dragging=false,startX,startY,origLeft,origTop;
    header.addEventListener('mousedown',function(e){if(e.target.id==='memoCloseBtn')return;dragging=true;startX=e.clientX;startY=e.clientY;var r=panel.getBoundingClientRect();origLeft=r.left;origTop=r.top;panel.style.bottom='auto';panel.style.top=origTop+'px';panel.style.left=origLeft+'px';e.preventDefault();});
    document.addEventListener('mousemove',function(e){if(!dragging)return;panel.style.left=(origLeft+e.clientX-startX)+'px';panel.style.top=(origTop+e.clientY-startY)+'px';});
    document.addEventListener('mouseup',function(){dragging=false;});
  })();
  document.getElementById('memoCloseBtn').onclick=function(){document.getElementById('memoPanel').classList.remove('open');};
  document.getElementById('memoSaveBtn').onclick=saveMemo;
  document.getElementById('memoClearBtn').onclick=function(){if(confirm('メモをクリアしますか？')){document.getElementById('memoBody').innerHTML='';localStorage.removeItem('untraceable_memo');document.getElementById('memoSaveStatus').textContent='クリア済み';updateCharCount();}};
  document.getElementById('memoBody').addEventListener('input',function(){updateCharCount();document.getElementById('memoSaveStatus').textContent='未保存';});
  document.querySelectorAll('.color-swatch').forEach(function(s){s.onclick=function(){document.getElementById('memoBody').focus();document.execCommand('foreColor',false,s.dataset.color);};});
  document.getElementById('colorPicker').oninput=function(){document.getElementById('memoBody').focus();document.execCommand('foreColor',false,this.value);};
  document.getElementById('fontSizeSelect').onchange=function(){var sz=this.value,sel=window.getSelection();if(sel&&!sel.isCollapsed&&document.getElementById('memoBody').contains(sel.anchorNode)){document.execCommand('fontSize',false,'7');document.getElementById('memoBody').querySelectorAll('font[size="7"]').forEach(function(el){el.removeAttribute('size');el.style.fontSize=sz;});}else{document.getElementById('memoBody').style.fontSize=sz;}};

  document.addEventListener('click',function(e){if(!e.target.closest('#bgMenu')&&!e.target.closest('#bgButton'))document.getElementById('bgMenu').classList.remove('open');if(!e.target.closest('#toolPopup')&&!e.target.closest('#menuButton'))document.getElementById('toolPopup').classList.remove('open');});
  window.addEventListener('blur',function(){document.getElementById('bgMenu').classList.remove('open');document.getElementById('toolPopup').classList.remove('open');});

  /* FPS + RAM */
  (function(){var times=[],fpsEl=document.getElementById('fpsDisplay');function getRam(){if(performance&&performance.memory){return ' │ '+(performance.memory.usedJSHeapSize/1048576).toFixed(0)+' MB';}return '';}function loop(now){times.push(now);times=times.filter(function(t){return now-t<1000;});var fps=times.length;fpsEl.style.color=fps<=10?'#f44':fps<=30?'#fa0':'#0f0';fpsEl.textContent=fps+' FPS'+getRam();requestAnimationFrame(loop);}requestAnimationFrame(loop);})();

  resetIdleTimer();
});
</script>
</body>
</html>
