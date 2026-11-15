const baseProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function CartIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="19" cy="20" r="1.4" />
      <path d="M2.5 3h2.2l2.4 12.2a1.8 1.8 0 0 0 1.8 1.4h9.4a1.8 1.8 0 0 0 1.8-1.4L22 6.5H6" />
    </svg>
  )
}

export function SearchIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.2-4.2" />
    </svg>
  )
}

export function MenuIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
    </svg>
  )
}

export function ArrowIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 12h15" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  )
}

export function ChevronDownIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  )
}

export function StarIcon(props) {
  return (
    <svg {...baseProps} fill="currentColor" stroke="none" {...props}>
      <path d="m12 3.2 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.5 9.4l5.9-.8L12 3.2Z" />
    </svg>
  )
}

export function PlusIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function MinusIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  )
}

export function TrashIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l.8 12a1.8 1.8 0 0 0 1.8 1.7h5.8a1.8 1.8 0 0 0 1.8-1.7l.8-12" />
      <path d="M10 11v5.5M14 11v5.5" />
    </svg>
  )
}

export function TruckIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2.5 6.5h10v10h-10zM12.5 10h4.2l3.8 3.6v2.9h-8z" />
      <circle cx="6.5" cy="18.5" r="1.6" />
      <circle cx="16.5" cy="18.5" r="1.6" />
    </svg>
  )
}

export function ShieldIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3.5 4.5 6.8v5.2c0 4.2 3 7.4 7.5 8.5 4.5-1.1 7.5-4.3 7.5-8.5V6.8L12 3.5Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </svg>
  )
}

export function RefreshIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M20 11.5A8 8 0 0 0 6.2 6.2L4 8.3" />
      <path d="M4 4v4.3h4.3" />
      <path d="M4 12.5a8 8 0 0 0 13.8 5.3L20 15.7" />
      <path d="M20 20v-4.3h-4.3" />
    </svg>
  )
}

export function SparkIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3.5c.6 4.3 2.2 5.9 6.5 6.5-4.3.6-5.9 2.2-6.5 6.5-.6-4.3-2.2-5.9-6.5-6.5 4.3-.6 5.9-2.2 6.5-6.5Z" />
      <path d="M18.5 16.5c.3 2 1.1 2.8 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.2 2.7-1 3-3Z" />
    </svg>
  )
}

export function EyeIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function EyeOffIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 4.5 20 19.5" />
      <path d="M9.9 6a9.6 9.6 0 0 1 2.1-.3c6 0 9.5 6.3 9.5 6.3a15 15 0 0 1-2.6 3.4" />
      <path d="M6.2 7.8A15.4 15.4 0 0 0 2.5 12S6 18.3 12 18.3c1.4 0 2.7-.3 3.8-.9" />
      <path d="M10 10.2a2.9 2.9 0 0 0 4 4" />
    </svg>
  )
}

export function LockIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <path d="M12 14.5v2" />
    </svg>
  )
}

export function UserIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20.2c.8-3.5 3.7-5.4 7.2-5.4s6.4 1.9 7.2 5.4" />
    </svg>
  )
}

export function SignOutIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M9 20.5H5.5a1.8 1.8 0 0 1-1.8-1.8V5.3a1.8 1.8 0 0 1 1.8-1.8H9" />
      <path d="M15.5 7.5 20 12l-4.5 4.5" />
      <path d="M20 12H9" />
    </svg>
  )
}

export function HeartIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 20.3 4.6 13a4.8 4.8 0 0 1 6.8-6.8l.6.6.6-.6a4.8 4.8 0 0 1 6.8 6.8L12 20.3Z" />
    </svg>
  )
}

export function BagIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 8h14l1 12.5H4L5 8Z" />
      <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
    </svg>
  )
}

export function PhoneIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.4" />
      <path d="M10.5 18.5h3" />
    </svg>
  )
}

export function MailIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 6.5 8.2 6 8.2-6" />
    </svg>
  )
}

export function LocationIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}
