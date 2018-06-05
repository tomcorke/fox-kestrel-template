import * as React from 'react'

import * as STYLES from './home-page.scss'

interface HomePageProps {
  isLoggedIn: boolean,
  displayName?: string,
  onLoginClick: () => any
}

const HomePage = ({ isLoggedIn, displayName, onLoginClick }: HomePageProps) => {
  return <div className={STYLES.titlePage}>
    <div className={STYLES.content}>
      {
        isLoggedIn ?
          <div>
            Logged in as {displayName}
            <a href='logout'>Logout</a>
          </div> :
          <a onClick={onLoginClick}>Login</a>
      }
    </div>
  </div>
}

export default HomePage
