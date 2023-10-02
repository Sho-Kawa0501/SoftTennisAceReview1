import { useForm,FormProvider } from 'react-hook-form'
import { useRouter } from 'next/router'
import TextInput from './TextInput'
import AppSubmitButton from './AppSubmitButton'
import AppBackButton from './AppBackButton'
import { Credential } from 'features/account/AccountTypes'
import InputErrorMessage from './InputErrorMessage'

//型定義
type AccountSigninFormProps = {
  onSubmit:(data:Credential) => void
  authError: string | null
}


//propsを受け取る関数定義
const AccountSinginForm = ({onSubmit,authError,} : AccountSigninFormProps) => {
  const router = useRouter()
  const methods = useForm<Credential>()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = methods

  const handleBack = () => {
    router.back();
  }

  return (
  <FormProvider {...methods}>
    <form className="w-1/3 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      {authError && <p className="text-red-500">{authError}</p>}
      <div className="mb-4"> 
        <TextInput
          label="メールアドレス"
          type="email"
          placeholder="xxx@xxx.com"
          {...register('email',{
              required: 'メールアドレスは必須です。'
          })}
        />
      </div>
        <div>
          {errors.email && 
            <InputErrorMessage errorMessage={errors.email.message || null} />
          }
        </div>
      <div className="mb-4">
          <TextInput
            label="パスワード"
            type="password"
            placeholder="半角英数8文字以上"
            {...register('password',{
              required: 'パスワードは必須です。',
              minLength: { 
                value: 8,
                message: 'パスワードは8文字以上で入力してください。'
              },
            })}
          />
          
        </div>
        <div>
        {errors.password && 
          <InputErrorMessage errorMessage={errors.password.message || null} />
        }
        </div>
      <div className="flex justify-center">
          <div>
          <AppBackButton text='戻る' className="button-yellow" onClick={handleBack}  />
          <AppSubmitButton text="送信" />
          </div>
        
      </div>
    </form>
  </FormProvider>
  )
}

export default AccountSinginForm