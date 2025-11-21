// API Client for Meu Ritmo
// Centralized API communication layer

import type { ApiResponse, PaginationParams } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error?.message || 'Request failed',
        data.error?.code || 'UNKNOWN_ERROR',
        response.status,
        data.error?.details
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Network error occurred',
      'NETWORK_ERROR',
      0,
      error
    );
  }
}

// ==================== WORKOUT TYPES (User Configuration) ====================

export const workoutTypesApi = {
  list: (userId: string) =>
    fetchApi(`/users/${userId}/workout-types`),

  get: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/workout-types/${id}`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/workout-types`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (userId: string, id: string, data: any) =>
    fetchApi(`/users/${userId}/workout-types/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/workout-types/${id}`, {
      method: 'DELETE',
    }),
};

// ==================== WORKOUT ACTIVITIES ====================

export const workoutActivitiesApi = {
  list: (userId: string, params?: PaginationParams & { startDate?: string; endDate?: string }) =>
    fetchApi(`/users/${userId}/workouts?${new URLSearchParams(params as any)}`),

  get: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/workouts/${id}`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/workouts`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (userId: string, id: string, data: any) =>
    fetchApi(`/users/${userId}/workouts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/workouts/${id}`, {
      method: 'DELETE',
    }),

  statistics: (userId: string, params: { startDate: string; endDate: string }) =>
    fetchApi(`/users/${userId}/workouts/statistics?${new URLSearchParams(params)}`),
};

// ==================== SLEEP ====================

export const sleepApi = {
  list: (userId: string, params?: PaginationParams & { startDate?: string; endDate?: string }) =>
    fetchApi(`/users/${userId}/sleep?${new URLSearchParams(params as any)}`),

  get: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/sleep/${id}`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/sleep`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (userId: string, id: string, data: any) =>
    fetchApi(`/users/${userId}/sleep/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/sleep/${id}`, {
      method: 'DELETE',
    }),

  statistics: (userId: string, params: { startDate: string; endDate: string }) =>
    fetchApi(`/users/${userId}/sleep/statistics?${new URLSearchParams(params)}`),
};

// ==================== WATER INTAKE ====================

