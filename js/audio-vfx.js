// Web Audio API Synthesizers for ASMR SFX
window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.audioCtx = null;

window.initAudio = () => {
    if (!window.audioCtx) window.audioCtx = new window.AudioContext();
    if (window.audioCtx.state === 'suspended') window.audioCtx.resume();
};

// Optional routing: SFX synths take an output node so a caller can mute them instantly (see
// createSfxVoice). Anything that is not an AudioNode (undefined, an Event...) falls back to the speakers.
window.resolveSfxOutput = (out) => (
    typeof AudioNode !== 'undefined' && out instanceof AudioNode ? out : window.audioCtx.destination
);

window.playWaterSFX = () => {
    window.initAudio();
    const bufferSize = window.audioCtx.sampleRate * 1.5;
    const buffer = window.audioCtx.createBuffer(1, bufferSize, window.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1; // White noise
    }
    const noiseSource = window.audioCtx.createBufferSource();
    noiseSource.buffer = buffer;

    const bandpass = window.audioCtx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(800, window.audioCtx.currentTime);
    bandpass.frequency.linearRampToValueAtTime(1500, window.audioCtx.currentTime + 1.5);

    const gainNode = window.audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, window.audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, window.audioCtx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioCtx.currentTime + 1.5);

    noiseSource.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(window.audioCtx.destination);
    noiseSource.start();
};

window.playChimeSFX = () => {
    window.initAudio();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    let startTime = window.audioCtx.currentTime;
    
    notes.forEach((freq, index) => {
        const osc = window.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        const gain = window.audioCtx.createGain();
        gain.gain.setValueAtTime(0, startTime + index * 0.15);
        gain.gain.linearRampToValueAtTime(0.2, startTime + index * 0.15 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + index * 0.15 + 1.5);
        
        osc.connect(gain);
        gain.connect(window.audioCtx.destination);
        osc.start(startTime + index * 0.15);
        osc.stop(startTime + index * 0.15 + 1.5);
    });
};

window.playBubbleChimeSFX = (index = 0) => {
    window.initAudio();
    const freqs = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51]; // C5 to E6
    const freq = freqs[index % freqs.length];
    const osc = window.audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const gain = window.audioCtx.createGain();
    const t = window.audioCtx.currentTime;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.35);
};

window.playBubblePopSFX = () => {
    window.initAudio();
    const t = window.audioCtx.currentTime;
    // Fast frequency sweep for pop
    const osc = window.audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(2400, t + 0.08);
    
    const gain = window.audioCtx.createGain();
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.15);

    // Chime overtone
    const chime = window.audioCtx.createOscillator();
    chime.type = 'sine';
    chime.frequency.value = 1318.51; // E6
    const chimeGain = window.audioCtx.createGain();
    chimeGain.gain.setValueAtTime(0.15, t + 0.04);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    chime.connect(chimeGain);
    chimeGain.connect(window.audioCtx.destination);
    chime.start(t + 0.04);
    chime.stop(t + 0.6);
};

window.playBreezeSFX = () => {
    window.initAudio();
    const t = window.audioCtx.currentTime;
    const chord = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
    chord.forEach((freq, idx) => {
        const osc = window.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const gain = window.audioCtx.createGain();
        gain.gain.setValueAtTime(0, t + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.1, t + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 1.2);
        osc.connect(gain);
        gain.connect(window.audioCtx.destination);
        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 1.2);
    });
};

// Phase 2: Mechanical Letterpress Stamp SFX (Web Audio API)
window.playLetterpressSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // 1. Mechanical transient contact click
    const oscClick = window.audioCtx.createOscillator();
    oscClick.type = 'triangle';
    oscClick.frequency.setValueAtTime(650, t);
    oscClick.frequency.exponentialRampToValueAtTime(120, t + 0.04);
    const clickGain = window.audioCtx.createGain();
    clickGain.gain.setValueAtTime(0.18, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
    oscClick.connect(clickGain);
    clickGain.connect(window.audioCtx.destination);
    oscClick.start(t);
    oscClick.stop(t + 0.05);

    // 2. Solid paper pressure "thud"
    const oscThud = window.audioCtx.createOscillator();
    oscThud.type = 'sine';
    oscThud.frequency.setValueAtTime(160, t);
    oscThud.frequency.exponentialRampToValueAtTime(55, t + 0.08);
    const thudGain = window.audioCtx.createGain();
    thudGain.gain.setValueAtTime(0.14, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    oscThud.connect(thudGain);
    thudGain.connect(window.audioCtx.destination);
    oscThud.start(t);
    oscThud.stop(t + 0.09);

    // 3. Subtle vintage brass resonance overtone
    const oscChime = window.audioCtx.createOscillator();
    oscChime.type = 'sine';
    oscChime.frequency.setValueAtTime(987.77, t + 0.01); // B5 metallic brass ping
    const chimeGain = window.audioCtx.createGain();
    chimeGain.gain.setValueAtTime(0.05, t + 0.01);
    chimeGain.gain.exponentialRampToValueAtTime(0.0005, t + 0.18);
    oscChime.connect(chimeGain);
    chimeGain.connect(window.audioCtx.destination);
    oscChime.start(t + 0.01);
    oscChime.stop(t + 0.18);
};

// Phase 2: Golden Brass Dust Sparkles
window.createBrassDustVFX = (x, y) => {
    const container = document.body;
    for (let i = 0; i < 6; i++) {
        const dot = document.createElement('div');
        dot.className = 'brass-dust-particle';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        container.appendChild(dot);

        const angle = (Math.PI * 2 / 6) * i + (Math.random() - 0.5) * 0.4;
        const dist = 14 + Math.random() * 22;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 8; // slight upward drift

        dot.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 400 + Math.random() * 200,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards'
        });

        setTimeout(() => dot.remove(), 700);
    }
};

// Phase 2.3: Molten Wax Stamp ASMR SFX (Squish + Solid Thud + Metallic Lift)
window.playWaxStampSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // 1. Warm pliable wax squash (lowpass filtered noise)
    const bufferSize = Math.floor(window.audioCtx.sampleRate * 0.12);
    const buffer = window.audioCtx.createBuffer(1, bufferSize, window.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }
    const noiseSource = window.audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    const waxFilter = window.audioCtx.createBiquadFilter();
    waxFilter.type = 'lowpass';
    waxFilter.frequency.setValueAtTime(450, t);
    waxFilter.frequency.exponentialRampToValueAtTime(180, t + 0.12);

    const waxGain = window.audioCtx.createGain();
    waxGain.gain.setValueAtTime(0.22, t);
    waxGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    noiseSource.connect(waxFilter);
    waxFilter.connect(waxGain);
    waxGain.connect(window.audioCtx.destination);
    noiseSource.start(t);

    // 2. Heavy brass seal downward press thud (solid downward punch)
    const oscPress = window.audioCtx.createOscillator();
    oscPress.type = 'sine';
    oscPress.frequency.setValueAtTime(140, t);
    oscPress.frequency.exponentialRampToValueAtTime(48, t + 0.14);
    const pressGain = window.audioCtx.createGain();
    pressGain.gain.setValueAtTime(0.28, t);
    pressGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    oscPress.connect(pressGain);
    pressGain.connect(window.audioCtx.destination);
    oscPress.start(t);
    oscPress.stop(t + 0.15);

    // 3. Delicate release suction & brass sheen overtone (occurs ~0.12s after press)
    const oscLift = window.audioCtx.createOscillator();
    oscLift.type = 'triangle';
    oscLift.frequency.setValueAtTime(580, t + 0.12);
    oscLift.frequency.exponentialRampToValueAtTime(1400, t + 0.18);
    const liftGain = window.audioCtx.createGain();
    liftGain.gain.setValueAtTime(0.08, t + 0.12);
    liftGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    oscLift.connect(liftGain);
    liftGain.connect(window.audioCtx.destination);
    oscLift.start(t + 0.12);
    oscLift.stop(t + 0.22);
};

