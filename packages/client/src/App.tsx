import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query'
import Home from 'views/Home'
import ListTodos from 'components/ListTodos';
import { trpc } from 'lib/trpc'
import { useQueryTrpcClient } from 'useQueryClient'
import { Pane } from 'evergreen-ui'

function App() {

  const { queryClient, trpcClient } = useQueryTrpcClient()
  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/todo" element={<ListTodos />} />
            <Route path='*' element={<Pane>Not Found</Pane>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
