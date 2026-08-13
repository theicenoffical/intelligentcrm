import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../lib/api";

export const useBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${API}/blog-posts`)
      .then((r) => setPosts(r.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);
  return { posts, loading };
};
