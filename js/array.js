const inputNum = document.getElementById('inputNum');
const randomBtn = document.getElementById('randomBtn');
const addBtn = document.getElementById('addBtn');
const arrayDiv = document.getElementById('array');
const sortBtn = document.getElementById('sortBtn');
const sortedDiv = document.getElementById('sortedArray');
const groupsBtn = document.getElementById('groups');
const groupsDiv = document.getElementById('groupsDiv');
const smallDiv = document.getElementById('small');
const mediumDiv = document.getElementById('medium');
const largeDiv = document.getElementById('large');
import { bubbleSort, random } from "./functions.js";
const arr = [];
//add numbers
addBtn.addEventListener('click', () => {
    const num = Number(inputNum.value);
    arr.push(num);
    console.log(arr);
    localStorage.setItem('array', JSON.stringify(arr));
    inputNum.value = '';
    const array = localStorage.getItem('array') ?? "[]";
    const arrString = JSON.parse(String(array));
    arrayDiv.innerHTML = '<h6>Your Numbers: </h6> ';
    arrString.forEach(n => {
        arrayDiv.innerHTML += n + ', ';
    });
});
//random number:
randomBtn.addEventListener('click', () => {
    const y = random(0, 100);
    arr.push(y);
    localStorage.setItem('array', JSON.stringify(arr));
    const array = localStorage.getItem('array') ?? "[]";
    const arrString = JSON.parse(String(array));
    arrayDiv.innerHTML = '<h6>Your Numbers: </h6> ';
    arrString.forEach(n => {
        arrayDiv.innerHTML += n + ', ';
    });
});
//sort the numbers:
sortBtn.addEventListener('click', () => {
    const array = localStorage.getItem('array') ?? "[]";
    const arrString = JSON.parse(String(array));
    bubbleSort(arrString);
    sortedDiv.innerHTML = '<h6>Your Sorted Numbers: </h6> ';
    arrString.forEach(n => {
        sortedDiv.innerHTML += n + ', ';
    });
});
//sort by groups:
groupsBtn.addEventListener('click', () => {
    groupsDiv.innerHTML = '<h6>Sorted By Groups:</h6>';
    smallDiv.innerHTML = '<h6>Small: </h6>';
    mediumDiv.innerHTML = '<h6>Medium: </h6>';
    largeDiv.innerHTML = '<h6>Large: </h6>';
    const array = localStorage.getItem('array') ?? "[]";
    const arrString = JSON.parse(String(array));
    bubbleSort(arrString);
    arrString.forEach(n => {
        switch (true) {
            case (n <= 30):
                smallDiv.innerHTML += n + ', ';
                break;
            case (n > 30 && n <= 60):
                mediumDiv.innerHTML += n + ', ';
                break;
            case (n > 60):
                largeDiv.innerHTML += n + ', ';
                break;
        }
    });
});
