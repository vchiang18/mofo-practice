const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  try {
    const { subId } = JSON.parse(event.body);
    const sub = await stripe.subscriptions.retrieve(subId);
    const isActive = sub.status === "active";

    return {
      statusCode: 200,
      body: JSON.stringify({ isActive }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// const subId = JSON.parse(localStorage.getItem("subId"));
// const subId = "sub_1PW25FBH87WWUUeHhO4jUj8K"; //cancelled sub
// const subId = "sub_1PVdZQBH87WWUUeHo3EclDov"; //active sub

// exports.handler = async (event, context) => {
//   try {
//     var data = await (async () => {
//       const sub = await stripe.subscriptions.retrieve(subId);
//       const isActive = sub.status === "active";
//       return isActive;
//     })();
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message }),
//     };
//   }

//   return {
//     statusCode: 200,
//     body: JSON.stringify(data),
//   };
// };
