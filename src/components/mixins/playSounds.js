import {Howl} from 'howler'

let howlMp3 = require("@/assets/sounds/newAudio.mp3");
let howlOGG = require("@/assets/sounds/newAudio.ogg");

export default {
    data(){
        return{
            sounds : new Howl({
                "src": [
                    howlMp3,
                    howlOGG
                ],
                buffer: true,

                onplay: () => {
                    if(this.playSecond)
                    this.playSecond()

                },
                onload: () => {
                    this.$emit('setSoundLoaded', false)
                },
                "sprite": {
                    "A1": [
                        0,
                        9555.192743764172
                    ],
                    "A2": [
                        11000,
                        8292.04081632653
                    ],
                    "A3": [
                        21000,
                        6560.61224489796
                    ],
                    "A4": [
                        29000,
                        5050.612244897962
                    ],
                    "A5": [
                        36000,
                        2856.0317460317465
                    ],
                    "As0": [
                        40000,
                        13119.229024943308
                    ],
                    "As1": [
                        55000,
                        9984.965986394556
                    ],
                    "As2": [
                        66000,
                        6759.274376417238
                    ],
                    "As3": [
                        74000,
                        5265.850340136055
                    ],
                    "As4": [
                        81000,
                        3406.462585034006
                    ],
                    "As5": [
                        86000,
                        2920.884353741499
                    ],
                    "B1": [
                        90000,
                        11933.582766439911
                    ],
                    "B2": [
                        103000,
                        9087.074829931978
                    ],
                    "B3": [
                        114000,
                        7767.845804988667
                    ],
                    "B4": [
                        123000,
                        6596.235827664401
                    ],
                    "B5": [
                        131000,
                        4754.897959183665
                    ],
                    "C1": [
                        137000,
                        17848.185941043084
                    ],
                    "C2": [
                        156000,
                        10876.1224489796
                    ],
                    "C3": [
                        168000,
                        9919.659863945582
                    ],
                    "C4": [
                        179000,
                        7320.498866213143
                    ],
                    "C5": [
                        188000,
                        4109.387755102034
                    ],
                    "Cs1": [
                        194000,
                        12257.414965986385
                    ],
                    "Cs2": [
                        208000,
                        11093.106575963731
                    ],
                    "Cs3": [
                        221000,
                        8235.034013605456
                    ],
                    "Cs4": [
                        231000,
                        3397.029478458052
                    ],
                    "Cs5": [
                        236000,
                        3492.743764172332
                    ],
                    "D1": [
                        241000,
                        14161.678004535133
                    ],
                    "D2": [
                        257000,
                        9039.909297052134
                    ],
                    "D3": [
                        268000,
                        10409.591836734706
                    ],
                    "D4": [
                        280000,
                        6343.401360544192
                    ],
                    "Ds1": [
                        288000,
                        15554.331065759641
                    ],
                    "Ds2": [
                        305000,
                        7706.825396825423
                    ],
                    "Ds3": [
                        314000,
                        8682.902494331074
                    ],
                    "Ds4": [
                        324000,
                        5609.002267573715
                    ],
                    "E1": [
                        331000,
                        9852.335600907054
                    ],
                    "E2": [
                        342000,
                        7675.192743764172
                    ],
                    "E3": [
                        351000,
                        5805.963718820863
                    ],
                    "E4": [
                        358000,
                        5325.328798185921
                    ],
                    "F1": [
                        365000,
                        11965.215419501135
                    ],
                    "F2": [
                        378000,
                        7273.287981859426
                    ],
                    "F3": [
                        387000,
                        8006.3265306122275
                    ],
                    "F4": [
                        397000,
                        6534.081632653056
                    ],
                    "Fs1": [
                        405000,
                        12874.761904761897
                    ],
                    "Fs2": [
                        419000,
                        9673.129251700686
                    ],
                    "Fs3": [
                        430000,
                        6678.707482993218
                    ],
                    "Fs4": [
                        438000,
                        6999.750566893397
                    ],
                    "G1": [
                        446000,
                        10761.564625850326
                    ],
                    "G2": [
                        458000,
                        8359.319727891147
                    ],
                    "G3": [
                        468000,
                        4616.439909297071
                    ],
                    "G4": [
                        474000,
                        4786.371882086143
                    ],
                    "Gs1": [
                        480000,
                        10695.306122448983
                    ],
                    "Gs2": [
                        492000,
                        9199.11564625852
                    ],
                    "Gs3": [
                        503000,
                        5963.378684807253
                    ],
                    "Gs4": [
                        510000,
                        4412.585034013659
                    ]
                }
            }),
        }
    },

    methods: {
        playAudio(tone) {
            let t = this.sounds.play(tone);
            this.sounds.fade(1, 0, 1200, t)
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
