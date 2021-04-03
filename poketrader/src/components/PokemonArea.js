import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { UserContext } from '../data/contexts/UserContext'
import { Button } from '@material-ui/core'
import Switch from '@material-ui/core/Switch';
import firebase from "firebase/app";
import PokemonCard from './PokemonCard'
import "firebase/auth";



const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function PokemonArea() {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const [state, setState] = React.useState({
        checked: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const gerar_pokemons = async () => {
        const array_ids = [...Array(6)].map(() => Math.floor(Math.random() * 898));
        firebase.firestore().collection('users').doc(user.id).update(
            {
                pokemons: array_ids,
            }
        )
    }

    return (
        <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
                <div className="d-flex flex-row justify-content-xl-between justify-content-between" >
                    <h4 className="mb-3">Meus Pokemons</h4>
                    <Switch
                        checked={state.checked}
                        onChange={handleChange}
                        name="checked"
                        color="primary"
                    />
                </div>
                {
                    user.pokemons == undefined ? <div>
                        <p>Você ainda não possui pokemons.</p>
                        <p>Clique em caçar para obter seus pokemons.</p>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className="mt-4 mb-4"
                            onClick={gerar_pokemons}
                        >
                            Caçar Pokemons
                        </Button>
                    </div> : null
                }

                {
                    state.checked && user.pokemons && user.pokemons.map((id) => <PokemonCard id={id} />)
                }






            </Paper>
        </Grid>
    )
}
