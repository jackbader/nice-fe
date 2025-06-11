'use client';

import { MenuDivider, MenuItem } from "@mantine/core";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function AuthMenuItems() {
    const { logout } = useAuth();

    return (
        <>
            <MenuItem
                leftSection={<IconUser size={16} />}
                component={Link}
                href="/dashboard"
            >
                Dashboard
            </MenuItem>
            <MenuItem
                leftSection={<IconSettings size={16} />}
                component={Link}
                href="/settings"
            >
                Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem
                leftSection={<IconLogout size={16} />}
                onClick={() => {
                    logout();
                }}
                color="red"
            >
                Logout
            </MenuItem>
        </>
    )
}