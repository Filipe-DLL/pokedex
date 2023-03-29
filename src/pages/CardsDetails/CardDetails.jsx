import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AbilitiesDetails } from '../../components/AbilitiesDetails/AbilitiesDetails';
import { MovesDetails } from '../../components/MovesDetails/MovesDetails';
import { PokemonDetails } from '../../components/PokemonDetails/PokemonDetails';
import { BackButton, Container, DetailsCard, PokemonHeader, PokemonSection } from './style';
import { FaAngleLeft } from 'react-icons/fa'
import { ThemeContext } from '../../context/theme-context';
import { ButtonTheme } from '../../components/Button/ButtonTheme/ButtonTheme';

export function CardDetails() {

  const { id } = useParams()

  const [pokemon, setPokemon] = useState([])
  const [abilities, setAbilities] = useState([])
  const [moves, setMoves] = useState([])
  const { theme, temaAnterior } = useContext(ThemeContext)

  useEffect(() => {
    function getPokemon() {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((response) => {
        setPokemon(response)
        setAbilities(response.data.abilities)
        setMoves(response.data.moves)
      })
    }
    getPokemon()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DetailsCard theme={theme}>

      {pokemon.data && (

        <Container>
          <BackButton >
            <Link to={'/'}>
              <FaAngleLeft style={{color: `${temaAnterior.background}`,}} />
            </Link>
          </BackButton>
            <ButtonTheme />
          <PokemonHeader>
            <PokemonDetails props={pokemon.data} />
          </PokemonHeader>
          <div>
            <PokemonSection>
              <AbilitiesDetails props={abilities} />
              <MovesDetails props={moves} />
            </PokemonSection>
          </div>
        </Container>

      )}
    </DetailsCard>
  )
}