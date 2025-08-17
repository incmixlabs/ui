
   import React from 'react';
    import { UserActivityProvider } from './UserActivityContext';
    import App from './App'; // Your main application component

    const Root = () => (
        <UserActivityProvider>
            <App />
        </UserActivityProvider>
    );

    export default Root;


    import React from 'react';
    import { useUserActivityContext } from './UserActivityContext';

    const MyComponent = () => {
        const { isActive, lastActivityTime } = useUserActivityContext();
        // Use isActive and lastActivityTime
        return (
            <div>
                User is {isActive ? 'active' : 'inactive'}. Last activity: {lastActivityTime}.
            </div>
        );
    };


    import React from 'react';
    import useUserActivity from './useUserActivity';

    const withUserActivity = (WrappedComponent) => {
        return (props) => {
            const userActivity = useUserActivity();
            return <WrappedComponent {...props} userActivity={userActivity} />;
        };
    };

    import React from 'react';
    import { withUserActivity } from './withUserActivity';

    const MyComponent = ({ userActivity }) => {
        const { isActive, lastActivityTime } = userActivity;
        // Use isActive and lastActivityTime
        return (
            <div>
                User is {isActive ? 'active' : 'inactive'}. Last activity: {lastActivityTime}.
            </div>
        );
    };

    export default withUserActivity(MyComponent);

https://tkdodo.eu/blog/the-beauty-of-tan-stack-router?utm_medium=social&utm_source=reddit&utm_campaign=tkdodo&utm_content=the-beauty-of-tan-stack-router-1
