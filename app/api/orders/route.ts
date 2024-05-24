// In your API handler
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  const body = await req.json();
  const { orderId } = body;

  try {
    const order = await prismadb.order.findUnique({
      where: { id: Number(orderId) },
      include: {
        orderItems: {
          include: {
            product: true, // Include the related product data
          },
        },
      },
    });

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }
  } catch (error) {
    console.error("Failed to fetch order data:", error);
    return new Response("Failed to fetch order data", { status: 500 });
  }
}
