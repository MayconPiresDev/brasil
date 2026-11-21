import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#020a14]/75 backdrop-blur-sm data-[state=open]:animate-[fade-in_.25s_ease-out] data-[state=closed]:animate-[fade-out_.2s_ease-in]" />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[min(48rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-3xl bg-card text-card-foreground shadow-2xl outline-none data-[state=open]:animate-[dialog-in_.45s_cubic-bezier(.2,.8,.2,1)] data-[state=closed]:animate-[fade-out_.2s_ease-in]",
          className,
        )}
        {...props}
      >
        {/* O botão fica "grudado" no topo enquanto o conteúdo rola */}
        <div className="pointer-events-none sticky top-0 z-10 -mb-16 flex justify-end p-4">
          <DialogPrimitive.Close className="pointer-events-auto grid size-10 cursor-pointer place-items-center rounded-full border border-border bg-card/90 outline-none backdrop-blur transition-transform hover:rotate-90 focus-visible:ring-4 focus-visible:ring-primary/30">
            <XIcon className="size-5" />
            <span className="sr-only">Fechar</span>
          </DialogPrimitive.Close>
        </div>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export { Dialog, DialogContent, DialogTitle, DialogDescription };
