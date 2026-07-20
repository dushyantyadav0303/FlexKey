# config.py - Generated and Managed by Flex-Bot
from kmk.keys import KC

# --- 1. HARDWARE PERFORMANCE ---
DEBOUNCE_PRESS = 5
DEBOUNCE_RELEASE = 5

# --- 2. DISPLAY SETTINGS ---
# Modes: 'TEXT', 'WPM_MONITOR', 'REACTIVE' (Shows the exact key pressed)
OLED_MODE = 'WPM_MONITOR'
OLED_TEXT = "FlexKey 75%"
OLED_FLIP = False
OLED_TIMEOUT = 60000

# --- 3. LED SETTINGS ---
# Modes: 1(Static), 2(Breathing), 3(Rainbow), 4(Swirl), 5(Knight), 6(Breathing Rainbow), 7(Per-Key Custom)
LED_MODE = 7
LED_HUE = 20    # 0-255
LED_SAT = 255
LED_VAL = 150   # Brightness
LED_SPEED = 10

# Active ONLY if LED_MODE = 7. Format: { Key_Index: (R, G, B) }
PER_KEY_RGB = {
    31: (255, 0, 0),   # W is Red
    46: (0, 255, 0),   # A is Green
    47: (0, 0, 255),   # S is Blue
    48: (255, 255, 0)  # D is Yellow
}

# --- 4. ENCODER SETTINGS ---
ENCODER_MAP = [ ((KC.VOLD, KC.VOLU),), ((KC.MW_DN, KC.MW_UP),) ]

# --- 5. MACROS ---
MACRO_1 = "import board\n"
MACRO_2 = "git commit -m 'FlexKey update'\n"

# --- 6. KEYMAP ---
KEYMAP = [
    # Layer 0
    [
        KC.ESC, KC.F1, KC.F2, KC.F3, KC.F4, KC.F5, KC.F6, KC.F7, KC.F8, KC.F9, KC.F10, KC.F11, KC.F12, KC.PSCR, KC.DEL,
        KC.GRV, KC.N1, KC.N2, KC.N3, KC.N4, KC.N5, KC.N6, KC.N7, KC.N8, KC.N9, KC.N0, KC.MINS, KC.EQL, KC.BSPC, KC.HOME,
        KC.TAB, KC.Q, KC.W, KC.E, KC.R, KC.T, KC.Y, KC.U, KC.I, KC.O, KC.P, KC.LBRC, KC.RBRC, KC.BSLS, KC.PGUP,
        KC.CAPS, KC.A, KC.S, KC.D, KC.F, KC.G, KC.H, KC.J, KC.K, KC.L, KC.SCLN, KC.QUOT, KC.ENT, KC.PGDN,
        KC.LSFT, KC.Z, KC.X, KC.C, KC.V, KC.B, KC.N, KC.M, KC.COMM, KC.DOT, KC.SLSH, KC.RSFT, KC.UP, KC.END,
        KC.LCTL, KC.LGUI, KC.LALT, KC.SPC, KC.RALT, KC.MO(1), KC.RCTL, KC.LEFT, KC.DOWN, KC.RGHT
    ],
    # Layer 1 (Fn)
    [
        KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS,
        KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS,
        KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS,
        KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS,
        KC.TRNS, KC.MACRO_1, KC.MACRO_2, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS,
        KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS, KC.TRNS
    ]
]