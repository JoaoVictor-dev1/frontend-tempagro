import { API_BASE_URL, API_KEY, GALPAO_ID } from '../config';

/**
 * Busca o DashboardResponseDto do backend para um galpão específico.
 * GET /api/Galpao/{id}/dashboard  (header obrigatório: ApiKey)
 *
 * Lança um Error com mensagem amigável em caso de falha, para que os
 * componentes que chamam essa função possam exibir o problema na tela.
 */
export async function fetchDashboard(galpaoId = GALPAO_ID) {
  const url = `${API_BASE_URL}/api/Galpao/${galpaoId}/dashboard`;

  const resposta = await fetch(url, {
    headers: {
      ApiKey: API_KEY,
    },
  });

  if (!resposta.ok) {
    if (resposta.status === 401 || resposta.status === 403) {
      throw new Error('ApiKey inválida ou não enviada corretamente.');
    }
    if (resposta.status === 404) {
      throw new Error(`Galpão ${galpaoId} não encontrado.`);
    }
    throw new Error(`Falha ao buscar dashboard (status ${resposta.status}).`);
  }

  return resposta.json();
}