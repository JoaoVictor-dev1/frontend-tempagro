import { useEffect, useRef, useState } from 'react';
import { fetchDashboard } from '../services/dashboardApi';
import { POLLING_MS } from '../config';

/**
 * Busca o dashboard de um galpão e atualiza periodicamente (polling).
 * Retorna { dados, carregando, erro, atualizadoEm }.
 *
 * `carregando` só fica true na primeira busca — nas atualizações
 * seguintes os valores antigos continuam na tela até os novos chegarem,
 * evitando "piscar" a interface a cada 10s.
 */
export function useDashboard(galpaoId) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const primeiraCarga = useRef(true);

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      try {
        const resultado = await fetchDashboard(galpaoId);
        if (!cancelado) {
          setDados(resultado);
          setErro(null);
        }
      } catch (e) {
        if (!cancelado) setErro(e.message);
      } finally {
        if (!cancelado && primeiraCarga.current) {
          setCarregando(false);
          primeiraCarga.current = false;
        }
      }
    }

    carregar();
    const intervalo = setInterval(carregar, POLLING_MS);

    return () => {
      cancelado = true;
      clearInterval(intervalo);
    };
  }, [galpaoId]);

  return { dados, carregando, erro };
}