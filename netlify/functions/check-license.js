const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No request body" }),
      };
    }
    const { subscriptionId } = JSON.parse(event.body);

    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      if (subscription.status === "active") {
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
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
