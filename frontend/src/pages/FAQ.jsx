import React, { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Rezervasiya necə edilir?',
      answer: 'Otaqlar səhifəsindən istədiyiniz otağı seçin, tarixləri göstərin və "Rezerv et" düyməsini basın. Qeydiyyatlı olmalısınız.'
    },
    {
      question: 'Rezervasiyanı ləğv etmək mümkündürmü?',
      answer: 'Bəli, Profil səhifənizdən rezervasiyalarınızı görə və ləğv edə bilərsiniz. Ləğv qaydaları otaq növündən asılıdır.'
    },
    {
      question: 'Otaqlarda WiFi varmı?',
      answer: 'Bəli, bütün otaqlarda pulsuz yüksək sürətli WiFi mövcuddur.'
    },
    {
      question: 'Otelə nə vaxt daxil ola bilərəm?',
      answer: 'Standart check-in vaxtı 14:00-dur. Əvvəl daxil olmaq üçün əvvəlcədən əlaqə saxlayın.'
    },
    {
      question: 'Otelə nə vaxt çıxmalıyam?',
      answer: 'Standart check-out vaxtı 12:00-dur. Gecikmə üçün əlavə haqq tətbiq oluna bilər.'
    },
    {
      question: 'Uşaqlar üçün nə xidmətlər var?',
      answer: 'Uşaqlar üçün xüsusi otaqlar, uşaq hovuzu və oyun meydançası mövcuddur.'
    },
    {
      question: 'Evcil heyvan gətirilə bilərmi?',
      answer: 'Bəzi otaqlarda evcil heyvanlara icazə verilir. Əvvəlcədən bildirin.'
    },
    {
      question: 'Nəqliyyat xidmətləri varmı?',
      answer: 'Bəli, hava limanına transfer, avtomobil icarəsi və parkinq xidmətləri təklif edirik.'
    },
    {
      question: 'Restoran saatları nədir?',
      answer: 'Restoran gündəlik 07:00-23:00 arası açıqdır. Səhər yeməyi 07:00-10:00, nahar 12:00-15:00, şam yeməyi 18:00-23:00.'
    },
    {
      question: 'Ödəniş üsulları nələrdir?',
      answer: 'Nağd, kredit kartı və onlayn ödəniş qəbul edilir.'
    }
  ]

  return (
    <div className="page-faq">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span>Ana səhifə</span>
            <span>/</span>
            <span>Tez-tez verilən suallar</span>
          </nav>
          <h1 className="page-hero-title">Tez-tez verilən suallar</h1>
          <p className="page-hero-sub">Sualınız var? Biz cavab veririk.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item panel">
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === idx ? '−' : '+'}</span>
              </button>
              {openIndex === idx && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="panel text-center mt-8">
          <h2 className="section-heading">Daha çox sualınız var?</h2>
          <p className="text-gray-600 mt-4 mb-6">
            Bizimlə əlaqə saxlayın və komandamız sizə kömək edəcək.
          </p>
          <a href="/contact" className="btn btn-gold">Bizimlə əlaqə</a>
        </div>
      </section>
    </div>
  )
}
