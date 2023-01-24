import React, { useEffect, useReducer } from "react";
import "./App.css";
import { API } from "aws-amplify";
import { List } from "antd";
import "antd/dist/reset.css";

import { listNotes } from "./graphql/queries";
import { Note } from "./API";

const initialState = {
  notes: [],
  loading: true,
  error: false,
  form: { name: "", description: "" },
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_NOTES":
      return { ...state, notes: action.notes, loading: false };
    case "ERROR":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

function App() {
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

  useEffect(() => {
    fetchNotes();
  }, []);

  function renderItem(item: Note) {
    return (
      <List.Item style={{ textAlign: "left" }}>
        <List.Item.Meta title={item.name} description={item.description} />
      </List.Item>
    );
  }

  return (
    <div style={styles.container}>
      <List
        loading={state.loading}
        dataSource={state.notes}
        renderItem={renderItem}
      />
    </div>
  );
}

const styles = {
  container: { padding: 20 },
  input: { marginBottom: 10 },
  item: { textAlign: "left" },
  p: { color: "#1890ff" },
};

export default App;