// Phase 3.2: Viscous Molten Wax Pouring Stream ASMR SFX
window.playWaxPourSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // 1. Viscous stream flow sound (modulated lowpass noise)
    const streamLen = Math.floor(window.audioCtx.sampleRate * 0.65);
    const streamBuf = window.audioCtx.createBuffer(1, streamLen, window.audioCtx.sampleRate);
    const streamData = streamBuf.getChannelData(0);
    for (let i = 0; i < streamLen; i++) {
        const env = Math.sin((i / streamLen) * Math.PI);
        streamData[i] = (Math.random() * 2 - 1) * env;
    }
    const streamSrc = window.audioCtx.createBufferSource();
    streamSrc.buffer = streamBuf;
    const streamFilter = window.audioCtx.createBiquadFilter();
    streamFilter.type = 'lowpass';
    streamFilter.frequency.setValueAtTime(520, t);
    streamFilter.frequency.linearRampToValueAtTime(340, t + 0.65);
    const streamGain = window.audioCtx.createGain();
    streamGain.gain.setValueAtTime(0.001, t);
    streamGain.gain.linearRampToValueAtTime(0.18, t + 0.15);
    streamGain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
    streamSrc.connect(streamFilter);
    streamFilter.connect(streamGain);
    streamGain.connect(window.audioCtx.destination);
    streamSrc.start(t);

    // 2. Liquid landing droplets/bubble simmer
    [0.12, 0.28, 0.44].forEach((delay, idx) => {
        const dropOsc = window.audioCtx.createOscillator();
        dropOsc.type = 'sine';
        dropOsc.frequency.setValueAtTime(380 + idx * 60, t + delay);
        dropOsc.frequency.exponentialRampToValueAtTime(180, t + delay + 0.08);
        const dropGain = window.audioCtx.createGain();
        dropGain.gain.setValueAtTime(0.001, t);
        dropGain.gain.setValueAtTime(0.08, t + delay);
        dropGain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.08);
        dropOsc.connect(dropGain);
        dropGain.connect(window.audioCtx.destination);
        dropOsc.start(t + delay);
        dropOsc.stop(t + delay + 0.09);
    });
};

// Phase 3.2: Multi-layer Heavy Brass Die Compression & Squelch ASMR
window.playWaxStampASMR = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // 1. Squelch-squish of pliable hot wax compressing under die
    const squishLen = Math.floor(window.audioCtx.sampleRate * 0.18);
    const squishBuf = window.audioCtx.createBuffer(1, squishLen, window.audioCtx.sampleRate);
    const squishData = squishBuf.getChannelData(0);
    for (let i = 0; i < squishLen; i++) {
        // Micro bubble popping bursts
        const bubbleCrackle = Math.random() > 0.88 ? (Math.random() * 2 - 1) * 1.5 : (Math.random() * 0.4 - 0.2);
        squishData[i] = bubbleCrackle * Math.exp(-i / (squishLen * 0.45));
    }
    const squishSrc = window.audioCtx.createBufferSource();
    squishSrc.buffer = squishBuf;
    const squishFilter = window.audioCtx.createBiquadFilter();
    squishFilter.type = 'bandpass';
    squishFilter.frequency.setValueAtTime(650, t);
    squishFilter.frequency.exponentialRampToValueAtTime(240, t + 0.18);
    squishFilter.Q.setValueAtTime(2.2, t);
    const squishGain = window.audioCtx.createGain();
    squishGain.gain.setValueAtTime(0.26, t);
    squishGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    squishSrc.connect(squishFilter);
    squishFilter.connect(squishGain);
    squishGain.connect(window.audioCtx.destination);
    squishSrc.start(t);

    // 2. Heavy brass seal downward press thud (punchy low impact)
    const oscPress = window.audioCtx.createOscillator();
    oscPress.type = 'sine';
    oscPress.frequency.setValueAtTime(160, t);
    oscPress.frequency.exponentialRampToValueAtTime(42, t + 0.16);
    const pressGain = window.audioCtx.createGain();
    pressGain.gain.setValueAtTime(0.32, t);
    pressGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    oscPress.connect(pressGain);
    pressGain.connect(window.audioCtx.destination);
    oscPress.start(t);
    oscPress.stop(t + 0.18);

    // 3. Metallic ring & vacuum suction lift
    const oscLift = window.audioCtx.createOscillator();
    oscLift.type = 'triangle';
    oscLift.frequency.setValueAtTime(620, t + 0.14);
    oscLift.frequency.exponentialRampToValueAtTime(1600, t + 0.24);
    const liftGain = window.audioCtx.createGain();
    liftGain.gain.setValueAtTime(0.09, t + 0.14);
    liftGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    oscLift.connect(liftGain);
    liftGain.connect(window.audioCtx.destination);
    oscLift.start(t + 0.14);
    oscLift.stop(t + 0.28);
};

// Phase 3: Artisan Hearth Ritual ASMR SFX (Candle Light, Wax Drop, Wax Melt, Glass Stir)
window.playCandleLightSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // 1. Match strike frictional scrape (highpass noise burst)
    const scrapeLength = Math.floor(window.audioCtx.sampleRate * 0.06);
    const scrapeBuffer = window.audioCtx.createBuffer(1, scrapeLength, window.audioCtx.sampleRate);
    const scrapeData = scrapeBuffer.getChannelData(0);
    for (let i = 0; i < scrapeLength; i++) {
        scrapeData[i] = (Math.random() * 2 - 1) * Math.sin((i / scrapeLength) * Math.PI);
    }
    const scrapeSrc = window.audioCtx.createBufferSource();
    scrapeSrc.buffer = scrapeBuffer;
    const scrapeFilter = window.audioCtx.createBiquadFilter();
    scrapeFilter.type = 'bandpass';
    scrapeFilter.frequency.setValueAtTime(2800, t);
    scrapeFilter.Q.setValueAtTime(3, t);
    const scrapeGain = window.audioCtx.createGain();
    scrapeGain.gain.setValueAtTime(0.18, t);
    scrapeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    scrapeSrc.connect(scrapeFilter);
    scrapeFilter.connect(scrapeGain);
    scrapeGain.connect(window.audioCtx.destination);
    scrapeSrc.start(t);

    // 2. Flame ignition soft resonant whoosh
    const oscIgnite = window.audioCtx.createOscillator();
    oscIgnite.type = 'sine';
    oscIgnite.frequency.setValueAtTime(160, t + 0.03);
    oscIgnite.frequency.exponentialRampToValueAtTime(320, t + 0.12);
    oscIgnite.frequency.exponentialRampToValueAtTime(180, t + 0.28);
    const igniteGain = window.audioCtx.createGain();
    igniteGain.gain.setValueAtTime(0.001, t);
    igniteGain.gain.linearRampToValueAtTime(0.2, t + 0.08);
    igniteGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    oscIgnite.connect(igniteGain);
    igniteGain.connect(window.audioCtx.destination);
    oscIgnite.start(t + 0.03);
    oscIgnite.stop(t + 0.3);
};

window.playWaxDropSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // Resonant brass click of solid wax pellet landing in brass spoon bowl
    const osc = window.audioCtx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(920, t);
    osc.frequency.exponentialRampToValueAtTime(540, t + 0.07);
    const gain = window.audioCtx.createGain();
    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
};

window.playWaxMeltSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // Gentle warm simmering heat & pliable softening
    const len = Math.floor(window.audioCtx.sampleRate * 0.45);
    const buf = window.audioCtx.createBuffer(1, len, window.audioCtx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.6));
    }
    const src = window.audioCtx.createBufferSource();
    src.buffer = buf;
    const flt = window.audioCtx.createBiquadFilter();
    flt.type = 'lowpass';
    flt.frequency.setValueAtTime(320, t);
    flt.frequency.linearRampToValueAtTime(680, t + 0.22);
    flt.frequency.exponentialRampToValueAtTime(260, t + 0.45);
    const g = window.audioCtx.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.14, t + 0.15);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    src.connect(flt);
    flt.connect(g);
    g.connect(window.audioCtx.destination);
    src.start(t);
};

window.playWaxStirSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // Glass rod swishing & gentle clink on polished brass rim
    [1320, 1650, 2200].forEach((freq, idx) => {
        const osc = window.audioCtx.createOscillator();
        osc.type = 'sine';
        const delay = idx * 0.04;
        osc.frequency.setValueAtTime(freq, t + delay);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.85, t + delay + 0.14);
        const gain = window.audioCtx.createGain();
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.setValueAtTime(0.12 / (idx + 1), t + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.16);
        osc.connect(gain);
        gain.connect(window.audioCtx.destination);
        osc.start(t + delay);
        osc.stop(t + delay + 0.18);
    });
};

