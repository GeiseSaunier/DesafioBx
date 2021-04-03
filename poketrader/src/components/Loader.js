import React, { useContext } from 'react'
import { Typography, Modal, CircularProgress } from '@material-ui/core'
import { LoaderContext } from '../data/contexts/LoaderContext'

export default function Loader() {
    const { isLoading, setIsLoading } = useContext(LoaderContext)
    return (
        <Modal
            open={isLoading}
            onClose={() => setIsLoading(false)}
            className="d-flex justify-content-center align-items-center h-100"
        >
            <div className="bg-white d-flex align-items-center rounded-lg p-3 outline-none">
                <CircularProgress size={20} className="mr-3" />
                <Typography variant="subtitle1">Carregando...</Typography>
            </div>
        </Modal>
    )
}
