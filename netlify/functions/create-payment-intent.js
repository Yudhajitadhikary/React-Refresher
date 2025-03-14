require("dotenv").config();
const stripe = require("stripe")('sk_test_51J6x3USG9FLplHwVWsgbWn78rE9uuATo18DpQWSaSBPCxPBMlt7RFtlzOq5BWxpAoPolulaQdKMm8dDrIllKeTwM00HcrLXFCo');

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};