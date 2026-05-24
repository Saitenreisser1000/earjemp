import { reactive } from 'vue'

const STORAGE_KEY = 'earjemp-locale'

export const LOCALES = [
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' }
]

export const messages = {
    en: {
        app: {
            menu: 'Menu',
            language: 'Language',
            orientationTitle: 'Please rotate to portrait',
            orientationText: 'earJEMP is optimized for portrait mode.',
            soundLoad: 'sound load',
            soundLoading: 'loading sounds...',
            soundPreparing: 'preparing sounds...',
            soundReady: 'sounds ready',
            soundSlow: 'sound load slow, retrying...',
            soundFailed: 'sound load failed, tap play to retry'
        },
        nav: {
            intervals: 'Intervals',
            chords: 'Chords',
            inversions: 'Inversions',
            scales: 'Scales',
            melody: 'Melody (beta)',
            about: 'About',
            legal: 'Imprint'
        },
        common: {
            easy: 'easy',
            advanced: 'advanced',
            expert: 'expert',
            options: 'options',
            autoplay: 'autoplay',
            resultDisplay: 'result display',
            firstToneOffset: '1st Tone Offset',
            up: 'up',
            down: 'down',
            next: 'next',
            check: 'check',
            undo: 'undo',
            clear: 'clear',
            showFirstNote: 'show 1st note',
            selectMelodyLength: 'Select Melody Length',
            selectIntervals: 'Select Intervals',
            selectChords: 'Select Chords',
            selectInversions: 'Select Inversions',
            selectScales: 'Select Scales'
        },
        intro: {
            intervals: 'Train your musical ear by listening to intervals and choosing what you hear.',
            chords: 'Train your musical ear by listening to chords and choosing their quality.',
            inversions: 'Train your musical ear by listening to major and minor triad inversions.',
            scales: 'Train your musical ear by listening to scales and choosing the scale type.',
            melody: 'Train your musical ear by listening to short melodies and entering the notes you hear.'
        },
        about: {
            title: 'about',
            p1: 'This software was designed to train musical listening skills.',
            p2: 'The app is still in development.',
            p3: 'earJEMP is optimized for mobile devices in portrait mode.'
        },
        legal: {
            title: 'Imprint / Disclosure',
            ownerLabel: 'Media owner',
            owner: 'Stefan Leutgeb',
            contactLabel: 'Contact',
            websiteLabel: 'Website',
            directionLabel: 'Basic direction',
            direction: 'This website presents private software for training musical listening skills. The app is still in development.'
        },
        feedback: {
            chooseInversion: 'choose at least one inversion',
            chooseScale: 'choose at least one scale',
            chooseChord: 'choose at least one chord'
        },
        inversions: {
            majorRoot: 'major root',
            majorFirst: 'major 1st inv.',
            majorSecond: 'major 2nd inv.',
            minorRoot: 'minor root',
            minorFirst: 'minor 1st inv.',
            minorSecond: 'minor 2nd inv.'
        },
        chords: {
            minor: 'minor',
            major: 'major',
            diminished: 'diminished',
            augmented: 'augmented'
        },
        scales: {
            ionian: 'major/ionian',
            dorian: 'dorian',
            phrygian: 'phrygian',
            lydian: 'lydian',
            mixolydian: 'mixolydian',
            aeolian: 'natural-minor',
            locrian: 'locrian',
            melodicMinor: 'melodic-minor',
            harmonicMinor: 'harmonic-minor'
        }
    },
    de: {
        app: {
            menu: 'Menü',
            language: 'Sprache',
            orientationTitle: 'Bitte auf Hochformat drehen',
            orientationText: 'earJEMP ist im Portrait-Modus optimiert.',
            soundLoad: 'Sounds laden',
            soundLoading: 'Sounds werden geladen...',
            soundPreparing: 'Sounds werden vorbereitet...',
            soundReady: 'Sounds bereit',
            soundSlow: 'Sound-Laden langsam, erneuter Versuch...',
            soundFailed: 'Sounds konnten nicht geladen werden, tippe auf Play'
        },
        nav: {
            intervals: 'Intervalle',
            chords: 'Akkorde',
            inversions: 'Umkehrungen',
            scales: 'Tonleitern',
            melody: 'Melodie (Beta)',
            about: 'Über',
            legal: 'Impressum'
        },
        common: {
            easy: 'leicht',
            advanced: 'mittel',
            expert: 'schwer',
            options: 'Optionen',
            autoplay: 'Autoplay',
            resultDisplay: 'Anzeige Ergebnis',
            firstToneOffset: '1. Ton absetzen',
            up: 'auf',
            down: 'ab',
            next: 'weiter',
            check: 'prüfen',
            undo: 'zurück',
            clear: 'löschen',
            showFirstNote: '1. Note anzeigen',
            selectMelodyLength: 'Melodielänge wählen',
            selectIntervals: 'Intervalle wählen',
            selectChords: 'Akkorde wählen',
            selectInversions: 'Umkehrungen wählen',
            selectScales: 'Tonleitern wählen'
        },
        intro: {
            intervals: 'Trainiere dein musikalisches Gehör, indem du Intervalle hörst und erkennst.',
            chords: 'Trainiere dein musikalisches Gehör, indem du Akkorde hörst und ihre Qualität erkennst.',
            inversions: 'Trainiere dein musikalisches Gehör mit Dur- und Moll-Dreiklängen in ihren Umkehrungen.',
            scales: 'Trainiere dein musikalisches Gehör, indem du Tonleitern hörst und ihren Typ erkennst.',
            melody: 'Trainiere dein musikalisches Gehör, indem du kurze Melodien hörst und die Töne eingibst.'
        },
        about: {
            title: 'über',
            p1: 'Diese Software wurde zum Training musikalischer Hörfähigkeiten konzipiert.',
            p2: 'Die App befindet sich noch in Entwicklung.',
            p3: 'earJEMP ist für mobile Geräte im Portraitmodus optimiert.'
        },
        legal: {
            title: 'Impressum / Offenlegung',
            ownerLabel: 'Medieninhaber',
            owner: 'Stefan Leutgeb',
            contactLabel: 'Kontakt',
            websiteLabel: 'Website',
            directionLabel: 'Grundlegende Richtung',
            direction: 'Diese Website stellt eine private Software zum Training musikalischer Hörfähigkeiten vor. Die App befindet sich in Entwicklung.'
        },
        feedback: {
            chooseInversion: 'wähle mindestens eine Umkehrung',
            chooseScale: 'wähle mindestens eine Tonleiter',
            chooseChord: 'wähle mindestens einen Akkord'
        },
        inversions: {
            majorRoot: 'Dur Grundstellung',
            majorFirst: 'Dur 6',
            majorSecond: 'Dur 4 6',
            minorRoot: 'Moll Grundstellung',
            minorFirst: 'Moll 6',
            minorSecond: 'Moll 4 6'
        },
        chords: {
            minor: 'Moll',
            major: 'Dur',
            diminished: 'Vermindert',
            augmented: 'Übermäßig'
        },
        scales: {
            ionian: 'Ionisch/Dur',
            dorian: 'Dorisch',
            phrygian: 'Phrygisch',
            lydian: 'Lydisch',
            mixolydian: 'Mixolydisch',
            aeolian: 'Aeolisch/Moll',
            locrian: 'Lokrisch',
            melodicMinor: 'Melodisch-Moll',
            harmonicMinor: 'Harmonisch-Moll'
        }
    }
}

export const i18nState = reactive({
    locale: messages[localStorage.getItem(STORAGE_KEY)] ? localStorage.getItem(STORAGE_KEY) : 'en'
})

function resolveMessage(locale, key) {
    return key.split('.').reduce((current, part) => current && current[part], messages[locale])
}

export function setLocale(locale) {
    if (!messages[locale]) return
    i18nState.locale = locale
    localStorage.setItem(STORAGE_KEY, locale)
}

export function translate(key) {
    return resolveMessage(i18nState.locale, key) || resolveMessage('en', key) || key
}

export function installI18n(app) {
    app.config.globalProperties.$t = translate
}
