import * as React from "react"

const Footer = ({ author }) => (
  <footer
  style={{
    marginTop: `var(--space-5)`,
    fontSize: `var(--font-sm)`,
  }}
>
  © {new Date().getFullYear()} &middot; Built with
  &hearts; by { author } in 
  {` `}
  <a href="https://www.gatsbyjs.com">Gatsby</a>
  
</footer>
)

export default Footer;
