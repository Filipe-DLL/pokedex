import { ButtonCarregarMais } from "../Button/ButtonLoadMore/ButtonLoadMore";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme-context";
import { Li, Lista } from "./style";


export function Cards(props) {
    
    const { theme } = useContext(ThemeContext)

    return (
        <div>

            <Lista>
                {props.pokemons.map((pokemon) => (
                    <Li key={pokemon.data.name} theme={theme} type={pokemon.data.types[0].type.name}>
                        <Link to={`pokemon/${pokemon.data.id}`}>
                            <img width={200} src={pokemon.data.sprites.front_default} alt={`imagem do ${pokemon.data.name}`} />
                            <h2>{pokemon.data.name}</h2>
                        </Link>
                    </Li>
                ))}
            </Lista>

            <ButtonCarregarMais carregarMais={props.carregarMais} />

        </div>
    )
}