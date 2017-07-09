import * as React from 'react';

export interface Props extends React.Props<{}> {
  onSubmit: (name: string) => void;
}

const AddTodoForm = (props: Props): JSX.Element => {

  let textInput: HTMLInputElement;

  const setTextInput = (input: HTMLInputElement) => {
    textInput = input;
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textInput.value.trim()) {
      return;
    }
    props.onSubmit(textInput.value);
    textInput.value = '';
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          ref={setTextInput}
        />
        <button type='submit'>
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
