import HomePageMain from '@/pageComponents/HomePageMain';

import useUserCheckForRedirection from '@/hooks/useUserCheckForRedirection';

const HomePage = () => {
  useUserCheckForRedirection('Home');

  return <HomePageMain />;
};

export default HomePage;
