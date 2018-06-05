import * as React from 'react'
import { PageType } from '../../constants'

import HomePage from '../home-page'
import WindowMessageReceiver from '../window-message-receiver'

import * as STYLES from './site.scss'

interface SiteProps {
  page: PageType
}

const pageRenderers = {
  'home': () => <HomePage />
}

const renderPage = (page: PageType): JSX.Element => pageRenderers[page]()

const Site = ({ page }: SiteProps) => {
  return (
    <div className={STYLES.site}>
      {renderPage(page)}
      <WindowMessageReceiver />
    </div>
  )
}

export default Site
