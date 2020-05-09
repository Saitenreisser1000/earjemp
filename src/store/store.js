import Vue from 'vue'
import Vuex from 'vuex'
import { Player } from '@/store/player'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        player: new Player(),

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

        toneID:
            [
                {id:0,  tone: 'E1' },
                {id:1,  tone: 'F1' },
                {id:2,  tone: 'Gb1' , accidental: ['F1', 'G1']},
                {id:3,  tone: 'G1' },
                {id:4,  tone: 'Ab1' , accidental: ['G1', 'A1']},
                {id:5,  tone: 'A1' },
                {id:6,  tone: 'Bb1' , accidental: ['A1', 'B1']},
                {id:7,  tone: 'B1' },
                {id:8,  tone: 'C2' },
                {id:9,  tone: 'Db2' , accidental: ['C2', 'D2']},
                {id:10, tone: 'D2' },
                {id:11, tone: 'Eb2' , accidental: ['D2', 'E2']},
                {id:12, tone: 'E2' },
                {id:13, tone: 'F2' },
                {id:14, tone: 'Gb2' , accidental: ['F2', 'G2']},
                {id:15, tone: 'G2' },
                {id:16, tone: 'Ab2' , accidental: ['G2', 'A2']},
                {id:17, tone: 'A2' },
                {id:18, tone: 'Bb2' , accidental: ['A2', 'B2']},
                {id:19, tone: 'B2' },
                {id:20, tone: 'C3' },
                {id:21, tone: 'Db3' , accidental: ['C3', 'D3']},
                {id:22, tone: 'D3' },
                {id:23, tone: 'Eb3' , accidental: ['D3', 'E3']},
                {id:24, tone: 'E3' },
                {id:25, tone: 'F3' },
                {id:26, tone: 'Gb3' , accidental: ['F3', 'G3']},
                {id:27, tone: 'G3' },
                {id:28, tone: 'Ab3' , accidental: ['G3', 'A3']},
                {id:29, tone: 'A3' },
                {id:30, tone: 'Bb3' , accidental: ['A3', 'B3']},
                {id:31, tone: 'B3' },
                {id:32, tone: 'C4' },
                {id:33, tone: 'Db4' , accidental: ['C4', 'D4']},
                {id:34, tone: 'D4' },
                {id:35, tone: 'Eb4' , accidental: ['D4', 'E4']},
                {id:36, tone: 'E4' },
                {id:37, tone: 'F4' },
                {id:38, tone: 'Gb4' , accidental: ['F4', 'G4']},
                {id:39, tone: 'G4' },
                {id:40, tone: 'Ab4' , accidental: ['G4', 'A4']},
                {id:41, tone: 'A4' },
                {id:42, tone: 'Bb4' , accidental: ['A4', 'B4']},
                {id:43, tone: 'B4' },
                {id:44, tone: 'C5' },
            ],
        playedInterval: '',
        selectedIntervals: [],
        response: '',

        firstTone: '',
        secondTone: '',

        randEnharmonic: '',
        hasPlayed: false,

        reducedIncListTone: '',
        reducedDecListTone: '',
        randomInterval: '',

        activatedOrders: '',
        randomOrder: '',

        randomAccidental: 0,
        toneDelay: 500
    },

    mutations: {
        setSelectIntervals(state, intervals){
            state.selectedIntervals = intervals
            //state.selectedIntervals = state.selectedIntervals.sort((a,b) => a.value - b.value)
        },

        setOrder(state, order){
              this.activatedOrders = order
        },

        setGuess(state, interval){

            if(interval === state.playedInterval){
                state.response = true//'right, well done!';
                store.dispatch('playNextInterval');
            }
            else{
                state.response = false//'sorry, it is: '+ state.intervalNames[state.playedInterval] + ' try again!';
            }
        },

        playNextInterval(state){
            if(state.hasPlayed) {
                state.firstTone = '';
                state.secondTone = '';
            }

            state.randomAccidental = Math.floor(Math.random() * Math.floor(2));

            this.randomOrder = this.activatedOrders[0];
            if(this.activatedOrders.length > 1){
                let rand = randomRangeInt({min: 0, max: this.activatedOrders.length});
                this.randomOrder = this.activatedOrders[rand]
            }

            //create Interval
            this.randomInterval = randomRangeInt({min: 0, max: state.selectedIntervals.length});
            this.randomInterval = state.selectedIntervals[this.randomInterval];

            state.playedInterval = this.randomInterval.value;
            this.reducedIncListTone = randomRangeInt({min: 0, max: state.toneID.length-this.randomInterval.value});
            this.reducedDecListTone = randomRangeInt({min: this.randomInterval.value, max: state.toneID.length});

            function randomRangeInt(range){
                let min = Math.ceil(range.min);
                let max = Math.floor(range.max);
                return Math.floor(Math.random() * (max - min)) + min;
            }

            store.dispatch('playIntervals');
        },

        playAgain(state){

            if(!state.hasPlayed){
                store.dispatch('playNextInterval');
            }
            else{
                store.dispatch('playIntervals');
            }
        },

        playIntervals(state){
            if (this.randomOrder === 'simultaneous') {

                state.firstTone = state.toneID[this.reducedIncListTone];
                state.player.samplerPlay(state.firstTone.tone);

                state.secondTone = state.toneID[this.reducedIncListTone + this.randomInterval.value];
                state.player.samplerPlay(state.secondTone.tone);

            } else if (this.randomOrder === 'decrease') {

                state.firstTone = state.toneID[this.reducedDecListTone];
                state.player.samplerPlay(state.firstTone.tone);

                let second = this.reducedDecListTone - this.randomInterval.value;

                setTimeout(() => {
                    state.secondTone = state.toneID[second];
                    state.player.samplerPlay(state.secondTone.tone)
                }, state.toneDelay)

            } else {

                state.firstTone = state.toneID[this.reducedIncListTone];
                state.player.samplerPlay(state.firstTone.tone);

                let second = this.reducedIncListTone + this.randomInterval.value;
                setTimeout(() => {
                    state.secondTone = state.toneID[second];
                    state.player.samplerPlay(state.secondTone.tone)
                }, state.toneDelay)
            }

            //at least one time
            state.hasPlayed = true;
        },


    },

    actions: {
        setSelectIntervals: ({commit}, intervals) => {commit('setSelectIntervals', intervals)},
        setOrder:({commit}, order) => {commit('setOrder', order)},

        playIntervals: ({commit}) => {commit('playIntervals'); },
        playAgain:({commit}) => {commit('playAgain')},
        playNextInterval:({commit}) => {commit('playNextInterval')},
        setGuess: ({commit}, interval) => {commit('setGuess', interval)},
        setDelay: ({commit}, delay) => {commit('setDelay', delay)}
    },

    getters: {
        getAllTones: (state) => {return state.toneID },

        getOrder: (state) => {return state.randomOrder},

        getFirstTone: (state) => {return state.firstTone},

        getSecondTone: (state) => {return state.secondTone},

        getIntervalNames: (state) => {return state.intervalNames},

        getPlayedInterval: (state) => {return state.response},

        getSelectIntervals: (state) => {return state.selectedIntervals},

        getRandomAcc: (state) => {return state.randomAccidental},

        getDelay: (state) => {return state.toneDelay},

        getResponse:(state) => {return state.response}
    }
});
