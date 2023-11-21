import { useRouter } from 'next/router'

const useNavigation = () => {
  const router = useRouter()

  // navigateTo関数は指定されたパスに遷移
  const navigateTo = (path: string): void => {
    router.push(path)
  }

  // goBack関数は前のページに遷移
  const handleBack = (): void => {
    router.back()
  }

  //ホーム画面に遷移
  const handleHome = (): void => {
    router.push('/')
  }

  return {
    navigateTo,
    handleBack,
    handleHome,
  }
}

export default useNavigation