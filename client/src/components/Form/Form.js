import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/post";

// Get Current ID

const initialState = {
  creator: "",
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(initialState);
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const classes = useStyles();

  const dispatch = useDispatch();

  const { creator, title, message, tags, selectedFile } = postData;
  const onChange = (e) => {
    if (e.target.name === "tags") {
      setPostData({ ...postData, [e.target.name]: e.target.value.split(",") });
    } else {
      setPostData({ ...postData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData(initialState);
  };
  return (
    <Paper className={`${classes.root} ${classes.form}`}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing a Memory" : "Creating Memory"}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          value={creator}
          onChange={(e) => onChange(e)}
          fullwidth
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullwidth="true"
          value={title}
          onChange={(e) => onChange(e)}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullwidth="true"
          value={message}
          onChange={(e) => onChange(e)}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags seperated with coma's"
          fullwidth="true"
          value={tags}
          onChange={(e) => onChange(e)}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullwidth="true"
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullwidth="true"
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
