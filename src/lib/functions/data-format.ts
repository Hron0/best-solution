export function formatDate(dateString: any) {
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`
}

export function formatDateForDisplay(date: Date | undefined): string {
    if (!date) return ''
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export function formatDateForState(date: Date | undefined): string {
    if (!date) return ''
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}
