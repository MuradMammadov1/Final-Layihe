/**
 * Axios xətasından istifadəçiyə göstəriləcək mətn çıxarır.
 * Backend: { message } və ya express-validator: { errors: [{ msg }] }
 */
export function getApiErrorMessage(err, fallback = 'Xəta baş verdi.') {
  if (!err.response) {
    if (err.code === 'ECONNABORTED') return 'Sorğu vaxtı bitdi. Yenidən cəhd edin.'
    if (err.message === 'Network Error') {
      return 'Backend-ə qoşulmaq mümkün olmadı. Terminalda backend işlədirsiniz? (agents-inland-peacock/backend → npm run dev, port 5000)'
    }
    return err.message || fallback
  }

  const data = err.response.data
  if (!data) return fallback
  if (typeof data.message === 'string' && data.message) return data.message

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors
      .map(e => e?.msg || e?.message || String(e))
      .filter(Boolean)
      .join(' ')
  }

  return fallback
}
