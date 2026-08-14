import MagicUIGlobePageClient from "./MagicUIGlobePageClient";

export const metadata = {
  title: "Magic UI Globe",
  description: "Isolated Magic UI Globe demo.",
  robots: { index: false, follow: false },
};

export default function MagicUIGlobePage() {
  return <MagicUIGlobePageClient />;
}
