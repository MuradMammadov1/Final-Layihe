import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_NEWS } from '../data/siteContent'

export default function Blog() {
  const blogs = HOME_NEWS.map((item, idx) => ({
    _id: `demo-${idx}`,
    title: item.title,
    excerpt: item.excerpt,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    category: item.tag,
    author: 'Admin',
    createdAt: item.date,
    slug: `blog-${idx}`
  }))

  return (
    <div className="page-blog">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Bloq</span>
          </nav>
          <h1 className="page-hero-title">Bloq</h1>
          <p className="page-hero-sub">Otel səyahəti haqqında məsləhətlər və xəbərlər.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="text-center mb-8">
          <h2 className="section-heading">Son yazılar</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Səyahət təcrübənizi artırmaq üçün faydalı məsləhətlər və məlumatlar.
          </p>
        </div>
        <div className="news-grid">
          {blogs.map(blog => (
            <article key={blog._id} className="news-card">
              {blog.image && <img src={blog.image} alt={blog.title} className="news-card-image" />}
              <div className="news-card-body">
                <span className="news-card-tag">{blog.category}</span>
                <h3 className="news-card-title">{blog.title}</h3>
                <p className="text-gray-600 text-sm">{blog.excerpt}</p>
                <div className="news-card-meta">{blog.author} - {new Date(blog.createdAt).toLocaleDateString('az-AZ')}</div>
                <Link to={`/blog/${blog.slug || blog._id}`} className="news-card-link">Oxu →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad section-muted">
        <div className="container text-center">
          <h2 className="section-heading mb-4">Bülletenə abunə olun</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Yeni məqalələr və xüsusi təkliflər haqqında məlumat alın.
          </p>
          <Link to="/" className="btn btn-gold">Abunə ol</Link>
        </div>
      </section>
    </div>
  )
}
