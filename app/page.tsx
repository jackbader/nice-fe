"use client";

import { Button, Container, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { IconBrandGithub, IconRocket, IconShield, IconSparkles } from "@tabler/icons-react";
import Link from "next/link";
import HomePageHeader from "./components/HomePageHeader";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20">
        <Container size="xl">
          <Grid gutter="xl" align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xl">
                <Title order={1} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                  Build Something <span className="text-blue-600 dark:text-blue-400">Amazing</span>
                </Title>
                <Text size="xl" className="text-gray-600 dark:text-gray-300">
                  A modern platform that helps you create, collaborate, and bring your ideas to life.
                  Start your journey today and discover what you can build.
                </Text>
                <Group gap="md">
                  <Button size="lg" component={Link} href="/signup">
                    Get Started
                  </Button>
                  <Button size="lg" variant="light" component={Link} href="https://github.com" target="_blank">
                    <IconBrandGithub size={20} className="mr-2" />
                    View on GitHub
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-10 blur-3xl" />
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg" />
                </div>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <Container size="xl">
          <Stack gap="xl" align="center" className="text-center mb-16">
            <Title order={2} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Why Choose Us
            </Title>
            <Text size="lg" className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Everything you need to build amazing projects, all in one place.
            </Text>
          </Stack>

          <Grid gutter="xl">
            {[
              {
                icon: <IconRocket size={32} className="text-blue-500" />,
                title: "Lightning Fast",
                description: "Built with performance in mind, ensuring your projects run smoothly and efficiently."
              },
              {
                icon: <IconShield size={32} className="text-green-500" />,
                title: "Secure by Default",
                description: "Enterprise-grade security to keep your data and projects safe and protected."
              },
              {
                icon: <IconSparkles size={32} className="text-purple-500" />,
                title: "Modern Stack",
                description: "Built with the latest technologies to provide the best developer experience."
              }
            ].map((feature, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-700 h-full">
                  <div className="mb-4">{feature.icon}</div>
                  <Title order={3} className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </Title>
                  <Text className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </Text>
                </div>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container size="xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <Stack gap="xl" align="center">
              <Title order={2} className="text-3xl md:text-4xl font-bold text-white">
                Ready to Get Started?
              </Title>
              <Text size="xl" c="white" className="max-w-2xl">
                Join thousands of developers who are already building amazing things with our platform.
              </Text>
              <Button size="lg" variant="white" component={Link} href="/signup">
                Start Building Now
              </Button>
            </Stack>
          </div>
        </Container>
      </section>
    </div>
  );
}
