import React from "react";
import { Modal as HeroModal, Button } from "@heroui/react";

type ModalAction = {
  label: string;
  onPress: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "outline"
    | "ghost"
    | "danger"
    | "danger-soft";
  radius?: "sm" | "md" | "lg";
  type?: "submit" | "reset" | "button";
};

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  footerActions?: ModalAction[];
  size?: "xs" | "sm" | "md" | "lg" | "cover" | "full";
};

const radiusClass = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
};

const Modal: React.FC<Props> = ({
  title,
  children,
  isOpen,
  onOpenChange,
  footerActions = [],
  size = "md",
}) => {
  return (
    <HeroModal>
      <HeroModal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
        <HeroModal.Container size={size} placement="center">
          <HeroModal.Dialog>
            {() => (
              <>
                <HeroModal.Header className="flex flex-col gap-1">
                  {title}
                </HeroModal.Header>

                <HeroModal.Body>{children}</HeroModal.Body>

                {footerActions.length > 0 && (
                  <HeroModal.Footer className="flex items-center justify-center gap-2">
                    {footerActions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant || "secondary"}
                        className={radiusClass[action.radius || "md"]}
                        type={action.type}
                        onPress={action.onPress}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </HeroModal.Footer>
                )}
              </>
            )}
          </HeroModal.Dialog>
        </HeroModal.Container>
      </HeroModal.Backdrop>
    </HeroModal>
  );
};

export default Modal;
