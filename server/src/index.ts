import {renderToStaticMarkup} from 'react-dom/server'
import {load} from 'cheerio'
import {PORTALS} from 'react-portalize'

export function renderPortalsToString(html: string): string {
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
