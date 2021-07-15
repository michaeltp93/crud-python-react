import './styles/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { About, Navbar, Users } from './components';

const App = () => {
	return (
		<Router>
			<Navbar />
			<div className="container p-2">
				<Switch>
					<Route path="/about" component={About} />
					<Route path="/" component={Users} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
