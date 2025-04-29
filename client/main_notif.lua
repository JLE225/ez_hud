local ez = {}

local knownTypes = {
    info = true,
    success = true,
    error = true,
    transaction = true,
}

function ez.notify(...)
    local args = ...
    local notifyType, title, message, duration, position, icon, iconColor

    if type(args) == "table" then
        notifyType = args.type or "info"
        title = args.title or ""
        message = args.message or ""
        duration = type(args.duration) == "number" and args.duration
        position = args.position
        icon = args.icon
        iconColor = args.iconColor
    else
        local a, b, c, d, e, f, g = ...
        if type(a) == "string" and not knownTypes[a] then
            notifyType = "info"
            title = a
            message = b
            duration = type(c) == "number" and c
            position = d
            icon = e
            iconColor = f
        else
            notifyType = a or "info"
            title = b
            message = c
            duration = type(d) == "number" and d
            position = e
            icon = f
            iconColor = g
        end
    end

    SendNUIMessage({
        action = "notify",
        data = {
            id = math.random(1000, 9999),
            type = notifyType,
            title = title,
            message = message,
            duration = duration,
            position = position,
            icon = icon,
            iconColor = iconColor
        }
    })
end

exports('notify', ez.notify)
_G.ez = ez