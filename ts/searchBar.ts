const cityInput = document.getElementById('city') as HTMLInputElement;
const sendBtn = document.getElementById('btn') as HTMLButtonElement;
const instructions = document.getElementById('instructions') as HTMLDivElement;
const search = document.getElementById('search') as HTMLInputElement;
const citiesUl = document.querySelector('.city-list') as HTMLInputElement;
const clickedCity = document.getElementById('clicked') as HTMLDivElement;
const savedBtn = document.getElementById('saved') as HTMLButtonElement;
const showSavedCities = document.getElementById('showSavedCities') as HTMLDivElement;


const citiesList: string[] = [];

sendBtn.addEventListener('click', () => {
    const c = cityInput.value;
    if (!citiesList.includes(c)) {
        citiesList.push(c);
    }

    citiesList.sort();
    localStorage.setItem('Cities', JSON.stringify(citiesList));
    cityInput.value = ''
})


search.addEventListener('input', () => {
    localStorage.getItem('Cities');
    document.querySelectorAll('.city-item').forEach(e => e.remove());
    const searchValue = search.value.toLowerCase();
    if (searchValue.length === 0) {
        return;
    }


    instructions.innerHTML = '<h6> Click the city you are interested in to continue👆</h6><br><h6 class="mt-1"> Click the city you chose to save👇</h6>'

    const filteredCities = citiesList.filter(c => c.toLowerCase().startsWith(searchValue));
    const liArray = filteredCities.map(c => {
        const li = document.createElement('li');
        li.classList.add('city-item');
        li.innerHTML = c;


        //save cities
        const saved: string[] = [];
        li.addEventListener('click', () => {
            li.style.color = 'red'
            clickedCity.innerText = c
            saved.push(c);
            saved.sort();
        })
        return li;
    })

    liArray.forEach(li => citiesUl.appendChild(li))
})



//click to save
const saved: string[] = []
clickedCity.addEventListener('click', () => {
    const a = clickedCity.innerText;
    if (!saved.includes(a)) {
        saved.push(a);
    }
    saved.sort();
    localStorage.setItem('Saved Cities', JSON.stringify(saved))
})


savedBtn.addEventListener('click', () => {
    const saved = localStorage.getItem('Saved Cities') ?? "[]";
    const savedString: string[] = JSON.parse(String(saved))
    showSavedCities.innerHTML = '<h6>Your Cities List:</h6> <br>'
    savedString.forEach(c => {
        showSavedCities.innerHTML += c + '<br>'
    });
})