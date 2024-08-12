import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Books from './components/Books'
import Login from './components/Login'
import SingleBook from './components/SingleBook'
import EditPage from './components/EditBook'
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material'


function App() {
  // const theme=createTheme({
  //   palette:{
  //     primary:{
  //       main:"#1976d2",
  //     },
  //   },
  // })
  const [count, setCount] = useState(0)

  return (
  //   <ThemeProvider theme={theme}>
  //  <CssBaseline/>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/books/edit/:id" element={<EditPage />} />
    </Routes>
    </BrowserRouter>
    // </ThemeProvider>
  )
}

export default App
