# EZ_HUD

Simple FiveM hud that has some features used for your FiveM server

- Notification
- TextUI
- Progressbar

## Installation

- https://github.com/JLE225/ez_hud/releases/tag/1.0.0
- ensure ez_hud to your config.cfg server config

## Usage
Notification
```bash
ez.notify(type, title, message)
ez.notify({
    type,
    title,
    message,
    duration,
    position, // top-right, top-left, bottom-right, bottom-left
    icon, // FontAwesome6 icon
    iconColor
})

```

TextUI
```bash
ez.textui(keybind, message)
ez.textui({
    keybind,
    text,
    position, // right, left
    icon, // FontAwesome6 icon
    iconColor,
    iconAnimation,
    style
})

ez.hideTextUI()
```

ProgressBar
```bash
ez.progress({
    duration,
    label,
    useWhileDead,
    allowCuffed,
    canCancel,
    anim = {
        dict,
        clip
    },
    prop = {
        model,
        pos,
        rot
    },
    disable = {
        move,
        car,
        combat,
        mouse,
        sprint
    }
})

ez.circleProgress({
    duration,
    label,
    useWhileDead,
    allowCuffed,
    canCancel,
    anim = {
        dict,
        clip
    },
    prop = {
        model,
        pos,
        rot
    },
    disable = {
        move,
        car,
        combat,
        mouse,
        sprint
    }
})

Cancel keybind "X" you can change it on "client/main_progbar.lua" line 146 & 226
https://docs.fivem.net/docs/game-references/controls/
```
