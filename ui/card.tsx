"use client";

import React from "react";
import { Card as HeroCard, Chip, cn } from "@heroui/react";
// import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";

export type Props = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "neutral" | "negative";
  trendType: "up" | "neutral" | "down";
  trendChipPosition?: "top" | "bottom";
  trendChipVariant?: "primary" | "secondary" | "tertiary" | "soft";
  className?: string;
};

const Card = ({
  title,
  value,
  change,
  changeType,
  trendType,
  trendChipPosition = "top",
  trendChipVariant = "soft",
  className,
}: Props) => {
  // Choose the Lucide icon based on trendType
  // const TrendIcon = trendType === "up" ? ArrowUp : trendType === "down" ? ArrowDown : ArrowRight;

  const chipColor =
    changeType === "positive"
      ? "success"
      : changeType === "neutral"
        ? "warning"
        : "danger";

  return (
    <HeroCard
      className={cn(
        "relative border border-transparent dark:border-default-100 rounded-sm",
        className,
      )}
    >
      <div className="flex p-4 flex-col gap-y-2">
        <dt className="text-small text-default-500 font-medium">{title}</dt>
        <dd className="text-default-700 text-2xl font-semibold">{value}</dd>
      </div>

      <Chip
        className={cn(
          "absolute rounded-sm right-4 font-medium text-[0.65rem]",
          {
            "top-4": trendChipPosition === "top",
            "bottom-4": trendChipPosition === "bottom",
          },
        )}
        color={chipColor}
        size="sm"
        // startContent={<TrendIcon className="w-3 h-3" />}
        variant={trendChipVariant}
      >
        {change}
      </Chip>
    </HeroCard>
  );
};

export default Card;
