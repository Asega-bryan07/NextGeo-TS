"use client"

import { useEffect, useState } from "react";
import { CreateServerModal } from "../modals/create-server-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    // preventing the models to be rendered on the server side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <>
        <CreateServerModal />
        </>
    )
}