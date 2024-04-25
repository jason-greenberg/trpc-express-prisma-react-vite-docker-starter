import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import Login from 'views/Login'
import Home from 'views/Home'
import ListTodos from 'views/ToDo'
import { trpc } from 'lib/trpc'
import { useQueryTrpcClient } from 'useQueryClient'
import NotFound from 'components/NotFound'
import ProtectedRoute from 'components/ProtectedRoute'

function App() {
  const { queryClient, trpcClient } = useQueryTrpcClient()

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute element={Home} />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/todo"
              element={<ProtectedRoute element={ListTodos} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
