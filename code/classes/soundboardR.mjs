export class soundBoard {
    constructor(settings) {
        this.settings = settings
        this.audioFiles = {
            sound: new Map(),
            music: new Map()
        }
        this.onPlay = new Map();
    }

    // Exp_play(track, onLoop = false) { --------- !
    //     if (onLoop) {

    //     } else {
            
    //     }
    // }

    // play, one time only. playAmbient looping for bmg, need to chnage
    play(audio) {
        const sfx = this.audioFiles.sound.get(audio);
        sfx.volume = this.settings.getSoundVolume();
        sfx.play();
    }
    playAmbient(audio) {
        const bgm = this.audioFiles.music.get(audio);
        bgm.volume = this.settings.getMusicVolume();
        // bgm.loop = true;
        bgm.addEventlistener('ended', () => {
            bgm.currentTime = 0; // Reset playback to the start
            bgm.play(); // Play the audio again
        });
        bgm.play();
    }
    async preloadIntoMemory(packatge) {
        async function load(disc, storage) {
            disc.files.forEach(file => {
                const sfx = new Audio();
                sfx.src = disc.root + file;
                sfx.volume = 1;
                sfx.preload = 'auto';
                sfx.load();
                const audioName = file.replace(/^\d{1,2}\.\s|\.\w+$/g, '').trim();
                storage.set(audioName, sfx);
            });
        } 
        if (packatge.sound) load(packatge.sound, this.audioFiles.sound);
        if (packatge.music) load(packatge.music, this.audioFiles.music);
    }
}