const inputNum = document.getElementById('inputNum') as HTMLInputElement;
const randomBtn = document.getElementById('randomBtn') as HTMLButtonElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const arrayDiv = document.getElementById('array') as HTMLDivElement;
const sortBtn = document.getElementById('sortBtn') as HTMLButtonElement;
const sortedDiv = document.getElementById('sortedArray') as HTMLDivElement;
const groupsBtn = document.getElementById('groups') as HTMLButtonElement;
const groupsDiv = document.getElementById('groupsDiv') as HTMLDivElement;
const smallDiv = document.getElementById('small') as HTMLDivElement;
const mediumDiv = document.getElementById('medium') as HTMLDivElement;
const largeDiv = document.getElementById('large') as HTMLDivElement;
import { bubbleSort, random } from "./functions.js";

const arr: number[] = [];

//add numbers
addBtn.addEventListener('click', () => {
    const num: number = Number(inputNum.value);
    arr.push(num);
    console.log(arr);
    localStorage.setItem('array', JSON.stringify(arr))
    inputNum.value = '';

    const array = localStorage.getItem('array') ?? "[]";
    const arrString: string[] = JSON.parse(String(array));
    arrayDiv.innerHTML = '<h6>Your Numbers: </h6> '
    arrString.forEach(n => {
        arrayDiv.innerHTML += n + ', ';
    })
})

//random number:
randomBtn.addEventListener('click', () => {
    const y = random(0, 100)
    arr.push(y)
    localStorage.setItem('array', JSON.stringify(arr))
    const array = localStorage.getItem('array') ?? "[]";
    const arrString: number[] = JSON.parse(String(array));
    arrayDiv.innerHTML = '<h6>Your Numbers: </h6> '
    arrString.forEach(n => {
        arrayDiv.innerHTML += n + ', ';
    })
})

//sort the numbers:
sortBtn.addEventListener('click', () => {
    const array = localStorage.getItem('array') ?? "[]";

    const arrString: number[] = JSON.parse(String(array));
    bubbleSort(arrString);
    sortedDiv.innerHTML = '<h6>Your Sorted Numbers: </h6> '
    arrString.forEach(n => {
        sortedDiv.innerHTML += n + ', ';
    })
})


//sort by groups:
groupsBtn.addEventListener('click', () => {
    groupsDiv.innerHTML = '<h6>Sorted By Groups:</h6>';
    smallDiv.innerHTML = '<h6>Small: </h6>';
    mediumDiv.innerHTML = '<h6>Medium: </h6>';
    largeDiv.innerHTML = '<h6>Large: </h6>';

    const array = localStorage.getItem('array') ?? "[]";

    const arrString: number[] = JSON.parse(String(array));
    bubbleSort(arrString);
    arrString.forEach(n => {
        switch (true) {
            case (n <= 30):
                smallDiv.innerHTML += n + ', '
                break;

            case (n > 30 && n <= 60):
                mediumDiv.innerHTML += n + ', '
                break;

            case (n > 60):
                largeDiv.innerHTML += n + ', '
                break;
        }
    })

})
