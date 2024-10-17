import Order from "./order.model.js";

export async function createOrder(req, res) {
    try {
        const newOrder = await Order(req.body);
        const savedOrder =  await newOrder.save();
        res.status(201).send({ message: "Order created successfully", order: savedOrder });
    } catch (error) {
        console.error('Error creating order', error);
        res.status(500).send({ message: "Failed to create order" })
    }
};

export async function getOrderByEmail (req, res) {
    try {
        const { email } = req.params;

        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        if(!orders) return res.status(404).send({ message: "Orders not found" });

        res.status(200).send(orders);
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).send({ message: "Failed to fetch orders" })
    }
};