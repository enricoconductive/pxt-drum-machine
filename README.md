# Drum Machine Extension for MakeCode Arcade

A visual drum machine extension that brings rhythm programming to MakeCode Arcade! Perfect for kids and beginners to create beats with an easy-to-use clickable grid interface.

## Features

- 🎵 **Visual Grid Interface** - Click squares to toggle drum hits on/off (like micro:bit LED matrix)
- 🥁 **3 Drum Voices** - Kick, Snare, and Hi-hat
- 🎹 **4-Step Sequencer** - Create simple rhythmic patterns
- ⚡ **Adjustable Tempo** - 60-200 BPM
- 🔊 **Sound Presets** - 808, 909, and Acoustic drum sounds
- 🎨 **Customizable Sounds** - Adjust frequency and duration for each drum

## Usage

### Basic Example

```blocks
// Create a simple beat pattern
let myBeat = drumMachine.createDrumPattern(`
. . . .
. # . #
# . # .
`)

// Play it at 120 BPM
drumMachine.playDrumPattern(myBeat, 120)
```

### Creating Patterns

The visual grid editor has 3 rows and 4 columns:
- **Top row** = Hi-hat
- **Middle row** = Snare
- **Bottom row** = Kick drum

Click on squares in the grid to turn drum hits on (filled) or off (empty).

### Looping Patterns

```blocks
// Loop the pattern continuously
let beat = drumMachine.createDrumPattern(`...`)
drumMachine.playDrumPattern(beat, 140, true)

// Stop when needed
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    drumMachine.stopDrumPattern()
})
```

### Sound Presets

```blocks
// Try different classic drum machine sounds
drumMachine.use808Sounds()
drumMachine.use909Sounds()
drumMachine.useAcousticSounds()
```

### Custom Sounds

```blocks
// Make your kick drum deeper
drumMachine.setKickSound(50, 200)

// Make your hi-hat crisper
drumMachine.setHiHatSound(12000, 40)
```

### Test Individual Drums

```blocks
// Test each drum sound
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    drumMachine.playDrumSound(DrumVoice.Kick)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    drumMachine.playDrumSound(DrumVoice.Snare)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    drumMachine.playDrumSound(DrumVoice.HiHat)
})
```

## Complete Example - Interactive Drum Machine Game

```blocks
let pattern1 = drumMachine.createDrumPattern(`
# . # .
. # . #
# . . #
`)

let pattern2 = drumMachine.createDrumPattern(`
# # # #
. . . .
# . # .
`)

let currentBPM = 120

drumMachine.use808Sounds()

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    drumMachine.playDrumPattern(pattern1, currentBPM, true)
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    drumMachine.playDrumPattern(pattern2, currentBPM, true)
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    currentBPM += 10
    game.splash("BPM: " + currentBPM)
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    currentBPM -= 10
    game.splash("BPM: " + currentBPM)
})

controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    drumMachine.stopDrumPattern()
})
```

## How to Use This Extension

1. Open [MakeCode Arcade](https://arcade.makecode.com/)
2. Create a new project
3. Click on **Extensions** (under the gear menu)
4. Enter this repository URL: `https://github.com/enricoconductive/pxt-drum-machine`
5. Click to import the extension
6. Find the **Drum Machine** category in the block toolbox!

## Understanding the Grid

The drum pattern grid works like this:

```
Row 0 (Top):    [Hi-hat] [Hi-hat] [Hi-hat] [Hi-hat]
Row 1 (Middle): [Snare]  [Snare]  [Snare]  [Snare]
Row 2 (Bottom): [Kick]   [Kick]   [Kick]   [Kick]
                Step 1   Step 2   Step 3   Step 4
```

Each column represents a step in the pattern. When you play the pattern, it goes through steps 1-2-3-4 in order.

## Tips for Kids

- 🎵 Start simple! Try turning on just the kick drum on steps 1 and 3
- 🥁 Classic rock beat: Kick on 1 and 3, snare on 2 and 4
- 🎶 Add hi-hats on every step for energy
- ⚡ Experiment with different BPM speeds - slower for hip-hop, faster for dance
- 🔊 Try the 808 preset for electronic music vibes!

## Future Enhancements

- 8 or 16-step patterns
- More drum voices (toms, cymbals, claps)
- Save/load patterns
- Pattern chaining
- Visual feedback during playback

## License

MIT

## Contributing

This extension is for PXT/arcade. Contributions welcome!

---

**Made with ❤️ for young musicians and coders**
