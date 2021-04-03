import React, { useState, useEffect } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { Redirect } from 'react-router-dom';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function Login() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const cadastrar = () => {
        try {
            firebase.auth().createUserWithEmailAndPassword(email, senha).then((data) => {
                firebase.firestore().collection("users")
                    .doc(data.user.uid)
                    .set({
                        id: data.user.uid,
                        name: nome,
                        email: email,
                    });
            })
        }
        catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('Email já cadastrado');
                    return;
            }
        }
    }

    useEffect(() => {
        setNome("");
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
                            label="Nome"
                            type="text"
                            margin="normal"
                            value={nome}
                            onChange={text => setNome(text.target.value)}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            autoComplete="email"
                            margin="normal"
                            value={email}
                            onChange={text => setEmail(text.target.value)}
                            autoComplete="off"
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
                            onClick={cadastrar}
                        >
                            Cadastrar
                        </Button>
                        {/*  {
                            (success) && <Redirect to="/vehicles" />
                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}
