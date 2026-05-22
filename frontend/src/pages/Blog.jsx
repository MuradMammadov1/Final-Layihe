import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_NEWS } from '../data/siteContent'

export default function Blog() {
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
          {HOME_NEWS.map(item => (
            <article key={item.title} className="news-card">
              <div className="news-card-body">
                <span className="news-card-tag">{item.tag}</span>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.excerpt}</p>
                <div className="news-card-meta">{item.date}</div>
                <Link to={item.link} className="news-card-link">Oxu →</Link>
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
