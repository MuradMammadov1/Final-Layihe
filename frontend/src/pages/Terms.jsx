import React from 'react'

export default function Terms() {
  return (
    <div className="page-terms">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span>Ana səhifə</span>
            <span>/</span>
            <span>İstifadə Şərtləri</span>
          </nav>
          <h1 className="page-hero-title">İstifadə Şərtləri</h1>
          <p className="page-hero-sub">Platformamızdan istifadə qaydaları.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="panel">
          <h2 className="font-bold text-xl mb-4">İstifadə Şərtləri</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">1. Qəbul Edilməsi</h3>
              <p className="text-gray-600">
                Bu platformadan istifadə edərək siz bu şərtləri qəbul etmiş olursunuz.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">2. İstifadəçi Məsuliyyəti</h3>
              <p className="text-gray-600">
                İstifadəçi öz hesabının təhlükəsizliyinə cavabdehdir. Hesab məlumatlarını başqaları ilə paylaşmaq qadağandır.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">3. Rezervasiya Qaydaları</h3>
              <p className="text-gray-600">
                Rezervasiya etdikdən sonra müəyyən müddət ərzində ləğv edilə bilər. Ləğv müddəti otelin qaydalarına uyğun olaraq müəyyən edilir.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">4. Ödəniş Şərtləri</h3>
              <p className="text-gray-600">
                Ödənişlər təhlükəsiz platformalar vasitəsilə həyata keçirilir. Bütün ödəniş məlumatları şifrələnir.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">5. Rəy və Şərhlər</h3>
              <p className="text-gray-600">
                İstifadəçilər yalnız həqiqi təcrübələrinə əsaslanan rəylər yazmalıdır. Saxta rəylər silinə bilər.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">6. Dəyişikliklər</h3>
              <p className="text-gray-600">
                Biz bu şərtləri istənilən vaxt dəyişdirə bilərik. Dəyişikliklər səhifədə əks olunacaq.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">7. Əlaqə</h3>
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
