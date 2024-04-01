import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query'
import Home from './components/Home'
import { trpc } from './lib/trpc'
import { useQueryTrpcClient } from './useQueryClient'
import { Pane } from 'evergreen-ui'

function App() {

  const { queryClient, trpcClient } = useQueryTrpcClient()
  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Pane>Not Found</Pane>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
