import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import { StoreProvider } from '../store';

function App({ Component, pageProps }: AppProps) {
	return (
		<StoreProvider>
			<Component {...pageProps} />
		</StoreProvider>
	);
}

export default App;
