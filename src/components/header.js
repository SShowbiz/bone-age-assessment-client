import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      background: `#2e2e2e`,
      marginBottom: `1.45rem`,
      height: "12%",
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        height: "100%",
        "align-items": "center",
      }}
    >
      <h1 style={{ margin: 0, height: "100%" }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
            display: "flex",
            "align-items": "center",
            height: "100%",
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
