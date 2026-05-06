import { builder, builder_v2 } from "../../tool/elementCreator.mjs";
export class bulletin {
    constructor(console) {
        this.console = console;
        this.currPage = 0;
        this.bulletinOuter = document.getElementById('bulletin');
        this.bulletinInner = null,
        this.buildUp();
    }
    buildUp() {
        const firspage = builder_v2({domTag: 'img',
            id: 'bulletinInnerBody',
            src: '../assets/papers/BulletinInner.png'
        });
        
        const prev = builder_v2({domTag: 'img',
            id: 'bulletinPrev',
            classname: 'interactable',
            src: '../assets/papers/BulletinGoPrev.png'
        });

        const next = builder_v2({domTag: 'img',
            id: 'bulletinNext',
            classname: 'interactable',
            src: '../assets/papers/BulletinGoNext.png'
        });

        this.bulletinInner = builder_v2({domTag: 'div',
            id: 'bulletinInner',
            children: [firspage, prev, next],
            parent: document.getElementById('bulletinInnerWrapper')
        });
    }
    prevPage() {

    }
    nextPage() {

    }
}