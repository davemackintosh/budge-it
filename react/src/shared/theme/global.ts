import media from "styled-media-query"
import theme from "@styled/theme"
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.font};
    font-family: ${theme.typography.primaryFontFamilies};
    font-size: 1.3em;
    line-height: 2em;
  }

  a {
    color: ${theme.colors.fontAttention};
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 2em;
    letter-spacing: -1px;

    ${media.lessThan("medium")`
      & {
        line-height: 1.4em;
      }
      `}
  }

  ::selection {
    background: ${theme.colors.fontAttention};
  }

  .hero {
    ${media.greaterThan("medium")`
      padding: 4rem;
      margin: 5rem 0;
      line-height: 2em;
      font-size: 2em;
      text-align: center;
      background-color: #5A5E65;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVQImWNgYGD4z0AswK4SAFXuAf8EPy+xAAAAAElFTkSuQmCC);

    `}
  }
`
