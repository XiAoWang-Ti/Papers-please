import { soundBoard } from "./soundboard.mjs";
import { stampBar } from "../interactions/stamp.mjs";
import { booth } from "../interactions/booth.mjs";
import { write } from "../tool/textwritter..mjs";
import { sfx } from "../radio/sfx_list.mjs";
import { setting } from "./settings.mjs";

export class Border {
    constructor() {
        this.setting = new setting(); 
        this.sfx = new soundBoard(this.setting);
        this.stampBar = new stampBar(this);
        this.booth = new booth(this);
        this.introCurtain = document.getElementById('intro');
        this.setKeyEvent = this.setKeyEvent.bind(this);
        this.startIntro();
    }
    requestSound(link) {
        this.sfx.play(link);
    }
    async startIntro() {
        await this.sfx.preloadIntoMemory(sfx);
        await write(document.getElementById('intro-text'), null, 'November 23rd, 1982', {
            device: this.sfx,
            audio: [
                '74. Text Reveal0.mp3',
                '75. Text Reveal1.mp3',
                '76. Text Reveal2.mp3',
                '77. Text Reveal3.mp3'
            ]
        });
        // await this.sfx.play({type: 'sfx', file: '03. Booth Intro.mp3'});
        // await this.sfx.play('03. Booth Intro.mp3');
        await this.sfx.play('Booth Intro');
        this.introCurtain.className = 'out';
        this.introCurtain.addEventListener('animationend', this.setKeyEvent);
        
    }
    async setKeyEvent() {
        const that = this;

        // that.sfx.playAmbient('05. Border Ambient.mp3');
        that.sfx.playAmbient('Booth Ambient');

        // that.sfx.playAmbient('05. Border Ambient');
        that.sfx.playAmbient('Border Ambient');
        that.stampBar.addEvents();
        that.booth.addEvents();
        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Tab' || event.keyCode === 9) {
                event.preventDefault();
                that.stampBar.toggleStampBar();
            }
        });
    }
}

// ..................................