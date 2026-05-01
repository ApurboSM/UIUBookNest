import { Truck, Wallet, GraduationCap } from "lucide-react";

const items = [
  { icon: Truck, text: "Free pickup at UIU Campus Store · Pathao & RedX delivery across Dhaka" },
  { icon: Wallet, text: "Pay with bKash, Nagad, or Cash on Delivery — all in BDT" },
  { icon: GraduationCap, text: "Curated for UIU students · MGT 3225 E-Business Project" },
];

export function AnnouncementBar() {
  return (
    <div className="relative w-full overflow-hidden border-b border-[var(--border)] bg-[#0d0d0d] text-xs">
      <div className="container-page flex h-9 items-center">
        <div className="flex flex-1 items-center justify-center gap-8 overflow-hidden text-muted">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <item.icon className="size-3.5 text-[var(--primary)]" />
              <span className="hidden sm:inline">{item.text}</span>
              <span className="sm:hidden">
                {i === 0 ? "Pickup or Pathao/RedX delivery" : i === 1 ? "bKash · Nagad · COD" : "Made for UIU students"}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
