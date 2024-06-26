const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const subId = JSON.parse(localStorage.getItem("subId"));

exports.handler = async (event, context) => {
  try {
    var data = await (async () => {
      const sub = await stripe.subscriptions.retrieve(subId);
      const isActive = sub.status === "active";
      return isActive;
  })();}
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: data,
  };

};

// try {
//   if (!event.body) {
//     console.log("event: ", event);
//     return {
//       statusCode: 400,
//       body: JSON.stringify({
//         error: "No request body",
//         response: event.response,
//       }),
//     };
//   }
//   const { subscriptionId } = JSON.parse(event.body);
//   try {
//     const subscription = await stripe.subscriptions.retrieve(subscriptionId);
//     console.log("event: ", event);
//     if (subscription.status === "active") {
//       return {
//         statusCode: 200,
//         body: JSON.stringify({ licenseActive: true }),
//       };
//     } else {
//       return {
//         statusCode: 200,
//         body: JSON.stringify({ licenseActive: false }),
//       };
//     }
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message }),
//     };
//   }
// } catch (error) {
//   return {
//     statusCode: 500,
//     body: JSON.stringify({ error: error.message }),
//   };
// }
