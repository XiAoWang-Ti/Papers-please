import { Menu } from "./menu.mjs"
import { setting } from "./settings.mjs";
import { plays } from "./matches.mjs";
import { soundBoard } from "./soundboard.mjs";



export class papersPlease {
    constructor() {
        this.menu = new Menu(this);
        this.settings = new setting(this),        
        this.plays = new plays(this);
        this.audio = new soundBoard(this.settings);
        this.transitionFrame = document.getElementById('transitionBoard');
        this.transitionFrameOutDisplay = null;
        this.windowAttr = {
            mousedown: null
        };

        this.facility = this.menu.DomSection;
        this.facility.classList.add('front');

        this.intro();
        this.settings.fetch();
        this.plays.fetch();
    }
    async intro() {
        await this.audio.preloadIntoMemory(
            {sound: {
                root: '../sfx/sounds/',
                files : [
                    '17. Button Down.mp3',
                    '18. Button Drop.mp3',
                    '19. Button Up.mp3',
                    '74. Text Reveal0.mp3',
                    '75. Text Reveal1.mp3',
                    '76. Text Reveal2.mp3',
                    '77. Text Reveal3.mp3'
                ]
            },
            music: {
                root: '../sfx/music/',
                files: [
                    'GlorytoArstotzka.mp3'
                ]
            }
        });
        console.log('ended');
        this.menu.intro();  
        this.transitionFrame.addEventListener('transitionend', async () => {
            if (this.transitionFrameOutDisplay === null) return;
            await this.transitionFrameOutDisplay(); 
            this.transitionOut();
            this.transitionFrameOutDisplay = null;
        });

    }
    mousedownOn() {
        window.addEventListener('mouseup', async (event) => {
            if (this.windowAttr.mousedown === null) return
            if (event.target === this.windowAttr.mousedown) {
                this.windowAttr.mousedown.customMethod();
            } else {
                await this.audio.play('Button Drop');
                this.windowAttr.mousedown.removeClicked();
                this.windowAttr.mousedown = null;
            }
        });
    }
    transitionIn() {
        this.transitionFrame.className = 'blackOut';
    }
    transitionOut() {
        this.transitionFrame.className = '';
    }
    changeFacility(newFacility) {
        this.facility.classList.remove('front');
        this.facility = newFacility
        this.facility.classList.add('front');
    }
}