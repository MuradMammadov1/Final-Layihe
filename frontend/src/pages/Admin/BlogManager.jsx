import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function BlogManager() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', image: '', author: 'Admin', category: 'General', published: true })

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = async () => {
    try {
      const res = await api.get('/blog')
      setBlogs(res.data.data || [])
    } catch {
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/blog/${editing}`, form)
      } else {
        await api.post('/blog', form)
      }
      setForm({ title: '', slug: '', excerpt: '', content: '', image: '', author: 'Admin', category: 'General', published: true })
      setEditing(null)
      loadBlogs()
    } catch (err) {
      alert('Xəta: ' + (err.response?.data?.message || 'Əməliyyat uğursuz oldu'))
    }
  }

  const handleEdit = blog => {
    setEditing(blog._id)
    setForm({ title: blog.title, slug: blog.slug, excerpt: blog.excerpt, content: blog.content, image: blog.image, author: blog.author, category: blog.category, published: blog.published })
  }

  const handleDelete = async id => {
    if (!confirm('Silmək istədiyinizə əminsiniz?')) return
    try {
      await api.delete(`/blog/${id}`)
      loadBlogs()
    } catch {
      alert('Silinmədi')
    }
  }

  const handleTogglePublished = async id => {
    try {
      const blog = blogs.find(b => b._id === id)
      await api.put(`/blog/${id}`, { published: !blog.published })
      loadBlogs()
    } catch {
      alert('Dəyişdirilmədi')
    }
  }

  if (loading) return <div className="panel text-center">Yüklənir...</div>

  return (
    <div className="admin-manager">
      <h2 className="section-heading">Bloq İdarəetməsi</h2>

      <div className="panel mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Düzəlt' : 'Yeni bloq yazısı'}</h3>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlıq</label>
            <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input className="input" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="blog-post-slug" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Qısa təsvir</label>
            <textarea className="input" value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows="2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Məzmun</label>
            <textarea className="input" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows="6" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Şəkil URL</label>
            <input className="input" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Müəllif</label>
              <input className="input" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kateqoriya</label>
              <input className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
                <span>Dərc olunub</span>
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-gold">{editing ? 'Yenilə' : 'Əlavə et'}</button>
            {editing && <button type="button" onClick={() => { setEditing(null); setForm({ title: '', slug: '', excerpt: '', content: '', image: '', author: 'Admin', category: 'General', published: true }) }} className="btn btn-outline">Ləğv et</button>}
          </div>
        </form>
      </div>

      <div className="panel">
        <h3 className="font-bold mb-4">Bloq yazıları ({blogs.length})</h3>
        {blogs.length === 0 ? (
          <p className="text-gray-500">Bloq yazısı yoxdur.</p>
        ) : (
          <div className="grid gap-3">
            {blogs.map(b => (
              <div key={b._id} className="flex items-center gap-4 p-3 border rounded">
                <img src={b.image} alt={b.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-bold">{b.title}</div>
                  <div className="text-sm text-gray-600">{b.excerpt}</div>
                  <div className="text-sm">
                    <span className="font-bold">{b.category}</span> - {b.author}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleTogglePublished(b._id)} className={`btn btn-sm ${b.published ? 'btn-gold' : 'btn-outline'}`}>
                    {b.published ? 'Dərc olunub' : 'Dərc olunmayıb'}
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(b)} className="btn btn-sm btn-outline">Düzəlt</button>
                    <button onClick={() => handleDelete(b._id)} className="btn btn-sm btn-outline-gold">Sil</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
