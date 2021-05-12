import styles from 'sass/components/navigation.module.scss'
import { ImArrowLeft2 } from 'react-icons/im'
import { useState } from 'react'
import { getClassName } from 'lib/util'
import Link from 'next/link'

export default function Navigation() {
  const [active, setActive] = useState(false)

  return (
    <nav className={getClassName(styles.container, active === false && styles.inactive)}>
      <button type="button" className={styles.button} onClick={() => setActive(!active)}>
        <ImArrowLeft2 className={styles.icon} size={32} />
      </button>
      <ul className={styles.inner}>
        {menu.map((value) => {
          const href = `/${value}`
          return (
            <Link href={href}>
              <a key={href} href="replace" className={styles.menu}>
                {value}
              </a>
            </Link>
          )
        })}
      </ul>
    </nav>
  )
}

const menu = ['sum', 'essais', 'quotes', 'dev', 'gallary']
