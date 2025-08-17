import { create } from 'zustand';

type QueryStore = {
  page?: number
  limit?: number
  select?: string
  filter?: string
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setSelect: (select: string) => void
  setFilter: (filter: string) => void
};
export type QueryResponse = {
  page: number
  limit: number
  total: number
  lastUpdated: number
}
const useQueryStore = create<QueryStore>((set) => ({
  page: 1,
  limit: 10,
  select: '',
  filter: '',
  setPage: (page: number) => {
    set({ page });
    // Update URL
    const params = new URLSearchParams(window.location.search);
    if (page) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    window.history.pushState({}, '', `?${params.toString()}`);
  },
  setLimit: (limit: number) => {
    set({ limit });
    // Update URL
    const params = new URLSearchParams(window.location.search);
    if (limit) {
      params.set('limit', limit.toString());
    } else {
      params.delete('limit');
    }
    window.history.pushState({}, '', `?${params.toString()}`);
  },
  setSelect: (select: string) => {
    set({ select });
    // Update URL
    const params = new URLSearchParams(window.location.search);
    if (select) {
      params.set('select', select);
    } else {
      params.delete('select');
    }
    window.history.pushState({}, '', `?${params.toString()}`);
  },
  setFilter: (filter: string) => {
    set({ filter });
    // Update URL
    const params = new URLSearchParams(window.location.search);
    if (filter) {
      params.set('filter', filter);
    } else {
      params.delete('filter');
    }
    window.history.pushState({}, '', `?${params.toString()}`);
  },
}));

// Initialize store from URL on app load
const params = new URLSearchParams(window.location.search);
if (params.has('page')) {
  useQueryStore.setState({ page: parseInt(params.get('page') || '1', 10) });
}
if (params.has('limit')) {
  useQueryStore.setState({ limit: parseInt(params.get('limit') || '10', 10) });
}
if (params.has('select')) {
  useQueryStore.setState({ select: params.get('select') });
}
if (params.has('filter')) {
  useQueryStore.setState({ filter: params.get('filter') });
}
