"use client";

import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            {children}
        </div>
    );
}