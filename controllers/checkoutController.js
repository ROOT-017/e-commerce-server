const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.checkoutSession = async (req, res, next) => {
  const { items, email } = req.body;
  if (!items)
    return res.send({
      url: "https://e-commerce-sigma-lemon.vercel.app/?canceled=true",
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
      success_url: "https://e-commerce-sigma-lemon.vercel.app/purchase/success",
      cancel_url: "https://e-commerce-sigma-lemon.vercel.app/?canceled=true",
    });
    res.send({ url: session.url });
  } catch (err) {
    console.log(err);
  }
};
