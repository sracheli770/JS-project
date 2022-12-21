import { runners_arr } from "./jsonArrs.js";
const animalDiv = document.getElementById('animal') as HTMLDivElement;
const readyBtn = document.getElementById('readyBtn') as HTMLButtonElement;
const goBtn = document.getElementById('goBtn') as HTMLButtonElement;
import { random } from "./functions.js";

const runners = runners_arr

interface AnimalType {
    name: string;
    id: string;
    voice: string;
    img: string;
    step: number;
}

class Animal implements AnimalType {
    name: string;
    id: string;
    voice: string;
    img: string;
    step: number;
    isChosen: boolean;
    translateX: number;

    constructor(name: string, id: string, voice: string, img: string, step: number, isChosen: boolean, translateX: number) {
        this.name = name;
        this.id = id;
        this.voice = voice;
        this.img = img;
        this.step = step;
        this.isChosen = isChosen;
        this.translateX = translateX;
    }
}

let animalArray: Animal[] = [];

for (let k in runners) {
    let key = k as keyof typeof runners;
    let animal = runners[key];
    animalArray.push(new Animal(animal.name, animal.id, animal.voice, animal.img, animal.step, false, 0))
}


let id: number;
function resetGame() {
    //remove chosen from all animals
    animalArray.forEach((a) => {
        a.isChosen = false;
        a.translateX = 0;
    })
    //remove the border from all img tags
    document.querySelectorAll('#animal img').forEach((img) => {
        img.classList.remove('chosen-animal')
    })
}


//show the images
animalArray
    .sort((a, b) => Math.random() > 0.5 ? 1 : -1)
    .map(animal => {
        const image = document.createElement('img');
        image.classList.add('col')
        image.src = `images/animals/${animal.img}`;
        image.id = animal.id;

        image.addEventListener('click', () => {
            //alert(animal.name)
        })
        return image;
    })
    .forEach((img) => {
        animalDiv.appendChild(img)
    })



//arange the animals to start the competition
readyBtn.addEventListener('click', () => {
    animalDiv.innerHTML = ''
    animalArray
        .map(animal => {
            const image = document.createElement('img');
            image.src = `images/animals/${animal.img}`;
            image.id = animal.id;
            return image;
        })
        .forEach((img) => {
            const div = document.createElement('div');
            div.classList.add('row');
            div.appendChild(img);
            animalDiv.appendChild(div);
        })
})



//start

goBtn.addEventListener('click', () => {
    resetGame();

    let chosenAnimal = animalArray[random(0, 4)];
    chosenAnimal.isChosen = true;

    const img = document.getElementById(chosenAnimal.id) as HTMLImageElement;
    img.classList.add('chosen-animal')

    setTimeout(() => {
        id = setInterval(() => {
            animalArray.forEach(animal => {
                if (animal.name !== 'horse')
                    animal.translateX = animal.translateX + animal.step * random(1, 4);
                else animal.translateX += animal.step;

                const animalImg = document.getElementById(animal.id) as HTMLImageElement;
                animalImg.style.transform = `translateX(${animal.translateX}px)`;


                if (
                    animalImg.getBoundingClientRect().x >
                    document.body.getBoundingClientRect().width
                ) {
                    clearInterval(id)

                    if (chosenAnimal.id === animal.id) {
                        alert(`Hi ${animal.name}, you are the winner!!`)
                    } else {
                        alert(`Hi ${chosenAnimal.name} we are sorry, the ${animal.name} won, try again`)
                    }
                }
            })
        }, 1000);

        setTimeout(() => {
            const audio = new Audio(`./media/${chosenAnimal.voice}.wav`)
            audio.play()
        }, 2000)

    }, 1000)
})

