import React, { useState, useEffect, useContext } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Redirect, Link } from 'react-router-dom';
import { LoaderContext } from '../../data/contexts/LoaderContext'
import firebase from "firebase/app";
import "firebase/auth";


const RegisterButton = withStyles({
    root: {
        color: "#FFF",
        backgroundColor: "#27a745",
        '&:hover': {
            backgroundColor: "#218838"
        }
    }
})(Button);


export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { setIsLoading } = useContext(LoaderContext);

    const login = () => {
        setIsLoading(true);
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                setIsLoading(false);
                var errorMessage = error.message;
                alert(errorMessage);

            });
    }

    useEffect(() => {
        setSenha("");
        setEmail("");
    }, [])

    return (
        <div className="d-flex bg-white min-vh-100">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="form-group text-center">
                        <Typography className="mt-3" variant="h6" component="h1">
                            Plataforma para troca de pokemons
                        </Typography>
                        <TextField
                            label="Email"
                            type="email"
                            autoComplete="email"
                            margin="normal"
                            value={email}
                            onChange={text => setEmail(text.target.value)}
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            autoComplete="normal"
                            margin="normal"
                            value={senha}
                            onChange={text => setSenha(text.target.value)}
                            autoComplete="new-password"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            className="mt-4 mb-4"
                            onClick={login}
                        >
                            Entrar
                        </Button>
                        <RegisterButton
                            component={Link}
                            to="/cadastro"
                            variant="contained"
                            fullWidth
                            size="large"
                            className="mt-4 mb-4"
                        >
                            Cadastrar
                        </RegisterButton>

                    </div>
                </div>
            </div>
        </div>
    )
}
