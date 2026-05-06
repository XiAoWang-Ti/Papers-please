import { pause } from "./delayer.mjs";
export async function write(element, font_style, text, soundeffects, speed = 0.05) {
    if (font_style) element.classList.add(font_style);
    let queue = text.split("");

    while (queue.length) {
        let char = queue.shift();
        let textNode = document.createTextNode(char);
        element.appendChild(textNode);
        if (char === ",") {
            await pause(0.5);
        } else {
            await pause(speed);
        }
    }
    return;
}
export async function unwrite() {

}