// Sub-phase 3.2: Viscous Molten Wax Pouring SFX
window.playWaxPourSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // 1. Viscous stream flow (warm low-pass filtered noise glide)
    const len = Math.floor(window.audioCtx.sampleRate * 0.65);
    const buf = window.audioCtx.createBuffer(1, len, window.audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / len) * Math.PI);
    }
    const src = window.audioCtx.createBufferSource();
    src.buffer = buf;
    const flt = window.audioCtx.createBiquadFilter();
    flt.type = 'lowpass';
    flt.frequency.setValueAtTime(260, t);
    flt.frequency.linearRampToValueAtTime(520, t + 0.3);
    flt.frequency.exponentialRampToValueAtTime(220, t + 0.65);
    const gain = window.audioCtx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.18, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
    src.connect(flt);
    flt.connect(gain);
    gain.connect(window.audioCtx.destination);
    src.start(t);

    // 2. Thick viscous droplets plopping into pool
    [0.18, 0.38, 0.52].forEach((offset, idx) => {
        const osc = window.audioCtx.createOscillator();
        osc.type = 'sine';
        const startFreq = 480 - idx * 60;
        osc.frequency.setValueAtTime(startFreq, t + offset);
        osc.frequency.exponentialRampToValueAtTime(220, t + offset + 0.08);
        const dropGain = window.audioCtx.createGain();
        dropGain.gain.setValueAtTime(0.001, t);
        dropGain.gain.setValueAtTime(0.09, t + offset);
        dropGain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.09);
        osc.connect(dropGain);
        dropGain.connect(window.audioCtx.destination);
        osc.start(t + offset);
        osc.stop(t + offset + 0.1);
    });
};

// Sub-phase 3.2: Multi-layer ASMR Stamping Sound (Wet squelch + Heavy brass impact + Suction pop)
window.playWaxStampASMR = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // Layer 1: Wet squelch & micro air bubbles sizzle compression
    const squelchLen = Math.floor(window.audioCtx.sampleRate * 0.16);
    const squelchBuf = window.audioCtx.createBuffer(1, squelchLen, window.audioCtx.sampleRate);
    const squelchData = squelchBuf.getChannelData(0);
    for (let i = 0; i < squelchLen; i++) {
        squelchData[i] = (Math.random() * 2 - 1) * Math.sin((i / squelchLen) * Math.PI) * (Math.random() > 0.4 ? 1 : -0.5);
    }
    const squelchSrc = window.audioCtx.createBufferSource();
    squelchSrc.buffer = squelchBuf;
    const squelchFlt = window.audioCtx.createBiquadFilter();
    squelchFlt.type = 'bandpass';
    squelchFlt.frequency.setValueAtTime(1200, t);
    squelchFlt.frequency.exponentialRampToValueAtTime(450, t + 0.16);
    squelchFlt.Q.setValueAtTime(2.5, t);
    const squelchGain = window.audioCtx.createGain();
    squelchGain.gain.setValueAtTime(0.24, t);
    squelchGain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    squelchSrc.connect(squelchFlt);
    squelchFlt.connect(squelchGain);
    squelchGain.connect(window.audioCtx.destination);
    squelchSrc.start(t);

    // Layer 2: Heavy Brass Die Solid Impact (Low-end thud + metallic body ring)
    const thudOsc = window.audioCtx.createOscillator();
    thudOsc.type = 'triangle';
    thudOsc.frequency.setValueAtTime(140, t);
    thudOsc.frequency.exponentialRampToValueAtTime(42, t + 0.22);
    const thudGain = window.audioCtx.createGain();
    thudGain.gain.setValueAtTime(0.38, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    thudOsc.connect(thudGain);
    thudGain.connect(window.audioCtx.destination);
    thudOsc.start(t);
    thudOsc.stop(t + 0.25);

    // Resonant brass overtone
    const brassOsc = window.audioCtx.createOscillator();
    brassOsc.type = 'sine';
    brassOsc.frequency.setValueAtTime(1850, t);
    brassOsc.frequency.exponentialRampToValueAtTime(920, t + 0.14);
    const brassGain = window.audioCtx.createGain();
    brassGain.gain.setValueAtTime(0.12, t);
    brassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    brassOsc.connect(brassGain);
    brassGain.connect(window.audioCtx.destination);
    brassOsc.start(t);
    brassOsc.stop(t + 0.16);

    // Layer 3: Vacuum suction release pop as die releases
    const popOsc = window.audioCtx.createOscillator();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(220, t + 0.15);
    popOsc.frequency.exponentialRampToValueAtTime(440, t + 0.26);
    const popGain = window.audioCtx.createGain();
    popGain.gain.setValueAtTime(0.001, t);
    popGain.gain.setValueAtTime(0.1, t + 0.15);
    popGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    popOsc.connect(popGain);
    popGain.connect(window.audioCtx.destination);
    popOsc.start(t + 0.15);
    popOsc.stop(t + 0.3);
};

// Fallback alias
window.playWaxStampSFX = window.playWaxStampASMR;

