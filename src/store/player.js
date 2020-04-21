
import A1 from "../assets/sounds/piano/A1.ogg";
import A2 from "../assets/sounds/piano/A2.ogg";
import A3 from "../assets/sounds/piano/A3.ogg";
import A4 from "../assets/sounds/piano/A4.ogg";
import B1 from "../assets/sounds/piano/B1.ogg";
import B2 from "../assets/sounds/piano/B2.ogg";
import B3 from "../assets/sounds/piano/B3.ogg";
import B4 from "../assets/sounds/piano/B4.ogg";
import Bb1 from"../assets/sounds/piano/As1.ogg";
import Bb2 from"../assets/sounds/piano/As2.ogg";
import Bb3 from"../assets/sounds/piano/As3.ogg";
import Bb4 from"../assets/sounds/piano/As4.ogg";
import C2 from "../assets/sounds/piano/C2.ogg";
import C3 from "../assets/sounds/piano/C3.ogg";
import C4 from "../assets/sounds/piano/C4.ogg";
import C5 from "../assets/sounds/piano/C5.ogg";
import Db2 from"../assets/sounds/piano/Cs2.ogg";
import Db3 from"../assets/sounds/piano/Cs3.ogg";
import Db4 from"../assets/sounds/piano/Cs4.ogg";
import Db5 from"../assets/sounds/piano/Cs5.ogg";
import D2 from "../assets/sounds/piano/D2.ogg";
import D3 from "../assets/sounds/piano/D3.ogg";
import D4 from "../assets/sounds/piano/D4.ogg";
import D5 from "../assets/sounds/piano/D5.ogg";
import Eb2 from"../assets/sounds/piano/Ds2.ogg";
import Eb3 from"../assets/sounds/piano/Ds3.ogg";
import Eb4 from"../assets/sounds/piano/Ds4.ogg";
import E1 from "../assets/sounds/piano/E1.ogg";
import E2 from "../assets/sounds/piano/E2.ogg";
import E3 from "../assets/sounds/piano/E3.ogg";
import E4 from "../assets/sounds/piano/E4.ogg";
import F1 from "../assets/sounds/piano/F1.ogg";
import F2 from "../assets/sounds/piano/F2.ogg";
import F3 from "../assets/sounds/piano/F3.ogg";
import F4 from "../assets/sounds/piano/F4.ogg";
import Gb1 from"../assets/sounds/piano/Fs1.ogg";
import Gb2 from"../assets/sounds/piano/Fs2.ogg";
import Gb3 from"../assets/sounds/piano/Fs3.ogg";
import Gb4 from"../assets/sounds/piano/Fs4.ogg";
import G1 from "../assets/sounds/piano/G1.ogg";
import G2 from "../assets/sounds/piano/G2.ogg";
import G3 from "../assets/sounds/piano/G3.ogg";
import G4 from "../assets/sounds/piano/G4.ogg";
import Ab1 from"../assets/sounds/piano/Gs1.ogg";
import Ab2 from"../assets/sounds/piano/Gs2.ogg";
import Ab3 from"../assets/sounds/piano/Gs3.ogg";
import Ab4 from"../assets/sounds/piano/Gs4.ogg";


import { Sampler } from "tone"

export class Player{
    constructor(){
        this.samplerinit();
    }

    samplerPlay(tone){
        this._sampler.triggerAttackRelease(tone, 1)
    }

    samplerinit() {
        this._sampler = new Sampler(
            {
                A1, A2, A3, A4,
                B1, B2, B3, B4,
                Bb1, Bb2, Bb3, Bb4,
                C2, C3, C4, C5,
                Db2, Db3, Db4, Db5,
                D2, D3, D4, D5,
                Eb2, Eb3, Eb4,
                E1, E2, E3, E4,
                F1, F2, F3, F4,
                Gb1, Gb2, Gb3, Gb4,
                G1, G2, G3, G4,
                Ab1, Ab2, Ab3, Ab4,
            },
            {
            "release": 1,
        }).toMaster();
    }
}






