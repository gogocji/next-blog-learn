import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { navs } from './config';

const Navbar = () => {
  console.log(useRouter());
  const { pathname } = useRouter();
  return (
    <div className={styles.navbar}>
    <section className={styles.logoArea}>华农秀秀</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav.label} href={nav.value}>
            <a className={pathname === nav.value ? styles.active : ''}>
              {nav.label}
            </a>
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <div>写文章</div>
        <div>登录</div>
      </section>
    </div>
  );
};

export default Navbar;

