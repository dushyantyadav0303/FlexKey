import board
import busio
from kmk.kmk_keyboard import KMKKeyboard
from kmk.scanners import DiodeOrientation
from kmk.modules.encoder import EncoderHandler
from kmk.extensions.RGB import RGB, AnimationModes
from kmk.extensions.peg_oled_display import Oled, OledDisplayMode, OledReactionType, OledData
import config

keyboard = KMKKeyboard()
keyboard.row_pins = (
    board.GP0, board.GP1, board.GP2, 
    board.GP3, board.GP4, board.GP5
)

keyboard.col_pins = (
    board.GP6, board.GP7, board.GP8, board.GP9, board.GP10,
    board.GP11, board.GP12, board.GP13, board.GP14, board.GP15,
    board.GP16, board.GP17, board.GP18, board.GP19, board.GP20
)
keyboard.diode_orientation = DiodeOrientation.COL2ROW

encoder_handler = EncoderHandler()
encoder_handler.pins = ((board.GP21, board.GP22, None, False),) # 'None' assumes no push-button on encoder

# Apply AI Configured Encoder Mode
if config.ENCODER_MODE == 'VOLUME':
    encoder_handler.map = (((config.KC.VOLD, config.KC.VOLU),),)
elif config.ENCODER_MODE == 'SCROLL_VERT':
    encoder_handler.map = (((config.KC.MW_DN, config.KC.MW_UP),),)
elif config.ENCODER_MODE == 'SCROLL_HORIZ':
    encoder_handler.map = (((config.KC.MW_LT, config.KC.MW_RT),),)

keyboard.modules.append(encoder_handler)

i2c = busio.I2C(board.GP26, board.GP27)

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
# Injecting the custom text from config
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

rgb = RGB(
    pixel_pin=board.GP28,
    num_pixels=84,
    val_limit=config.LED_VAL,
    hue_default=config.LED_HUE,
    sat_default=config.LED_SAT,
    animation_mode=selected_animation
)

keyboard.extensions.append(rgb)

keyboard.keymap = config.KEYMAP

if __name__ == '__main__':
    keyboard.go()
