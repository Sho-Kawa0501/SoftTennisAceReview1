import React,{memo} from 'react'
import {
  HomeIconComponent,
  LogoutIconComponent,
  LoginIconComponent,
  RegisterIconComponent,
  UserIconComponent,
} from '../molecules/HeaderIcons'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from 'features/account/accountSlice'
import { selectActiveModal } from 'features/app/appSlice'
import DeleteUserModal from 'components/templates/DeleteUserModal'



export const HeaderContent = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isActiveModal = useSelector(selectActiveModal)

  return (
    <div className={`sticky top-0 bg-white z-10 ${isActiveModal ? 'pointer-events-none' : ''}`}>
      <div className="border-b py-3">
        <div className="max-w-5xl mx-auto flex justify-between px-4">
          <div className="text-lg font-extrabold sm:text-base font-extrabold">
            <Link href="/" legacyBehavior>
              SoftTennisAceReviews
            </Link>
          </div>
          <div className="flex space-x-4">
            <HomeIconComponent />
            {isAuthenticated ? (
              <div className="flex space-x-4">
              <UserIconComponent />
              <LogoutIconComponent />
          </div>
            ) : (
              <div className="flex space-x-4">
            <LoginIconComponent />
            <RegisterIconComponent />
        </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

HeaderContent.displayName = "HeaderContent"
export default HeaderContent