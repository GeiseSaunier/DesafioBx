import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { UserContext } from '../../data/contexts/UserContext'
import { Button } from '@material-ui/core'
import firebase from "firebase/app";
import "firebase/auth";
import PokemonArea from '../../components/PokemonArea';
import ListUser from '../../components/ListUser';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const { user, setCurrentUser } = useContext(UserContext)
    const [usuarios, setUsuarios] = useState([]);

    const logout = () => {
        firebase.auth().signOut().then(() => {
            setCurrentUser({});
        }).catch((error) => {
        });
    }

    useEffect(() => {
        firebase.firestore().collection('users').onSnapshot((snap) => {
            let users = snap.docs.map((user) => {
                return user.data()
            })
            setUsuarios(users);
        });

    }, [])

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <div className="w-75">
                                {user && <h1>Bem vindo {user.name}</h1>}
                            </div>
                            <div className="w-25">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className="mt-4 mb-4"
                                    onClick={logout}
                                >
                                    Sair
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <PokemonArea />
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <h5>Pedidos de troca</h5>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <h5>Usu??rios</h5>
                        {
                            usuarios.length > 0 ?
                                <div>
                                    {
                                        usuarios.map((usuario) => {
                                            if (usuario.id != user.id)
                                                return <ListUser user={usuario} />
                                        })
                                    }
                                </div>
                                : null
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>




    )
}




