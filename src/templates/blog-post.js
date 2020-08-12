import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"



const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.contentfulArticles
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.title}
        description={post.description || post.title}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.title}
          </h1>
          <h3>{post.subtitle}</h3>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.date.substring(0,10)}
          </p>
          {post.mainImage && (
            <Image 
              fluid={post.mainImage.fluid}
              alt={post.mainImage.description}
              style={{
                marginBottom: rhythm(1)
              }}
            />
          )}
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.content.childContentfulRichText.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulArticles(slug: {eq: $slug}) {
      title
      subtitle
      description
      author
      date(formatString: "")
      updatedAt(formatString: "")
      content {
        childContentfulRichText {
          html
        }
      }
      mainImage {
        fluid {
          ...GatsbyContentfulFluid
        }
        description
      }
    }
  }
`
