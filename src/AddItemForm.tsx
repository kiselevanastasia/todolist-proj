import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFromPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFromPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<null | string>(null);

  const onNewTaskTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value);
    setError(null);
  };

  const onKeyDownChangeHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (newTaskTitle.trim() !== '') {
        props.addItem( newTaskTitle.trim());
        setNewTaskTitle('');
      } else {
        setError('пустое поле');
      }
    }
  };

  const onAddTaskChangeHandler = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('пустое поле');
    }
  };

  return <div>
    <input
      value={newTaskTitle}
      onChange={onNewTaskTitleChangeHandler}
      onKeyDown={onKeyDownChangeHandler}
      className={error ? 'error' : ''} />
    <button onClick={onAddTaskChangeHandler}>+</button>
    {error && <div className={'error-message'}>{error}</div>}
  </div>;
}
