const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const data = await (async () => {
    const subs = await stripe.subscriptions.list();
    return subs;
  })();

  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };

  // const subs = await stripe.subscriptions;
  // console.log("subs: ", subs);
  // return {
  //   statusCode: 200,
  // body: JSON.stringify({ subs }),
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
