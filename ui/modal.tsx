import React from "react";
import { Modal as HeroModal } from "@heroui/react";
import HeroButton from "./button";

type ModalAction = {
  label: string;
  onPress: () => void;
  variant?:
    | "primary"
    | "secondary" 
    | "ghost"
    | "danger" 
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
                      <HeroButton
                        key={index} 
                        type={action.type}
                        variant={action.variant}
                        className={action.className}
                        onClick={action.onPress}
                      >
                        {action.label}
                      </HeroButton>
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
