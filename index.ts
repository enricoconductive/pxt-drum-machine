/**
 * Drum Pattern Editor - Main Application
 *
 * This editor allows users to create drum patterns with a visual grid interface.
 * It communicates with MakeCode via postMessage API.
 */

interface DrumPattern {
    hihat: number[]
    snare: number[]
    kick: number[]
}

interface MakeCodeMessage {
    type: string
    id?: string
    value?: string
}

// SVG icons for drums
const ICONS = {
    hihat: `<svg viewBox="0 0 24 24" fill="currentColor">
        <ellipse cx="12" cy="8" rx="8" ry="2" opacity="0.3"/>
        <ellipse cx="12" cy="12" rx="8" ry="2"/>
        <line x1="12" y1="12" x2="12" y2="20" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    snare: `<svg viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="4" width="12" height="14" rx="1"/>
        <line x1="8" y1="6" x2="16" y2="6" stroke="#2e3440" stroke-width="1"/>
        <line x1="8" y1="9" x2="16" y2="9" stroke="#2e3440" stroke-width="1"/>
        <line x1="8" y1="12" x2="16" y2="12" stroke="#2e3440" stroke-width="1"/>
        <line x1="8" y1="15" x2="16" y2="15" stroke="#2e3440" stroke-width="1"/>
        <line x1="4" y1="20" x2="8" y2="18" stroke="currentColor" stroke-width="2"/>
        <line x1="20" y1="20" x2="16" y2="18" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    kick: `<svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="6" fill="#2e3440"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
    </svg>`
}

class DrumPatternEditor {
    private pattern: DrumPattern
    private fieldId: string | null = null

    constructor() {
        this.pattern = {
            hihat: new Array(16).fill(0),
            snare: new Array(16).fill(0),
            kick: new Array(16).fill(0)
        }

        this.init()
        this.setupMessageListener()
    }

    private init() {
        this.renderStepNumbers()
        this.renderGrid()
        this.setupControls()
    }

    private renderStepNumbers() {
        const container = document.getElementById('stepNumbers')!

        const label = document.createElement('div')
        label.className = 'drum-label'
        container.appendChild(label)

        const stepsContainer = document.createElement('div')
        stepsContainer.className = 'steps-container'

        for (let group = 0; group < 4; group++) {
            const stepGroup = document.createElement('div')
            stepGroup.className = 'step-group'

            for (let i = 0; i < 4; i++) {
                const stepNum = group * 4 + i + 1
                const stepNumber = document.createElement('div')
                stepNumber.className = 'step-number'
                stepNumber.textContent = stepNum.toString()
                stepGroup.appendChild(stepNumber)
            }

            stepsContainer.appendChild(stepGroup)
        }

        container.appendChild(stepsContainer)
    }

    private renderGrid() {
        const container = document.getElementById('gridContainer')!
        container.innerHTML = ''

        const voices: Array<keyof DrumPattern> = ['hihat', 'snare', 'kick']
        const labels = {
            hihat: 'Hi-Hat',
            snare: 'Snare',
            kick: 'Kick'
        }

        voices.forEach(voice => {
            const row = document.createElement('div')
            row.className = 'drum-row'

            // Label
            const label = document.createElement('div')
            label.className = 'drum-label'
            label.innerHTML = `${ICONS[voice]}<span>${labels[voice]}</span>`
            row.appendChild(label)

            // Steps container
            const stepsContainer = document.createElement('div')
            stepsContainer.className = 'steps-container'

            // Create 4 groups of 4 steps
            for (let group = 0; group < 4; group++) {
                const stepGroup = document.createElement('div')
                stepGroup.className = 'step-group'

                for (let i = 0; i < 4; i++) {
                    const stepIndex = group * 4 + i
                    const button = this.createStepButton(voice, stepIndex)
                    stepGroup.appendChild(button)
                }

                stepsContainer.appendChild(stepGroup)
            }

            row.appendChild(stepsContainer)
            container.appendChild(row)
        })
    }

    private createStepButton(voice: keyof DrumPattern, step: number): HTMLButtonElement {
        const button = document.createElement('button')
        button.className = `step-button ${voice}`
        button.innerHTML = ICONS[voice]

        if (this.pattern[voice][step]) {
            button.classList.add('active')
        }

        button.addEventListener('click', () => {
            this.toggleStep(voice, step)
            button.classList.toggle('active')
        })

        return button
    }

    private toggleStep(voice: keyof DrumPattern, step: number) {
        this.pattern[voice][step] = this.pattern[voice][step] ? 0 : 1
    }

    private setupControls() {
        document.getElementById('clearBtn')!.addEventListener('click', () => {
            this.clearPattern()
        })

        document.getElementById('previewBtn')!.addEventListener('click', () => {
            this.previewPattern()
        })

        document.getElementById('doneBtn')!.addEventListener('click', () => {
            this.sendPatternToMakeCode()
        })
    }

    private clearPattern() {
        this.pattern = {
            hihat: new Array(16).fill(0),
            snare: new Array(16).fill(0),
            kick: new Array(16).fill(0)
        }
        this.renderGrid()
    }

    private previewPattern() {
        // Send preview message to MakeCode (if supported)
        console.log('Preview pattern:', this.pattern)
        alert('Preview feature: This would play the pattern in MakeCode. Pattern logged to console.')
    }

    private sendPatternToMakeCode() {
        const patternJSON = JSON.stringify(this.pattern)

        if (this.fieldId) {
            window.parent.postMessage({
                type: 'pxteditor',
                action: 'set-field-value',
                fieldId: this.fieldId,
                value: patternJSON
            }, '*')
        }

        console.log('Pattern sent to MakeCode:', patternJSON)
    }

    private setupMessageListener() {
        window.addEventListener('message', (event) => {
            const message: MakeCodeMessage = event.data

            if (message.type === 'pxteditor') {
                // Handle messages from MakeCode
                if (message.id) {
                    this.fieldId = message.id
                }

                if (message.value) {
                    try {
                        this.pattern = JSON.parse(message.value)
                        this.renderGrid()
                    } catch (e) {
                        console.error('Failed to parse pattern:', e)
                    }
                }
            }
        })

        // Notify MakeCode that editor is ready
        window.parent.postMessage({
            type: 'pxteditor',
            action: 'ready'
        }, '*')
    }
}

// Initialize the editor when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DrumPatternEditor()
    })
} else {
    new DrumPatternEditor()
}
