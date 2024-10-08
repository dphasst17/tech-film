'use client'
import { createTicket } from "@/api/ticket";
import { accountStore } from "@/store/account";
import { getToken } from "@/utils/cookie";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { use } from "react";
import { toast } from "react-toastify";

const Payment = ({ props }: { props: any }) => {
    /* const { setIsLoading, user, setUser } = use(StateContext) */
    const { users: user } = accountStore()
    const handleApprove = (data: any, actions: any) => {
        return actions.order.capture().then(async (details: any) => {
            props.setStateForm((prevState: any) => ({ ...prevState, 'orderId': data.orderID }))
            const resultData = { ...props.stateForm, 'orderId': data.orderID, seat: props.seat.toUpperCase() }
            const token = await getToken()
            createTicket(token, resultData).then(res => {
                if (res.status === 200) {
                    toast.success('Buy ticket is success! Please check your email');
                    props.setIsPaypal(false)
                }
                else {
                    toast.error(res.message)
                }
            })
        });
    };
    return (
        <div className="w-[300px] bg-black z-30 my-8" style={{ colorScheme: 'none' }}>
            <PayPalScriptProvider options={{ "clientId": `${process.env.NEXT_PUBLIC_PAYPAL}` }}>
                <PayPalButtons
                    className="!z-40 bg-black rounded-lg"
                    createOrder={async (data, actions) => {
                        return actions.order.create({
                            intent: 'CAPTURE',
                            purchase_units: [{
                                description: 'TICKET INFO',
                                amount: {
                                    value: `${props.price * props.count}`,
                                    currency_code: "USD",
                                    breakdown: {
                                        item_total: {
                                            currency_code: 'USD',
                                            value: props.price.toString()
                                        },
                                        shipping: {
                                            currency_code: 'USD',
                                            value: '0' // Phí ship
                                        }
                                    }
                                },
                                items: [{
                                    name: `FILM TICKET - ${props.title}`,
                                    quantity: props.count.toString(),
                                    unit_amount: {
                                        currency_code: 'USD',
                                        value: props.price.toString()
                                    }
                                }]
                            }]
                        });
                    }}
                    onApprove={handleApprove}
                />
            </PayPalScriptProvider>
        </div>
    );
}
export default Payment;