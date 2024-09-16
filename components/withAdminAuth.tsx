import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/router';
import { fetchAuthSession } from "aws-amplify/auth";

const withAdminAuth = (WrappedComponent: ComponentType<any>) => {
  const WithAdminAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkAdminStatus = async () => {
        console.log('Checking admin status');
        try {
          const { tokens } = await fetchAuthSession();
          if (tokens && tokens.accessToken) {
            const groups = (tokens.accessToken.payload["cognito:groups"] || []) as string[];
            console.log("withAdminAuth - User belongs to following groups:", groups);
            if (!groups || !groups.includes('admin')) {
                console.log('withAdminAuth - User is not an admin, redirecting to home');
                if (process.env.NODE_ENV != 'development') {
                    router.push('/');
                } else {
                    console.log('withAdminAuth - User is not an admin but in dev mode, not redirecting to home');
                }
            } else {
                console.log('withAdminAuth - User is an admin');
            }
          }
        } catch (error) {
          console.error('withAdminAuth - Error checking admin status:', error);
          router.push('/');
        }
      };

      checkAdminStatus();
    }, [router]);

    console.log('withAdminAuth - Rendering wrapped component');
    return <WrappedComponent {...props} />;
  };
  
  WithAdminAuth.displayName = `WithAdminAuth(${getDisplayName(WrappedComponent)})`;
  
  return WithAdminAuth;
};

// Helper function to get the display name of a component
// Helper function to get the display name of a component
function getDisplayName(WrappedComponent: ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAdminAuth;
