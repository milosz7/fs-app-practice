import Navigation from './Components/Views/Navigation/Navigation';
import AdsProvider from './Components/Providers/AdsProvider';
import AuthProvider from './Components/Providers/AuthProvider';
import ErrorsProvider from './Components/Providers/ErrorsProvider';
import ErrorAlert from './Components/Views/ErrorAlert';
import DisplayContent from './Components/Utility/DisplayContent';
import LoadingProvider from './Components/Providers/LoadingProvider';

const App = () => {
  return (
    <LoadingProvider>
      <ErrorsProvider>
        <AuthProvider>
          <AdsProvider>
            <ErrorAlert />
            <Navigation />
            <DisplayContent />
          </AdsProvider>
        </AuthProvider>
      </ErrorsProvider>
    </LoadingProvider>
  );
};

export default App;
