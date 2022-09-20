import Navigation from './Components/Views/Navigation/Navigation';
import AdsProvider from './Components/Features/AdsProvider';
import AuthProvider from './Components/Features/AuthProvider';
import ErrorsProvider from './Components/Features/ErrorsProvider';
import ErrorAlert from './Components/Views/ErrorAlert';
import DisplayContent from './Components/Utility/DisplayContent';
import LoadingProvider from './Components/Features/LoadingProvider';

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
