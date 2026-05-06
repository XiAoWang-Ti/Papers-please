import { console } from "./console.mjs";
export class booth {
    constructor(ui) {
        this.ui = ui;
        this.shutterOpen = false;
        this.shiftEnded = true;
        this.onCheck = false;
        this.shutterSwitch = document.getElementById('shutterSwitch');
        this.outerBooth = document.getElementById('outerBooth-sprite');
        this.callNextMegaphone = document.querySelector('#outerBooth > .hitbox');

        this.outerBoothAnimationInterval = {
            frame: 1,
            interval: null
        };

        this.console = new console(this);
    }
    // add event triggers
    addEvents() {
        this.callNextMegaphone.addEventListener('click', () => {
            if (this.onCheck) return;
            this.callNext();
        });
        this.shutterSwitch.addEventListener('click', () => {
            this.toogleShutterSwitch();
        });
        this.animateOuterBooth();
        this.console.addEvents();
    }
    animateOuterBooth() {
        if (this.outerBoothAnimationInterval.frame != 1) {
            this.outerBoothAnimationInterval.frame = 1;
            this.outerBooth.src = '../assets/others/OuterBoothDef.png';
        } 
        this.outerBoothAnimationInterval.interval = setInterval(() => {
            this.outerBooth.src = this.outerBoothAnimationInterval.frame == 1 ? '../assets/others/OuterBoothFlick.png' : '../assets/others/OuterBoothDef.png';
            this.outerBoothAnimationInterval.frame = this.outerBoothAnimationInterval.frame === 1 ? 2 : 1;
         }, 400);
    }
    stopOuterBoothAnimation() {
        clearInterval(this.outerBoothAnimationInterval.interval);
        this.outerBoothAnimationInterval.frame = 1;
        this.outerBooth.src = '../assets/others/OuterBoothDef.png';
    }
    // open the shutter gif
    async openShutter() {
        if (this.shutterOpen) return;
        this.shutterOpen = true;
        this.shutterSwitch.src = '../assets/others/ShutterSwitchUp.png';

        // 1. first prototype 2. removed type and independent sound method.
        // await this.ui.requestSound({type:'sfx', file: '64. Shutter Rise.mp3'});
        // await this.ui.requestSound('64. Shutter Rise.mp3');
        await this.ui.requestSound('Shutter Rise');
    }
    // close the shutter-gif
    async closeShutter() {
        if (!this.shutterOpen && !this.shiftEnded) return; 
        this.shutterOpen = false;
        this.shutterSwitch.src = '../assets/others/ShutterSwitchDown.png';
        // await this.ui.requestSound({type:'sfx', file: '63. Shutter Drop.mp3'});
        // await this.ui.requestSound('63. Shutter Drop.mp3');
        await this.ui.requestSound('Shutter Drop');
    }
    // toogle between then default trigger
    toogleShutterSwitch() {
        this.shutterOpen === true ? this.closeShutter() : this.openShutter();
    }
    // call for next immigrant
    async callNext() {
        // await this.ui.requestSound({type:'sfx', file: '65. Speech Announce.mp3'});
        // await this.ui.requestSound('65. Speech Announce.mp3');
        await this.ui.requestSound('Speech Announce');
        // this.stopOuterBoothAnimation();
        if (this.ui.stampBar.isOpen && !this.ui.stampBar.onAnimation) this.ui.stampBar.closeStampBar();
        this.onCheck = false; // has to be set to true, set to false for sound testing

    }
}