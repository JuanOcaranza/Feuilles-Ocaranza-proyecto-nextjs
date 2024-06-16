import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { SaleBox } from "@/lib/definitions";

export function createMercadoPagoConfig() {
    return new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! })
}

export async function createPreference(boxes: Array<{ id: string, title: string, unit_price: number, quantity: number }>) {
    const client = createMercadoPagoConfig()
    const preference = new Preference(client)

    const result = await preference.create({
        body: {
            items: boxes,
            back_urls: {
                success: "https://feuilles-ocaranza-proyecto-nextjs.vercel.app/checkout/success",
                failure: "https://feuilles-ocaranza-proyecto-nextjs.vercel.app/checkout/failure",
                pending: "https://feuilles-ocaranza-proyecto-nextjs.vercel.app/checkout/failure",
            },
            payment_methods: {
                excluded_payment_types: [
                    {
                        id: "atm"
                    },
                    {
                        id: "ticket"
                    }
                ]
            }
        }
    });

    return result
}

export async function getBoxesFromPayment(paymentId: number): Promise<SaleBox[] | null> {
    const client = createMercadoPagoConfig()
    try {
        const payment = await new Payment(client).get({ id: paymentId });

        if (!payment || payment.status !== "approved" || !payment.additional_info?.items) {
            return null
        }

        const boxes = payment.additional_info.items.map((item) => ({
            saleId: paymentId,
            boxId: parseInt(item.id),
            price: item.unit_price,
            quantity: item.quantity
        }))

        return boxes

    } catch (error) {
        return null
    }
}