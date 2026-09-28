import { useState } from 'react';
import './App.css';
import { GALPAO_ID } from './config';
import { useDashboard } from './hooks/useDashboard';

/* ---------- Ícones (SVG inline, sem dependências extras) ---------- */
const Icon = {
  Overview: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Barn: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10 12 3l9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  Silo: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 3h8l2 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7l2-4Z" />
      <path d="M6 9h12" />
    </svg>
  ),
  Reports: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
      <path d="M9.5 13h5M9.5 16.5h5" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.04 1.56h.14a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9c.3.51.85.85 1.44.86H21a2 2 0 1 1 0 4h-.09c-.6 0-1.14.35-1.44.86Z" />
    </svg>
  ),
  Help: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2-2.4 3.5" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Drop: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
    </svg>
  ),
  Thermo: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3a2 2 0 0 0-2 2v9.3a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2Z" />
    </svg>
  ),
  Warn: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const navItems = [
  { label: 'Visão geral', icon: Icon.Overview, active: true },
  { label: 'Galpões', icon: Icon.Barn },
  { label: 'Silos', icon: Icon.Silo },
  { label: 'Relatórios', icon: Icon.Reports },
  { label: 'Configurações', icon: Icon.Settings },
];

// Limites usados só para destacar visualmente o card de clima em alerta.
const LIMITE_TEMPERATURA = 27;
const LIMITE_UMIDADE_MIN = 45;

// Mapeia o `tipoErro` que vem da API para um estilo de alerta.
// Qualquer tipo não mapeado cai no "warning" (amarelo) por padrão.
const TIPO_ALERTA_TONE = {
  ALTA_TEMPERATURA: 'critical',
  SILO_CRITICO: 'warning',
};

function formatarHora(dataIso) {
  if (!dataIso) return '—';
  const data = new Date(dataIso);
  if (Number.isNaN(data.getTime())) return '—';
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

/* ---------- Sidebar ---------- */
function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className={`sidebar${menuOpen ? ' sidebar--open' : ''}`}>
      <div className="sidebar-topbar">
        <div className="brand">
          <span className="brand-mark">
            <Icon.Silo />
          </span>
          <div>
            <div className="brand-name">TempAgro</div>
            <div className="brand-sub">Gestão Avícola</div>
          </div>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <Icon.Close /> : <Icon.Menu />}
        </button>
      </div>

      <button className="profile-pill">
        <span className="avatar" />
        Perfil do gerente da fazenda
      </button>

      <nav className="nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item${item.active ? ' nav-item--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <item.icon />
            {item.label}
          </button>
        ))}
      </nav>

      <button className="add-sensor">
        <Icon.Plus />
        Adicionar sensor
      </button>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Icon.Help />
          Ajuda
        </button>
        <button className="nav-item">
          <Icon.Logout />
          Sair
        </button>
      </div>
    </aside>
  );
}

/* ---------- Cabeçalho ---------- */
function Header({ nomeGalpao, carregando }) {
  return (
    <header className="page-header">
      <div>
        <h1>{carregando ? 'Carregando...' : nomeGalpao || 'Galpão'}</h1>
        <p>Monitoramento em tempo real das instalações.</p>
      </div>
    </header>
  );
}

