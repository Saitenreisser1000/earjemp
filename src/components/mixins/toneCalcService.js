export default {
    methods: {

        reduceToneList(reduceAmount){
            //44 and 63
            //tones without double-# and double-b
            return this.getToneChain.filter(tone => tone.toneID <= 44 - reduceAmount  && tone.id < 63);
        },

        switchTone(first, second, lineDist) {
            let changedSecond = second;

            if (Math.abs(first.linePos - second.linePos) !== lineDist) {
                let alternate = second.enh;

                if (Math.abs(this.getToneChain[alternate[0]].linePos - first.linePos) === lineDist) {
                    changedSecond = this.getToneChain[alternate[0]]
                } else if (alternate[1] && Math.abs(this.getToneChain[alternate[1]].linePos - first.linePos) === lineDist) {
                    changedSecond = this.getToneChain[alternate[1]]
                }
            }
            return changedSecond;
        },

        getInterval(tone, intervalSteps, lineDist) {
            let newTone = tone;
            for(let i = 0; i < intervalSteps; i++) {
                newTone = this.getToneChain[newTone.next];
            }
                newTone = this.switchTone(tone, newTone, lineDist);
            return newTone;
        },

        randomRangeInt(range){
            let min = Math.ceil(range.min);
            let max = Math.floor(range.max);
            return Math.floor(Math.random() * (max - min)) + min;
        },

        getScale(rootTone, scale){
            let notes = [];
            let root = this.getToneChain[rootTone];
            let temp = root;
            notes.push(root);

            for(let steps of scale){
                temp = this.getInterval(temp, steps, 1);
                notes.push(temp)
            }
            return notes
        },

        //helperfunction for timeaccuracy
        setExactTimeout(callback, duration, resolution) {
          const start = (new Date()).getTime();
          const timeout = setInterval(function(){
            if ((new Date()).getTime() - start > duration) {
              callback();
              clearInterval(timeout);
            }
          }, resolution);
          return timeout;
        },

        logger(toLog){
            console.log(toLog)
        }
    }
}