export const waterApi = {
  list: (userId: string, params?: { date?: string }) =>
    fetchApi(`/users/${userId}/water?${new URLSearchParams(params as any)}`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/water`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  dailyTotal: (userId: string, date: string) =>
    fetchApi(`/users/${userId}/water/daily/${date}`),

  statistics: (userId: string, params: { startDate: string; endDate: string }) =>
    fetchApi(`/users/${userId}/water/statistics?${new URLSearchParams(params)}`),
};

// ==================== NUTRITION ====================

export const nutritionApi = {
  list: (userId: string, params?: PaginationParams & { startDate?: string; endDate?: string }) =>
    fetchApi(`/users/${userId}/nutrition?${new URLSearchParams(params as any)}`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/nutrition`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  statistics: (userId: string, params: { startDate: string; endDate: string }) =>
    fetchApi(`/users/${userId}/nutrition/statistics?${new URLSearchParams(params)}`),
};

// ==================== MOOD ====================

export const moodApi = {
  list: (userId: string, params?: PaginationParams & { startDate?: string; endDate?: string }) =>
    fetchApi(`/users/${userId}/mood?${new URLSearchParams(params as any)}`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/mood`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  statistics: (userId: string, params: { startDate: string; endDate: string }) =>
    fetchApi(`/users/${userId}/mood/statistics?${new URLSearchParams(params)}`),
};

// ==================== MENTAL ACTIVITIES ====================

export const mentalActivityTypesApi = {
  list: (userId: string) =>
    fetchApi(`/users/${userId}/mental-activity-types`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/mental-activity-types`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (userId: string, id: string, data: any) =>
    fetchApi(`/users/${userId}/mental-activity-types/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/mental-activity-types/${id}`, {
      method: 'DELETE',
    }),
};

export const mentalActivitiesApi = {
  list: (userId: string, params?: PaginationParams & { startDate?: string; endDate?: string }) =>
    fetchApi(`/users/${userId}/mental-activities?${new URLSearchParams(params as any)}`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/mental-activities`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  statistics: (userId: string, params: { startDate: string; endDate: string }) =>
    fetchApi(`/users/${userId}/mental-activities/statistics?${new URLSearchParams(params)}`),
};

// ==================== TRANSACTION CATEGORIES ====================

export const transactionCategoriesApi = {
  list: (userId: string) =>
    fetchApi(`/users/${userId}/transaction-categories`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/transaction-categories`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (userId: string, id: string, data: any) =>
    fetchApi(`/users/${userId}/transaction-categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/transaction-categories/${id}`, {
      method: 'DELETE',
    }),
};

// ==================== TRANSACTIONS ====================

export const transactionsApi = {
  list: (userId: string, params?: PaginationParams & { startDate?: string; endDate?: string; type?: string }) =>
    fetchApi(`/users/${userId}/transactions?${new URLSearchParams(params as any)}`),

  get: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/transactions/${id}`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/transactions`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (userId: string, id: string, data: any) =>
    fetchApi(`/users/${userId}/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/transactions/${id}`, {
      method: 'DELETE',
    }),

  statistics: (userId: string, params: { startDate: string; endDate: string }) =>
    fetchApi(`/users/${userId}/transactions/statistics?${new URLSearchParams(params)}`),
};

// ==================== FINANCIAL GOALS ====================

export const financialGoalsApi = {
  list: (userId: string) =>
    fetchApi(`/users/${userId}/financial-goals`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/financial-goals`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (userId: string, id: string, data: any) =>
    fetchApi(`/users/${userId}/financial-goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/financial-goals/${id}`, {
      method: 'DELETE',
    }),
};

// ==================== GOALS ====================

export const goalsApi = {
  list: (userId: string, params?: { status?: string; category?: string }) =>
    fetchApi(`/users/${userId}/goals?${new URLSearchParams(params as any)}`),

  get: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/goals/${id}`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/goals`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (userId: string, id: string, data: any) =>
    fetchApi(`/users/${userId}/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateProgress: (userId: string, id: string, current: number) =>
    fetchApi(`/users/${userId}/goals/${id}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ current }),
    }),

  delete: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/goals/${id}`, {
      method: 'DELETE',
    }),
};

// ==================== HABITS ====================

export const habitsApi = {
  list: (userId: string) =>
    fetchApi(`/users/${userId}/habits`),

  create: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/habits`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (userId: string, id: string, data: any) =>
    fetchApi(`/users/${userId}/habits/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  logCompletion: (userId: string, habitId: string, data: { date: string; completed: boolean; notes?: string }) =>
    fetchApi(`/users/${userId}/habits/${habitId}/log`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  delete: (userId: string, id: string) =>
    fetchApi(`/users/${userId}/habits/${id}`, {
      method: 'DELETE',
    }),
};

// ==================== DASHBOARD ====================

export const dashboardApi = {
  getWidgets: (userId: string) =>
    fetchApi(`/users/${userId}/dashboard/widgets`),

  createWidget: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/dashboard/widgets`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateWidget: (userId: string, widgetId: string, data: any) =>
    fetchApi(`/users/${userId}/dashboard/widgets/${widgetId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteWidget: (userId: string, widgetId: string) =>
    fetchApi(`/users/${userId}/dashboard/widgets/${widgetId}`, {
      method: 'DELETE',
    }),

  updateLayout: (userId: string, layout: any) =>
    fetchApi(`/users/${userId}/dashboard/layout`, {
      method: 'PUT',
      body: JSON.stringify({ layout }),
    }),

  getOverview: (userId: string, params?: { date?: string }) =>
    fetchApi(`/users/${userId}/dashboard/overview?${new URLSearchParams(params as any)}`),
};

// ==================== HEALTH SCORES ====================

export const healthScoresApi = {
  getCurrent: (userId: string) =>
    fetchApi(`/users/${userId}/health-scores/current`),

  getHistory: (userId: string, params: { startDate: string; endDate: string }) =>
    fetchApi(`/users/${userId}/health-scores/history?${new URLSearchParams(params)}`),

  getPhysicalScore: (userId: string, date?: string) =>
    fetchApi(`/users/${userId}/health-scores/physical${date ? `?date=${date}` : ''}`),

  getMentalScore: (userId: string, date?: string) =>
    fetchApi(`/users/${userId}/health-scores/mental${date ? `?date=${date}` : ''}`),

  getFinancialScore: (userId: string, date?: string) =>
    fetchApi(`/users/${userId}/health-scores/financial${date ? `?date=${date}` : ''}`),
};

// ==================== USER SETTINGS ====================

export const settingsApi = {
  get: (userId: string) =>
    fetchApi(`/users/${userId}/settings`),

  update: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/settings`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateNotifications: (userId: string, data: any) =>
    fetchApi(`/users/${userId}/settings/notifications`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

// ==================== INSIGHTS ====================

export const insightsApi = {
  list: (userId: string, params?: { viewed?: boolean; priority?: string }) =>
    fetchApi(`/users/${userId}/insights?${new URLSearchParams(params as any)}`),

  markAsViewed: (userId: string, insightId: string) =>
    fetchApi(`/users/${userId}/insights/${insightId}/view`, {
      method: 'PATCH',
    }),

  markAllAsViewed: (userId: string) =>
    fetchApi(`/users/${userId}/insights/view-all`, {
      method: 'PATCH',
    }),
};

// ==================== ACHIEVEMENTS ====================

export const achievementsApi = {
  list: (userId: string) =>
    fetchApi(`/users/${userId}/achievements`),

  getProgress: (userId: string, achievementId: string) =>
    fetchApi(`/users/${userId}/achievements/${achievementId}/progress`),
};

// ==================== REPORTS ====================

export const reportsApi = {
  getMonthly: (userId: string, month: string) =>
    fetchApi(`/users/${userId}/reports/monthly/${month}`),

  getWeekly: (userId: string, week: string) =>
    fetchApi(`/users/${userId}/reports/weekly/${week}`),

  exportData: (userId: string, params: { format: 'json' | 'csv'; startDate: string; endDate: string }) =>
    fetchApi(`/users/${userId}/reports/export?${new URLSearchParams(params)}`),
};

export { ApiError };