// Sub-phase 3.2: Golden Brass Dust Burst VFX on Heavy Impact
window.createBrassDustVFX = (x, y) => {
    const numParticles = 20;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'vfx-brass-dust';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 / numParticles) * i + (Math.random() - 0.5) * 0.4;
        const dist = 32 + Math.random() * 52;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        const rot = Math.random() * 360;
        const scale = 0.6 + Math.random() * 0.8;

        particle.animate([
            { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${tx * 0.6}px, ${ty * 0.6}px) scale(${scale * 1.3}) rotate(${rot * 0.5}deg)`, opacity: 0.95, offset: 0.4 },
            { transform: `translate(${tx}px, ${ty}px) scale(0) rotate(${rot}deg)`, opacity: 0 }
        ], {
            duration: 700 + Math.random() * 350,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards'
        });

        setTimeout(() => particle.remove(), 1100);
    }
};

// Sub-phase 3.3: Celestial Crystal Bell Chime (Awakening Resonance)
window.playChimeSFX = (out) => {
    window.initAudio();
    if (!window.audioCtx) return;
    const dest = window.resolveSfxOutput(out);
    const t = window.audioCtx.currentTime;

    // Harmonic partials of Solfeggio 528Hz Love Tone
    const harmonics = [528, 1056, 1584, 2112, 3168];
    harmonics.forEach((freq, idx) => {
        const osc = window.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        // Subtle shimmer vibrato
        osc.frequency.linearRampToValueAtTime(freq * 1.003, t + 0.8);
        osc.frequency.linearRampToValueAtTime(freq, t + 1.8);

        const gain = window.audioCtx.createGain();
        const baseAmp = 0.16 / (idx * 0.75 + 1);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(baseAmp, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.9 - idx * 0.2);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(t);
        osc.stop(t + 2.0);
    });
};

// Sub-phase 3.3: Ethereal Floral Blooming Shimmer SFX
window.playFloralBloomSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // 1. Soft rising botanical breeze
    const len = Math.floor(window.audioCtx.sampleRate * 0.7);
    const buf = window.audioCtx.createBuffer(1, len, window.audioCtx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.sin((i / len) * Math.PI);
    }
    const src = window.audioCtx.createBufferSource();
    src.buffer = buf;
    const flt = window.audioCtx.createBiquadFilter();
    flt.type = 'bandpass';
    flt.frequency.setValueAtTime(450, t);
    flt.frequency.exponentialRampToValueAtTime(1400, t + 0.45);
    flt.Q.setValueAtTime(2.2, t);
    const g = window.audioCtx.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.12, t + 0.2);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
    src.connect(flt);
    flt.connect(g);
    g.connect(window.audioCtx.destination);
    src.start(t);

    // 2. Rising glass blossom sparkle arpeggio
    [880, 1174.66, 1318.51, 1760].forEach((freq, idx) => {
        const osc = window.audioCtx.createOscillator();
        osc.type = 'triangle';
        const delay = idx * 0.06;
        osc.frequency.setValueAtTime(freq, t + delay);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.96, t + delay + 0.25);
        const gain = window.audioCtx.createGain();
        gain.gain.setValueAtTime(0.001, t + delay);
        gain.gain.setValueAtTime(0.08 / (idx + 1), t + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.28);
        osc.connect(gain);
        gain.connect(window.audioCtx.destination);
        osc.start(t + delay);
        osc.stop(t + delay + 0.3);
    });
};

// Sub-phase 3.3: Pentatonic Soil Landing Water Drop & Harmonic Chime SFX
window.playBubbleChimeSFX = (index = 0) => {
    window.initAudio();
    if (!window.audioCtx) return;
    const t = window.audioCtx.currentTime;

    // Harmonic Pentatonic Scale: C5, D5, E5, G5, A5, C6
    const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const freq = pentatonic[index % pentatonic.length];

    // Chime Tone
    const osc = window.audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.98, t + 0.45);
    const gain = window.audioCtx.createGain();
    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.52);

    // Subtle water drop pop
    const dropOsc = window.audioCtx.createOscillator();
    dropOsc.type = 'sine';
    dropOsc.frequency.setValueAtTime(420, t);
    dropOsc.frequency.exponentialRampToValueAtTime(180, t + 0.06);
    const dropGain = window.audioCtx.createGain();
    dropGain.gain.setValueAtTime(0.1, t);
    dropGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    dropOsc.connect(dropGain);
    dropGain.connect(window.audioCtx.destination);
    dropOsc.start(t);
    dropOsc.stop(t + 0.08);
};

// Sub-phase 3.3: Drifting Flower Petal Burst VFX
window.createFloralPetalBurstVFX = (x, y) => {
    const numPetals = 12;
    for (let i = 0; i < numPetals; i++) {
        const petal = document.createElement('div');
        petal.className = 'vfx-flower-petal';
        petal.style.left = `${x}px`;
        petal.style.top = `${y}px`;
        document.body.appendChild(petal);

        const angle = (Math.PI * 2 / numPetals) * i + (Math.random() - 0.5) * 0.5;
        const dist = 30 + Math.random() * 60;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist + 15; // gentle downward drift
        const rot = Math.random() * 360;

        petal.animate([
            { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 0.95 },
            { transform: `translate(${tx * 0.6}px, ${ty * 0.5}px) scale(1) rotate(${rot * 0.5}deg)`, opacity: 1, offset: 0.4 },
            { transform: `translate(${tx}px, ${ty + 35}px) scale(0.6) rotate(${rot}deg)`, opacity: 0 }
        ], {
            duration: 900 + Math.random() * 450,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            fill: 'forwards'
        });

        setTimeout(() => petal.remove(), 1400);
    }
};

window.createBubbleBurstVFX = (x, y) => {
    for (let i = 0; i < 12; i++) {
        const spark = document.createElement('div');
        spark.className = 'vfx-star';
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        spark.style.zIndex = '10005';
        document.body.appendChild(spark);

        const angle = (Math.PI * 2 / 12) * i + (Math.random() - 0.5) * 0.3;
        const dist = 40 + Math.random() * 50;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;

        spark.animate([
            { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 600 + Math.random() * 300,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards'
        });

        setTimeout(() => spark.remove(), 1000);
    }
};

window.createWaterVFX = (x, y) => {
    for(let i = 0; i < 15; i++) {
        const drop = document.createElement('div');
        drop.className = 'vfx-water';
        drop.style.left = (x + 10) + 'px';
        drop.style.top = (y + 10) + 'px';
        document.body.appendChild(drop);

        const tx = (Math.random() - 0.5) * 60; // Spread x
        const ty = 80 + Math.random() * 40; // Fall y
        
        drop.animate([
            { transform: `translate(0, 0) scale(1)`, opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'cubic-bezier(0.4, 0, 1, 1)',
            fill: 'forwards'
        });
        
        setTimeout(() => drop.remove(), 1200);
    }
    window.playWaterSFX();
};

window.createFertilizerVFX = (x, y) => {
    for(let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'vfx-star';
        star.style.left = (x + 10) + 'px';
        star.style.top = (y + 10) + 'px';
        document.body.appendChild(star);

        const tx = (Math.random() - 0.5) * 80; 
        const ty = 60 + Math.random() * 40; 
        
        star.animate([
            { transform: `translate(0, 0) scale(1) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0) rotate(180deg)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.4, 0, 1, 1)',
            fill: 'forwards'
        });
        
        setTimeout(() => star.remove(), 1500);
    }
};

// Setup background music logic
const initBgMusic = () => {
    const audio = document.getElementById("myAudio");
    const musicToggleBtn = document.getElementById("music-toggle");
    const musicIconPath = document.querySelector("#music-icon path");
    const volumeSlider = document.getElementById("volume-slider");

    const playPath = "M8 5v14l11-7z"; // Play icon
    const pausePath = "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"; // Music note

    // Expose audio for start btn & time lock
    window.bgAudio = audio;
    window.musicToggleBtn = musicToggleBtn;
    window.musicIconPath = musicIconPath;
    window.pausePath = pausePath;
    window.playPath = playPath;
    window.volumeSlider = volumeSlider;

    // Track baseline volume (mặc định 0.05 lúc đầu theo yêu cầu Phase 1)
    window.originalAudioVolume = volumeSlider ? parseFloat(volumeSlider.value) : 0.05;

    // Set default volume
    if (audio && volumeSlider) {
        audio.volume = 0.05;
        volumeSlider.value = 0.05;
        window.originalAudioVolume = 0.05;
        volumeSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            audio.volume = val;
            window.originalAudioVolume = val;
            if (window.__audioFadeTimer) {
                cancelAnimationFrame(window.__audioFadeTimer);
                window.__audioFadeTimer = null;
            }
        });
    }

    if (musicToggleBtn) {
      musicToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (audio.paused) {
          audio.play();
          musicToggleBtn.classList.add('playing');
          musicIconPath.setAttribute("d", pausePath);
        } else {
          audio.pause();
          musicToggleBtn.classList.remove('playing');
          musicIconPath.setAttribute("d", playPath);
        }
      });
    }

    // Function: Kích hoạt nhạc ở âm lượng 5% khi người dùng bắt đầu nhập pass hoặc tên
    window.startGateMusicLow = () => {
        if (!audio) return;
        window.initAudio();
        if (audio.paused) {
            audio.volume = 0.05; // 5% âm lượng nhẹ nhàng dịu tai
            if (volumeSlider) volumeSlider.value = 0.05;
            audio.play().then(() => {
                if (musicToggleBtn) musicToggleBtn.classList.add('playing');
                if (musicIconPath) musicIconPath.setAttribute("d", pausePath);
            }).catch(e => {
                console.log("Audio autoplay prevented by browser:", e);
            });
        }
    };

    // Function: Fade in âm lượng mượt mà trong 5 giây (5000ms) lên mốc 20%
    window.fadeAudioVolume = (targetVol = 0.20, durationMs = 5000) => {
        if (!audio) return;
        window.initAudio();

        const finalTarget = (targetVol !== null && targetVol !== undefined) 
            ? targetVol 
            : 0.20; // Mặc định 20% âm lượng

        if (audio.paused) {
            audio.volume = 0.05;
            if (volumeSlider) volumeSlider.value = 0.05;
            audio.play().catch(e => console.log("Play on fade failed:", e));
            if (musicToggleBtn) musicToggleBtn.classList.add('playing');
            if (musicIconPath) musicIconPath.setAttribute("d", pausePath);
        }

        const startVol = audio.volume;
        const diff = finalTarget - startVol;
        if (Math.abs(diff) < 0.005) {
            audio.volume = finalTarget;
            if (volumeSlider) volumeSlider.value = finalTarget;
            window.originalAudioVolume = finalTarget;
            return;
        }

        if (window.__audioFadeTimer) {
            cancelAnimationFrame(window.__audioFadeTimer);
        }

        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / durationMs);
            // Đường cong easing mượt mà cho thính giác
            const ease = 1 - Math.pow(1 - progress, 3);
            const currentVol = startVol + diff * ease;
            const clampedVol = Math.max(0, Math.min(1, currentVol));
            audio.volume = clampedVol;
            if (volumeSlider) volumeSlider.value = clampedVol;
            window.originalAudioVolume = clampedVol;

            if (progress < 1) {
                window.__audioFadeTimer = requestAnimationFrame(step);
            } else {
                audio.volume = finalTarget;
                if (volumeSlider) volumeSlider.value = finalTarget;
                window.originalAudioVolume = finalTarget;
                window.__audioFadeTimer = null;
            }
        }

        window.__audioFadeTimer = requestAnimationFrame(step);
    };
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBgMusic);
} else {
    initBgMusic();
}

