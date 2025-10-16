export interface LeadData {
  nome: string;
  email: string;
  telefone?: string;
}

export interface GoogleSheetsResponse {
  status: 'success' | 'error';
  message?: string;
  stack?: string;
}

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzJ4vEd4k4QJxYvvPMWVYLBfFqBqCKTvJZe_Nm4Y0cIa1xRKYLSq_3zy7_7g7Wn8vJz/exec';

export async function enviarLead(dados: LeadData): Promise<GoogleSheetsResponse> {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao enviar lead:', error);
    return {
      status: 'error',
      message: 'Erro ao conectar com o servidor',
    };
  }
}
