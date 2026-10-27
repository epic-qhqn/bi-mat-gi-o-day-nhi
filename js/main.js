/**
 * MAIN ORCHESTRATOR & CANVAS TREE ENGINE
 * Initializes canvas Tree, seed germination, sprout/tree/blossom animation loop,
 * Stage 0 drag & drop interactive tools, and responsive viewport autoscale engine.
 */
(function () {
  'use strict';

  const canvas = document.getElementById("canvas");
  if (!canvas || !canvas.getContext) {
    const errorEl = document.getElementById("error");
    if (errorEl) errorEl.style.display = "block";
    return;
  }

  const width = canvas.clientWidth || 1100;
  const height = canvas.clientHeight || 680;
  canvas.width = width;
  canvas.height = height;
  const initCtx = canvas.getContext('2d');
  if (initCtx) {
    initCtx.clearRect(0, 0, width, height);
  }

  const opts = {
    seed: {
      x: width / 2 - 20,
      color: "rgb(190, 26, 37)",
      scale: 2,
    },
    branch: [
      [ 535, 680, 570, 250, 500, 200, 30, 100,
        [
          [ 540,500,455,417,340, 400, 13, 100,
            [[450, 435, 434, 430, 394, 395, 2, 40]],
          ],
          [ 550, 445, 600, 356, 680, 345, 12, 100,
            [[578, 400, 648, 409, 661, 426, 3, 80]],
          ],
          [539, 281, 537, 248, 534, 217, 3, 40],
          [ 546, 397, 413, 247, 328, 244, 9, 80,
            [
              [427, 286, 383, 253, 371, 205, 2, 40],
              [498, 345, 435, 315, 395, 330, 4, 60],
            ],
          ],
          [ 546, 357, 608, 252, 678, 221, 6, 100,
            [[590, 293, 646, 277, 648, 271, 2, 80]],
          ],
        ],
      ],
    ],
    bloom: {
      num: 700,
      width: 1080,
      height: 650,
    },
    footer: {
      width: 1200,
      height: 5,
      speed: 10,
    },
  };

  const tree = new Tree(canvas, width, height, opts);
  const seed = tree.seed;
  const foot = tree.footer;

  // Global reference for inspection
  window.gardenTree = tree;

  // =========================================================================
  // SYNCHRONOUS HEART-TREE GENERATOR (100% RELIABLE FOR POLAROID & EXPORTS)
  // =========================================================================
  const getOrGenerateBloomedTreeCanvas = () => {
    if (window.bloomedTreeCanvas && window.bloomedTreeCanvas.width > 0) {
      return window.bloomedTreeCanvas;
    }

    try {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;

      const offOpts = {
        seed: { x: width / 2 - 20, color: "rgb(190, 26, 37)", scale: 2 },
        branch: opts.branch,
        bloom: { num: 700, width: 1080, height: 650 },
        footer: { width: 1200, height: 5, speed: 10 }
      };

      const syncTree = new Tree(offCanvas, width, height, offOpts);
      while (syncTree.canGrow()) {
        syncTree.grow();
      }
      do {
        syncTree.flower(50);
      } while (syncTree.canFlower() || (syncTree.bloomsCache && syncTree.bloomsCache.length > 0));

      syncTree.snapshot("p1", 240, 0, 610, 680);
      const offCtx = offCanvas.getContext('2d');
      offCtx.clearRect(0, 0, width, height);
      const rec = syncTree.record["p1"];
      if (rec && rec.image) {
        offCtx.putImageData(rec.image, 500, 0);
      }

      window.bloomedTreeCanvas = offCanvas;
      try {
        const snapUrl = offCanvas.toDataURL("image/png");
        window.bloomedTreeSnapshotDataUrl = snapUrl;
        window.currentGardenSnapshotUrl = snapUrl;
        const bImg = new Image();
        bImg.src = snapUrl;
        window.bloomedTreeImage = bImg;
      } catch (_) {}

      return offCanvas;
    } catch (err) {
      console.error("Lỗi tạo cây hoa đồng bộ:", err);
      return canvas;
    }
  };
  window.getOrGenerateBloomedTreeCanvas = getOrGenerateBloomedTreeCanvas;

  // =========================================================================
  // STAGE TRANSITION RESOLVER
  // =========================================================================
  let stagePromiseResolve = null;

  const awaitNextStage = () => new Promise(resolve => {
    stagePromiseResolve = resolve;
  });

  const triggerNextStage = () => {
    if (stagePromiseResolve) {
      const resolve = stagePromiseResolve;
      stagePromiseResolve = null;
      resolve();
    }
  };

  window.triggerNextStage = triggerNextStage;

  // =========================================================================
  // TREE ANIMATIONS
  // =========================================================================
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const seedAnimate = async () => {
    seed.draw = function () {
      this.drawHeart();
      const ctx = this.tree.ctx, heart = this.heart;
      const { point, color, scale } = heart;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.translate(point.x, point.y);
      ctx.scale(scale, scale);
      ctx.moveTo(0, 0);
      ctx.lineTo(15, 15);
      ctx.lineTo(60, 15);
      ctx.stroke();
      ctx.restore();
    };

    seed.draw();
    while (seed.canScale()) {
      seed.scale(0.95);
      await sleep(10);
    }
    while (seed.canMove()) {
      seed.move(0, 2);
      foot.draw();
      await sleep(10);
    }
  };

  const growAnimate = async () => {
    do {
      tree.grow();
      await sleep(10);
    } while (tree.canGrow());
  };

  const flowAnimate = async () => {
    do {
      tree.flower(2);
      await sleep(10);
    } while (tree.canFlower());
  };

  const moveAnimate = async () => {
    tree.snapshot("p1", 240, 0, 610, 680);
    while (tree.move("p1", 500, 0)) {
      foot.draw();
      await sleep(10);
    }
    foot.draw();
    tree.snapshot("p2", 500, 0, 610, 680);

    const snapshotDataUrl = tree.toDataURL("image/png");
    window.bloomedTreeSnapshotDataUrl = snapshotDataUrl;
    window.currentGardenSnapshotUrl = snapshotDataUrl;
    
    // Create dedicated offscreen canvas snapshot (100% resilient against clearRect)
    try {
      const snapCanvas = document.createElement('canvas');
      snapCanvas.width = width;
      snapCanvas.height = height;
      snapCanvas.getContext('2d').drawImage(canvas, 0, 0);
      window.bloomedTreeCanvas = snapCanvas;
    } catch (_) {}

    const bloomedImg = new Image();
    bloomedImg.src = snapshotDataUrl;
    window.bloomedTreeImage = bloomedImg;

    canvas.parentNode.style.background = "url(" + snapshotDataUrl + ")";
    canvas.style.background = "transparent";
    await sleep(300);
    canvas.style.background = "none";
  };

  const jumpAnimate = async () => {
    while (true) {
      if (document.hidden) {
        // Battery saver sleep when tab is hidden
        await sleep(500);
        continue;
      }
      tree.ctx.clearRect(0, 0, width, height);
      tree.jump();
      foot.draw();
      await sleep(25);
    }
  };

  // =========================================================================
  // MAIN GROWTH SEQUENCE ORCHESTRATOR
  // =========================================================================
  const runAsync = async () => {
    try {
      // ==== STAGE 1: Nảy mầm (Sprout) ====
      await awaitNextStage();
      await seedAnimate();

      // Grow ~60 iterations to look like a sprout
      for (let i = 0; i < 60; i++) {
        if (tree.canGrow()) {
          tree.grow();
          await sleep(10);
        }
      }
      try {
        window.currentGardenSnapshotUrl = canvas.toDataURL("image/png");
      } catch (_) {}

      // ==== STAGE 2: Lên cây non (Young Tree) ====
      await awaitNextStage();
      // Grow another ~160 iterations to look like a small tree
      for (let i = 0; i < 160; i++) {
        if (tree.canGrow()) {
          tree.grow();
          await sleep(10);
        }
      }
      try {
        window.currentGardenSnapshotUrl = canvas.toDataURL("image/png");
      } catch (_) {}

      // ==== STAGE 3: Trưởng thành & Ra hoa (Full Blossom) ====
      await awaitNextStage();
      // Grow the rest until fully finished
      while (tree.canGrow()) {
        tree.grow();
        await sleep(10);
      }

      // Bloom flowers & shift tree to the right
      await flowAnimate();
      await moveAnimate();

      document.body.classList.remove('stage-1-active', 'stage-2-active', 'stage-3-active');
      document.body.classList.add('stage-4-active', 'has-letter-open');

      // Reveal love letter typewriter
      if (typeof window.loadContentAndAnimateText === 'function') {
        window.loadContentAndAnimateText();
      }

      // Lock environment to starry night
      if (typeof window.lockEnvironmentToNight === 'function') {
        window.lockEnvironmentToNight();
      }

      // After 5s: Reveal action buttons & secret letter
      setTimeout(() => {
        if (typeof window.updatePolaroidLetterContent === 'function') {
          window.updatePolaroidLetterContent();
        }
        if (typeof window.revealSecretLetterButton === 'function') {
          window.revealSecretLetterButton();
        }
        if (typeof window.revealBoardingPassButton === 'function') {
          window.revealBoardingPassButton();
        }
        if (typeof window.revealGardenStageSelector === 'function') {
          window.revealGardenStageSelector();
        }

        const aoDaiFig = document.getElementById('ao-dai-viet-stage4');
        if (aoDaiFig) {
          aoDaiFig.classList.remove('hidden');
          setTimeout(() => {
            aoDaiFig.classList.add('hien-thi');
            aoDaiFig.classList.add('poem-visible');
            setTimeout(() => aoDaiFig.classList.remove('poem-visible'), 6000);
          }, 150);
        }

        const cloverEl = document.getElementById('sprout-lucky-clover');
        if (cloverEl) {
          cloverEl.classList.remove('visible');
          setTimeout(() => cloverEl.classList.add('hidden'), 800);
        }

        const mascotCompanion = document.getElementById('garden-mascot-companion');
        if (mascotCompanion) {
          mascotCompanion.classList.add('relocated-for-letter');
          if (typeof window.showMascotSpeech === 'function') {
            window.showMascotSpeech("Khu vườn ngát hương sen, có một lá thư bí mật 20/10 gửi bạn nè! 💌🪷", 6000);
          }
          if (typeof window.playRobotChirpSFX === 'function') {
            window.playRobotChirpSFX();
          }
        }
      }, 5000);

      // Continuous falling petals loop
      await jumpAnimate();
    } catch (err) {
      console.error("Lỗi tiến trình sinh trưởng cây:", err);
    }
  };

  runAsync();

  // =========================================================================
  // STAGE 0 FALLBACK DRAG & DROP TOOLS
  // =========================================================================
  const toolWater = document.getElementById('tool-water');
  const toolFertilize = document.getElementById('tool-fertilize');
  const gardenMsg = document.getElementById('garden-message');

  let draggedElement = null;
  let dragStartPos = { x: 0, y: 0 };
  let offsetX = 0, offsetY = 0;
  let hasMovedSignificantly = false;

  const initDrag = (e, el) => {
    if (el.dataset.used === 'true') return;
    draggedElement = el;
    hasMovedSignificantly = false;
    el.classList.add('dragging');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    dragStartPos = { x: clientX, y: clientY };
    const rect = el.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    el.style.bottom = 'auto';
    el.style.right = 'auto';
    el.style.left = rect.left + 'px';
    el.style.top = rect.top + 'px';
  };

  const onDrag = (e) => {
    if (!draggedElement) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (Math.hypot(clientX - dragStartPos.x, clientY - dragStartPos.y) > 10) {
      hasMovedSignificantly = true;
    }

    draggedElement.style.left = (clientX - offsetX) + 'px';
    draggedElement.style.top = (clientY - offsetY) + 'px';
  };

  const endDrag = (e) => {
    if (!draggedElement) return;
    const el = draggedElement;
    el.classList.remove('dragging');
    draggedElement = null;

    if (!hasMovedSignificantly) {
      applyToolAction(el, true);
      return;
    }

    const seedHint = document.getElementById('seed-hint');
    let isHit = false;

    if (seedHint) {
      const targetRect = seedHint.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 2 + 15;

      const toolRect = el.getBoundingClientRect();
      const toolX = toolRect.left + toolRect.width / 2;
      const toolY = toolRect.top + toolRect.height / 2;

      if (Math.hypot(targetX - toolX, targetY - toolY) < 180) {
        isHit = true;
      }
    }

    if (isHit) {
      applyToolAction(el, false);
    } else {
      el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      el.style.left = '';
      el.style.top = '';
      el.style.bottom = '';
      el.style.right = '';
      setTimeout(() => { el.style.transition = ''; }, 500);
    }
  };

  const applyToolAction = (el, autoAnimate = false) => {
    const toolType = el.dataset.tool;
    const seedHint = document.getElementById('seed-hint');

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.55;

    if (seedHint) {
      const sRect = seedHint.getBoundingClientRect();
      targetX = sRect.left + sRect.width / 2;
      targetY = sRect.top + sRect.height / 2 + 15;
    }

    if (autoAnimate) {
      el.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      el.style.left = (targetX - 32) + 'px';
      el.style.top = (targetY - 50) + 'px';
      el.style.transform = 'scale(1.1) rotate(-40deg)';
    } else {
      el.style.transition = 'transform 0.4s ease';
      el.style.transform = 'rotate(-45deg)';
    }

    setTimeout(() => {
      const state = window.gardenState || { currentStage: 0 };
      if (toolType === 'water' && !state.isWatered && (state.currentStage === 0 || state.currentStage === 1)) {
        state.isWatered = true;
        if (gardenMsg) gardenMsg.textContent = "Đã tưới nước thành công!";
        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('success');
        if (typeof window.createWaterVFX === 'function') window.createWaterVFX(targetX, targetY);
        if (typeof window.triggerMascotWatering === 'function') window.triggerMascotWatering();
        el.dataset.used = 'true';
        el.fadeTimeout = setTimeout(() => {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
        }, 800);
      } else if (toolType === 'fertilize' && !state.isFertilized && (state.currentStage === 0 || state.currentStage === 2)) {
        state.isFertilized = true;
        if (gardenMsg) gardenMsg.textContent = "Đã bón phân thành công!";
        if (typeof window.triggerHaptic === 'function') window.triggerHaptic('success');
        if (typeof window.createFertilizerVFX === 'function') window.createFertilizerVFX(targetX, targetY);
        if (typeof window.triggerMascotFertilizing === 'function') window.triggerMascotFertilizing();
        el.dataset.used = 'true';
        el.fadeTimeout = setTimeout(() => {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
        }, 800);
      }
      if (typeof window.checkGrowth === 'function') {
        window.checkGrowth();
      }
    }, autoAnimate ? 600 : 200);
  };

  [toolWater, toolFertilize].forEach(el => {
    if (!el) return;
    el.addEventListener('mousedown', (e) => initDrag(e, el));
    el.addEventListener('touchstart', (e) => initDrag(e, el), { passive: false });
  });

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag, { passive: false });
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);

  // =========================================================================
  // SMART AUTOSCALE ENGINE (PC & MOBILE) & DEVICE OPTIMIZER
  // =========================================================================
  const isLowEndDevice = Boolean(
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );
  window.isLowEndDevice = isLowEndDevice;

  const getSafeAreaInsets = () => {
    try {
      const style = window.getComputedStyle(document.documentElement);
      const sal = parseFloat(style.getPropertyValue('--sal')) || 0;
      const sar = parseFloat(style.getPropertyValue('--sar')) || 0;
      const sat = parseFloat(style.getPropertyValue('--sat')) || 0;
      const sab = parseFloat(style.getPropertyValue('--sab')) || 0;
      return { sal, sar, sat, sab };
    } catch (_) {
      return { sal: 0, sar: 0, sat: 0, sab: 0 };
    }
  };

  const resizeWrap = () => {
    const wrap = document.getElementById('wrap');
    if (!wrap) return;

    const insets = getSafeAreaInsets();
    const baseWidth = 1100;
    const baseHeight = 680;

    // Use visualViewport if available to track actual visible area smoothly against collapsible browser chrome
    const vv = window.visualViewport;
    const vWidth = vv ? vv.width : window.innerWidth;
    const vHeight = vv ? vv.height : window.innerHeight;
    const isPortrait = vHeight > vWidth;

    let scale;
    if (isPortrait) {
      const safeWidth = Math.max(300, vWidth - insets.sal - insets.sar);
      scale = (safeWidth * 0.96) / baseWidth;
    } else {
      // In landscape on short viewports (mobile/tablet landscape <= 540px), ensure safe breathing space & notch insets
      if (vHeight <= 540) {
        // Usable width avoiding left/right notches and Dynamic Island
        const safeWidth = Math.max(320, vWidth - insets.sal - insets.sar);
        // Reserve vertical room for top HUD and bottom system dock
        const verticalReserve = vHeight <= 420 ? 64 : 76;
        const maxAvailableHeight = Math.max(180, vHeight - verticalReserve);
        const scaleX = (safeWidth * 0.94) / baseWidth;
        const scaleY = maxAvailableHeight / baseHeight;
        scale = Math.min(scaleX, scaleY);
      } else {
        // Desktop / Laptop / Large Tablet: Pure native autoscale
        const scaleX = (vWidth * 0.94) / baseWidth;
        const scaleY = vHeight / baseHeight;
        scale = Math.min(scaleX, scaleY);
      }
    }

    wrap.style.transform = `scale(${scale})`;
    window.currentWrapScale = scale;

    // Broadcast dynamic root custom properties for automatic sub-element layout synchronization
    const docStyle = document.documentElement.style;
    docStyle.setProperty('--current-wrap-scale', scale.toFixed(4));
    docStyle.setProperty('--viewport-actual-width', `${Math.round(vWidth)}px`);
    docStyle.setProperty('--viewport-actual-height', `${Math.round(vHeight)}px`);

    if (typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('garden-viewport-scale', {
        detail: { scale, vWidth, vHeight, isPortrait, insets }
      }));
    }
  };

  let resizeTimer = null;
  const debouncedResize = () => {
    resizeWrap();
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeWrap, 80);
  };

  window.addEventListener('resize', debouncedResize);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', debouncedResize);
  }
  window.addEventListener('orientationchange', () => {
    resizeWrap();
    setTimeout(resizeWrap, 100);
    setTimeout(resizeWrap, 300);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      const previewLine = document.getElementById('constellation-preview-line');
      if (previewLine) previewLine.style.display = 'none';
    } else {
      resizeWrap();
      if (typeof window.resumeAudioContext === 'function') {
        window.resumeAudioContext();
      }
    }
  });

  resizeWrap();
})();
