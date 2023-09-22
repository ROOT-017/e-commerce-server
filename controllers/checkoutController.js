const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const successUrl =
  process.env.Node_ENV === "development"
    ? "http://localhost:3000/purchase/success"
    : "https://e-commerce-sigma-lemon.vercel.app/purchase/success";
const cancelUrl =
  process.env.Node_ENV === "development"
    ? "http://localhost:3000/?canceled=true"
    : "https://e-commerce-sigma-lemon.vercel.app/?canceled=true";
exports.checkoutSession = async (req, res, next) => {
  const { items, email } = req.body;
  if (!items)
    return res.send({
      url: cancelUrl,
    });
  const line_items = items.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
          description: item.description,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ["card"],
      customer_email: email,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    res.send({ url: session.url });
  } catch (err) {
    console.log(err);
    res.send({
      url: cancelUrl,
    });
  }
};
