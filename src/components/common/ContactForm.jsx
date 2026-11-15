import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Button from '@/components/common/Button'
import { contactContent } from '@/data/contact'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const EMPTY_VALUES = { name: '', email: '', company: '', service: '', budget: '', message: '', website: '' }

const serviceOptions = [...services.map((service) => service.title), contactContent.otherServiceLabel]

const validate = (values) => {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.service) errors.service = 'Please choose a service.'
  if (values.message.trim().length < 20) errors.message = 'Tell us a little more (at least 20 characters).'
  return errors
}

const buildMailto = (values) => {
  const subject = `Project enquiry from ${values.name || 'website'}`
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || '-'}`,
    `Service: ${values.service || '-'}`,
    `Budget: ${values.budget || '-'}`,
    '',
    values.message,
  ].join('\n')
  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const inputClasses =
  'w-full border-0 border-b border-line bg-transparent py-3 text-lg text-fg placeholder:text-muted/60 outline-none transition-colors duration-300 focus:border-accent aria-[invalid=true]:border-red-400'

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-1 flex justify-between">
        <span>{label}</span>
        {optional && <span className="normal-case tracking-normal">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Contact form with client-side validation and configurable delivery (siteConfig.form).
 *   provider: 'none'        → validates, but does NOT claim to send. Offers a "send by email" fallback instead.
 *   provider: 'formspree'   → POSTs JSON to your Formspree endpoint
 *   provider: 'custom'      → POSTs JSON to any endpoint of yours
 * Status: idle | submitting | success | error | not-configured
 */
export default function ContactForm({ defaultService = '' }) {
  const formId = useId()
  const formRef = useRef(null)
  const statusRef = useRef(null)
  const [values, setValues] = useState({ ...EMPTY_VALUES, service: defaultService })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  // Move focus to the status message so screen-reader users hear the outcome.
  useEffect(() => {
    if (status !== 'idle' && status !== 'submitting') statusRef.current?.focus()
  }, [status])

  const fieldId = (name) => `${formId}-${name}`

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    if (errors[name]) {
      const stillInvalid = validate({ ...values, [name]: value })[name]
      setErrors((previous) => {
        const next = { ...previous }
        if (stillInvalid) next[name] = stillInvalid
        else delete next[name]
        return next
      })
    }
  }

  const handleBlur = (event) => {
    const { name } = event.target
    const message = validate(values)[name]
    if (message && values[name]) setErrors((previous) => ({ ...previous, [name]: message }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      formRef.current.elements[firstInvalid]?.focus()
      return
    }

    // Honeypot: real people never see this field. Bots that fill it get a silent no-op.
    if (values.website) return

    const { provider, endpoint } = siteConfig.form
    if (provider === 'none' || !endpoint) {
      setStatus('not-configured')
      return
    }

    setStatus('submitting')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    try {
      const { website, ...fields } = values
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, _subject: `New enquiry from ${values.name}` }),
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      setValues({ ...EMPTY_VALUES })
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      clearTimeout(timeout)
    }
  }

  if (status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-line p-8 outline-none sm:p-12">
        <p className="eyebrow mb-4 text-accent">Message sent</p>
        <h2 className="text-title uppercase">Thank you.</h2>
        <p className="mt-4 max-w-md text-muted">
          We have your message and will reply within two working days.
        </p>
        <Button variant="outline" icon={false} className="mt-8" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-8" aria-label="Contact form">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id={fieldId('name')} label="Name" error={errors.name}>
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${fieldId('name')}-error` : undefined}
            className={inputClasses}
            placeholder="Your name"
          />
        </Field>
        <Field id={fieldId('email')} label="Email" error={errors.email}>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${fieldId('email')}-error` : undefined}
            className={inputClasses}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <Field id={fieldId('company')} label="Company" optional>
        <input
          id={fieldId('company')}
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Company or project name"
        />
      </Field>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id={fieldId('service')} label="Service" error={errors.service}>
          <div className="relative">
            <select
              id={fieldId('service')}
              name="service"
              value={values.service}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? `${fieldId('service')}-error` : undefined}
              className={`${inputClasses} appearance-none pr-8`}
            >
              <option value="" className="bg-base">Select a service</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option} className="bg-base">{option}</option>
              ))}
            </select>
            <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </Field>

        <Field id={fieldId('budget')} label="Budget" optional>
          <div className="relative">
            <select
              id={fieldId('budget')}
              name="budget"
              value={values.budget}
              onChange={handleChange}
              className={`${inputClasses} appearance-none pr-8`}
            >
              <option value="" className="bg-base">Select a range</option>
              {contactContent.budgetRanges.map((range) => (
                <option key={range} value={range} className="bg-base">{range}</option>
              ))}
            </select>
            <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </Field>
      </div>

      <Field id={fieldId('message')} label="Message" error={errors.message}>
        <textarea
          id={fieldId('message')}
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${fieldId('message')}-error` : undefined}
          className={`${inputClasses} resize-y`}
          placeholder="Tell us about your project, timeline and goals"
        />
      </Field>

      {/* Honeypot (hidden from people and assistive tech) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" disabled={submitting} className="disabled:opacity-60">
          {submitting ? 'Sending…' : 'Send message'}
        </Button>
        <p className="text-xs text-muted">We’ll only use your details to reply to this enquiry.</p>
      </div>

      {status === 'not-configured' && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="border border-line p-6 outline-none">
          <p className="eyebrow mb-2 text-fg">Not sent</p>
          <p className="text-sm text-muted">
            This form isn’t connected to a delivery service yet, so nothing has been sent. You can send the same
            message from your own email app instead.
          </p>
          <Button href={buildMailto(values)} variant="outline" className="mt-5">
            Send via email app
          </Button>
        </div>
      )}

      {status === 'error' && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="border border-red-400/60 p-6 outline-none">
          <p className="eyebrow mb-2 text-red-400">Message not sent</p>
          <p className="text-sm text-muted">
            Something went wrong and your message wasn’t delivered. Please try again, or email us directly at{' '}
            <a href={`mailto:${siteConfig.contact.email}`} className="link-underline text-fg">{siteConfig.contact.email}</a>.
          </p>
          <Button href={buildMailto(values)} variant="outline" className="mt-5">
            Send via email app
          </Button>
        </div>
      )}
    </form>
  )
}