window.playKeyTapSFX = () => {
    window.initAudio();
    const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5, D5, E5, G5, A5, C6
    const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
    
    const osc = window.audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    
    const gain = window.audioCtx.createGain();
    gain.gain.setValueAtTime(0, window.audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, window.audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, window.audioCtx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.start();
    osc.stop(window.audioCtx.currentTime + 0.5);
};


window.simonHarmonicPalettes = [
    {
        id: "canon_in_d",
        name: "Canon in D Romance",
        subtitle: "Canon in D Romance",
        notes: [587.33, 739.99, 880.00, 1174.66], // D5, F#5, A5, D6 (D major chord)
        overtoneRatio: 2.0,
        motifs: [
            [0, 1, 2, 3],       // Arpeggio thăng hoa (D - F# - A - D')
            [0, 2, 1, 3],       // Canon Arch (D - A - F# - D')
            [0, 1, 3, 2],       // Romance Turn (D - F# - D' - A)
            [0, 2, 3, 2, 1],    // Lyrical Wave (D - A - D' - A - F#)
            [1, 2, 3, 2, 0]     // Dewdrop Cascade (F# - A - D' - A - D)
        ]
    },
    {
        id: "sakura_pentatonic",
        name: "Sakura Pentatonic",
        subtitle: "Sakura Pentatonic",
        notes: [587.33, 659.25, 783.99, 987.77], // D5, E5, G5, B5 (Sakura romantic pentatonic)
        overtoneRatio: 2.5,
        motifs: [
            [0, 2, 1, 3],       // Sakura Breath (D - G - E - B)
            [0, 1, 2, 3],       // Petal Flutter (D - E - G - B)
            [3, 2, 1, 0],       // Falling Blossom (B - G - E - D)
            [1, 2, 3, 2, 0],    // Spring Breeze (E - G - B - G - D)
            [0, 2, 3, 2, 1]     // Nostalgic Bloom (D - G - B - G - E)
        ]
    },
    {
        id: "ghibli_nostalgia",
        name: "Ghibli Nostalgia",
        subtitle: "Ghibli Nostalgia",
        notes: [523.25, 659.25, 783.99, 1046.50], // C5, E5, G5, C6 (C major lyrical chime)
        overtoneRatio: 2.76,
        motifs: [
            [0, 1, 2, 3],       // Ghibli Rise (C - E - G - C')
            [0, 2, 1, 3],       // Castle in the Sky (C - G - E - C')
            [2, 0, 1, 3, 2],    // Summer Wind (G - C - E - C' - G)
            [0, 1, 3, 2, 0],    // Spirited Journey (C - E - C' - G - C)
            [1, 2, 3, 2, 0]     // Starlight Lullaby (E - G - C' - G - C)
        ]
    }
];

window.playSimonSFX = (index) => {
    window.initAudio();
    if (!window.activeHarmonicPalette) {
        const paletteIdx = Math.floor(Math.random() * window.simonHarmonicPalettes.length);
        window.activeHarmonicPalette = window.simonHarmonicPalettes[paletteIdx];
    }

    const palette = window.activeHarmonicPalette;
    const freq = palette.notes[index % palette.notes.length] || 523.25;
    const t = window.audioCtx.currentTime;

    // 1. Fundamental warm sine tone
    const osc1 = window.audioCtx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = freq;

    const gain1 = window.audioCtx.createGain();
    gain1.gain.setValueAtTime(0, t);
    gain1.gain.linearRampToValueAtTime(0.24, t + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

    osc1.connect(gain1);
    gain1.connect(window.audioCtx.destination);
    osc1.start(t);
    osc1.stop(t + 1.2);

    // 2. Dual-Oscillator harmonic overtone for chime/bell warmth
    const osc2 = window.audioCtx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.value = freq * (palette.overtoneRatio || 2.0);

    const gain2 = window.audioCtx.createGain();
    gain2.gain.setValueAtTime(0, t);
    gain2.gain.linearRampToValueAtTime(0.08, t + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.0005, t + 0.6);

    osc2.connect(gain2);
    gain2.connect(window.audioCtx.destination);
    osc2.start(t);
    osc2.stop(t + 0.6);
};


// Phase 9: Dawn Ambience (Birds)
window.dawnAudioInterval = null;

window.playBirdChirp = () => {
    if (!window.audioCtx || window.audioCtx.state === "suspended") return;
    const osc = window.audioCtx.createOscillator();
    const gain = window.audioCtx.createGain();
    
    // Random high pitch for bird
    const baseFreq = 2000 + Math.random() * 2000;
    osc.type = "sine";
    osc.frequency.setValueAtTime(baseFreq, window.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 1000, window.audioCtx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(baseFreq - 500, window.audioCtx.currentTime + 0.2);
    
    gain.gain.setValueAtTime(0, window.audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, window.audioCtx.currentTime + 0.05); // Quiet chirp
    gain.gain.linearRampToValueAtTime(0, window.audioCtx.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.start();
    osc.stop(window.audioCtx.currentTime + 0.2);
};

window.startDawnAmbience = () => {
    if (window.dawnAudioInterval) return;
    window.initAudio();
    window.dawnAudioInterval = setInterval(() => {
        if (Math.random() > 0.4) {
            window.playBirdChirp();
            setTimeout(window.playBirdChirp, 150 + Math.random() * 100);
        }
    }, 2000);
};

window.stopDawnAmbience = () => {
    if (window.dawnAudioInterval) {
        clearInterval(window.dawnAudioInterval);
        window.dawnAudioInterval = null;
    }
};


// Phase 9: Dusk Ambience (Crickets)
window.duskAudioInterval = null;

window.playCricketChirp = () => {
    if (!window.audioCtx || window.audioCtx.state === "suspended") return;
    const osc = window.audioCtx.createOscillator();
    const gain = window.audioCtx.createGain();
    
    // High pitch for cricket (around 4500Hz)
    osc.type = "triangle";
    osc.frequency.value = 4500 + Math.random() * 200;
    
    // Quick pulsing volume for trill
    gain.gain.setValueAtTime(0, window.audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, window.audioCtx.currentTime + 0.01);
    gain.gain.linearRampToValueAtTime(0, window.audioCtx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0.02, window.audioCtx.currentTime + 0.06);
    gain.gain.linearRampToValueAtTime(0, window.audioCtx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0.02, window.audioCtx.currentTime + 0.11);
    gain.gain.linearRampToValueAtTime(0, window.audioCtx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.start();
    osc.stop(window.audioCtx.currentTime + 0.15);
};

window.startDuskAmbience = () => {
    if (window.duskAudioInterval) return;
    window.initAudio();
    window.duskAudioInterval = setInterval(() => {
        if (Math.random() > 0.3) {
            window.playCricketChirp();
            setTimeout(window.playCricketChirp, 200 + Math.random() * 100);
        }
    }, 1500);
};

window.stopDuskAmbience = () => {
    if (window.duskAudioInterval) {
        clearInterval(window.duskAudioInterval);
        window.duskAudioInterval = null;
    }
};

// ==========================================================================
// MASCOT ROBOT SFX SYNTHESIZERS (PHASE 5)
// ==========================================================================
window.playRobotChirpSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const now = window.audioCtx.currentTime;

    // Friendly 3-tone arpeggio chirp: C6 -> E6 -> G6
    const pitches = [1046.5, 1318.5, 1567.98];
    pitches.forEach((freq, idx) => {
        const osc = window.audioCtx.createOscillator();
        const gain = window.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.08, now + idx * 0.07 + 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.07 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.08);

        osc.connect(gain);
        gain.connect(window.audioCtx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.08);
    });
};

window.playHydroBlasterSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const now = window.audioCtx.currentTime;

    // High-tech water blaster pew + splash
    const osc = window.audioCtx.createOscillator();
    const gain = window.audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(850, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.18);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
};

window.playStarMagicSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const now = window.audioCtx.currentTime;

    // Shimmering celestial chimes: E6, A6, B6, E7
    const starPitches = [1318.5, 1760.0, 1975.5, 2637.0];
    starPitches.forEach((freq, idx) => {
        const osc = window.audioCtx.createOscillator();
        const gain = window.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.05 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(window.audioCtx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.25);
    });
};

// ==========================================================================
// iOS Safari & Visibility Audio Resilience (Task 10.2)
// ==========================================================================
window.resumeAudioContext = async () => {
    if (window.audioCtx && window.audioCtx.state === 'suspended') {
        try {
            await window.audioCtx.resume();
        } catch (e) {
            console.warn("AudioContext resume failed:", e);
        }
    }
};

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        window.resumeAudioContext();
    }
});

