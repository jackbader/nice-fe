import { Container, Group, Text, Title } from "@mantine/core";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import AuthButtons from "./AuthButtons";

export default function Header() {
    return (
        <header className="border-b border-gray-200 dark:border-gray-800">
            <Container size="xl" className="h-16">
                <Group justify="space-between" h="100%">
                    {/* Logo */}
                    <Link href="/" className="no-underline">
                        <Title order={1} size="xl" fw={700} className="text-gray-900 dark:text-white">
                            Nice
                        </Title>
                    </Link>

                    {/* Navigation and Actions */}
                    <Group gap="xl">
                        <nav className="hidden md:flex items-center gap-6">
                            {/* <Link href="/features" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                Features
                            </Link>
                            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                Pricing
                            </Link> */}
                        </nav>

                        <Group gap="sm">
                            <ThemeSwitch />
                            <AuthButtons />
                        </Group>
                    </Group>
                </Group>
            </Container>
        </header>
    );
}