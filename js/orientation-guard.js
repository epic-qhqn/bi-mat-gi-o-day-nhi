/**
 * ORIENTATION GUARD (Khoá màn hình ngang trên điện thoại)
 * The blocking overlay itself is driven by CSS (@media orientation + pointer: coarse) so it works
 * instantly with zero flash. This module only adds the progressive enhancements CSS cannot do:
 *  - marks <html> with .is-portrait-blocked (a11y: inert background, pause-friendly hook for other modules)
 *  - best-effort screen.orientation.lock('landscape') (only succeeds in fullscreen/installed PWA on Android)
 */
(function () {
    'use strict';

    const root = document.documentElement;
    // Same condition as the CSS block: touch-first device, portrait, phone-sized short edge.
    const blockQuery = window.matchMedia('(orientation: portrait) and (hover: none) and (pointer: coarse) and (max-width: 820px)');
    const BACKGROUND_IDS = [
        'wrap',
        'name-modal',
        'time-lock-modal',
        'secret-letter-modal',
        'garden-polaroid-modal',
        'boarding-pass-modal',
        'experience-guide-modal'
    ];

    const setInert = (on) => {
        BACKGROUND_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            if (on) el.setAttribute('inert', '');
            else el.removeAttribute('inert');
        });
    };

    const tryLockLandscape = () => {
        try {
            const o = screen.orientation;
            if (o && typeof o.lock === 'function') {
                const p = o.lock('landscape');
                if (p && typeof p.catch === 'function') p.catch(() => {});
            }
        } catch (_) { /* unsupported (iOS Safari) - overlay remains the fallback */ }
    };

    const apply = () => {
        const blocked = blockQuery.matches;
        root.classList.toggle('is-portrait-blocked', blocked);
        setInert(blocked);
        if (blocked) tryLockLandscape();
        // Re-sync guide spotlight positions after the viewport flips
        if (!blocked && typeof window.refreshRealtimeGuide === 'function') {
            setTimeout(window.refreshRealtimeGuide, 120);
        }
    };

    if (typeof blockQuery.addEventListener === 'function') blockQuery.addEventListener('change', apply);
    else if (typeof blockQuery.addListener === 'function') blockQuery.addListener(apply); // old Safari
    window.addEventListener('orientationchange', () => setTimeout(apply, 60));
    window.addEventListener('resize', apply);

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
    else apply();
})();
