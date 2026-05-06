import { builder, builder_v2 } from "../tool/elementCreator.mjs";
export class stampBar {
    constructor(ui) {
        this.ui = ui;
        this.isOpen = false;
        this.onAnimation = false;
        this.body = document.getElementById('stamp');
        this.button = document.getElementById('oppen');
        this.deniedStamp = document.getElementById('deniedStamp');
        this.aproveStamp = document.getElementById('aprovedStamp');
    }
    addEvents() {
        this.button.addEventListener('click', () => {
            this.toggleStampBar();
        });
        this.body.addEventListener('animationstart', (event) => {
            if (event.target !== this.body) return;
            this.onAnimation = true;
        })
        this.body.addEventListener('animationend', (event) => {
            if (event.target !== this.body) return;
            this.onAnimation = false;
        })
        this.setStampSetAnimation([this.deniedStamp, this.aproveStamp]);
    }
    async openStampBar() {
        // await this.ui.requestSound({type: 'sfx', file: '73. Stampbar Open.mp3'});
        // await this.ui.requestSound('73. Stampbar Open.mp3');
        await this.ui.requestSound('Stampbar Open');
        this.isOpen = true;
        this.body.className = 'beingOpen';

    }
    async closeStampBar() {
        // await this.ui.requestSound({type: 'sfx', file: '72. Stampbar Close.mp3'});
        // await this.ui.requestSound('72. Stampbar Close.mp3');
        await this.ui.requestSound('Stampbar Close');
        this.isOpen = false;
        this.body.className = 'beingClose';
    }
    toggleStampBar() {
        if (this.onAnimation) return;
        this.isOpen === true ? this.closeStampBar() : this.openStampBar();
    }
    setStampSetAnimation(elements) {
        elements.forEach(element => {
            element.addEventListener('click', async (event) => {
                event.preventDefault();
                if (this.onAnimation) return;
                await this.stamp();
                element.classList.add('stamping');
                this.onAnimation = true;
            });
    
            element.addEventListener('animationstart', function(event) {
                if (event.animationName === 'stamping') {
                    this.onAnimation = true;
                }
            }.bind(this)); // Binding `this` explicitly
    
            element.addEventListener('animationend', function(event) {
                if (event.animationName === 'stamp') {
                    setTimeout(async () => {
                        await this.addStamp();
                        //this.ui.requestSound({ type: 'sfx', file: '71. Stamp Up.mp3' });
                        // this.ui.requestSound('71. Stamp Up.mp3');
                        this.ui.requestSound('Stamp Up');
                        element.classList.remove('stamping');
                        element.classList.add('back-up');
                    }, 1100);
                } else if (event.animationName === 'stampBack') {
                    element.classList.remove('back-up');
                    this.onAnimation = false;
                }
            }.bind(this)); // Binding `this` explicitly
        });
    }

    async stamp(target) {
        // await this.ui.requestSound({type: 'sfx', file: '70. Stamp Down.mp3'});
        // await this.ui.requestSound('70. Stamp Down.mp3');
        await this.ui.requestSound('Stamp Down');

    }
    async addStamp() {
        const stamp = builder('img', null, 'stampSign');
        stamp.src = '';
        // target.appendChild(stamp);
    }
    // box.style.animationDirection = "reverse";
    // box.style.animationPlayState = "running";
}