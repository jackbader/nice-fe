"use client";

import { Button, Container, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
            password: (value: string) => (value.length < 1 ? "Password is required" : null),
        },
    });

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            await login(values);
            notifications.show({
                title: "Success",
                message: "You have been successfully logged in",
                color: "green",
            });
            router.push("/dashboard");
        } catch (error) {
            notifications.show({
                title: "Error",
                message: error instanceof Error ? error.message : "Login failed",
                color: "red",
            });
        }
    };

    return (
        <Container size="xs" className="py-20">
            <Paper radius="md" p="xl" withBorder className="bg-white dark:bg-gray-800">
                <Title order={2} className="text-center mb-6 text-gray-900 dark:text-white">
                    Welcome Back
                </Title>

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                        <TextInput
                            required
                            label="Email"
                            placeholder="your@email.com"
                            {...form.getInputProps("email")}
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            {...form.getInputProps("password")}
                        />

                        <Button type="submit" fullWidth size="md" className="mt-4">
                            Log in
                        </Button>

                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                                Sign up
                            </Link>
                        </Text>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}