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
  
  https://github.com/user-attachments/assets/db8a1d57-0f98-42ea-bc92-7f4cc1325804
  
</p>


### About the Project

**FlexKey:** it is a Fully Customizable OpenSource 75% Mechanical Keyboard with Ai Powered customizable dashboard with allow user to Type a modify the there Keyboard.

### Features

- **Rpi2040 MCU**
- **Type-C/Micro-USB**
- **KMK Based Firmware**
- **75% keyboard with 84 Keys + Encoder**
- **Modify with Ai Dashboard**
- **Customizable RGB Matrix**

## Repository Structure

- `src/Kicad/` - Kicad PCB sources
- `src/Fusion 360/` - Fusion 360 CAD sources
- `src/Blender/` - Blender Render sources
- `production/PCB/` - PCB fabrication files (Gerbers, BOM, positions)
- `production/CAD/` - 3D-printable files (.3mf)
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

| Item                   | Designator               | Footprint                             | Quantity |
|------------------------|--------------------------|---------------------------------------|----------|
| RaspberryPi_Pico       | A1                       | RaspberryPi_Pico                      | 1        |
| 1N4148                 | D1-D84                   | D_SOD-123                             | 84       |
| SK6812                 | DL1-DL83                 | SK6812MINI-E                          | 83       |
| RotaryEncoder          | EN1                      | RotaryEncoder_EC11E-Switch_Vertical   | 1        |
| oled Disply            | J1                       | OLED_0.91_128x32                      | 1        |
| Key Switches           | SW1-SW84                 | MX100H                                | 84       |
| Keycaps                | SW1-SW84                 | MX200H                                | 2        |
| Kailh Hot-Swap Sockets | SW1-SW84                 | Kailh Hot-Swap Sockets (CPG151101S11) | 84       |
| Stabilizers            | 8                        |                                       |          |
| Full Case              | inc. bottom, Top & plate | 1                                     |          |
| PCB                    | 1                        |                                       |          |
| M3 heat Insert         | 4                        |                                       |          |
| M3 Screw H-20mm        | 4                        |                                       |          |


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
