import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { property } from '@/data/property'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function Testimonials() {
  const items = property.testimonials.items
  const [index, setIndex] = useState(0)
  const current = items[index]

  return (
    <section className="flex min-h-[100svh] flex-col justify-center bg-ink px-5 py-28 text-ivory md:px-16">
      <SectionLabel className="mb-16">{property.testimonials.index}</SectionLabel>
      <div className="relative min-h-[42vh]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.quote}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[16ch] font-display text-[clamp(2.4rem,7vw,6.4rem)] leading-[0.92] tracking-[-0.03em]"
          >
            “{current.quote}”
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-16 flex items-end justify-between">
        <div>
          <p className="label-tiny">{current.name}</p>
          <p className="mt-2 label-tiny text-ivory/40">{current.origin}</p>
        </div>
        <div className="flex items-center gap-3">
          {items.map((item, i) => (
            <button
              key={item.quote}
              type="button"
              className={
                i === index
                  ? 'label-tiny text-ivory'
                  : 'label-tiny text-ivory/35 hover:text-ivory/70'
              }
              aria-label={`Quote ${i + 1} of ${items.length}`}
              onClick={() => setIndex(i)}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
          <span className="label-tiny text-ivory/35">
            / {String(items.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
