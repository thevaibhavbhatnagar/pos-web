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
  type?: "submit" | "reset" | "button";
  className?: string;
};

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  footerActions?: ModalAction[];
  size?: "xs" | "sm" | "md" | "lg" | "cover" | "full";
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
          <HeroModal.Dialog className="bg-white">
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
                        className={`rounded-lg font-semibold shadow-lg bg-[image:var(--sidebar-active-bg)] backdrop-blur-md border border-[var(--sidebar-active-border)] shadow-[inset_0px_1px_1px_var(--sidebar-active-highlight)] text-[var(--sidebar-active-text)]  hover:opacity-100 transform transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${action.className}`}
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
