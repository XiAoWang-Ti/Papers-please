import { pause } from "../tool/delayer.mjs";
import { write } from "../tool/textwritter..mjs";

export class Menu {
    constructor(game) {
        this.engine = game;
        this.DomSection = document.getElementById('Menu');
    }
    intro() {
        const menu = document.getElementById('Menu');
        const transitionFrame = this.engine.transitionFrame
        const title = document.getElementById('Title');

        transitionFrame.textContent = '';
        write(transitionFrame, null, 'click to play.')
        const start = () => {
            menu.classList.remove('onboot');
            window.removeEventListener('click', start);
    
            const intro = async () => {
                transitionFrame.removeEventListener('transitionend', intro);
                transitionFrame.textContent = '';
                menu.classList.add('intro');
                await this.engine.audio.playAmbient('GlorytoArstotzka');

                let steps = 18;
                const distance = 292;
                let initDistance = distance;
                const distanceByStep = distance/steps;
    
                const move = async () => {
                    if (steps <= 0) {
                        menu.removeEventListener('transitionend', move);
                        title.classList.add('on');
                        menu.classList.remove('intro');
                        this.setButtonEvents();
                        return
                    } else {
                        steps--;
                        await pause(0.85);
                        initDistance -= distanceByStep;
                        menu.style.transform = `translateY(${initDistance}px)`;
                    }
                }
                menu.addEventListener('transitionend', move);
                await pause(2.2);
                menu.style.transform = `translateY(${initDistance}px)`;
            }
            transitionFrame.addEventListener('transitionend', intro);
        }
        window.addEventListener('click', start);
    }
    setButtonEvents() {
        const gamemodes = document.querySelectorAll('.game-modes');
        gamemodes.forEach(option => {
            const clickable = option.querySelector('span.interactable');
            clickable.addEventListener('mousedown', async () => {
                this.engine.windowAttr.mousedown = clickable;
                await this.engine.audio.play('Button Down');
                option.classList.add('clicked');
            });

            let loading;
            if (option.id = 'story-mode') {
                loading = async () => {
                    this.engine.transitionFrameOutDisplay = () => {
                        this.engine.changeFacility(this.engine.plays.DomSection);
                    };
                };
            } else {
                loading = async () => {
                    
                }
            }

            clickable.customMethod = async () => {
                this.engine.windowAttr.mousedown = null;
                await this.engine.audio.play('Button Up');
                option.classList.remove('clicked');
                await pause(0.2);
                this.engine.transitionIn();
                loading();
            }
            clickable.removeClicked = () => {
                option.classList.remove('clicked');
            };
        });
        
        const quit = document.querySelector('#QuitButton > img');
        const setting = document.querySelector('#SettingsButton > img');
        quit.addEventListener('mousedown', async () => {
            this.engine.windowAttr.mousedown = quit;
            await this.engine.audio.play('Button Down');
            quit.classList.add('clicked');
        });
        quit.customMethod = async () => {
            this.engine.windowAttr.mousedown = quit;
            await this.engine.audio.play('Button Up');
            quit.classList.remove('clicked');
        }
        quit.removeClicked = () => {
            quit.classList.remove('clicked')
        }
        
        setting.addEventListener('mousedown', async () => {
            this.engine.windowAttr.mousedown = setting;
            await this.engine.audio.play('Button Down');
            setting.classList.add('clicked');
        });
        setting.customMethod = async () => {
            this.engine.windowAttr.mousedown = setting;
            await this.engine.audio.play('Button Up');
            setting.classList.remove('clicked');
            await pause(0.2);
            this.engine.transitionFrameOutDisplay = () => {
                this.engine.changeFacility(this.engine.settings.DomSection);
            };
            this.engine.transitionIn();
        }
        setting.removeClicked = () => {
            setting.classList.remove('clicked')
        }
        this.engine.mousedownOn();
    }
    settings() {
        if (this.game.settings.DomLoaded) {

        }
    }
    loadSetting() {

    }
}

async function no() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const htmlString = await response.text();

                // Create a temporary element to hold the HTML string
                const tempElement = document.createElement('div');
                tempElement.innerHTML = htmlString;

                // Extract and append stylesheets
                const stylesheets = tempElement.querySelectorAll('link[rel="stylesheet"]');
                stylesheets.forEach(stylesheet => {
                    document.head.appendChild(stylesheet.cloneNode(true));
                    stylesheet.remove(); // Remove the link tag from tempElement
                });

                // Extract and append scripts
                const scripts = tempElement.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    document.body.appendChild(newScript);
                    script.remove(); // Remove the script tag from tempElement
                });

                // Append the rest of the HTML content
                while (tempElement.firstChild) {
                    document.getElementById('content').appendChild(tempElement.firstChild);
                }

        // Append the fetched HTML content directly
        document.getElementById('content').insertAdjacentHTML('beforeend', htmlString);
    } catch (error) {
        console.error('Error fetching HTML:', error);
    }
}



function loadCSS(url) {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
        document.head.appendChild(link);
    });
}


async function loadResources() {
    try {
        const htmlPromise = loadHTML('path/to/your.html');
        const cssPromise = loadCSS('path/to/your.css');
        const jsPromise = loadScript('path/to/yourModule.js');
        const imagesPromise = loadImages(['path/to/image1.png', 'path/to/image2.png']);
        const audioPromise = loadAudios(['path/to/audio1.mp3', 'path/to/audio2.mp3']);
        
        await Promise.all([htmlPromise, cssPromise, jsPromise, imagesPromise, audioPromise]);

        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.transition = 'opacity 1s';
        loadingScreen.style.opacity = 0;
        setTimeout(() => loadingScreen.style.display = 'none', 1000);
        
        console.log('All resources loaded');
    } catch (error) {
        console.error('Error loading resources:', error);
    }
}