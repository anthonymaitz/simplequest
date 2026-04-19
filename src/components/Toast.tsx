import { Show } from 'solid-js'

interface ToastProps {
  message: string
  visible: boolean
}

export function Toast(props: ToastProps) {
  return (
    <Show when={props.visible}>
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.85)',
          border: '1px solid var(--sq-accent)',
          color: '#ffffff',
          padding: '10px 20px',
          'border-radius': '6px',
          'font-size': '16px',
          'font-weight': '700',
          'z-index': '9999',
          'white-space': 'nowrap',
          'box-shadow': '0 4px 12px rgba(0,0,0,0.5)',
        }}
      >
        {props.message}
      </div>
    </Show>
  )
}
