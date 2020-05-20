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

        getScale(rootTone){
            let scale = [{step: 2, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:9, dist:5}, {step: 11, dist:6}, {step:12, dist:7}];
            let notes = [];
            let root = this.getToneChain.find(tone => tone.name === rootTone);
            notes.push(root);
            for(let tone of scale){
                notes.push(this.getInterval(root, tone.step, tone.dist))
            }
            return notes
        },

        logger(toLog){
            console.log(toLog)
        }
    }
}
