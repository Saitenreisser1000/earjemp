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

        toneChain:[
            {id:0,  toneID:0,  name:'E1' ,tone: 'E1' , linePos:0,  enh:[63],    prev:'', next:1 },
            {id:1,  toneID:1,  name:'F1' ,tone: 'F1' , linePos:1,  enh:[64,65], prev:0,  next:2 },
            {id:2,  toneID:2,  name:'F#1',tone: 'Gb1', linePos:1,  enh:[3],     prev:1,  next:4 },
            {id:3,  toneID:2,  name:'Gb1',tone: 'Gb1', linePos:2,  enh:[2],     prev:1,  next:4 },
            {id:4,  toneID:3,  name:'G1' ,tone: 'G1' , linePos:2,  enh:[66,67], prev:3,  next:5 },
            {id:5,  toneID:4,  name:'G#1',tone: 'Ab1', linePos:2,  enh:[6],     prev:4,  next:7 },
            {id:6,  toneID:4,  name:'Ab1',tone: 'Ab1', linePos:3,  enh:[5],     prev:4,  next:7 },
            {id:7,  toneID:5,  name:'A1' ,tone: 'A1' , linePos:3,  enh:[68,69], prev:6,  next:8 },
            {id:8,  toneID:6,  name:'A#1',tone: 'Bb1', linePos:3,  enh:[9],     prev:7,  next:10},
            {id:9,  toneID:6,  name:'Bb1',tone: 'Bb1', linePos:4,  enh:[8],     prev:7,  next:10},
            {id:10, toneID:7,  name:'B1' ,tone: 'B1' , linePos:4,  enh:[70,71], prev:9,  next:11},
            {id:11, toneID:8,  name:'C2' ,tone: 'C2' , linePos:5,  enh:[72,73], prev:10, next:12},
            {id:12, toneID:9,  name:'C#2',tone: 'Db2', linePos:5,  enh:[13],    prev:11, next:14},
            {id:13, toneID:9,  name:'Db2',tone: 'Db2', linePos:6,  enh:[12],    prev:11, next:14},
            {id:14, toneID:10, name:'D2' ,tone: 'D2' , linePos:6,  enh:[74,75], prev:13, next:15},
            {id:15, toneID:11, name:'D#2',tone: 'Eb2', linePos:6,  enh:[16],    prev:14, next:17},
            {id:16, toneID:11, name:'Eb2',tone: 'Eb2', linePos:7,  enh:[15],    prev:14, next:17},
            {id:17, toneID:12, name:'E2' ,tone: 'E2' , linePos:7,  enh:[76,77], prev:16, next:18},
            {id:18, toneID:13, name:'F2' ,tone: 'F2' , linePos:8,  enh:[78,79], prev:17, next:19},
            {id:19, toneID:14, name:'F#2',tone: 'Gb2', linePos:8,  enh:[20],    prev:18, next:21},
            {id:20, toneID:14, name:'Gb2',tone: 'Gb2', linePos:9,  enh:[19],    prev:18, next:21},
            {id:21, toneID:15, name:'G2' ,tone: 'G2' , linePos:9,  enh:[80,81], prev:20, next:22},
            {id:22, toneID:16, name:'G#2',tone: 'Ab2', linePos:9,  enh:[23],    prev:21, next:24},
            {id:23, toneID:16, name:'Ab2',tone: 'Ab2', linePos:10, enh:[22],    prev:21, next:24},
            {id:24, toneID:17, name:'A2' ,tone: 'A2' , linePos:10, enh:[82,83], prev:23, next:25},
            {id:25, toneID:18, name:'A#2',tone: 'Bb2', linePos:10, enh:[26],    prev:24, next:27},
            {id:26, toneID:18, name:'Bb2',tone: 'Bb2', linePos:11, enh:[25],    prev:24, next:27},
            {id:27, toneID:19, name:'B2' ,tone: 'B2' , linePos:11, enh:[84,85], prev:26, next:28},
            {id:28, toneID:20, name:'C3' ,tone: 'C3' , linePos:12, enh:[86,87], prev:27, next:29},
            {id:29, toneID:21, name:'C#3',tone: 'Db3', linePos:12, enh:[30],    prev:28, next:31},
            {id:30, toneID:21, name:'Db3',tone: 'Db3', linePos:13, enh:[29],    prev:28, next:31},
            {id:31, toneID:22, name:'D3' ,tone: 'D3' , linePos:13, enh:[88,89], prev:30, next:32},
            {id:32, toneID:23, name:'D#3',tone: 'Eb3', linePos:13, enh:[33],    prev:31, next:34},
            {id:33, toneID:23, name:'Eb3',tone: 'Eb3', linePos:14, enh:[32],    prev:31, next:34},
            {id:34, toneID:24, name:'E3' ,tone: 'E3' , linePos:14, enh:[90,91], prev:33, next:35},
            {id:35, toneID:25, name:'F3' ,tone: 'F3' , linePos:15, enh:[92,93], prev:34, next:36},
            {id:36, toneID:26, name:'F#3',tone: 'Gb3', linePos:15, enh:[37],    prev:35, next:38},
            {id:37, toneID:26, name:'Gb3',tone: 'Gb3', linePos:16, enh:[36],    prev:35, next:38},
            {id:38, toneID:27, name:'G3' ,tone: 'G3' , linePos:16, enh:[94,95], prev:37, next:39},
            {id:39, toneID:28, name:'G#3',tone: 'Ab3', linePos:16, enh:[40],    prev:38, next:41},
            {id:40, toneID:28, name:'Ab3',tone: 'Ab3', linePos:17, enh:[39],    prev:38, next:41},
            {id:41, toneID:29, name:'A3' ,tone: 'A3' , linePos:17, enh:[96,97], prev:40, next:42},
            {id:42, toneID:30, name:'A#3',tone: 'Bb3', linePos:17, enh:[43],    prev:41, next:44},
            {id:43, toneID:30, name:'Bb3',tone: 'Bb3', linePos:18, enh:[42],    prev:41, next:44},
            {id:44, toneID:31, name:'B3' ,tone: 'B3' , linePos:18, enh:[98,99], prev:43, next:45},
            {id:45, toneID:32, name:'C4' ,tone: 'C4' , linePos:19, enh:[100,101],prev:44, next:46},
            {id:46, toneID:33, name:'C#4',tone: 'Db4', linePos:19, enh:[47],    prev:45, next:48},
            {id:47, toneID:33, name:'Db4',tone: 'Db4', linePos:20, enh:[46],    prev:45, next:48},
            {id:48, toneID:34, name:'D4' ,tone: 'D4' , linePos:20, enh:[102,103],prev:47, next:49},
            {id:49, toneID:35, name:'D#4',tone: 'Eb4', linePos:20, enh:[50],    prev:48, next:51},
            {id:50, toneID:35, name:'Eb4',tone: 'Eb4', linePos:21, enh:[49],    prev:48, next:51},
            {id:51, toneID:36, name:'E4' ,tone: 'E4' , linePos:21, enh:[104,105],prev:50, next:52},
            {id:52, toneID:37, name:'F4' ,tone: 'F4' , linePos:22, enh:[106,107],prev:51, next:53},
            {id:53, toneID:38, name:'F#4',tone: 'Gb4', linePos:22, enh:[54],    prev:52, next:55},
            {id:54, toneID:38, name:'Gb4',tone: 'Gb4', linePos:23, enh:[53],    prev:52, next:55},
            {id:55, toneID:39, name:'G4' ,tone: 'G4' , linePos:23, enh:[108,109],prev:54, next:56},
            {id:56, toneID:40, name:'G#4',tone: 'Ab4', linePos:23, enh:[57],    prev:55, next:58},
            {id:57, toneID:40, name:'Ab4',tone: 'Ab4', linePos:24, enh:[56],    prev:55, next:58},
            {id:58, toneID:41, name:'A4' ,tone: 'A4' , linePos:24, enh:[110,111],prev:57, next:59},
            {id:59, toneID:42, name:'A#4',tone: 'Bb4', linePos:24, enh:[60],    prev:58, next:61},
            {id:60, toneID:42, name:'Bb4',tone: 'Bb4', linePos:25, enh:[59],    prev:58, next:61},
            {id:61, toneID:43, name:'B4' ,tone: 'B4' , linePos:25, enh:[112,113],prev:60, next:62},
            {id:62, toneID:44, name:'C5' ,tone: 'C5' , linePos:26, enh:[114],   prev:61, next:''},

            //alterations - enharmonics
            //not direct accessible for random tone finder
            {id:63,  toneID:0,  name:'Fb1' ,tone:'E1', linePos:1, },
            {id:64,  toneID:1,  name:'E#1' ,tone:'F1', linePos:0, },
            {id:65,  toneID:1,  name:'Gbb1',tone:'F1', linePos:2, },
            {id:66,  toneID:3,  name:'Fx1' ,tone:'G1', linePos:1, },
            {id:67,  toneID:3,  name:'Abb1',tone:'G1', linePos:3, },
            {id:68,  toneID:5,  name:'Gx1' ,tone:'A1', linePos:2, },
            {id:69,  toneID:5,  name:'Bbb1',tone:'A1', linePos:4, },
            {id:70,  toneID:6,  name:'Ax1' ,tone:'B1', linePos:3, },
            {id:71,  toneID:6,  name:'Cb1' ,tone:'B1', linePos:5, },
            {id:72,  toneID:8,  name:'B#1' ,tone:'C2', linePos:4, },
            {id:73,  toneID:8,  name:'Dbb2',tone:'C2', linePos:6, },
            {id:74,  toneID:9,  name:'Cx2' ,tone:'D2', linePos:5, },
            {id:75,  toneID:9,  name:'Ebb2',tone:'D2', linePos:7, },
            {id:76,  toneID:12, name:'Dx2' ,tone:'E2', linePos:6, },
            {id:77,  toneID:12, name:'Fb2' ,tone:'E2', linePos:8, },
            {id:78,  toneID:13, name:'E#2' ,tone:'F2', linePos:7, },
            {id:79,  toneID:13, name:'Gbb2',tone:'F2', linePos:9, },
            {id:80,  toneID:15, name:'Fx2' ,tone:'G2', linePos:8, },
            {id:81,  toneID:15, name:'Abb2',tone:'G2', linePos:10,},
            {id:82,  toneID:17, name:'Gx2' ,tone:'A2', linePos:9, },
            {id:83,  toneID:17, name:'Bbb2',tone:'A2', linePos:11,},
            {id:84,  toneID:18, name:'Ax2' ,tone:'B2', linePos:10,},
            {id:85,  toneID:18, name:'Cb3' ,tone:'B2', linePos:12,},
            {id:86,  toneID:20, name:'B#2' ,tone:'C3', linePos:11,},
            {id:87,  toneID:20, name:'Dbb3',tone:'C3', linePos:13,},
            {id:88,  toneID:22, name:'Cx3' ,tone:'D3', linePos:12,},
            {id:89,  toneID:22, name:'Ebb3',tone:'D3', linePos:14,},
            {id:90,  toneID:24, name:'Dx3' ,tone:'E3', linePos:13,},
            {id:91,  toneID:24, name:'Fb3' ,tone:'E3', linePos:15,},
            {id:92,  toneID:25, name:'E#3' ,tone:'F3', linePos:14,},
            {id:93,  toneID:25, name:'Gbb3',tone:'F3', linePos:16,},
            {id:94,  toneID:27, name:'Fx3' ,tone:'G3', linePos:15,},
            {id:95,  toneID:27, name:'Abb3',tone:'G3', linePos:17,},
            {id:96,  toneID:29, name:'Gx3' ,tone:'A3', linePos:16,},
            {id:97,  toneID:29, name:'Bbb3',tone:'A3', linePos:18,},
            {id:98,  toneID:31, name:'Ax3' ,tone:'B3', linePos:17,},
            {id:99,  toneID:31, name:'Cb3' ,tone:'B3', linePos:19,},
            {id:100, toneID:32, name:'B#3' ,tone:'C4', linePos:18,},
            {id:101, toneID:32, name:'Dbb4',tone:'C4', linePos:20,},
            {id:102, toneID:34, name:'Cx4' ,tone:'D4', linePos:19,},
            {id:103, toneID:34, name:'Ebb4',tone:'D4', linePos:21,},
            {id:104, toneID:36, name:'Dx4' ,tone:'E4', linePos:20,},
            {id:105, toneID:36, name:'Fb4' ,tone:'E4', linePos:22,},
            {id:106, toneID:37, name:'E#4' ,tone:'F4', linePos:21,},
            {id:107, toneID:37, name:'Gbb4',tone:'F4', linePos:23,},
            {id:108, toneID:39, name:'Fx4' ,tone:'G4', linePos:22,},
            {id:109, toneID:39, name:'Abb4',tone:'G4', linePos:24,},
            {id:110, toneID:41, name:'Gx4' ,tone:'A4', linePos:23,},
            {id:111, toneID:41, name:'Bbb4',tone:'A4', linePos:25,},
            {id:112, toneID:43, name:'Ax4' ,tone:'B4', linePos:24,},
            {id:113, toneID:43, name:'Cb5' ,tone:'B4', linePos:26,},
            {id:114, toneID:44, name:'B#4' ,tone:'C5', linePos:25,},
        ],
        selectedIntervals: [],
        firstTone:'',
        secondTone:'',
        intervalDirection:''
    },

    mutations: {
        setSelectIntervals(state, intervals){
            state.selectedIntervals = intervals
        },

        setIntervalDirection(state, direction){
            state.intervalDirection = direction
            console.log(direction)
        },

        playIntervals(state, payload){

            state.firstTone = payload.firstTone
            state.secondTone = payload.secondTone

            if(state.intervalDirection[0] === 'simultaneous'){
                state.player.samplerPlay(payload.firstTone.tone);
                state.player.samplerPlay(payload.secondTone.tone);

            }else if(state.intervalDirection[0] === 'decrease'){
                state.player.samplerPlay(payload.secondTone.tone);
                setTimeout(() => {
                    state.player.samplerPlay(payload.firstTone.tone);
                }, 500)

            }else{
                state.player.samplerPlay(payload.firstTone.tone);
                setTimeout(() => {
                    state.player.samplerPlay(payload.secondTone.tone);
                }, 500)

            }
        }
    },

    actions: {
        setSelectIntervals: ({commit}, intervals) => {commit('setSelectIntervals', intervals)},
        setIntervalDirection: ({commit}, payload) => {commit('setIntervalDirection', payload)},
        playIntervals: ({commit}, payload) => {commit('playIntervals', payload)},
    },

    getters: {
        getToneChain: (state) => {return state.toneChain},
        getSelectedIntervals: (state) => {return state.selectedIntervals},

    }
});
