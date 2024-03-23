import Image from "next/image";
import Link from "next/link";
import mai from '../../../public/mai-main-img.png';

import s from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={s.navigation}>
      <Image src={mai} alt="mai" width={250} height={300} />
      <div className={s.links}>
            <Link href={'/'} className={s.link}>
        <button className={s.button}>
                <p>Главная</p> 
        </button>
            </Link>
            <Link href={'/teachers'} className={s.link}>
        <button className={s.button}>
                <p>Преподаватели</p>
        </button>
            </Link>
            <Link href={'/schedule'} className={s.link}>
        <button className={s.button}>
                <p>Расписание</p>
        </button>
            </Link>
            <Link href={'/disciplines'} className={s.link}>
        <button className={s.button}>
                <p>Дисциплины</p>
        </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;