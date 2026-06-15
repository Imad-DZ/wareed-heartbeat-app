import { createFileRoute } from "@tanstack/react-router";
import { WareedApp } from "@/components/wareed/WareedApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wareed — National Blood Donation Platform of Algeria" },
      { name: "description", content: "Wareed (وَرِيد) ends the chaos of emergency blood calls and secures Algeria's national blood supply." },
      { property: "og:title", content: "Wareed — وَرِيد" },
      { property: "og:description", content: "Algeria's premium blood donation platform, in partnership with the Agence Nationale du Sang." },
    ],
  }),
  component: Index,
});

function Index() {
  return <WareedApp />;
}
