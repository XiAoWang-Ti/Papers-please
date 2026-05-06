// import { Border } from "./border.mjs";

// window.addEventListener('load', () => {
//     let ui = null;
//     document.addEventListener('click', () => {
//         if (ui !== null) return;
//         ui = new Border();
//     })
// });

import { Border } from "./classes/border.mjs";

window.addEventListener('load', () => {
    let ui = null;
    document.addEventListener('click', () => {
        if (ui !== null) return;
        ui = new Border();
    })
});
