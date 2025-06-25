import * as Dialog from '@radix-ui/react-dialog'
import { forwardRef, ReactNode, ComponentPropsWithoutRef, ElementRef } from 'react'

export interface ModalProps extends ComponentPropsWithoutRef<typeof Dialog.Root> {
  children: ReactNode
}

export type ModalOverlayProps = ComponentPropsWithoutRef<typeof Dialog.Overlay>
export type ModalContentProps = ComponentPropsWithoutRef<typeof Dialog.Content> & {
  children: ReactNode
}
export type ModalHeaderProps = ComponentPropsWithoutRef<'div'>
export type ModalFooterProps = ComponentPropsWithoutRef<'div'>
export type ModalTitleProps = ComponentPropsWithoutRef<typeof Dialog.Title>
export type ModalDescriptionProps = ComponentPropsWithoutRef<typeof Dialog.Description>

export const Modal = ({ children, ...props }: ModalProps) => (
  <Dialog.Root {...props}>{children}</Dialog.Root>
)
Modal.displayName = 'Modal'

export const ModalTrigger = Dialog.Trigger
ModalTrigger.displayName = 'ModalTrigger'

export const ModalClose = Dialog.Close
ModalClose.displayName = 'ModalClose'

export const ModalOverlay = forwardRef<ElementRef<typeof Dialog.Overlay>, ModalOverlayProps>(
  ({ className, ...props }, ref) => (
    <Dialog.Overlay
      ref={ref}
      className={['fixed inset-0 bg-black bg-opacity-50', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
)
ModalOverlay.displayName = 'ModalOverlay'

export const ModalContent = forwardRef<ElementRef<typeof Dialog.Content>, ModalContentProps>(
  ({ className, children, ...props }, ref) => (
    <Dialog.Portal>
      <ModalOverlay />
      <Dialog.Content
        ref={ref}
        className={[
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'z-50 shadow-lg p-6 w-full max-w-md',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
)
ModalContent.displayName = 'ModalContent'

export const ModalHeader = ({ className, ...props }: ModalHeaderProps) => (
  <div className={['mb-4', className].filter(Boolean).join(' ')} {...props} />
)
ModalHeader.displayName = 'ModalHeader'

export const ModalTitle = forwardRef<ElementRef<typeof Dialog.Title>, ModalTitleProps>(
  ({ className, ...props }, ref) => (
    <Dialog.Title
      ref={ref}
      className={['text-lg font-semibold', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
)
ModalTitle.displayName = 'ModalTitle'

export const ModalDescription = forwardRef<
  ElementRef<typeof Dialog.Description>,
  ModalDescriptionProps
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={['mb-4 text-sm text-gray-600', className].filter(Boolean).join(' ')}
    {...props}
  />
))
ModalDescription.displayName = 'ModalDescription'

export const ModalFooter = ({ className, ...props }: ModalFooterProps) => (
  <div
    className={['mt-6 flex justify-end gap-2', className].filter(Boolean).join(' ')}
    {...props}
  />
)
ModalFooter.displayName = 'ModalFooter'
