"use client"

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect } from "react";

export default function PayButton( { preferendeId }: { preferendeId: string } ) {

    useEffect(() => {
        initMercadoPago("TEST-15931235-62d0-42e1-94ea-4206fe2599ff", { locale: 'en-US' });
    }, []);

    return (
        <div className="w-72 mx-auto">
            <Wallet
                initialization={{ 
                    preferenceId: preferendeId,
                    redirectMode: "modal"
                }} 
                customization={{
                    texts: {
                        actionComplement: "amount",
                        valueProp: "security_details"
                    },
                    visual: {
                        buttonBackground: "black"
                    }
                 }} />
        </div>
    )

}