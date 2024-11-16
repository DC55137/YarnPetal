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
    price: 5,
  },

  {
    id: 3,
    title: "Delivery (Gold Coast)",
    turnaround: "3–4 days",
    price: 10,
  },
  {
    id: 4,
    title: "Standard Delivery (Australia Wide)",
    turnaround: "4–12 days",
    price: 20,
  },
];

export type deliveryMethodType = {
  id: number;
  title: string;
  turnaround: string;
  price: number;
};
