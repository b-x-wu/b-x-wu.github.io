import { createRoot } from 'react-dom/client';
import Router from './Router';
import './styles/style.css';

const root = createRoot(document.getElementById('root')!);
root.render(Router);