// Resume on first user gesture after sleep/lock
['touchstart', 'touchend', 'pointerdown', 'click'].forEach(evt => {
    window.addEventListener(evt, () => {
        window.resumeAudioContext();
    }, { passive: true });
});

// ==========================================================================
// Boarding Pass & Photobooth ASMR SFX (Sub-phase 4.1 & 4.3)
// ==========================================================================
window.playCameraClickSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const now = window.audioCtx.currentTime;

    // 1. Shutter Mirror Flip (Quick mechanical click: high passed burst)
    const bufSize = Math.floor(window.audioCtx.sampleRate * 0.04);
    const noiseBuf = window.audioCtx.createBuffer(1, bufSize, window.audioCtx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.3));
    }
    const noise1 = window.audioCtx.createBufferSource();
    noise1.buffer = noiseBuf;

    const filter1 = window.audioCtx.createBiquadFilter();
    filter1.type = 'highpass';
    filter1.frequency.setValueAtTime(1800, now);

    const gain1 = window.audioCtx.createGain();
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

    noise1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(window.audioCtx.destination);
    noise1.start(now);

    // 2. Main Shutter Curtain Blade click (Dual mechanical snap)
    const oscSnap = window.audioCtx.createOscillator();
    const snapGain = window.audioCtx.createGain();
    oscSnap.type = 'triangle';
    oscSnap.frequency.setValueAtTime(420, now + 0.02);
    oscSnap.frequency.exponentialRampToValueAtTime(80, now + 0.07);

    snapGain.gain.setValueAtTime(0.28, now + 0.02);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    oscSnap.connect(snapGain);
    snapGain.connect(window.audioCtx.destination);
    oscSnap.start(now + 0.02);
    oscSnap.stop(now + 0.08);

    // 3. Subtle Film Advance Winder motor whisper
    const motorBuf = window.audioCtx.createBuffer(1, Math.floor(window.audioCtx.sampleRate * 0.12), window.audioCtx.sampleRate);
    const mData = motorBuf.getChannelData(0);
    for (let i = 0; i < mData.length; i++) {
        mData[i] = (Math.random() * 2 - 1) * 0.15;
    }
    const motorSrc = window.audioCtx.createBufferSource();
    motorSrc.buffer = motorBuf;

    const bandMotor = window.audioCtx.createBiquadFilter();
    bandMotor.type = 'bandpass';
    bandMotor.frequency.setValueAtTime(2400, now + 0.07);

    const motorGain = window.audioCtx.createGain();
    motorGain.gain.setValueAtTime(0.08, now + 0.07);
    motorGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    motorSrc.connect(bandMotor);
    bandMotor.connect(motorGain);
    motorGain.connect(window.audioCtx.destination);
    motorSrc.start(now + 0.07);
};

window.playPaperTearSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const now = window.audioCtx.currentTime;

    const tearDur = 0.22;
    const bufSize = Math.floor(window.audioCtx.sampleRate * tearDur);
    const noiseBuf = window.audioCtx.createBuffer(1, bufSize, window.audioCtx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
        // Friction modulated burst
        const envelope = Math.sin((i / bufSize) * Math.PI);
        const friction = Math.sin(i * 0.08) * 0.3 + 0.7;
        data[i] = (Math.random() * 2 - 1) * envelope * friction;
    }
    const noiseSrc = window.audioCtx.createBufferSource();
    noiseSrc.buffer = noiseBuf;

    const tearFilter = window.audioCtx.createBiquadFilter();
    tearFilter.type = 'bandpass';
    tearFilter.frequency.setValueAtTime(1400, now);
    tearFilter.frequency.linearRampToValueAtTime(2800, now + tearDur * 0.5);
    tearFilter.frequency.linearRampToValueAtTime(900, now + tearDur);
    tearFilter.Q.value = 1.8;

    const tearGain = window.audioCtx.createGain();
    tearGain.gain.setValueAtTime(0.22, now);
    tearGain.gain.linearRampToValueAtTime(0.35, now + tearDur * 0.4);
    tearGain.gain.exponentialRampToValueAtTime(0.01, now + tearDur);

    noiseSrc.connect(tearFilter);
    tearFilter.connect(tearGain);
    tearGain.connect(window.audioCtx.destination);
    noiseSrc.start(now);
};

// ==========================================================================
// PHASE 3.1: LIVING ATMOSPHERE SHIFTER SFX SYNTHESIZERS
// ==========================================================================

/**
 * ASMR Summer Rain Shower Synthesizer:
 * Gentle pink noise rain wash + scattered high-frequency crystal water droplet plinks
 */
window.playSummerRainSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const now = window.audioCtx.currentTime;
    const rainDuration = 1.6;

    // 1. Soft Rain Atmosphere Wash (Noise Buffer)
    const bufSize = Math.floor(window.audioCtx.sampleRate * rainDuration);
    const rainBuf = window.audioCtx.createBuffer(1, bufSize, window.audioCtx.sampleRate);
    const data = rainBuf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise approximation
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        const pink = b0 + b1 + b2 + white * 0.5362;
        const envelope = Math.sin((i / bufSize) * Math.PI);
        data[i] = pink * 0.18 * envelope;
    }

    const rainSrc = window.audioCtx.createBufferSource();
    rainSrc.buffer = rainBuf;

    const rainFilter = window.audioCtx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(1600, now);
    rainFilter.Q.value = 1.0;

    const rainGain = window.audioCtx.createGain();
    rainGain.gain.setValueAtTime(0.01, now);
    rainGain.gain.linearRampToValueAtTime(0.18, now + 0.3);
    rainGain.gain.linearRampToValueAtTime(0.18, now + rainDuration - 0.4);
    rainGain.gain.exponentialRampToValueAtTime(0.001, now + rainDuration);

    rainSrc.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(window.audioCtx.destination);
    rainSrc.start(now);

    // 2. Scattered Crystal Droplet Plinks (Pentatonic high notes)
    const dropFreqs = [1046.50, 1174.66, 1318.51, 1567.98, 1760.00, 2093.00];
    const dropCount = 7;
    for (let d = 0; d < dropCount; d++) {
        const dropTime = now + 0.15 + (d * 0.18) + (Math.random() * 0.08);
        const freq = dropFreqs[d % dropFreqs.length];

        const dropOsc = window.audioCtx.createOscillator();
        dropOsc.type = 'sine';
        dropOsc.frequency.setValueAtTime(freq, dropTime);
        dropOsc.frequency.exponentialRampToValueAtTime(freq * 0.75, dropTime + 0.07);

        const dropGain = window.audioCtx.createGain();
        dropGain.gain.setValueAtTime(0.06, dropTime);
        dropGain.gain.exponentialRampToValueAtTime(0.001, dropTime + 0.08);

        dropOsc.connect(dropGain);
        dropGain.connect(window.audioCtx.destination);
        dropOsc.start(dropTime);
        dropOsc.stop(dropTime + 0.09);
    }
};

/**
 * Morning Sunbeam Shimmer Synthesizer:
 * Warm lush D-major 9th acoustic chord with golden overtone shimmer
 */
