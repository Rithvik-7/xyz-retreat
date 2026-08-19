import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { property } from '@/data/property'
import { useSite } from '@/context/SiteContext'
import { EditorialButton } from '@/components/ui/EditorialButton'

export function BookingDrawer() {
  const { bookingOpen, closeBooking } = useSite()
  const [sent, setSent] = useState(false)
  const formId = useId()

  useEffect(() => {
    if (!bookingOpen) {
      const t = window.setTimeout(() => setSent(false), 400)
      return () => window.clearTimeout(t)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [bookingOpen, closeBooking])

  const fields = property.booking.fields

  return (
    <AnimatePresence>
      {bookingOpen && (
        <motion.div
          className="fixed inset-0 z-[70] bg-ink text-ivory"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${formId}-title`}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="flex h-full flex-col px-5 py-8 md:px-16 md:py-12">
            <div className="flex items-center justify-between">
              <p className="label-tiny">{property.name}</p>
              <button type="button" className="label-tiny" onClick={closeBooking}>
                CLOSE
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center">
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    className="max-w-3xl"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSent(true)
                    }}
                  >
                    <h2 id={`${formId}-title`} className="display-lg">
                      {property.booking.heading}
                    </h2>
                    <div className="mt-12 grid gap-2 md:grid-cols-2">
                      <Field
                        label={fields.checkIn.label}
                        placeholder={fields.checkIn.placeholder}
                      />
                      <Field
                        label={fields.checkOut.label}
                        placeholder={fields.checkOut.placeholder}
                      />
                      <Field
                        label={fields.guests.label}
                        placeholder={fields.guests.placeholder}
                      />
                      <Field
                        label={fields.stay.label}
                        placeholder={fields.stay.placeholder}
                      />
                    </div>
                    <div className="mt-12">
                      <EditorialButton type="submit" variant="outline">
                        {property.booking.cta}
                      </EditorialButton>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl"
                  >
                    <h2 className="display-lg">{property.booking.thanksTitle}</h2>
                    <p className="mt-8 text-lg font-light text-ivory/70">
                      {property.booking.thanksBody}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  const id = useId()
  return (
    <label htmlFor={id} className="block border-b border-ivory/20 py-5">
      <span className="label-tiny text-ivory/45">{label}</span>
      <input
        id={id}
        name={label}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent font-display text-3xl text-ivory outline-none placeholder:text-ivory/35"
      />
    </label>
  )
}
