import Vue from 'vue'
import Vuex from 'vuex'
import { Player } from '@/store/player'
// eslint-disable-next-line no-unused-vars
import Tone from 'tone'

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
                {id:0, tone: 'E1' ,yPos:293,  isActive: false},
                {id:1, tone: 'F1' ,yPos:282,  isActive: false},
                {id:2, tone: 'Gb1',alt: [{yPos:282, add:'shrp', isActive: false},{yPos:271, add:'b',  isActive: false}]},
                {id:3, tone: 'G1' ,yPos:271,  isActive: false},
                {id:4, tone: 'Ab1',alt: [{yPos:271, add:'shrp', isActive: false},{yPos:260, add:'b',  isActive: false}]},
                {id:5, tone: 'A1' ,yPos:260,  isActive: false},
                {id:6, tone: 'Bb1',alt: [{yPos:260, add:'shrp', isActive: false},{yPos:249, add:'b',  isActive: false}]},
                {id:7, tone: 'B1' ,yPos:249,  isActive: false},
                {id:8, tone: 'C2' ,yPos:238,  isActive: false},
                {id:9, tone: 'Db2',alt: [{yPos:238, add:'shrp', isActive: false},{yPos:227, add:'b',  isActive: false}]},
                {id:10, tone: 'D2' ,yPos:227, isActive: false},
                {id:11, tone: 'Eb2',alt: [{yPos:227, add:'shrp', isActive: false},{yPos:216, add:'b',  isActive: false}]},
                {id:12, tone: 'E2' ,yPos:216, isActive: false},
                {id:13, tone: 'F2' ,yPos:205, isActive: false},
                {id:14, tone: 'Gb2',alt: [{yPos:205, add:'shrp', isActive: false},{yPos:194, add:'b',  isActive: false}]},
                {id:15, tone: 'G2' ,yPos:194, isActive: false},
                {id:16, tone: 'Ab2',alt: [{yPos:194, add:'shrp', isActive: false},{yPos:183, add:'b',  isActive: false}]},
                {id:17, tone: 'A2' ,yPos:183, isActive: false},
                {id:18, tone: 'Bb2',alt: [{yPos:183, add:'shrp', isActive: false},{yPos:172, add:'b',  isActive: false}]},
                {id:19, tone: 'B2' ,yPos:172, isActive: false},
                {id:20, tone: 'C3' ,yPos:161, isActive: false},
                {id:21, tone: 'Db3',alt: [{yPos:161, add:'shrp', isActive: false},{yPos:150, add:'b',  isActive: false}]},
                {id:22, tone: 'D3' ,yPos:150, isActive: false},
                {id:23, tone: 'Eb3',alt: [{yPos:150, add:'shrp', isActive: false},{yPos:139, add:'b',  isActive: false}]},
                {id:24, tone: 'E3' ,yPos:139, isActive: false},
                {id:25, tone: 'F3' ,yPos:128, isActive: false},
                {id:26, tone: 'Gb3',alt: [{yPos:128, add:'shrp', isActive: false},{yPos:117, add:'b',  isActive: false}]},
                {id:27, tone: 'G3' ,yPos:117, isActive: false},
                {id:28, tone: 'Ab3',alt: [{yPos:117, add:'shrp', isActive: false},{yPos:106, add:'b',  isActive: false}]},
                {id:29, tone: 'A3' ,yPos:106, isActive: false},
                {id:30, tone: 'Bb3',alt: [{yPos:106, add:'shrp', isActive: false},{yPos:95, add:'b',  isActive: false}]},
                {id:31, tone: 'B3' ,yPos:95,  isActive: false},
                {id:32, tone: 'C4' ,yPos:84,  isActive: false},
                {id:33, tone: 'Db4',alt: [{yPos:84, add:'shrp', isActive: false},{yPos:73, add:'b',  isActive: false}]},
                {id:34, tone: 'D4' ,yPos:73,  isActive: false},
                {id:35, tone: 'Eb4',alt: [{yPos:73, add:'shrp', isActive: false},{yPos:62, add:'b',  isActive: false}]},
                {id:36, tone: 'E4' ,yPos:62,  isActive: false},
                {id:37, tone: 'F4' ,yPos:51,  isActive: false},
                {id:38, tone: 'Gb4',alt: [{yPos:51, add:'shrp', isActive: false},{yPos:40, add:'b',  isActive: false}]},
                {id:39, tone: 'G4' ,yPos:40,  isActive: false},
                {id:40, tone: 'Ab4',alt: [{yPos:40, add:'shrp', isActive: false},{yPos:29, add:'b',  isActive: false}]},
                {id:41, tone: 'A4' ,yPos:29,  isActive: false},
                {id:42, tone: 'Bb4',alt: [{yPos:29, add:'shrp', isActive: false},{yPos:18, add:'b',  isActive: false}]},
                {id:43, tone: 'B4' ,yPos:18,  isActive: false},
                {id:44, tone: 'C5' ,yPos:7,   isActive: false},
            ],
        playedInterval: '',
        playedTones: [],
        selectedIntervals: [],
        response: '',
        playOrder: [],

        firstTone: '',
        secondTone: '',
        randEnharmonic: '',
        hasPlayed: false

    },

    mutations: {
        setSelectIntervals(state, intervals){
            state.selectedIntervals = intervals

        },

        setGuess(state, interval){

            if(interval === state.playedInterval){
                state.response ='right, well done!';
                console.log('yes')
            }
            else{
                state.response = 'sorry, it is: '+ state.intervalNames[state.playedInterval];
                console.log('no')
            }
        },

        // eslint-disable-next-line no-unused-vars
        playAgain(state){
            console.log('playagain')
        },

        playIntervals(state, order){
            store.dispatch('playAgain');
            //reset
            if(state.hasPlayed) {
                state.firstTone.isActive = false;
                state.secondTone.isActive = false;
            }

            let randomOrder = order[0];
            if(order.length > 1){
                let rand = randomRangeInt({min: 0, max: order.length});
                randomOrder = order[rand]
            }

            //create Interval
            let randomInterval = randomRangeInt({min: 0, max: state.selectedIntervals.length});   //intervalNr from selected interals.length
            randomInterval = state.selectedIntervals[randomInterval];                                   //intervalNr -> actual value of seleced Interval

            state.playedInterval = randomInterval.value;
            let reducedIncListTone = randomRangeInt({min: 0, max: state.toneID.length-randomInterval.value});
            let reducedDecListTone = randomRangeInt({min: randomInterval.value, max: state.toneID.length});

            /******************play section **********************/

            if (randomOrder === 'simultaneous') {
                state.player.samplerPlay(state.toneID[reducedIncListTone].tone);
                state.player.samplerPlay(state.toneID[reducedIncListTone + randomInterval.value].tone);

            } else if (randomOrder === 'decrease') {

                state.player.samplerPlay(state.toneID[reducedDecListTone].tone);
                Tone.Transport.scheduleOnce(function () {
                    state.player.samplerPlay(state.toneID[reducedDecListTone - randomInterval.value].tone)
                }, "0:1");
                Tone.Transport.start();
                Tone.Transport.seconds = 0

            } else {
                state.firstTone = state.toneID[reducedIncListTone];
                state.firstTone.isActive = true;
                if(state.firstTone.alt){
                    state.firstTone.alt[0].isActive = true
                }
                state.player.samplerPlay(state.firstTone.tone);

                Tone.Transport.scheduleOnce(function () {
                    state.secondTone = state.toneID[reducedIncListTone + randomInterval.value];
                    state.secondTone.isActive = true;
                    if(state.secondTone.alt){
                        state.secondTone.alt[0].isActive = true
                    }
                    state.player.samplerPlay(state.secondTone.tone);

                }, "0:1");
                Tone.Transport.start();
                Tone.Transport.seconds = 0


            }

            //at least one time
            state.hasPlayed = true;

            function randomRangeInt(range){
                let min = Math.ceil(range.min);
                let max = Math.floor(range.max);
                return Math.floor(Math.random() * (max - min)) + min;
            }
        },
    },

    actions: {
        setSelectIntervals: ({commit}, intervals) => {commit('setSelectIntervals', intervals)},

        playIntervals: ({commit}, order) => {commit('playIntervals', order); },
        playAgain:({commit}) => {commit('playAgain')},
        setGuess: ({commit}, interval) => {commit('setGuess', interval)},
    },

    getters: {
        getAllTones: (state) => {return state.toneID },
        getPlayedTone: (state) => {return state.playedTone},

        getFirstTone: (state) => {return {firstTone: state.firstTone, enharmonic: state.randEnharmonic}},
        getSecondTone: (state) => {return state.secondTone},

        getIntervalNames: (state) => {return state.intervalNames},
        getPlayedInterval: (state) => {return state.response},
        getAllPlayedTones: (state) => {return state.playedTones},
        getSelectIntervals: (state) => {return state.selectedIntervals}
    }
});
