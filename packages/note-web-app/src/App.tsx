import React, { useEffect, useReducer } from "react";
import "./App.css";
import { API } from "aws-amplify";

import { List, Input, Button } from "antd";
import "antd/dist/reset.css";
import { v4 as uuid } from "uuid";
import { listNotes } from "./graphql/queries";
import {
  createNote as CreateNote,
  deleteNote as DeleteNote,
  updateNote as UpdateNote,
} from "./graphql/mutations";
import { onCreateNote } from "./graphql/subscriptions";
import { Note } from "./API";

import { GraphQLSubscription } from "@aws-amplify/api";

const CLIENT_ID = uuid();

const initialState = {
  notes: [] as Note[],
  loading: true,
  error: false,
  form: { name: "", description: "" },
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case "ADD_NOTE":
      return { ...state, notes: [action.note as Note, ...state.notes] };
    case "RESET_FORM":
      return { ...state, form: initialState.form };
    case "SET_INPUT":
      return { ...state, form: { ...state.form, [action.name]: action.value } };
    case "SET_NOTES":
      return { ...state, notes: action.notes as Note[], loading: false };
    case "ERROR":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  async function fetchNotes() {
    try {
      const notesData = (await API.graphql({
        query: listNotes,
      })) as { data: { listNotes: { items: Note[] } } };

      dispatch({ type: "SET_NOTES", notes: notesData.data.listNotes.items });
    } catch (err) {
      console.log("error: ", err);
      dispatch({ type: "ERROR" });
    }
  }

  async function createNote() {
    const { form } = state;
    if (!form.name || !form.description) {
      return alert("please enter a name and description");
    }
    const note = { ...form, clientId: CLIENT_ID, completed: false, id: uuid() };
    dispatch({ type: "ADD_NOTE", note });
    dispatch({ type: "RESET_FORM" });
    try {
      await API.graphql({
        query: CreateNote,
        variables: { input: note },
      });
      console.log("successfully created note!");
    } catch (err) {
      console.log("error: ", err);
    }
  }

  async function deleteNote({ id }: { id: string }) {
    const index = state.notes.findIndex((n: Note) => n.id === id);
    const notes = [
      ...state.notes.slice(0, index),
      ...state.notes.slice(index + 1),
    ];
    dispatch({ type: "SET_NOTES", notes });
    try {
      await API.graphql({
        query: DeleteNote,
        variables: { input: { id } },
      });
      console.log("successfully deleted note!");
    } catch (err) {
      console.log({ err });
    }
  }

  async function updateNote(note: Note) {
    const index = state.notes.findIndex((n) => n.id === note.id);
    const notes = [...state.notes];
    notes[index].completed = !note.completed;
    dispatch({ type: "SET_NOTES", notes });
    try {
      await API.graphql({
        query: UpdateNote,
        variables: {
          input: { id: note.id, completed: notes[index].completed },
        },
      });
      console.log("note successfully updated!");
    } catch (err) {
      console.log("error: ", err);
    }
  }

  useEffect(() => {
    fetchNotes();
    const subscription = API.graphql<
      GraphQLSubscription<{ onCreateNote: Note }>
    >({
      query: onCreateNote,
    }).subscribe({
      next: ({ value }) => {
        const note = value.data?.onCreateNote;
        if (!note || CLIENT_ID === note.clientId) return;
        dispatch({ type: "ADD_NOTE", note });
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  function renderItem(item: Note) {
    return (
      <List.Item
        style={{ textAlign: "left" }}
        actions={[
          <p style={styles.p} onClick={() => deleteNote(item)}>
            Delete
          </p>,
          <p style={styles.p} onClick={() => updateNote(item)}>
            {item.completed ? "completed" : "mark completed"}
          </p>,
        ]}
      >
        <List.Item.Meta title={item.name} description={item.description} />
      </List.Item>
    );
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "SET_INPUT", name: e.target.name, value: e.target.value });
  }
  return (
    <div style={styles.container}>
      <Input
        onChange={onChange}
        value={state.form.name}
        placeholder="Note Name"
        name="name"
        style={styles.input}
      />
      <Input
        onChange={onChange}
        value={state.form.description}
        placeholder="Note Description"
        name="description"
        style={styles.input}
      />
      <Button onClick={createNote} type="primary">
        Create Note
      </Button>
      <List
        loading={state.loading}
        dataSource={state.notes}
        renderItem={renderItem}
      />
    </div>
  );
};

const styles = {
  container: { padding: 20 },
  input: { marginBottom: 10 },
  item: { textAlign: "left" },
  p: { color: "#1890ff", cursor: "pointer" },
};

export default App;
