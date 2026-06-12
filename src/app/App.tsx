import { Navigate, Route, Routes } from 'react-router-dom';
import { ConfigurationFormPageContainer } from '@containers/ConfigurationFormPageContainer';
import { DashboardPageContainer } from '@containers/DashboardPageContainer';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPageContainer />} />
      <Route path="/configurations/new" element={<ConfigurationFormPageContainer />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
