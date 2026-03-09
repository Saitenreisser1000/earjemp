<template>
  <div class="staff-frame" :class="feedbackClass">
    <div class="staff-scroll">
      <div ref="staffRoot" class="staff-renderer" :style="staffRendererStyle"></div>
      <div v-if="showNextZone" class="next-position-zone" :style="nextZoneStyle"></div>
      <div v-if="showNextMarker" class="next-position-arrow" :style="nextMarkerStyle">
        <v-icon size="18">mdi-arrow-down-bold</v-icon>
      </div>
    </div>
    <v-icon v-if="feedbackState === 'success'" class="feedback-icon success">mdi-check-circle</v-icon>
    <v-icon v-if="feedbackState === 'error'" class="feedback-icon error">mdi-close-circle</v-icon>
  </div>
</template>

<script>
import { Factory } from 'vexflow'

const CLEF_BOUNDS = {
  treble: { bottom: 30, top: 38 }, // E4..F5
  bass: { bottom: 18, top: 26 }    // G2..A3
}

const LAYOUT_CANDIDATES = [
  { clef: 'treble', clefOctave: '' },
  { clef: 'treble', clefOctave: '8vb' },
  { clef: 'treble', clefOctave: '8va' },
  { clef: 'bass', clefOctave: '' },
  { clef: 'bass', clefOctave: '8vb' },
  { clef: 'bass', clefOctave: '8va' }
]

