import board

from kmk.kmk_keyboard import KMKKeyboard
from kmk.scanners import DiodeOrientation
from kmk.keys import KC
from kmk.modules.layers import Layers
from kmk.modules.encoder import EncoderHandler
from kmk.extensions.RGB import RGB, AnimationModes

layers = Layers()
import config


keyboard = KMKKeyboard()

keyboard.row_pins = (
    board.GP0,
    board.GP1,
    board.GP2,
    board.GP3,
    board.GP4,
    board.GP5,
)

keyboard.col_pins = (
    board.GP6,
    board.GP7,
    board.GP8,
    board.GP9,
    board.GP10,
    board.GP11,
    board.GP12,
    board.GP13,
    board.GP14,
    board.GP15,
    board.GP16,
    board.GP17,
    board.GP18,
    board.GP19,
    board.GP20,
)

keyboard.diode_orientation = DiodeOrientation.

keyboard.modules.append(layers)


# MATRIX KEYMAP

def expand_layer(compact):

    result = []

    empty = {
        3: {14},
        4: {1},
        5: {3, 4, 6, 7, 8},
    }

    index = 0

    for row in range(6):

        for col in range(15):

            if col in empty.get(row, set()):
                result.append(KC.NO)

            else:
                result.append(compact[index])
                index += 1

    return result


keyboard.keymap = [
    expand_layer(layer)
    for layer in config.KEYMAP
]


# ENCODER

encoder = EncoderHandler()

encoder.pins = (
    (board.GP21, board.GP22, None, False),
)

encoder.map = config.ENCODER_MAP

keyboard.modules.append(encoder)

# RGB

if config.LED_MODE == 0:

    print("FlexKey RGB: OFF")

else:

    animation_modes = {
        1: AnimationModes.STATIC,
        2: AnimationModes.BREATHING,
        3: AnimationModes.RAINBOW,
    }

    mode = animation_modes.get(
        config.LED_MODE,
        AnimationModes.STATIC
    )

 rgb = RGB(
        pixel_pin=board.GP28,
        num_pixels=84,
        val_limit=config.LED_VAL,
        hue_default=config.LED_HUE,
        sat_default=config.LED_SAT,
    )

    rgb.animation_mode = mode

    keyboard.extensions.append(rgb)

    print("FlexKey RGB mode:", config.LED_MODE)

oled_ext = Oled(
    OledData(
        corner_one={OledData.WPM},        # Top Left: WPM
        corner_two={OledData.LAYER},      # Top Right: Layer indicator
        corner_three={OledData.BASE},     # Bottom Left: Default text
        corner_four={OledData.BASE}       # Bottom Right
    ),
    toDisplay=OledDisplayMode.TXT,
    flip=False,
)
oled_ext._txt = config.OLED_TEXT 
keyboard.extensions.append(oled_ext)
anim_map = {
    1: AnimationModes.STATIC,
    2: AnimationModes.BREATHING,
    3: AnimationModes.RAINBOW,
    4: AnimationModes.SWIRL,
    5: AnimationModes.KNIGHT
}

selected_animation = anim_map.get(config.LED_MODE, AnimationModes.STATIC)

print("FlexKey Booting up!!!")
print("Matrix: 6 x 15")
print("Visit:")
print("https://flex-key.vercel.app")
print("for Modify with AI")
print("Flex key is ready to hack")

keyboard.go()
