fx_version "cerulean"

author "Ezekiel"
description "Simple Notification, Text UI, Progress Bar Script All in One"
version '1.0.0'
repository 'https://github.com/JLE225/ez_hud'

lua54 'yes'

games {
  "gta5",
  "rdr3"
}

ui_page 'web/build/index.html'

client_script {
  'client/main_notif.lua',
  'client/main_progbar.lua',
  'client/main_textui.lua',
}

exports {
  'notify',
  'progress',
  'circleProgress',
  'textui',
  'hideTextUI'
}

files {
	'web/build/index.html',
	'web/build/**/*',
}