
import A1 from "../assets/sounds/piano/A1.mp3" ;
import A2 from "../assets/sounds/piano/A2.mp3" ;
import A3 from "../assets/sounds/piano/A3.mp3" ;
import A4 from "../assets/sounds/piano/A4.mp3" ;
import B1 from "../assets/sounds/piano/B1.mp3" ;
import B2 from "../assets/sounds/piano/B2.mp3" ;
import B3 from "../assets/sounds/piano/B3.mp3" ;
import B4 from "../assets/sounds/piano/B4.mp3" ;
import Bb1 from"../assets/sounds/piano/As1.mp3";
import Bb2 from"../assets/sounds/piano/As2.mp3";
import Bb3 from"../assets/sounds/piano/As3.mp3";
import Bb4 from"../assets/sounds/piano/As4.mp3";
import C2 from "../assets/sounds/piano/C2.mp3" ;
import C3 from "../assets/sounds/piano/C3.mp3" ;
import C4 from "../assets/sounds/piano/C4.mp3" ;
import C5 from "../assets/sounds/piano/C5.mp3" ;
import Db2 from"../assets/sounds/piano/Cs2.mp3";
import Db3 from"../assets/sounds/piano/Cs3.mp3";
import Db4 from"../assets/sounds/piano/Cs4.mp3";
import Db5 from"../assets/sounds/piano/Cs5.mp3";
import D2 from "../assets/sounds/piano/D2.mp3" ;
import D3 from "../assets/sounds/piano/D3.mp3" ;
import D4 from "../assets/sounds/piano/D4.mp3" ;
import D5 from "../assets/sounds/piano/D5.mp3" ;
import Eb2 from"../assets/sounds/piano/Ds2.mp3";
import Eb3 from"../assets/sounds/piano/Ds3.mp3";
import Eb4 from"../assets/sounds/piano/Ds4.mp3";
import E1 from "../assets/sounds/piano/E1.mp3";
import E2 from "../assets/sounds/piano/E2.mp3";
import E3 from "../assets/sounds/piano/E3.mp3";
import E4 from "../assets/sounds/piano/E4.mp3";
import F1 from "../assets/sounds/piano/F1.mp3";
import F2 from "../assets/sounds/piano/F2.mp3";
import F3 from "../assets/sounds/piano/F3.mp3";
import F4 from "../assets/sounds/piano/F4.mp3";
import Gb1 from"../assets/sounds/piano/Fs1.mp3";
import Gb2 from"../assets/sounds/piano/Fs2.mp3";
import Gb3 from"../assets/sounds/piano/Fs3.mp3";
import Gb4 from"../assets/sounds/piano/Fs4.mp3";
import G1 from "../assets/sounds/piano/G1.mp3";
import G2 from "../assets/sounds/piano/G2.mp3";
import G3 from "../assets/sounds/piano/G3.mp3";
import G4 from "../assets/sounds/piano/G4.mp3";
import Ab1 from"../assets/sounds/piano/Gs1.mp3";
import Ab2 from"../assets/sounds/piano/Gs2.mp3";
import Ab3 from"../assets/sounds/piano/Gs3.mp3";
import Ab4 from"../assets/sounds/piano/Gs4.mp3";


//import { Sampler } from "tone"
import {Howl} from 'howler';


export class Player{


    constructor(){
        this.playerInit()
    }

    playerInit(){
            this.soundA1 = new Howl({src:  [A1]}),
            this.soundA2 = new Howl({src:  [A2]}),
            this.soundA3 = new Howl({src:  [A3]}),
            this.soundA4 = new Howl({src:  [A4]}),
            this.soundB1 = new Howl({src:  [B1]}),
            this.soundB2 = new Howl({src:  [B2]}),
            this.soundB3 = new Howl({src:  [B3]}),
            this.soundB4 = new Howl({src:  [B4]}),
            this.soundBb1 = new Howl({src: [Bb1]}),
            this.soundBb2 = new Howl({src: [Bb2]}),
            this.soundBb3 = new Howl({src: [Bb3]}),
            this.soundBb4 = new Howl({src: [Bb4]}),
            this.soundC2 = new Howl({src:  [C2]}),
            this.soundC3 = new Howl({src:  [C3]}),
            this.soundC4 = new Howl({src:  [C4]}),
            this.soundC5 = new Howl({src:  [C5]}),
            this.soundDb2 = new Howl({src: [Db2]}),
            this.soundDb3 = new Howl({src: [Db3]}),
            this.soundDb4 = new Howl({src: [Db4]}),
            this.soundDb5 = new Howl({src: [Db5]}),
            this.soundD2  = new Howl({src: [D2 ]}),
            this.soundD3  = new Howl({src: [D3 ]}),
            this.soundD4  = new Howl({src: [D4 ]}),
            this.soundD5  = new Howl({src: [D5 ]}),
            this.soundEb2 = new Howl({src: [Eb2]}),
            this.soundEb3 = new Howl({src: [Eb3]}),
            this.soundEb4 = new Howl({src: [Eb4]}),
            this.soundE1  = new Howl({src: [E1 ]}),
            this.soundE2  = new Howl({src: [E2 ]}),
            this.soundE3  = new Howl({src: [E3 ]}),
            this.soundE4  = new Howl({src: [E4 ]}),
            this.soundF1  = new Howl({src: [F1 ]}),
            this.soundF2  = new Howl({src: [F2 ]}),
            this.soundF3  = new Howl({src: [F3 ]}),
            this.soundF4  = new Howl({src: [F4 ]}),
            this.soundGb1 = new Howl({src: [Gb1]}),
            this.soundGb2 = new Howl({src: [Gb2]}),
            this.soundGb3 = new Howl({src: [Gb3]}),
            this.soundGb4 = new Howl({src: [Gb4]}),
            this.soundG1  = new Howl({src: [G1 ]}),
            this.soundG2  = new Howl({src: [G2 ]}),
            this.soundG3  = new Howl({src: [G3 ]}),
            this.soundG4  = new Howl({src: [G4 ]}),
            this.soundAb1 = new Howl({src: [Ab1]}),
            this.soundAb2 = new Howl({src: [Ab2]}),
            this.soundAb3 = new Howl({src: [Ab3]}),
            this.soundAb4 = new Howl({src: [Ab4]})


    }
    samplerPlay(tone){
        // eslint-disable-next-line no-unused-vars
        let sound = eval(`this.sound${tone}.play()`);
        eval(`this.sound${tone}`).fade(1, 0, 1500, sound);
    }
}






