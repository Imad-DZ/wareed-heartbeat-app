import { Bell, MapPin, Star } from "lucide-react";
import type { User } from "./types";

export function TopBar({ user }: { user: User }) {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            Welcome back, <span className="font-semibold text-foreground">{user.name.split(" ")[0]}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {user.points.toLocaleString()} pts
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground text-xs font-medium">
            <MapPin className="w-3.5 h-3.5" /> DZ Algeria
          </div>
          <button className="relative w-9 h-9 rounded-full border border-border hover:bg-muted flex items-center justify-center transition">
            <Bell className="w-4 h-4 text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive ring-2 ring-background" />
          </button>
        </div>
      </div>
    </header>
  );
}