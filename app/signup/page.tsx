"use client";

import { Button, Container, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const { login } = useAuth();
    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
            password: (value) => (value.length < 6 ? "Password must be at least 6 characters" : null),
            confirmPassword: (value, values) =>
                value !== values.password ? "Passwords did not match" : null,
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const response = await fetch("http://localhost:8000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            login(data.user);
            notifications.show({
                title: "Success",
                message: "Your account has been created successfully",
                color: "green",
            });
            router.push("/dashboard");
        } catch (error) {
            notifications.show({
                title: "Error",
                message: error instanceof Error ? error.message : "Signup failed",
                color: "red",
            });
        }
    };

    return (
        <Container size="xs" className="py-20">
            <Paper radius="md" p="xl" withBorder className="bg-white dark:bg-gray-800">
                <Title order={2} className="text-center mb-6 text-gray-900 dark:text-white">
                    Create an Account
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

                        <PasswordInput
                            required
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            {...form.getInputProps("confirmPassword")}
                        />

                        <Button type="submit" fullWidth size="md" className="mt-4">
                            Sign up
                        </Button>

                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                                Log in
                            </Link>
                        </Text>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}   