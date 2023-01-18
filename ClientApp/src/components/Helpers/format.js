import { format, formatDistance, formatRelative, subDays } from 'date-fns'

export function formatDateTime(dateTime) {
    return format(dateTime, 'MMMM Do, yyyy H:mma')
}