window.playSunbeamSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const now = window.audioCtx.currentTime;
    const chordDuration = 1.8;

    // D-major 9th lush morning chord (D4, F#4, A4, C#5, E5)
    const chordFreqs = [293.66, 369.99, 440.00, 554.37, 659.25];

    chordFreqs.forEach((freq, idx) => {
        const osc = window.audioCtx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        const filter = window.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, now);
        filter.frequency.linearRampToValueAtTime(3200, now + 0.5);

        const gain = window.audioCtx.createGain();
        const startT = now + idx * 0.06;
        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.08, startT + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + chordDuration - idx * 0.06);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(window.audioCtx.destination);

        osc.start(startT);
        osc.stop(startT + chordDuration);
    });
};

// ==========================================================================
// PHASE 3.2: TERRARIUM TOUCH ASMR SFX SYNTHESIZERS
// ==========================================================================

/**
 * Morning Dewdrop Condensation SFX:
 * Crystalline drop plink with acoustic reverberation
 */
window.playDewDropSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const now = window.audioCtx.currentTime;

    const osc = window.audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1480, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);

    const gain = window.audioCtx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    // Resonant harmonic overtone
    const osc2 = window.audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2217, now);
    osc2.frequency.exponentialRampToValueAtTime(1318, now + 0.1);

    const gain2 = window.audioCtx.createGain();
    gain2.gain.setValueAtTime(0.07, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc2.connect(gain2);
    gain2.connect(window.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
    osc2.start(now);
    osc2.stop(now + 0.18);
};

/**
 * Root Thermal Warmth Swell SFX:
 * Warm organic low-mid acoustic resonant pulse as roots absorb warmth
 */
window.playThermalWarmthSFX = () => {
    window.initAudio();
    if (!window.audioCtx) return;
    const now = window.audioCtx.currentTime;
    const dur = 1.4;

    const notes = [196.00, 246.94, 293.66]; // G3, B3, D4
    notes.forEach((freq, idx) => {
        const osc = window.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        const filter = window.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.linearRampToValueAtTime(1200, now + 0.6);

        const gain = window.audioCtx.createGain();
        gain.gain.setValueAtTime(0.001, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.09, now + idx * 0.05 + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(window.audioCtx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + dur);
    });
};

// ==========================================================================
// PHASE 3.3: BOTANICAL MELODIC HARP CHIMES SYNTHESIZERS (OPTION 3)
// ==========================================================================

/**
 * Botanical Crystal Harp Chime SFX:
 * Crystalline pentatonic acoustic harp chime (C5, D5, E5, G5, A5, C6)
 * Crisp acoustic percussive pluck + warm woody harmonic sustain
 */
window.playMelodicHarpChime = (stringIndex = 0) => {
    window.initAudio();
    if (!window.audioCtx) return;
    const now = window.audioCtx.currentTime;

    // Pentatonic scale notes: C5, D5, E5, G5, A5, C6
    const pentatonicFreqs = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const freq = pentatonicFreqs[Math.abs(stringIndex) % pentatonicFreqs.length] || 523.25;
    const duration = 1.45;

    // 1. Primary fundamental crystal chime (pure sine)
    const osc1 = window.audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // 2. Harmonic overtone (warm acoustic resonance at octave with slight organic detune)
    const osc2 = window.audioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.003, now);

    // 3. High crystal brilliance chime
    const osc3 = window.audioCtx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3.01, now);

    // Lowpass filter for acoustic warmth
    const filter = window.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4.2, now);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.15, now + 0.85);

    // Envelopes
    const gain1 = window.audioCtx.createGain();
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.22, now + 0.005); // Rapid acoustic harp attack
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const gain2 = window.audioCtx.createGain();
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(0.08, now + 0.004);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    const gain3 = window.audioCtx.createGain();
    gain3.gain.setValueAtTime(0.0001, now);
    gain3.gain.linearRampToValueAtTime(0.05, now + 0.003);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    // Connections
    osc1.connect(filter);
    filter.connect(gain1);
    gain1.connect(window.audioCtx.destination);

    osc2.connect(gain2);
    gain2.connect(window.audioCtx.destination);

    osc3.connect(gain3);
    gain3.connect(window.audioCtx.destination);

    osc1.start(now);
    osc1.stop(now + duration);
    osc2.start(now);
    osc2.stop(now + 0.7);
    osc3.start(now);
    osc3.stop(now + 0.35);
};

/**
 * Sweeping Harp Glissando / Arpeggio:
 * Staggers pentatonic chimes across all strings (ascending or descending)
 */
window.playHarpGlissando = (direction = 'up', staggerMs = 80) => {
    const indices = direction === 'up' ? [0, 1, 2, 3, 4] : [4, 3, 2, 1, 0];
    indices.forEach((idx, step) => {
        setTimeout(() => {
            window.playMelodicHarpChime(idx);
        }, step * staggerMs);
    });
};

// ==========================================================================
// PHASE 4.2: DECOY STAR MIST SFX SYNTHESIZER
// ==========================================================================

/**
 * Decoy Star Dissolve Mist SFX:
 * Soft magical poof / starlight shimmer as decoy star evaporates into mist
 */
window.playDecoyMistSFX = (options = {}) => {
    window.initAudio();
    if (!window.audioCtx) return;
    const now = window.audioCtx.currentTime;
    const volume = typeof options.volume === 'number' ? Math.max(0.05, Math.min(2.0, options.volume)) : 1.0;

    // 1. White noise buffer for magical soft poof
    const bufferSize = Math.floor(window.audioCtx.sampleRate * 0.35);
    const buffer = window.audioCtx.createBuffer(1, bufferSize, window.audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = window.audioCtx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Bandpass filter sweeping down
    const filter = window.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + 0.3);
    filter.Q.value = 3.0;

    const noiseGain = window.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.12 * volume, now + 0.02);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(window.audioCtx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.35);

    // 2. High crystal shimmer descending (fairy dust poof)
    const chime = window.audioCtx.createOscillator();
    chime.type = 'sine';
    const baseFreq = options.pitch || 1318.51; // E6
    chime.frequency.setValueAtTime(baseFreq, now);
    chime.frequency.exponentialRampToValueAtTime(baseFreq * 0.445, now + 0.28);

    const chimeGain = window.audioCtx.createGain();
    chimeGain.gain.setValueAtTime(0.001, now);
    chimeGain.gain.linearRampToValueAtTime(0.08 * volume, now + 0.015);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    chime.connect(chimeGain);
    chimeGain.connect(window.audioCtx.destination);

    chime.start(now);
    chime.stop(now + 0.3);
};

// ==========================================================================
// PHASE 4.1: CELESTIAL ORRERY ASTROLABE MECHANICAL SFX SYNTHESIZERS
// ==========================================================================

/**
 * Antique Brass Mechanical Escapement Tick SFX:
 * Crisp, tactile clockwork gear tooth click with micro metallic resonance.
 * Triggered during dial rotation on angle increments and quadrant transitions.
 */
window.playOrreryTickSFX = (isMajor = false, out) => {
    window.initAudio();
    if (!window.audioCtx) return;
    const dest = window.resolveSfxOutput(out);
    const now = window.audioCtx.currentTime;
    const dur = isMajor ? 0.06 : 0.035;

    // 1. Mechanical tooth click (snappy bandpass burst)
    const bufSize = Math.floor(window.audioCtx.sampleRate * dur);
    const clickBuf = window.audioCtx.createBuffer(1, bufSize, window.audioCtx.sampleRate);
    const data = clickBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.25));
    }
    const noise = window.audioCtx.createBufferSource();
    noise.buffer = clickBuf;

    const filter = window.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(isMajor ? 3200 : 2600, now);
    filter.Q.value = 5.0;

    const gain = window.audioCtx.createGain();
    gain.gain.setValueAtTime(isMajor ? 0.22 : 0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    noise.start(now);

    // 2. Micro metallic brass ping
    const ping = window.audioCtx.createOscillator();
    ping.type = 'triangle';
    ping.frequency.setValueAtTime(isMajor ? 2850 : 2150, now);
    ping.frequency.exponentialRampToValueAtTime(isMajor ? 2400 : 1800, now + dur);

    const pingGain = window.audioCtx.createGain();
    pingGain.gain.setValueAtTime(isMajor ? 0.08 : 0.04, now);
    pingGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    ping.connect(pingGain);
    pingGain.connect(dest);
    ping.start(now);
    ping.stop(now + dur);
};

/**
 * Astrolabe Celestial Glide SFX:
 * Smooth harmonic chime when snapping or gliding between seasons
 */
