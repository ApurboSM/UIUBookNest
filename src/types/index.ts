export type CategorySlug =
  | "textbooks"
  | "stationery"
  | "exam-supplies"
  | "uiu-merchandise";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  icon: "book" | "pencil" | "clipboard" | "shirt";
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  author?: string;
  category: CategorySlug;
  priceBDT: number;
  originalPriceBDT?: number;
  image: string;
  imageAlt: string;
  inStock: boolean;
  stockCount?: number;
  description: string;
  badges?: string[];
  isbn?: string;
  publisher?: string;
  edition?: string;
  forCourses?: string[];
};

export type SchoolSlug =
  | "science-engineering"
  | "business-economics"
  | "humanities-social"
  | "life-sciences";

export type School = {
  slug: SchoolSlug;
  name: string;
  shortName: string;
  description: string;
  elmsUrl: string;
  departments: Department[];
};

export type Department = {
  code: string;
  name: string;
  elmsUrl: string;
  sampleCourses: Course[];
};

export type Course = {
  code: string;
  title: string;
  credits: number;
  trimester?: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type FulfilmentMethod = "pickup" | "delivery";

export type PaymentMethod = "bkash" | "nagad" | "sslcommerz" | "cod";

export type OrderItem = {
  productId: string;
  slug: string;
  title: string;
  author?: string;
  image: string;
  priceBDT: number;
  quantity: number;
};

export type Order = {
  id: string;
  studentId: string;
  customerName: string;
  fulfilment: FulfilmentMethod;
  payment: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  pickupTime?: string;
  deliveryAddress?: string;
  phone?: string;
};

