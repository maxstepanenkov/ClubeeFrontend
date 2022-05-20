import { useState } from 'react';
import MainLayout from "../components/layout";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

const CreateArticle = () => {
  const [articleData, setArticleData] = useState({
    title: '',
    body: '',
  });
  const [alertIsOpen, setAlertIsOpen] = useState({
    isOpen: false,
    severity: 'success',
    message: ''
  });

  const submitArticle = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article`, {
      method: 'POST',
      body: JSON.stringify(articleData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status == 500) {
      console.log('dssss')
      setAlertIsOpen(prevState => ({
        ...prevState,
        isOpen: true,
        severity: "error",
        message: response.statusText,
      }))
    } else if (response.status === 200) {
      const data = await response.json();
      setAlertIsOpen(prevState => ({
        ...prevState,
        isOpen: true,
        severity: 'success',
        message: 'Article has been created'
      }))
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setArticleData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <MainLayout>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': {m: 1, width: '25ch'} }}
        noValidate
        autoComplete="off"
      >
        <Stack direction="column" spacing={2} sx={{ '& .MuiStack-root': { width: 100 } }}>
          <TextField
            id="article-title"
            label="Article title"
            rows={8}
            name="title"
            value={articleData.title}
            onChange={handleChange}
          />
          <TextField
            id="article-body"
            label="Article body"
            rows={8}
            name="body"
            value={articleData.body}
            onChange={handleChange}
          />
        </Stack>
        <Box sx={{ '& .MuiButton-root': {marginLeft: 1} }}>
          <Button
              variant="outlined"
              onClick={submitArticle}
              size="large"
            >
              Submit
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Collapse in={alertIsOpen.isOpen}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertIsOpen(false)
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mb: 2 }}
            severity={alertIsOpen.severity}
          >
            {alertIsOpen.message}
          </Alert>
        </Collapse>
      </Box>
    </MainLayout>
  );
};

export default CreateArticle; 