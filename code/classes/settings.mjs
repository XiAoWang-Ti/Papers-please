import { pause } from "../tool/delayer.mjs";
export class setting {
    constructor(game) {
        this.engine = game;
        this.Fullscreen = false;
        this.Nudity = false;
        this.EasyMode = false;
        this.DateFormat = '-';
        this.Music = 1;
        this.Sound = 1;
        this.Language = 'English';
        this.LanguageList = new Map();
        this.DomSection = document.getElementById('settings');
    }
    async fetch() {
        try {
            const response = await fetch('setting.html');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const htmlString = await response.text();
            this.DomSection.innerHTML = htmlString;   
            this.setEvents(this.DomSection);

            const cssOverboard = document.querySelector('link[href="css/fontELement.css"]');
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/setting.css';
            document.head.insertBefore(link, cssOverboard);

   
        } catch (error) {
            console.error('Error fetching HTML:', error);
            return new Error(error);
        }
    }
    setEvents(section) {
        const exit = section.querySelector('.exit');
        const exitButton = exit.querySelector('span');
        // console.log(exitButton);
        
        exitButton.addEventListener('mousedown', async () => {
            this.engine.windowAttr.mousedown = exitButton;
            await this.engine.audio.play('Button Down');
            exit.classList.add('clicked');
        });
        exitButton.customMethod = async () => {
            this.engine.windowAttr.mousedown = null;
            await this.engine.audio.play('Button Up');
            exit.classList.remove('clicked');
            await pause(0.2);
            this.engine.transitionFrameOutDisplay = () => {
                this.engine.changeFacility(this.engine.menu.DomSection);
            };
            this.engine.transitionIn();
        }
        exitButton.removeClicked = () => {
            exit.classList.remove('clicked');
        };

        const fullscreen = section.querySelector('#fullscreen');
        const nudity = section.querySelector('#nudity');
        const easymode = section.querySelector('#easyMode')


        function setMousedown() {

        }
    }
    toggleFullscreen()  {

    }
    toggleNudity() {

    }
    toggleEasyMode() {

    }
    getSoundVolume() {
        return this.Sound;
    }
    getMusicVolume() {
        return this.Music;
    }
}