let cardNameList = [
    "Amandine",
    "Anaelle",
    "Henan",
    "Kali",
    "Kelly",
    "Lina",
    "Lola",
    "Louane",
    "Lucile",
    "Mathilde",
    "Nolhan",
    "Pauline",
    "Perrine",
    "Sara",
    "Sophia",
    "Thais",
    "Toni",
    "Valiavo"
];

function addCards() {
    let cards = document.getElementById("marquee-cards");
    cardNameList.forEach(cardName => {
        let card = document.createElement("div");
        let canvas = document.createElement("canvas");
        card.className = "card";
        canvas.className = "card-img";

        //draw image on canvas
        let ctx = canvas.getContext("2d");
        let image = new Image();
        image.src = "assets/imgs/" + cardName + ".jpg";
        image.onload = () => {
            const scaleFactor = 1.1;
            const offset = -50;

            canvas.width = image.width;
            canvas.height = image.height / 1.2;
            ctx.drawImage(image, offset, 0, image.width * scaleFactor, image.height * scaleFactor);

            //replace all pure white pixels with transparent pixels
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                if (data[i] == 255 && data[i + 1] == 255 && data[i + 2] == 255) {
                    data[i + 3] = 0;
                }
            }
            ctx.putImageData(imageData, 0, 0);

            //add white pixel given pixel touch (on any for side) a non-white pixel
            function isTouchingColor(data, i, width, color) {
                return data[i] == color[0] && data[i + 1] == color[1] && data[i + 2] == color[2];
            }
        };


        card.appendChild(canvas);
        cards.appendChild(card);
    });
}

function scrollCards() {
    let marquee = document.getElementById("marquee-cards");
    let cards = marquee.getElementsByClassName("card");
    let speed = 0.5;
    let position = 0;
    let timer = setInterval(() => {
        position += speed;
        marquee.scrollLeft = position;
        if (position >= cards[cards.length / 2].offsetLeft) {
            position = 0;
        }
    }, 10);
}


addCards();
addCards();

scrollCards();