import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPageContainer } from '@containers/DashboardPageContainer';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPageContainer />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
