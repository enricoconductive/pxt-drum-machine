# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **MakeCode Arcade extension** (PXT) that provides a drum machine for creating and playing rhythmic patterns. It's designed for kids and beginners learning to code music.

## Architecture

### MakeCode Extension Structure

- **main.ts** - Single TypeScript file containing all extension blocks and logic
- **pxt.json** - Extension metadata and configuration for MakeCode
- **README.md** - User-facing documentation with block examples

### Key Components in main.ts

1. **drumMachine namespace** - All blocks are exported functions within this namespace
2. **Block annotations** - Special `//% ` comments define how blocks appear in MakeCode:
   - `//% block="..."` - Block label
   - `//% weight=N` - Block ordering (higher = appears first)
   - `//% group="GroupName"` - Organizes blocks into categories
   - `//% param.shadow=...` - Default shadow blocks for parameters
   - `//% param.defl=...` - Default parameter values
   - `//% advanced=true` - Hides block in "Advanced" section

3. **Data Model**:
   - Patterns are `number[]` arrays of length 12 (3 drums × 4 steps)
   - Array layout: `[kick0-3, snare0-3, hihat0-3]`
   - Values: 0 = off, 1 = on

4. **Sound Synthesis**:
   - Uses `music.playTone(frequency, duration)` from Arcade's built-in music API
   - Each drum has configurable frequency (Hz) and duration (ms)
   - Presets: 808, 909, Acoustic (classic drum machine sounds)

## Development Workflow

### Testing Changes

1. **Push to GitHub**: All changes must be committed and pushed
   ```bash
   git add .
   git commit -m "Description"
   git push
   ```

2. **Import in MakeCode Arcade**:
   - Go to https://arcade.makecode.com/
   - Extensions → Enter URL: `https://github.com/enricoconductive/pxt-drum-machine`
   - MakeCode pulls directly from GitHub main branch

3. **Refresh Extension** (after updates):
   - Remove extension from project
   - Re-import from URL
   - Or hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

### Common Issues

- **Block annotations not appearing**: Check `//% ` comment syntax (note the space after `%`)
- **Type errors in MakeCode**: MakeCode's TypeScript is strict - ensure parameter types match
- **Blocks not in correct order**: Adjust `weight` values (higher weight = appears first)
- **Cache issues**: MakeCode aggressively caches extensions - remove and re-import to force reload

## Important Constraints

### MakeCode/PXT Limitations

1. **No custom field editors without framework code**:
   - `imageLiteral` field editor only works on micro:bit (LED matrix hardware)
   - Custom grid UIs require fieldeditors.ts and compiled JavaScript (not supported in simple extensions)
   - Use standard field editors: `toggleOnOff`, `variables_get`, dropdowns

2. **Blocks API only**:
   - All user-facing functionality must be exported functions with block annotations
   - Cannot use complex TypeScript features (classes with inheritance, generics, etc.)
   - Must use types supported by MakeCode: number, string, boolean, enums, simple arrays

3. **Target audience: Kids**:
   - Keep blocks simple and visual (use `toggleOnOff` for booleans)
   - Use `blockSetVariable` to auto-create variables
   - Provide sound presets instead of making kids set frequencies

## Pattern Storage Design

**Current (v0.1)**: Array-based patterns
- Simple: `number[]` with 12 elements
- Easy to pass between blocks
- No visual grid editor (kids use toggle blocks)

**Future consideration**: If custom grid editor is needed, would require:
- Custom fieldeditors.ts with grid UI implementation
- Bundle.js compilation
- Much more complex - only consider if absolutely necessary

## Block Organization

Blocks are grouped into 3 categories:
- **Patterns**: Create patterns and set drum hits
- **Playback**: Play/stop patterns with tempo control
- **Sounds**: Presets and custom sound parameters (in Advanced section)

Use `//% group="Patterns"` to assign blocks to groups.
