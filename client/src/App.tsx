import Navigation from './Components/Views/Navigation/Navigation';
import AdsProvider from './Components/Providers/AdsProvider';
import AuthProvider from './Components/Providers/AuthProvider';
import AlertsProvider from './Components/Providers/AlertsProvider';
import MessageAlert from './Components/Views/MessageAlert';
import DisplayContent from './Components/Utility/DisplayContent';
import LoadingProvider from './Components/Providers/LoadingProvider';
import DialogControlsProvider from './Components/Providers/DialogControlsProvider';
import SearchProvider from './Components/Providers/SearchProvider';

const App = () => {
  return (
    <LoadingProvider>
      <AlertsProvider>
        <AuthProvider>
          <DialogControlsProvider>
            <AdsProvider>
              <SearchProvider>
                <MessageAlert />
                <Navigation />
                <DisplayContent />
              </SearchProvider>
            </AdsProvider>
          </DialogControlsProvider>
        </AuthProvider>
      </AlertsProvider>
    </LoadingProvider>
  );
};

export default App;
