const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { stripeCustomerId } = JSON.parse(event.body);

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: "active",
    });

    if (subscriptions.data.length > 0) {
      console.log("subscriptions: ", subscriptions);
      return {
        statusCode: 200,
        body: JSON.stringify({ licenseActive: true }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ licenseActive: false }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
