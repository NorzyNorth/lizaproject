import { ROUTES } from "@/types/types";
import Navigation from "../Navigation/Navigation";
import s from './Layout.module.scss';

interface LayoutProps {
    route: ROUTES;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({route, children}) => {
  return (
    <div className={s.layout}>
        <div className={s.navigation}>
            <Navigation />
        </div>
        <div>
            <header className={s.header}>
              {route === ROUTES.HOME && <p>Главная</p>}
              {route === ROUTES.TEACHERS && <p>Преподаватели</p>}
              {route === ROUTES.DISCIPLINES && <p>Дисциплины</p>}
              {route === ROUTES.ACTIVITY && <p>Активность</p>}
            </header>
            <div className={s.content}>
                {children}
            </div>
        </div>
    </div>
  );
}

export default Layout;
