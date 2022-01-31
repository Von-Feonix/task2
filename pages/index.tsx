import { NextPage } from 'next'
import Login from './login'
interface Props {
  testInitialProps?: string;
}

const App: NextPage<Props> = ({ testInitialProps }) => (
  <Login/>
)

App.getInitialProps = async (x) => {
  const testInitialProps = 'test'
  return { testInitialProps }
}

export default App