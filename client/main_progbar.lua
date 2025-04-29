local ez = {}

local activeProgress = nil
local activeCircleProgress = nil

local function loadAnimDict(dict)
    if not HasAnimDictLoaded(dict) then
        RequestAnimDict(dict)
        while not HasAnimDictLoaded(dict) do
            Citizen.Wait(5)
        end
    end
end

local function startAnimation(anim, prop)
    local ped = PlayerPedId()
    
    if anim then
        loadAnimDict(anim.dict)
        TaskPlayAnim(ped, anim.dict, anim.clip, 1.0, -1.0, -1, 50, 0, false, false, false)
    end
    
    if prop then
        local model = type(prop.model) == 'string' and GetHashKey(prop.model) or prop.model
        RequestModel(model)
        while not HasModelLoaded(model) do
            Citizen.Wait(5)
        end
        
        local pCoords = GetOffsetFromEntityInWorldCoords(ped, prop.pos.x, prop.pos.y, prop.pos.z)
        local propObj = CreateObject(model, pCoords.x, pCoords.y, pCoords.z, true, true, true)
        
        AttachEntityToEntity(propObj, ped, GetPedBoneIndex(ped, 28422), 
            prop.pos.x, prop.pos.y, prop.pos.z, 
            prop.rot.x, prop.rot.y, prop.rot.z, 
            true, true, false, true, 1, true)
        
        return propObj
    end
    
    return nil
end

local function stopAnimation(anim, propObj)
    local ped = PlayerPedId()
    
    if anim then
        StopAnimTask(ped, anim.dict, anim.clip, 1.0)
    end
    
    if propObj and DoesEntityExist(propObj) then
        DeleteObject(propObj)
    end
end

local function checkRestrictions(data)
    if data.useWhileDead == false and IsPlayerDead(PlayerId()) then
        return false, "player is dead"
    end
    
    if data.allowCuffed == false and IsPedCuffed(PlayerPedId()) then
        return false, "player is cuffed"
    end
    
    return true
end

local function handleDisableControls(disable)
    if not disable then return end
    
    local ped = PlayerPedId()
    
    -- Disable movement
    if disable.move then
        DisableControlAction(0, 30, true) -- MoveLeftRight
        DisableControlAction(0, 31, true) -- MoveUpDown
    end
    
    -- Disable car actions
    if disable.car then
        DisableControlAction(0, 63, true) -- TurnLeftRight (vehicle)
        DisableControlAction(0, 64, true) -- MoveLeftRight (vehicle)
    end
    
    -- Disable combat
    if disable.combat then
        DisablePlayerFiring(ped, true)
        DisableControlAction(0, 24, true) -- Attack
        DisableControlAction(0, 25, true) -- Aim
    end
    
    -- Disable mouse
    if disable.mouse then
        DisableControlAction(0, 1, true) -- LookLeftRight
        DisableControlAction(0, 2, true) -- LookUpDown
    end
    
    -- Disable sprint
    if disable.sprint then
        DisableControlAction(0, 21, true) -- Sprint
    end
end

function ez.progress(data)
    if activeProgress then
        return false
    end

    local allowed, reason = checkRestrictions(data)
    if not allowed then
        return false
    end

    local duration = data.duration
    local label = data.label
    local canCancel = data.canCancel or false
    local anim = data.anim
    local prop = data.prop
    local disable = data.disable or {}

    activeProgress = true

    local propObj = startAnimation(anim, prop)

    SendNUIMessage({
        action = "progress",
        data = {
            label = label,
            duration = duration,
            canCancel = canCancel
        }
    })

    local completed = false
    local cancelled = false

    Citizen.CreateThread(function()
        local startTime = GetGameTimer()
        
        while GetGameTimer() - startTime < duration and activeProgress do
            Citizen.Wait(0)
            
            handleDisableControls(disable)
            
            if canCancel and IsControlJustPressed(0, 73) then
                SendNUIMessage({
                    action = "progressCancel"
                })
                activeProgress = nil
                completed = true
                cancelled = true
                break
            end
            
            if not checkRestrictions(data) then
                SendNUIMessage({
                    action = "progressCancel"
                })
                activeProgress = nil
                completed = true
                cancelled = true
                break
            end
        end
        
        if activeProgress and not cancelled then
            completed = true
            activeProgress = nil
        end
        
        stopAnimation(anim, propObj)
        
        if disable then
        end
    end)

    while activeProgress do
        Citizen.Wait(0)
    end

    return not cancelled
end

function ez.circleProgress(data)
    if activeCircleProgress then
        return false
    end

    local allowed, reason = checkRestrictions(data)
    if not allowed then
        return false
    end

    local duration = data.duration
    local label = data.label or "Processing"
    local canCancel = data.canCancel or false
    local anim = data.anim
    local prop = data.prop
    local disable = data.disable or {}

    activeCircleProgress = true

    local propObj = startAnimation(anim, prop)

    SendNUIMessage({
        action = "circleProgress",
        data = {
            label = label,
            duration = duration
        }
    })

    local completed = false
    local cancelled = false

    Citizen.CreateThread(function()
        local startTime = GetGameTimer()
        
        while GetGameTimer() - startTime < duration and activeCircleProgress do
            Citizen.Wait(0)
            
            handleDisableControls(disable)
            
            if canCancel and IsControlJustPressed(0, 73) then
                SendNUIMessage({
                    action = "circleProgressCancel"
                })
                activeCircleProgress = nil
                completed = true
                cancelled = true
                break
            end
            
            if not checkRestrictions(data) then
                SendNUIMessage({
                    action = "circleProgressCancel"
                })
                activeCircleProgress = nil
                completed = true
                cancelled = true
                break
            end
        end
        
        if activeCircleProgress and not cancelled then
            completed = true
            activeCircleProgress = nil
        end
        
        stopAnimation(anim, propObj)
    end)

    while activeCircleProgress do
        Citizen.Wait(0)
    end

    return not cancelled
end

exports('progress', ez.progress)
exports('circleProgress', ez.circleProgress)
_G.ez = ez