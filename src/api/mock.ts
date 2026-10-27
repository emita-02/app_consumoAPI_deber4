import { MOCKAPI_BASE_URL } from './config';

export class MockApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'MockApiError';
    this.status = status;
  }
}

export interface Favorite {
  id: string;
  artworkId: string;
  title: string;
  artist: string | null;
  imageId: string | null;
  addedAt: string;
}

export interface Note {
  id: string;
  artworkId: string;
  text: string;
  updatedAt: string;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${MOCKAPI_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const message = `MockAPI error ${response.status} ${response.statusText}`;
    throw new MockApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function fetchFavorites(): Promise<Favorite[]> {
  return request<Favorite[]>('/favorites');
}

export async function createFavorite(input: Omit<Favorite, 'id' | 'addedAt'> & { addedAt?: string }): Promise<Favorite> {
  const body = {
    ...input,
    addedAt: input.addedAt ?? new Date().toISOString(),
  };
  return request<Favorite>('/favorites', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function deleteFavorite(id: string): Promise<void> {
  await request<void>(`/favorites/${id}`, {
    method: 'DELETE',
  });
}

export async function fetchNotes(artworkId?: string): Promise<Note[]> {
  if (artworkId) {
    const all = await request<Note[]>('/notes');
    return all.filter((note) => note.artworkId === artworkId);
  }
  return request<Note[]>('/notes');
}

export async function createNote(input: Omit<Note, 'id' | 'updatedAt'> & { updatedAt?: string }): Promise<Note> {
  const body = {
    ...input,
    updatedAt: input.updatedAt ?? new Date().toISOString(),
  };
  return request<Note>('/notes', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function updateNote(id: string, input: Partial<Omit<Note, 'id'>> & { updatedAt?: string }): Promise<Note> {
  const body = {
    ...input,
    updatedAt: input.updatedAt ?? new Date().toISOString(),
  };
  return request<Note>(`/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function deleteNote(id: string): Promise<void> {
  await request<void>(`/notes/${id}`, {
    method: 'DELETE',
  });
}
