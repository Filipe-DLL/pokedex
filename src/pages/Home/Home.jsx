import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ButtonTheme } from "../../components/Button/ButtonTheme/ButtonTheme";
import { Cards } from "../../components/Cards/Cards";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { ThemeContext } from "../../context/theme-context";
import { Header, HomeContainer } from "./style";

export function Home() {

    const { theme } = useContext(ThemeContext)

    const [allPokemons, setAllPokemons] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [cont, setCont] = useState(10)



    useEffect(() => {
        getAllPokemons()
        getPokemons(cont)
    }, [cont])

    function getAllPokemons() {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0').then(response => setAllPokemons(response))
    }

    function getPokemons(cont) {
        let linkList = []
        for (let i = 1; i <= cont; i++) {
            linkList.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        setPokemons([])
        axios.all(linkList.map(link => axios.get(link))).then(response => setPokemons(response))
    }

    function pokemonFilter(name) {
        if (name !== '') {
            let filteredPokemons = []
            for (let i in allPokemons.data.results) {
                if (allPokemons.data.results[i].name.includes(name)) {
                    filteredPokemons.push(allPokemons.data.results[i])
                }
            }
            axios.all(filteredPokemons.map(item => axios.get(item.url))).then(response => setPokemons(response))
        } else {
            getPokemons(cont)
        }

    }

    function carregarMais() {
        setCont((cont + 10))
    }

    return (
        <>
            {pokemons && (
                <HomeContainer theme={theme}>
                    <Header >
                        <SearchBar pokemonFilter={pokemonFilter} />
                        <ButtonTheme />
                    </Header>
                    <Cards pokemons={pokemons} carregarMais={carregarMais} />
                </HomeContainer>
            )}
        </>
    )
}