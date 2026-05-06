export class soundBoard {
    constructor(settings) {
        this.settings = settings;
        this.audioAdministrator = new AudioContext(); // main audio element, its in charge to deliver the sound
        // audioFiles will store the audio content - mainly buffers
        this.audioFiles = { 
            sound: new Map(),
            music: new Map()
        }
        this.playingAudio = new Map(); // playing audio will store the current sound in reproduction

        this.SoundVolume = this.audioAdministrator.createGain();
        this.SoundVolume.gain.value = this.settings.Sound;
        this.SoundVolume.connect(this.audioAdministrator.destination);

        this.MusicVolume = this.audioAdministrator.createGain();
        this.MusicVolume.gain.value = this.settings.Music;
        this.SoundVolume.connect(this.audioAdministrator.destination)

    }


    play(audio) {
        const sfx = this.audioFiles.sound.get(audio);
        const source = this.audioAdministrator.createBufferSource();
        source.buffer = sfx;
        source.connect(this.SoundVolume); // Connect to the pre-connected gainNode
        source.start(0); // Start playing immediately
    }

    // play, one time only. playAmbient looping for bmg, need to chnage
    playRecovery(audio) {

        const sfx = this.audioFiles.sound.get(audio);
        sfx.volume = this.settings.getSoundVolume();
        sfx.play();
    }
    playAmbient(audio) {
        const bgm = this.audioFiles.music.get(audio);
        // bgm.volume = this.settings.getMusicVolume();
        // bgm.loop = true;
        // bgm.addEventlistener('ended', () => {
        //     bgm.currentTime = 0; // Reset playback to the start
        //     bgm.play(); // Play the audio again
        // });
        // bgm.play();
        const source = this.audioAdministrator.createBufferSource();
        source.buffer = bgm;
    
        // Step 5: Connect the source to the destination (speakers)
        source.connect(this.audioAdministrator.destination);
    
        // Step 6: Play the audio
        source.start(0);
    }
    async preloadIntoMemory(packatge) {
        const audioAdministratorPointer = this.audioAdministrator;
        async function load(disc, storage) {
            disc.files.forEach(file => {
                // const sfx = new Audio();
                // sfx.src = disc.root + file;
                // sfx.volume = 1;
                // sfx.preload = 'auto';
                // sfx.load();
                loadAudio(storage, disc.root + file);
            });
        } 
        console.log('starting');
        if (packatge.sound) await load(packatge.sound, this.audioFiles.sound);
        if (packatge.music) await load(packatge.music, this.audioFiles.music);
        // ------------- // 
        async function loadAudio(storageUnit, file) {
            // console.log('starting to decode file: ', file)
            const response = await fetch(file);
            const arrayBuffer = await response.arrayBuffer();
            let audioBuffer = await audioAdministratorPointer.decodeAudioData(arrayBuffer); 
            console.log("returning ", audioBuffer);
            const fileName = file.split('/').pop().split('\\').pop(); 
            const audioName = fileName.replace(/^\d{1,2}\.\s|\.\w+$/g, '').trim();
            console.log(audioName)
            storageUnit.set(audioName, audioBuffer);
            
            return;
        }

        // async function loadAudio(file) {
        //     try {
        //         const response = await fetch(file);
                
        //         // Validar si el archivo existe antes de procesar
        //         if (!response.ok) throw new Error(`Error al cargar el archivo: ${response.statusText}`);
        
        //         const arrayBuffer = await response.arrayBuffer();
                
        //         // El método decodeAudioData moderno devuelve una Promesa, 
        //         // pero algunos navegadores antiguos requerían callbacks. 
        //         // Esta sintaxis es la correcta para estándares actuales:
        //         const audioBuffer = await audioAdministratorPointer.decodeAudioData(arrayBuffer); 
                
        //         return audioBuffer;
        //     } catch (error) {
        //         console.error("Error en loadAudio:", error);
        //         return null; // O maneja el error según tu lógica
        //     }
        // }

    }
}

class audioTrack {
    constructor(parent, track, soundVolume, isBgm = false) {
        this.cleaner = parent
        this.audioPlayer = new AudioContext();
        this.onLoop = isBgm;
        this.play(track, soundVolume)
    }
    play(sound, volume) {
        
    }

    changeVolume() {

    }

    clearAudioOnEnd() {
        if (this.parent.playingAudio.has(this)) {
            this.parent.playingAudio.delete(this);
        } else {
            console.error('audio not found');
        }
    }
}