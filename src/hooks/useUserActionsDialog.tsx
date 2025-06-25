'use client'

import { useState, JSX } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalDescription,
  ModalFooter,
} from '@/components/ui/modal/modal'
import { Button, Select, SelectItem } from '@photo-fiesta/ui-lib'
import { Close } from '@/shared/assets'
import { useMutation, ApolloError } from '@apollo/client'
import { BAN_USER, UNBAN_USER } from '@/lib/mutations/ban-unban'
import { REMOVE_USER } from '@/lib/mutations/removeUser'
import { GET_USERS } from '@/lib/queries/getUsers'

export type User = {
  id: number
  userName: string
  profile: { userName: string }
  userBan: boolean
}

export type ActionType = 'ban' | 'delete'

interface UseUserActionsDialog {
  /** Открывает диалог указанного типа для пользователя */
  open: (action: ActionType, user: User) => void
  /** JSX-модалка (рендерить внизу компонента) */
  Dialog: () => JSX.Element | null
}

export function useUserActionsDialog(): UseUserActionsDialog {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [action, setAction] = useState<ActionType>('ban')
  const [reason, setReason] = useState<string>('Bad behavior')

  // мутации
  const [banUser] = useMutation(BAN_USER, { refetchQueries: [{ query: GET_USERS }] })
  const [unbanUser] = useMutation(UNBAN_USER, { refetchQueries: [{ query: GET_USERS }] })
  const [removeUser] = useMutation(REMOVE_USER, { refetchQueries: [{ query: GET_USERS }] })

  function openDialog(act: ActionType, u: User) {
    setAction(act)
    setUser(u)
    setOpen(true)
    if (act === 'ban') setReason('Bad behavior')
  }

  async function handleConfirm() {
    if (!user) return
    try {
      if (action === 'ban') {
        if (user.userBan) {
          await unbanUser({ variables: { userId: user.id } })
        } else {
          await banUser({ variables: { userId: user.id, banReason: reason } })
        }
      } else {
        await removeUser({ variables: { userId: user.id } })
      }
    } catch (e) {
      console.error(e as ApolloError)
    }
    setOpen(false)
    setUser(null)
  }

  function handleCancel() {
    setOpen(false)
    setUser(null)
  }

  function Dialog() {
    if (!open || !user) return null

    const isBan = action === 'ban'
    const title = isBan ? (user.userBan ? 'Un‐ban user' : 'Ban user') : 'Delete user'

    const body = isBan ? (
      <>
        Are you sure you want to {user.userBan ? 'un‐ban' : 'ban'} <b>{user.profile.userName}</b>?
      </>
    ) : (
      <>
        Are you sure you want to delete user <b>{user.profile.userName}</b>?
      </>
    )

    return (
      <Modal open={open} onOpenChange={o => !o && handleCancel()}>
        <ModalContent className=" " style={{ background: '#333333', border: '#4C4C4C' }}>
          <ModalHeader className="flex justify-between items-center border-b-dark-100">
            <ModalTitle className="text-white">{title}</ModalTitle>
            <ModalClose asChild>
              <button className=" ">
                <Close />
              </button>
            </ModalClose>
          </ModalHeader>

          <ModalDescription className="text-white">{body}</ModalDescription>

          {isBan && !user.userBan && (
            <div className="mt-4" style={{ zIndex: '1000' }}>
              <Select value={reason} onValueChange={setReason} placeholder="Reason for ban">
                <SelectItem value="Bad behavior">Bad behavior</SelectItem>
                <SelectItem value="Advertising placement">Advertising placement</SelectItem>
                <SelectItem value="Another reason">Another reason</SelectItem>
              </Select>
            </div>
          )}

          <ModalFooter className="mt-6 flex justify-between gap-2">
            <Button
              style={{ width: '130px', height: '36px' }}
              variant="primary"
              onClick={handleConfirm}
            >
              Yes
            </Button>
            <Button
              style={{ width: '130px', height: '36px' }}
              variant="outlined"
              onClick={handleCancel}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  return { open: openDialog, Dialog }
}
