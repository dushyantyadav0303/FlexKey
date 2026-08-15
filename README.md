<h1 align="center">
<br> <img width=40% alt="banner" src="https://cdn.hackclub.com/019f72a8-7ea2-7c5c-a0a4-284663b9bdb3/Untitled1.png" />
</h1>
<div align="center">  
  
[![Hack Club macondo](https://img.shields.io/badge/Hack%20Club-🦋Macondo-FFC800?style=for-the-badge&logo=hack-club&logoColor=red.svg)](https://macondo.hackclub.com)
</div>

<h4 align="center">
FlexKey: it is a Fully Customizable OpenSource 75% Mechanical Keyboard with Ai Powered customizable dashboard with allow user to Type a modify the there Keyboard.
</h4>

<div align="center">
  
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Project](https://img.shields.io/badge/Project-Hardware-yellow.svg)
![Series](https://img.shields.io/badge/Series-Flex-red.svg)

</div>

<p align="center">
  <a href="#about-the-project">About</a> •
  <a href="#repository-structure">Structure</a> •
  <a href="#schematic">Schematic</a> •
  <a href="#pcb">PCB</a> •
  <a href="#cad">CAD</a> •
  <a href="#Render">Render</a> •
  <a href="#bill-of-materials">BOM</a> •
  <a href="#license">License</a> •
  <a href="#credits">Credits</a>
</p>  

<p
  align="center">
  <a href="https://flex-key.vercel.app/home.html"> <img src="https://img.shields.io/badge/Modify%20it-With%20AI-pink?style=for-the-badge.svg" /> </a>
</p>

</p>

<br>
<br>
<p align=center>
  
 
<img width="773" height="309" alt="demo" src="https://github.com/user-attachments/assets/b09428b4-ecb0-4ff0-8268-66145b8e792b" />


</p>

> [!IMPORTANT]
> # PLEASE Check [How-to-Build](https://github.com/dushyantyadav0303/FlexKey/blob/main/How-to-Build.md) 
> ### It contain Beginner Friendly Step by Step Assembly Instruction Docs.




### About the Project

**FlexKey:** It is a Fully Customizable OpenSource 75% Mechanical Keyboard with an Ai Powered customizable dashboard with allow user to Type a modify the there Keyboard.

### Features

- **Rpi2040 MCU**
- **Type-C/Micro-USB**
- **KMK Based Firmware**
- **75% keyboard with 84 Keys + Encoder**
- **Modify with Ai Dashboard**
- **Customizable RGB Matrix**

## Repository Structure

- `src/Kicad/` - Kicad PCB sources
- `src/CAD/` -  editable .STEP file 
- `src/CAD/Fusion 360/` - Fusion 360 CAD sources
- `src/Blender/` - Blender Render sources 
- `production/PCB/` - PCB fabrication files (Gerbers, BOM, positions)
- `production/CAD/` - 3D-printable files (.3mf/.stl)
- `GETTING_STARTED/` - Setup guides
- `Journal/` - DevLogs With Timestamp
- `Firmware/` - Base Firmare

## Schematic
[![kicad](https://img.shields.io/badge/Designed%20in-Kicad-00578F?style=for-the-badge&logo=Kicad&logoColor=white)](https://kicad.org)

Source : `src/Cad/.Sch`
<img width=90%  alt="image" src="https://github.com/user-attachments/assets/3546ff9e-ba97-4856-8fb5-f6c1c54de011" />

## PCB 
Source : `src/Kicad/.Pcb`
<div align="center">

| Front PCB | Back PCB |
|-----------|----------|
| <img src="https://cdn.hackclub.com/019e8872-be8e-7914-9f72-f4364605efa5/image.png" width="400"> | <img src="https://cdn.hackclub.com/019e8873-7d8d-7f58-8450-084020c991b9/image.png" width="400"> |
| <img src="https://github.com/user-attachments/assets/10a0edb0-0665-41ca-b644-ce2a00060435" width="400"> | <img src="https://github.com/user-attachments/assets/fceed42a-46eb-417f-a7f7-29b3c1d10efe" width="400"> |

</div>

### Fabrication Production files are available in:
- source: `production/PCB/`


## CAD
[![Fusion 360](https://img.shields.io/badge/CAD%20in-Fusion%20360-orange?style=for-the-badge&logo=autodesk&logoColor=white)](https://www.autodesk.com/products/fusion-360)

- source: `src/Fusion 360/`
<div align="center">
<table>
<tr>
<td valign="bottom"><img width=100% alt="1" src="https://github.com/user-attachments/assets/02c1ffee-7072-4cf4-9e67-638d3ef27e6b" />
</td>
<td valign="bottom"><img width=100% alt="2" src="https://github.com/user-attachments/assets/68539689-c15d-48c3-a3bd-3372bc71835c" />
  </td>
<td valign="bottom"><img width=100% alt="3" src="https://github.com/user-attachments/assets/e9a2b16e-ec13-4701-8b3c-39783f2ba1f6" />
</table>
</div>


### 3D-printable Production files are available in:
- source: `production/PCB/`

## Render 
[![Blender](https://img.shields.io/badge/Rendered%20in-Blender-F5792A?style=for-the-badge&logo=blender&logoColor=white)](https://www.blender.org)

<div align="center">
<table>
  
https://github.com/user-attachments/assets/db8a1d57-0f98-42ea-bc92-7f4cc1325804

</table>
</div>


## Bill of Materials

Source: `BOM/BOM.csv`

| Part name | Quantity | Designator | Footprint | Price (In INR) | Link to buy |
| --- | --- | --- | --- | --- | --- |
| RaspberryPi_Pico | 1 | A1 | RaspberryPi_Pico | 384 | [Buy](https://robu.in/product/raspberry-pi-pico) |
| 1N4148 | 84 | D1-D84 | D_SOD-123 | 1.54 | [Buy](https://robu.in/product/1n4148-1w-zener-diode-pack-of-50) |
| sk6812 mini-e | 83 | DL1-DL83 | SK6812MINI-E | 8.5 | [Buy](https://www.lcsc.com/product-detail/Light-Emitting-Diodes-LED_OPSCO-Optoelectronics-SK6812MINI-E_C5149201.html) |
| RotaryEncoder | 1 | EN1 | RotaryEncoder_EC11E-Switch_Vertical | 42 | [Buy](https://www.flyrobo.in/ec11-rotary-encoder-half-shaft-handle-potentiometer-15mm) |
| oled Disply | 1 | J1 | OLED_0.91_128x32 | 212 | [Buy](https://robu.in/product/blue-oled-display-module/) |
| Key Switches | 84 | SW1-SW84 | MX100H | 7.3 | [Buy](https://www.thecosmicbyte.com/product-category/keyboard-mechanical-switches/) |
| Keycaps | 2 | SW1-SW84 | MX200H | 999 | [Buy](https://amzn.in/d/0iVP38it) |
| Kailh Hot-Swap Sockets | 84 | SW1-SW84 | Kailh Hot-Swap Sockets (CPG151101S11) | 11.6 | [Buy](https://www.amazon.in/HEAVENGLOW-Socket-Connector-Keyboard-Switches/dp/B0H74X3QF5) |
| Stabilizers | 8 |  |  | 32 | [Buy](https://neomacro.in/products/cherry-pcb-mount-stabilizers-clip-in?variant=49725395239190&country=IN&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic) |
| Full Case | 1 |  | inc. bottom, Top & plate |  | 3D PRINTED |
| PCB  | 1 |  |  | 2,339 | [Buy](https://jlcpcb.com) |
| M3 heat Insert | 4 |  |  | 3.6 | [Buy](https://robu.in/product/m3-x-6-mm-brass-heat-set-knurl-threaded-round-insert-nut-25-pcs/) |
| M3 Screw H-20mm | 4 |  |  | 2.6 | [Buy](https://onlyscrews.in/products/m3-x-20mm-hex-allen-socket-head-high-tensile12-9-black-anodized-screw) |

> [!NOTE]
> Price As of August 15, 2026 
> & It not Include the Shipping fee <br/>

## License

Licensed under MIT - you can use this commercially, modify, distribute and  Flex key more 
with proper attribution. See [LICENSE](LICENSE) file.

## Contributing

Contributions, improvements, and remixes are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) guide to get started.


## Credits
<div align="center">
  
[![Hack Club macondo](https://img.shields.io/badge/Hack%20Club-🦋Macondo-FFC800?style=for-the-badge&logo=hack-club&logoColor=red)](https://macondo.hackclub.com)
[![kicad](https://img.shields.io/badge/Designed%20in-Kicad-00578F?style=for-the-badge&logo=Kicad&logoColor=white)](https://kicad.org)
[![Fusion 360](https://img.shields.io/badge/CAD%20in-Fusion%20360-orange?style=for-the-badge&logo=autodesk&logoColor=white)](https://www.autodesk.com/products/fusion-360)
[![Blender](https://img.shields.io/badge/Rendered%20in-Blender-F5792A?style=for-the-badge&logo=blender&logoColor=white)](https://www.blender.org) 
</div>

This project was created during a [Hack Club](https://hackclub.com) event [Macondo](https://macondo.hackclub.com).
- **[Kicad](https://Kicad.org)** - PCB design and schematic capture
- **[Fusion 360](https://www.autodesk.com/products/fusion-360)** - Cad Designing
- **[Blender](https://www.blender.org)** - Render
- **[KMK firmware](https://github.com/KMKfw/kmk_firmware)**
- **[@NotARoomba](https://github.com/notaroomba) & [@Gabouin](https://github.com/Gabouin)** - Readme template
