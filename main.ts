function ALARM_NUM () {
    basic.showNumber(COUNTDOWN)
    if (0 < TIME) {
        led.plotBarGraph(
        COUNTDOWN,
        TIME
        )
    }
}
function FLASH () {
    music.playMelody("E D C D E E E - ", 120)
    music.playMelody("D D D E G G - - ", 120)
    music.playMelody("E D C D E E E - ", 120)
    music.playMelody("E D D E D C C C ", 120)
    while (COUNTDOWN == 0) {
        basic.showIcon(IconNames.Ghost)
        basic.pause(500)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.pause(500)
    }
}
input.onButtonPressed(Button.A, function () {
    if (MODE == 0) {
        START_ALARM()
    } else if (MODE == 1) {
        basic.showNumber(Math.trunc(gatorEnvironment.getMeasurement(measurementType.degreesF)))
        basic.showString("F ")
        basic.showNumber(gatorUV.UV())
        basic.showString("UV ")
        basic.showNumber(gatorParticle.color(LEDToRead.Infrared))
        basic.showString("IR")
    } else if (MODE == 2) {
        basic.showNumber(gatorParticle.heartbeat(HeartbeatType.BPM))
        basic.showString("BPM")
    } else {
    	
    }
})
input.onButtonPressed(Button.AB, function () {
    MODE = (MODE + 1) % 3
    WHICH_MODE()
    if (MODE == 0) {
        if (ALARM_ON) {
            ALARM_NUM()
        }
    } else if (MODE == 1) {
        gatorEnvironment.beginEnvironment()
        gatorUV.begin()
        gatorParticle.begin()
    } else if (MODE == 2) {
        gatorParticle.begin()
    } else {
    	
    }
})
input.onButtonPressed(Button.B, function () {
    if (MODE == 0) {
        if (ALARM_ON) {
            ALARM_NUM()
        }
    } else if (MODE == 1) {
        basic.showNumber(Math.trunc(gatorEnvironment.getMeasurement(measurementType.humidity)))
        basic.showString("%H ")
        basic.showNumber(Math.trunc(0.001 * gatorEnvironment.getMeasurement(measurementType.pressure)))
        basic.showString("hPa ")
    } else if (MODE == 2) {
        basic.showNumber(gatorParticle.color(LEDToRead.Red))
        basic.showString("O2")
    } else {
    	
    }
})
function WHICH_MODE () {
    if (MODE == 0) {
        basic.showIcon(IconNames.Diamond)
    } else if (MODE == 1) {
        basic.showIcon(IconNames.Umbrella)
    } else if (MODE == 2) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showString("ERROR")
    }
}
function START_ALARM () {
    music.playMelody("C D E F G - - - ", 400)
    TIME = 120
    COUNTDOWN = TIME
    ALARM_ON = true
}
let ALARM_ON = false
let TIME = 0
let COUNTDOWN = 0
let MODE = 0
MODE = 0
WHICH_MODE()
basic.forever(function () {
    if (ALARM_ON) {
        while (COUNTDOWN != 0) {
            if (MODE == 0) {
                led.plotBarGraph(
                COUNTDOWN,
                TIME
                )
            }
            basic.pause(60000)
            COUNTDOWN += -1
        }
        ALARM_ON = false
        FLASH()
    }
})
