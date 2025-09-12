import Stripe from 'stripe';
import Transaction from '../models/Transaction.Model.js';
import User from '../models/User.Model.js';

export const stripeWebHooks = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const signature = req.headers["stripe-signature"]

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }

    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                })
                const session = sessionList.data[0]
                const { transactionId, appId } = session.metadata;

                if (appId === 'NeuroChat') {
                    const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false })

                    // Update Credits In User Account
                    await User.updateOne({ _id: transaction.userId }, { $inc: { credits: transaction.credits } })

                    // Update Credit Payment Status
                    transaction.isPaid = true;
                    await transaction.save();
                } else {
                    res.status(400).json({ received: true, message: "Ignored Event : Invalid App" })
                }
                break;
            }
            default: console.log("Unhandled Event Type : ", event.type)
                break;
        }
        res.status(200).json({ received: true })
    } catch (error) {
        console.log("Webhook Processing Error : ", error)
        res.status(500).send("Internal Sever Error")
    }
}