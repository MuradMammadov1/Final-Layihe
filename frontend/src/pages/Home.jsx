import React from 'react'

export default function Home(){
  return (
    <div className="space-y-8">
      <section className="bg-white p-10 rounded shadow text-center">
        <h1 className="text-4xl font-bold">Find your next stay</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Discover curated hotels across the region, compare prices, and book instantly with secure reservation flow.</p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <a href="/hotels" className="btn inline-flex px-6 py-3">Search hotels</a>
          <a href="/register" className="inline-flex items-center justify-center px-6 py-3 border rounded text-gray-700 hover:bg-slate-100">Create account</a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Flexible search</h2>
          <p className="mt-2 text-gray-600">Filter hotels by city, price, and available dates to match your travel plan.</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Easy booking</h2>
          <p className="mt-2 text-gray-600">Select the perfect room and reserve with a simple form powered by secure backend logic.</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Personal dashboard</h2>
          <p className="mt-2 text-gray-600">View your reservations, wishlist and account details in one place.</p>
        </div>
      </section>
    </div>
  )
}
