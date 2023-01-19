import { format, formatDistance, formatRelative, subDays } from 'date-fns'

export function formatDateTime(dateTime) {
    return format(dateTime, 'Pp')
}


