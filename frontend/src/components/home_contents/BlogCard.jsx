import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ title, content, id }) {
  return (
    <div className="blog-card">
      <div className="blog">
        <Link to={`/blogs/${id}`}>
          <h3>{title}</h3>
        </Link>
        <p>{content.length > 100 ? content.substring(0, 100) + "..." : content}</p> {/* Shortened content */}
        <Link to={`/blogs/${id}`}>Read more</Link> {/* Link to the full blog */}
      </div>
    </div>
  );
}

export default BlogCard;









// import React from 'react';
// import { Link } from 'react-router-dom';

// function BlogCard({ title, content, id }) {
//   return (
//     <div className="blog-card">
//       <div className="blog">
//         <Link to={`/blogs/${id}`}>
//           <h3>{title}</h3>
//         </Link>
//         <p>{content.substring(0, 100)}... <Link to={`/blogs/${id}`}>Read more</Link></p> {/* Shortened content */}
//       </div>
//     </div>
//   );
// }

// export default BlogCard;
