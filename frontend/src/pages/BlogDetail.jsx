import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true)
      try {
        // Əvvəlcə slug ilə axtarırıq
        const res = await api.get(`/blog/slug/${id}`)
        setBlog(res.data.data)
      } catch {
        // Slug ilə tapılmadısa, _id ilə axtarırıq
        try {
          const res = await api.get(`/blog/${id}`)
          setBlog(res.data.data)
        } catch {
          setBlog(null)
        }
      } finally {
        setLoading(false)
      }
    }
    loadBlog()
  }, [id])

  if (loading) {
    return (
      <div className="page-blog">
        <section className="page-hero page-hero--compact">
          <div className="container">
            <h1 className="page-hero-title">Bloq</h1>
          </div>
        </section>
        <section className="container section-pad">
          <div className="panel text-center">Yüklənir...</div>
        </section>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="page-blog">
        <section className="page-hero page-hero--compact">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Ana səhifə</Link>
              <span>/</span>
              <Link to="/blog">Bloq</Link>
              <span>/</span>
              <span>Məqalə tapılmadı</span>
            </nav>
            <h1 className="page-hero-title">Məqalə tapılmadı</h1>
          </div>
        </section>
        <section className="container section-pad">
          <div className="panel text-center">
            <p className="text-gray-600 mb-4">Axtardığınız məqalə tapılmadı.</p>
            <Link to="/blog" className="btn btn-gold">Bütün məqalələrə qayıt</Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page-blog">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <Link to="/blog">Bloq</Link>
            <span>/</span>
            <span>{blog.title}</span>
          </nav>
          <h1 className="page-hero-title">{blog.title}</h1>
          <p className="page-hero-sub">{blog.excerpt}</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="panel max-w-4xl mx-auto">
          {blog.image && (
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="badge">{blog.category}</span>
            <span>{blog.author}</span>
            <span>{new Date(blog.createdAt).toLocaleDateString('az-AZ')}</span>
          </div>

          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content || blog.description || blog.excerpt }} />
          </div>

          <div className="mt-8 pt-6 border-t">
            <Link to="/blog" className="btn secondary">
              ← Bütün məqalələrə qayıt
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
