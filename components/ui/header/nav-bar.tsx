'use client';

import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { ChartLine, User2, UtensilsCrossed } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { cn } from "@/lib/utils";

const NavBar = () => {
    const t = useTranslations("NavBar");
    const pathname = usePathname();
    const user = useCurrentUser();

    const routes = [
        {
            href: '/meals',
            label: "meals",
            active: /^\/meals$/.test(pathname) || /^\/[a-z]{2}\/meals$/.test(pathname),
            icon: <UtensilsCrossed className="h-6 w-6" />
        },
        {
            href: '/weight',
            label: "weight",
            active: /^\/weight$/.test(pathname) || /^\/[a-z]{2}\/weight$/.test(pathname),
            icon: <ChartLine className="h-6 w-6" />
        },
        {
            href: '/profile',
            label: "profile",
            active: /^\/profile$/.test(pathname) || /^\/[a-z]{2}\/profile$/.test(pathname),
            icon: (
                <Avatar className="shadow-sm h-6 w-6">
                    <AvatarImage src={user?.image || undefined} alt='UserLogo' />
                    <AvatarFallback className="border bg-white dark:bg-black">
                        <User2 className="text-black dark:text-white" />
                    </AvatarFallback>
                </Avatar>
            )
        }
    ]

    return (
        <nav>
            <ul className="flex justify-around items-center">
                {routes.map(route => (
                    <li key={route.href} className="hover:scale-105 transition-transform cursor-pointer">
                        <Link href={route.href} legacyBehavior passHref>
                            <span className={cn("flex gap-2", route.active ? "text-primary shadow-md rounded-full p-[8px]" : "text-slate-400")}>
                                {route.icon} <span className="hidden sm:block">{t(route.label)}</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;