import { pause } from "../tool/delayer.mjs";

export class plays {
    constructor(game) {
        this.engine = game;
        this.playstrought = null;
        this.DomSection = document.getElementById('plays');
    }
    async fetch() {
        try {
            try {
                const response = await fetch('plays.html');
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const htmlString = await response.text();
                this.DomSection.innerHTML = htmlString;   
                this.setEvents(this.DomSection);
    
                const cssOverboard = document.querySelector('link[href="css/fontELement.css"]');
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'css/story.css';
                document.head.insertBefore(link, cssOverboard);
    
       
            } catch (error) {
                console.error('Error fetching HTML:', error);
            }
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

    }
    archiving() {

    }
    startNew() {

    }
    loadDay() {

    }
}