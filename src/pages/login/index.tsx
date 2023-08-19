import LoginPageMain from '@/pageComponents/login/LoginPageMain';

import useUserCheckForRedirection from '@/hooks/useUserCheckForRedirection';

const LoginPage = () => {
  useUserCheckForRedirection('Login');

  return <LoginPageMain />;
};

export default LoginPage;
