import { builder_v2 } from "../../tool/elementCreator.mjs";
const jsonData = {
    homepage: '../assets/papers/RulesInnerHome.png',
    pages: {
        page1: '',
        page2: '',
    },
    interaction: {
        home: '../assets/papers/RulesGoHome.png',
        prev: '../assets/papers/RulesGoPrev.png',
        next: '../assets/papers/RulesGoNext.png'
    }
}

export class ruleBook {
    constructor(console) {
        this.console = console;
        this.currPage = 0;
        this.ruleBookOuter = document.getElementById('ruleBook');
        this.ruleBookInner = null;

        this.buildUp(jsonData);
    }
    goHome() {

    }
    prevPage() {

    }
    nextPage() {

    }
    buildUp(jsonData) {
        const homepage = builder_v2({
            domTag: 'img',
            id: 'bulletinInnerBody',
            src: '../assets/papers/RulesInnerHome.png'
        })

        const home = builder_v2({ domTag: 'img',
            id: 'rulesHome',
            classname: 'interactable',
            src: '../assets/papers/RulesGoHome.png'            
        });

        const prev = builder_v2({ domTag: 'img',
            id: 'rulesPrev',
            classname: 'interactable',
            src: '../assets/papers/RulesGoPrev.png'            
        });

        const next = builder_v2({ domTag: 'img',
            id: 'rulesNext',
            classname: 'interactable',
            src: '../assets/papers/RulesGoNext.png'            
        });

        this.ruleBookInner = builder_v2({ domTag: 'div',
            id: 'rulesInner',
            classname: 'home',
            children: [homepage, home, prev, next],
            parent: document.getElementById('rulesInnerWrapper')
        })
    }
}