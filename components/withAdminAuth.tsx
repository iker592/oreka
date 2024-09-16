import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkAdminStatus = async () => {
        try {
          const user = await Auth.currentAuthenticatedUser();
          const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
          if (!groups || !groups.includes('admin')) {
            router.push('/');
          }
        } catch (error) {
          router.push('/');
        }
      };

      checkAdminStatus();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
