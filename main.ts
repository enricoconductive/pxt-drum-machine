/**
 * Drum Machine Extension for MakeCode Arcade
 * Create and play drum patterns with a visual grid interface
 */

//% weight=100 color=#e63022 icon="\uf001" block="Drum Machine"
//% groups=['Patterns', 'Playback', 'Sounds']
namespace drumMachine {

    // Drum voices
    export enum DrumVoice {
        //% block="kick"
        Kick = 0,
        //% block="snare"
        Snare = 1,
        //% block="hi-hat"
        HiHat = 2
    }

    // Default sound settings (frequency in Hz, duration in ms)
    let kickFreq = 60;
    let kickDuration = 150;
    let snareFreq = 200;
    let snareDuration = 100;
    let hihatFreq = 10000;
    let hihatDuration = 50;

    // Currently playing pattern (for stop functionality)
    let isPlaying = false;

    /**
     * Create an empty drum pattern
     */
    //% block="create drum pattern"
    //% blockId=drumMachine_createPattern
    //% weight=100
    //% blockSetVariable=myPattern
    //% group="Patterns"
    export function createDrumPattern(): number[] {
        // 12 values: 3 drums × 4 steps, all off initially
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    /**
     * Set a drum hit in the pattern
     * @param pattern the drum pattern
     * @param voice which drum
     * @param step which step (1-4)
     * @param on whether the drum is on or off
     */
    //% block="in $pattern set $voice at step $step to $on"
    //% pattern.shadow=variables_get
    //% pattern.defl=myPattern
    //% step.min=1 step.max=4 step.defl=1
    //% on.shadow=toggleOnOff
    //% on.defl=true
    //% weight=95
    //% group="Patterns"
    export function setDrumHit(pattern: number[], voice: DrumVoice, step: number, on: boolean): void {
        const index = voice * 4 + (step - 1);
        pattern[index] = on ? 1 : 0;
    }

    /**
     * Get whether a drum is active at a step
     * @param pattern the drum pattern
     * @param voice which drum
     * @param step which step (1-4)
     */
    //% block="in $pattern get $voice at step $step"
    //% pattern.shadow=variables_get
    //% pattern.defl=myPattern
    //% step.min=1 step.max=4 step.defl=1
    //% weight=94
    //% group="Patterns"
    //% advanced=true
    export function getDrumHit(pattern: number[], voice: DrumVoice, step: number): boolean {
        const index = voice * 4 + (step - 1);
        return pattern[index] === 1;
    }

    /**
     * Play a drum pattern at the specified tempo
     * @param pattern the drum pattern to play
     * @param bpm tempo in beats per minute, eg: 120
     */
    //% block="play drum pattern $pattern at $bpm BPM||loop $loop"
    //% bpm.min=60 bpm.max=200 bpm.defl=120
    //% loop.defl=false
    //% weight=90
    //% group="Playback"
    //% pattern.shadow=variables_get
    //% pattern.defl=myPattern
    export function playDrumPattern(pattern: number[], bpm: number, loop: boolean = false): void {
        isPlaying = true;

        // Calculate step duration in milliseconds
        // Each step is a 16th note, so 4 steps = 1 beat
        const beatDuration = 60000 / bpm;
        const stepDuration = beatDuration / 4;

        do {
            // Play through all 4 steps
            for (let step = 0; step < 4; step++) {
                if (!isPlaying) break;

                // Check each voice at this step
                // Pattern layout: [kick0,kick1,kick2,kick3, snare0,snare1,snare2,snare3, hihat0,hihat1,hihat2,hihat3]
                if (pattern[DrumVoice.Kick * 4 + step]) {  // Kick
                    music.playTone(kickFreq, kickDuration);
                }
                if (pattern[DrumVoice.Snare * 4 + step]) {  // Snare
                    music.playTone(snareFreq, snareDuration);
                }
                if (pattern[DrumVoice.HiHat * 4 + step]) {  // Hi-hat
                    music.playTone(hihatFreq, hihatDuration);
                }

                // Wait for next step
                pause(stepDuration);
            }
        } while (loop && isPlaying);

        isPlaying = false;
    }

    /**
     * Stop the currently playing drum pattern
     */
    //% block="stop drum pattern"
    //% weight=80
    //% group="Playback"
    export function stopDrumPattern(): void {
        isPlaying = false;
    }

    /**
     * Set the sound for the kick drum
     * @param frequency frequency in Hz, eg: 60
     * @param duration duration in ms, eg: 150
     */
    //% block="set kick sound to frequency $frequency Hz duration $duration ms"
    //% frequency.min=20 frequency.max=500 frequency.defl=60
    //% duration.min=10 duration.max=500 duration.defl=150
    //% weight=70
    //% group="Sounds"
    //% advanced=true
    export function setKickSound(frequency: number, duration: number): void {
        kickFreq = frequency;
        kickDuration = duration;
    }

    /**
     * Set the sound for the snare drum
     * @param frequency frequency in Hz, eg: 200
     * @param duration duration in ms, eg: 100
     */
    //% block="set snare sound to frequency $frequency Hz duration $duration ms"
    //% frequency.min=100 frequency.max=1000 frequency.defl=200
    //% duration.min=10 duration.max=500 duration.defl=100
    //% weight=60
    //% group="Sounds"
    //% advanced=true
    export function setSnareSound(frequency: number, duration: number): void {
        snareFreq = frequency;
        snareDuration = duration;
    }

    /**
     * Set the sound for the hi-hat
     * @param frequency frequency in Hz, eg: 10000
     * @param duration duration in ms, eg: 50
     */
    //% block="set hi-hat sound to frequency $frequency Hz duration $duration ms"
    //% frequency.min=5000 frequency.max=15000 frequency.defl=10000
    //% duration.min=10 duration.max=500 duration.defl=50
    //% weight=50
    //% group="Sounds"
    //% advanced=true
    export function setHiHatSound(frequency: number, duration: number): void {
        hihatFreq = frequency;
        hihatDuration = duration;
    }

    /**
     * Use 808 drum machine sound preset
     */
    //% block="use 808 drum sounds"
    //% weight=40
    //% group="Sounds"
    export function use808Sounds(): void {
        kickFreq = 50;
        kickDuration = 200;
        snareFreq = 180;
        snareDuration = 150;
        hihatFreq = 12000;
        hihatDuration = 40;
    }

    /**
     * Use 909 drum machine sound preset
     */
    //% block="use 909 drum sounds"
    //% weight=39
    //% group="Sounds"
    export function use909Sounds(): void {
        kickFreq = 65;
        kickDuration = 180;
        snareFreq = 220;
        snareDuration = 120;
        hihatFreq = 11000;
        hihatDuration = 45;
    }

    /**
     * Use acoustic drum sound preset
     */
    //% block="use acoustic drum sounds"
    //% weight=38
    //% group="Sounds"
    export function useAcousticSounds(): void {
        kickFreq = 80;
        kickDuration = 160;
        snareFreq = 250;
        snareDuration = 110;
        hihatFreq = 9000;
        hihatDuration = 55;
    }

    /**
     * Play a single drum sound for testing
     * @param voice which drum to play
     */
    //% block="play $voice drum sound"
    //% weight=30
    //% group="Sounds"
    export function playDrumSound(voice: DrumVoice): void {
        switch (voice) {
            case DrumVoice.Kick:
                music.playTone(kickFreq, kickDuration);
                break;
            case DrumVoice.Snare:
                music.playTone(snareFreq, snareDuration);
                break;
            case DrumVoice.HiHat:
                music.playTone(hihatFreq, hihatDuration);
                break;
        }
    }
}
