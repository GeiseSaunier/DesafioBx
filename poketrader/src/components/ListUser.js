import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import Modal from '@material-ui/core/Modal';
import PokemonCard from './PokemonCard'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        maxWidth: 345,
        marginBottom: 10,
        backgroundColor: '#fAfAfA'
    },
    media: {
        width: 140,
        height: 140,

    },
}));

export default function ListUser({ user }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [modalStyle] = React.useState(getModalStyle);


    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            height: '80%',
            weight: '80%',
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className={classes.root} key={String(user.id)}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.name}
                    </Typography>
                    <div className="d-flex justify-content-center align-items-center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className="mt-4 mb-4 mr-2"
                            onClick={() => {
                                if (!user.pokemons) {
                                    alert("Esse usuário não possui pokemons")
                                }
                                else {
                                    handleOpen();
                                }


                            }}
                        >
                            Ver Pokemons
                    </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className="mt-4 mb-4"
                            onClick={() => {
                                if (!user.pokemons) {
                                    alert("Esse usuário não possui pokemons")
                                }
                                else {
                                    alert("Esse usuário possui pokemons")
                                }


                            }}
                        >
                            Propor Troca
                    </Button>
                    </div>
                </CardContent>
            </CardActionArea>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={{
                    top: '10%',
                    left: '25%',
                    width: '50%'
                }} className={classes.paper}>
                    <h2 id="simple-modal-title">Pokemons</h2>
                    <div className="d-flex align-items-center justify-content-center">
                        <div>
                            {user.pokemons.map((id, index) => {
                                if (index < 2) {
                                    return <PokemonCard id={id} />
                                }
                            })}
                        </div>
                        <div>
                            {user.pokemons.map((id, index) => {
                                if (index >= 2 && index < 4) {
                                    return <PokemonCard id={id} />
                                }
                            })}
                        </div>
                        <div>
                            {user.pokemons.map((id, index) => {
                                if (index >= 4 && index < 6) {
                                    return <PokemonCard id={id} />
                                }
                            })}
                        </div>
                    </div>
                </div>

            </Modal>
        </Card>
    )
}
