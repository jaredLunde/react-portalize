/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
import {renderToStaticMarkup} from 'react-dom/server'
import {load} from 'cheerio'

export function renderPortalsToString(html: string): string {
  const PORTALS = require('react-portalize').PORTALS
  const selectors = Object.keys(PORTALS)

  if (selectors.length === 0) return html

  const doc = load(html)

  for (let i = 0; i < selectors.length; i++) {
    const selector = selectors[i]
    doc(selector).html(renderToStaticMarkup(PORTALS[selector]))
  }

  return String(
    html.match(/^\s*(<!|<html|<body|<head)/)
      ? doc.html()
      : doc('body').contents()
  )
}
