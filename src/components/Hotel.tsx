import React from "react";
import { Group, Text, Card, Badge } from "@mantine/core";

export const Hotel = ({ price, address, name, distance, review, currency }) => {
  return (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="sm" p="lg">
        <Group
          position="apart"
          sx={(theme) => ({ marginBottom: 5, marginTop: theme.spacing.sm })}
        >
          <Text weight={500}>{name}</Text>
          <Badge color="pink" variant="light">
            {price} {currency}
          </Badge>
        </Group>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          Adres: {address}
        </Text>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          Dystans od miejsca docelowego: {distance} km
        </Text>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          Ocena użytkowników: {review}
        </Text>
      </Card>
    </div>
  );
};
