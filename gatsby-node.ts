// const { createFilePath } = require('gatsby-source-filesystem');
import path from 'path'

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === `MarkdownRemark`) {
//     const slug = createFilePath({ node, getNode });

//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug
//     });
//   }
// };

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  createPage({
    path: '/using-dsg',
    component: `${path.resolve('./src/templates/using-dsg.tsx')}`,
    context: {},
    defer: true
  });

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          parent {
            ... on File {
              absolutePath
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  // Create blog post pages.
  const posts = result.data.allMdx.nodes

  // you'll call `createPage` for each result
  // posts.forEach(node => {
  //   createPage({
  //     // As mentioned above you could also query something else like frontmatter.title above and use a helper function
  //     // like slugify to create a slug
  //     path: node.frontmatter.slug,
  //     // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
  //     component: node.parent.absolutePath,
  //     // You can use the values in this context in
  //     // our page layout component
  //     context: { id: node.id },
  //   })
  // })


  //   return graphql(`
  //   {
  //     allMarkdownRemark {
  //       edges {
  //         node {
  //           fields {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   }
  // `).then((result) => {
  //     result.data.allMarkdownRemark.edges.forEach(({ node }) => {
  //       console.log('creating page', node);
  //       createPage({
  //         path: node.fields.slug,
  //         component: `${path.resolve(`./src/templates/blog-post.js`)}?__contentFilePath=${node.parent.absolutePath}`,
  //         context: {
  //           slug: node.fields.slug
  //         }
  //       });
  //     });
  //   });
};
