/* eslint-disable jsx-a11y/control-has-associated-label */
import styles from 'sass/components/navigation.module.scss'
import { ImArrowLeft2 } from 'react-icons/im'
import { useState } from 'react'
import { getClassName } from 'lib/util'
import Link from 'next/link'

export default function Navigation() {
  const [active, setActive] = useState(false)

  const onKeyDown = () => {
    onClick()
  }

  const onClick = () => {
    setActive(false)
  }

  return (
    <div className={styles.container}>
      <nav
        className={getClassName(
          styles.navigation,
          active === false && styles.inactive,
        )}
      >
        {active && (
          <div
            className={styles.background}
            onClick={onClick}
            onKeyDown={onKeyDown}
            role="button"
            tabIndex={0}
          />
        )}
        <button
          type="button"
          className={styles.button}
          onClick={() => setActive(!active)}
        >
          <ImArrowLeft2 className={styles.icon} size={32} />
        </button>
        <ul className={styles.inner}>
          {menu.map((value) => {
            const href = `/${value}`
            return (
              <Link key={value} href={href}>
                <a key={href} href="/">
                  <li className={styles.menu}>{value}</li>
                </a>
              </Link>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

const menu = ['sum', 'essais', 'quotes', 'dev', 'gallary']
