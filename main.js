const website = "https://frapollif.github.io/pet-adoption-data"

async function getPetsData() {
    const data = await fetch(`${website}/pets.json`)
    const petsdata = await data.json()
    return petsdata 
}

function calcAge(date_of_birth){
    const t = new Date();
    const current_year = t.getFullYear();
    const age = current_year - date_of_birth;

    return age
}


async function displayPets(){

    const pets = await getPetsData();
    const template = document.querySelector('#animal-card-template')
    const wrapper = document.querySelector('main')
    console.log(template)
    
    pets.forEach( pet =>{
        const clone = template.content.cloneNode(true)

        // qui modifichiamo il template
        const name = clone.querySelector(".animal-card-text h1");
        name.textContent = pet.name;

        const text = clone.querySelector(".animal-card-text p"); 
        text.textContent = pet.description;
     
        const image = clone.querySelector('.animal-card-photo img') 
        image.src = pet.photo;
        
        const specie = clone.querySelector(".Specie");
        const firstletter = pet.species.charAt(0)
        const firstLetterCap = firstletter.toUpperCase()
        const remainingLetters = pet.species.slice(1)
        const capitalizedWord = firstLetterCap + remainingLetters
        specie.textContent = capitalizedWord

        // const buttonname = clone.querySelector("adopt-button")
        
        const age = clone.querySelector(".Age");
        const Age = calcAge(pet.birthYear);
        if (Age < 1){
            age.textContent = `less than one year old`;
        }
        else if (Age == 1){
            age.textContent = `${Age} year old`;
        }
        else {
            age.textContent = `${Age} years old`;
        }

        //aggiungiamo l'articolo alla pagina
        wrapper.appendChild(clone)
        
    
       }
    )

}

displayPets()

function displayFiltersAnimals (e) {
    console.log(e.target.dataset.displayFiltersAnimals);

}
const filterButtons = document.querySelectorAll("nav buttons");

filterButtons.forEach(button =>{
    button.addEventListener('click', (e) => {
        displayFiltersAnimals(e)
    })
});

