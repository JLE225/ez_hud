local ez = {}

local knownPositions = {
    left = true,
    right = true,
}

function ez.textui(...)
    local args = ...
    local keybind, text, position, icon, iconColor, iconAnimation, style

    if type(args) == "table" then
        keybind = args.keybind or ""
        text = args.text or ""
        position = args.position or "right"
        icon = args.icon
        iconColor = args.iconColor
        iconAnimation = args.iconAnimation
        style = args.style
    else
        local a, b, c, d, e, f, g = ...
        if type(a) == "string" and type(b) == "string" then
            keybind = a
            text = b
            position = c or "right"
            icon = d
            iconColor = e
            iconAnimation = f
            style = g
        else
            keybind = a or ""
            text = b or ""
            position = c or "right"
            icon = d
            iconColor = e
            iconAnimation = f
            style = g
        end
    end

    if not knownPositions[position] then
        position = "right"
    end

    SendNUIMessage({
        action = "textUi",
        data = {
            keybind = keybind,
            text = text,
            position = position,
            icon = icon,
            iconColor = iconColor,
            iconAnimation = iconAnimation,
            style = style
        }
    })
end

function ez.hideTextUI()
    SendNUIMessage({
        action = "textUiHide"
    })
end

exports('textui', ez.textui)
exports('hideTextUI', ez.hideTextUI)
_G.ez = ez