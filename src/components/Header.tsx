'use client'

import Link from 'next/link'
import styles from './Header.module.css'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  showBack?: boolean
  title?: string
}

export default function Header({ showBack = false, title }: HeaderProps) {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.statusBar}>
        <span className={styles.time}>8:16</span>
        <div className={styles.statusIcons}>
          <span className={styles.icon}>📶</span>
          <span className={styles.icon}>📶</span>
          <span className={styles.icon}>🔋</span>
        </div>
      </div>
      <div className={styles.navBar}>
        {showBack && (
          <Link href="/" className={styles.backButton}>
            ←
          </Link>
        )}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <div className={styles.square1}></div>
            <div className={styles.square2}></div>
          </div>
          <span className={styles.logoText}>Cloud.co-</span>
        </Link>
        {!showBack && (
          <Link href="/filesystem" className={styles.filesButton}>
            📁 Файлы
          </Link>
        )}
        <div className={styles.rightActions}>
          <button className={styles.notificationButton}>🔔</button>

          <button className={styles.profilePicture} onClick={() => router.push('/login')}>
            <div className={styles.profilePlaceholder}>
              <span>👤</span>
            </div>
          </button>
        </div>
      </div>
      {title && <h1 className={styles.pageTitle}>{title}</h1>}
    </header>
  )
}
