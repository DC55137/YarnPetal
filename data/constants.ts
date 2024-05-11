export const deliveryMethods = [
  {
    id: 1,
    title: "Pick Up (PAY CASH)",
    turnaround: "1–2 days",
    price: 0,
  },
  {
    id: 2,
    title: "Pick Up (PAY ONLINE)",
    turnaround: "1–2 days",
    price: 2,
  },

  {
    id: 3,
    title: "Express Delivery (Gold Coast)",
    turnaround: "2–3 days",
    price: 16,
  },
  {
    id: 4,
    title: "Standard Delivery (Gold Coast)",
    turnaround: "4–10 days",
    price: 5,
  },
];

export type deliveryMethodType = {
  id: number;
  title: string;
  turnaround: string;
  price: number;
};
