/* --- TAB SWITCHING LOGIC --- */
const allTabs = document.querySelectorAll('.tab');
const allPanels = document.querySelectorAll('.toolbox-panel');

function switchTab(clickedTab, panelId) {
    allTabs.forEach(tab => tab.classList.remove('active'));
    allPanels.forEach(panel => panel.classList.add('hidden'));
    clickedTab.classList.add('active');
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) targetPanel.classList.remove('hidden');
}

document.getElementById('tab-keymap')?.addEventListener('click', function() { switchTab(this, 'panel-keymap'); });
document.getElementById('tab-lighting')?.addEventListener('click', function() { switchTab(this, 'panel-lighting'); });
document.getElementById('tab-macros')?.addEventListener('click', function() { switchTab(this, 'panel-macros'); });
document.getElementById('tab-firmware')?.addEventListener('click', function() { switchTab(this, 'panel-firmware'); });


/* --- LIVE KEYBOARD TESTER --- */
let currentLedMode = 1;
const REACTIVE_LED_MODE = 5;

document.addEventListener('keydown', function(event) {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    const uiKey = document.querySelector(`.key[data-code="${event.code}"]`);
    if (uiKey) {
        event.preventDefault();
        uiKey.classList.add('pressed');
        if (currentLedMode === REACTIVE_LED_MODE) {
            clearTimeout(uiKey._glowFadeTimer);
            uiKey.classList.add('key-glow-active');
        }
    }
});
document.addEventListener('keyup', function(event) {
    const uiKey = document.querySelector(`.key[data-code="${event.code}"]`);
    if (uiKey) {
        uiKey.classList.remove('pressed');
        if (currentLedMode === REACTIVE_LED_MODE) {
            uiKey._glowFadeTimer = setTimeout(() => uiKey.classList.remove('key-glow-active'), 550);
        }
    }
});


/* --- DIRECT DRIVE ACCESS & FLASHING --- */
let circuitpyHandle = null;
const connectDriveBtn = document.getElementById('connect-drive-btn');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const flashFirmwareBtn = document.getElementById('flash-firmware-btn');
const firmwareCodeBlock = document.getElementById('firmware-code-block');
const brightnessSlider = document.getElementById('brightness-slider');
const brightnessValueLabel = document.getElementById('brightness-value');
const animationSelect = document.getElementById('animation-mode-select');
const customColorPicker = document.getElementById('custom-color-picker');

connectDriveBtn?.addEventListener('click', async () => {
    try {
        circuitpyHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
        statusDot.classList.add('online');
        statusText.innerText = "CIRCUITPY Connected";
        connectDriveBtn.style.borderColor = "#00ff66";

        const existingConfig = await getCurrentConfig();
        if (existingConfig) {
            firmwareCodeBlock.value = existingConfig;
            syncVisualsFromConfig(existingConfig);
            appendMessage('ai', "Loaded the config.py already on your board — keyboard preview and lighting controls are now synced to it.");
        }
    } catch (error) {
        statusDot.classList.remove('online');
        statusText.innerText = "Connection Failed";
        connectDriveBtn.style.borderColor = "var(--border-color)";
    }
});

async function getCurrentConfig() {
    if (!circuitpyHandle) return null;
    try {
        const fileHandle = await circuitpyHandle.getFileHandle('config.py');
        const file = await fileHandle.getFile();
        return await file.text();
    } catch (error) { return null; }
}

