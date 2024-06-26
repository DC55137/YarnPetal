import { Inter, Pacifico } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});
