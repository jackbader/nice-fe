// Server Component
import { Avatar, Button, Menu, MenuDropdown, MenuTarget, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import AuthMenuItems from "./AuthMenuItems";
import { getUser } from "../contexts/ServerUserContext";

export default async function AuthButtons() {
    const user = await getUser();

    if (user) {
        return (
            <Menu
                position="bottom-end"
                shadow="md"
                width={200}
            >
                <MenuTarget>
                    <UnstyledButton className="flex items-center gap-2">
                        <Avatar
                            size="sm"
                            radius="xl"
                            color="blue"
                        >
                            {user.email.charAt(0).toUpperCase()}
                        </Avatar>
                        <Text size="sm" className="hidden md:block text-gray-700 dark:text-gray-300">
                            {user.email}
                        </Text>
                        <IconChevronDown size={16} className="text-gray-500" />
                    </UnstyledButton>
                </MenuTarget>

                <MenuDropdown>
                    <AuthMenuItems />
                </MenuDropdown>
            </Menu>
        );
    }

    return (
        <>
            <Button variant="subtle" component={Link} href="/login">
                Log in
            </Button>
            <Button component={Link} href="/signup">
                Sign up
            </Button>
        </>
    );
} 