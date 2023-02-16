import { values } from 'mobx';
import { types } from 'mobx-state-tree';

const Todo = types
  .model({
    id: types.identifierNumber,
    name: types.optional(types.string, ''),
    done: types.optional(types.boolean, false),
    users: types.maybe(types.reference(types.late(() => User))),
  })
  .actions((self) => ({ 
    setName(newName) {
      self.name = newName;
    },
    setUser(user) {
      if (user === '') {
        self.user = undefined;
      } else {
        self.user = user;
      }
    },
    toggle() {
      self.done = !self.done;
    },
  }));

const User = types.model({
  name: types.optional(types.string, ''),
});

const RootStore = types
  .model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {}),
  })
  .views((self) => ({
    // computed
    get pendingCount() {
      return values(self.todos).filter((todo) => !todo.done).length;
    },
    get completedCount() {
      return values(self.todos).filter((todo) => todo.done).length;
    },
    getTodosWhereDoneIs(done) {
      return values(self.todos).filter((todo) => todo.done === done);
    },
  }))
  .actions((self) => ({
    addTodo(id, name) {
      self.todos.set(id, Todo.create({ id, name }));
    },
  }));

const store = RootStore.create({
  users: {
    1: {
      id: '1',
      name: 'john',
    },
    2: {
      id: '2',
      name: 'dewei',
    },
  },
  todos: {
    1: {
      id: 1,
      name: 'Eat a cake',
      done: true,
    },
  },
});

export default store;
