import intervalJemp from "@/components/intervalJemp/intervalJemp";
import chordJemp from "@/components/chordjemp/chordJemp";
import scaleJemp from "@/components/scaleJemp/scaleJemp";

export default [
    { path: '/', component: intervalJemp},
    { path: '/chordJemp', component: chordJemp},
    { path: '/scaleJemp', component: scaleJemp}
]
