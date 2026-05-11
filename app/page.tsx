import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div className="text-3xl">
      system
      <Button className={`bg-accent text-accent-foreground`} size="sm">
        click me
      </Button>
    </div>
  );
}