window.playOrreryGlideSFX = (seasonKey = 'spring', out) => {
    window.initAudio();
    if (!window.audioCtx) return;
    const dest = window.resolveSfxOutput(out);
    const now = window.audioCtx.currentTime;

    // Harmonic frequencies based on season mood
    const seasonChords = {
        'spring': [587.33, 880.00, 1174.66],  // D5, A5, D6 (fresh morning dew)
        'summer': [659.25, 987.77, 1318.51],  // E5, B5, E6 (radiant warm gold)
        'autumn': [440.00, 659.25, 880.00],   // A4, E5, A5 (mellow amber breeze)
        'aurora': [523.25, 783.99, 1046.50, 1567.98] // C5, G5, C6, G6 (ethereal crystal night)
    };

    const freqs = seasonChords[seasonKey] || seasonChords['spring'];
    const dur = 0.45;

    freqs.forEach((freq, i) => {
        const osc = window.audioCtx.createOscillator();
        osc.type = 'sine';
        const startT = now + i * 0.035;
        osc.frequency.setValueAtTime(freq, startT);

        const gain = window.audioCtx.createGain();
        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.07, startT + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startT + dur);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(startT);
        osc.stop(startT + dur);
    });
};

/**
 * Summer Rain ASMR SFX:
 * Soft rain patter on lush leaves with gentle water drop pings.
 */
window.playSummerRainSFX = (out) => {
    window.initAudio();
    if (!window.audioCtx) return;
    const dest = window.resolveSfxOutput(out);
    const now = window.audioCtx.currentTime;
    const dur = 1.6;

    const bufSize = Math.floor(window.audioCtx.sampleRate * dur);
    const rainBuf = window.audioCtx.createBuffer(1, bufSize, window.audioCtx.sampleRate);
    const data = rainBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.35;
    }
    const noise = window.audioCtx.createBufferSource();
    noise.buffer = rainBuf;

    const filter = window.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.value = 1.5;

    const gain = window.audioCtx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    noise.start(now);

    const dropletPitches = [1650, 1920, 2240, 2580];
    dropletPitches.forEach((p, idx) => {
        const dropT = now + 0.15 + idx * 0.25 + Math.random() * 0.1;
        const dropOsc = window.audioCtx.createOscillator();
        dropOsc.type = 'sine';
        dropOsc.frequency.setValueAtTime(p, dropT);
        dropOsc.frequency.exponentialRampToValueAtTime(p * 0.7, dropT + 0.05);

        const dropGain = window.audioCtx.createGain();
        dropGain.gain.setValueAtTime(0.001, dropT);
        dropGain.gain.linearRampToValueAtTime(0.04, dropT + 0.008);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, dropT + 0.06);

        dropOsc.connect(dropGain);
        dropGain.connect(dest);
        dropOsc.start(dropT);
        dropOsc.stop(dropT + 0.06);
    });
};

/**
 * Sunbeam Warmth SFX:
 * Luminous warm harmonic glow with sweeping radiant filter.
 */
window.playSunbeamSFX = (out) => {
    window.initAudio();
    if (!window.audioCtx) return;
    const dest = window.resolveSfxOutput(out);
    const now = window.audioCtx.currentTime;
    const dur = 1.5;

    const pitches = [329.63, 415.30, 493.88, 622.25];
    pitches.forEach((freq, idx) => {
        const osc = window.audioCtx.createOscillator();
        osc.type = 'triangle';
        const startT = now + idx * 0.04;
        osc.frequency.setValueAtTime(freq, startT);

        const filter = window.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, startT);
        filter.frequency.exponentialRampToValueAtTime(2200, startT + 0.4);
        filter.frequency.exponentialRampToValueAtTime(800, startT + dur);

        const gain = window.audioCtx.createGain();
        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.06, startT + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, startT + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        osc.start(startT);
        osc.stop(startT + dur);
    });
};

/**
 * Autumn Whispering Breeze SFX:
 * Gentle atmospheric wind sweep with soft air resonance.
 */
window.playBreezeSFX = (out) => {
    window.initAudio();
    if (!window.audioCtx) return;
    const dest = window.resolveSfxOutput(out);
    const now = window.audioCtx.currentTime;
    const dur = 1.8;

    const bufSize = Math.floor(window.audioCtx.sampleRate * dur);
    const windBuf = window.audioCtx.createBuffer(1, bufSize, window.audioCtx.sampleRate);
    const data = windBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = window.audioCtx.createBufferSource();
    noise.buffer = windBuf;

    const filter = window.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.exponentialRampToValueAtTime(750, now + 0.7);
    filter.frequency.exponentialRampToValueAtTime(280, now + dur);
    filter.Q.value = 2.5;

    const gain = window.audioCtx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.45);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    noise.start(now);
};


// ==========================================================================
// ZONE-TRIGGERED TRACKS (celestial orrery: one track per compass direction zone)
// ==========================================================================

/**
 * A voice is a private gain bus. Route sounds into `voice.out` (the optional last argument of the
 * SFX synths) and `voice.stop()` cuts all of them together with a short fade, so no click is heard.
 */
window.createSfxVoice = () => {
    window.initAudio();
    const ctx = window.audioCtx;
    const bus = ctx.createGain();
    bus.connect(ctx.destination);
    let stopped = false;

    return {
        out: bus,
        stop(fadeSec = 0.04) {
            if (stopped) return;
            stopped = true;
            const t = ctx.currentTime;
            bus.gain.cancelScheduledValues(t);
            bus.gain.setValueAtTime(bus.gain.value, t);
            bus.gain.linearRampToValueAtTime(0, t + fadeSec);
            setTimeout(() => bus.disconnect(), fadeSec * 1000 + 30);
        }
    };
};

// Direction zone -> SFX synth name (looked up lazily so later overrides still apply)
window.ORRERY_ZONE_TRACKS = {
    spring: 'playSummerRainSFX',
    summer: 'playSunbeamSFX',
    autumn: 'playBreezeSFX',
    aurora: 'playChimeSFX'
};

/** Plays the gear tick + the zone's track on one stoppable voice. `glide` adds the quadrant-click chord. */
window.playOrreryZoneTrack = (zoneKey, { glide = false } = {}) => {
    const voice = window.createSfxVoice();
    window.playOrreryTickSFX(true, voice.out);
    if (glide) window.playOrreryGlideSFX(zoneKey, voice.out);
    const track = window[window.ORRERY_ZONE_TRACKS[zoneKey]];
    if (typeof track === 'function') track(voice.out);
    return voice;
};

/**
 * Edge-triggered zone sound with a lockout. Pure state machine (injectable clock, no Web Audio),
 * so the rules are easy to test:
 *   - entering a DIFFERENT zone: stop the previous voice, play the new one immediately, and
 *     re-arm the lockout (lockMs). A zone change is never blocked by the lockout.
 *   - same zone inside the lockout: ignored, nothing is retriggered or stacked ('locked').
 *   - same zone after the lockout: ignored while rotating ('same-zone'); only an explicit
 *     `replay` gesture (tap / click) plays it again, stopping the previous voice first.
 * enter() returns 'switched' | 'replayed' | 'locked' | 'same-zone' | 'silent'.
 */
window.createZoneSoundTrigger = ({ lockMs = 200, now = () => performance.now(), play, stop } = {}) => {
    const stopVoice = stop || ((v) => { if (v && typeof v.stop === 'function') v.stop(); });
    let zone = null;
    let lockedUntil = 0;
    let voice = null;

    const start = (z, opts, t) => {
        lockedUntil = t + lockMs;
        voice = play(z, opts);
    };

    return {
        enter(nextZone, { replay = false, silent = false, ...opts } = {}) {
            const t = now();

            if (nextZone !== zone) {
                stopVoice(voice);
                voice = null;
                zone = nextZone;
                if (silent) { lockedUntil = 0; return 'silent'; }
                start(nextZone, opts, t);
                return 'switched';
            }

            if (t < lockedUntil) return 'locked';
            if (!replay || silent) return 'same-zone';

            stopVoice(voice);
            start(nextZone, opts, t);
            return 'replayed';
        },
        isLocked() { return now() < lockedUntil; },
        get zone() { return zone; }
    };
};
