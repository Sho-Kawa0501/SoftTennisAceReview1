import { useRouter } from 'next/router';

const useNavigation = () => {
  const router = useRouter();

  // navigateTo関数は指定されたパスに遷移する
  const navigateTo = (path: string): void => {
    router.push(path);
  };

  // goBack関数は前のページに戻る
  const handleBack = (): void => {
    router.back();
  };

  const handleHome = (): void => {
    router.push('/')
  }

  return {
    navigateTo,
    handleBack,
    handleHome,
  };
};

export default useNavigation