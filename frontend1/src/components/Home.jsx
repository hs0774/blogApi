import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

const Home = () => {
  const [homeBlog, setHomeBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1')
      .then(resp => resp.json())
      .then(data => {
        setHomeBlog(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator while fetching data
   }

  return (
    <div className="homeContainer">
      <div className="home">
        <div className="blogHome">
          {homeBlog && homeBlog.map((blog) => (
            <div className="blogHomeItem" key={blog._id}>
              <h2>{blog.title}</h2>
              <p>
                {/* {blog.content.split('\n')[0]}  */}
                <div dangerouslySetInnerHTML={{ __html: blog.content.split('<br>')[0] }}></div>
              </p>
              <Link to={`/api/v1/blog/${blog._id}`}>
                <strong> CLICK TO READ MORE...</strong>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
