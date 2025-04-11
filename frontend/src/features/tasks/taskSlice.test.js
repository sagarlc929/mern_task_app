import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import taskService from './taskService'
import { getTasks } from './taskSlice'

const mockStore = configureMockStore([thunk]);

describe('taskSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tasks: {
        tasks: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
      },
      auth: {
        user: { token: 'mock_token' },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    if (store?.clearActions) {
      store.clearActions(); // only clear if available
    }
  });

  test('calls the taskService to fetch tasks', async () => {
    const token = 'mock_token';
    const tasks = [
      {
        _id: '649e4e271947362dc297436a',
        text: 'Learn Tailwind',
        user: '649023b41935f5557f8e7ca4',
        createdAt: '2023-06-30T03:38:15.287Z',
        updatedAt: '2023-06-30T03:38:15.287Z',
        __v: 0
      }
    ];

    const getTasksSpy = vi.spyOn(taskService, 'getTasks').mockResolvedValue(tasks);

    await store.dispatch(getTasks());

    expect(getTasksSpy).toHaveBeenCalledWith(token);
  });
});

