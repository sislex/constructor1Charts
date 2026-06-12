import { Link } from 'react-router-dom';
import { Button } from '@components/dumb/common/Button';
import type { AppTheme } from '@store/slices/settingsSlice';
import './DashboardShell.css';

export interface DashboardShellProps {
  theme: AppTheme;
  configurationCount: number;
  quoteSourceCount: number;
  onThemeToggle: () => void;
}

export function DashboardShell({
  theme,
  configurationCount,
  quoteSourceCount,
  onThemeToggle
}: DashboardShellProps) {
  return (
    <main className="dashboard-shell">
      <header className="dashboard-shell__header">
        <div>
          <p className="dashboard-shell__eyebrow">ArbiDex Ecosystem</p>
          <h1>Bot Configurations</h1>
        </div>
        <div className="dashboard-shell__actions">
          <Button ariaLabel="Toggle color theme" onClick={onThemeToggle}>
            {theme === 'dark' ? 'Light theme' : 'Dark theme'}
          </Button>
          <Link className="dashboard-shell__create-link" to="/configurations/new">
            Create Configuration
          </Link>
        </div>
      </header>

      <section className="dashboard-shell__grid" aria-label="Configuration summary">
        <article className="dashboard-shell__panel">
          <span className="dashboard-shell__metric">{configurationCount}</span>
          <span className="dashboard-shell__label">Configurations</span>
        </article>
        <article className="dashboard-shell__panel">
          <span className="dashboard-shell__metric">{quoteSourceCount}</span>
          <span className="dashboard-shell__label">Quote sources</span>
        </article>
        <article className="dashboard-shell__panel">
          <span className="dashboard-shell__metric">Replay</span>
          <span className="dashboard-shell__label">Default player mode</span>
        </article>
      </section>

      <section className="dashboard-shell__workspace">
        <div className="dashboard-shell__empty">
          <h2>No configurations yet</h2>
          <p>Create the first bot configuration to select quote sources, set weighted average rules and test demo trading flows.</p>
        </div>
      </section>
    </main>
  );
}