/* ---------- Card de microclima (temperatura/umidade) ---------- */
function MicroclimaCard({ clima }) {
  const temperatura = clima?.temperaturaAtual;
  const umidade = clima?.umidadeAtual;
  const temperaturaAlta = temperatura != null && temperatura >= LIMITE_TEMPERATURA;
  const umidadeBaixa = umidade != null && umidade <= LIMITE_UMIDADE_MIN;

  return (
    <div className="card microclima-card">
      <div className="card-header">
        <div>
          <h2>Microclima</h2>
          <p className="card-subtitle">
            Atualizado às {formatarHora(clima?.dataUltimaLeitura)}
          </p>
        </div>
      </div>

      <div className="galpao-metrics">
        <div className={`metric${temperaturaAlta ? ' metric--alert' : ''}`}>
          <span className="metric-icon">
            <Icon.Thermo />
          </span>
          <div>
            <div className="metric-label">Temperatura</div>
            <div className="metric-value">
              {temperatura != null ? Number(temperatura).toFixed(1) : '--'}
              <span className="metric-unit">°C</span>
            </div>
          </div>
        </div>

        <div className={`metric${umidadeBaixa ? ' metric--alert' : ''}`}>
          <span className="metric-icon">
            <Icon.Drop />
          </span>
          <div>
            <div className="metric-label">Umidade</div>
            <div className="metric-value">
              {umidade != null ? Math.round(umidade) : '--'}
              <span className="metric-unit">%</span>
            </div>
          </div>
        </div>
      </div>

      {temperatura == null && umidade == null && (
        <p className="empty-note">Nenhum sensor enviou dados ainda para este galpão.</p>
      )}
    </div>
  );
}

/* ---------- Cards de silos ---------- */
function SilosCard({ silos }) {
  if (!silos || silos.length === 0) {
    return (
      <div className="card silo-card">
        <div className="card-header">
          <h2>Volumetria de Silos</h2>
        </div>
        <p className="empty-note">Nenhum silo cadastrado para este galpão.</p>
      </div>
    );
  }

  return (
    <div className="card silo-card">
      <div className="card-header">
        <div>
          <h2>Volumetria de Silos</h2>
          <p className="card-subtitle">Níveis de ração armazenada em tempo real</p>
        </div>
      </div>

      <div className="silo-grid">
        {silos.map((silo) => {
          const nivel = silo.nivelPorcentagem;
          const critico = nivel != null && nivel <= 15;
          return (
            <div className="silo" key={silo.id}>
              <div className={`silo-tube${critico ? ' silo-tube--critical' : ''}`}>
                <div className="silo-fill" style={{ height: `${nivel ?? 0}%` }} />
              </div>
              <div className="silo-label">
                {silo.nome}
                {critico && <Icon.Warn />}
              </div>
              <div className="silo-value">
                {nivel != null ? `${Math.round(nivel)}%` : 'sem leitura'}
              </div>
              {silo.volumeEstimadoKg != null && (
                <div className="silo-peso">
                  {Math.round(silo.volumeEstimadoKg)}kg / {Math.round(silo.capacidadeKg)}kg
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Painel de alertas ---------- */
function AlertasCard({ alertas }) {
  return (
    <div className="card alerts-card">
      <div className="card-header">
        <h2>Alertas Críticos</h2>
        <span className="badge-count">{alertas.length} Ativos</span>
      </div>

      {alertas.length === 0 ? (
        <p className="empty-note">Nenhum alerta ativo no momento.</p>
      ) : (
        <ul className="alert-list">
          {alertas.map((alerta) => {
            const tone = TIPO_ALERTA_TONE[alerta.tipoErro] || 'warning';
            return (
              <li className={`alert-item alert-item--${tone}`} key={alerta.id}>
                <span className="alert-icon">
                  <Icon.Warn />
                </span>
                <div className="alert-body">
                  <div className="alert-title">{alerta.mensagem}</div>
                </div>
                <span className="alert-time">{formatarHora(alerta.dataCriacao)}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ---------- App ---------- */
export default function App() {
  const { dados, carregando, erro } = useDashboard(GALPAO_ID);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="content">
        <Header nomeGalpao={dados?.nomeGalpao} carregando={carregando} />

        {erro && (
          <div className="card error-banner">
            Não foi possível carregar os dados do galpão: {erro}
          </div>
        )}

        {carregando ? (
          <p className="empty-note">Buscando dados do galpão...</p>
        ) : (
          <>
            <section className="mid-grid">
              <MicroclimaCard clima={dados?.clima} />
              <SilosCard silos={dados?.silos} />
            </section>
            <AlertasCard alertas={dados?.alertasAtivos || []} />
          </>
        )}
      </main>
    </div>
  );
}