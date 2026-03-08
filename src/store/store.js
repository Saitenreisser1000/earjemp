import { createStore } from 'vuex'
import { TONE_CHAIN } from '@/domain/music/toneChain'

export const store = createStore({
    state: {

        intervalNames: [
            'perfect unison | reine Prim',
            'minor 2 | kleine Sekund',
            'major 2 | große Sekund',
            'minor 3 | kleine Terz',
            'major 3 | große Terz',
            'perfect 4 | reine Quart',
            'dim 5 | verminderte Quint',
            'perfect 5 | reine Quint',
            'minor 6 | kleine Sext',
            'major 6 | große Sext',
            'minor 7 | kleine Septim',
            'major 7 | große Septim',
            'perfect 8 | reine Oktave',
            'minor 9 | kleine None',
            'major 9 | große None'
        ],

        toneChain: TONE_CHAIN,

        intervalDirection: '',
        firstTone: '',
        secondTone: '',

        selectedIntervals: [],
        selectedChords: [],
        selectedScales: []

    },

    mutations: {

        setSelectIntervals(state, intervals) {
            state.selectedIntervals = intervals
        },

        setIntervalDirection(state, direction) {
            state.intervalDirection = direction
        },

        setSelectedChords(state, chords) {
            state.selectedChords = chords
        },

        setSelectedScales(state, scales) {
            state.selectedScales = scales
        }
    },

    actions: {
        setSelectedIntervals: ({commit}, intervals) => {
            commit('setSelectIntervals', intervals)
        },
        setIntervalDirection: ({commit}, payload) => {
            commit('setIntervalDirection', payload)
        },
        setSelectedChords: ({commit}, payload) => {
            commit('setSelectedChords', payload)
        },
        setSelectedScales: ({commit}, payload) => {
            commit('setSelectedScales', payload)
        }
    },

    getters: {
        getToneChain: (state) => {
            return state.toneChain
        },
        getSelectedIntervals: (state) => {
            return state.selectedIntervals
        },
        getSelectedChords: (state) => {
            return state.selectedChords
        },
        getSelectedScales: (state) => {
            return state.selectedScales
        },

    }
});
