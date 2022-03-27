const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeMoves = document.querySelector('[data-poke-moves]');


//diccionario de los colores para los tipos de los pokemones
const typeColors=
{
    electric: '#ffEA70',
    normal: '#B09398',
    fighting: '#2F2F2f',
    steel: '#1D8A99',
    dragon: '#DA627D',
    ground: '#D2B074',
    poison: '#795663',
    bug: '#A2FAA3',
    ghost: '#561D25',
    psychic: '#FFC6D9',
    grass: '#4A9623',
    flying: '#7AE',
    rock: '#999799',
    ice: '#AFEAFD',
    dark: '#000',
    water: '#0596E2',
    fire: '#FF675C',
    fairy: '#ffC6B2',
    default: '#2A1A1F',
};

//crear la funcion q buscara en la api y nos dara los datos del pokemon
const searchpokemon = event =>{
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
}

//conseguir los datos del pokemon
const renderPokemonData = data =>{
    const sprite = data.sprites.front_default;
    const{stats,types,moves} = data;
    
    //asignar nombres a las variables
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src',sprite);
    pokeId.textContent = `Num ${data.id}`;
    setcardcolor(types);
    renderpokemontypes(types);
    renderpokemonstats(stats);
    renderpokemonmoves(moves);
}

//renderizar el color de fondo de la imagen segun los tipos
const setcardcolor = types =>{
    const colorOne = typeColors[types[0].type.name];
    const colortwo = types[1]? typeColors[types[1].type.name]:typeColors.default;
    pokeImg.style.background = `radial-gradient(${colortwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '5px 5px'
}
//renderizar los tipos del pokemon
const renderpokemontypes = types =>{
    pokeTypes.innerHTML = '';
    types.forEach(type => 
        {
            const typeTextElement = document.createElement("div");
            typeTextElement.style.color = typeColors[type.type.name];
            typeTextElement.textContent=type.type.name
            pokeTypes.appendChild(typeTextElement);
        });
}

//renderizar los stats del pokemon
const renderpokemonstats = stats =>{
    pokeStats.innerHTML='';
    stats.forEach(stat =>
        {
            const statElement = document.createElement("div");
            const statElementName = document.createElement("div");
            const statElementnum = document.createElement("div");
            statElementName.textContent = stat.stat.name;
            statElementnum.textContent = stat.base_stat;
            statElement.appendChild(statElementName);
            statElement.appendChild(statElementnum);
            pokeStats.appendChild(statElement);
        });
} 

const renderpokemonmoves = moves =>{
    pokeMoves.innerHTML='';
    moves.forEach(move =>
        {
            const moveElement = document.createElement("div");
            moveElement.textContent = move.move.name;
            pokeMoves.appendChild(moveElement);
        });

}