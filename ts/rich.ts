import { json_arr } from "./jsonArrs.js";

const cardsDiv = document.getElementById('cardsDiv') as HTMLDivElement;

let arr = json_arr

arr.map(r => {
    const cardDiv = document.createElement('div');

    cardDiv.innerHTML +=
        `
<div class="card m-3" style="width: 18rem">
   <img src=../images/rich/${r.image} class="card-img-top" alt = "${r.name}">
   <div class="card-body" >
      <h5 class="card-title" >${r.name} </h5>
      <p class="card-text" > Worth: ${r.worth} <br> Source: ${r.source} <br> Country: ${r.country} <br>Birth Year: ${r.birth_year}</p>        
   </div>
</div>
`
    cardsDiv.appendChild(cardDiv);

    cardDiv.addEventListener('click', () => {
        cardDiv.replaceChildren()
        arr = json_arr.filter(o => o !== r);
    })
})