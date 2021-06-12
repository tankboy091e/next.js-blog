/* eslint-disable jsx-a11y/control-has-associated-label */
import styles from 'sass/components/navigation.module.scss'
import { ImArrowLeft2 } from 'react-icons/im'
import { useState } from 'react'
import { getClassName } from 'lib/util'
import Link from 'next/link'
import usePageQuery from 'lib/hooks/page-query'
import { useAuth } from 'providers/auth'
import { categories } from 'lib/util/category'

export default function Navigation() {
  const [active, setActive] = useState(false)
  const { category } = usePageQuery()
  const { user } = useAuth()

  const onKeyDown = () => {
    onClick()
  }

  const onClick = () => {
    setActive(false)
  }

  const menu = categories
    .concat(user && ['write', 'admin'])

  return (
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
          const getHref = () => {
            if (value === 'home') {
              return '/'
            }
            if (value === 'write') {
              return `/${category}/new`
            }
            return `/${value}`
          }
          const href = getHref()
          if (href === '/') {
            return null
          }
          if (value === category) {
            return (
              <li key={value} className={styles.selected}>
                {value}
              </li>
            )
          }
          return (
            <li key={value} className={styles.menu}>
              <Link href={href}>
                <a className={styles.menuAnchor} href={href}>
                  {value}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
