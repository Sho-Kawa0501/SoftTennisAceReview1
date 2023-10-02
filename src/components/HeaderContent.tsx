import React,{memo} from 'react'
import {
  HomeIconComponent,
  LogoutIconComponent,
  LoginIconComponent,
  RegisterIconComponent,
  UserIconComponent,
} from './HeaderIcons'
import Link from 'next/link'
import DeleteUserModal from 'components/DeleteUserModal'

type HeaderContentProps = {
  isAuthenticated: boolean,
}

export const HeaderContent = memo(({isAuthenticated}:HeaderContentProps) => {

  return (
  <div className="sticky top-0 bg-white z-10">
      <div className="border-b py-3">
        <div className="max-w-5xl mx-auto flex justify-between px-4">
          <div className="text-lg font-extrabold">
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
})

export default HeaderContent