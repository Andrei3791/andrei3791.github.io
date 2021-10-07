const btn = document.querySelector('#btn');
btn.addEventListener('click', go);

function go() {
    showCircle(150, 150, 100, div => {
        div.classList.add('message');
        div.append('Callback!');
    });
    GO(400, 150, 100).then(div => {
        div.classList.add('message');
        div.append('Promise!');
    });
}

function showCircle(x, y, radius, callback) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    div.className = 'circle';
    document.body.append(div);

    setTimeout(() => {
        div.style.width = radius * 2 + 'px';
        div.style.height = radius * 2 + 'px';
        div.addEventListener('transitionend', function handler() {
            div.removeEventListener('transitionend', handler);
            callback(div);
        });
    });
}

function GO(x, y, radius) {
    return new Promise((resolve, reject) => {
        let div = document.createElement('div');
        div.style.width = 0;
        div.style.height = 0;
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.className = 'circle';
        document.body.append(div);

        setTimeout(
            () => {
                div.style.width = radius * 2 + 'px';
                div.style.height = radius * 2 + 'px';
                div.addEventListener('transitionend', function handler() {
                    div.removeEventListener('transitionend', handler);
                    resolve(div);
                });
            });
    })
};

// function loadScript(src) {
//     return new Promise((resolve, reject) => {
//         let script = document.createElement('script');
//         script.src = src;
//         document.head.append(script);
//         script.onload = () => resolve(script.src);
//         script.onerror = () => reject(new Error('error loading scropt'));
//     });
// }
// let promiseScript = loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js');
// promiseScript.then(script => alert(script), error => alert(error));

class Thenable {
    constructor(value) {
        this.value = value;
    }
    then(resolve, reject) {
        setTimeout(() => resolve(this.value * 2), 2000);
    }
}

new Promise(resolve => resolve(1)).then(result => new Thenable(result)).then(alert);