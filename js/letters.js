let titleRaw = "► DN MADe Numérique";
let letters = titleRaw.split("");

letters.forEach(letter => {
    let span = document.createElement("p");
    span.textContent = letter;
    document.getElementById("title").appendChild(span);
});




let title = document.getElementById("title");
let spans = title.getElementsByTagName("p");
let speed = 0.002;
let position = 0;

floatingAnimation();

function floatingAnimation() {
    let timer = setInterval(() => {
        position += speed;
        for (let i = 0; i < spans.length; i++) {
            spans[i].style.transform = `translateY(${Math.sin(position * i) * 50}px)`;
        }

        if (position >= Math.PI * 2) {
            position = 0;
            clearInterval(timer);
            for (let i = 0; i < spans.length; i++) {
                spans[i].style.transform = "";
            }
            setTimeout(() => changeLetterYSize(), 500);
        }
    }, 10);
}

function changeLetterYSize() {

    let timer = setInterval(() => {
        position += speed;
        for (let i = spans.length - 1; i >= 0; i--) {
            const height = `${Math.abs(Math.sin(position * i + Math.PI)) * 100 + 100}px`;
            spans[i].style.height = height;
            spans[i].style.lineHeight = height;
        }

        if (position >= Math.PI * 2) {
            position = 0;
            clearInterval(timer);
            for (let i = 0; i < spans.length; i++) {
                spans[i].style.height = "";
                spans[i].style.lineHeight = "";
            }
            setTimeout(() => rotateLetters(), 500);
        }
    }, 10);
}

function rotateLetters() {
    let timer = setInterval(() => {
        position += speed;
        for (let i = 0; i < spans.length; i++) {
            spans[i].style.transform = `rotate(${Math.sin(position * i) * 50}deg)`;
        }

        if (position >= Math.PI * 2) {
            position = 0;
            clearInterval(timer);
            for (let i = 0; i < spans.length; i++) {
                spans[i].style.transform = "";
            }
            setTimeout(() => changeLetterSize(), 500);
        }
    }, 10);
}

function changeLetterSize() {
    let timer = setInterval(() => {
        position += speed;
        for (let i = 0; i < spans.length; i++) {
            const size = `${Math.abs(Math.sin(position + i)) * 50 + 50}px`;
            spans[i].style.fontSize = size;
        }

        if (position >= Math.PI * 2) {
            position = 0;
            clearInterval(timer);
            for (let i = 0; i < spans.length; i++) {
                spans[i].style.fontSize = "";
            }
            setTimeout(() => scrambleLetters(), 500);
        }
    }, 10);
}

function scrambleLetters() {
    speed = 0.015;
    let timer = setInterval(() => {
        position += speed;
        for (let i = 0; i < spans.length; i++) {
            spans[i].style.transform = `translateX(${Math.sin(position + i) * 50}px) translateY(${Math.cos(position + i) * 50}px`;
        }

        if (position >= Math.PI * 4) {
            position = 0;
            speed = 0.002;
            clearInterval(timer);
            for (let i = 0; i < spans.length; i++) {
                spans[i].style.transform = "";
            }
            setTimeout(() => spreadLettersRandomly(), 500);
        }
    }, 10);
}

function spreadLettersRandomly() {
    function posLetterGen() {
        let positions = [];
        for (let i = 0; i < spans.length; i++) {
            positions.push(`translate(${Math.random() * 100 - 50}vw, ${Math.random() * 100 - 50}vh)`);
        }
        return positions;
    }

    for (let i = 0; i < spans.length; i++) {
        spans[i].style.transition = "transform 1s cubic-bezier(.87,.12,.16,.88)";
    }

    let timer = setInterval(() => {
        position += 1;
        const letterPositions = posLetterGen();
        for (let i = 0; i < spans.length; i++) {
            spans[i].style.transform = letterPositions[i];
        }
        
        if (position >= 5) {
            position = 0;
            clearInterval(timer);
            for (let i = 0; i < spans.length; i++) {
                spans[i].style.transform = `translate(0, 0)`;
            }

            setTimeout(() => {
                for (let i = 0; i < spans.length; i++) {
                    spans[i].style.transform = "";
                    spans[i].style.transition = "";
                }
                floatingAnimation();
            }, 1000);
        }
    }, 2000);
}