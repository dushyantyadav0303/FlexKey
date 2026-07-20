import storage
import usb_cdc
import usb_hid

storage.enable(console=True)
usb_cdc.enable(console=True, data=True)
usb_hid.enable(
    (usb_hid.Device.KEYBOARD,
     usb_hid.Device.MOUSE,
     usb_hid.Device.CONSUMER_CONTROL)
)