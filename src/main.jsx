import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./lib/auth.jsx";
import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./styles.css";
import "./theme.css";

function ThemeRoot({ children }) {
	const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
	useEffect(() => {
		const applyTheme = event => setIsDark(event.detail);
		document.documentElement.classList.toggle("dark", isDark);
		localStorage.setItem("theme", isDark ? "dark" : "light");
		localStorage.setItem("sc-dark", isDark ? "1" : "0");
		window.addEventListener("seuncart-theme-change", applyTheme);
		return () => window.removeEventListener("seuncart-theme-change", applyTheme);
	}, [isDark]);
	return <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300">{children}</div>;
}

class AppErrorBoundary extends React.Component {
	state = { error: null };
	static getDerivedStateFromError(error) { return { error }; }
	render() {
		if (this.state.error) return <main className="section wrap center"><h1>SEUNCART could not load this page</h1><p className="error">{this.state.error.message}</p><a className="primary" href="/account">Return to account</a></main>;
		return this.props.children;
	}
}

if("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations().then(registrations=>registrations.forEach(registration=>registration.unregister()));
createRoot(document.getElementById("root")).render(<AppErrorBoundary><ThemeRoot><BrowserRouter><ScrollToTop/><AuthProvider><App/></AuthProvider></BrowserRouter></ThemeRoot></AppErrorBoundary>);