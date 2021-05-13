import styles from 'sass/components/navigation.module.scss'
import { ImArrowLeft2 } from 'react-icons/im'
import { useState } from 'react'
import { getClassName } from 'lib/util'
import Link from 'next/link'

export default function Navigation() {
  const [active, setActive] = useState(false)
  let key = 0

  return (
    <nav className={getClassName(styles.container, active === false && styles.inactive)}>
      <button type="button" className={styles.button} onClick={() => setActive(!active)}>
        <ImArrowLeft2 className={styles.icon} size={32} />
      </button>
      <ul className={styles.inner}>
        {menu.map((value) => {
          const href = `/${value}`
          key += 1
          return (
            <Link href={href} key={key}>
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