export default {
  name: 'StaffRenderer',
  emits: ['slot-positions'],
  data() {
    return {
      renderWidth: 320,
      renderedSlotXs: []
    }
  },
  props: {
    notes: {
      type: Array,
      default: () => []
    },
    clef: {
      type: String,
      default: 'treble'
    },
    mode: {
      type: String,
      default: 'melody' // melody | chord
    },
    clefOctave: {
      type: String,
      default: ''
    },
    octaveOffset: {
      type: Number,
      default: 1
    },
    optimizeLayout: {
      type: Boolean,
      default: true
    },
    comparisonNotes: {
      type: Array,
      default: () => []
    },
    mismatchIndices: {
      type: Array,
      default: () => []
    },
    correctIndices: {
      type: Array,
      default: () => []
    },
    showPositionNumbers: {
      type: Boolean,
      default: false
    },
    positionNumberStates: {
      type: Array,
      default: () => []
    },
    positionNumberCount: {
      type: Number,
      default: 0
    },
    strikeMismatchNotes: {
      type: Boolean,
      default: false
    },
    showInsertMarker: {
      type: Boolean,
      default: false
    },
    insertIndex: {
      type: Number,
      default: -1
    },
    insertCount: {
      type: Number,
      default: 0
    },
    previewNote: {
      type: String,
      default: ''
    },
    feedbackState: {
      type: String,
      default: 'neutral'
    }
  },
  mounted() {
    this.renderStaff()
  },
  watch: {
    notes: {
      deep: true,
      handler() {
        this.renderStaff()
      }
    },
    clef() {
      this.renderStaff()
    },
    mode() {
      this.renderStaff()
    },
    clefOctave() {
      this.renderStaff()
    },
    octaveOffset() {
      this.renderStaff()
    },
    comparisonNotes: {
      deep: true,
      handler() {
        this.renderStaff()
      }
    },
    mismatchIndices: {
      deep: true,
      handler() {
        this.renderStaff()
      }
    },
    previewNote() {
      this.renderStaff()
    }
  },
  methods: {
    drawMismatchStrikes(vf, noteObjects, mismatchIndices) {
      if (!this.strikeMismatchNotes) return
      if (!vf || !Array.isArray(noteObjects) || !Array.isArray(mismatchIndices)) return
      const ctx = vf.getContext()
      if (!ctx) return

      ctx.save()
      ctx.setStrokeStyle('rgba(0,0,0,0.95)')
      ctx.setLineWidth(2)
      for (const i of mismatchIndices) {
        const note = noteObjects[i]
        if (!note || typeof note.getYs !== 'function') continue
        const ys = note.getYs()
        if (!ys || !ys.length) continue
        const y = ys[0]
        const x1 = typeof note.getNoteHeadBeginX === 'function'
          ? note.getNoteHeadBeginX() - 1
          : (typeof note.getAbsoluteX === 'function' ? note.getAbsoluteX() + 2 : 0)
        const x2 = typeof note.getNoteHeadEndX === 'function'
          ? note.getNoteHeadEndX() + 1
          : x1 + 12
        if (!Number.isFinite(x1) || !Number.isFinite(x2) || !Number.isFinite(y)) continue
        ctx.beginPath()
        ctx.moveTo(x1, y + 5)
        ctx.lineTo(x2, y - 5)
        ctx.moveTo(x1, y - 5)
        ctx.lineTo(x2, y + 5)
        ctx.stroke()
      }
      ctx.restore()
    },
    drawCorrectChecks(vf, noteObjects, correctIndices) {
      if (!Array.isArray(noteObjects) || !Array.isArray(correctIndices)) return
      if (!correctIndices.length) return
      const ctx = vf?.getContext?.()
      if (!ctx) return

      ctx.save()
      ctx.setStrokeStyle('rgba(46,125,50,0.98)')
      ctx.setLineWidth(2)
      for (const i of correctIndices) {
        const note = noteObjects[i]
        if (!note || typeof note.getYs !== 'function') continue
        const ys = note.getYs()
        if (!ys || !ys.length) continue
        const y = ys[0]
        const xBase = typeof note.getNoteHeadEndX === 'function'
          ? note.getNoteHeadEndX() + 4
          : (typeof note.getAbsoluteX === 'function' ? note.getAbsoluteX() + 12 : 0)
        if (!Number.isFinite(xBase) || !Number.isFinite(y)) continue

        ctx.beginPath()
        ctx.moveTo(xBase, y + 1)
        ctx.lineTo(xBase + 3, y + 4)
        ctx.lineTo(xBase + 9, y - 4)
        ctx.stroke()
      }
      ctx.restore()
    },
    drawPositionNumbers(vf, noteObjects) {
      if (!this.showPositionNumbers) return
      if (!vf || !Array.isArray(noteObjects) || !noteObjects.length) return
      const ctx = vf.getContext()
      if (!ctx) return

      const count = this.positionNumberCount > 0
        ? Math.min(this.positionNumberCount, noteObjects.length)
        : noteObjects.length
      const y = 14
      ctx.save()
      ctx.setFont('600 12px Arial, sans-serif')
      for (let i = 0; i < count; i++) {
        const note = noteObjects[i]
        if (!note || typeof note.getAbsoluteX !== 'function') continue
        const x = note.getAbsoluteX() + 2
        if (!Number.isFinite(x)) continue
        const state = this.positionNumberStates[i]
        const color = state === 'correct'
          ? 'rgba(46,125,50,0.98)'
          : state === 'wrong'
            ? 'rgba(198,40,40,0.98)'
            : 'rgba(0,0,0,0.86)'
        ctx.setFillStyle(color)
        ctx.fillText(String(i + 1), x, y)
      }
      ctx.restore()
    },
    parseNote(noteName) {
      const match = /^([A-Ga-g])([#bxs]{1,2}|bb|##)?(\d)$/.exec(noteName || '')
      if (!match) return null
      return {
        letter: match[1].toLowerCase(),
        accidental: (match[2] || '').toLowerCase(),
        octave: Number(match[3])
      }
    },
    toVexflowToken(noteName, octaveOffsetOverride = this.renderedOctaveOffset) {
      const parsed = this.parseNote(noteName)
      if (!parsed) return null

      const letter = parsed.letter
      const rawAccidental = parsed.accidental
      const octave = Math.max(0, Math.min(8, parsed.octave + octaveOffsetOverride))

      let accidental = ''
      if (rawAccidental === '#' || rawAccidental === 's') accidental = '#'
      else if (rawAccidental === '##' || rawAccidental === 'ss' || rawAccidental === 'x') accidental = '##'
      else if (rawAccidental === 'b') accidental = 'b'
      else if (rawAccidental === 'bb') accidental = 'bb'

      return `${letter}${accidental}${String(octave)}`
    },
    diatonicIndex(letter, octave) {
      const map = { c: 0, d: 1, e: 2, f: 3, g: 4, a: 5, b: 6 }
      return octave * 7 + map[letter]
    },
    ledgerLinesForIndex(index, bounds) {
      if (index < bounds.bottom) return Math.floor((bounds.bottom - index) / 2)
      if (index > bounds.top) return Math.floor((index - bounds.top) / 2)
      return 0
    },
    octaveCompensation(clefOctave) {
      if (clefOctave === '8vb') return 1
      if (clefOctave === '8va') return -1
      return 0
    },
    evaluateLayout(layout) {
      const bounds = CLEF_BOUNDS[layout.clef]
      const comp = this.octaveCompensation(layout.clefOctave)
      let maxLedger = 0
      let sumLedger = 0

      for (const name of this.notes) {
        const parsed = this.parseNote(name)
        if (!parsed) continue
        const shownOctave = Math.max(0, Math.min(8, parsed.octave + this.octaveOffset + comp))
        const idx = this.diatonicIndex(parsed.letter, shownOctave)
        const ledgers = this.ledgerLinesForIndex(idx, bounds)
        maxLedger = Math.max(maxLedger, ledgers)
        sumLedger += ledgers
      }

      // Strongly enforce <= 3 ledger lines, then optimize readability.
      const overflowPenalty = Math.max(0, maxLedger - 3) * 100
      const octaveSignPenalty = layout.clefOctave ? 1 : 0
      return overflowPenalty + (maxLedger * 10) + sumLedger + octaveSignPenalty
    },
    chooseBestLayout() {
      let best = LAYOUT_CANDIDATES[0]
      let bestScore = Number.POSITIVE_INFINITY
      for (const candidate of LAYOUT_CANDIDATES) {
        const score = this.evaluateLayout(candidate)
        if (score < bestScore) {
          best = candidate
          bestScore = score
        }
      }
      return best
    },
    placeholderToken() {
      // Keep placeholders inside the stave to avoid visible ledger-line artifacts.
      return this.renderedClef === 'bass' ? 'd3' : 'b4'
    },
    buildMelodySpec(tokens, beats) {
      const spec = []
      const placeholderIndices = []
      const ghost = this.placeholderToken()
      for (let i = 0; i < beats; i++) {
        if (tokens[i]) {
          spec.push(`${tokens[i]}/q`)
        } else {
          // Keep horizontal spacing with an invisible ghost note.
          spec.push(`${ghost}/q`)
          placeholderIndices.push(i)
        }
      }
      return { spec: spec.join(', '), placeholderIndices }
    },
    buildAnchorSpec(beats) {
      const anchor = this.placeholderToken()
      return Array.from({ length: Math.max(1, beats) }, () => `${anchor}/q`).join(', ')
    },
    updateRenderedSlotXs(noteObjects) {
      const xs = []
      for (const note of noteObjects || []) {
        if (note && typeof note.getAbsoluteX === 'function') {
          const x = note.getAbsoluteX()
          if (Number.isFinite(x)) xs.push(x)
        }
      }
      this.renderedSlotXs = xs
      this.$emit('slot-positions', xs)
    },
    renderStaff() {
      const root = this.$refs.staffRoot
      if (!root) return
      const scrollContainer = root.parentElement
      const prevScrollLeft = scrollContainer ? scrollContainer.scrollLeft : 0
      root.innerHTML = ''
      this.renderedSlotXs = []

      const baseWidth = Math.max(300, root.parentElement?.clientWidth || root.clientWidth || 320)
      const noteCountForWidth = Math.max(
        this.notes.length,
        this.comparisonNotes.length,
        this.insertCount,
        this.mode === 'melody' && this.previewNote ? this.notes.length + 1 : this.notes.length
      )
      const extendedWidth = noteCountForWidth > 6 ? 100 + (noteCountForWidth * 52) : baseWidth
      const width = Math.max(baseWidth, extendedWidth)
      this.renderWidth = width
      const vf = new Factory({
        renderer: { elementId: root, width, height: 130 }
      })
      const score = vf.EasyScore()
      const system = vf.System({ x: 10, y: 15, width: width - 20 })

      const parsed = this.notes.map((n) => this.toVexflowToken(n, this.renderedOctaveOffset))
      const parsedComparison = this.comparisonNotes.map((n) => this.toVexflowToken(n, this.renderedOctaveOffset))
      const parsedPreview = this.mode === 'melody'
        ? this.toVexflowToken(this.previewNote, this.renderedOctaveOffset)
        : null

      if (!parsed.length && !parsedPreview && !parsedComparison.length) {
        const stave = system.addStave({ voices: [] })
        if (this.renderedClefOctave) stave.addClef(this.renderedClef, undefined, this.renderedClefOctave)
        else stave.addClef(this.renderedClef)
        vf.draw()
        if (scrollContainer) scrollContainer.scrollLeft = prevScrollLeft
        return
      }

      if (this.mode === 'melody' && parsedComparison.length) {
        const beats = Math.max(parsed.length, parsedComparison.length)
        const mainSpec = this.buildMelodySpec(parsed, beats)
        const comparisonSpec = this.buildMelodySpec(parsedComparison, beats)
        const anchorNotes = score.notes(this.buildAnchorSpec(beats), { clef: this.renderedClef })
        const anchorVoice = score.voice(anchorNotes, { time: `${beats}/4` })
        const mainNotes = score.notes(mainSpec.spec, { clef: this.renderedClef })
        const comparisonVoice = score.voice(
          score.notes(comparisonSpec.spec, { clef: this.renderedClef }),
          { time: `${beats}/4` }
        )
        const mainVoice = score.voice(mainNotes, { time: `${beats}/4` })
        anchorVoice.setStrict(false)
        comparisonVoice.setStrict(false)
        mainVoice.setStrict(false)
        for (const note of anchorNotes) {
          note.setStyle({
            fillStyle: 'rgba(0,0,0,0)',
            strokeStyle: 'rgba(0,0,0,0)'
          })
        }

        for (const i of this.mismatchIndices) {
          if (mainNotes[i] && parsed[i]) {
            mainNotes[i].setStyle({
              fillStyle: 'rgba(198,40,40,1)',
              strokeStyle: 'rgba(198,40,40,1)'
            })
          }
        }
        for (const i of comparisonSpec.placeholderIndices) {
          if (comparisonVoice.getTickables()[i]) {
            comparisonVoice.getTickables()[i].setStyle({
              fillStyle: 'rgba(0,0,0,0)',
              strokeStyle: 'rgba(0,0,0,0)'
            })
          }
        }
        for (const i of mainSpec.placeholderIndices) {
          if (mainNotes[i]) {
            mainNotes[i].setStyle({
              fillStyle: 'rgba(0,0,0,0)',
              strokeStyle: 'rgba(0,0,0,0)'
            })
          }
        }

        const stave = system.addStave({ voices: [anchorVoice, comparisonVoice, mainVoice] })
        if (this.renderedClefOctave) stave.addClef(this.renderedClef, undefined, this.renderedClefOctave)
        else stave.addClef(this.renderedClef)
        vf.draw()
        this.drawMismatchStrikes(vf, mainNotes, this.mismatchIndices)
        this.drawCorrectChecks(vf, mainNotes, this.correctIndices)
        this.drawPositionNumbers(vf, anchorNotes)
        this.updateRenderedSlotXs(anchorNotes)
        if (scrollContainer) scrollContainer.scrollLeft = prevScrollLeft
        return
      }

      const melodyTokens = parsed.slice()
      let previewIndex = -1
      if (this.mode === 'melody' && parsedPreview) {
        previewIndex = Math.max(0, Math.min(
          Math.max(0, (this.insertCount || melodyTokens.length || 1) - 1),
          this.insertIndex >= 0 ? this.insertIndex : melodyTokens.length
        ))
        melodyTokens[previewIndex] = parsedPreview
      }
      const melodyBeats = Math.max(melodyTokens.length, this.insertCount || 0)
      const notesSpec = this.mode === 'chord'
        ? `(${parsed.filter(Boolean).join(' ')})/q`
        : this.buildMelodySpec(melodyTokens, melodyBeats)

      const beats = this.mode === 'chord' ? 1 : melodyBeats
      const notes = score.notes(this.mode === 'chord' ? notesSpec : notesSpec.spec, { clef: this.renderedClef })
      if (this.mode === 'melody') {
        for (const i of this.mismatchIndices || []) {
          if (notes[i] && parsed[i]) {
            notes[i].setStyle({
              fillStyle: 'rgba(198,40,40,1)',
              strokeStyle: 'rgba(198,40,40,1)'
            })
          }
        }
        for (const i of notesSpec.placeholderIndices || []) {
          if (notes[i]) {
            notes[i].setStyle({
              fillStyle: 'rgba(0,0,0,0)',
              strokeStyle: 'rgba(0,0,0,0)'
            })
          }
        }
      }
      if (this.mode === 'melody' && parsedPreview && notes.length > 0 && previewIndex >= 0) {
        notes[previewIndex].setStyle({
          fillStyle: 'rgba(0,0,0,0.5)',
          strokeStyle: 'rgba(0,0,0,0.5)'
        })
      }
      const voice = score.voice(
        notes,
        { time: `${beats}/4` }
      )
      const anchorNotes = this.mode === 'melody'
        ? score.notes(this.buildAnchorSpec(beats), { clef: this.renderedClef })
        : []
      const anchorVoice = this.mode === 'melody'
        ? score.voice(anchorNotes, { time: `${beats}/4` })
        : null
      if (anchorVoice) {
        anchorVoice.setStrict(false)
        for (const note of anchorNotes) {
          note.setStyle({
            fillStyle: 'rgba(0,0,0,0)',
            strokeStyle: 'rgba(0,0,0,0)'
          })
        }
      }
      voice.setStrict(false)
      const staveVoices = anchorVoice ? [anchorVoice, voice] : [voice]
      const stave = system.addStave({ voices: staveVoices })
      if (this.renderedClefOctave) stave.addClef(this.renderedClef, undefined, this.renderedClefOctave)
      else stave.addClef(this.renderedClef)
      vf.draw()
      this.drawMismatchStrikes(vf, notes, this.mismatchIndices)
      this.drawCorrectChecks(vf, notes, this.correctIndices)
      this.drawPositionNumbers(vf, anchorVoice ? anchorNotes : notes)
      this.updateRenderedSlotXs(anchorVoice ? anchorNotes : notes)
      if (scrollContainer) scrollContainer.scrollLeft = prevScrollLeft
    }
  },
  computed: {
    staffRendererStyle() {
      return { width: `${Math.round(this.renderWidth)}px` }
    },
    showNextMarker() {
      if (!this.showInsertMarker) return false
      if (this.insertIndex < 0 || this.insertCount <= 0) return false
      return this.insertIndex < this.insertCount
    },
    showNextZone() {
      return this.showNextMarker
    },
    nextSlotX() {
      let x = null
      if (this.renderedSlotXs.length > 0) {
        const slots = Math.max(1, this.insertCount)
        const idx = Math.max(0, Math.min(slots - 1, this.insertIndex))
        x = this.renderedSlotXs[Math.min(idx, this.renderedSlotXs.length - 1)]
      }
      if (x == null) {
        const width = this.renderWidth || 320
        const leftPadding = 90
        const rightPadding = 22
        const slots = Math.max(1, this.insertCount)
        const usable = Math.max(20, width - leftPadding - rightPadding)
        const clampedIndex = Math.max(0, Math.min(slots - 1, this.insertIndex))
        x = leftPadding + ((clampedIndex + 0.5) * usable) / slots
      }
      return Math.round(x)
    },
    nextMarkerStyle() {
      return {
        left: `${this.nextSlotX}px`,
        transform: 'translateX(-50%)'
      }
    },
    nextZoneStyle() {
      let slotWidth = this.insertCount > 0
        ? Math.max(28, (this.renderWidth - 112) / this.insertCount)
        : 36
      if (this.renderedSlotXs.length >= 2) {
        const idx = Math.max(1, Math.min(this.renderedSlotXs.length - 1, this.insertIndex))
        slotWidth = Math.max(28, Math.abs(this.renderedSlotXs[idx] - this.renderedSlotXs[idx - 1]) * 0.85)
      }
      return {
        left: `${this.nextSlotX}px`,
        width: `${Math.round(slotWidth)}px`,
        transform: 'translateX(-50%)'
      }
    },
    resolvedLayout() {
      if (!this.optimizeLayout) return { clef: this.clef, clefOctave: this.clefOctave }
      return this.chooseBestLayout()
    },
    renderedClef() {
      return this.resolvedLayout.clef
    },
    renderedClefOctave() {
      return this.resolvedLayout.clefOctave
    },
    renderedOctaveOffset() {
      if (this.renderedClefOctave === '8vb') return this.octaveOffset + 1
      if (this.renderedClefOctave === '8va') return this.octaveOffset - 1
      return this.octaveOffset
    },
    feedbackClass() {
      if (this.feedbackState === 'success') return 'is-success'
      if (this.feedbackState === 'error') return 'is-error'
      return 'is-neutral'
    }
  }
}
</script>

<style scoped>
.staff-frame {
  position: relative;
  width: 100%;
  border-radius: 8px;
  padding: 4px 4px 0;
  transition: background-color 120ms ease;
}

.staff-renderer {
  min-width: 100%;
  min-height: 120px;
}

.staff-scroll {
  position: relative;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.next-position-zone {
  position: absolute;
  top: 18px;
  height: 84px;
  border-radius: 8px;
  background: rgba(33, 150, 243, 0.16);
  pointer-events: none;
}

.staff-frame.is-success {
  background: rgba(46, 125, 50, 0.24);
}

.staff-frame.is-error {
  background: rgba(198, 40, 40, 0.24);
}

.staff-frame.is-neutral {
  background: transparent;
}

.feedback-icon {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 20px;
  line-height: 20px;
}

.feedback-icon.success {
  color: #2e7d32;
}

.feedback-icon.error {
  color: #c62828;
}

.next-position-arrow {
  position: absolute;
  top: 4px;
  color: rgba(0, 0, 0, 0.82);
  pointer-events: none;
}

</style>
