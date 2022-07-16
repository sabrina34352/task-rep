import React from 'react'
import Header from './components/Header'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import SignInPage from './pages/SignInPage'
import { Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAllCardsData } from './store/AllCardsSlice'
const App = () => {
  const dispatch = useDispatch()
  dispatch(setAllCardsData())
  return (
    <Router>
      <Box maxW="max" ml="auto" mr="auto" mt="24" align="center">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </Router>
  )
}

export default App
