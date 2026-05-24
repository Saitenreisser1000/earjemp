import {Howl} from 'howler'
import howlMp3 from '@/assets/sounds/newAudio.mp3'
import soundSprite from '@/assets/sounds/newAudio.json'

let sharedSounds = null
let sharedSoundLoadPromise = null
let sharedSoundLoadTimeoutId = null
let sharedSoundLoadRetries = 0
const maxSoundLoadRetries = 1
let sharedResolveSoundLoad = null
let sharedRejectSoundLoad = null

export default {
    data(){
        return{
            sounds : sharedSounds || (sharedSounds = new Howl({
                "src": [
                    howlMp3
                ],
                preload: true,
                buffer: true,
                "sprite": soundSprite.sprite
            })),
        }
    },

    mounted() {
        this.ensureSoundsLoaded(false).catch(() => {})
    },

    methods: {
        ensureSoundsLoaded(isWarmup = false) {
            if (this.sounds.state() === 'loaded') {
                return Promise.resolve()
            }

            if (sharedSoundLoadPromise) {
                return sharedSoundLoadPromise
            }

            this.$emit('setSoundStatus', isWarmup ? this.$t('app.soundPreparing') : this.$t('app.soundLoading'))
            this.$emit('setSoundLoaded', true)

            sharedSoundLoadPromise = new Promise((resolve, reject) => {
                sharedResolveSoundLoad = resolve
                sharedRejectSoundLoad = reject
            })

            sharedSoundLoadTimeoutId = setTimeout(() => {
                this.handleSoundLoadFailure(new Error('sound load timeout'))
            }, 12000)

            this.sounds.once('load', () => {
                this.handleSoundLoaded()
            })
            this.sounds.once('loaderror', (_id, error) => {
                this.handleSoundLoadFailure(error)
            })
            this.sounds.load()
            return sharedSoundLoadPromise
        },

        handleSoundLoaded() {
            if (sharedSoundLoadTimeoutId) {
                clearTimeout(sharedSoundLoadTimeoutId)
                sharedSoundLoadTimeoutId = null
            }
            sharedSoundLoadRetries = 0
            this.$emit('setSoundStatus', this.$t('app.soundReady'))
            this.$emit('setSoundLoaded', false)

            if (sharedResolveSoundLoad) {
                sharedResolveSoundLoad()
            }

            sharedSoundLoadPromise = null
            sharedResolveSoundLoad = null
            sharedRejectSoundLoad = null
        },

        handleSoundLoadFailure(error) {
            if (sharedSoundLoadTimeoutId) {
                clearTimeout(sharedSoundLoadTimeoutId)
                sharedSoundLoadTimeoutId = null
            }

            if (sharedSoundLoadRetries < maxSoundLoadRetries) {
                sharedSoundLoadRetries += 1
                this.$emit('setSoundStatus', this.$t('app.soundSlow'))
                sharedSoundLoadTimeoutId = setTimeout(() => {
                    this.handleSoundLoadFailure(new Error('sound load timeout'))
                }, 12000)
                this.sounds.load()
                return
            }

            this.$emit('setSoundStatus', this.$t('app.soundFailed'))
            this.$emit('setSoundLoaded', false)

            if (sharedRejectSoundLoad) {
                sharedRejectSoundLoad(error)
            }

            sharedSoundLoadPromise = null
            sharedResolveSoundLoad = null
            sharedRejectSoundLoad = null
        },

        playAudio(tone) {
            this.ensureSoundsLoaded().then(() => {
                let t = this.sounds.play(tone);
                this.sounds.fade(1, 0, 1200, t)
                if(this.playSecond) this.playSecond()
            }).catch(() => {})
        },

        playAgain(){
            if (this.firstTone === '') {
                this.playRandom()
            } else {
                this.playTones()
            }
        }
    }
}
