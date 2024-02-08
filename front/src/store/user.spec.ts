import { createPinia } from 'pinia';
import { useUserStore } from '@/store/user';
import MockAdapter from 'axios-mock-adapter';
import Axios from '@/core/api';

describe('user store', () => {
  let store: ReturnType<typeof useUserStore>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    const pinia = createPinia();
    store = useUserStore(pinia);
    mockAxios = new MockAdapter(Axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('test de l\'action de connexion', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5YTliMjZlLTYyMGYtNDhiMS1iMTg0LTY4Y2NkNTVlZGJmZSIsIm5hbWUiOiJ0b3RvIiwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmZyIiwiaWF0IjoxNzA2OTY3NzY5fQ.rDwSV0q6UecAiLKTr-E337GSDoP4MKFbl9V8Z8GOzOo';
    mockAxios.onPost('/connexion', { email, password }).reply(200, { token });

    await store.connexion(email, password);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(store.$state.errorAuthentification).toBeNull();
    // On vérifie qu'on est bien connecté et on a bien le token
    expect(store.$state.isLoggedUser).toBe(true);
    expect(store.$state.token).toBe(token);
  });

  it('test de l\'action de déconnexion', async () => {
    await store.logout();

    // On vérifie qu'on est bien déconnecté et qu'on a plus le token
    expect(store.$state.isLoggedUser).toBe(false);
    expect(store.$state.token).toBeNull();
  });

  it('tests des getters', () => {
    // On met à jour le store avec le token avec name : toto et email : test2@test.fr
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5YTliMjZlLTYyMGYtNDhiMS1iMTg0LTY4Y2NkNTVlZGJmZSIsIm5hbWUiOiJ0b3RvIiwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmZyIiwiaWF0IjoxNzA2OTY3NzY5fQ.rDwSV0q6UecAiLKTr-E337GSDoP4MKFbl9V8Z8GOzOo';
    store.$patch({
      isLoggedUser: true,
      token,
      errorAuthentification: null
    });

    expect(store.isLogged).toBe(true);
    expect(store.getToken).toBe(token);
    expect(store.getErrorAuthentification).toBeNull();
    expect(store.getUser).not.toBeNull();
    expect(store.getUser?.name).toEqual('toto');
    expect(store.getUser?.email).toEqual('test2@test.fr');
  });
});