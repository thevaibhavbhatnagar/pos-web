"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import { ReactNode } from "react";

interface ReusableDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const ReusableDrawer = ({
  isOpen,
  onOpenChange,
  title,
  children,
  footer,
}: ReusableDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <>
          {title && (
            <DrawerHeader className="flex flex-col gap-1">{title}</DrawerHeader>
          )}

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter>
            {footer ? (
              footer
            ) : (
              <>
                <Button variant="ghost" onPress={() => onOpenChange(false)}>
                  Close
                </Button>

                <Button variant="primary" onPress={() => onOpenChange(false)}>
                  Done
                </Button>
              </>
            )}
          </DrawerFooter>
        </>
      </DrawerContent>
    </Drawer>
  );
};