async function flashToBoard(codeContent, triggerBtn) {
    const btn = triggerBtn || flashFirmwareBtn;
    if (!circuitpyHandle) {
        appendNotification("FLASH FAILED: CIRCUITPY drive is not connected. Click 'Connect CIRCUITPY Drive' first.");
        return;
    }
    try {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Flashing...';
        const fileHandle = await circuitpyHandle.getFileHandle('config.py', { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(codeContent);
        await writable.close();
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Flashed Successfully!';
        setTimeout(() => { btn.innerHTML = originalText; }, 3000);
    } catch (error) {
        appendNotification("FLASH FAILED: Could not write to board. Check permissions.");
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Flash Failed';
    }
}

flashFirmwareBtn?.addEventListener('click', () => {
    if (firmwareCodeBlock.value.trim() !== "") flashToBoard(firmwareCodeBlock.value, flashFirmwareBtn);
});

const lightingApplyBtn = document.getElementById('lighting-apply-btn');
lightingApplyBtn?.addEventListener('click', () => {
    if (firmwareCodeBlock.value.trim() !== "") flashToBoard(firmwareCodeBlock.value, lightingApplyBtn);
});


/* --- KEYCODE REFERENCE MAPS --- */
const kcToLabel = {
    'KC.ESC': 'Esc', 'KC.F1': 'F1', 'KC.F2': 'F2', 'KC.F3': 'F3', 'KC.F4': 'F4', 'KC.F5': 'F5', 'KC.F6': 'F6', 'KC.F7': 'F7', 'KC.F8': 'F8', 'KC.F9': 'F9', 'KC.F10': 'F10', 'KC.F11': 'F11', 'KC.F12': 'F12',
    'KC.PSCR': 'PrtSc', 'KC.DEL': 'Del', 'KC.GRV': '`', 'KC.N1': '1', 'KC.N2': '2', 'KC.N3': '3', 'KC.N4': '4', 'KC.N5': '5', 'KC.N6': '6', 'KC.N7': '7', 'KC.N8': '8', 'KC.N9': '9', 'KC.N0': '0',
    'KC.MINS': '-', 'KC.EQL': '=', 'KC.BSPC': 'Backspace', 'KC.HOME': 'Home', 'KC.TAB': 'Tab', 'KC.Q': 'Q', 'KC.W': 'W', 'KC.E': 'E', 'KC.R': 'R', 'KC.T': 'T', 'KC.Y': 'Y', 'KC.U': 'U', 'KC.I': 'I', 'KC.O': 'O', 'KC.P': 'P',
    'KC.LBRC': '[', 'KC.RBRC': ']', 'KC.BSLS': '\\', 'KC.PGUP': 'PgUp', 'KC.CAPS': 'Caps', 'KC.A': 'A', 'KC.S': 'S', 'KC.D': 'D', 'KC.F': 'F', 'KC.G': 'G', 'KC.H': 'H', 'KC.J': 'J', 'KC.K': 'K', 'KC.L': 'L',
    'KC.SCLN': ';', 'KC.QUOT': "'", 'KC.ENT': 'Enter', 'KC.PGDN': 'PgDn', 'KC.LSFT': 'Shift', 'KC.Z': 'Z', 'KC.X': 'X', 'KC.C': 'C', 'KC.V': 'V', 'KC.B': 'B', 'KC.N': 'N', 'KC.M': 'M',
    'KC.COMM': ',', 'KC.DOT': '.', 'KC.SLSH': '/', 'KC.RSFT': 'Shift', 'KC.UP': 'Up', 'KC.END': 'End', 'KC.LCTL': 'Ctrl', 'KC.LGUI': 'Win', 'KC.LALT': 'Alt', 'KC.SPC': 'Space', 'KC.RALT': 'Alt', 'KC.RCTL': 'Ctrl',
    'KC.LEFT': 'Left', 'KC.DOWN': 'Down', 'KC.RGHT': 'Right', 'KC.TRNS': '...'
};

/* --- LIGHTING COLOR HELPERS --- */
function hexToKmkHue(hex) {
    const r = parseInt(hex.substr(1, 2), 16) / 255;
    const g = parseInt(hex.substr(3, 2), 16) / 255;
    const b = parseInt(hex.substr(5, 2), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0;
    if (max !== min) {
        const d = max - min;
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return Math.round(h * 255);
}

function kmkHueToHex(hue255) {
    const h = (hue255 / 255) * 360;
    const s = 1, l = 0.5;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = x => Math.round(255 * x).toString(16).padStart(2, '0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

/* --- SECURE CONFIG FIELD UPDATER (100% FIRMWARE RELIANCE) --- */
function updateConfigField(fieldName, value) {
    // Always fetch directly from the editor
    let currentCode = firmwareCodeBlock.value.trim() !== "" ? firmwareCodeBlock.value : DEFAULT_TEMPLATE;
    
    // Safely match digits or strings
    const regex = new RegExp(`${fieldName}\\s*=\\s*(?:\\d+|['"][^'"]*['"])`);
    
    if (regex.test(currentCode)) {
        currentCode = currentCode.replace(regex, `${fieldName} = ${value}`);
    } else {
        // Safe injection if variable got deleted
        if(currentCode.includes('LED_MODE')) {
            currentCode = currentCode.replace(/(LED_MODE\s*=\s*\d+)/, `$1\n${fieldName} = ${value}`);
        } else {
            currentCode += `\n${fieldName} = ${value}`;
        }
    }
    
    // 1. Write the changes back to the text editor FIRST
    firmwareCodeBlock.value = currentCode;
    
    // 2. Dispatch an event to tell the UI to sync from the newly written text
    firmwareCodeBlock.dispatchEvent(new Event('input'));
}

/* --- UI SYNCING LOGIC (The only function allowed to change the visualizer) --- */
function syncVisualsFromConfig(configText) {
    // 1. Sync OLED
    const oledMatch = configText.match(/OLED_TEXT\s*=\s*["']([^"']+)["']/);
    if (oledMatch && document.getElementById('oled-display-text')) {
        document.getElementById('oled-display-text').innerText = oledMatch[1];
    }

    // 2. Sync Lighting Variables
    const hueMatch = configText.match(/LED_HUE\s*=\s*(\d+)/);
    const valMatch = configText.match(/LED_VAL\s*=\s*(\d+)/);
    const modeMatch = configText.match(/LED_MODE\s*=\s*(\d+)/);

    const ledHue = hueMatch ? parseInt(hueMatch[1]) : 20;
    const ledVal = valMatch ? parseInt(valMatch[1]) : 150;
    const ledMode = modeMatch ? parseInt(modeMatch[1]) : 1;

    // Fix: Properly calculate HSL to prevent Rainbow logic from breaking
    const cssHue = Math.round((ledHue / 255) * 360);
    const isAmbientOff = ledMode === 0 || ledMode === REACTIVE_LED_MODE;
    const glowAlpha = isAmbientOff ? 0 : (0.15 + (ledVal / 255) * 0.65);
    const glowLightness = 42 + Math.round((ledVal / 255) * 18);

    if (ledMode === 3 || ledMode === 4) {
        // Rainbow Effect FIX: hue-rotate requires a highly saturated base color
        document.documentElement.style.setProperty('--rgb-glow-color', `hsla(0, 100%, 50%, ${glowAlpha.toFixed(2)})`);
        document.documentElement.style.setProperty('--glow-animation', 'rainbow-effect 5s infinite linear');
    } else {
        // Standard Solid / Breathing
        document.documentElement.style.setProperty('--rgb-glow-color', `hsla(${cssHue}, 100%, ${glowLightness}%, ${glowAlpha.toFixed(2)})`);
        if (ledMode === 2 || ledMode === 6) {
            document.documentElement.style.setProperty('--glow-animation', 'breathe-effect 3s infinite alternate');
        } else {
            document.documentElement.style.setProperty('--glow-animation', 'none');
        }
    }

    currentLedMode = ledMode;
    document.documentElement.classList.toggle('reactive-lighting', ledMode === REACTIVE_LED_MODE);
    if (ledMode !== REACTIVE_LED_MODE) {
        document.querySelectorAll('.key.key-glow-active').forEach(k => k.classList.remove('key-glow-active'));
    }

    // Update UI Sliders/Panels to match code
    if (brightnessSlider) {
        brightnessSlider.value = ledVal;
        if (brightnessValueLabel) brightnessValueLabel.innerText = Math.round((ledVal / 255) * 100) + '%';
    }

    if (animationSelect) {
        let normalizedMode = ledMode;
        if (ledMode === 6) normalizedMode = 2;
        if (ledMode === 4) normalizedMode = 3;
        const validModes = ['0', '1', '2', '3', '5'];
        animationSelect.value = validModes.includes(String(normalizedMode)) ? String(normalizedMode) : '1';
    }

    let closestSwatch = null, closestDiff = Infinity;
    document.querySelectorAll('.swatch').forEach(s => {
        const diff = Math.abs(parseInt(s.getAttribute('data-hue')) - ledHue);
        if (diff < closestDiff) { closestDiff = diff; closestSwatch = s; }
    });
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    if (closestSwatch && closestDiff <= 5) closestSwatch.classList.add('active');

    if (customColorPicker) customColorPicker.value = kmkHueToHex(ledHue);

    // 3. Sync Macros
    for(let i=1; i<=4; i++) {
        const macroRegex = new RegExp(`MACRO_${i}\\s*=\\s*["']([^"']*)["']`);
        const macroMatch = configText.match(macroRegex);
        const dispSpan = document.getElementById(`disp-macro-${i}`);
        if (dispSpan) {
            dispSpan.innerText = macroMatch && macroMatch[1] ? `"${macroMatch[1]}"` : '""';
        }
    }

    // 4. Sync Keymap
    const keymapMatch = configText.match(/KEYMAP\s*=\s*\[([\s\S]*?)\]/);
    if (keymapMatch) {
        const keymapContent = keymapMatch[1];
        const layers = keymapContent.split(/\]\s*,\s*\[/);
        if (layers.length > 0) {
            const layer0 = layers[0].replace(/^\s*\[\s*/, '').trim();
            const keyStrings = layer0.match(/KC\.\w+(?:\(\d+\))?/g) || [];
            
            let keyIndex = 0;
            document.querySelectorAll('.key-row').forEach(row => {
                row.querySelectorAll('.key').forEach(keyEl => {
                    if (keyIndex < keyStrings.length) {
                        const kcStr = keyStrings[keyIndex];
                        const displayLabel = kcToLabel[kcStr] || kcStr.replace('KC.', '').substring(0, 8);
                        keyEl.setAttribute('data-original', keyEl.innerText);
                        keyEl.innerText = displayLabel;
                        keyEl.title = `Maps to: ${kcStr}`;
                        keyIndex++;
                    }
                });
            });
        }
    }
}

// Map Panel Controls to strictly trigger config updates
document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', function() { updateConfigField('LED_HUE', this.getAttribute('data-hue')); });
});

customColorPicker?.addEventListener('input', function() {
    updateConfigField('LED_HUE', hexToKmkHue(this.value));
});

brightnessSlider?.addEventListener('input', function() {
    if (brightnessValueLabel) brightnessValueLabel.innerText = Math.round((this.value / 255) * 100) + '%';
    updateConfigField('LED_VAL', this.value);
});

animationSelect?.addEventListener('change', function() {
    updateConfigField('LED_MODE', this.value);
});

// The core listener: ANY manual text edit immediately drives the visuals
firmwareCodeBlock?.addEventListener('input', function() {
    syncVisualsFromConfig(this.value);
});

/* --- AI BOT INTEGRATION --- */
const chatInput = document.querySelector('.chat-input-area input');
const sendBtn = document.querySelector('.send-btn');
const chatHistory = document.querySelector('.chat-history');

function appendMessage(sender, text, isLoader = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender === 'user' ? 'user-message' : 'ai-message'}`;
    if (sender === 'user') {
        msgDiv.style.display = 'flex'; msgDiv.style.justifyContent = 'flex-end';
        msgDiv.innerHTML = `<div class="text" style="background: #333; padding: 8px 12px; border-radius: 12px; max-width: 80%;">${text}</div>`;
    } else {
        if (isLoader) {
            // New animated loader implementation
            msgDiv.innerHTML = `<div class="avatar">F</div><div class="text" style="padding-top: 5px;"><div class="typing-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
        } else {
            msgDiv.innerHTML = `<div class="avatar">F</div><div class="text">${text}</div>`;
        }
    }
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    return msgDiv; 
}

function appendNotification(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message system-notification';
    msgDiv.style.display = 'flex'; msgDiv.style.justifyContent = 'center'; msgDiv.style.margin = '10px 0';
    msgDiv.innerHTML = `<div class="text" style="background: rgba(255, 68, 68, 0.1); color: #ff4444; border: 1px solid #ff4444; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; text-align: center; width: 100%;"><i class="fa-solid fa-triangle-exclamation"></i> ${text}</div>`;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

const DEFAULT_TEMPLATE = `from kmk.keys import KC

DEBOUNCE_PRESS = 5
DEBOUNCE_RELEASE = 5
OLED_MODE = 'TEXT' 
OLED_TEXT = "FlexKey 75%"
OLED_FLIP = False
# LED_MODE: 0=Off, 1=Solid, 2=Breathing, 3=Rainbow Cycle, 5=Reactive (glow on keypress)
LED_MODE = 1
LED_HUE = 20
LED_SAT = 255
LED_VAL = 150
LED_SPEED = 10
PER_KEY_RGB = {} 
ENCODER_MAP = [ ((KC.VOLD, KC.VOLU),), ((KC.MW_DN, KC.MW_UP),) ] 
MACRO_1 = ""
MACRO_2 = ""
MACRO_3 = ""
MACRO_4 = ""
MACRO_5 = ""

KEYMAP = [
    [
        KC.ESC, KC.F1, KC.F2, KC.F3, KC.F4, KC.F5, KC.F6, KC.F7, KC.F8, KC.F9, KC.F10, KC.F11, KC.F12, KC.PSCR, KC.DEL,
        KC.GRV, KC.N1, KC.N2, KC.N3, KC.N4, KC.N5, KC.N6, KC.N7, KC.N8, KC.N9, KC.N0, KC.MINS, KC.EQL, KC.BSPC, KC.HOME,
        KC.TAB, KC.Q, KC.W, KC.E, KC.R, KC.T, KC.Y, KC.U, KC.I, KC.O, KC.P, KC.LBRC, KC.RBRC, KC.BSLS, KC.PGUP,
        KC.CAPS, KC.A, KC.S, KC.D, KC.F, KC.G, KC.H, KC.J, KC.K, KC.L, KC.SCLN, KC.QUOT, KC.ENT, KC.PGDN,
        KC.LSFT, KC.Z, KC.X, KC.C, KC.V, KC.B, KC.N, KC.M, KC.COMM, KC.DOT, KC.SLSH, KC.RSFT, KC.UP, KC.END,
        KC.LCTL, KC.LGUI, KC.LALT, KC.SPC, KC.RALT, KC.MO(1), KC.RCTL, KC.LEFT, KC.DOWN, KC.RGHT
    ],
    [
        KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS,
        KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS,
        KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS,
        KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS,
        KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS,
        KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS
    ]
]`;

async function sendToFlexBot(userText) {
    appendMessage('user', userText);
    chatInput.value = '';

    let existingConfig = await getCurrentConfig();
    
    // Always fall back to the text editor to ensure 100% firmware reliance
    if (!circuitpyHandle) {
        appendNotification("CIRCUITPY drive not connected. Using code from the editor as context.");
        existingConfig = firmwareCodeBlock.value; 
    } else if (!existingConfig) {
        appendNotification("config.py not found on board. Using code from the editor as context.");
        existingConfig = firmwareCodeBlock.value; 
    }

    if (!existingConfig || existingConfig.trim() === "") {
        existingConfig = DEFAULT_TEMPLATE;
    }

    // Trigger the new animated loader
    const loadingBubble = appendMessage('ai', '', true);
    const loadingText = loadingBubble.querySelector('.text');

    let dynamicPrompt = `You are Flex-Bot, an AI configuration assistant for a custom 75% mechanical keyboard (84 keys).
CRITICAL INSTRUCTION: You MUST output the ENTIRE, complete 'config.py' file. DO NOT output partial code snippets.
LED_MODE values: 0=Off, 1=Solid, 2=Breathing, 3=Rainbow Cycle, 5=Reactive (keys only glow when pressed). Use these exact numbers.
Always enclose your python code in a single markdown block like this: \`\`\`python [code here] \`\`\`\n`;

    dynamicPrompt += `\nCURRENT USER CONFIG:\n\`\`\`python\n${existingConfig}\n\`\`\`\nRetain existing settings, change only what is requested.`;

    try {
        // We now call our own secure Vercel backend route!
        // No more corsproxy.io, and no more exposed API keys.
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'anthropic/claude-sonnet-5', 
                messages: [
                    { role: 'system', content: dynamicPrompt },
                    { role: 'user', content: userText }
                ]
            })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const aiResponseText = data.choices[0].message.content;

        loadingText.innerText = aiResponseText.replace(/```python[\s\S]*?```/g, '[Configuration Code Generated]');

        const codeMatch = aiResponseText.match(/```python([\s\S]*?)```/);
        if (codeMatch) {
            const pythonCode = codeMatch[1].trim();
            firmwareCodeBlock.value = pythonCode;
            
            firmwareCodeBlock.dispatchEvent(new Event('input'));
            
            const tabFirmware = document.getElementById('tab-firmware');
            if (tabFirmware) switchTab(tabFirmware, 'panel-firmware');
        }

    } catch (error) {
        console.error("AI API Error:", error);
        chatHistory.removeChild(loadingBubble);
        appendNotification(`API Connection Failed: ${error.message}.`);
    }

sendBtn?.addEventListener('click', () => { if (chatInput.value.trim()) sendToFlexBot(chatInput.value.trim()); });
chatInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter' && chatInput.value.trim()) sendToFlexBot(chatInput.value.trim()); });

window.addEventListener('DOMContentLoaded', () => {
    // Rely completely on Default Firmware layout on load
    if (firmwareCodeBlock.value.trim() === "") {
        firmwareCodeBlock.value = DEFAULT_TEMPLATE;
    }
    // Initialize the visuals from the newly inserted default text
    firmwareCodeBlock.dispatchEvent(new Event('input'));
});
