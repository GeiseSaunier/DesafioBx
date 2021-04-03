import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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

export default function PokemonCard({ id }) {
    const [info, setInfo] = useState({});
    const classes = useStyles();

    const get = async () => {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        var pokemon =
        {
            id: id,
            name: result.data.name,
            base_experience: result.data.base_experience,
            image: result.data.sprites.other['official-artwork'].front_default,
        }
        setInfo(pokemon);
    }

    useEffect(() => {
        get();
    }, [])
    console.log(info.image)
    return (
        <Card className={classes.root} key={String(info.id)}>
            <CardActionArea>
                <img src={info.image} alt="" className={classes.media} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {info.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Base Experience: {info.base_experience}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
