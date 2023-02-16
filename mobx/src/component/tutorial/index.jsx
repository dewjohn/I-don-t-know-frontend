import React from 'react';
import { observer } from 'mobx-react-lite';
import { values } from 'mobx';

const TodoCounterView = observer((props) => (
  <div>
    {props.store.pendingCount} pending, {props.store.completedCount} completed
  </div>
));

const UserPickerView = observer((props) => (
  <select
    value={props.user ? props.user.id : ''}
    onChange={(e) => props.onChange(e.target.value)}
  >
    <option value=''>-none-</option>
    {values(props.store.users).map((user) => (
      <option value={user.id}>{user.name}</option>
    ))}
  </select>
));

const TodoView = observer((props) => (
  <>
    <input
      type='checkbox'
      checked={props.todo.done}
      onChange={(e) => props.todo.toggle()}
    />
    <input
      type='text'
      value={props.todo.name}
      onChange={(e) => props.todo.setName(e.target.value)}
    />
    <UserPickerView
      user={props.todo.user}
      store={props.store}
      onChange={(userId) => props.todo.setUser(userId)}
    />
  </>
));

const Mobx = observer((props) => (
  <>
    <div>
      <button
        onClick={(e) => props.store.addTodo(Math.random() * 10, 'New Task')}
      >
        Add Task
      </button>
      {values(props.store.todos).map((todo) => (
        <TodoView store={props.store} todo={todo} />
      ))}
    </div>

    <TodoCounterView store={props.store} />
  </>
));

export default Mobx;
