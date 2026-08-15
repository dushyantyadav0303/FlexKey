# Upload the Base Firmware in Keyboard

## Install CircuitPython in Flexkey

- Connect flexkey with your computer. press and hold boot button for 5 second
- A drive named `RPI-RP2` will appear on your computer.
- Download the CircuitPython for Raspberry Pi Pico from [circuitpython.org](https://circuitpython.org/board/raspberry_pi_pico/).
- drag and drop that file in drive `RPI-RP2`.
- Verify it: Check that the drive name become `CircuitPython` from `RPI-RP2`.

## Add kmk_firmware library
- Download the kmk_firmware library from [Repo](https://github.com/KMKfw/kmk_firmware/tree/main/kmk)
- Drag and Drop kmk folder in drive `CircuitPython/lib`

## Add firmware
- open [Firmware directory](https://github.com/dushyantyadav0303/FlexKey/tree/main/Firmware)
- copy all 3 file (code.py, boot.py, config.py)
- Paste in root of drive `CircuitPython`
- And here you go, Your firmware is successfully flashed and you can use the Flexkey

###  PLEASE Check [How-to-Build](https://github.com/dushyantyadav0303/FlexKey/blob/main/How-to-Build.md) for Detailed guide
