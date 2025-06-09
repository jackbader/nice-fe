"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeSwitch() {
    const { toggleColorScheme } = useMantineColorScheme();

    return (
        <div>
            <ActionIcon
                classNames={{
                    root: "!hidden dark:!flex"
                }}
                onClick={() => toggleColorScheme()}>
                <IconSun size={18} />
            </ActionIcon>
            <ActionIcon
                classNames={{
                    root: "dark:!hidden !flex"
                }}
                onClick={() => toggleColorScheme()}>
                <IconMoon size={18} />
            </ActionIcon>
        </div >
    );
}