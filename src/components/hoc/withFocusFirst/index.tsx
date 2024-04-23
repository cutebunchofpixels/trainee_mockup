import React, { useEffect, useRef } from 'react'

const withFocusFirst = <P extends Record<string, any>>(
  WrappedComponent: React.ComponentType<P>
) =>
  function withFocusFirst(props: P) {
    const ref = useRef<HTMLElement | null>(null)

    useEffect(() => {
      if (!ref.current) {
        return
      }

      const focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      const firstFocusableElement =
        ref.current.querySelector<HTMLElement>(focusableElements)

      if (firstFocusableElement) {
        firstFocusableElement.focus()
      }
    }, [])

    return <WrappedComponent ref={ref} {...props} />
  }

export default withFocusFirst
