const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*", //any origin allowed
    "Access-Control-Allow-Headers": "Content-Type", //this header type allowed
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET", //these methods allowed
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "CORS preflight check successful",
    };
  }

  try {
    const { subId } = JSON.parse(event.body);
    const sub = await stripe.subscriptions.retrieve(subId);
    const isActive = sub.status === "active";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ isActive }),
    };
  } catch (error) {
    console.error("error: ", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
