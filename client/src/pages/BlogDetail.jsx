import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import api from '../lib/api';
import SEO from '../components/SEO';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await api.get(`/blogs/slug/${slug}`);
      setBlog(response.data.data);
      
      // Increment views
      await api.patch(`/blogs/${response.data.data.id}/increment-views`);
      
      // Fetch related blogs
      const relatedResponse = await api.get('/blogs', { params: { limit: 3 } });
      setRelatedBlogs(relatedResponse.data.data.filter(b => b.id !== response.data.data.id).slice(0, 3));
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Blog not found</h1>
          <Link to="/blogs" className="text-primary-600 hover:underline">Back to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title={blog.title} description={blog.excerpt} image={blog.featuredImage} />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <Link to="/blogs" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-8">
                  {blog.featuredImage && (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-96 object-cover rounded-xl mb-8"
                    />
                  )}

                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {blog.title}
                  </h1>

                  <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{blog.author?.firstName} {blog.author?.lastName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(blog.publishedAt), 'MMMM d, yyyy')}</span>
                    </div>
                    <span>{blog.views} views</span>
                  </div>

                  {blog.categories && blog.categories.length > 0 && (
                    <div className="flex gap-2 mb-8">
                      {blog.categories.map(cat => (
                        <Badge key={cat.id} variant="primary">{cat.name}</Badge>
                      ))}
                    </div>
                  )}

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                  </div>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        {blog.tags.map(tag => (
                          <Badge key={tag.id} variant="info">{tag.name}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Related Posts */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedBlogs.map(relatedBlog => (
                      <Link key={relatedBlog.id} to={`/blogs/${relatedBlog.slug}`}>
                        <div className="group cursor-pointer">
                          {relatedBlog.featuredImage && (
                            <img
                              src={relatedBlog.featuredImage}
                              alt={relatedBlog.title}
                              className="w-full h-32 object-cover rounded-lg mb-2 group-hover:opacity-90 transition-opacity"
                            />
                          )}
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 line-clamp-2">
                            {relatedBlog.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {format(new Date(relatedBlog.publishedAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>

                {/* CTA */}
                <Card className="p-6 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
                  <h3 className="text-xl font-bold mb-3">Need Professional Help?</h3>
                  <p className="mb-4 opacity-90">Book a consultation with Dr. Bharat Agarwal</p>
                  <Link to="/book-appointment" className="block">
                    <button className="w-full bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                      Book Appointment
                    </button>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;