import { useLayoutEffect } from 'react'

interface FocusFirstProps {
  children: JSX.Element
  startFrom?: string
}

const focusableElements =
  'button, a, input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'

export default function FocusFirst({
  children,
  startFrom = 'main',
}: FocusFirstProps) {
  useLayoutEffect(() => {
    const firstFocusable = document
      .querySelector(startFrom)
      ?.querySelector<HTMLElement>(focusableElements)

    if (firstFocusable) {
      firstFocusable.focus()
    }
  })

  return children
}
