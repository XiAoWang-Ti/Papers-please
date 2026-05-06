export function builder(domType, id = null, classnames = null, textNode = null) {
    const element = document.createElement(domType);

    if (id) element.id = id;
    if (classnames) {
        if (Array.isArray(classnames)) {
            element.classList.add(...classnames);
        } else {
            element.className = classnames;
        }
    }
    if (textNode) element.textContent = textNode; 

    return element;
}

export function builder_v2 (json) {
    let element;
    try {
        if (json.domTag) {
            element = document.createElement(json.domTag);
            if (json.id) element.id = json.id;
            if (json.classname) {
                if (Array.isArray(json.classname)) {
                    element.classList.add(...json.classname);
                } else {
                    element.className = json.classname;
                }
            }
            switch (true) {
                case json.domTag === 'img' || json.domTag === 'audio' || json.domTag === 'video' : 
                        if (json.src) element.src = json.src;
                    break;
                case json.domTag === 'div':
                    if (json.text) element.textContent = text;
                    if (json.children) {
                        if (Array.isArray(json.children)) {
                            element.append(...json.children);
                        } else {
                            element.appendChild(json.children);
                        }
                    }
                    if (json.parent) json.parent.appendChild(element);
                    break;
                default:
                    break;
            }
        } else {
            throw new Error('missing html tag type')
        }
    } catch(error) {
        console.error('error ocured: ', error)
        element = false;
    } finally {
        return element
    }
}
export function stylesheetAppender(source, frombefore = null) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = source;
    if (frombefore) {
        document.head.insertBefore(link, frombefore);
    } else {
        document.head.appendChild(link)
    }
}