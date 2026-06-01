import React from 'react'

export default function Privacy() {
  return (
    <div className="page-privacy">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span>Ana səhifə</span>
            <span>/</span>
            <span>Məxfilik Siyasəti</span>
          </nav>
          <h1 className="page-hero-title">Məxfilik Siyasəti</h1>
          <p className="page-hero-sub">Məlumatlarınızın təhlükəsizliyi bizim üçün vacibdir.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="panel">
          <h2 className="font-bold text-xl mb-4">Məxfilik Siyasəti</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">1. Məlumatların Toplanması</h3>
              <p className="text-gray-600">
                Biz şəxsi məlumatlarınızı (ad, email, telefon nömrəsi) yalnız xidmətlərimizi təmin etmək üçün toplayırıq.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">2. Məlumatların İstifadəsi</h3>
              <p className="text-gray-600">
                Toplanmış məlumatlar rezervasiya prosesini həyata keçirmək, xidmət keyfiyyətini yaxşılaşdırmaq və sizinlə əlaqə saxlamaq üçün istifadə olunur.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">3. Məlumatların Təhlükəsizliyi</h3>
              <p className="text-gray-600">
                Biz məlumatlarınızın təhlükəsizliyini təmin etmək üçün müasir texnologiyalardan istifadə edirik.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">4. Məlumatların Paylaşılması</h3>
              <p className="text-gray-600">
                Məlumatlarınızı heç bir üçüncü tərəflə paylaşmırıq, yalnız qanunla tələb olunan hallarda istisna edilir.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">5. İstifadəçi Hüquqları</h3>
              <p className="text-gray-600">
                Siz məlumatlarınızın düzəldilməsini və ya silinməsini tələb edə bilərsiniz.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">6. Əlaqə</h3>
              <p className="text-gray-600">
                Suallarınız üçün bizimlə əlaqə saxlayın: info@auragrand.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
