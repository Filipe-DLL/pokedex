import axios from "axios"
import { useEffect, useState } from "react"
import { ContainerAbilities } from "./style";

export function AbilitiesDetails(props) {

    console.log(props.props, 'props');

    const [abilities, setAbilities] = useState([])

    useEffect(() => {
        function getMoves() {
            axios.all(props.props.map(item => axios.get(item.ability.url))).then(response => setAbilities(response))
        }
        getMoves()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ContainerAbilities>
            <h1>Abilities:</h1>
            {console.log(abilities, 'Abilities')}
            {abilities.map((item) => (
                <div key={item.data.name}>
                    <h2>
                        {'- ' + item.data.name}
                    </h2>
                    <p>
                        {item.data.effect_entries[1].effect}
                    </p>
                </div>
            ))}
        </ContainerAbilities>
    )
}