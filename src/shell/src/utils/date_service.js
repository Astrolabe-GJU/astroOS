export  function getCurrentTime() {
    return new Date().toISOString()
}
export  function getRedeableDate(isoString) {
    const date = new Date(isoString)

    const readableDate = date.toLocaleDateString('en-US',{
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
    return readableDate
}