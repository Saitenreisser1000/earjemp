import Vue from 'vue'
import Vuex from 'vuex'
import { Player } from '@/store/player'
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
        /*toneID:
            [
                {id:0, tone: 'E1' ,yPos:283},
                {id:1, tone: 'F1' ,yPos:272},
                {id:2, tone: 'Gb1',yPos:261, sign: 'b'},
                {id:3, tone: 'G1' ,yPos:261},
                {id:4, tone: 'Ab1',yPos:250, sign: 'b'},
                {id:5, tone: 'A1' ,yPos:250},
                {id:6, tone: 'Bb1',yPos:239, sign: 'b'},
                {id:7, tone: 'B1' ,yPos:239},
                {id:8, tone: 'C2' ,yPos:228},
                {id:9, tone: 'Db2',yPos:217, sign: 'b'},
                {id:10, tone: 'D2' ,yPos:217},
                {id:11, tone: 'Eb2',yPos:206, sign: 'b'},
                {id:12, tone: 'E2' ,yPos:206},
                {id:13, tone: 'F2' ,yPos:195},
                {id:14, tone: 'Gb2',yPos:184, sign: 'b'},
                {id:15, tone: 'G2' ,yPos:184},
                {id:16, tone: 'Ab2',yPos:173, sign: 'b'},
                {id:17, tone: 'A2' ,yPos:173},
                {id:18, tone: 'Bb2',yPos:162, sign: 'b'},
                {id:19, tone: 'B2' ,yPos:162},
                {id:20, tone: 'C3' ,yPos:151},
                {id:21, tone: 'Db3',yPos:140, sign: 'b'},
                {id:22, tone: 'D3' ,yPos:140},
                {id:23, tone: 'Eb3',yPos:129, sign: 'b'},
                {id:24, tone: 'E3' ,yPos:129},
                {id:25, tone: 'F3' ,yPos:118},
                {id:26, tone: 'Gb3',yPos:107, sign: 'b'},
                {id:27, tone: 'G3' ,yPos:107},
                {id:28, tone: 'Ab3',yPos:96, sign: 'b'},
                {id:29, tone: 'A3' ,yPos:96},
                {id:30, tone: 'Bb3',yPos:85, sign: 'b'},
                {id:31, tone: 'B3' ,yPos:85},
                {id:32, tone: 'C4' ,yPos:74},
                {id:33, tone: 'Db4',yPos:63, sign: 'b'},
                {id:34, tone: 'D4' ,yPos:63},
                {id:35, tone: 'Eb4',yPos:52, sign: 'b'},
                {id:36, tone: 'E4' ,yPos:52},
                {id:37, tone: 'F4' ,yPos:41},
                {id:38, tone: 'Gb4',yPos:30, sign: 'b'},
                {id:39, tone: 'G4' ,yPos:30},
                {id:40, tone: 'Ab4',yPos:19, sign: 'b'},
                {id:41, tone: 'A4' ,yPos:19},
                {id:42, tone: 'Bb4',yPos:8, sign: 'b'},
                {id:43, tone: 'B4' ,yPos:8},
                {id:44, tone: 'C5' ,yPos:-3},
                {id:45, tone: 'Db5',yPos:-14, sign: 'b'},
                {id:46, tone: 'D5' ,yPos:-14},
            ],*/
        toneID:
            [
                {id:0, tone: 'E1' ,yPos:283},
                {id:1, tone: 'F1' ,yPos:272},
                {id:2, tone: 'Gb1',yPos:261, sign: 'b'},
                {id:3, tone: 'G1' ,yPos:261},
                {id:4, tone: 'Ab1',yPos:250, sign: 'b'},
                {id:5, tone: 'A1' ,yPos:250},
                {id:6, tone: 'Bb1',yPos:239, sign: 'b'},
                {id:7, tone: 'B1' ,yPos:239},
                {id:8, tone: 'C2' ,yPos:228},
                {id:9, tone: 'Db2',yPos:217, sign: 'b'},
                {id:10, tone: 'D2' ,yPos:217},
                {id:11, tone: 'Eb2',yPos:206, sign: 'b'},
                {id:12, tone: 'E2' ,yPos:206},
                {id:13, tone: 'F2' ,yPos:195},
                {id:14, tone: 'Gb2',yPos:184, sign: 'b'},
                {id:15, tone: 'G2' ,yPos:184},
                {id:16, tone: 'Ab2',yPos:173, sign: 'b'},
                {id:17, tone: 'A2' ,yPos:173},
                {id:18, tone: 'Bb2',yPos:162, sign: 'b'},
                {id:19, tone: 'B2' ,yPos:162},
                {id:20, tone: 'C3' ,yPos:151},
                {id:21, tone: 'Db3',yPos:140, sign: 'b'},
                {id:22, tone: 'D3' ,yPos:140},
                {id:23, tone: 'Eb3',yPos:129, sign: 'b'},
                {id:24, tone: 'E3' ,yPos:129},
                {id:25, tone: 'F3' ,yPos:118},
                {id:26, tone: 'Gb3',yPos:107, sign: 'b'},
                {id:27, tone: 'G3' ,yPos:107},
                {id:28, tone: 'Ab3',yPos:96, sign: 'b'},
                {id:29, tone: 'A3' ,yPos:96},
                {id:30, tone: 'Bb3',yPos:85, sign: 'b'},
                {id:31, tone: 'B3' ,yPos:85},
                {id:32, tone: 'C4' ,yPos:74},
                {id:33, tone: 'Db4',yPos:63, sign: 'b'},
                {id:34, tone: 'D4' ,yPos:63},
                {id:35, tone: 'Eb4',yPos:52, sign: 'b'},
                {id:36, tone: 'E4' ,yPos:52},
                {id:37, tone: 'F4' ,yPos:41},
                {id:38, tone: 'Gb4',yPos:30, sign: 'b'},
                {id:39, tone: 'G4' ,yPos:30},
                {id:40, tone: 'Ab4',yPos:19, sign: 'b'},
                {id:41, tone: 'A4' ,yPos:19},
                {id:42, tone: 'Bb4',yPos:8, sign: 'b'},
                {id:43, tone: 'B4' ,yPos:8},
                {id:44, tone: 'C5' ,yPos:-3},
                {id:45, tone: 'Db5',yPos:-14, sign: 'b'},
                {id:46, tone: 'D5' ,yPos:-14},
            ],
        playedTone: '',
        playedTones: [],
        selectedIntervals: [],
        response: '',
        playOrder: [],
        firstTone: '',
        secondTone: ''
    },

    mutations: {
        setSelectIntervals(state, intervals){
            state.selectedIntervals = intervals

        },
        // eslint-disable-next-line no-unused-vars
        playTone(state, toneNr){
            console.log(state.toneID[toneNr].tone);
            state.playedTone = state.toneID[toneNr].tone;
            state.player.samplerPlay(state.toneID[toneNr].tone)

        },
        randomRangeInt(state, range){
            let min = Math.ceil(range.min);
            let max = Math.floor(range.max);
            console.log(Math.floor(Math.random() * (max - min)) + min);
        },

        setGuess(state, interval){

            if(interval === state.playedTone){
                state.response ='right, well done!'
            }
            else{
                state.response = 'sorry, it is: '+ state.intervalNames[state.playedTone]
            }
        },

        playOrder(state, order){
            state.playOrder = order
        },

        playIntervals(state, order){
            state.response = '';
            state.playedTones = [];

            let randomOrder = order[0];
            if(order.length > 1){
                let rand = randomRangeInt({min: 0, max: order.length});
                randomOrder = order[rand]
            }

            let range = {min: 0, max: state.selectedIntervals.length};
            let randomInterval = randomRangeInt(range);
            randomInterval = state.selectedIntervals[randomInterval];

            //slice toneList - interval
            let subTones = state.toneID.slice(0, state.toneID.length - randomInterval);
            let randomToneSubtone = randomRangeInt({min: 0, max: subTones.length});

            if(randomOrder === 'simultaneous') {
                state.player.samplerPlay(state.toneID[randomToneSubtone].tone);
                state.player.samplerPlay(state.toneID[randomToneSubtone + randomInterval].tone);
            }
            else if(randomOrder === 'decrease') {
                subTones = state.toneID.slice(randomInterval, state.toneID.length);
                state.player.samplerPlay(state.toneID[randomToneSubtone].tone);
                Tone.Transport.scheduleOnce(function() {
                    state.player.samplerPlay(state.toneID[randomToneSubtone - randomInterval].tone)
                }, "0:1");
                Tone.Transport.start();
                Tone.Transport.seconds = 0

            }
            else{
                state.playedTones[0] = state.player.samplerPlay(state.toneID[randomToneSubtone].tone);

                Tone.Transport.scheduleOnce(function() {
                    state.playedTones[1] = state.player.samplerPlay(state.toneID[randomToneSubtone + randomInterval].tone)
                }, "0:1");
                Tone.Transport.start();
                Tone.Transport.seconds = 0

            }

            state.playedTones[0] = state.toneID[randomToneSubtone];
            state.playedTones[1] = state.toneID[randomToneSubtone + randomInterval];
            state.playedTone = randomInterval;

            function randomRangeInt(range){
                let min = Math.ceil(range.min);
                let max = Math.floor(range.max);
                return Math.floor(Math.random() * (max - min)) + min;
            }
        },
    },

    actions: {
        setSelectIntervals: ({commit}, intervals) => {commit('setSelectIntervals', intervals)},
        playTone: ({commit}, tone) => {commit('playTone', tone)},
        randomRangeInt: ({commit}, range) => {commit('randomRangeInt', range)},
        playIntervals: ({commit}, order) => {commit('playIntervals', order); },
        setGuess: ({commit}, interval) => {commit('setGuess', interval)},
    },

    getters: {
        getAllTones: (state) => {return state.toneID },
        getPlayedTone: (state) => {return state.playedTone},
        getIntervalNames: (state) => {return state.intervalNames},
        getPlayedInterval: (state) => {return state.response},
        getAllPlayedTones: (state) => {return state.playedTones},
        getSelectIntervals: (state) => {return state.selectedIntervals}
    }
});
