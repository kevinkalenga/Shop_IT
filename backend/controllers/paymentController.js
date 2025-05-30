// Create stripe checkout session => /api/v1/payment/checkout_session 

import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe"; 
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export const stripeCheckoutSession = catchAsyncErrors(
     async (req, res, next) => {
     
        const body = req?.body;

        const line_items = body?.orderItems?.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item?.name, 
                        images: [item?.image],
                        metadata: {productId: item?.product},
                    },
                    unit_amount: item?.price * 100
                }, 
                tax_rates: ["txr_1RUH0VRwCsWNJmL3ZnsZyCyW"],
                quantity: item?.quantity,
            }
        })

        const shippingInfo = body?.shippingInfo

        const FREE_SHIPPING_RATE = "shr_1RUGnHRwCsWNJmL3LbBxeJvW"; // ← à remplacer par ton vrai ID
        const STANDARD_SHIPPING_RATE = "shr_1RUI9vRwCsWNJmL3A0iQUijz"; // ← à remplacer aussi
        
        const shipping_rate = body?.itemsPrice >= 200 ? FREE_SHIPPING_RATE : STANDARD_SHIPPING_RATE
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            success_url: `${process.env.FRONTEND_URL}/me/orders`,
            cancel_url: `${process.env.FRONTEND_URL}`,
            customer_email: req?.user?.customer_email, 
            client_reference_id: req?.user?._id.toString(),
            mode: 'payment',
            metadata: {
                ...shippingInfo,
                itemsPrice: body?.itemsPrice
            },
            shipping_options: [
                {
                    shipping_rate,
                }
            ],

            shipping_address_collection: {
                  allowed_countries: ['US', 'CA', 'FR'], // ajoute les pays autorisés ici
            },
            line_items

        });

        console.log(session)

        res.status(200).json({
            url: session.url,
        })
}
)